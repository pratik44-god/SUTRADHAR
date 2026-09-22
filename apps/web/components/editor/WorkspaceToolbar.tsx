"use client";

import type { ReactNode } from "react";
import type { CanvasTool } from "./canvas/canvas-types";

type WorkspaceToolbarProps = {
  activeTool: CanvasTool;
  canUndo?: boolean;
  canRedo?: boolean;
  onToolChange: (tool: CanvasTool) => void;
  onInsert: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ICONS = {
  select: (
    <Icon>
      <path d="M5 3l14 7-6 2-2 6L5 3z" />
    </Icon>
  ),
  hand: (
    <Icon>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </Icon>
  ),
  rectangle: (
    <Icon>
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
    </Icon>
  ),
  ellipse: (
    <Icon>
      <circle cx="12" cy="12" r="8" />
    </Icon>
  ),
  diamond: (
    <Icon>
      <path d="M12 3l9 9-9 9-9-9z" />
    </Icon>
  ),
  arrow: (
    <Icon>
      <path d="M6 18L18 6M9 6h9v9" />
    </Icon>
  ),
  line: (
    <Icon>
      <path d="M5 19L19 5" />
    </Icon>
  ),
  text: (
    <Icon>
      <path d="M5 7V5h14v2M12 5v14M9 19h6" />
    </Icon>
  ),
  draw: (
    <Icon>
      <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" />
    </Icon>
  ),
  insert: (
    <Icon>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  ),
  undo: (
    <Icon>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
    </Icon>
  ),
  redo: (
    <Icon>
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9H10a6 6 0 0 0 0 12h3" />
    </Icon>
  ),
};

/* -------------------------------------------------------------------------- */
/* Tool button                                                                */
/* -------------------------------------------------------------------------- */

type ToolButtonProps = {
  label: string;
  shortcut: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function ToolButton({
  label,
  shortcut,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60 ${
        disabled
          ? "cursor-not-allowed border-transparent text-[#3E362D]"
          : active
            ? "border-[#A9854F]/45 bg-[#A9854F]/15 text-[#F0E6D2]"
            : "border-transparent text-[#9A896F] hover:bg-[#17130F] hover:text-[#F0E6D2]"
      }`}
    >
      {children}

      {!disabled && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-[#2A2118] bg-[#0F0D0A] px-2.5 py-1.5 text-[12px] text-[#D6C4A3] opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
          <kbd className="rounded border border-[#2A2118] bg-[#17130F] px-1.5 py-0.5 text-[11px] text-[#9A896F]">
            {shortcut}
          </kbd>
        </span>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolbar                                                                    */
/* -------------------------------------------------------------------------- */

type ToolDef = {
  label: string;
  shortcut: string;
  tool: CanvasTool;
  icon: ReactNode;
};

const TOOL_GROUPS: ToolDef[][] = [
  [
    { label: "Select", shortcut: "V", tool: "select", icon: ICONS.select },
    { label: "Hand", shortcut: "H", tool: "hand", icon: ICONS.hand },
  ],
  [
    { label: "Rectangle", shortcut: "R", tool: "rectangle", icon: ICONS.rectangle },
    { label: "Ellipse", shortcut: "O", tool: "ellipse", icon: ICONS.ellipse },
    { label: "Diamond", shortcut: "D", tool: "diamond", icon: ICONS.diamond },
  ],
  [
    { label: "Arrow", shortcut: "A", tool: "arrow", icon: ICONS.arrow },
    { label: "Line", shortcut: "L", tool: "line", icon: ICONS.line },
  ],
  [
    { label: "Text", shortcut: "T", tool: "text", icon: ICONS.text },
    { label: "Draw", shortcut: "P", tool: "draw", icon: ICONS.draw },
  ],
];

const ALL_TOOLS = TOOL_GROUPS.flat();

function Divider() {
  return <div className="my-1.5 h-px w-6 bg-[#2A2118]" role="separator" />;
}

export default function WorkspaceToolbar({
  activeTool,
  canUndo = true,
  canRedo = true,
  onToolChange,
  onInsert,
  onUndo,
  onRedo,
}: WorkspaceToolbarProps) {
  // A tool picked from the Insert panel has no button of its own, so the
  // "+" button lights up to show that an inserted shape is being placed.
  const insertToolActive = !ALL_TOOLS.some((item) => item.tool === activeTool);

  return (
    <div
      role="toolbar"
      aria-label="Drawing tools"
      aria-orientation="vertical"
      className="absolute left-4 top-[72px] z-40 flex w-[52px] flex-col items-center rounded-xl border border-[#2A2118] bg-[#14110E]/95 p-1.5 shadow-2xl backdrop-blur-xl"
    >
      {TOOL_GROUPS.map((group, index) => (
        <div key={index} className="flex flex-col items-center gap-0.5">
          {index > 0 && <Divider />}
          {group.map((item) => (
            <ToolButton
              key={item.tool}
              label={item.label}
              shortcut={item.shortcut}
              active={activeTool === item.tool}
              onClick={() => onToolChange(item.tool)}
            >
              {item.icon}
            </ToolButton>
          ))}
        </div>
      ))}

      <Divider />

      <div className="flex flex-col items-center gap-0.5">
        <ToolButton
          label="Insert shape"
          shortcut="I"
          active={insertToolActive}
          onClick={onInsert}
        >
          {ICONS.insert}
        </ToolButton>
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-0.5">
        <ToolButton
          label="Undo"
          shortcut="Ctrl Z"
          disabled={!canUndo}
          onClick={onUndo}
        >
          {ICONS.undo}
        </ToolButton>

        <ToolButton
          label="Redo"
          shortcut="Ctrl Shift Z"
          disabled={!canRedo}
          onClick={onRedo}
        >
          {ICONS.redo}
        </ToolButton>
      </div>
    </div>
  );
}
