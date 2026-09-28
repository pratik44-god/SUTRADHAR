// "use client";

// import { useState } from "react";

// export type SaveStatus =
//   | "saved"
//   | "unsaved"
//   | "saving"
//   | "error"
//   | "unavailable";

// type WorkspaceHeaderProps = {
//   title: string;
//   onTitleChange: (title: string) => void;
//   onBack: () => void;
//   saveStatus?: SaveStatus;
//   onSave?: () => void;
//   /** The Share button is only shown when a handler is provided. */
//   onShare?: () => void;
// };

// const STATUS: Record<
//   SaveStatus,
//   { label: string; hint: string; dot: string; text: string }
// > = {
//   saved: {
//     label: "Saved",
//     hint: "All changes are saved",
//     dot: "bg-[#7FB08A]",
//     text: "text-[#9A896F]",
//   },
//   unsaved: {
//     label: "Unsaved changes",
//     hint: "Save now (Ctrl S)",
//     dot: "bg-[#C69A5B]",
//     text: "text-[#D6C4A3]",
//   },
//   saving: {
//     label: "Saving…",
//     hint: "Saving your changes",
//     dot: "bg-[#C69A5B] animate-pulse",
//     text: "text-[#D6C4A3]",
//   },
//   error: {
//     label: "Save failed. Retry",
//     hint: "Couldn't save. Click to retry (Ctrl S)",
//     dot: "bg-[#D9776B]",
//     text: "text-[#E9B4AB]",
//   },
//   unavailable: {
//     label: "Not saved",
//     hint: "Changes can't be saved because no storage is connected to this workspace",
//     dot: "bg-[#D9776B]",
//     text: "text-[#E9B4AB]",
//   },
// };

// const FOCUS =
//   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

// export default function WorkspaceHeader({
//   title,
//   onTitleChange,
//   onBack,
//   saveStatus = "saved",
//   onSave,
//   onShare,
// }: WorkspaceHeaderProps) {
//   const [focused, setFocused] = useState(false);
//   const status = STATUS[saveStatus] ?? STATUS.saved;
//   const canSave = saveStatus === "unsaved" || saveStatus === "error";

//   return (
//     <header className="absolute inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-[#2A2118] bg-[#0F0D0A]/95 px-4 backdrop-blur-xl">
//       <div className="flex min-w-0 items-center gap-2">
//         <button
//           type="button"
//           onClick={onBack}
//           title="Back to dashboard"
//           aria-label="Back to dashboard"
//           className={`flex h-9 w-9 items-center justify-center rounded-lg text-[#9A896F] transition hover:bg-[#17130F] hover:text-[#F0E6D2] ${FOCUS}`}
//         >
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//           >
//             <path d="M19 12H5M11 6l-6 6 6 6" />
//           </svg>
//         </button>

//         <span className="hidden text-[13px] font-semibold tracking-tight text-[#D6C4A3] sm:block">
//           Sutradhara
//         </span>
//         <span aria-hidden="true" className="hidden text-[#3E362D] sm:block">
//           /
//         </span>

//         <input
//           id="project-title"
//           name="project-title"
//           autoComplete="off"
//           value={title}
//           onChange={(event) => onTitleChange(event.target.value)}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           onKeyDown={(event) => {
//             if (event.key === "Enter") event.currentTarget.blur();
//           }}
//           maxLength={80}
//           placeholder="Untitled diagram"
//           aria-label="Project title"
//           className={`h-8 w-[220px] min-w-0 truncate rounded-md border px-2 text-[14px] font-medium text-[#F0E6D2] outline-none transition placeholder:text-[#655A4E] sm:w-[280px] ${
//             focused
//               ? "border-[#A9854F]/60 bg-[#14110E]"
//               : "border-transparent bg-transparent hover:border-[#2A2118]"
//           }`}
//         />
//       </div>

//       <div className="flex shrink-0 items-center gap-2">
//         <button
//           type="button"
//           onClick={onSave}
//           disabled={!canSave}
//           title={status.hint}
//           className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] transition enabled:hover:bg-[#17130F] ${FOCUS} ${status.text}`}
//         >
//           <span
//             aria-hidden="true"
//             className={`h-2 w-2 rounded-full ${status.dot}`}
//           />
//           <span role="status" aria-live="polite">
//             {status.label}
//           </span>
//         </button>

//         {onShare && (
//           <button
//             type="button"
//             onClick={onShare}
//             className={`h-9 rounded-lg border border-[#A9854F]/45 bg-[#A9854F]/15 px-4 text-[13px] font-medium text-[#F0E6D2] transition hover:bg-[#A9854F]/25 ${FOCUS}`}
//           >
//             Share
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }


"use client";

import { useState } from "react";

export type SaveStatus =
  | "saved"
  | "unsaved"
  | "saving"
  | "error"
  | "unavailable";

type WorkspaceHeaderProps = {
  title: string;
  onTitleChange: (title: string) => void;
  onBack: () => void;
  onArchive?: () => void;
  saveStatus?: SaveStatus;
  onSave?: () => void;
  onShare?: () => void;
};

const STATUS: Record<
  SaveStatus,
  { label: string; hint: string; dot: string; text: string }
> = {
  saved: {
    label: "Saved",
    hint: "All changes are saved",
    dot: "bg-[#7FB08A]",
    text: "text-[#9A896F]",
  },
  unsaved: {
    label: "Unsaved changes",
    hint: "Save now (Ctrl S)",
    dot: "bg-[#C69A5B]",
    text: "text-[#D6C4A3]",
  },
  saving: {
    label: "Saving…",
    hint: "Saving your changes",
    dot: "bg-[#C69A5B] animate-pulse",
    text: "text-[#D6C4A3]",
  },
  error: {
    label: "Save failed. Retry",
    hint: "Couldn't save. Click to retry (Ctrl S)",
    dot: "bg-[#D9776B]",
    text: "text-[#E9B4AB]",
  },
  unavailable: {
    label: "Not saved",
    hint: "Changes can't be saved because no storage is connected to this workspace",
    dot: "bg-[#D9776B]",
    text: "text-[#E9B4AB]",
  },
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A5B]/60";

export default function WorkspaceHeader({
  title,
  onTitleChange,
  onBack,
  onArchive,
  saveStatus = "saved",
  onSave,
  onShare,
}: WorkspaceHeaderProps) {
  const [focused, setFocused] = useState(false);

  const status = STATUS[saveStatus] ?? STATUS.saved;
  const canSave = saveStatus === "unsaved" || saveStatus === "error";

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-[#2A2118] bg-[#0F0D0A]/95 px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          title="Back to dashboard"
          aria-label="Back to dashboard"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-[#9A896F] transition hover:bg-[#17130F] hover:text-[#F0E6D2] ${FOCUS}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>

        <span
          aria-hidden="true"
          className="hidden text-[#3E362D] sm:block"
        >
          /
        </span>

        <input
          id="project-title"
          name="project-title"
          autoComplete="off"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          maxLength={80}
          placeholder="Untitled diagram"
          aria-label="Project title"
          className={`h-8 w-[220px] min-w-0 truncate rounded-md border px-2 text-[14px] font-medium text-[#F0E6D2] outline-none transition placeholder:text-[#655A4E] sm:w-[280px] ${
            focused
              ? "border-[#A9854F]/60 bg-[#14110E]"
              : "border-transparent bg-transparent hover:border-[#2A2118]"
          }`}
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          title={status.hint}
          className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] transition enabled:hover:bg-[#17130F] ${FOCUS} ${status.text}`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${status.dot}`}
          />

          <span role="status" aria-live="polite">
            {status.label}
          </span>
        </button>

        {onArchive && (
          <button
            type="button"
            onClick={onArchive}
            title="Archive project"
            className={`h-9 rounded-lg border border-[#6F5940] bg-[#17130F] px-3 text-[13px] font-medium text-[#BFAE94] transition hover:border-[#A9854F]/60 hover:bg-[#211A13] hover:text-[#F0E6D2] ${FOCUS}`}
          >
            Archive
          </button>
        )}

        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className={`h-9 rounded-lg border border-[#A9854F]/45 bg-[#A9854F]/15 px-4 text-[13px] font-medium text-[#F0E6D2] transition hover:bg-[#A9854F]/25 ${FOCUS}`}
          >
            Share
          </button>
        )}
      </div>
    </header>
  );
}