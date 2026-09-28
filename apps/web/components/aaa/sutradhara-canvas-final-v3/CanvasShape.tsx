"use client";

import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Arrow, Circle, Ellipse, Group, Line, Path, Rect, Text, Transformer } from "react-konva";

import type { CanvasField, CanvasShape, Point } from "./canvas-types";
import { DEFAULT_FILL, DEFAULT_STROKE } from "./canvas-types";
import {
  LIFELINE_HEADER_HEIGHT,
  PACKAGE_TAB_HEIGHT,
  TABLE_HEADER_HEIGHT,
  TABLE_ROW_HEIGHT,
  getClassLayout,
  getDashArray,
  getDatabaseCap,
  getLabelAlign,
  getLabelBox,
  getLocalBounds,
  getPackageTabWidth,
  getShapeSize,
  getTableFields,
  isEditableType,
} from "./canvas-utils";

type CanvasShapeProps = {
  shape: CanvasShape;
  selected: boolean;
  /** Only true while the Select tool is active: enables hit-testing + drag. */
  interactive?: boolean;
  /** Semi-transparent rendering used for the live drawing preview. */
  ghost?: boolean;
  /** Hide the canvas label while the inline text editor is open. */
  hideLabel?: boolean;
  /** Current stage scale, used to keep the delete button a constant size. */
  zoom?: number;
  onDragEnd: (id: string, point: Point) => void;
  onResizeEnd?: (id: string, patch: Partial<CanvasShape>) => void;
  onEndpointDragEnd?: (id: string, start: Point, end: Point) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onBendDragEnd?: (id: string, bend: Point | undefined) => void;
};

const SELECTED_STROKE = "#C69A5B";
const SURFACE = "#17130F";
const HEADER_FILL = "rgba(169,133,79,0.15)";
const LABEL_COLOR = "#D6C4A3";
const MUTED = "#9A896F";
const DELETE_FILL = "#1E1512";
const DELETE_FILL_HOVER = "#4A2320";
const DELETE_ICON = "#F0B4AA";
const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";
const PERF = { perfectDrawEnabled: false, shadowForStrokeEnabled: false };

/** 100 x 60 design box, scaled to the shape's size at render time. */
const CLOUD_PATH =
  "M25 55 C10 55 2 45 5 35 C8 27 15 25 20 25 C20 12 32 5 45 8 C52 0 70 0 76 12 C90 10 100 22 95 33 C104 42 98 55 85 55 Z";

const KEY_BADGE: Record<NonNullable<CanvasField["key"]>, string> = {
  primary: "PK",
  foreign: "FK",
  unique: "UQ",
};

function cornerRadiusFor(type: CanvasShape["type"], width: number, height: number) {
  let radius = 0;

  switch (type) {
    case "roundedRectangle":
      radius = 14;
      break;
    case "process":
    case "cache":
      radius = 5;
      break;
    case "api":
      radius = 8;
      break;
    case "rectangle":
      radius = 8;
      break;
    case "startEnd":
    case "queue":
      radius = height / 2;
      break;
    default:
      radius = 0;
  }

  return Math.min(radius, width / 2, height / 2);
}

export default function CanvasShapeRenderer({
  shape,
  selected,
  interactive = true,
  ghost = false,
  hideLabel = false,
  zoom = 1,
  onDragEnd,
  onResizeEnd,
  onEndpointDragEnd,
  onEdit,
  onDelete,
  onBendDragEnd,
}: CanvasShapeProps) {
  const baseStroke = shape.stroke ?? DEFAULT_STROKE;
  const stroke = selected ? SELECTED_STROKE : baseStroke;
  const strokeWidth = shape.strokeWidth ?? 1.5;
  const fill = shape.fill ?? DEFAULT_FILL;

  const { width, height } = getShapeSize(shape);
  const bounds = getLocalBounds(shape);
  const text = shape.text ?? "";
  const groupRef = useRef<Konva.Group | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [endpointPreview, setEndpointPreview] = useState<{ start: Point; end: Point } | null>(null);
  const endpointPreviewRef = useRef<{ start: Point; end: Point } | null>(null);
  const [bendPreview, setBendPreview] = useState<Point | null>(null);

  const isConnector = shape.type === "arrow" || shape.type === "hollowArrow" || shape.type === "line" || shape.type === "message";
  const canResize =
    !isConnector &&
    shape.type !== "draw" &&
    shape.type !== "text" &&
    selected &&
    interactive &&
    !ghost &&
    !hideLabel;

  /*
   * Stroke style. `dash` is undefined when no style was chosen (shapes such as
   * "cache" and "lifeline" then keep their built-in dashes), `[]` when solid.
   * Dotted needs round caps so the near-zero dashes render as dots.
   */
  const dash = getDashArray(shape.strokeStyle, strokeWidth);
  const dotted = shape.strokeStyle === "dotted";
  const dashProps = {
    dash,
    ...(dotted ? { lineCap: "round" as const } : {}),
  };
  const connectorCap = shape.strokeStyle === "dashed" ? "butt" : "round";

  // Main outline follows the chosen style; inner details always stay solid.
  const paint = { stroke, strokeWidth, fill, strokeScaleEnabled: false, ...PERF, ...dashProps };
  const outline = { stroke, strokeWidth, strokeScaleEnabled: false, ...PERF };
  const connectorStroke = { ...outline, ...dashProps };

  const handleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    // Konva drag events bubble: dragging a connector endpoint or a resize
    // handle would otherwise be treated as moving the whole shape.
    if (event.target !== event.currentTarget) return;

    onDragEnd(shape.id, { x: event.target.x(), y: event.target.y() });
  };

  const handleEdit = () => {
    if (isEditableType(shape.type) || isConnector) onEdit?.(shape.id);
  };

  const showDelete = selected && interactive && !ghost;

  // Keep the press on the "x" from starting a drag or a new selection.
  const stopEvent = (event: Konva.KonvaEventObject<Event>) => {
    event.cancelBubble = true;
  };

  const handleDelete = (event: Konva.KonvaEventObject<Event>) => {
    event.cancelBubble = true;
    onDelete?.(shape.id);
  };

  const hoverDelete = (event: Konva.KonvaEventObject<MouseEvent>, hovering: boolean) => {
    const node = event.target as Konva.Shape;
    const stage = node.getStage();

    if (stage) stage.container().style.cursor = hovering ? "pointer" : "";

    node.fill(hovering ? DELETE_FILL_HOVER : DELETE_FILL);
    node.getLayer()?.batchDraw();
  };

  useEffect(() => {
    if (!canResize || !groupRef.current || !transformerRef.current) {
      transformerRef.current?.nodes([]);
      return;
    }

    transformerRef.current.nodes([groupRef.current]);
    transformerRef.current.getLayer()?.batchDraw();
  }, [canResize, width, height]);

  useEffect(() => {
    endpointPreviewRef.current = null;
    setEndpointPreview(null);
    setBendPreview(null);
  }, [shape.id, shape.x, shape.y, shape.x2, shape.y2, shape.bend]);

  const handleTransformEnd = () => {
    const node = groupRef.current;
    if (!node || !onResizeEnd) return;

    const scaleX = Math.max(0.2, node.scaleX());
    const scaleY = Math.max(0.2, node.scaleY());
    const nextWidth = Math.max(40, width * scaleX);
    const nextHeight = Math.max(30, height * scaleY);

    node.scaleX(1);
    node.scaleY(1);

    onResizeEnd(shape.id, {
      x: node.x(),
      y: node.y(),
      width: nextWidth,
      height: nextHeight,
    });
  };

  const startPoint = endpointPreview
    ? endpointPreview.start
    : { x: 0, y: 0 };

  const endPoint = endpointPreview
    ? endpointPreview.end
    : {
        x: (shape.x2 ?? shape.x) - shape.x,
        y: (shape.y2 ?? shape.y) - shape.y,
      };

  const activeBend = bendPreview ?? shape.bend;

  const connectorPoints = activeBend && !endpointPreview
    ? [
        startPoint.x,
        startPoint.y,
        activeBend.x - shape.x,
        activeBend.y - shape.y,
        endPoint.x,
        endPoint.y,
      ]
    : [
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y,
      ];

  const connectorLabelPosition = (() => {
    if (connectorPoints.length < 4) return { x: 0, y: 0 };

    const points: Point[] = [];
    for (let index = 0; index < connectorPoints.length; index += 2) {
      points.push({
        x: connectorPoints[index] ?? 0,
        y: connectorPoints[index + 1] ?? 0,
      });
    }

    let totalLength = 0;
    for (let index = 1; index < points.length; index += 1) {
      const current = points[index] ?? { x: 0, y: 0 };
      const previous = points[index - 1] ?? { x: 0, y: 0 };
      totalLength += Math.hypot(
        current.x - previous.x,
        current.y - previous.y,
      );
    }

    let remaining = totalLength / 2;
    for (let index = 1; index < points.length; index += 1) {
      const from = points[index - 1] ?? { x: 0, y: 0 };
      const to = points[index] ?? { x: 0, y: 0 };
      const segmentLength = Math.hypot(
        to.x - from.x,
        to.y - from.y,
      );

      if (remaining <= segmentLength) {
        const ratio = segmentLength === 0 ? 0 : remaining / segmentLength;
        return {
          x: from.x + (to.x - from.x) * ratio,
          y: from.y + (to.y - from.y) * ratio,
        };
      }

      remaining -= segmentLength;
    }

    return points[Math.floor(points.length / 2)] ?? { x: 0, y: 0 };
  })();

  const arrowHead =
    shape.metadata?.arrowHead === "hollow" || shape.type === "hollowArrow"
      ? "hollow"
      : shape.metadata?.arrowHead === "open"
        ? "open"
        : "normal";

  /* ------------------------------------------------------------------ */
  /* Body                                                               */
  /* ------------------------------------------------------------------ */

  const renderBody = () => {
    switch (shape.type) {
      case "rectangle":
      case "roundedRectangle":
      case "process":
      case "startEnd":
      case "api":
      case "queue":
        return (
          <Rect
            {...paint}
            width={width}
            height={height}
            cornerRadius={cornerRadiusFor(shape.type, width, height)}
          />
        );

      case "cache":
        return (
          <Rect
            {...paint}
            width={width}
            height={height}
            cornerRadius={5}
            dash={dash ?? [6, 4]}
          />
        );

      case "component":
        return (
          <>
            <Rect {...paint} width={width} height={height} />
            <Rect
              {...outline}
              x={-8}
              y={height * 0.28}
              width={16}
              height={9}
              fill={SURFACE}
              listening={false}
            />
            <Rect
              {...outline}
              x={-8}
              y={height * 0.28 + 16}
              width={16}
              height={9}
              fill={SURFACE}
              listening={false}
            />
          </>
        );

      case "ellipse":
      case "useCase":
        return (
          <Ellipse
            {...paint}
            x={width / 2}
            y={height / 2}
            radiusX={width / 2}
            radiusY={height / 2}
          />
        );

      case "diamond":
      case "decision":
        return (
          <Line
            {...paint}
            points={[width / 2, 0, width, height / 2, width / 2, height, 0, height / 2]}
            closed
            lineJoin="round"
          />
        );

      case "triangle":
        return (
          <Line
            {...paint}
            points={[width / 2, 0, width, height, 0, height]}
            closed
            lineJoin="round"
          />
        );

      case "inputOutput":
        return (
          <Line
            {...paint}
            points={[20, 0, width, 0, width - 20, height, 0, height]}
            closed
            lineJoin="round"
          />
        );

      case "document": {
        const baseline = height - 10;

        return (
          <Path
            {...paint}
            data={`M0 0 L${width} 0 L${width} ${baseline} Q${width * 0.75} ${baseline + 14} ${width * 0.5} ${baseline} Q${width * 0.25} ${baseline - 14} 0 ${baseline} Z`}
          />
        );
      }

      case "database": {
        const cap = getDatabaseCap(height);
        const rx = width / 2;

        return (
          <>
            <Path
              {...paint}
              data={`M0 ${cap} L0 ${height - cap} A${rx} ${cap} 0 0 0 ${width} ${height - cap} L${width} ${cap} A${rx} ${cap} 0 0 0 0 ${cap} Z`}
            />
            <Path
              {...outline}
              data={`M0 ${cap} A${rx} ${cap} 0 0 0 ${width} ${cap}`}
              fillEnabled={false}
              listening={false}
            />
          </>
        );
      }

      case "cloud":
        return (
          <Path
            {...paint}
            data={CLOUD_PATH}
            scaleX={width / 100}
            scaleY={height / 60}
            strokeScaleEnabled={false}
          />
        );

      case "table": {
        const fields = getTableFields(shape);

        return (
          <>
            <Rect {...paint} fill={SURFACE} width={width} height={height} cornerRadius={6} />
            <Rect
              width={width}
              height={TABLE_HEADER_HEIGHT}
              fill={HEADER_FILL}
              cornerRadius={[6, 6, 0, 0]}
              listening={false}
            />
            <Line
              points={[0, TABLE_HEADER_HEIGHT, width, TABLE_HEADER_HEIGHT]}
              stroke={stroke}
              strokeWidth={1}
              opacity={0.5}
              listening={false}
            />

            {fields.map((field, index) => (
              <Group
                key={`${field.name}-${index}`}
                y={TABLE_HEADER_HEIGHT + index * TABLE_ROW_HEIGHT + 5}
                listening={false}
              >
                {field.key && (
                  <Text
                    x={10}
                    width={24}
                    text={KEY_BADGE[field.key]}
                    fontSize={8}
                    fontStyle="bold"
                    fontFamily={FONT}
                    fill={SELECTED_STROKE}
                  />
                )}
                <Text
                  x={36}
                  width={Math.max(0, width * 0.5 - 36)}
                  text={field.name}
                  fontSize={11}
                  fontFamily={FONT}
                  fill={LABEL_COLOR}
                  wrap="none"
                  ellipsis
                />
                <Text
                  x={width * 0.5}
                  width={Math.max(0, width * 0.5 - 10)}
                  text={field.type ?? ""}
                  align="right"
                  fontSize={10}
                  fontFamily={FONT}
                  fill={MUTED}
                  wrap="none"
                  ellipsis
                />
              </Group>
            ))}
          </>
        );
      }

      case "entity":
        return (
          <>
            <Rect {...paint} width={width} height={height} cornerRadius={4} />
            <Rect
              {...outline}
              x={4}
              y={4}
              width={Math.max(0, width - 8)}
              height={Math.max(0, height - 8)}
              strokeWidth={1}
              cornerRadius={2}
              listening={false}
            />
          </>
        );

      case "class":
      case "interface": {
        const layout = getClassLayout(shape);
        const membersTop = layout.header + 6;
        const methodsTop = layout.header + layout.attributesHeight;

        return (
          <>
            <Rect {...paint} fill={SURFACE} width={width} height={height} />

            {shape.type === "interface" && (
              <Text
                y={6}
                width={width}
                align="center"
                text="«interface»"
                fontSize={10}
                fontStyle="italic"
                fontFamily={FONT}
                fill={MUTED}
                listening={false}
              />
            )}

            <Line points={[0, layout.header, width, layout.header]} stroke={stroke} strokeWidth={1} listening={false} />
            <Line points={[0, methodsTop, width, methodsTop]} stroke={stroke} strokeWidth={1} listening={false} />

            {layout.attributes.map((attribute, index) => (
              <Text
                key={`a-${index}`}
                x={10}
                y={membersTop + index * 16}
                width={Math.max(0, width - 20)}
                text={attribute}
                fontSize={11}
                fontFamily={FONT}
                fill={MUTED}
                wrap="none"
                ellipsis
                listening={false}
              />
            ))}

            {layout.methods.map((method, index) => (
              <Text
                key={`m-${index}`}
                x={10}
                y={methodsTop + 6 + index * 16}
                width={Math.max(0, width - 20)}
                text={method}
                fontSize={11}
                fontFamily={FONT}
                fill={MUTED}
                wrap="none"
                ellipsis
                listening={false}
              />
            ))}
          </>
        );
      }

      case "actor": {
        const sx = width / 70;
        const sy = height / 108;

        return (
          <>
            <Rect width={width} height={height} fill="transparent" />
            <Group scaleX={sx} scaleY={sy} listening={false}>
              <Ellipse {...outline} x={35} y={14} radiusX={12} radiusY={12} />
              <Line {...outline} points={[35, 26, 35, 62]} lineCap="round" />
              <Line {...outline} points={[17, 40, 53, 40]} lineCap="round" />
              <Line {...outline} points={[19, 88, 35, 62, 51, 88]} lineCap="round" lineJoin="round" />
            </Group>
          </>
        );
      }

      case "package": {
        const tabWidth = getPackageTabWidth(width);

        return (
          <>
            <Rect
              {...paint}
              y={PACKAGE_TAB_HEIGHT}
              width={width}
              height={Math.max(0, height - PACKAGE_TAB_HEIGHT)}
            />
            <Rect {...outline} fill={SURFACE} width={tabWidth} height={PACKAGE_TAB_HEIGHT} strokeWidth={1} />
          </>
        );
      }

      case "server":
        return (
          <>
            <Rect {...paint} fill={SURFACE} width={width} height={height} cornerRadius={6} />
            {[12, 38].map((y) => (
              <Group key={y} listening={false}>
                <Rect
                  x={12}
                  y={y}
                  width={Math.max(0, width - 24)}
                  height={20}
                  stroke={stroke}
                  strokeWidth={1}
                  cornerRadius={3}
                  opacity={0.7}
                />
                <Ellipse x={width - 24} y={y + 10} radiusX={3} radiusY={3} fill={SELECTED_STROKE} />
              </Group>
            ))}
          </>
        );

      case "lifeline":
        return (
          <>
            <Rect {...paint} fill={SURFACE} width={width} height={LIFELINE_HEADER_HEIGHT} cornerRadius={4} />
            <Line
              {...outline}
              {...dashProps}
              dash={dash ?? [8, 6]}
              points={[width / 2, LIFELINE_HEADER_HEIGHT, width / 2, height]}
              hitStrokeWidth={14 / Math.max(zoom, 0.01)}
            />
          </>
        );

      case "line":
      case "arrow":
      case "hollowArrow":
      case "message": {
        const points = connectorPoints;

        if (shape.type === "line") {
          return (
            <Line
              {...connectorStroke}
              points={points}
              lineCap={connectorCap}
              lineJoin="round"
              hitStrokeWidth={14 / Math.max(zoom, 0.01)}
            />
          );
        }

        const x1 = points[points.length - 4] ?? 0;
        const y1 = points[points.length - 3] ?? 0;
        const x2 = points[points.length - 2] ?? 0;
        const y2 = points[points.length - 1] ?? 0;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 14;
        const headWidth = 8;
        const leftX =
          x2 - headLength * Math.cos(angle) + headWidth * Math.sin(angle);
        const leftY =
          y2 - headLength * Math.sin(angle) - headWidth * Math.cos(angle);
        const rightX =
          x2 - headLength * Math.cos(angle) - headWidth * Math.sin(angle);
        const rightY =
          y2 - headLength * Math.sin(angle) + headWidth * Math.cos(angle);

        if (arrowHead === "hollow") {
          return (
            <>
              <Line
                {...connectorStroke}
                points={points}
                lineCap={connectorCap}
                lineJoin="round"
                hitStrokeWidth={14 / Math.max(zoom, 0.01)}
              />
              <Line
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeScaleEnabled={false}
                {...PERF}
                points={[leftX, leftY, x2, y2, rightX, rightY, leftX, leftY]}
                lineJoin="round"
                lineCap="round"
                closed
                fill="transparent"
                hitStrokeWidth={14 / Math.max(zoom, 0.01)}
                listening={false}
              />
            </>
          );
        }

        if (arrowHead === "open") {
          return (
            <>
              <Line
                {...connectorStroke}
                points={points}
                lineCap={connectorCap}
                lineJoin="round"
                hitStrokeWidth={14 / Math.max(zoom, 0.01)}
              />
              <Line
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeScaleEnabled={false}
                {...PERF}
                points={[leftX, leftY, x2, y2, rightX, rightY]}
                lineJoin="round"
                lineCap="round"
                hitStrokeWidth={14 / Math.max(zoom, 0.01)}
                listening={false}
              />
            </>
          );
        }

        return (
          <Arrow
            {...connectorStroke}
            points={points}
            lineCap={connectorCap}
            lineJoin="round"
            pointerLength={12}
            pointerWidth={12}
            fill={stroke}
            hitStrokeWidth={14 / Math.max(zoom, 0.01)}
          />
        );
      }

      case "text":
        return (
          <Text
            {...PERF}
            width={width}
            height={height}
            align="center"
            verticalAlign="middle"
            text={hideLabel ? " " : text || "Text"}
            fontSize={14}
            fontFamily={FONT}
            fill={stroke}
          />
        );

      case "draw":
        return (
          <Line
            {...outline}
            points={shape.points ?? []}
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
            tension={0}
            hitStrokeWidth={10}
          />
        );

      default:
        return null;
    }
  };

  /* ------------------------------------------------------------------ */
  /* Label                                                              */
  /* ------------------------------------------------------------------ */

  const showLabel = text.length > 0 && !hideLabel && shape.type !== "text";

  const renderLabel = () => {
    if (!showLabel) return null;

    if (isConnector) {
      const labelWidth = Math.max(44, Math.min(180, text.length * 8 + 18));
      const labelHeight = 24;

      return (
        <Group
          x={connectorLabelPosition.x}
          y={connectorLabelPosition.y}
          listening={false}
        >
          <Rect
            x={-labelWidth / 2}
            y={-labelHeight / 2}
            width={labelWidth}
            height={labelHeight}
            cornerRadius={6}
            fill="#0F0D0A"
            opacity={0.94}
            stroke="#2A2118"
            strokeWidth={1}
          />
          <Text
            x={-labelWidth / 2 + 7}
            y={-labelHeight / 2}
            width={labelWidth - 14}
            height={labelHeight}
            text={text}
            align="center"
            verticalAlign="middle"
            fontSize={12}
            fontFamily={FONT}
            fill={LABEL_COLOR}
            ellipsis
          />
        </Group>
      );
    }

    const box = getLabelBox(shape);
    const align = getLabelAlign(shape);
    const inset = align === "left" ? 10 : 6;
    const bold =
      shape.type === "table" || shape.type === "class" || shape.type === "interface";

    return (
      <Text
        x={box.x + inset}
        y={box.y}
        width={Math.max(0, box.width - inset * 2)}
        height={box.height}
        text={text}
        align={align}
        verticalAlign="middle"
        fontSize={14}
        fontStyle={bold ? "bold" : "normal"}
        fontFamily={FONT}
        fill={LABEL_COLOR}
        ellipsis
        listening={false}
      />
    );
  };

  /* ------------------------------------------------------------------ */
  /* Group                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <>
      <Group
        ref={groupRef}
        id={shape.id}
        x={shape.x}
        y={shape.y}
        opacity={ghost ? 0.7 : 1}
        draggable={interactive}
        listening={interactive}
        onDragEnd={handleDragEnd}
        onDblClick={handleEdit}
        onDblTap={handleEdit}
      >
        {renderBody()}
        {renderLabel()}

        {selected && interactive && !ghost && !hideLabel && isConnector && (
          <>
            {onBendDragEnd && !endpointPreview && (
              <BendHandle
                shape={shape}
                points={connectorPoints}
                zoom={zoom}
                onPreview={setBendPreview}
                onCommit={(bend) => {
                  setBendPreview(null);
                  onBendDragEnd(shape.id, bend);
                }}
              />
            )}
            <Circle
              x={0}
              y={0}
              radius={4.5 / Math.max(zoom, 0.01)}
              fill={"#000000"}
              stroke={SELECTED_STROKE}
              strokeWidth={1.5 / Math.max(zoom, 0.01)}
              draggable
              onMouseDown={stopEvent}
              onTouchStart={stopEvent}
              onDragStart={(event) => {
                event.cancelBubble = true;
                const end = {
                  x: (shape.x2 ?? shape.x) - shape.x,
                  y: (shape.y2 ?? shape.y) - shape.y,
                };
                const start = { x: event.target.x(), y: event.target.y() };
                endpointPreviewRef.current = { start, end };
                setEndpointPreview({ start, end });
              }}
              onDragMove={(event) => {
                event.cancelBubble = true;
                const current = endpointPreviewRef.current;
                const start = { x: event.target.x(), y: event.target.y() };
                const end = current?.end ?? {
                  x: (shape.x2 ?? shape.x) - shape.x,
                  y: (shape.y2 ?? shape.y) - shape.y,
                };
                const next = { start, end };
                endpointPreviewRef.current = next;
                setEndpointPreview(next);
              }}
              onDragEnd={(event) => {
                event.cancelBubble = true;
                const current = endpointPreviewRef.current;
                const start = { x: event.target.x(), y: event.target.y() };
                const end = current?.end ?? {
                  x: (shape.x2 ?? shape.x) - shape.x,
                  y: (shape.y2 ?? shape.y) - shape.y,
                };
                const worldStart = { x: shape.x + start.x, y: shape.y + start.y };
                const worldEnd = { x: shape.x + end.x, y: shape.y + end.y };
                onEndpointDragEnd?.(shape.id, worldStart, worldEnd);
                endpointPreviewRef.current = null;
                setEndpointPreview(null);
                event.target.position({ x: 0, y: 0 });
              }}
            />
            <Circle
              x={connectorPoints[connectorPoints.length - 2] ?? 0}
              y={connectorPoints[connectorPoints.length - 1] ?? 0}
              radius={4.5 / Math.max(zoom, 0.01)}
              fill={"#000000"}
              stroke={SELECTED_STROKE}
              strokeWidth={1.5 / Math.max(zoom, 0.01)}
              draggable
              onMouseDown={stopEvent}
              onTouchStart={stopEvent}
              onDragStart={(event) => {
                event.cancelBubble = true;
                const start = { x: 0, y: 0 };
                const end = { x: event.target.x(), y: event.target.y() };
                endpointPreviewRef.current = { start, end };
                setEndpointPreview({ start, end });
              }}
              onDragMove={(event) => {
                event.cancelBubble = true;
                const current = endpointPreviewRef.current;
                const start = current?.start ?? { x: 0, y: 0 };
                const end = { x: event.target.x(), y: event.target.y() };
                const next = { start, end };
                endpointPreviewRef.current = next;
                setEndpointPreview(next);
              }}
              onDragEnd={(event) => {
                event.cancelBubble = true;
                const current = endpointPreviewRef.current;
                const end = { x: event.target.x(), y: event.target.y() };
                const start = current?.start ?? { x: 0, y: 0 };
                const worldStart = { x: shape.x + start.x, y: shape.y + start.y };
                const worldEnd = { x: shape.x + end.x, y: shape.y + end.y };
                onEndpointDragEnd?.(shape.id, worldStart, worldEnd);
                endpointPreviewRef.current = null;
                setEndpointPreview(null);
                event.target.position({
                  x: (shape.x2 ?? shape.x) - shape.x,
                  y: (shape.y2 ?? shape.y) - shape.y,
                });
              }}
            />
          </>
        )}


      </Group>

      {showDelete && (
        <Group
          x={shape.x + bounds.x + bounds.width + 12}
          y={shape.y + bounds.y - 28}
        >
          <Circle
            radius={9}
            fill={DELETE_FILL}
            stroke={SELECTED_STROKE}
            strokeWidth={1}
            onMouseDown={stopEvent}
            onTouchStart={stopEvent}
            onClick={handleDelete}
            onTap={handleDelete}
            onMouseEnter={(event) => hoverDelete(event, true)}
            onMouseLeave={(event) => hoverDelete(event, false)}
          />
          <Line
            points={[-3.5, -3.5, 3.5, 3.5]}
            stroke={DELETE_ICON}
            strokeWidth={1.6}
            lineCap="round"
            listening={false}
          />
          <Line
            points={[3.5, -3.5, -3.5, 3.5]}
            stroke={DELETE_ICON}
            strokeWidth={1.6}
            lineCap="round"
            listening={false}
          />
        </Group>
      )}

      {/*
       * Transformer must be a SIBLING of the Group it targets, never a
       * child of it. Konva throws "Konva.Transformer cannot be a child of
       * the node you are trying to attach" if you nest it inside — which is
       * exactly what was happening before this was pulled out of the Group.
       */}
      {canResize && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          flipEnabled={false}
          keepRatio={false}
          enabledAnchors={[
            "top-left", "top-center", "top-right",
            "middle-left", "middle-right",
            "bottom-left", "bottom-center", "bottom-right",
          ]}
          anchorSize={7}
          borderStroke={SELECTED_STROKE}
          borderDash={[5, 4]}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 40 || newBox.height < 30 ? oldBox : newBox
          }
          onMouseDown={stopEvent}
          onTouchStart={stopEvent}
          onTransformEnd={handleTransformEnd}
        />
      )}
    </>
  );
}

type ConnectionDirection = "top" | "right" | "bottom" | "left";

function BendHandle({
  shape,
  points,
  zoom,
  onPreview,
  onCommit,
}: {
  shape: CanvasShape;
  points: number[];
  zoom: number;
  onPreview: (bend: Point | null) => void;
  onCommit: (bend: Point | undefined) => void;
}) {
  const start = {
    x: points[0] ?? 0,
    y: points[1] ?? 0,
  };
  const end = {
    x: points[points.length - 2] ?? 0,
    y: points[points.length - 1] ?? 0,
  };

  const hasBend = Boolean(shape.bend);
  const defaultX = hasBend
    ? shape.bend!.x - shape.x
    : (start.x + end.x) / 2;
  const defaultY = hasBend
    ? shape.bend!.y - shape.y
    : (start.y + end.y) / 2;

  const makeBend = (x: number, y: number): Point | undefined => {
    const distanceFromStraight = Math.abs(
      (x - start.x) * (end.y - start.y) -
        (y - start.y) * (end.x - start.x),
    );
    const lineLength = Math.max(1, Math.hypot(end.x - start.x, end.y - start.y));

    if (distanceFromStraight / lineLength < 8) return undefined;

    return {
      x: shape.x + x,
      y: shape.y + y,
    };
  };

  return (
    <Circle
      x={defaultX}
      y={defaultY}
      radius={7 / Math.max(zoom, 0.01)}
      fill="#A9854F"
      stroke="#F0E6D2"
      strokeWidth={1.5 / Math.max(zoom, 0.01)}
      hitStrokeWidth={24 / Math.max(zoom, 0.01)}
      draggable
      onMouseDown={(event) => {
        event.cancelBubble = true;
      }}
      onTouchStart={(event) => {
        event.cancelBubble = true;
      }}
      onDragStart={(event) => {
        event.cancelBubble = true;
      }}
      onDragMove={(event) => {
        event.cancelBubble = true;
        onPreview(makeBend(event.target.x(), event.target.y()) ?? null);
      }}
      onDragEnd={(event) => {
        event.cancelBubble = true;
        onCommit(makeBend(event.target.x(), event.target.y()));
        event.target.position({ x: defaultX, y: defaultY });
      }}
    />
  );
}
