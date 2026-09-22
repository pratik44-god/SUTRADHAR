"use client";

import { useState } from "react";

type CreateProjectDialogProps = {
  type: "blank" | "ai" | "template" | "team";
  title: string;
  description: string;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  isCreating: boolean;
};

export default function CreateProjectDialog({
  type,
  title,
  description,
  onCreateProject,
  isCreating,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] =
    useState("");

  const isAvailable = type === "blank";

  const handleCardClick = () => {
    if (!isAvailable) {
      return;
    }

    setProjectTitle("");
    setProjectDescription("");
    setOpen(true);
  };

  const handleCreate = async () => {
    const finalTitle =
      projectTitle.trim() || "Untitled";

    await onCreateProject(
      finalTitle,
      projectDescription.trim() || undefined,
    );

    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={!isAvailable}
        onClick={handleCardClick}
        className={`group relative flex h-[130px] flex-col justify-between rounded-xl border bg-[#111514] p-5 text-left ${
          isAvailable
            ? "border-[#B28A50]/20 transition hover:border-[#C49A5A]/40 hover:bg-[#171A19]"
            : "cursor-not-allowed border-[#B28A50]/10 opacity-55"
        }`}
      >
        <span className="absolute right-5 top-5 text-[20px] leading-none text-[#C49A5A]/80 transition group-hover:translate-x-1">
          →
        </span>

        {type === "blank" && <FileIcon />}
        {type === "ai" && <AIIcon />}
        {type === "template" && <TemplateIcon />}
        {type === "team" && <UsersIcon />}

        <div>
          <h3 className="text-[14px] text-[#E8DECE]">
            {title}
          </h3>

          <p className="mt-1 text-[11px] text-[#8F8980]">
            {description}
          </p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-5 backdrop-blur-[3px]">
          <div className="w-full max-w-[470px] rounded-2xl border border-[#B28A50]/20 bg-[#171A19] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C49A5A]">
                  New project
                </p>

                <h2 className="mt-2 font-serif text-[25px] text-[#F0E7D7]">
                  Blank File
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[21px] leading-none text-[#8D877F] transition hover:text-[#E8DECE]"
              >
                ×
              </button>
            </div>

            <div className="mt-7">
              <label className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8F8980]">
                Project title
              </label>

              <input
                autoFocus
                value={projectTitle}
                onChange={(event) =>
                  setProjectTitle(event.target.value)
                }
                placeholder="Give your idea a name"
                className="mt-2 h-11 w-full rounded-lg border border-[#B28A50]/15 bg-[#0B0F0F] px-3 text-[13px] text-[#E8DECE] outline-none placeholder:text-[#77736C] focus:border-[#C49A5A]/45"
              />
            </div>

            <div className="mt-5">
              <label className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8F8980]">
                Description
              </label>

              <textarea
                value={projectDescription}
                onChange={(event) =>
                  setProjectDescription(event.target.value)
                }
                placeholder="Optional description"
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-[#B28A50]/15 bg-[#0B0F0F] px-3 py-3 text-[13px] text-[#E8DECE] outline-none placeholder:text-[#77736C] focus:border-[#C49A5A]/45"
              />
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-[12px] text-[#999188] transition hover:text-[#E8DECE]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-lg border border-[#C49A5A]/30 bg-[#C49A5A]/10 px-5 py-2 text-[12px] text-[#DCCEB7] transition hover:bg-[#C49A5A]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : "Create project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3.5h8l4 4v13H6z"
        stroke="#C49A5A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5v5h4"
        stroke="#C49A5A"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4"
        stroke="#C49A5A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
        stroke="#C49A5A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function TemplateIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="1"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
      <path
        d="M4 10h16M10 4v16"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
      <path
        d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
      <circle
        cx="17"
        cy="9"
        r="2.5"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
      <path
        d="M16 14c2.8.4 4.5 2.4 5 5"
        stroke="#C49A5A"
        strokeWidth="1.4"
      />
    </svg>
  );
}