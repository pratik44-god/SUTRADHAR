// import type {
//   CanvasField,
//   CanvasShape,
//   CanvasShapeType,
//   CanvasTool,
//   Point,
//   StrokeStyle,
// } from "./canvas-types";
// import {
//   DEFAULT_FILL,
//   DEFAULT_SHAPE_HEIGHT,
//   DEFAULT_SHAPE_WIDTH,
//   DEFAULT_STROKE,
// } from "./canvas-types";

// export type Size = { width: number; height: number };
// export type Bounds = Point & Size;

// /* -------------------------------------------------------------------------- */
// /* Constants                                                                  */
// /* -------------------------------------------------------------------------- */

// export const TABLE_HEADER_HEIGHT = 34;
// export const TABLE_ROW_HEIGHT = 22;
// export const LIFELINE_HEADER_HEIGHT = 34;
// export const PACKAGE_TAB_HEIGHT = 22;
// export const TEXT_HEIGHT = 28;

// /** Pointer must travel this many screen px before a click becomes a drag. */
// export const DRAG_THRESHOLD_PX = 4;
// export const MIN_DRAW_DISTANCE_PX = 3;
// /** Connectors shorter than this (world units) are discarded. */
// export const MIN_CONNECTOR_LENGTH = 8;

// const ACTOR_SIZE: Size = { width: 70, height: 108 };

// const DEFAULT_SIZES: Partial<Record<CanvasShapeType, Size>> = {
//   table: { width: 220, height: 132 },
//   entity: { width: 160, height: 80 },
//   class: { width: 190, height: 128 },
//   interface: { width: 190, height: 128 },
//   actor: ACTOR_SIZE,
//   package: { width: 200, height: 130 },
//   server: { width: 130, height: 110 },
//   lifeline: { width: 120, height: 260 },
//   database: { width: 120, height: 100 },
//   cloud: { width: 170, height: 100 },
//   decision: { width: 170, height: 100 },
//   startEnd: { width: 160, height: 60 },
//   text: { width: 160, height: TEXT_HEIGHT },
// };

// /** Shapes whose contents would be cropped below their default size. */
// const CONTENT_TYPES: ReadonlySet<CanvasShapeType> = new Set<CanvasShapeType>([
//   "table",
//   "class",
//   "interface",
//   "package",
//   "server",
//   "lifeline",
// ]);

// const DEFAULT_FIELDS: CanvasField[] = [
//   { name: "id", type: "INT", key: "primary", nullable: false },
//   { name: "name", type: "VARCHAR", nullable: false },
//   { name: "created_at", type: "TIMESTAMP", nullable: false },
// ];

// /* -------------------------------------------------------------------------- */
// /* Small predicates & math                                                    */
// /* -------------------------------------------------------------------------- */

// export const isConnectorType = (type: string): boolean =>
//   type === "line" || type === "arrow" || type === "hollowArrow" || type === "message";

// /** Every tool except "select" and "hand" creates a shape. */
// export const isDrawableTool = (tool: CanvasTool): tool is CanvasShapeType =>
//   tool !== "select" && tool !== "hand";

// export const isEditableType = (type: string): boolean =>
//   !isConnectorType(type) && type !== "draw";

// export const distance = (a: Point, b: Point): number =>
//   Math.hypot(b.x - a.x, b.y - a.y);

// export const createId = (): string =>
//   `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// export const clamp = (value: number, min: number, max: number): number =>
//   Math.min(max, Math.max(min, value));

// /* -------------------------------------------------------------------------- */
// /* Defaults                                                                   */
// /* -------------------------------------------------------------------------- */

// export function getDefaultText(type: CanvasShapeType): string {
//   switch (type) {
//     case "process":
//       return "Process";
//     case "decision":
//       return "Decision?";
//     case "startEnd":
//       return "Start / End";
//     case "inputOutput":
//       return "Input / Output";
//     case "document":
//       return "Document";
//     case "database":
//       return "Database";
//     case "table":
//       return "users";
//     case "entity":
//     case "class":
//     case "actor":
//       return "User";
//     case "interface":
//       return "IUser";
//     case "useCase":
//       return "Use Case";
//     case "component":
//       return "Component";
//     case "package":
//       return "Package";
//     case "server":
//       return "Server";
//     case "cloud":
//       return "Cloud";
//     case "api":
//       return "API";
//     case "queue":
//       return "Queue";
//     case "cache":
//       return "Cache";
//     case "lifeline":
//       return "Object";
//     case "text":
//       return "Text";
//     default:
//       return "";
//   }
// }

// export const getDefaultSize = (type: CanvasShapeType): Size =>
//   DEFAULT_SIZES[type] ?? {
//     width: DEFAULT_SHAPE_WIDTH,
//     height: DEFAULT_SHAPE_HEIGHT,
//   };

// function getMinSize(type: CanvasShapeType): Size {
//   if (type === "text") return { width: 80, height: TEXT_HEIGHT };
//   if (CONTENT_TYPES.has(type)) return getDefaultSize(type);
//   return { width: 60, height: 40 };
// }

// /* -------------------------------------------------------------------------- */
// /* Table / class content                                                      */
// /* -------------------------------------------------------------------------- */

// export const getTableFields = (shape: CanvasShape): CanvasField[] =>
//   shape.fields?.length ? shape.fields : DEFAULT_FIELDS;

// export function getClassLayout(shape: CanvasShape) {
//   const header = shape.type === "interface" ? 46 : 32;

//   const attributes = shape.fields?.length
//     ? shape.fields.map(
//         (field) => `+ ${field.name}${field.type ? `: ${field.type}` : ""}`,
//       )
//     : ["+ id: number"];

//   const rawMethods =
//     typeof shape.metadata?.methods === "string" ? shape.metadata.methods : "";

//   const methods = rawMethods
//     .split(/[;\n]/)
//     .map((method) => method.trim())
//     .filter(Boolean)
//     .map((method) => (/^[+\-#~]/.test(method) ? method : `+ ${method}`));

//   if (methods.length === 0) methods.push("+ create(): void");

//   const attributesHeight = attributes.length * 16 + 12;
//   const methodsHeight = methods.length * 16 + 12;

//   return {
//     header,
//     attributes,
//     methods,
//     attributesHeight,
//     methodsHeight,
//     minHeight: header + attributesHeight + methodsHeight,
//   };
// }

// export const getPackageTabWidth = (width: number): number =>
//   clamp(width * 0.45, 70, 120);

// export const getDatabaseCap = (height: number): number =>
//   Math.min(16, height / 4);

// /* -------------------------------------------------------------------------- */
// /* Geometry                                                                   */
// /* -------------------------------------------------------------------------- */

// /** Resolved box size, including auto-growth for tables and classes. */
// export function getShapeSize(shape: CanvasShape): Size {
//   const fallback = getDefaultSize(shape.type);

//   const width = shape.width ?? fallback.width;
//   let height = shape.height ?? fallback.height;

//   if (shape.type === "table") {
//     height = Math.max(
//       height,
//       TABLE_HEADER_HEIGHT + getTableFields(shape).length * TABLE_ROW_HEIGHT + 8,
//     );
//   }

//   if (shape.type === "class" || shape.type === "interface") {
//     height = Math.max(height, getClassLayout(shape).minHeight);
//   }

//   return { width, height };
// }

// /** Bounds relative to the shape's own (x, y) origin. */
// export function getLocalBounds(shape: CanvasShape): Bounds {
//   if (isConnectorType(shape.type)) {
//     const dx = (shape.x2 ?? shape.x) - shape.x;
//     const dy = (shape.y2 ?? shape.y) - shape.y;

//     return {
//       x: Math.min(0, dx),
//       y: Math.min(0, dy),
//       width: Math.abs(dx),
//       height: Math.abs(dy),
//     };
//   }

//   if (shape.type === "draw") {
//     const points = shape.points ?? [];

//     if (points.length < 2) return { x: 0, y: 0, width: 0, height: 0 };

//     let minX = Infinity;
//     let minY = Infinity;
//     let maxX = -Infinity;
//     let maxY = -Infinity;

//     for (let index = 0; index < points.length - 1; index += 2) {
//       const px = points[index] ?? 0;
//       const py = points[index + 1] ?? 0;

//       minX = Math.min(minX, px);
//       maxX = Math.max(maxX, px);
//       minY = Math.min(minY, py);
//       maxY = Math.max(maxY, py);
//     }

//     return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
//   }

//   const { width, height } = getShapeSize(shape);
//   return { x: 0, y: 0, width, height };
// }

// /** Area (relative to the shape origin) where the label lives / is edited. */
// export function getLabelBox(shape: CanvasShape): Bounds {
//   const { width, height } = getShapeSize(shape);

//   switch (shape.type) {
//     case "text":
//       return { x: 0, y: 0, width, height };

//     case "table":
//       return { x: 0, y: 0, width, height: TABLE_HEADER_HEIGHT };

//     case "class":
//       return { x: 0, y: 0, width, height: getClassLayout(shape).header };

//     case "interface":
//       return {
//         x: 0,
//         y: 18,
//         width,
//         height: getClassLayout(shape).header - 18,
//       };

//     case "package":
//       return {
//         x: 0,
//         y: 0,
//         width: getPackageTabWidth(width),
//         height: PACKAGE_TAB_HEIGHT,
//       };

//     case "server":
//       return { x: 0, y: height - 30, width, height: 26 };

//     case "lifeline":
//       return { x: 0, y: 0, width, height: LIFELINE_HEADER_HEIGHT };

//     case "actor":
//       return { x: 0, y: ACTOR_SIZE.height - 16, width, height: 16 };

//     case "database": {
//       const cap = getDatabaseCap(height);
//       return { x: 0, y: cap * 2, width, height: height - cap * 2 };
//     }

//     case "diamond":
//     case "decision":
//       return {
//         x: width * 0.2,
//         y: height * 0.2,
//         width: width * 0.6,
//         height: height * 0.6,
//       };

//     case "triangle":
//       return {
//         x: width * 0.2,
//         y: height * 0.4,
//         width: width * 0.6,
//         height: height * 0.5,
//       };

//     case "inputOutput":
//       return { x: 20, y: 0, width: Math.max(0, width - 40), height };

//     case "document":
//       return { x: 0, y: 0, width, height: height - 12 };

//     default:
//       return { x: 0, y: 0, width, height };
//   }
// }

// /** Labels are centred (horizontally and vertically) in every shape. */
// export const getLabelAlign = (_shape: CanvasShape): "left" | "center" =>
//   "center";

// export const getFontSize = (shape: CanvasShape): number =>
//   shape.type === "text" ? 18 : 14;

// /* -------------------------------------------------------------------------- */
// /* Stroke style                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Konva dash array for a stroke style.
//  *  - `undefined` => no style chosen, the shape keeps its own default
//  *  - `[]`        => explicitly solid
//  *  - dotted uses a near-zero dash; pair it with a round line cap to get dots.
//  */
// export function getDashArray(
//   style: StrokeStyle | undefined,
//   strokeWidth: number,
// ): number[] | undefined {
//   switch (style) {
//     case "dashed":
//       return [strokeWidth * 5, strokeWidth * 3];
//     case "dotted":
//       return [0.1, strokeWidth * 3];
//     case "solid":
//       return [];
//     default:
//       return undefined;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Factories                                                                  */
// /* -------------------------------------------------------------------------- */

// function buildBoxShape(
//   type: CanvasShapeType,
//   x: number,
//   y: number,
//   width: number,
//   height: number,
// ): CanvasShape {
//   const shape: CanvasShape = {
//     id: createId(),
//     type,
//     x,
//     y,
//     width,
//     height,
//     text: getDefaultText(type),
//     stroke: DEFAULT_STROKE,
//     strokeWidth: 2,
//     fill: DEFAULT_FILL,
//   };

//   if (type === "table" || type === "entity") {
//     shape.fields = DEFAULT_FIELDS.map((field) => ({ ...field }));
//   }

//   if (type === "class" || type === "interface") {
//     shape.metadata = { methods: "getUser()" };
//   }

//   return shape;
// }

// /** Shape created by dragging from `start` to `end`. */
// export function createShapeFromDrag(
//   type: CanvasShapeType,
//   start: Point,
//   end: Point,
// ): CanvasShape {
//   if (isConnectorType(type)) {
//     return {
//       id: createId(),
//       type,
//       x: start.x,
//       y: start.y,
//       x2: end.x,
//       y2: end.y,
//       stroke: DEFAULT_STROKE,
//       strokeWidth: 2,
//     };
//   }

//   const x = Math.min(start.x, end.x);
//   const y = Math.min(start.y, end.y);

//   const min = getMinSize(type);
//   const width = Math.max(Math.abs(end.x - start.x), min.width);
//   const height =
//     type === "text"
//       ? TEXT_HEIGHT
//       : Math.max(Math.abs(end.y - start.y), min.height);

//   return buildBoxShape(type, x, y, width, height);
// }

// /** Shape dropped with a single click: default size, centred on the cursor. */
// export function createShapeFromClick(
//   type: CanvasShapeType,
//   point: Point,
// ): CanvasShape {
//   const { width, height } = getDefaultSize(type);

//   return buildBoxShape(
//     type,
//     point.x - width / 2,
//     point.y - height / 2,
//     width,
//     height,
//   );
// }

// export function createFreehandShape(
//   start: Point,
//   points: number[],
//   id: string = createId(),
// ): CanvasShape {
//   return {
//     id,
//     type: "draw",
//     x: start.x,
//     y: start.y,
//     points,
//     stroke: DEFAULT_STROKE,
//     strokeWidth: 2,
//   };
// }

// /** Moves a shape to `point`, keeping connector end-points in sync. */
// export function moveShape(shape: CanvasShape, point: Point): CanvasShape {
//   if (isConnectorType(shape.type)) {
//     const dx = point.x - shape.x;
//     const dy = point.y - shape.y;

//     return {
//       ...shape,
//       x: point.x,
//       y: point.y,
//       x2: shape.x2 === undefined ? undefined : shape.x2 + dx,
//       y2: shape.y2 === undefined ? undefined : shape.y2 + dy,
//     };
//   }

//   return { ...shape, x: point.x, y: point.y };
// }


import type {
  CanvasField,
  CanvasShape,
  CanvasShapeType,
  CanvasTool,
  Point,
  StrokeStyle,
} from "./canvas-types";
import {
  DEFAULT_FILL,
  DEFAULT_SHAPE_HEIGHT,
  DEFAULT_SHAPE_WIDTH,
  DEFAULT_STROKE,
} from "./canvas-types";

export type Size = { width: number; height: number };
export type Bounds = Point & Size;

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const TABLE_HEADER_HEIGHT = 34;
export const TABLE_ROW_HEIGHT = 22;
export const LIFELINE_HEADER_HEIGHT = 34;
export const PACKAGE_TAB_HEIGHT = 22;
export const TEXT_HEIGHT = 28;

/** Pointer must travel this many screen px before a click becomes a drag. */
export const DRAG_THRESHOLD_PX = 4;
export const MIN_DRAW_DISTANCE_PX = 3;
/** Connectors shorter than this (world units) are discarded. */
export const MIN_CONNECTOR_LENGTH = 8;

const ACTOR_SIZE: Size = { width: 70, height: 108 };

const DEFAULT_SIZES: Partial<Record<CanvasShapeType, Size>> = {
  table: { width: 220, height: 132 },
  entity: { width: 160, height: 80 },
  class: { width: 190, height: 128 },
  interface: { width: 190, height: 128 },
  actor: ACTOR_SIZE,
  package: { width: 200, height: 130 },
  server: { width: 130, height: 110 },
  lifeline: { width: 120, height: 260 },
  database: { width: 120, height: 100 },
  cloud: { width: 170, height: 100 },
  decision: { width: 170, height: 100 },
  startEnd: { width: 160, height: 60 },
  text: { width: 160, height: TEXT_HEIGHT },
};

/** Shapes whose contents would be cropped below their default size. */
const CONTENT_TYPES: ReadonlySet<CanvasShapeType> = new Set<CanvasShapeType>([
  "table",
  "class",
  "interface",
  "package",
  "server",
  "lifeline",
]);

const DEFAULT_FIELDS: CanvasField[] = [
  { name: "id", type: "INT", key: "primary", nullable: false },
  { name: "name", type: "VARCHAR", nullable: false },
  { name: "created_at", type: "TIMESTAMP", nullable: false },
];

/* -------------------------------------------------------------------------- */
/* Small predicates & math                                                    */
/* -------------------------------------------------------------------------- */

export const isConnectorType = (type: string): boolean =>
  type === "line" || type === "arrow" || type === "hollowArrow" || type === "message";

/** Every tool except "select" and "hand" creates a shape. */
export const isDrawableTool = (tool: CanvasTool): tool is CanvasShapeType =>
  tool !== "select" && tool !== "hand";

export const isEditableType = (type: string): boolean =>
  !isConnectorType(type) && type !== "draw";

export const distance = (a: Point, b: Point): number =>
  Math.hypot(b.x - a.x, b.y - a.y);

export const createId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/* -------------------------------------------------------------------------- */
/* Defaults                                                                   */
/* -------------------------------------------------------------------------- */

export function getDefaultText(type: CanvasShapeType): string {
  switch (type) {
    case "process":
      return "Process";
    case "decision":
      return "Decision?";
    case "startEnd":
      return "Start / End";
    case "inputOutput":
      return "Input / Output";
    case "document":
      return "Document";
    case "database":
      return "Database";
    case "table":
      return "users";
    case "entity":
    case "class":
    case "actor":
      return "User";
    case "interface":
      return "IUser";
    case "useCase":
      return "Use Case";
    case "component":
      return "Component";
    case "package":
      return "Package";
    case "server":
      return "Server";
    case "cloud":
      return "Cloud";
    case "api":
      return "API";
    case "queue":
      return "Queue";
    case "cache":
      return "Cache";
    case "lifeline":
      return "Object";
    case "text":
      return "Text";
    default:
      return "";
  }
}

export const getDefaultSize = (type: CanvasShapeType): Size =>
  DEFAULT_SIZES[type] ?? {
    width: DEFAULT_SHAPE_WIDTH,
    height: DEFAULT_SHAPE_HEIGHT,
  };

function getMinSize(type: CanvasShapeType): Size {
  if (type === "text") return { width: 80, height: TEXT_HEIGHT };
  if (CONTENT_TYPES.has(type)) return getDefaultSize(type);
  return { width: 60, height: 40 };
}

/* -------------------------------------------------------------------------- */
/* Table / class content                                                      */
/* -------------------------------------------------------------------------- */

export const getTableFields = (shape: CanvasShape): CanvasField[] =>
  shape.fields?.length ? shape.fields : DEFAULT_FIELDS;

export function getClassLayout(shape: CanvasShape) {
  const header = shape.type === "interface" ? 46 : 32;

  const attributes = shape.fields?.length
    ? shape.fields.map(
        (field) => `+ ${field.name}${field.type ? `: ${field.type}` : ""}`,
      )
    : ["+ id: number"];

  const rawMethods =
    typeof shape.metadata?.methods === "string" ? shape.metadata.methods : "";

  const methods = rawMethods
    .split(/[;\n]/)
    .map((method) => method.trim())
    .filter(Boolean)
    .map((method) => (/^[+\-#~]/.test(method) ? method : `+ ${method}`));

  if (methods.length === 0) methods.push("+ create(): void");

  const attributesHeight = attributes.length * 16 + 12;
  const methodsHeight = methods.length * 16 + 12;

  return {
    header,
    attributes,
    methods,
    attributesHeight,
    methodsHeight,
    minHeight: header + attributesHeight + methodsHeight,
  };
}

export const getPackageTabWidth = (width: number): number =>
  clamp(width * 0.45, 70, 120);

export const getDatabaseCap = (height: number): number =>
  Math.min(16, height / 4);

/* -------------------------------------------------------------------------- */
/* Geometry                                                                   */
/* -------------------------------------------------------------------------- */

/** Resolved box size, including auto-growth for tables and classes. */
export function getShapeSize(shape: CanvasShape): Size {
  const fallback = getDefaultSize(shape.type);

  const width = shape.width ?? fallback.width;
  let height = shape.height ?? fallback.height;

  if (shape.type === "table") {
    height = Math.max(
      height,
      TABLE_HEADER_HEIGHT + getTableFields(shape).length * TABLE_ROW_HEIGHT + 8,
    );
  }

  if (shape.type === "class" || shape.type === "interface") {
    height = Math.max(height, getClassLayout(shape).minHeight);
  }

  return { width, height };
}

/** Bounds relative to the shape's own (x, y) origin. */
export function getLocalBounds(shape: CanvasShape): Bounds {
  if (isConnectorType(shape.type)) {
    const dx = (shape.x2 ?? shape.x) - shape.x;
    const dy = (shape.y2 ?? shape.y) - shape.y;

    return {
      x: Math.min(0, dx),
      y: Math.min(0, dy),
      width: Math.abs(dx),
      height: Math.abs(dy),
    };
  }

  if (shape.type === "draw") {
    const points = shape.points ?? [];

    if (points.length < 2) return { x: 0, y: 0, width: 0, height: 0 };

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let index = 0; index < points.length - 1; index += 2) {
      const px = points[index] ?? 0;
      const py = points[index + 1] ?? 0;

      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    }

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  const { width, height } = getShapeSize(shape);
  return { x: 0, y: 0, width, height };
}

/** Area (relative to the shape origin) where the label lives / is edited. */
export function getLabelBox(shape: CanvasShape): Bounds {
  const { width, height } = getShapeSize(shape);

  switch (shape.type) {
    case "text":
      return { x: 0, y: 0, width, height };

    case "table":
      return { x: 0, y: 0, width, height: TABLE_HEADER_HEIGHT };

    case "class":
      return { x: 0, y: 0, width, height: getClassLayout(shape).header };

    case "interface":
      return {
        x: 0,
        y: 18,
        width,
        height: getClassLayout(shape).header - 18,
      };

    case "package":
      return {
        x: 0,
        y: 0,
        width: getPackageTabWidth(width),
        height: PACKAGE_TAB_HEIGHT,
      };

    case "server":
      return { x: 0, y: height - 30, width, height: 26 };

    case "lifeline":
      return { x: 0, y: 0, width, height: LIFELINE_HEADER_HEIGHT };

    case "actor":
      // Reserve the bottom strip for the actor name so it stays in the
      // previous lower position when the actor is resized.
      return { x: 0, y: Math.max(0, height - 22), width, height: 18 };

    case "database": {
      const cap = getDatabaseCap(height);
      return { x: 0, y: cap * 2, width, height: height - cap * 2 };
    }

    case "diamond":
    case "decision":
      return {
        x: width * 0.2,
        y: height * 0.2,
        width: width * 0.6,
        height: height * 0.6,
      };

    case "triangle":
      return {
        x: width * 0.2,
        y: height * 0.4,
        width: width * 0.6,
        height: height * 0.5,
      };

    case "inputOutput":
      return { x: 20, y: 0, width: Math.max(0, width - 40), height };

    case "document":
      return { x: 0, y: 0, width, height: height - 12 };

    default:
      return { x: 0, y: 0, width, height };
  }
}

/** Labels are centred (horizontally and vertically) in every shape. */
export const getLabelAlign = (_shape: CanvasShape): "left" | "center" =>
  "center";

export const getFontSize = (shape: CanvasShape): number =>
  shape.type === "text" ? 18 : 14;

/* -------------------------------------------------------------------------- */
/* Stroke style                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Konva dash array for a stroke style.
 *  - `undefined` => no style chosen, the shape keeps its own default
 *  - `[]`        => explicitly solid
 *  - dotted uses a near-zero dash; pair it with a round line cap to get dots.
 */
export function getDashArray(
  style: StrokeStyle | undefined,
  strokeWidth: number,
): number[] | undefined {
  switch (style) {
    case "dashed":
      return [strokeWidth * 5, strokeWidth * 3];
    case "dotted":
      return [0.1, strokeWidth * 3];
    case "solid":
      return [];
    default:
      return undefined;
  }
}

/* -------------------------------------------------------------------------- */
/* Factories                                                                  */
/* -------------------------------------------------------------------------- */

function buildBoxShape(
  type: CanvasShapeType,
  x: number,
  y: number,
  width: number,
  height: number,
): CanvasShape {
  const shape: CanvasShape = {
    id: createId(),
    type,
    x,
    y,
    width,
    height,
    text: getDefaultText(type),
    stroke: DEFAULT_STROKE,
    strokeWidth: 2,
    fill: DEFAULT_FILL,
  };

  if (type === "table" || type === "entity") {
    shape.fields = DEFAULT_FIELDS.map((field) => ({ ...field }));
  }

  if (type === "class" || type === "interface") {
    shape.metadata = { methods: "getUser()" };
  }

  return shape;
}

/** Shape created by dragging from `start` to `end`. */
export function createShapeFromDrag(
  type: CanvasShapeType,
  start: Point,
  end: Point,
): CanvasShape {
  if (isConnectorType(type)) {
    return {
      id: createId(),
      type,
      x: start.x,
      y: start.y,
      x2: end.x,
      y2: end.y,
      stroke: DEFAULT_STROKE,
      strokeWidth: 2,
    };
  }

  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);

  const min = getMinSize(type);
  const width = Math.max(Math.abs(end.x - start.x), min.width);
  const height =
    type === "text"
      ? TEXT_HEIGHT
      : Math.max(Math.abs(end.y - start.y), min.height);

  return buildBoxShape(type, x, y, width, height);
}

/** Shape dropped with a single click: default size, centred on the cursor. */
export function createShapeFromClick(
  type: CanvasShapeType,
  point: Point,
): CanvasShape {
  const { width, height } = getDefaultSize(type);

  return buildBoxShape(
    type,
    point.x - width / 2,
    point.y - height / 2,
    width,
    height,
  );
}

export function createFreehandShape(
  start: Point,
  points: number[],
  id: string = createId(),
): CanvasShape {
  return {
    id,
    type: "draw",
    x: start.x,
    y: start.y,
    points,
    stroke: DEFAULT_STROKE,
    strokeWidth: 2,
  };
}

/** Moves a shape to `point`, keeping connector end-points in sync. */
export function moveShape(shape: CanvasShape, point: Point): CanvasShape {
  if (isConnectorType(shape.type)) {
    const dx = point.x - shape.x;
    const dy = point.y - shape.y;

    return {
      ...shape,
      x: point.x,
      y: point.y,
      x2: shape.x2 === undefined ? undefined : shape.x2 + dx,
      y2: shape.y2 === undefined ? undefined : shape.y2 + dy,
    };
  }

  return { ...shape, x: point.x, y: point.y };
}
