"use client";

/**
 * Reference parent for <BlankWorkspace />.
 *
 * It does the three things the workspace expects from its parent:
 *   1. stores the string handed to `onCanvasChange` somewhere durable,
 *   2. parses it on reopen and passes `initialShapes` / `initialViewport`,
 *   3. does not mount the workspace until that data has loaded.
 *
 * This version uses localStorage. To use a backend instead, replace the two
 * marked lines with a fetch() load and a PUT (with `keepalive: true` so the
 * request survives the tab closing).
 */

import { useCallback, useEffect, useState } from "react";

import BlankWorkspace from "./BlankWorkspace";
import type { CanvasShape, Viewport } from "./canvas/canvas-types";

type Loaded = { shapes: CanvasShape[]; viewport: Viewport };

const EMPTY: Loaded = { shapes: [], viewport: { x: 0, y: 0, scale: 1 } };

const keyFor = (projectId: string) => `sutradhara:project:${projectId}`;

function parseCanvasData(raw: string | null): Loaded {
  if (!raw) return EMPTY;

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data?.shapes)) return EMPTY;

    const v = data.viewport;
    const validViewport =
      v && [v.x, v.y, v.scale].every(Number.isFinite) && v.scale > 0;

    return {
      shapes: data.shapes as CanvasShape[],
      viewport: validViewport ? (v as Viewport) : EMPTY.viewport,
    };
  } catch {
    return EMPTY;
  }
}

type ProjectPageProps = {
  projectId: string;
  initialTitle?: string;
  onBack: () => void;
};

export default function ProjectPage({
  projectId,
  initialTitle = "Untitled",
  onBack,
}: ProjectPageProps) {
  const [title, setTitle] = useState(initialTitle);
  const [loaded, setLoaded] = useState<Loaded | null>(null);

  // LOAD  <- replace with your API call if you have a backend.
  useEffect(() => {
    setLoaded(null);
    setLoaded(parseCanvasData(window.localStorage.getItem(keyFor(projectId))));
  }, [projectId]);

  // SAVE  <- replace with fetch(url, { method: "PUT", body: canvasData, keepalive: true }).
  const handleCanvasChange = useCallback(
    (canvasData: string) => {
      try {
        window.localStorage.setItem(keyFor(projectId), canvasData);
      } catch (error) {
        console.error("[ProjectPage] could not save canvas", error);
      }
    },
    [projectId],
  );

  // Never mount with empty data while the real data is still loading:
  // a pan/zoom or Ctrl+S in that window would overwrite the saved canvas.
  if (!loaded) return null;

  return (
    <BlankWorkspace
      key={projectId}
      title={title}
      onTitleChange={setTitle}
      onBack={onBack}
      initialShapes={loaded.shapes}
      initialViewport={loaded.viewport}
      onCanvasChange={handleCanvasChange}
    />
  );
}
