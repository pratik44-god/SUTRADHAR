"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import type { CanvasShape, StrokeStyle } from "./canvas/canvas-types";
import {
  getShapeSize,
  isConnectorType,
  isEditableType,
} from "./canvas/canvas-utils";

type WorkspaceSidebarProps = {
  shapes?: CanvasShape[];
  selectedShape?: CanvasShape | null;
  zoom?: number;
  /** Patch a shape by id (the id is captured when the edit starts). */
  onUpdate?: (id: string, patch: Partial<CanvasShape>) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

const STYLE_OPTIONS: { value: StrokeStyle; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
];

const WEIGHT_OPTIONS = [1, 2, 3, 4] as const;

const TYPE_LABELS: Record<string, string> = {
  roundedRectangle: "Rounded rectangle",
  startEnd: "Start / end",
  inputOutput: "Input / output",
  useCase: "Use case",
  api: "API",
  draw: "Freehand drawing",
};

const typeLabel = (type: string): string =>
  TYPE_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1);

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export default function WorkspaceSidebar({
  selectedShape = null,
  onUpdate,
  onDuplicate,
  onDelete,
}: WorkspaceSidebarProps) {
  // The properties panel is intentionally contextual: no selection means no
  // right-side panel. This keeps the canvas clean until the user clicks a shape.
  if (!selectedShape) return null;

  return (
    <aside
      aria-label="Properties"
      className="absolute right-4 top-[72px] z-40 max-h-[calc(100vh-88px)] w-[280px] overflow-y-auto rounded-2xl border border-[#2A2118] bg-[#0B0B0B]/95 shadow-2xl backdrop-blur-xl"
    >
      <ShapeInspector
        key={selectedShape.id}
        shape={selectedShape}
        onUpdate={onUpdate}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Shape selected                                                             */
/* -------------------------------------------------------------------------- */

function ShapeInspector({
  shape,
  onUpdate,
  onDuplicate,
  onDelete,
}: {
  shape: CanvasShape;
  onUpdate?: (id: string, patch: Partial<CanvasShape>) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}) {
  const connector = isConnectorType(shape.type);
  const freehand = shape.type === "draw";
  const fixedSize = shape.type === "actor";
  const size = getShapeSize(shape);

  const style = shape.strokeStyle ?? "solid";
  const strokeWidth = shape.strokeWidth ?? 1.5;

  const update = (patch: Partial<CanvasShape>) => onUpdate?.(shape.id, patch);

  const subtitle = connector
    ? "Connector"
    : freehand
      ? "Freehand stroke"
      : shape.text || "No label";

  return (
    <>
      <PanelHeader
        title={typeLabel(shape.type)}
        subtitle={subtitle}
        actions={
          <>
            <IconButton label="Duplicate (Ctrl D)" onClick={onDuplicate}>
              <svg {...ICON_PROPS}>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 0 1 2-2h9" />
              </svg>
            </IconButton>
            <IconButton label="Delete (Del)" danger onClick={onDelete}>
              <svg {...ICON_PROPS}>
                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
              </svg>
            </IconButton>
          </>
        }
      />

      {isEditableType(shape.type) && (
        <Section title="Label">
          <TextField
            value={shape.text ?? ""}
            placeholder="Add a label"
            onCommit={(text) => update({ text })}
          />
        </Section>
      )}

      <Section title="Position and size">
        <div className="grid grid-cols-2 gap-2">
          {connector ? (
            <>
              <NumberField
                label="Start X"
                value={Math.round(shape.x)}
                onCommit={(x) => update({ x })}
              />
              <NumberField
                label="Start Y"
                value={Math.round(shape.y)}
                onCommit={(y) => update({ y })}
              />
              <NumberField
                label="End X"
                value={Math.round(shape.x2 ?? shape.x)}
                onCommit={(x2) => update({ x2 })}
              />
              <NumberField
                label="End Y"
                value={Math.round(shape.y2 ?? shape.y)}
                onCommit={(y2) => update({ y2 })}
              />
            </>
          ) : (
            <>
              <NumberField
                label="X"
                value={Math.round(shape.x)}
                onCommit={(x) => update({ x })}
              />
              <NumberField
                label="Y"
                value={Math.round(shape.y)}
                onCommit={(y) => update({ y })}
              />
              {!freehand && (
                <>
                  <NumberField
                    label="Width"
                    value={Math.round(size.width)}
                    min={20}
                    disabled={fixedSize}
                    onCommit={(width) => update({ width })}
                  />
                  <NumberField
                    label="Height"
                    value={Math.round(size.height)}
                    min={20}
                    disabled={fixedSize}
                    onCommit={(height) => update({ height })}
                  />
                </>
              )}
            </>
          )}
        </div>
      </Section>

      <Section title="Line style">
        <div
          role="group"
          aria-label="Line style"
          className="grid grid-cols-3 gap-1 rounded-xl border border-[#2A2118] bg-[#0F0D0A] p-1"
        >
          {STYLE_OPTIONS.map((option) => (
            <SegmentButton
              key={option.value}
              active={style === option.value}
              onClick={() => update({ strokeStyle: option.value })}
            >
              <StyleGlyph style={option.value} />
              <span>{option.label}</span>
            </SegmentButton>
          ))}
        </div>
      </Section>

      <Section title="Line weight">
        <div
          role="group"
          aria-label="Line weight"
          className="grid grid-cols-4 gap-1 rounded-xl border border-[#2A2118] bg-[#0F0D0A] p-1"
        >
          {WEIGHT_OPTIONS.map((weight) => (
            <SegmentButton
              key={weight}
              active={Math.abs(strokeWidth - weight) < 0.01}
              onClick={() => update({ strokeWidth: weight })}
            >
              <span
                className="block w-6 rounded-full bg-current"
                style={{ height: weight }}
              />
              <span>{weight} px</span>
            </SegmentButton>
          ))}
        </div>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Building blocks                                                            */
/* -------------------------------------------------------------------------- */

const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function PanelHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#2A2118] px-4 py-3">
      <div className="min-w-0">
        <h2 className="truncate text-[14px] font-medium text-[#F0E6D2]">
          {title}
        </h2>
        <p className="truncate text-[12px] text-[#9A896F]">{subtitle}</p>
      </div>

      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-[#2A2118] px-4 py-4 last:border-b-0">
      <h3 className="mb-3 text-[12px] font-medium text-[#B39A72]">{title}</h3>
      {children}
    </section>
  );
}

function IconButton({
  label,
  danger = false,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md text-[#9A896F] transition ${FOCUS} ${
        danger
          ? "hover:bg-[#3A1F1B] hover:text-[#F0B4AA]"
          : "hover:bg-[#211A13] hover:text-[#F0E6D2]"
      }`}
    >
      {children}
    </button>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-md px-2 py-2 text-[12px] transition ${FOCUS} ${
        active
          ? "bg-[#211A13] text-[#F0E6D2] shadow-[inset_0_0_0_1px_rgba(169,133,79,0.5)]"
          : "text-[#9A896F] hover:bg-[#17130F] hover:text-[#D6C4A3]"
      }`}
    >
      {children}
    </button>
  );
}

function StyleGlyph({ style }: { style: StrokeStyle }) {
  const dash =
    style === "dashed" ? "5 3.5" : style === "dotted" ? "0.1 4.5" : undefined;

  return (
    <svg width="28" height="8" viewBox="0 0 28 8" aria-hidden="true">
      <line
        x1="2"
        y1="4"
        x2="26"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap={style === "dotted" ? "round" : "butt"}
        strokeDasharray={dash}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Fields                                                                     */
/* -------------------------------------------------------------------------- */

const FIELD_SHELL =
  "flex h-9 items-center gap-2 rounded-xl border border-[#2A2118] bg-[#17130F] px-2.5 transition focus-within:border-[#A9854F]/60";

/**
 * Both fields keep a local draft while focused and commit on Enter / blur
 * (Escape cancels). If the field unmounts mid-edit, e.g. because the selection
 * changed, the draft is committed to the shape it was started on.
 */
function NumberField({
  label,
  value,
  min,
  disabled = false,
  onCommit,
}: {
  label: string;
  value: number;
  min?: number;
  disabled?: boolean;
  onCommit: (value: number) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const cancelled = useRef(false);

  const commit = () => {
    if (cancelled.current) {
      cancelled.current = false;
      setDraft(null);
      return;
    }

    if (draft !== null && draft.trim() !== "") {
      const parsed = Number(draft);

      if (Number.isFinite(parsed)) {
        const next = Math.round(min === undefined ? parsed : Math.max(min, parsed));
        if (next !== value) onCommit(next);
      }
    }

    setDraft(null);
  };

  const draftRef = useRef(draft);
  const commitRef = useRef(commit);
  draftRef.current = draft;
  commitRef.current = commit;

  useEffect(
    () => () => {
      if (draftRef.current !== null) commitRef.current();
    },
    [],
  );

  return (
    <label
      htmlFor={id}
      className={`${FIELD_SHELL} ${disabled ? "opacity-50" : ""}`}
    >
      <span className="shrink-0 text-[12px] text-[#8F806B]">{label}</span>
      <input
        id={id}
        name={label.toLowerCase().replace(/\s+/g, "-")}
        autoComplete="off"
        value={draft ?? String(value)}
        disabled={disabled}
        inputMode="numeric"
        onFocus={(event) => {
          setDraft(String(value));
          event.currentTarget.select();
        }}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();

          if (event.key === "Escape") {
            cancelled.current = true;
            event.currentTarget.blur();
          }
        }}
        className="min-w-0 flex-1 bg-transparent text-right text-[13px] tabular-nums text-[#F0E6D2] outline-none"
      />
    </label>
  );
}

function TextField({
  value,
  placeholder,
  onCommit,
}: {
  value: string;
  placeholder?: string;
  onCommit: (value: string) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const cancelled = useRef(false);

  const commit = () => {
    if (cancelled.current) {
      cancelled.current = false;
      setDraft(null);
      return;
    }

    if (draft !== null && draft !== value) onCommit(draft);
    setDraft(null);
  };

  const draftRef = useRef(draft);
  const commitRef = useRef(commit);
  draftRef.current = draft;
  commitRef.current = commit;

  useEffect(
    () => () => {
      if (draftRef.current !== null) commitRef.current();
    },
    [],
  );

  return (
    <div className={FIELD_SHELL}>
      <input
        id={id}
        name="shape-label"
        autoComplete="off"
        value={draft ?? value}
        placeholder={placeholder}
        aria-label="Label"
        onFocus={() => setDraft(value)}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();

          if (event.key === "Escape") {
            cancelled.current = true;
            event.currentTarget.blur();
          }
        }}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-[#F0E6D2] outline-none placeholder:text-[#655A4E]"
      />
    </div>
  );
}
