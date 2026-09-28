import type { CanvasShape, Viewport } from "./canvas-types";

export const DEFAULT_VIEWPORT: Viewport = { x: 0, y: 0, scale: 1 };

// Stable reference, so an empty canvas never looks like "new data" to React.
const NO_SHAPES: CanvasShape[] = [];

/**
 * Turns whatever the DB returned into shapes + viewport.
 *
 * Accepts:
 *  - a JSON string:  '{"version":1,"shapes":[...],"viewport":{...}}'
 *  - an object (e.g. a jsonb column that was already parsed)
 *  - a bare array of shapes
 *
 * Never throws. Bad or missing data gives an empty canvas.
 */
export function parseCanvasData(raw: unknown): {
  shapes: CanvasShape[];
  viewport: Viewport;
} {
  if (raw === null || raw === undefined || raw === "") {
    return { shapes: NO_SHAPES, viewport: DEFAULT_VIEWPORT };
  }

  try {
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    const list = Array.isArray(data) ? data : (data as { shapes?: unknown })?.shapes;

    const shapes = Array.isArray(list)
      ? (list as CanvasShape[]).filter(
          (shape) =>
            shape &&
            typeof shape.id === "string" &&
            typeof shape.type === "string" &&
            Number.isFinite(shape.x) &&
            Number.isFinite(shape.y),
        )
      : NO_SHAPES;

    if (Array.isArray(list) && shapes.length !== list.length) {
      console.warn(
        `[parseCanvasData] skipped ${list.length - shapes.length} invalid shape(s) (need id, type, x, y)`,
      );
    }

    const v = (data as { viewport?: Viewport })?.viewport;
    const validViewport =
      !!v &&
      [v.x, v.y, v.scale].every((n) => Number.isFinite(n)) &&
      v.scale > 0;

    return {
      shapes,
      viewport: validViewport && v ? v : DEFAULT_VIEWPORT,
    };
  } catch (error) {
    console.error("[parseCanvasData] could not parse canvasData", error);
    return { shapes: NO_SHAPES, viewport: DEFAULT_VIEWPORT };
  }
}
