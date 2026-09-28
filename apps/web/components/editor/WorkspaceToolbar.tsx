// "use client";

// import type { ReactNode } from "react";
// import type { CanvasTool } from "./canvas/canvas-types";

// type WorkspaceToolbarProps = {
//   activeTool: CanvasTool;
//   canUndo: boolean;
//   canRedo: boolean;
//   onToolChange: (tool: CanvasTool) => void;
//   onInsert: () => void;
//   onUndo: () => void;
//   onRedo: () => void;
// };

// const FOCUS =
//   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

// const TOOL_BUTTONS: Array<{
//   tool: CanvasTool;
//   label: string;
//   icon: "select" | "hand" | "rect" | "ellipse" | "diamond" | "arrow" | "line" | "text" | "draw" | "actor";
// }> = [
//   { tool: "select", label: "Select (V)", icon: "select" },
//   { tool: "hand", label: "Hand (H)", icon: "hand" },
//   { tool: "rectangle", label: "Rectangle (R)", icon: "rect" },
//   { tool: "ellipse", label: "Ellipse (O)", icon: "ellipse" },
//   { tool: "diamond", label: "Diamond (D)", icon: "diamond" },
//   { tool: "arrow", label: "Normal arrow (A)", icon: "arrow" },
//   { tool: "line", label: "Line (L)", icon: "line" },
//   { tool: "text", label: "Text (T)", icon: "text" },
//   { tool: "draw", label: "Draw (P)", icon: "draw" },
//   { tool: "actor", label: "Actor", icon: "actor" },
// ];

// export default function WorkspaceToolbar({
//   activeTool,
//   canUndo,
//   canRedo,
//   onToolChange,
//   onInsert,
//   onUndo,
//   onRedo,
// }: WorkspaceToolbarProps) {
//   return (
//     <aside
//       aria-label="Canvas tools"
//       className="absolute left-3 top-1/2 z-50 flex max-h-[calc(100vh-24px)] -translate-y-1/2 flex-col items-center gap-1 overflow-y-auto rounded-2xl border border-[#2A2118] bg-[#14110E]/95 p-1.5 shadow-2xl backdrop-blur-xl"
//     >
//       {TOOL_BUTTONS.map((button) => (
//         <ToolButton
//           key={button.tool}
//           active={activeTool === button.tool}
//           label={button.label}
//           onClick={() => onToolChange(button.tool)}
//         >
//           <ToolIcon type={button.icon} />
//         </ToolButton>
//       ))}

//       <Divider />

//       <ToolButton label="Insert shape" onClick={onInsert}>
//         <PlusIcon />
//       </ToolButton>

//       <Divider />

//       <ToolButton label="Undo (Ctrl Z)" disabled={!canUndo} onClick={onUndo}>
//         <UndoIcon />
//       </ToolButton>
//       <ToolButton label="Redo (Ctrl Shift Z)" disabled={!canRedo} onClick={onRedo}>
//         <RedoIcon />
//       </ToolButton>
//     </aside>
//   );
// }

// function ToolButton({
//   active = false,
//   disabled = false,
//   label,
//   onClick,
//   children,
// }: {
//   active?: boolean;
//   disabled?: boolean;
//   label: string;
//   onClick: () => void;
//   children: ReactNode;
// }) {
//   return (
//     <button
//       type="button"
//       title={label}
//       aria-label={label}
//       aria-pressed={active}
//       disabled={disabled}
//       onClick={onClick}
//       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${FOCUS} ${
//         active
//           ? "border border-[#A9854F]/45 bg-[#211A13] text-[#F0E6D2] shadow-[inset_0_0_0_1px_rgba(169,133,79,0.18)]"
//           : "border border-transparent text-[#A99678] hover:bg-[#211A13] hover:text-[#F0E6D2]"
//       } ${disabled ? "cursor-not-allowed opacity-30" : ""}`}
//     >
//       {children}
//     </button>
//   );
// }

// function Divider() {
//   return <div className="my-1 h-px w-7 shrink-0 bg-[#2A2118]" />;
// }

// function ToolIcon({
//   type,
// }: {
//   type:
//     | "select"
//     | "hand"
//     | "rect"
//     | "ellipse"
//     | "diamond"
//     | "arrow"
//     | "line"
//     | "text"
//     | "draw"
//     | "actor";
// }) {
//   const common = {
//     width: 20,
//     height: 20,
//     viewBox: "0 0 24 24",
//     fill: "none",
//     stroke: "currentColor",
//     strokeWidth: 1.7,
//     strokeLinecap: "round" as const,
//     strokeLinejoin: "round" as const,
//     "aria-hidden": true,
//   };

//   switch (type) {
//     case "select":
//       return (
//         <svg {...common}>
//           <path d="M6 3l12 9-6 1.5L10.5 20 8 18.5l1.5-6L6 3z" fill="currentColor" stroke="none" />
//         </svg>
//       );
//     case "hand":
//       return (
//         <svg {...common}>
//           <path d="M8 11V6.5a1.3 1.3 0 012.6 0V10" />
//           <path d="M10.6 10V5.2a1.3 1.3 0 012.6 0V10" />
//           <path d="M13.2 10V6.1a1.3 1.3 0 012.6 0v5" />
//           <path d="M15.8 11V8.5a1.3 1.3 0 012.6 0v6.3c0 3.4-2.1 5.2-5.1 5.2h-.8c-2.1 0-3.2-1.1-4.1-2.6L6.7 14a1.4 1.4 0 012.4-1.4L10 14" />
//         </svg>
//       );
//     case "rect":
//       return (
//         <svg {...common}>
//           <rect x="4" y="5" width="16" height="14" rx="1.5" />
//         </svg>
//       );
//     case "ellipse":
//       return (
//         <svg {...common}>
//           <ellipse cx="12" cy="12" rx="7.5" ry="8.5" />
//         </svg>
//       );
//     case "diamond":
//       return (
//         <svg {...common}>
//           <path d="M12 4l7 8-7 8-7-8 7-8z" />
//         </svg>
//       );
//     case "arrow":
//       return (
//         <svg {...common}>
//           <path d="M4 18L18 6" />
//           <path d="M12 6h6v6" />
//         </svg>
//       );
//     case "line":
//       return (
//         <svg {...common}>
//           <path d="M4 18L20 6" />
//         </svg>
//       );
//     case "text":
//       return (
//         <svg {...common}>
//           <path d="M5 5h14M12 5v14M8.5 19h7" />
//         </svg>
//       );
//     case "draw":
//       return (
//         <svg {...common}>
//           <path d="M5 19l2.5-.5L18.7 7.3a1.8 1.8 0 00-2.5-2.5L5 16.9V19z" />
//           <path d="M14.8 6.8l2.5 2.5" />
//         </svg>
//       );
//     case "actor":
//       return (
//         <svg {...common}>
//           <circle cx="12" cy="5.5" r="2.5" />
//           <path d="M12 8v7M8 11l4-3 4 3M9 20l3-5 3 5M7 20h10" />
//         </svg>
//       );
//   }
// }

// function PlusIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
//       <path d="M12 5v14M5 12h14" />
//     </svg>
//   );
// }

// function UndoIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M9 7L4 12l5 5" />
//       <path d="M5 12h8.5a5.5 5.5 0 015.5 5.5V19" />
//     </svg>
//   );
// }

// function RedoIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M15 7l5 5-5 5" />
//       <path d="M19 12h-8.5A5.5 5.5 0 005 17.5V19" />
//     </svg>
//   );
// }

"use client";

import type { ReactNode } from "react";
import type { CanvasTool } from "./canvas/canvas-types";

type WorkspaceToolbarProps = {
  activeTool: CanvasTool;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: CanvasTool) => void;
  onInsert: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

const TOOL_BUTTONS: Array<{
  tool: CanvasTool;
  label: string;
  icon: "select" | "hand" | "rect" | "ellipse" | "diamond" | "arrow" | "line" | "text" | "draw" | "actor";
}> = [
  { tool: "select", label: "Select (V)", icon: "select" },
  { tool: "hand", label: "Hand (H)", icon: "hand" },
  { tool: "rectangle", label: "Rectangle (R)", icon: "rect" },
  { tool: "ellipse", label: "Ellipse (O)", icon: "ellipse" },
  { tool: "diamond", label: "Diamond (D)", icon: "diamond" },
  { tool: "arrow", label: "Normal arrow (A)", icon: "arrow" },
  { tool: "line", label: "Line (L)", icon: "line" },
  { tool: "text", label: "Text (T)", icon: "text" },
  { tool: "draw", label: "Draw (P)", icon: "draw" },
  { tool: "actor", label: "Actor", icon: "actor" },
];

export default function WorkspaceToolbar({
  activeTool,
  canUndo,
  canRedo,
  onToolChange,
  onInsert,
  onUndo,
  onRedo,
}: WorkspaceToolbarProps) {
  return (
    <aside
      aria-label="Canvas tools"
      className="absolute left-3 top-1/2 z-50 flex max-h-[calc(100vh-24px)] -translate-y-1/2 flex-col items-center gap-1 overflow-y-auto rounded-2xl border border-[#2A2118] bg-[#14110E]/95 p-1.5 shadow-2xl backdrop-blur-xl"
    >
      {TOOL_BUTTONS.map((button) => (
        <ToolButton
          key={button.tool}
          active={activeTool === button.tool}
          label={button.label}
          onClick={() => onToolChange(button.tool)}
        >
          <ToolIcon type={button.icon} />
        </ToolButton>
      ))}

      <Divider />

      <ToolButton label="Insert shape" onClick={onInsert}>
        <PlusIcon />
      </ToolButton>

      <Divider />

      <ToolButton label="Undo (Ctrl Z)" disabled={!canUndo} onClick={onUndo}>
        <UndoIcon />
      </ToolButton>
      <ToolButton label="Redo (Ctrl Shift Z)" disabled={!canRedo} onClick={onRedo}>
        <RedoIcon />
      </ToolButton>
    </aside>
  );
}

function ToolButton({
  active = false,
  disabled = false,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${FOCUS} ${
        active
          ? "border border-[#A9854F]/45 bg-[#211A13] text-[#F0E6D2] shadow-[inset_0_0_0_1px_rgba(169,133,79,0.18)]"
          : "border border-transparent text-[#A99678] hover:bg-[#211A13] hover:text-[#F0E6D2]"
      } ${disabled ? "cursor-not-allowed opacity-30" : ""}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1 h-px w-7 shrink-0 bg-[#2A2118]" />;
}

function ToolIcon({
  type,
}: {
  type:
    | "select"
    | "hand"
    | "rect"
    | "ellipse"
    | "diamond"
    | "arrow"
    | "line"
    | "text"
    | "draw"
    | "actor";
}) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "select":
      return (
        <svg {...common}>
          <path d="M6 3l12 9-6 1.5L10.5 20 8 18.5l1.5-6L6 3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path d="M8 11V6.5a1.3 1.3 0 012.6 0V10" />
          <path d="M10.6 10V5.2a1.3 1.3 0 012.6 0V10" />
          <path d="M13.2 10V6.1a1.3 1.3 0 012.6 0v5" />
          <path d="M15.8 11V8.5a1.3 1.3 0 012.6 0v6.3c0 3.4-2.1 5.2-5.1 5.2h-.8c-2.1 0-3.2-1.1-4.1-2.6L6.7 14a1.4 1.4 0 012.4-1.4L10 14" />
        </svg>
      );
    case "rect":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="1.5" />
        </svg>
      );
    case "ellipse":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="7.5" ry="8.5" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 4l7 8-7 8-7-8 7-8z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M4 18L18 6" />
          <path d="M12 6h6v6" />
        </svg>
      );
    case "line":
      return (
        <svg {...common}>
          <path d="M4 18L20 6" />
        </svg>
      );
    case "text":
      return (
        <svg {...common}>
          <path d="M5 5h14M12 5v14M8.5 19h7" />
        </svg>
      );
    case "draw":
      return (
        <svg {...common}>
          <path d="M5 19l2.5-.5L18.7 7.3a1.8 1.8 0 00-2.5-2.5L5 16.9V19z" />
          <path d="M14.8 6.8l2.5 2.5" />
        </svg>
      );
    case "actor":
      return (
        <svg {...common}>
          <circle cx="12" cy="5.5" r="2.5" />
          <path d="M12 8v7M8 11l4-3 4 3M9 20l3-5 3 5M7 20h10" />
        </svg>
      );
  }
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 7L4 12l5 5" />
      <path d="M5 12h8.5a5.5 5.5 0 015.5 5.5V19" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 7l5 5-5 5" />
      <path d="M19 12h-8.5A5.5 5.5 0 005 17.5V19" />
    </svg>
  );
}
