export type CanvasTool =
  | "select" | "hand" | "rectangle" | "roundedRectangle" | "ellipse" | "diamond"
  | "triangle" | "line" | "arrow" | "hollowArrow" | "text" | "draw" | "process" | "decision"
  | "startEnd" | "inputOutput" | "document" | "database" | "table" | "entity"
  | "class" | "interface" | "actor" | "useCase" | "component" | "package"
  | "server" | "cloud" | "api" | "queue" | "cache" | "lifeline" | "message";

export type CanvasShapeType =
  | "rectangle" | "roundedRectangle" | "ellipse" | "diamond" | "triangle"
  | "line" | "arrow" | "hollowArrow" | "text" | "draw" | "process" | "decision" | "startEnd"
  | "inputOutput" | "document" | "database" | "table" | "entity" | "class"
  | "interface" | "actor" | "useCase" | "component" | "package" | "server"
  | "cloud" | "api" | "queue" | "cache" | "lifeline" | "message";

export type Point = { x: number; y: number };

export type StrokeStyle = "solid" | "dashed" | "dotted";

export type CanvasField = {
  name: string;
  type?: string;
  key?: "primary" | "foreign" | "unique";
  nullable?: boolean;
};

export type CanvasShape = {
  id: string;
  type: CanvasShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  x2?: number;
  y2?: number;
  text?: string;
  points?: number[];
  rotation?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeStyle?: StrokeStyle;
  fill?: string;
  fields?: CanvasField[];
  subtitle?: string;
  sourceId?: string;
  targetId?: string;
  /** Optional orthogonal bend used by connectors. */
  bend?: Point;
  metadata?: Record<string, string | number | boolean>;
};

export type Viewport = { x: number; y: number; scale: number };

export const DEFAULT_SHAPE_WIDTH = 160;
export const DEFAULT_SHAPE_HEIGHT = 90;
export const DEFAULT_STROKE = "#D6C4A3";
export const DEFAULT_FILL = "rgba(169,133,79,0.08)";

export const DIAGRAM_CATEGORIES = {
  basic: ["rectangle", "roundedRectangle", "ellipse", "diamond", "triangle", "line", "arrow", "hollowArrow", "text", "draw"],
  flowchart: ["process", "decision", "startEnd", "inputOutput", "document", "database"],
  database: ["table", "entity"],
  uml: ["class", "interface", "actor", "useCase", "component", "package"],
  architecture: ["server", "cloud", "api", "queue", "cache"],
  sequence: ["lifeline", "message"],
} as const;
