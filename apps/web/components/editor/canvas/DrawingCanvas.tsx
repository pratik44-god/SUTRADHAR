"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";

import CanvasShapeRenderer from "./CanvasShape";
import type {
  CanvasShape,
  CanvasShapeType,
  CanvasTool,
  Point,
  Viewport,
} from "./canvas-types";
import {
  DRAG_THRESHOLD_PX,
  MIN_CONNECTOR_LENGTH,
  MIN_DRAW_DISTANCE_PX,
  clamp,
  createFreehandShape,
  createId,
  createShapeFromClick,
  createShapeFromDrag,
  distance,
  getFontSize,
  getLabelAlign,
  getLabelBox,
  isConnectorType,
  isDrawableTool,
  isEditableType,
  moveShape,
} from "./canvas-utils";

/* Sharp on retina screens, capped at 2x for performance. */
if (typeof window !== "undefined") {
  Konva.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
}

/* -------------------------------------------------------------------------- */
/* Types & constants                                                          */
/* -------------------------------------------------------------------------- */

export type HistoryState = { canUndo: boolean; canRedo: boolean };

export type DrawingCanvasHandle = {
  getSnapshot: () => { shapes: CanvasShape[]; viewport: Viewport };
  setSnapshot: (shapes: CanvasShape[], viewport: Viewport) => void;
  undo: () => void;
  redo: () => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  /** Patches the selected shape (e.g. `{ strokeStyle: "dashed" }`) as one undo step. */
  updateSelected: (patch: Partial<CanvasShape>) => void;
  /** Patches a specific shape by id (safe even if the selection has moved on). */
  updateShape: (id: string, patch: Partial<CanvasShape>) => void;
};

type DrawingCanvasProps = {
  activeTool: CanvasTool;
  /** Read once on mount. Use `setSnapshot` (or a `key`) to load another document. */
  initialShapes?: CanvasShape[];
  initialViewport?: Viewport;
  onShapesChange?: (shapes: CanvasShape[]) => void;
  onSelectionChange?: (shape: CanvasShape | null) => void;
  onViewportChange?: (viewport: Viewport) => void;
  onToolChange?: (tool: CanvasTool) => void;
  onHistoryChange?: (state: HistoryState) => void;
};

type StageEvent = Konva.KonvaEventObject<MouseEvent | TouchEvent>;

type DrawSession = {
  tool: CanvasShapeType;
  start: Point;
  current: Point;
  moved: boolean;
  points: number[];
  lastPoint: Point;
};

type HistoryStack = { stack: CanvasShape[][]; index: number };

const EMPTY_SHAPES: CanvasShape[] = [];
const DEFAULT_VIEWPORT: Viewport = { x: 0, y: 0, scale: 1 };

const MAX_HISTORY = 50;
const MAX_DRAW_POINTS = 400;
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const ZOOM_STEP = 1.08;
const DUPLICATE_OFFSET = 24;

const readHistoryFlags = ({ stack, index }: HistoryStack): HistoryState => ({
  canUndo: index > 0,
  canRedo: index < stack.length - 1,
});

const toWorld = (screen: Point, viewport: Viewport): Point => ({
  x: (screen.x - viewport.x) / viewport.scale,
  y: (screen.y - viewport.y) / viewport.scale,
});

/** Walks up from a hit node to the top-level shape group under the layer. */
function findShapeId(target: Konva.Node, stage: Konva.Stage): string | null {
  if (target === stage) return null;

  let node: Konva.Node | null = target;

  while (node) {
    const parent: Konva.Node | null = node.getParent();
    if (!parent || parent.getClassName() === "Layer") break;
    node = parent;
  }

  const id = node?.id();
  return id && id !== "preview" ? id : null;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  function DrawingCanvas(props, ref) {
    const {
      activeTool,
      initialShapes = EMPTY_SHAPES,
      initialViewport = DEFAULT_VIEWPORT,
      onShapesChange,
      onSelectionChange,
      onViewportChange,
      onToolChange,
      onHistoryChange,
    } = props;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const stageRef = useRef<Konva.Stage | null>(null);

    /*
     * Latest callbacks / tool live in refs so that every handler below can be
     * created once. No stale closures, no listener churn.
     */
    const callbacksRef = useRef({
      onShapesChange,
      onSelectionChange,
      onViewportChange,
      onToolChange,
      onHistoryChange,
    });
    const activeToolRef = useRef(activeTool);

    useEffect(() => {
      callbacksRef.current = {
        onShapesChange,
        onSelectionChange,
        onViewportChange,
        onToolChange,
        onHistoryChange,
      };
      activeToolRef.current = activeTool;
    });

    /* ------------------------------ state ------------------------------ */

    const [size, setSize] = useState({ width: 1000, height: 700 });
    const [shapes, setShapes] = useState<CanvasShape[]>(initialShapes);
    const [viewport, setViewport] = useState<Viewport>(initialViewport);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [preview, setPreview] = useState<CanvasShape | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [spaceHeld, setSpaceHeld] = useState(false);
    const [isPanning, setIsPanning] = useState(false);

    /* ------------------------ refs (source of truth) ------------------- */

    const shapesRef = useRef<CanvasShape[]>(initialShapes);
    const viewportRef = useRef<Viewport>(initialViewport);
    const selectedIdRef = useRef<string | null>(null);
    const historyRef = useRef<HistoryStack>({ stack: [initialShapes], index: 0 });
    const drawRef = useRef<DrawSession | null>(null);
    const panRef = useRef<{ screen: Point; viewport: Viewport } | null>(null);
    const spaceHeldRef = useRef(false);

    /* --------------------------- core actions -------------------------- */

    const applyViewport = useCallback((next: Viewport) => {
      viewportRef.current = next;
      setViewport(next);
      callbacksRef.current.onViewportChange?.(next);
    }, []);

    const select = useCallback((id: string | null) => {
      selectedIdRef.current = id;
      setSelectedId(id);

      const shape = id
        ? (shapesRef.current.find((item) => item.id === id) ?? null)
        : null;

      callbacksRef.current.onSelectionChange?.(shape);
    }, []);

    /** Applies a document change and records it in the undo history. */
    const commit = useCallback((next: CanvasShape[]) => {
      shapesRef.current = next;
      setShapes(next);

      const { stack, index } = historyRef.current;
      const nextStack = [...stack.slice(0, index + 1), next].slice(-MAX_HISTORY);
      historyRef.current = { stack: nextStack, index: nextStack.length - 1 };

      const callbacks = callbacksRef.current;
      callbacks.onShapesChange?.(next);
      callbacks.onHistoryChange?.(readHistoryFlags(historyRef.current));

      const selected = selectedIdRef.current;
      if (selected) {
        callbacks.onSelectionChange?.(
          next.find((item) => item.id === selected) ?? null,
        );
      }
    }, []);

    const jumpHistory = useCallback((delta: -1 | 1) => {
      const { stack, index } = historyRef.current;
      const nextIndex = index + delta;

      if (nextIndex < 0 || nextIndex >= stack.length) return;

      const next = stack[nextIndex];
      if (!next) return;

      historyRef.current = { stack, index: nextIndex };

      shapesRef.current = next;
      setShapes(next);
      setEditingId(null);

      selectedIdRef.current = null;
      setSelectedId(null);

      const callbacks = callbacksRef.current;
      callbacks.onShapesChange?.(next);
      callbacks.onSelectionChange?.(null);
      callbacks.onHistoryChange?.(readHistoryFlags(historyRef.current));
    }, []);

    const duplicateSelected = useCallback(() => {
      const id = selectedIdRef.current;
      if (!id) return;

      const source = shapesRef.current.find((item) => item.id === id);
      if (!source) return;

      const copy: CanvasShape = {
        ...source,
        id: createId(),
        x: source.x + DUPLICATE_OFFSET,
        y: source.y + DUPLICATE_OFFSET,
        x2: source.x2 === undefined ? undefined : source.x2 + DUPLICATE_OFFSET,
        y2: source.y2 === undefined ? undefined : source.y2 + DUPLICATE_OFFSET,
        points: source.points ? [...source.points] : undefined,
        fields: source.fields?.map((field) => ({ ...field })),
        metadata: source.metadata ? { ...source.metadata } : undefined,
      };

      commit([...shapesRef.current, copy]);
      select(copy.id);
    }, [commit, select]);

    const deleteSelected = useCallback(() => {
      const id = selectedIdRef.current;
      if (!id) return;

      setEditingId(null);
      commit(shapesRef.current.filter((item) => item.id !== id));
      select(null);
    }, [commit, select]);

    const updateShape = useCallback(
      (id: string, patch: Partial<CanvasShape>) => {
        if (!shapesRef.current.some((item) => item.id === id)) return;

        commit(
          shapesRef.current.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        );
      },
      [commit],
    );

    const updateSelected = useCallback(
      (patch: Partial<CanvasShape>) => {
        const id = selectedIdRef.current;
        if (id) updateShape(id, patch);
      },
      [updateShape],
    );

    const startEditing = useCallback(
      (id: string) => {
        const shape = shapesRef.current.find((item) => item.id === id);
        if (!shape || !isEditableType(shape.type)) return;

        select(id);
        setEditingId(id);
      },
      [select],
    );

    const commitText = useCallback(
      (id: string, text: string) => {
        setEditingId(null);

        const current = shapesRef.current.find((item) => item.id === id);
        if (!current || (current.text ?? "") === text) return;

        commit(
          shapesRef.current.map((item) =>
            item.id === id ? { ...item, text } : item,
          ),
        );
      },
      [commit],
    );

    const deleteShape = useCallback(
      (id: string) => {
        select(id);
        deleteSelected();
      },
      [deleteSelected, select],
    );

    const handleDragEnd = useCallback(
      (id: string, point: Point) => {
        commit(
          shapesRef.current.map((item) =>
            item.id === id ? moveShape(item, point) : item,
          ),
        );
      },
      [commit],
    );

    /* ------------------------- imperative handle ----------------------- */

    useImperativeHandle(
      ref,
      () => ({
        getSnapshot: () => ({
          shapes: shapesRef.current,
          viewport: viewportRef.current,
        }),
        setSnapshot: (nextShapes, nextViewport) => {
          shapesRef.current = nextShapes;
          viewportRef.current = nextViewport;
          historyRef.current = { stack: [nextShapes], index: 0 };
          selectedIdRef.current = null;
          drawRef.current = null;

          setShapes(nextShapes);
          setViewport(nextViewport);
          setSelectedId(null);
          setEditingId(null);
          setPreview(null);

          const callbacks = callbacksRef.current;
          callbacks.onSelectionChange?.(null);
          callbacks.onHistoryChange?.(readHistoryFlags(historyRef.current));
        },
        undo: () => jumpHistory(-1),
        redo: () => jumpHistory(1),
        duplicateSelected,
        deleteSelected,
        updateSelected,
        updateShape,
      }),
      [deleteSelected, duplicateSelected, jumpHistory, updateSelected, updateShape],
    );

    /* ---------------------------- drawing flow ------------------------- */

    const finishDrawing = useCallback(() => {
      const session = drawRef.current;
      if (!session) return;

      drawRef.current = null;
      setPreview(null);

      const { tool, start, current, moved, points } = session;
      let shape: CanvasShape | null = null;

      if (tool === "draw") {
        if (moved && points.length >= 4) {
          shape = createFreehandShape(start, [...points]);
        }
      } else if (isConnectorType(tool)) {
        // A connector needs a length: a plain click just cancels it.
        if (distance(start, current) >= MIN_CONNECTOR_LENGTH) {
          shape = createShapeFromDrag(tool, start, current);
        }
      } else {
        shape = moved
          ? createShapeFromDrag(tool, start, current)
          : createShapeFromClick(tool, start);
      }

      if (!shape) return;

      commit([...shapesRef.current, shape]);
      select(shape.id);

      // Hand control back to the cursor, exactly like Figma / Excalidraw.
      callbacksRef.current.onToolChange?.("select");

      // A freshly placed text box is ready to type into.
      if (shape.type === "text") startEditing(shape.id);
    }, [commit, select, startEditing]);

    const cancelInteraction = useCallback(() => {
      if (drawRef.current) {
        drawRef.current = null;
        setPreview(null);
        return;
      }

      select(null);
    }, [select]);

    /* --------------------------- pointer events ------------------------ */

    const handlePointerDown = useCallback(
      (event: StageEvent) => {
        const stage = stageRef.current;
        const screen = stage?.getPointerPosition();

        if (!stage || !screen) return;

        const native = event.evt;
        const button = "button" in native ? native.button : 0;

        if (button === 2) return;

        const tool = activeToolRef.current;

        // Hand tool, Space held, or middle mouse button => pan.
        if (tool === "hand" || spaceHeldRef.current || button === 1) {
          native.preventDefault();
          panRef.current = { screen, viewport: viewportRef.current };
          setIsPanning(true);
          return;
        }

        if (tool === "select") {
          select(findShapeId(event.target, stage));
          return;
        }

        if (!isDrawableTool(tool)) return;

        const world = toWorld(screen, viewportRef.current);

        drawRef.current = {
          tool,
          start: world,
          current: world,
          moved: false,
          points: [0, 0],
          lastPoint: world,
        };
      },
      [select],
    );

    const handlePointerMove = useCallback(
      (_event: StageEvent) => {
        const screen = stageRef.current?.getPointerPosition();
        if (!screen) return;

        const pan = panRef.current;

        if (pan) {
          applyViewport({
            ...pan.viewport,
            x: pan.viewport.x + (screen.x - pan.screen.x),
            y: pan.viewport.y + (screen.y - pan.screen.y),
          });
          return;
        }

        const session = drawRef.current;
        if (!session) return;

        const scale = viewportRef.current.scale;
        const world = toWorld(screen, viewportRef.current);
        session.current = world;

        if (!session.moved) {
          if (distance(session.start, world) * scale < DRAG_THRESHOLD_PX) return;
          session.moved = true;
        }

        if (session.tool === "draw") {
          if (distance(session.lastPoint, world) * scale < MIN_DRAW_DISTANCE_PX) {
            return;
          }

          session.lastPoint = world;

          if (session.points.length < MAX_DRAW_POINTS * 2) {
            session.points.push(world.x - session.start.x, world.y - session.start.y);
          }

          setPreview(
            createFreehandShape(session.start, [...session.points], "preview"),
          );
          return;
        }

        setPreview({
          ...createShapeFromDrag(session.tool, session.start, world),
          id: "preview",
        });
      },
      [applyViewport],
    );

    const handleWheel = useCallback(
      (event: Konva.KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const pointer = stageRef.current?.getPointerPosition();
        if (!pointer) return;

        const current = viewportRef.current;
        const factor = event.evt.deltaY > 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
        const scale = clamp(current.scale * factor, MIN_SCALE, MAX_SCALE);

        if (scale === current.scale) return;

        const anchor = toWorld(pointer, current);

        applyViewport({
          scale,
          x: pointer.x - anchor.x * scale,
          y: pointer.y - anchor.y * scale,
        });
      },
      [applyViewport],
    );

    /* -------------------------- window listeners ----------------------- */

    // Release handlers live on `window` so leaving the canvas mid-gesture
    // can never leave a pan or a drawing "stuck".
    useEffect(() => {
      const endGesture = () => {
        if (panRef.current) {
          panRef.current = null;
          setIsPanning(false);
          return;
        }

        finishDrawing();
      };

      window.addEventListener("mouseup", endGesture);
      window.addEventListener("touchend", endGesture);
      window.addEventListener("touchcancel", endGesture);

      return () => {
        window.removeEventListener("mouseup", endGesture);
        window.removeEventListener("touchend", endGesture);
        window.removeEventListener("touchcancel", endGesture);
      };
    }, [finishDrawing]);

    useEffect(() => {
      const releaseSpace = () => {
        spaceHeldRef.current = false;
        setSpaceHeld(false);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;

        if (
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable
        ) {
          return;
        }

        if (event.code === "Space" && target?.tagName !== "BUTTON") {
          event.preventDefault();

          if (!event.repeat) {
            spaceHeldRef.current = true;
            setSpaceHeld(true);
          }
          return;
        }

        const modifier = event.metaKey || event.ctrlKey;
        const key = event.key.toLowerCase();

        if (modifier && key === "z") {
          event.preventDefault();
          jumpHistory(event.shiftKey ? 1 : -1);
          return;
        }

        if (modifier && key === "y") {
          event.preventDefault();
          jumpHistory(1);
          return;
        }

        if (modifier && key === "d") {
          event.preventDefault();
          duplicateSelected();
          return;
        }

        if (event.key === "Escape") {
          cancelInteraction();
          return;
        }

        if (
          (event.key === "Delete" || event.key === "Backspace") &&
          selectedIdRef.current
        ) {
          event.preventDefault();
          deleteSelected();
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.code === "Space") releaseSpace();
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", releaseSpace);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("blur", releaseSpace);
      };
    }, [cancelInteraction, deleteSelected, duplicateSelected, jumpHistory]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateSize = () =>
        setSize({
          width: Math.max(1, container.clientWidth),
          height: Math.max(1, container.clientHeight),
        });

      updateSize();

      const observer = new ResizeObserver(updateSize);
      observer.observe(container);

      return () => observer.disconnect();
    }, []);

    // Let the parent know the initial (empty) undo state once.
    useEffect(() => {
      callbacksRef.current.onHistoryChange?.(readHistoryFlags(historyRef.current));
    }, []);

    /* ------------------------------ render ----------------------------- */

    const canInteract = activeTool === "select" && !spaceHeld && !isPanning;
    const editingShape = editingId
      ? (shapes.find((item) => item.id === editingId) ?? null)
      : null;

    const cursor = isPanning
      ? "grabbing"
      : activeTool === "hand" || spaceHeld
        ? "grab"
        : activeTool === "select"
          ? "default"
          : activeTool === "text"
            ? "text"
            : "crosshair";

    const gridSize = 32 * viewport.scale;

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden bg-[#090807]"
        style={{ cursor, touchAction: "none" }}
        onContextMenu={(event) => event.preventDefault()}
      >
        {/* Screen-space dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(214,196,163,0.35) 1px, transparent 1px)",
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: `${viewport.x}px ${viewport.y}px`,
          }}
        />

        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          x={viewport.x}
          y={viewport.y}
          scaleX={viewport.scale}
          scaleY={viewport.scale}
          draggable={false}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onWheel={handleWheel}
        >
          <Layer>
            {shapes.map((shape) => (
              <CanvasShapeRenderer
                key={shape.id}
                shape={shape}
                selected={selectedId === shape.id}
                interactive={canInteract}
                hideLabel={editingId === shape.id}
                zoom={viewport.scale}
                onDragEnd={handleDragEnd}
                onEdit={startEditing}
                onDelete={deleteShape}
              />
            ))}

            {preview && (
              <CanvasShapeRenderer
                key="preview"
                shape={preview}
                selected={false}
                interactive={false}
                ghost
                onDragEnd={() => {}}
              />
            )}
          </Layer>
        </Stage>

        {editingShape && (
          <InlineTextEditor
            key={editingShape.id}
            shape={editingShape}
            viewport={viewport}
            onCommit={commitText}
            onCancel={() => setEditingId(null)}
          />
        )}
      </div>
    );
  },
);

/* -------------------------------------------------------------------------- */
/* Inline text editor (double-click a shape)                                  */
/* -------------------------------------------------------------------------- */

type InlineTextEditorProps = {
  shape: CanvasShape;
  viewport: Viewport;
  onCommit: (id: string, text: string) => void;
  onCancel: () => void;
};

function InlineTextEditor({
  shape,
  viewport,
  onCommit,
  onCancel,
}: InlineTextEditorProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const doneRef = useRef(false);
  const [value, setValue] = useState(shape.text ?? "");

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const box = getLabelBox(shape);
  const scale = viewport.scale;
  const fontSize = getFontSize(shape) * scale;
  const boxHeight = box.height * scale;
  const lineHeight = 1.25;

  const finish = (save: boolean) => {
    if (doneRef.current) return;
    doneRef.current = true;

    if (save) onCommit(shape.id, value);
    else onCancel();
  };

  return (
    <textarea
      ref={inputRef}
      value={value}
      spellCheck={false}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => finish(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          finish(true);
        }

        if (event.key === "Escape") {
          event.preventDefault();
          finish(false);
        }
      }}
      className="absolute z-20 resize-none rounded-md border border-[#A9854F]/60 bg-[#14110E] text-[#F0E6D2] shadow-lg outline-none"
      style={{
        left: viewport.x + (shape.x + box.x) * scale,
        top: viewport.y + (shape.y + box.y) * scale,
        width: Math.max(box.width * scale, 72),
        height: Math.max(boxHeight, fontSize * lineHeight + 8),
        fontSize,
        lineHeight,
        textAlign: getLabelAlign(shape),
        padding: `${Math.max(2, (boxHeight - fontSize * lineHeight) / 2)}px 6px 0`,
      }}
    />
  );
}
