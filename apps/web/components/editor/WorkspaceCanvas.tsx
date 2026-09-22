"use client";

import type { ReactNode, RefObject } from "react";

import DrawingCanvas, {
  type DrawingCanvasHandle,
  type HistoryState,
} from "./canvas/DrawingCanvas";

import type {
  CanvasShape,
  CanvasTool,
  Viewport,
} from "./canvas/canvas-types";

type WorkspaceCanvasProps = {
  activeTool: CanvasTool;
  initialShapes?: CanvasShape[];
  initialViewport?: Viewport;
  onShapesChange?: (shapes: CanvasShape[]) => void;
  onSelectionChange?: (shape: CanvasShape | null) => void;
  onViewportChange?: (viewport: Viewport) => void;
  onToolChange?: (tool: CanvasTool) => void;
  onHistoryChange?: (state: HistoryState) => void;
  canvasRef?: RefObject<DrawingCanvasHandle | null>;
  children?: ReactNode;
};

export default function WorkspaceCanvas({
  children,
  canvasRef,
  ...canvasProps
}: WorkspaceCanvasProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#090807]">
      <DrawingCanvas ref={canvasRef} {...canvasProps} />
      {children}
    </div>
  );
}
