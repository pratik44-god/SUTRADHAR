"use client";

import type { KeyboardEvent, MouseEvent } from "react";

type Project = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectCardProps = {
  project: Project;
  onOpenProject: (id: string) => void;
  onDeleteProject: (id: string) => Promise<void>;
};

export default function ProjectCard({
  project,
  onOpenProject,
  onDeleteProject,
}: ProjectCardProps) {
  const handleOpenProject = () => {
    onOpenProject(project.id);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenProject(project.id);
    }
  };

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${project.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    await onDeleteProject(project.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenProject}
      onKeyDown={handleKeyDown}
      className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_105px_105px_35px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101312] px-5 py-3 transition duration-200 hover:border-[#A9854F]/20 hover:bg-[#141716]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#1A1C19]">
          <ProjectIcon />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[13px] text-[#DDD4C5]">
            {project.title}
          </h3>

          <p className="mt-1 truncate text-[10px] text-[#77736B]">
            {project.description || "No description"}
          </p>
        </div>
      </div>

      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#68645D]">
          Created
        </p>

        <p className="mt-1 text-[10px] text-[#AFA699]">
          {formatDate(project.createdAt)}
        </p>
      </div>

      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#68645D]">
          Edited
        </p>

        <p className="mt-1 text-[10px] text-[#AFA699]">
          {formatEdited(project.updatedAt)}
        </p>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete ${project.title}`}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[14px] tracking-[1px] text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
      >
        ...
      </button>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatEdited(date: Date) {
  const now = Date.now();
  const updated = date.getTime();

  const difference = now - updated;

  const minutes = Math.floor(
    difference / (1000 * 60),
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function ProjectIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1"
        stroke="#B99052"
        strokeWidth="1.3"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1"
        stroke="#B99052"
        strokeWidth="1.3"
      />

      <path
        d="M10 7H14"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M17 10V14"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M10 17H14"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M7 10V14"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}