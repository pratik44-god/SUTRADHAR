// "use client";

// import { useState } from "react";
// import type { DashboardSection } from "~/app/dashboard/page";
// import ProjectCard from "~/components/dashboard/ProjectCard";

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

// type DashboardMainProps = {
//   activeSection: DashboardSection;
//   fullName: string;
//   projects: Project[];
//   isProjectsLoading: boolean;
//   isCreating: boolean;
//   onCreateProject: (
//     title: string,
//     description?: string,
//   ) => Promise<void>;
//   onOpenProject: (
//     id: string,
//   ) => void;
//   onDeleteProject: (
//     id: string,
//   ) => Promise<void>;
// };

// export default function DashboardMain({
//   activeSection,
//   fullName,
//   projects,
//   isProjectsLoading,
//   isCreating,
//   onCreateProject,
//   onOpenProject,
//   onDeleteProject,
// }: DashboardMainProps) {
//   if (activeSection === "projects") {
//     return (
//       <ProjectsView
//         projects={projects}
//         isProjectsLoading={isProjectsLoading}
//         fullName={fullName}
//         isCreating={isCreating}
//         onCreateProject={onCreateProject}
//         onOpenProject={onOpenProject}
//         onDeleteProject={onDeleteProject}
//       />
//     );
//   }

//   if (activeSection === "shared") {
//     return <SharedView />;
//   }

//   if (activeSection === "archive") {
//     return <ArchiveView />;
//   }

//   if (activeSection === "team") {
//     return <TeamView />;
//   }

//   return (
//     <HomeView
//       fullName={fullName}
//       projects={projects}
//       isProjectsLoading={isProjectsLoading}
//       isCreating={isCreating}
//       onCreateProject={onCreateProject}
//       onOpenProject={onOpenProject}
//       onDeleteProject={onDeleteProject}
//     />
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* HOME                                                                       */
// /* -------------------------------------------------------------------------- */

// type HomeViewProps = {
//   fullName: string;
//   projects: Project[];
//   isProjectsLoading: boolean;
//   isCreating: boolean;
//   onCreateProject: (
//     title: string,
//     description?: string,
//   ) => Promise<void>;
//   onOpenProject: (
//     id: string,
//   ) => void;
//   onDeleteProject: (
//     id: string,
//   ) => Promise<void>;
// };

// function HomeView({
//   fullName,
//   projects,
//   isProjectsLoading,
//   isCreating,
//   onCreateProject,
//   onOpenProject,
//   onDeleteProject,
// }: HomeViewProps) {
//   const firstName =
//     fullName.trim().split(/\s+/)[0] ||
//     "there";

//   return (
//     <section className="min-w-0 overflow-hidden bg-[#090B0A]">
//       <div className="h-full overflow-y-auto px-8 py-8">
//         <div className="mx-auto max-w-[1120px]">
//           <div className="mb-8">
//             <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
//               Sutradhara / Overview
//             </p>

//             <h1 className="mt-3 font-serif text-[30px] leading-tight text-[#F0E6D2]">
//               What are you building,{" "}
//               {firstName}?
//             </h1>

//             <p className="mt-2 max-w-[650px] text-[13px] leading-6 text-[#77736B]">
//               Start with a thought, give it
//               structure, and let the idea
//               evolve into something complete.
//             </p>
//           </div>

//           <CreationOptions
//             isCreating={isCreating}
//             onCreateProject={onCreateProject}
//           />

//           <RecentProjects
//             projects={projects}
//             isProjectsLoading={isProjectsLoading}
//             fullName={fullName}
//             onOpenProject={onOpenProject}
//             onDeleteProject={onDeleteProject}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CREATE OPTIONS                                                             */
// /* -------------------------------------------------------------------------- */

// type CreationOptionsProps = {
//   isCreating: boolean;
//   onCreateProject: (
//     title: string,
//     description?: string,
//   ) => Promise<void>;
// };

// function CreationOptions({
//   isCreating,
//   onCreateProject,
// }: CreationOptionsProps) {
//   const [showCreateForm, setShowCreateForm] =
//     useState(false);

//   const [selectedType, setSelectedType] =
//     useState("Blank Canvas");

//   const handleSelectCreate = (
//     type: string,
//   ) => {
//     setSelectedType(type);
//     setShowCreateForm(true);
//   };

//   const handleCancel = () => {
//     setShowCreateForm(false);
//   };

//   if (showCreateForm) {
//     return (
//       <CreateProjectForm
//         selectedType={selectedType}
//         isCreating={isCreating}
//         onCreateProject={onCreateProject}
//         onCancel={handleCancel}
//       />
//     );
//   }

//   return (
//     <div>
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#625E56]">
//             Create
//           </p>

//           <h2 className="mt-1.5 text-[17px] font-medium text-[#D8CFBF]">
//             Begin a new thread
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
//         <CreationCard
//           title="Blank Canvas"
//           description="Start from an empty workspace."
//           icon={<BlankCanvasIcon />}
//           onClick={() =>
//             handleSelectCreate("Blank Canvas")
//           }
//           disabled={isCreating}
//         />

//         <CreationCard
//           title="Generate with AI"
//           description="Turn a thought into a structure."
//           icon={<AiIcon />}
//           onClick={() =>
//             handleSelectCreate("Generate with AI")
//           }
//           disabled={isCreating}
//         />

//         <CreationCard
//           title="Use Template"
//           description="Start with a ready-made structure."
//           icon={<TemplateIcon />}
//           onClick={() =>
//             handleSelectCreate("Use Template")
//           }
//           disabled={isCreating}
//         />

//         <CreationCard
//           title="Create for Team"
//           description="Build together in one workspace."
//           icon={<TeamCreateIcon />}
//           onClick={() =>
//             handleSelectCreate("Create for Team")
//           }
//           disabled={isCreating}
//         />
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CREATE PROJECT FORM                                                        */
// /* -------------------------------------------------------------------------- */

// type CreateProjectFormProps = {
//   selectedType: string;
//   isCreating: boolean;
//   onCreateProject: (
//     title: string,
//     description?: string,
//   ) => Promise<void>;
//   onCancel: () => void;
// };

// function CreateProjectForm({
//   selectedType,
//   isCreating,
//   onCreateProject,
//   onCancel,
// }: CreateProjectFormProps) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] =
//     useState("");

//   const handleCreate = async () => {
//     const finalTitle =
//       title.trim() || "Untitled";

//     const finalDescription =
//       description.trim() || undefined;

//     await onCreateProject(
//       finalTitle,
//       finalDescription,
//     );
//   };

//   return (
//     <div className="rounded-2xl border border-[#A9854F]/15 bg-[#111311] p-6">
//       <div className="mb-6 flex items-start justify-between">
//         <div>
//           <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A9854F]">
//             New Workspace
//           </p>

//           <h2 className="mt-2 font-serif text-[23px] text-[#F0E6D2]">
//             Create your project
//           </h2>

//           <p className="mt-2 text-[12px] leading-5 text-[#77736B]">
//             {selectedType} · Give your idea a
//             name before entering the workspace.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={onCancel}
//           className="rounded-lg px-3 py-2 text-[11px] text-[#77736B] transition hover:bg-[#171A17] hover:text-[#D6C4A3]"
//         >
//           Cancel
//         </button>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <label
//             htmlFor="project-title"
//             className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
//           >
//             Title
//           </label>

//           <input
//             id="project-title"
//             type="text"
//             value={title}
//             onChange={(event) =>
//               setTitle(event.target.value)
//             }
//             placeholder="Untitled"
//             maxLength={100}
//             autoFocus
//             className="w-full rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="project-description"
//             className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
//           >
//             Description
//             <span className="ml-2 normal-case tracking-normal text-[#55514B]">
//               Optional
//             </span>
//           </label>

//           <textarea
//             id="project-description"
//             value={description}
//             onChange={(event) =>
//               setDescription(event.target.value)
//             }
//             placeholder="What is this project about?"
//             maxLength={300}
//             rows={4}
//             className="w-full resize-none rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] leading-5 text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
//           />
//         </div>

//         <div className="flex justify-end pt-1">
//           <button
//             type="button"
//             onClick={handleCreate}
//             disabled={isCreating}
//             className="rounded-xl border border-[#A9854F]/30 bg-[#A9854F]/10 px-6 py-3 text-[12px] font-medium text-[#DCC9A7] transition hover:border-[#A9854F]/50 hover:bg-[#A9854F]/15 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isCreating
//               ? "Creating..."
//               : "Create Project"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CREATION CARD                                                              */
// /* -------------------------------------------------------------------------- */

// type CreationCardProps = {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   onClick: () => void;
//   disabled: boolean;
// };

// function CreationCard({
//   title,
//   description,
//   icon,
//   onClick,
//   disabled,
// }: CreationCardProps) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className="group min-h-[155px] rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#A9854F]/25 hover:bg-[#151714] disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17] text-[#B99052] transition group-hover:border-[#A9854F]/30">
//         {icon}
//       </div>

//       <h3 className="mt-5 text-[14px] font-medium text-[#D8CFBF]">
//         {title}
//       </h3>

//       <p className="mt-2 text-[11px] leading-5 text-[#706D66]">
//         {description}
//       </p>
//     </button>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* RECENT PROJECTS                                                            */
// /* -------------------------------------------------------------------------- */

// type RecentProjectsProps = {
//   projects: Project[];
//   isProjectsLoading: boolean;
//   fullName: string;
//   onOpenProject: (
//     id: string,
//   ) => void;
//   onDeleteProject: (
//     id: string,
//   ) => Promise<void>;
// };

// function RecentProjects({
//   projects,
//   isProjectsLoading,
//   fullName,
//   onOpenProject,
//   onDeleteProject,
// }: RecentProjectsProps) {
//   return (
//     <section className="mt-10">
//       <div className="mb-4 flex items-end justify-between">
//         <div>
//           <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#625E56]">
//             Workspace
//           </p>

//           <h2 className="mt-1.5 text-[17px] font-medium text-[#D8CFBF]">
//             Recent projects
//           </h2>
//         </div>

//         <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#625E56]">
//           {projects.length}{" "}
//           {projects.length === 1
//             ? "project"
//             : "projects"}
//         </p>
//       </div>

//       {isProjectsLoading ? (
//         <ProjectsLoading />
//       ) : projects.length === 0 ? (
//         <EmptyProjects />
//       ) : (
//         <div className="space-y-2">
//           {projects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               project={project}
//               authorName={fullName}
//               onOpenProject={onOpenProject}
//               onDeleteProject={
//                 onDeleteProject
//               }
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* PROJECTS PAGE                                                              */
// /* -------------------------------------------------------------------------- */

// type ProjectsViewProps = {
//   projects: Project[];
//   isProjectsLoading: boolean;
//   fullName: string;
//   isCreating: boolean;
//   onCreateProject: (
//     title: string,
//     description?: string,
//   ) => Promise<void>;
//   onOpenProject: (
//     id: string,
//   ) => void;
//   onDeleteProject: (
//     id: string,
//   ) => Promise<void>;
// };

// function ProjectsView({
//   projects,
//   isProjectsLoading,
//   fullName,
//   isCreating,
//   onCreateProject,
//   onOpenProject,
//   onDeleteProject,
// }: ProjectsViewProps) {
//   const [showCreateForm, setShowCreateForm] =
//     useState(false);

//   const handleCreate = async (
//     title: string,
//     description?: string,
//   ) => {
//     await onCreateProject(
//       title,
//       description,
//     );
//   };

//   return (
//     <section className="min-w-0 overflow-hidden bg-[#090B0A]">
//       <div className="h-full overflow-y-auto px-8 py-8">
//         <div className="mx-auto max-w-[1120px]">
//           <div className="flex items-end justify-between">
//             <div>
//               <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
//                 Sutradhara / Projects
//               </p>

//               <h1 className="mt-3 font-serif text-[30px] text-[#F0E6D2]">
//                 Your projects
//               </h1>

//               <p className="mt-2 text-[13px] text-[#77736B]">
//                 Every idea, structure and
//                 workspace in one place.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowCreateForm(true)
//               }
//               disabled={isCreating}
//               className="rounded-xl border border-[#A9854F]/20 bg-[#17130F] px-4 py-2.5 text-[11px] font-medium text-[#D6C4A3] transition hover:border-[#A9854F]/35 hover:bg-[#211A13] disabled:opacity-50"
//             >
//               + New project
//             </button>
//           </div>

//           {showCreateForm && (
//             <div className="mt-7">
//               <CreateProjectForm
//                 selectedType="Blank Canvas"
//                 isCreating={isCreating}
//                 onCreateProject={
//                   handleCreate
//                 }
//                 onCancel={() =>
//                   setShowCreateForm(false)
//                 }
//               />
//             </div>
//           )}

//           <div className="mt-8">
//             {isProjectsLoading ? (
//               <ProjectsLoading />
//             ) : projects.length === 0 ? (
//               <EmptyProjects />
//             ) : (
//               <div className="space-y-2">
//                 {projects.map((project) => (
//                   <ProjectCard
//                     key={project.id}
//                     project={project}
//                     authorName={fullName}
//                     onOpenProject={
//                       onOpenProject
//                     }
//                     onDeleteProject={
//                       onDeleteProject
//                     }
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* OTHER SECTIONS                                                             */
// /* -------------------------------------------------------------------------- */

// function SharedView() {
//   return (
//     <SimpleSection
//       label="Sutradhara / Shared"
//       title="Shared with me"
//       description="Projects that other collaborators have shared with you will appear here."
//     />
//   );
// }

// function ArchiveView() {
//   return (
//     <SimpleSection
//       label="Sutradhara / Archive"
//       title="Archive"
//       description="Archived workspaces will live here when you are ready to put an idea aside."
//     />
//   );
// }

// function TeamView() {
//   return (
//     <SimpleSection
//       label="Sutradhara / Team"
//       title="Your team"
//       description="Bring collaborators into your workspace and build ideas together."
//     />
//   );
// }

// type SimpleSectionProps = {
//   label: string;
//   title: string;
//   description: string;
// };

// function SimpleSection({
//   label,
//   title,
//   description,
// }: SimpleSectionProps) {
//   return (
//     <section className="min-w-0 overflow-hidden bg-[#090B0A]">
//       <div className="h-full px-8 py-8">
//         <div className="mx-auto max-w-[1120px]">
//           <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
//             {label}
//           </p>

//           <h1 className="mt-3 font-serif text-[30px] text-[#F0E6D2]">
//             {title}
//           </h1>

//           <div className="mt-7 max-w-[700px] rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-7">
//             <p className="text-[13px] leading-6 text-[#77736B]">
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* EMPTY / LOADING                                                            */
// /* -------------------------------------------------------------------------- */

// function EmptyProjects() {
//   return (
//     <div className="rounded-2xl border border-dashed border-[#A9854F]/15 bg-[#0E100F] px-6 py-12 text-center">
//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17]">
//         <ThreadIcon />
//       </div>

//       <h3 className="mt-5 text-[15px] font-medium text-[#D6CBB9]">
//         No projects yet
//       </h3>

//       <p className="mx-auto mt-2 max-w-[420px] text-[11px] leading-5 text-[#6F6B64]">
//         Start with a blank canvas, use a
//         template, or let AI help shape the
//         first thread.
//       </p>
//     </div>
//   );
// }

// function ProjectsLoading() {
//   return (
//     <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-[#A9854F]/10 bg-[#0E100F]">
//       <div className="flex items-center gap-3">
//         <div className="h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#B99052]" />

//         <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#706B62]">
//           Loading projects
//         </span>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* ICONS                                                                      */
// /* -------------------------------------------------------------------------- */

// function BlankCanvasIcon() {
//   return (
//     <svg
//       width="21"
//       height="21"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <rect
//         x="4"
//         y="4"
//         width="16"
//         height="16"
//         rx="2"
//         stroke="currentColor"
//         strokeWidth="1.3"
//       />

//       <path
//         d="M8 12H16"
//         stroke="currentColor"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M12 8V16"
//         stroke="currentColor"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function AiIcon() {
//   return (
//     <svg
//       width="21"
//       height="21"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <path
//         d="M12 3L13.7 9.3L20 11L13.7 12.7L12 19L10.3 12.7L4 11L10.3 9.3L12 3Z"
//         stroke="currentColor"
//         strokeWidth="1.2"
//         strokeLinejoin="round"
//       />

//       <path
//         d="M19 4V7"
//         stroke="currentColor"
//         strokeWidth="1.2"
//         strokeLinecap="round"
//       />

//       <path
//         d="M20.5 5.5H17.5"
//         stroke="currentColor"
//         strokeWidth="1.2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function TemplateIcon() {
//   return (
//     <svg
//       width="21"
//       height="21"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <rect
//         x="4"
//         y="4"
//         width="16"
//         height="16"
//         rx="2"
//         stroke="currentColor"
//         strokeWidth="1.3"
//       />

//       <rect
//         x="7"
//         y="7"
//         width="4"
//         height="4"
//         rx="0.5"
//         stroke="currentColor"
//         strokeWidth="1.2"
//       />

//       <rect
//         x="13"
//         y="7"
//         width="4"
//         height="4"
//         rx="0.5"
//         stroke="currentColor"
//         strokeWidth="1.2"
//       />

//       <rect
//         x="7"
//         y="13"
//         width="10"
//         height="4"
//         rx="0.5"
//         stroke="currentColor"
//         strokeWidth="1.2"
//       />
//     </svg>
//   );
// }

// function TeamCreateIcon() {
//   return (
//     <svg
//       width="21"
//       height="21"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <circle
//         cx="9"
//         cy="9"
//         r="3"
//         stroke="currentColor"
//         strokeWidth="1.3"
//       />

//       <circle
//         cx="17"
//         cy="10"
//         r="2.5"
//         stroke="currentColor"
//         strokeWidth="1.3"
//       />

//       <path
//         d="M3.5 19C4 15.8 5.8 14 9 14C12.2 14 14 15.8 14.5 19"
//         stroke="currentColor"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M17 15V20"
//         stroke="currentColor"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M14.5 17.5H19.5"
//         stroke="currentColor"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function ThreadIcon() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <circle
//         cx="12"
//         cy="12"
//         r="7"
//         stroke="#A9854F"
//         strokeWidth="1.2"
//         strokeDasharray="2 3"
//       />

//       <path
//         d="M12 6C15 9 15 11 12 12C9 13 9 15 12 18"
//         stroke="#D6C4A3"
//         strokeWidth="1.2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }
"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { DashboardSection } from "~/app/dashboard/page";
import ProjectCard from "~/components/dashboard/ProjectCard";

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

type DashboardMainProps = {
  activeSection: DashboardSection;
  fullName: string;
  projects: Project[];
  isProjectsLoading: boolean;
  isCreating: boolean;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  onOpenProject: (
    id: string,
  ) => void;
  onDeleteProject: (
    id: string,
  ) => Promise<void>;
};

export default function DashboardMain({
  activeSection,
  fullName,
  projects,
  isProjectsLoading,
  isCreating,
  onCreateProject,
  onOpenProject,
  onDeleteProject,
}: DashboardMainProps) {
  if (activeSection === "projects") {
    return (
      <ProjectsView
        projects={projects}
        isProjectsLoading={isProjectsLoading}
        fullName={fullName}
        isCreating={isCreating}
        onCreateProject={onCreateProject}
        onOpenProject={onOpenProject}
        onDeleteProject={onDeleteProject}
      />
    );
  }

  if (activeSection === "shared") {
    return <SharedView />;
  }

  if (activeSection === "archive") {
    return <ArchiveView />;
  }

  if (activeSection === "team") {
    return <TeamView />;
  }

  return (
    <HomeView
      fullName={fullName}
      projects={projects}
      isProjectsLoading={isProjectsLoading}
      isCreating={isCreating}
      onCreateProject={onCreateProject}
      onOpenProject={onOpenProject}
      onDeleteProject={onDeleteProject}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */

type HomeViewProps = {
  fullName: string;
  projects: Project[];
  isProjectsLoading: boolean;
  isCreating: boolean;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  onOpenProject: (
    id: string,
  ) => void;
  onDeleteProject: (
    id: string,
  ) => Promise<void>;
};

function HomeView({
  fullName,
  projects,
  isProjectsLoading,
  isCreating,
  onCreateProject,
  onOpenProject,
  onDeleteProject,
}: HomeViewProps) {
  const firstName =
    fullName.trim().split(/\s+/)[0] ||
    "there";

  return (
    <section className="min-w-0 overflow-hidden bg-[#090B0A]">
      <div className="h-full overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-9">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
              Sutradhara / Overview
            </p>

            <h1 className="mt-3 font-serif text-[32px] leading-tight text-[#F0E6D2]">
              What are you building,{" "}
              {firstName}?
            </h1>

            <p className="mt-2 max-w-[680px] text-[13px] leading-6 text-[#77736B]">
              Start with a thought, give it
              structure, and let the idea
              evolve into something complete.
            </p>
          </div>

          <CreationOptions
            isCreating={isCreating}
            onCreateProject={onCreateProject}
          />

          <RecentProjects
            projects={projects}
            isProjectsLoading={
              isProjectsLoading
            }
            fullName={fullName}
            onOpenProject={onOpenProject}
            onDeleteProject={
              onDeleteProject
            }
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CREATION OPTIONS                                                           */
/* -------------------------------------------------------------------------- */

type CreationOptionsProps = {
  isCreating: boolean;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
};

function CreationOptions({
  isCreating,
  onCreateProject,
}: CreationOptionsProps) {
  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [selectedType, setSelectedType] =
    useState<
      | "Blank Canvas"
      | "Generate with AI"
      | "Use Template"
      | "Create for Team"
    >("Blank Canvas");

  const handleSelectCreate = (
    type:
      | "Blank Canvas"
      | "Generate with AI"
      | "Use Template"
      | "Create for Team",
  ) => {
    setSelectedType(type);
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    if (isCreating) {
      return;
    }

    setShowCreateForm(false);
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#625E56]">
            Create
          </p>

          <h2 className="mt-1.5 text-[18px] font-medium text-[#D8CFBF]">
            Begin a new thread
          </h2>

          <p className="mt-1 text-[12px] text-[#68645D]">
            Choose how you want to turn the
            first thought into structure.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <CreationCard
            title="Blank Canvas"
            description="Start from an empty visual workspace."
            icon={<BlankCanvasIcon />}
            onClick={() =>
              handleSelectCreate(
                "Blank Canvas",
              )
            }
            disabled={isCreating}
          />

          <CreationCard
            title="Generate with AI"
            description="Describe an idea and shape it with AI."
            icon={<AiIcon />}
            onClick={() =>
              handleSelectCreate(
                "Generate with AI",
              )
            }
            disabled={isCreating}
          />

          <CreationCard
            title="Use Template"
            description="Begin with a structure that already has form."
            icon={<TemplateIcon />}
            onClick={() =>
              handleSelectCreate(
                "Use Template",
              )
            }
            disabled={isCreating}
          />

          <CreationCard
            title="Create for Team"
            description="Start a shared workspace for your team."
            icon={<TeamCreateIcon />}
            onClick={() =>
              handleSelectCreate(
                "Create for Team",
              )
            }
            disabled={isCreating}
          />
        </div>
      </div>

      {showCreateForm && (
        <CreateProjectModal
          selectedType={selectedType}
          isCreating={isCreating}
          onCreateProject={onCreateProject}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* CREATION CARD                                                              */
/* -------------------------------------------------------------------------- */

type CreationCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  disabled: boolean;
};

function CreationCard({
  title,
  description,
  icon,
  onClick,
  disabled,
}: CreationCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group min-h-[158px] rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#A9854F]/25 hover:bg-[#151714] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17] text-[#B99052] transition group-hover:border-[#A9854F]/30">
        {icon}
      </div>

      <h3 className="mt-5 text-[15px] font-medium text-[#D8CFBF]">
        {title}
      </h3>

      <p className="mt-2 text-[12px] leading-5 text-[#706D66]">
        {description}
      </p>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* CREATE PROJECT MODAL                                                       */
/* -------------------------------------------------------------------------- */

type CreateProjectModalProps = {
  selectedType:
    | "Blank Canvas"
    | "Generate with AI"
    | "Use Template"
    | "Create for Team";
  isCreating: boolean;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  onCancel: () => void;
};

function CreateProjectModal({
  selectedType,
  isCreating,
  onCreateProject,
  onCancel,
}: CreateProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [selectedTemplate, setSelectedTemplate] =
    useState("System Architecture");

  const [selectedMembers, setSelectedMembers] =
    useState<string[]>(["You"]);

  const handleCreate = async () => {
    const finalTitle =
      title.trim() || "Untitled";

    let finalDescription =
      description.trim() || undefined;

    if (
      selectedType === "Use Template" &&
      !finalDescription
    ) {
      finalDescription =
        `Started from ${selectedTemplate} template.`;
    }

    if (
      selectedType === "Create for Team" &&
      !finalDescription
    ) {
      finalDescription =
        "Shared workspace for collaboration.";
    }

    await onCreateProject(
      finalTitle,
      finalDescription,
    );
  };

  const toggleMember = (
    member: string,
  ) => {
    if (member === "You") {
      return;
    }

    setSelectedMembers((current) => {
      if (current.includes(member)) {
        return current.filter(
          (item) => item !== member,
        );
      }

      return [
        ...current,
        member,
      ];
    });
  };

  return (
    <>
      {/* Full dashboard backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-md"
        onClick={onCancel}
      />

      {/* Modal layer */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto px-5 py-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-project-title"
          className="w-full max-w-[500px] rounded-2xl border border-[#A9854F]/20 bg-[#111311] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#A9854F]">
                  {getModalLabel(
                    selectedType,
                  )}
                </p>

                <h2
                  id="create-project-title"
                  className="mt-2 font-serif text-[24px] leading-tight text-[#F0E6D2]"
                >
                  {getModalTitle(
                    selectedType,
                  )}
                </h2>

                <p className="mt-2 max-w-[390px] text-[12px] leading-5 text-[#77736B]">
                  {getModalDescription(
                    selectedType,
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={onCancel}
                disabled={isCreating}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[18px] text-[#68645D] transition hover:bg-[#171A17] hover:text-[#D6C4A3] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ×
              </button>
            </div>

            {/* Blank Canvas */}
            {selectedType ===
              "Blank Canvas" && (
              <BlankCanvasForm
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={
                  setDescription
                }
              />
            )}

            {/* AI */}
            {selectedType ===
              "Generate with AI" && (
              <AiCreateForm
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={
                  setDescription
                }
              />
            )}

            {/* Template */}
            {selectedType ===
              "Use Template" && (
              <TemplateCreateForm
                title={title}
                description={description}
                selectedTemplate={
                  selectedTemplate
                }
                setTitle={setTitle}
                setDescription={
                  setDescription
                }
                setSelectedTemplate={
                  setSelectedTemplate
                }
              />
            )}

            {/* Team */}
            {selectedType ===
              "Create for Team" && (
              <TeamCreateForm
                title={title}
                description={description}
                selectedMembers={
                  selectedMembers
                }
                setTitle={setTitle}
                setDescription={
                  setDescription
                }
                toggleMember={
                  toggleMember
                }
              />
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[#A9854F]/10 pt-5">
              <button
                type="button"
                onClick={onCancel}
                disabled={isCreating}
                className="rounded-lg px-3 py-2 text-[11px] text-[#77736B] transition hover:bg-[#171A17] hover:text-[#D6C4A3] disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-xl border border-[#A9854F]/30 bg-[#A9854F]/10 px-6 py-3 text-[12px] font-medium text-[#DCC9A7] transition hover:border-[#A9854F]/50 hover:bg-[#A9854F]/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : getCreateButtonText(
                      selectedType,
                    )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* BLANK CANVAS FORM                                                          */
/* -------------------------------------------------------------------------- */

type BasicFormProps = {
  title: string;
  description: string;
  setTitle: (
    value: string,
  ) => void;
  setDescription: (
    value: string,
  ) => void;
};

function BlankCanvasForm({
  title,
  description,
  setTitle,
  setDescription,
}: BasicFormProps) {
  return (
    <div className="mt-6 space-y-5">
      <ProjectTitleInput
        title={title}
        setTitle={setTitle}
      />

      <ProjectDescriptionInput
        description={description}
        setDescription={
          setDescription
        }
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* AI FORM                                                                    */
/* -------------------------------------------------------------------------- */

function AiCreateForm({
  title,
  description,
  setTitle,
  setDescription,
}: BasicFormProps) {
  return (
    <div className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="ai-project-title"
          className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
        >
          Project title
        </label>

        <input
          id="ai-project-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Untitled"
          maxLength={100}
          autoFocus
          className="w-full rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
        />
      </div>

      <div>
        <label
          htmlFor="ai-project-idea"
          className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
        >
          Your idea
        </label>

        <textarea
          id="ai-project-idea"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          placeholder="Describe what you want to structure..."
          maxLength={300}
          rows={4}
          autoFocus={false}
          className="w-full resize-none rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] leading-5 text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
        />

        <p className="mt-2 text-[10px] leading-4 text-[#55514B]">
          This idea will become the starting
          point for the workspace.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TEMPLATE FORM                                                              */
/* -------------------------------------------------------------------------- */

type TemplateCreateFormProps = {
  title: string;
  description: string;
  selectedTemplate: string;
  setTitle: (
    value: string,
  ) => void;
  setDescription: (
    value: string,
  ) => void;
  setSelectedTemplate: (
    value: string,
  ) => void;
};

function TemplateCreateForm({
  title,
  description,
  selectedTemplate,
  setTitle,
  setDescription,
  setSelectedTemplate,
}: TemplateCreateFormProps) {
  const templates = [
    {
      name: "System Architecture",
      description:
        "Services, dependencies and data flow.",
    },
    {
      name: "User Flow",
      description:
        "Map how users move through a product.",
    },
    {
      name: "Project Roadmap",
      description:
        "Turn milestones into a connected plan.",
    },
  ];

  return (
    <div className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="template-project-title"
          className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
        >
          Project title
        </label>

        <input
          id="template-project-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Untitled"
          maxLength={100}
          autoFocus
          className="w-full rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
        />
      </div>

      <div>
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]">
          Choose a structure
        </p>

        <div className="space-y-2">
          {templates.map(
            (template) => {
              const isSelected =
                selectedTemplate ===
                template.name;

              return (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(
                      template.name,
                    );
                    setDescription(
                      template.description,
                    );
                  }}
                  className={`w-full rounded-xl border p-3.5 text-left transition ${
                    isSelected
                      ? "border-[#A9854F]/35 bg-[#A9854F]/8"
                      : "border-[#A9854F]/10 bg-[#0B0D0C] hover:border-[#A9854F]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-medium text-[#D8CFBF]">
                      {template.name}
                    </p>

                    {isSelected && (
                      <span className="text-[11px] text-[#A9854F]">
                        ✓
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-[#68645D]">
                    {template.description}
                  </p>
                </button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TEAM FORM                                                                  */
/* -------------------------------------------------------------------------- */

type TeamCreateFormProps = {
  title: string;
  description: string;
  selectedMembers: string[];
  setTitle: (
    value: string,
  ) => void;
  setDescription: (
    value: string,
  ) => void;
  toggleMember: (
    member: string,
  ) => void;
};

function TeamCreateForm({
  title,
  description,
  selectedMembers,
  setTitle,
  setDescription,
  toggleMember,
}: TeamCreateFormProps) {
  const members = [
    {
      name: "You",
      role: "Owner",
      initial: "Y",
    },
    {
      name: "Aarav",
      role: "Designer",
      initial: "A",
    },
    {
      name: "Maya",
      role: "Contributor",
      initial: "M",
    },
  ];

  return (
    <div className="mt-6 space-y-5">
      <ProjectTitleInput
        title={title}
        setTitle={setTitle}
      />

      <ProjectDescriptionInput
        description={description}
        setDescription={
          setDescription
        }
      />

      <div>
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]">
          Collaborators
        </p>

        <div className="space-y-2">
          {members.map((member) => {
            const isSelected =
              selectedMembers.includes(
                member.name,
              );

            return (
              <button
                key={member.name}
                type="button"
                onClick={() =>
                  toggleMember(
                    member.name,
                  )
                }
                className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left transition ${
                  isSelected
                    ? "border-[#A9854F]/30 bg-[#A9854F]/7"
                    : "border-[#A9854F]/10 bg-[#0B0D0C] hover:border-[#A9854F]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[11px] text-[#D6C4A3]">
                    {member.initial}
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-[#D8CFBF]">
                      {member.name}
                    </p>

                    <p className="text-[9px] text-[#625E56]">
                      {member.role}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] ${
                    isSelected
                      ? "text-[#A9854F]"
                      : "text-[#45423D]"
                  }`}
                >
                  {isSelected
                    ? "✓"
                    : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BASIC INPUTS                                                               */
/* -------------------------------------------------------------------------- */

type ProjectTitleInputProps = {
  title: string;
  setTitle: (
    value: string,
  ) => void;
};

function ProjectTitleInput({
  title,
  setTitle,
}: ProjectTitleInputProps) {
  return (
    <div>
      <label
        htmlFor="project-title"
        className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
      >
        Title
      </label>

      <input
        id="project-title"
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        placeholder="Untitled"
        maxLength={100}
        autoFocus
        className="w-full rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
      />
    </div>
  );
}

type ProjectDescriptionInputProps = {
  description: string;
  setDescription: (
    value: string,
  ) => void;
};

function ProjectDescriptionInput({
  description,
  setDescription,
}: ProjectDescriptionInputProps) {
  return (
    <div>
      <label
        htmlFor="project-description"
        className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857B]"
      >
        Description
        <span className="ml-2 normal-case tracking-normal text-[#55514B]">
          Optional
        </span>
      </label>

      <textarea
        id="project-description"
        value={description}
        onChange={(event) =>
          setDescription(
            event.target.value,
          )
        }
        placeholder="What is this project about?"
        maxLength={300}
        rows={3}
        className="w-full resize-none rounded-xl border border-[#A9854F]/15 bg-[#0B0D0C] px-4 py-3 text-[13px] leading-5 text-[#E6DDCE] outline-none placeholder:text-[#4F4C47] focus:border-[#A9854F]/40"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RECENT PROJECTS                                                            */
/* -------------------------------------------------------------------------- */

type RecentProjectsProps = {
  projects: Project[];
  isProjectsLoading: boolean;
  fullName: string;
  onOpenProject: (
    id: string,
  ) => void;
  onDeleteProject: (
    id: string,
  ) => Promise<void>;
};

function RecentProjects({
  projects,
  isProjectsLoading,
  fullName,
  onOpenProject,
  onDeleteProject,
}: RecentProjectsProps) {
  return (
    <section className="mt-11">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#625E56]">
            Workspace
          </p>

          <h2 className="mt-1.5 text-[19px] font-medium text-[#D8CFBF]">
            Recent projects
          </h2>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#625E56]">
          {projects.length}{" "}
          {projects.length === 1
            ? "project"
            : "projects"}
        </p>
      </div>

      {isProjectsLoading ? (
        <ProjectsLoading />
      ) : projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              authorName={fullName}
              onOpenProject={
                onOpenProject
              }
              onDeleteProject={
                onDeleteProject
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROJECTS PAGE                                                              */
/* -------------------------------------------------------------------------- */

type ProjectsViewProps = {
  projects: Project[];
  isProjectsLoading: boolean;
  fullName: string;
  isCreating: boolean;
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  onOpenProject: (
    id: string,
  ) => void;
  onDeleteProject: (
    id: string,
  ) => Promise<void>;
};

function ProjectsView({
  projects,
  isProjectsLoading,
  fullName,
  isCreating,
  onCreateProject,
  onOpenProject,
  onDeleteProject,
}: ProjectsViewProps) {
  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const handleCancel = () => {
    if (isCreating) {
      return;
    }

    setShowCreateForm(false);
  };

  return (
    <section className="min-w-0 overflow-hidden bg-[#090B0A]">
      <div className="h-full overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
                Sutradhara / Projects
              </p>

              <h1 className="mt-3 font-serif text-[32px] text-[#F0E6D2]">
                Your projects
              </h1>

              <p className="mt-2 text-[13px] text-[#77736B]">
                Every idea, structure and
                workspace in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowCreateForm(true)
              }
              disabled={isCreating}
              className="rounded-xl border border-[#A9854F]/20 bg-[#17130F] px-4 py-2.5 text-[11px] font-medium text-[#D6C4A3] transition hover:border-[#A9854F]/35 hover:bg-[#211A13] disabled:opacity-50"
            >
              + New project
            </button>
          </div>

          {showCreateForm && (
            <CreateProjectModal
              selectedType="Blank Canvas"
              isCreating={isCreating}
              onCreateProject={
                onCreateProject
              }
              onCancel={handleCancel}
            />
          )}

          <div className="mt-8">
            {isProjectsLoading ? (
              <ProjectsLoading />
            ) : projects.length === 0 ? (
              <EmptyProjects />
            ) : (
              <div className="space-y-2">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    authorName={fullName}
                    onOpenProject={
                      onOpenProject
                    }
                    onDeleteProject={
                      onDeleteProject
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OTHER SECTIONS                                                             */
/* -------------------------------------------------------------------------- */

function SharedView() {
  return (
    <SimpleSection
      label="Sutradhara / Shared"
      title="Shared with me"
      description="Projects that other collaborators have shared with you will appear here."
    />
  );
}

function ArchiveView() {
  return (
    <SimpleSection
      label="Sutradhara / Archive"
      title="Archive"
      description="Archived workspaces will live here when you are ready to put an idea aside."
    />
  );
}

function TeamView() {
  return (
    <SimpleSection
      label="Sutradhara / Team"
      title="Your team"
      description="Bring collaborators into your workspace and build ideas together."
    />
  );
}

type SimpleSectionProps = {
  label: string;
  title: string;
  description: string;
};

function SimpleSection({
  label,
  title,
  description,
}: SimpleSectionProps) {
  return (
    <section className="min-w-0 overflow-hidden bg-[#090B0A]">
      <div className="h-full px-8 py-8">
        <div className="mx-auto max-w-[1120px]">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
            {label}
          </p>

          <h1 className="mt-3 font-serif text-[32px] text-[#F0E6D2]">
            {title}
          </h1>

          <div className="mt-7 max-w-[700px] rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-7">
            <p className="text-[13px] leading-6 text-[#77736B]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY / LOADING                                                            */
/* -------------------------------------------------------------------------- */

function EmptyProjects() {
  return (
    <div className="rounded-2xl border border-dashed border-[#A9854F]/15 bg-[#0E100F] px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17]">
        <ThreadIcon />
      </div>

      <h3 className="mt-5 text-[15px] font-medium text-[#D6CBB9]">
        No projects yet
      </h3>

      <p className="mx-auto mt-2 max-w-[420px] text-[11px] leading-5 text-[#6F6B64]">
        Start with a blank canvas, use a
        template, or let AI help shape the
        first thread.
      </p>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-[#A9854F]/10 bg-[#0E100F]">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#B99052]" />

        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#706B62]">
          Loading projects
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MODAL TEXT                                                                 */
/* -------------------------------------------------------------------------- */

function getModalLabel(
  type:
    | "Blank Canvas"
    | "Generate with AI"
    | "Use Template"
    | "Create for Team",
) {
  if (type === "Blank Canvas") {
    return "New visual workspace";
  }

  if (type === "Generate with AI") {
    return "Shape an idea";
  }

  if (type === "Use Template") {
    return "Start with structure";
  }

  return "Collaborative workspace";
}

function getModalTitle(
  type:
    | "Blank Canvas"
    | "Generate with AI"
    | "Use Template"
    | "Create for Team",
) {
  if (type === "Blank Canvas") {
    return "Start with a blank thread";
  }

  if (type === "Generate with AI") {
    return "What is the idea?";
  }

  if (type === "Use Template") {
    return "Choose your starting structure";
  }

  return "Build it together";
}

function getModalDescription(
  type:
    | "Blank Canvas"
    | "Generate with AI"
    | "Use Template"
    | "Create for Team",
) {
  if (type === "Blank Canvas") {
    return "Give the workspace a name and start shaping your idea from scratch.";
  }

  if (type === "Generate with AI") {
    return "Describe the thought you want to explore. This becomes the starting point of your workspace.";
  }

  if (type === "Use Template") {
    return "Choose a structure that matches the kind of idea you want to develop.";
  }

  return "Create the workspace and decide who should be part of the thread.";
}

function getCreateButtonText(
  type:
    | "Blank Canvas"
    | "Generate with AI"
    | "Use Template"
    | "Create for Team",
) {
  if (type === "Generate with AI") {
    return "Create with AI";
  }

  if (type === "Use Template") {
    return "Use Template";
  }

  if (type === "Create for Team") {
    return "Create Workspace";
  }

  return "Create Canvas";
}

/* -------------------------------------------------------------------------- */
/* ICONS                                                                      */
/* -------------------------------------------------------------------------- */

function BlankCanvasIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M8 12H16"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M12 8V16"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3L13.7 9.3L20 11L13.7 12.7L12 19L10.3 12.7L4 11L10.3 9.3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      <path
        d="M19 4V7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M20.5 5.5H17.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TemplateIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <rect
        x="7"
        y="7"
        width="4"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <rect
        x="13"
        y="7"
        width="4"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <rect
        x="7"
        y="13"
        width="10"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function TeamCreateIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="9"
        cy="9"
        r="3"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <circle
        cx="17"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M3.5 19C4 15.8 5.8 14 9 14C12.2 14 14 15.8 14.5 19"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M17 15V20"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M14.5 17.5H19.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThreadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="#A9854F"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />

      <path
        d="M12 6C15 9 15 11 12 12C9 13 9 15 12 18"
        stroke="#D6C4A3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}