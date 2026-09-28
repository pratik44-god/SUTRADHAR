"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import WorkspaceCanvas from "./WorkspaceCanvas";
import WorkspaceHeader, { type SaveStatus } from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceToolbar from "./WorkspaceToolbar";

import type {
  DrawingCanvasHandle,
  HistoryState,
} from "./canvas/DrawingCanvas";
import type {
  CanvasShape,
  CanvasTool,
  Viewport,
} from "./canvas/canvas-types";

type BlankWorkspaceProps = {
  title: string;
  onTitleChange: (title: string) => void;
  onBack: () => void;
  onArchive?: () => void;

  /**
   * Read once on mount. To open a different project, remount the workspace
   * with a `key` (e.g. `<BlankWorkspace key={project.id} ... />`).
   */
  initialShapes?: CanvasShape[];
  initialViewport?: Viewport;

  /**
   * Receives the serialized canvas on every change (shape edits immediately,
   * pan / zoom debounced). Should be cheap: the parent decides when to hit
   * the network (see `useCanvasAutosave`).
   */
  onCanvasChange?: (canvasData: string) => void;

  /**
   * Ask the parent to persist what it already holds right now
   * (Ctrl+S, the header's Save button, leaving the workspace).
   */
  onFlush?: () => void | Promise<unknown>;

  /** Save state owned by the parent's autosave hook. */
  saveStatus?: SaveStatus;
};

/* -------------------------------------------------------------------------- */
/* Insert library                                                             */
/* -------------------------------------------------------------------------- */

type InsertItem = { name: string; description: string; tool: CanvasTool };
type InsertCategory = { name: string; items: InsertItem[] };

const item = (
  name: string,
  description: string,
  tool: CanvasTool,
): InsertItem => ({ name, description, tool });

const INSERT_CATEGORIES: InsertCategory[] = [
  {
    name: "Basic",
    items: [
      item("Rectangle", "Basic box", "rectangle"),
      item("Rounded Rectangle", "Rounded box", "roundedRectangle"),
      item("Ellipse", "Circle / oval", "ellipse"),
      item("Diamond", "Decision shape", "diamond"),
      item("Triangle", "Triangle", "triangle"),
      item("Line", "Straight connector", "line"),
      item("Arrow", "Normal arrow connector", "arrow"),
      item("Hollow Arrow", "Open arrow connector", "hollowArrow"),
      item("Text", "Text label", "text"),
      item("Draw", "Freehand drawing", "draw"),
      item("Actor", "UML actor", "actor"),
    ],
  },
  {
    name: "Arrows",
    items: [
      item("Arrow", "Normal arrow connector", "arrow"),
      item("Hollow Arrow", "Open arrow connector", "hollowArrow"),
    ],
  },
  {
    name: "Flowchart",
    items: [
      item("Process", "Process step", "process"),
      item("Decision", "Conditional branch", "decision"),
      item("Start / End", "Flow start or end", "startEnd"),
      item("Input / Output", "Data input or output", "inputOutput"),
      item("Document", "Document step", "document"),
      item("Database", "Database", "database"),
    ],
  },
  {
    name: "Database",
    items: [
      item("Table", "Database table", "table"),
      item("Entity", "ER entity", "entity"),
      item("Relationship", "Entity relationship", "arrow"),
    ],
  },
  {
    name: "UML",
    items: [
      item("Class", "UML class", "class"),
      item("Interface", "UML interface", "interface"),
      item("Actor", "UML actor", "actor"),
      item("Use Case", "UML use case", "useCase"),
      item("Component", "UML component", "component"),
      item("Package", "UML package", "package"),
    ],
  },
  {
    name: "Architecture",
    items: [
      item("Server", "Server", "server"),
      item("Cloud", "Cloud service", "cloud"),
      item("API", "API service", "api"),
      item("Queue", "Message queue", "queue"),
      item("Cache", "Cache service", "cache"),
    ],
  },
  {
    name: "Sequence",
    items: [
      item("Lifeline", "Sequence lifeline", "lifeline"),
      item("Message", "Sequence message", "message"),
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Serialization                                                              */
/* -------------------------------------------------------------------------- */

type SavedCanvasData = {
  version: 1;
  shapes: CanvasShape[];
  viewport: Viewport;
};

const EMPTY_SHAPES: CanvasShape[] = [];
const DEFAULT_VIEWPORT: Viewport = { x: 0, y: 0, scale: 1 };
const VIEWPORT_DEBOUNCE_MS = 400;

function createCanvasData(shapes: CanvasShape[], viewport: Viewport): string {
  const data: SavedCanvasData = { version: 1, shapes, viewport };
  return JSON.stringify(data);
}

/* -------------------------------------------------------------------------- */
/* Workspace                                                                  */
/* -------------------------------------------------------------------------- */

export default function BlankWorkspace({
  title,
  onTitleChange,
  onBack,
  onArchive,
  initialShapes = EMPTY_SHAPES,
  initialViewport = DEFAULT_VIEWPORT,
  onCanvasChange,
  onFlush,
  saveStatus,
}: BlankWorkspaceProps) {
  const canvasRef = useRef<DrawingCanvasHandle | null>(null);

  const [activeTool, setActiveTool] = useState<CanvasTool>("select");
  const [showInsertPanel, setShowInsertPanel] = useState(false);

  // Read-only mirrors of canvas state, used by the sidebar / toolbar.
  const [shapes, setShapes] = useState<CanvasShape[]>(initialShapes);
  const [selectedShape, setSelectedShape] = useState<CanvasShape | null>(null);
  const [zoom, setZoom] = useState(Math.round(initialViewport.scale * 100));
  const [history, setHistory] = useState<HistoryState>({
    canUndo: false,
    canRedo: false,
  });

  // Only real shape edits count as "edited". Panning must not stop
  // late-arriving data from being applied.
  const hasEditedRef = useRef(false);

  // Changed since the last push to the parent (avoids pointless DB writes).
  const dirtyRef = useRef(false);

  const shapesRef = useRef(initialShapes);
  const viewportRef = useRef(initialViewport);
  const onCanvasChangeRef = useRef(onCanvasChange);
  const onFlushRef = useRef(onFlush);
  const viewportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onCanvasChangeRef.current = onCanvasChange;
    onFlushRef.current = onFlush;
  }, [onCanvasChange, onFlush]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        `[BlankWorkspace] opened with ${initialShapes.length} shape(s)`,
      );

      if (!onCanvasChange) {
        console.warn(
          "[BlankWorkspace] Changes will NOT be saved: pass `onCanvasChange`.",
        );
      }
    }

    // Mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------ saving ------------------------------ */

  // Hand the current canvas to the parent (it decides when to hit the DB).
  const pushCanvas = useCallback(() => {
    if (viewportTimerRef.current) {
      clearTimeout(viewportTimerRef.current);
      viewportTimerRef.current = null;
    }

    // Nothing changed since the last push: don't hit the DB again.
    if (!dirtyRef.current) return;

    // Never push an untouched, empty canvas: it could overwrite real data
    // that simply hasn't finished loading yet.
    if (!hasEditedRef.current && shapesRef.current.length === 0) return;

    dirtyRef.current = false;

    onCanvasChangeRef.current?.(
      createCanvasData(shapesRef.current, viewportRef.current),
    );
  }, []);

  // Push, then ask the parent to save immediately.
  const flushSave = useCallback(() => {
    pushCanvas();
    void onFlushRef.current?.();
  }, [pushCanvas]);

  // Pan / zoom fire many times per second, so only those are debounced.
  const scheduleViewportPush = useCallback(() => {
    if (!onCanvasChangeRef.current) return;

    if (viewportTimerRef.current) {
      clearTimeout(viewportTimerRef.current);
    }

    viewportTimerRef.current = setTimeout(
      pushCanvas,
      VIEWPORT_DEBOUNCE_MS,
    );
  }, [pushCanvas]);

  // Never lose a pending viewport update: flush when the tab is hidden /
  // closed and when the workspace unmounts.
  useEffect(() => {
    const flushIfPending = () => {
      if (viewportTimerRef.current) {
        flushSave();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushIfPending();
      }
    };

    window.addEventListener("pagehide", flushIfPending);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pagehide", flushIfPending);
      document.removeEventListener("visibilitychange", handleVisibility);
      flushIfPending();
    };
  }, [flushSave]);

  // Leaving the workspace saves first, so the parent always has the latest data.
  const handleBack = useCallback(() => {
    flushSave();
    onBack();
  }, [flushSave, onBack]);

  /* ------------------------------ loading ----------------------------- */

  const applyIncoming = useCallback(
    (nextShapes: CanvasShape[], nextViewport: Viewport) => {
      shapesRef.current = nextShapes;
      viewportRef.current = nextViewport;

      setShapes(nextShapes);
      setZoom(Math.round(nextViewport.scale * 100));

      canvasRef.current?.setSnapshot(nextShapes, nextViewport);
    },
    [],
  );

  // Data that arrives after mount (e.g. loaded asynchronously by the parent)
  // is applied as long as the user hasn't started editing yet. Empty incoming
  // data never replaces what is already on the canvas.
  useEffect(() => {
    if (hasEditedRef.current || initialShapes.length === 0) {
      return;
    }

    const incoming = createCanvasData(
      initialShapes,
      initialViewport,
    );

    const current = createCanvasData(
      shapesRef.current,
      viewportRef.current,
    );

    if (incoming === current) {
      return;
    }

    applyIncoming(initialShapes, initialViewport);
  }, [initialShapes, initialViewport, applyIncoming]);

  /* ------------------------ canvas -> workspace ----------------------- */

  // Shape edits happen once per gesture, so they are handed to the parent
  // immediately (the parent debounces the network call).
  const handleShapesChange = useCallback(
    (nextShapes: CanvasShape[]) => {
      hasEditedRef.current = true;
      dirtyRef.current = true;

      shapesRef.current = nextShapes;
      setShapes(nextShapes);

      pushCanvas();
    },
    [pushCanvas],
  );

  const handleViewportChange = useCallback(
    (nextViewport: Viewport) => {
      dirtyRef.current = true;
      viewportRef.current = nextViewport;

      setZoom(Math.round(nextViewport.scale * 100));

      scheduleViewportPush();
    },
    [scheduleViewportPush],
  );

  const handleToolChange = useCallback((tool: CanvasTool) => {
    setActiveTool(tool);
    setShowInsertPanel(false);
  }, []);

  /* ------------------------------ shortcuts --------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        flushSave();
        return;
      }

      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "v":
          setActiveTool("select");
          break;

        case "h":
          setActiveTool("hand");
          break;

        case "r":
          setActiveTool("rectangle");
          break;

        case "o":
          setActiveTool("ellipse");
          break;

        case "d":
          setActiveTool("diamond");
          break;

        case "a":
          setActiveTool("arrow");
          break;

        case "g":
          setActiveTool("hollowArrow");
          break;

        case "l":
          setActiveTool("line");
          break;

        case "t":
          setActiveTool("text");
          break;

        case "p":
          setActiveTool("draw");
          break;

        case "i":
          setShowInsertPanel((current) => !current);
          break;

        case "escape":
          setShowInsertPanel(false);
          setActiveTool("select");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flushSave]);

  return (
    <main className="relative h-screen w-screen bg-black text-[#D6C4A3]">
      <WorkspaceCanvas
        canvasRef={canvasRef}
        activeTool={activeTool}
        initialShapes={initialShapes}
        initialViewport={initialViewport}
        onShapesChange={handleShapesChange}
        onSelectionChange={setSelectedShape}
        onViewportChange={handleViewportChange}
        onToolChange={handleToolChange}
        onHistoryChange={setHistory}
      />

      <WorkspaceHeader
        title={title}
        onTitleChange={onTitleChange}
        onBack={handleBack}
        onArchive={onArchive}
        saveStatus={
          onCanvasChange
            ? (saveStatus ?? "saved")
            : "unavailable"
        }
        onSave={flushSave}
      />

      <WorkspaceToolbar
        activeTool={activeTool}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onToolChange={handleToolChange}
        onInsert={() =>
          setShowInsertPanel((current) => !current)
        }
        onUndo={() => canvasRef.current?.undo()}
        onRedo={() => canvasRef.current?.redo()}
      />

      <WorkspaceSidebar
        shapes={shapes}
        selectedShape={selectedShape}
        zoom={zoom}
        onUpdate={(id, patch) =>
          canvasRef.current?.updateShape(id, patch)
        }
        onDuplicate={() =>
          canvasRef.current?.duplicateSelected()
        }
        onDelete={() =>
          canvasRef.current?.deleteSelected()
        }
      />

      {showInsertPanel && (
        <InsertPanel
          activeTool={activeTool}
          onClose={() => setShowInsertPanel(false)}
          onSelectTool={handleToolChange}
        />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Insert panel                                                               */
/* -------------------------------------------------------------------------- */

type InsertPanelProps = {
  activeTool: CanvasTool;
  onClose: () => void;
  onSelectTool: (tool: CanvasTool) => void;
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

function InsertPanel({
  activeTool,
  onClose,
  onSelectTool,
}: InsertPanelProps) {
  const [search, setSearch] = useState("");

  const [openCategories, setOpenCategories] =
    useState<Record<string, boolean>>(() =>
      Object.fromEntries(
        INSERT_CATEGORIES.map((category) => [
          category.name,
          true,
        ]),
      ),
    );

  const query = search.trim().toLowerCase();

  const matches = (entry: InsertItem) =>
    !query ||
    `${entry.name} ${entry.description}`
      .toLowerCase()
      .includes(query);

  const visibleCategories = INSERT_CATEGORIES.map(
    (category) => ({
      ...category,
      items: category.items.filter(matches),
    }),
  ).filter((category) => category.items.length > 0);

  const toggleCategory = (name: string) =>
    setOpenCategories((current) => ({
      ...current,
      [name]: !current[name],
    }));

  return (
    <div
      role="dialog"
      aria-label="Insert shape"
      className="absolute bottom-4 left-[80px] top-[72px] z-[60] flex w-[340px] flex-col overflow-hidden rounded-xl border border-[#2A2118] bg-[#14110E]/98 shadow-2xl backdrop-blur-2xl"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#2A2118] px-4 py-3">
        <div>
          <h2 className="text-[14px] font-medium text-[#F0E6D2]">
            Insert shape
          </h2>

          <p className="text-[12px] text-[#9A896F]">
            Pick a shape, then click or drag on the canvas.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close insert panel"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#9A896F] transition hover:bg-[#211A13] hover:text-[#F0E6D2] ${FOCUS}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="border-b border-[#2A2118] p-3">
        <input
          id="insert-shape-search"
          name="insert-shape-search"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search shapes"
          aria-label="Search shapes"
          className="h-10 w-full rounded-lg border border-[#2A2118] bg-[#17130F] px-3 text-[13px] text-[#D6C4A3] outline-none placeholder:text-[#655A4E] focus:border-[#A9854F]/60"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {visibleCategories.map((category) => {
          const isOpen =
            query.length > 0 ||
            openCategories[category.name];

          return (
            <div key={category.name} className="mb-1">
              <button
                type="button"
                onClick={() =>
                  toggleCategory(category.name)
                }
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-[#1B1611] ${FOCUS}`}
              >
                <span className="text-[12px] font-medium text-[#B39A72]">
                  {category.name}

                  <span className="ml-2 font-normal text-[#655A4E]">
                    {category.items.length}
                  </span>
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`text-[#8F806B] transition ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {isOpen && (
                <div className="grid grid-cols-2 gap-1.5 px-1 pb-2">
                  {category.items.map((entry) => {
                    const isActive =
                      activeTool === entry.tool;

                    return (
                      <button
                        key={`${category.name}-${entry.name}`}
                        type="button"
                        onClick={() =>
                          onSelectTool(entry.tool)
                        }
                        aria-pressed={isActive}
                        className={`group rounded-lg border px-3 py-2.5 text-left transition hover:border-[#A9854F]/40 hover:bg-[#211A13] ${FOCUS} ${
                          isActive
                            ? "border-[#A9854F]/45 bg-[#211A13]"
                            : "border-[#2A2118] bg-[#17130F]"
                        }`}
                      >
                        <div className="text-[13px] text-[#D6C4A3] group-hover:text-[#F0E6D2]">
                          {entry.name}
                        </div>

                        <div className="mt-0.5 text-[12px] leading-4 text-[#8F806B]">
                          {entry.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {visibleCategories.length === 0 && (
          <div className="py-10 text-center text-[13px] text-[#8F806B]">
            No shapes match “{search}”.
          </div>
        )}
      </div>
    </div>
  );
}