// "use client";

// import type {
//   KeyboardEvent,
//   MouseEvent,
// } from "react";

// type Project = {
//   id: string;
//   title: string;
//   description: string | null;
//   createdAt: string;
//   updatedAt: string;
//   creatorsId: string;
//   status:
//     | "DRAFT"
//     | "PUBLISHED"
//     | "ARCHIVED";
// };

// type ProjectCardProps = {
//   project: Project;
//   authorName?: string;
//   onOpenProject: (id: string) => void;
//   onDeleteProject: (id: string) => Promise<void>;
// };

// export default function ProjectCard({
//   project,
//   authorName = "User",
//   onOpenProject,
//   onDeleteProject,
// }: ProjectCardProps) {
//   const handleOpenProject = () => {
//     onOpenProject(project.id);
//   };

//   const handleKeyDown = (
//     event: KeyboardEvent<HTMLDivElement>,
//   ) => {
//     if (
//       event.key === "Enter" ||
//       event.key === " "
//     ) {
//       event.preventDefault();
//       onOpenProject(project.id);
//     }
//   };

//   const handleDelete = async (
//     event: MouseEvent<HTMLButtonElement>,
//   ) => {
//     event.stopPropagation();

//     const confirmed = window.confirm(
//       `Delete "${project.title}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     await onDeleteProject(project.id);
//   };

//   const createdDate =
//     new Date(
//       project.createdAt,
//     ).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const updatedDate =
//     new Date(
//       project.updatedAt,
//     ).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const authorInitial =
//     authorName
//       .trim()
//       .charAt(0)
//       .toUpperCase() || "U";

//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={handleOpenProject}
//       onKeyDown={handleKeyDown}
//       className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_125px_125px_58px_38px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
//     >
//       {/* Project */}
//       <div className="flex min-w-0 items-center gap-4">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
//           <ProjectIcon />
//         </div>

//         <div className="min-w-0">
//           <h3 className="truncate text-[15px] font-medium leading-6 text-[#E1D8C9]">
//             {project.title}
//           </h3>

//           <p className="mt-0.5 truncate text-[12px] leading-5 text-[#77736B]">
//             {project.description ||
//               "No description"}
//           </p>
//         </div>
//       </div>

//       {/* Created */}
//       <div>
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Created
//         </p>

//         <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">
//           {createdDate}
//         </p>
//       </div>

//       {/* Edited */}
//       <div>
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Edited
//         </p>

//         <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">
//           {updatedDate}
//         </p>
//       </div>

//       {/* Author */}
//       <div>
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Author
//         </p>

//         <div className="mt-1.5 flex items-center">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[12px] text-[#D6C4A3]">
//             {authorInitial}
//           </div>
//         </div>
//       </div>

//       {/* Delete */}
//       <button
//         type="button"
//         onClick={handleDelete}
//         aria-label={`Delete ${project.title}`}
//         className="flex h-8 w-8 items-center justify-center rounded-md text-[16px] text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
//       >
//         ⋯
//       </button>
//     </div>
//   );
// }

// function ProjectIcon() {
//   return (
//     <svg
//       width="23"
//       height="23"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <rect
//         x="4"
//         y="4"
//         width="6"
//         height="6"
//         rx="1"
//         stroke="#B99052"
//         strokeWidth="1.3"
//       />

//       <rect
//         x="14"
//         y="14"
//         width="6"
//         height="6"
//         rx="1"
//         stroke="#B99052"
//         strokeWidth="1.3"
//       />

//       <path
//         d="M10 7H14"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M17 10V14"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M10 17H14"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M7 10V14"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

"use client";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  creatorsId: string;
  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";
};

type ProjectCardProps = {
  project: Project;
  authorName?: string;
  onOpenProject: (id: string) => void;
  onDeleteProject: (id: string) => Promise<void>;
};

export default function ProjectCard({
  project,
  authorName = "User",
  onOpenProject,
  onDeleteProject,
}: ProjectCardProps) {
  const [
    isConfirmingDelete,
    setIsConfirmingDelete,
  ] = useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const handleOpenProject = () => {
    if (
      isConfirmingDelete ||
      isDeleting
    ) {
      return;
    }

    onOpenProject(project.id);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      if (
        isConfirmingDelete ||
        isDeleting
      ) {
        return;
      }

      onOpenProject(project.id);
    }
  };

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeleting) {
      return;
    }

    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeleting) {
      return;
    }

    setIsConfirmingDelete(false);
  };

  const handleConfirmDelete = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      await onDeleteProject(project.id);

      setIsConfirmingDelete(false);
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const createdDate =
    new Date(
      project.createdAt,
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const updatedDate =
    new Date(
      project.updatedAt,
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const authorInitial =
    authorName
      .trim()
      .charAt(0)
      .toUpperCase() || "U";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenProject}
      onKeyDown={handleKeyDown}
      className="group relative grid cursor-pointer grid-cols-[minmax(0,1fr)_125px_125px_58px_38px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
    >
      {/* Project */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
          <ProjectIcon />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium leading-6 text-[#E1D8C9]">
            {project.title}
          </h3>

          <p className="mt-0.5 truncate text-[12px] leading-5 text-[#77736B]">
            {project.description ||
              "No description"}
          </p>
        </div>
      </div>

      {/* Created */}
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
          Created
        </p>

        <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">
          {createdDate}
        </p>
      </div>

      {/* Edited */}
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
          Edited
        </p>

        <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">
          {updatedDate}
        </p>
      </div>

      {/* Author */}
      <div className="relative z-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
          Author
        </p>

        <div className="mt-1.5 flex items-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[12px] text-[#D6C4A3]">
            {authorInitial}
          </div>
        </div>
      </div>

      {/* Delete */}
      <div
        className="relative z-20 flex h-8 w-[38px] items-center justify-end"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {!isConfirmingDelete && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${project.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
          >
            <TrashIcon />
          </button>
        )}

        {isConfirmingDelete && (
          <div className="absolute right-0 top-1/2 z-50 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-[#A9854F]/10 bg-[#101211] p-1 shadow-[0_8px_25px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={
                handleConfirmDelete
              }
              disabled={isDeleting}
              className="rounded-md border border-[#8A493D]/50 bg-[#5A2E27]/20 px-3 py-1.5 text-[9px] font-medium text-[#D8A69A] transition hover:border-[#A65B4E]/70 hover:bg-[#6B362E]/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting
                ? "Deleting..."
                : "Confirm"}
            </button>

            <button
              type="button"
              onClick={
                handleCancelDelete
              }
              disabled={isDeleting}
              className="rounded-md border border-[#A9854F]/10 bg-[#0D0F0E] px-3 py-1.5 text-[9px] text-[#77736B] transition hover:border-[#A9854F]/20 hover:text-[#B9AD9B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectIcon() {
  return (
    <svg
      width="23"
      height="23"
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

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M9 7V5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M7 7L7.8 18.2C7.87 19.22 8.73 20 9.75 20H14.25C15.27 20 16.13 19.22 16.2 18.2L17 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10.5 11V16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M13.5 11V16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}