// // "use client";

// // import type {
// //   KeyboardEvent,
// //   MouseEvent,
// // } from "react";

// // type Project = {
// //   id: string;
// //   title: string;
// //   description?: string | null;
// //   createdAt: Date | string;
// //   updatedAt: Date | string;
// // };

// // type ProjectCardProps = {
// //   project: Project;
// //   onOpenProject: (
// //     id: string,
// //   ) => void;
// //   onDeleteProject: (
// //     id: string,
// //   ) => Promise<void>;
// // };

// // export default function ProjectCard({
// //   project,
// //   onOpenProject,
// //   onDeleteProject,
// // }: ProjectCardProps) {
// //   const handleOpenProject = () => {
// //     onOpenProject(project.id);
// //   };

// //   const handleKeyDown = (
// //     event: KeyboardEvent<HTMLDivElement>,
// //   ) => {
// //     if (
// //       event.key === "Enter" ||
// //       event.key === " "
// //     ) {
// //       event.preventDefault();

// //       onOpenProject(project.id);
// //     }
// //   };

// //   const handleDelete = async (
// //     event: MouseEvent<HTMLButtonElement>,
// //   ) => {
// //     event.stopPropagation();

// //     const confirmed = window.confirm(
// //       `Delete "${project.title}"?`,
// //     );

// //     if (!confirmed) {
// //       return;
// //     }

// //     await onDeleteProject(project.id);
// //   };

// //   return (
// //     <div
// //       role="button"
// //       tabIndex={0}
// //       onClick={handleOpenProject}
// //       onKeyDown={handleKeyDown}
// //       className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_110px_110px_32px] items-center gap-4 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-4 py-3 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
// //     >
// //       <div className="flex min-w-0 items-center gap-3">
// //         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
// //           <ProjectIcon />
// //         </div>

// //         <div className="min-w-0">
// //           <h3 className="truncate text-[13px] font-medium text-[#DDD4C5]">
// //             {project.title}
// //           </h3>

// //           <p className="mt-1 truncate text-[10px] text-[#77736B]">
// //             {project.description ||
// //               "No description"}
// //           </p>
// //         </div>
// //       </div>

// //       <div>
// //         <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#68645D]">
// //           Created
// //         </p>

// //         <p className="mt-1 text-[10px] text-[#AFA699]">
// //           {new Date(
// //             project.createdAt,
// //           ).toLocaleDateString(
// //             "en-IN",
// //             {
// //               day: "2-digit",
// //               month: "short",
// //               year: "numeric",
// //             },
// //           )}
// //         </p>
// //       </div>

// //       <div>
// //         <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#68645D]">
// //           Edited
// //         </p>

// //         <p className="mt-1 text-[10px] text-[#AFA699]">
// //           {new Date(
// //             project.updatedAt,
// //           ).toLocaleDateString(
// //             "en-IN",
// //             {
// //               day: "2-digit",
// //               month: "short",
// //               year: "numeric",
// //             },
// //           )}
// //         </p>
// //       </div>

// //       <button
// //         type="button"
// //         onClick={handleDelete}
// //         aria-label={`Delete ${project.title}`}
// //         className="flex h-8 w-8 items-center justify-center rounded-md text-[13px] text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
// //       >
// //         ⋯
// //       </button>
// //     </div>
// //   );
// // }

// // function ProjectIcon() {
// //   return (
// //     <svg
// //       width="22"
// //       height="22"
// //       viewBox="0 0 24 24"
// //       fill="none"
// //     >
// //       <rect
// //         x="4"
// //         y="4"
// //         width="6"
// //         height="6"
// //         rx="1"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //       />

// //       <rect
// //         x="14"
// //         y="14"
// //         width="6"
// //         height="6"
// //         rx="1"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //       />

// //       <path
// //         d="M10 7H14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M17 10V14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M10 17H14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M7 10V14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />
// //     </svg>
// //   );
// // }

// // "use client";

// // import type {
// //   KeyboardEvent,
// //   MouseEvent,
// // } from "react";

// // type Project = {
// //   id: string;
// //   title: string;
// //   description: string | null;
// //   createdAt: string;
// //   updatedAt: string;
// //   creatorsId: string;
// //   status:
// //     | "DRAFT"
// //     | "PUBLISHED"
// //     | "ARCHIVED";
// // };

// // type ProjectCardProps = {
// //   project: Project;
// //   authorName?: string;
// //   onOpenProject: (
// //     id: string,
// //   ) => void;
// //   onDeleteProject: (
// //     id: string,
// //   ) => Promise<void>;
// // };

// // export default function ProjectCard({
// //   project,
// //   authorName = "You",
// //   onOpenProject,
// //   onDeleteProject,
// // }: ProjectCardProps) {
// //   const handleOpenProject = () => {
// //     onOpenProject(project.id);
// //   };

// //   const handleKeyDown = (
// //     event: KeyboardEvent<HTMLDivElement>,
// //   ) => {
// //     if (
// //       event.key === "Enter" ||
// //       event.key === " "
// //     ) {
// //       event.preventDefault();

// //       onOpenProject(project.id);
// //     }
// //   };

// //   const handleDelete = async (
// //     event: MouseEvent<HTMLButtonElement>,
// //   ) => {
// //     event.stopPropagation();

// //     const confirmed = window.confirm(
// //       `Delete "${project.title}"?`,
// //     );

// //     if (!confirmed) {
// //       return;
// //     }

// //     await onDeleteProject(project.id);
// //   };

// //   const createdDate =
// //     new Date(
// //       project.createdAt,
// //     ).toLocaleDateString(
// //       "en-IN",
// //       {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       },
// //     );

// //   const updatedDate =
// //     new Date(
// //       project.updatedAt,
// //     ).toLocaleDateString(
// //       "en-IN",
// //       {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       },
// //     );

// //   return (
// //     <div
// //       role="button"
// //       tabIndex={0}
// //       onClick={handleOpenProject}
// //       onKeyDown={handleKeyDown}
// //       className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_105px_105px_145px_36px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
// //     >
// //       <div className="flex min-w-0 items-center gap-4">
// //         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
// //           <ProjectIcon />
// //         </div>

// //         <div className="min-w-0">
// //           <h3 className="truncate text-[14px] font-medium text-[#DDD4C5]">
// //             {project.title}
// //           </h3>

// //           <p className="mt-1 truncate text-[11px] text-[#77736B]">
// //             {project.description ||
// //               "No description"}
// //           </p>
// //         </div>
// //       </div>

// //       <div>
// //         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
// //           Created
// //         </p>

// //         <p className="mt-1.5 text-[11px] text-[#AFA699]">
// //           {createdDate}
// //         </p>
// //       </div>

// //       <div>
// //         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
// //           Edited
// //         </p>

// //         <p className="mt-1.5 text-[11px] text-[#AFA699]">
// //           {updatedDate}
// //         </p>
// //       </div>

// //       <div className="min-w-0">
// //         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
// //           Author
// //         </p>

// //         <div className="mt-1.5 flex items-center gap-2">
// //           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[9px] text-[#D6C4A3]">
// //             {getInitials(authorName)}
// //           </div>

// //           <p className="truncate text-[11px] text-[#AFA699]">
// //             {authorName}
// //           </p>
// //         </div>
// //       </div>

// //       <button
// //         type="button"
// //         onClick={handleDelete}
// //         aria-label={`Delete ${project.title}`}
// //         className="flex h-8 w-8 items-center justify-center rounded-md text-[16px] text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
// //       >
// //         ⋯
// //       </button>
// //     </div>
// //   );
// // }

// // function getInitials(
// //   name: string,
// // ) {
// //   const initials =
// //     name
// //       .trim()
// //       .split(/\s+/)
// //       .map(
// //         (part) => part[0],
// //       )
// //       .join("")
// //       .slice(0, 2)
// //       .toUpperCase();

// //   return initials || "U";
// // }

// // function ProjectIcon() {
// //   return (
// //     <svg
// //       width="23"
// //       height="23"
// //       viewBox="0 0 24 24"
// //       fill="none"
// //     >
// //       <rect
// //         x="4"
// //         y="4"
// //         width="6"
// //         height="6"
// //         rx="1"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //       />

// //       <rect
// //         x="14"
// //         y="14"
// //         width="6"
// //         height="6"
// //         rx="1"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //       />

// //       <path
// //         d="M10 7H14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M17 10V14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M10 17H14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />

// //       <path
// //         d="M7 10V14"
// //         stroke="#B99052"
// //         strokeWidth="1.3"
// //         strokeLinecap="round"
// //       />
// //     </svg>
// //   );
// // }

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

//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={handleOpenProject}
//       onKeyDown={handleKeyDown}
//       className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_105px_105px_145px_36px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
//     >
//       <div className="flex min-w-0 items-center gap-4">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
//           <ProjectIcon />
//         </div>

//         <div className="min-w-0">
//           <h3 className="truncate text-[14px] font-medium text-[#DDD4C5]">
//             {project.title}
//           </h3>

//           <p className="mt-1 truncate text-[11px] text-[#77736B]">
//             {project.description ||
//               "No description"}
//           </p>
//         </div>
//       </div>

//       <div>
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Created
//         </p>

//         <p className="mt-1.5 text-[11px] text-[#AFA699]">
//           {createdDate}
//         </p>
//       </div>

//       <div>
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Edited
//         </p>

//         <p className="mt-1.5 text-[11px] text-[#AFA699]">
//           {updatedDate}
//         </p>
//       </div>

//       <div className="min-w-0">
//         <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
//           Author
//         </p>

//         <div className="mt-1.5 flex items-center gap-2">
//           <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[11px] text-[#D6C4A3]">
//             {authorName
//               .trim()
//               .charAt(0)
//               .toUpperCase() || "U"}
//           </div>

//           <p className="truncate text-[11px] text-[#AFA699]">
//             {authorName}
//           </p>
//         </div>
//       </div>

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
  const handleOpenProject = () => {
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
      className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_125px_125px_58px_38px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
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
      <div>
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
      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete ${project.title}`}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[16px] text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
      >
        ⋯
      </button>
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