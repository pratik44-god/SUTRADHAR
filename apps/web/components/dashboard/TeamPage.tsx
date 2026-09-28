// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   UserPlus,
//   Trash2,
//   Users,
//   Pencil,
//   Check,
//   X,
//   Plus,
// } from "lucide-react";

// import {
//   useCreateTeam,
//   useDeleteTeam,
//   useGetTeam,
//   useUpdateTeam,
// } from "~/hooks/api/team";

// import {
//   useAddTeamMember,
//   useRemoveTeamMember,
//   useTeamMembers,
//   useUpdateTeamMemberRole,
// } from "~/hooks/api/teamMembers";

// import { useGetUserByEmail } from "~/hooks/api/auth";

// import {
//   useCreateTeamProject,
//   useDeleteTeamProject,
//   useTeamProjects,
// } from "~/hooks/api/teamProjects";

// type TeamPageProps = {
//   userId?: string;
//   fullName: string;
// };

// type TeamRole =
//   | "ADMIN"
//   | "EDITOR"
//   | "VIEWER";

// type TeamMember = {
//   id: string;
//   teamId: string;
//   userId: string;
//   role: TeamRole;
//   createdAt: Date | string;
//   fullName: string | null;
//   email: string;
//   profileImageUrl: string | null;
// };

// type TeamData = {
//   id: string;
//   name: string;
//   description: string | null;
//   createdBy: string;
//   createdAt: Date | string;
//   updatedAt: Date | string;
// };

// type TeamProject = {
//   id: string;
//   teamId: string;
//   projectId: string;
//   title: string;
//   description: string | null;
//   canvasData: string | null;
//   createdAt: Date | string;
//   updatedAt: Date | string;
// };

// const TEAM_ID_STORAGE_KEY =
//   "sutradhara-team-id";

// const MAX_TEAM_CANVASES = 3;

// function useDeleteConfirmation() {
//   const [deleteId, setDeleteId] =
//     useState<string | null>(null);

//   const startDelete = (id: string) => {
//     setDeleteId(id);
//   };

//   const cancelDelete = () => {
//     setDeleteId(null);
//   };

//   const isConfirmingDelete = (id: string) => {
//     return deleteId === id;
//   };

//   return {
//     deleteId,
//     startDelete,
//     cancelDelete,
//     isConfirmingDelete,
//   };
// }

// export default function TeamPage({
//   userId,
//   fullName,
// }: TeamPageProps) {
//   const router = useRouter();

//   const {
//     deleteId: deleteCanvasId,
//     startDelete: startDeleteCanvas,
//     cancelDelete: cancelDeleteCanvas,
//     isConfirmingDelete,
//   } = useDeleteConfirmation();

//   const [teamId, setTeamId] =
//     useState("");

//   const [
//     isEditingTeam,
//     setIsEditingTeam,
//   ] = useState(false);

//   const [teamName, setTeamName] =
//     useState("");

//   const [
//     teamDescription,
//     setTeamDescription,
//   ] = useState("");

//   const [
//     newMemberEmail,
//     setNewMemberEmail,
//   ] = useState("");

//   const [
//     deleteTeamConfirm,
//     setDeleteTeamConfirm,
//   ] = useState(false);

//   const [
//     removeMemberId,
//     setRemoveMemberId,
//   ] = useState<string | null>(null);

//   const [
//     isCreateCanvasDialogOpen,
//     setIsCreateCanvasDialogOpen,
//   ] = useState(false);

//   const [canvasTitle, setCanvasTitle] =
//     useState("Untitled");

//   const [
//     canvasDescription,
//     setCanvasDescription,
//   ] = useState("");

//   /*
//    * Team
//    */
//   const {
//     createTeamAsync,
//     status: createTeamStatus,
//   } = useCreateTeam();

//   const {
//     updateTeamAsync,
//     status: updateTeamStatus,
//   } = useUpdateTeam();

//   const {
//     deleteTeamAsync,
//     status: deleteTeamStatus,
//   } = useDeleteTeam();

//   const {
//     team,
//     isLoading: isTeamLoading,
//   } = useGetTeam(teamId);

//   /*
//    * Members
//    */
//   const {
//     members,
//     isLoading: isMembersLoading,
//   } = useTeamMembers(teamId);

//   const {
//     addTeamMemberAsync,
//     status: addMemberStatus,
//   } = useAddTeamMember();

//   const {
//     removeTeamMemberAsync,
//     status: removeMemberStatus,
//   } = useRemoveTeamMember();

//   const {
//     updateTeamMemberRoleAsync,
//     status: updateRoleStatus,
//   } =
//     useUpdateTeamMemberRole();

//   const {
//     getUserByEmailAsync,
//     status: getUserStatus,
//   } = useGetUserByEmail();

//   /*
//    * Team projects
//    */
//   const {
//     createTeamProjectAsync,
//     status: createTeamProjectStatus,
//   } = useCreateTeamProject();

//   const {
//     deleteTeamProjectAsync,
//     status: deleteTeamProjectStatus,
//   } = useDeleteTeamProject();

//   const {
//     teamProjects: fetchedTeamProjects,
//     isLoading: isTeamProjectsLoading,
//   } = useTeamProjects(teamId);

//   const teamProjects =
//     (fetchedTeamProjects ??
//       []) as TeamProject[];

//   /*
//    * Restore selected team.
//    */
//   useEffect(() => {
//     const savedTeamId =
//       window.localStorage.getItem(
//         TEAM_ID_STORAGE_KEY,
//       );

//     if (savedTeamId) {
//       setTeamId(savedTeamId);
//     }
//   }, []);

//   /*
//    * Store team ID.
//    */
//   useEffect(() => {
//     if (team?.id) {
//       window.localStorage.setItem(
//         TEAM_ID_STORAGE_KEY,
//         team.id,
//       );
//     }
//   }, [team?.id]);

//   /*
//    * Fill edit fields when team loads.
//    */
//   useEffect(() => {
//     if (team) {
//       setTeamName(team.name);

//       setTeamDescription(
//         team.description ?? "",
//       );
//     }
//   }, [team]);

//   const memberList =
//     (members ?? []) as TeamMember[];

//   const teamData =
//     team as TeamData | undefined;

//   /*
//    * Current user's team role.
//    */
//   const currentUserMember =
//     memberList.find(
//       (member) =>
//         member.userId === userId,
//     );

//   const currentUserRole: TeamRole =
//     teamData?.createdBy === userId
//       ? "ADMIN"
//       : currentUserMember?.role ??
//         "VIEWER";

//   const isAdmin =
//     currentUserRole === "ADMIN";

//   /*
//    * Team canvas limit.
//    */
//   const teamCanvasCount =
//     teamProjects.length;

//   const canCreateTeamProject =
//     teamCanvasCount <
//     MAX_TEAM_CANVASES;

//   const isTeamCanvasLimitReached =
//     teamCanvasCount >=
//     MAX_TEAM_CANVASES;

//   /*
//    * Loading states.
//    */
//   const isCreatingTeam =
//     createTeamStatus === "pending";

//   const isUpdatingTeam =
//     updateTeamStatus === "pending";

//   const isDeletingTeam =
//     deleteTeamStatus === "pending";

//   const isAddingMember =
//     addMemberStatus === "pending" ||
//     getUserStatus === "pending";

//   const isRemovingMember =
//     removeMemberStatus === "pending";

//   const isUpdatingRole =
//     updateRoleStatus === "pending";

//   const isCreatingTeamProject =
//     createTeamProjectStatus ===
//     "pending";

//   const isDeletingTeamProject =
//     deleteTeamProjectStatus ===
//     "pending";

//   /*
//    * Create team.
//    */
//   const handleCreateTeam = async () => {
//     if (isCreatingTeam) {
//       return;
//     }

//     const name =
//       teamName.trim();

//     if (!name) {
//       return;
//     }

//     try {
//       const createdTeam =
//         await createTeamAsync({
//           name,
//           description:
//             teamDescription.trim() ||
//             undefined,
//         });

//       if (createdTeam?.id) {
//         setTeamId(
//           createdTeam.id,
//         );

//         window.localStorage.setItem(
//           TEAM_ID_STORAGE_KEY,
//           createdTeam.id,
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Failed to create team:",
//         error,
//       );
//     }
//   };

//   /*
//    * Save team.
//    */
//   const handleSaveTeam = async () => {
//     if (
//       !teamId ||
//       isUpdatingTeam
//     ) {
//       return;
//     }

//     const name =
//       teamName.trim();

//     if (!name) {
//       return;
//     }

//     try {
//       await updateTeamAsync({
//         id: teamId,
//         name,
//         description:
//           teamDescription.trim() ||
//           undefined,
//       });

//       setIsEditingTeam(false);
//     } catch (error) {
//       console.error(
//         "Failed to update team:",
//         error,
//       );
//     }
//   };

//   /*
//    * Delete team.
//    */
//   const handleDeleteTeam = async () => {
//     if (
//       !teamId ||
//       isDeletingTeam
//     ) {
//       return;
//     }

//     try {
//       await deleteTeamAsync({
//         id: teamId,
//       });

//       window.localStorage.removeItem(
//         TEAM_ID_STORAGE_KEY,
//       );

//       setTeamId("");
//       setDeleteTeamConfirm(false);
//     } catch (error) {
//       console.error(
//         "Failed to delete team:",
//         error,
//       );
//     }
//   };

//   /*
//    * Add member.
//    */
//   const handleAddMember = async () => {
//     if (
//       !teamId ||
//       !newMemberEmail.trim() ||
//       isAddingMember
//     ) {
//       return;
//     }

//     try {
//       const user =
//         await getUserByEmailAsync({
//           email:
//             newMemberEmail.trim(),
//         });

//       if (!user?.id) {
//         return;
//       }

//       const alreadyMember =
//         memberList.some(
//           (member) =>
//             member.userId ===
//             user.id,
//         );

//       if (alreadyMember) {
//         return;
//       }

//       await addTeamMemberAsync({
//         teamId,
//         userId: user.id,
//         role: "VIEWER",
//       });

//       setNewMemberEmail("");
//     } catch (error) {
//       console.error(
//         "Failed to add team member:",
//         error,
//       );
//     }
//   };

//   /*
//    * Remove member.
//    */
//   const handleRemoveMember = async (
//     member: TeamMember,
//   ) => {
//     if (
//       !teamId ||
//       isRemovingMember
//     ) {
//       return;
//     }

//     try {
//       await removeTeamMemberAsync({
//         teamId,
//         userId: member.userId,
//       });

//       setRemoveMemberId(null);
//     } catch (error) {
//       console.error(
//         "Failed to remove team member:",
//         error,
//       );
//     }
//   };

//   /*
//    * Change member role.
//    */
//   const handleRoleChange = async (
//     member: TeamMember,
//     role: TeamRole,
//   ) => {
//     if (
//       !teamId ||
//       isUpdatingRole
//     ) {
//       return;
//     }

//     try {
//       await updateTeamMemberRoleAsync({
//         teamId,
//         userId: member.userId,
//         role,
//       });
//     } catch (error) {
//       console.error(
//         "Failed to update member role:",
//         error,
//       );
//     }
//   };

//   /*
//    * Open blank canvas dialog.
//    */
//   const handleOpenCreateTeamProject =
//     () => {
//       if (
//         !teamId ||
//         !canCreateTeamProject
//       ) {
//         return;
//       }

//       setCanvasTitle("Untitled");
//       setCanvasDescription("");
//       setIsCreateCanvasDialogOpen(
//         true,
//       );
//     };

//   /*
//    * Close blank canvas dialog.
//    */
//   const handleCloseCreateTeamProject =
//     () => {
//       if (isCreatingTeamProject) {
//         return;
//       }

//       setIsCreateCanvasDialogOpen(
//         false,
//       );

//       setCanvasTitle("Untitled");
//       setCanvasDescription("");
//     };

//   /*
//    * Create team canvas.
//    */
//   const handleCreateTeamProject =
//     async () => {
//       if (
//         !teamId ||
//         isCreatingTeamProject ||
//         !canCreateTeamProject
//       ) {
//         return;
//       }

//       const title =
//         canvasTitle.trim();

//       const description =
//         canvasDescription.trim();

//       if (!title) {
//         return;
//       }

//       try {
//         const teamProject =
//           await createTeamProjectAsync({
//             teamId,
//             title,
//             description:
//               description ||
//               undefined,
//           });

//         if (
//           teamProject?.projectId
//         ) {
//           setIsCreateCanvasDialogOpen(
//             false,
//           );

//           setCanvasTitle("Untitled");
//           setCanvasDescription("");

//           router.push(
//             `/dashboard/project/${teamProject.projectId}`,
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Failed to create team canvas:",
//           error,
//         );
//       }
//     };

//   /*
//    * Open existing team canvas.
//    */
//   const handleOpenTeamProject = (
//     project: TeamProject,
//   ) => {
//     router.push(
//       `/dashboard/project/${project.projectId}`,
//     );
//   };

//   /*
//    * Delete team canvas.
//    */
//   const handleDeleteTeamProject =
//     async (
//       project: TeamProject,
//     ) => {
//       if (
//         !teamId ||
//         isDeletingTeamProject
//       ) {
//         return;
//       }

//       try {
//         await deleteTeamProjectAsync({
//           projectId:
//             project.projectId,
//         });

//         cancelDeleteCanvas();
//       } catch (error) {
//         console.error(
//           "Failed to delete team canvas:",
//           error,
//         );
//       }
//     };

//   /*
//    * Loading screen.
//    */
//   if (isTeamLoading) {
//     return (
//       <section className="flex h-[calc(100vh-70px)] items-center justify-center overflow-hidden bg-[#090B0A]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-7 w-7 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

//           <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#827B70]">
//             Loading team
//           </p>
//         </div>
//       </section>
//     );
//   }

//   /*
//    * No team yet.
//    */
//   if (!teamData) {
//     return (
//       <section className="h-[calc(100vh-70px)] overflow-y-auto bg-[#090B0A] p-8">
//         <div className="mx-auto max-w-4xl">
//           <div className="rounded-xl border border-[#2A2118] bg-[#17130F] p-8">
//             <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-[#2A2118] bg-[#211A13]">
//               <Users className="h-5 w-5 text-[#A9854F]" />
//             </div>

//             <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A9854F]">
//               Team workspace
//             </p>

//             <h1 className="text-2xl font-medium text-[#F0E6D2]">
//               Create your team
//             </h1>

//             <p className="mt-2 max-w-xl text-sm leading-6 text-[#827B70]">
//               Create a team workspace and
//               invite people who already have
//               a Sutradhara account.
//             </p>

//             <div className="mt-8 space-y-4">
//               <div>
//                 <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#827B70]">
//                   Team name
//                 </label>

//                 <input
//                   value={teamName}
//                   onChange={(event) =>
//                     setTeamName(
//                       event.target.value,
//                     )
//                   }
//                   placeholder="e.g. Product Design"
//                   className="w-full rounded-lg border border-[#2A2118] bg-[#0F0D0A] px-4 py-3 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F]"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#827B70]">
//                   Description
//                 </label>

//                 <textarea
//                   value={
//                     teamDescription
//                   }
//                   onChange={(event) =>
//                     setTeamDescription(
//                       event.target.value,
//                     )
//                   }
//                   placeholder="What is this team working on?"
//                   rows={4}
//                   className="w-full resize-none rounded-lg border border-[#2A2118] bg-[#0F0D0A] px-4 py-3 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F]"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   handleCreateTeam
//                 }
//                 disabled={
//                   isCreatingTeam ||
//                   !teamName.trim()
//                 }
//                 className="inline-flex items-center gap-2 rounded-lg bg-[#A9854F] px-5 py-3 text-sm font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <Users className="h-4 w-4" />

//                 {isCreatingTeam
//                   ? "Creating..."
//                   : "Create Team"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative h-[calc(100vh-70px)] overflow-hidden bg-[#090B0A]">
//       <div className="mx-auto flex h-full max-w-[1180px] flex-col px-8 py-8">
//         {/* FIXED TEAM HEADER */}
//         <div className="shrink-0">
//           <div className="mb-8 flex items-start justify-between gap-8">
//             <div className="min-w-0">
//               <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
//                 SUTRADHARA / TEAM
//               </p>

//               {isEditingTeam ? (
//                 <div className="max-w-2xl space-y-3">
//                   <input
//                     value={teamName}
//                     onChange={(event) =>
//                       setTeamName(
//                         event.target.value,
//                       )
//                     }
//                     className="w-full rounded-xl border border-[#3A3023] bg-[#111312] px-4 py-3 text-2xl font-medium text-[#F0E6D2] outline-none transition focus:border-[#A9854F]"
//                   />

//                   <textarea
//                     value={
//                       teamDescription
//                     }
//                     onChange={(event) =>
//                       setTeamDescription(
//                         event.target.value,
//                       )
//                     }
//                     rows={3}
//                     className="w-full resize-none rounded-xl border border-[#2A2118] bg-[#111312] px-4 py-3 text-sm leading-6 text-[#D6C4A3] outline-none transition focus:border-[#A9854F]"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <h1 className="font-serif text-[32px] font-medium tracking-tight text-[#F0E6D2]">
//                     {teamData.name}
//                   </h1>

//                   <p className="mt-2 max-w-2xl text-sm leading-6 text-[#827B70]">
//                     {teamData.description ||
//                       "A shared workspace for structured thinking."}
//                   </p>
//                 </>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="flex shrink-0 items-center gap-2">
//                 {isEditingTeam ? (
//                   <>
//                     <button
//                       type="button"
//                       onClick={
//                         handleSaveTeam
//                       }
//                       disabled={
//                         isUpdatingTeam
//                       }
//                       className="flex h-9 items-center gap-2 rounded-lg border border-[#A9854F] bg-[#A9854F] px-3.5 text-xs font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                       <Check className="h-3.5 w-3.5" />

//                       {isUpdatingTeam
//                         ? "Saving..."
//                         : "Save"}
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setIsEditingTeam(
//                           false,
//                         )
//                       }
//                       className="flex h-9 items-center gap-2 rounded-lg border border-[#2A2118] bg-[#17130F] px-3.5 text-xs text-[#B39A72] transition hover:border-[#3A3023] hover:bg-[#211A13]"
//                     >
//                       <X className="h-3.5 w-3.5" />

//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setIsEditingTeam(
//                         true,
//                       )
//                     }
//                     className="flex h-9 items-center gap-2 rounded-lg border border-[#2A2118] bg-[#17130F] px-3.5 text-xs text-[#B39A72] transition hover:border-[#A9854F] hover:bg-[#211A13]"
//                   >
//                     <Pencil className="h-3.5 w-3.5" />

//                     Edit team
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* DELETE TEAM CONFIRMATION */}
//           {deleteTeamConfirm && (
//             <div className="mb-7 rounded-xl border border-[#3A241E] bg-[#17130F] px-5 py-4">
//               <div className="flex items-center justify-between gap-5">
//                 <div>
//                   <p className="text-sm font-medium text-[#F0E6D2]">
//                     Delete this team?
//                   </p>

//                   <p className="mt-1 text-xs text-[#827B70]">
//                     This action cannot be undone.
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setDeleteTeamConfirm(
//                         false,
//                       )
//                     }
//                     className="rounded-lg border border-[#2A2118] px-3 py-2 text-xs text-[#B39A72] transition hover:bg-[#211A13]"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     onClick={
//                       handleDeleteTeam
//                     }
//                     disabled={
//                       isDeletingTeam
//                     }
//                     className="rounded-lg border border-[#704034] bg-[#3A241E] px-3 py-2 text-xs text-[#E8B09A] transition hover:bg-[#4A2B23] disabled:opacity-50"
//                   >
//                     {isDeletingTeam
//                       ? "Deleting..."
//                       : "Delete Team"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TEAM OVERVIEW */}
//           <div className="mb-8 grid grid-cols-3 gap-4">
//             <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
//               <div className="flex items-center justify-between">
//                 <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
//                   Members
//                 </p>

//                 <Users className="h-3.5 w-3.5 text-[#665E51]" />
//               </div>

//               <p className="mt-3 text-xl font-medium text-[#D6C4A3]">
//                 {memberList.length}
//               </p>

//               <p className="mt-1 text-[10px] text-[#625B50]">
//                 People in this workspace
//               </p>
//             </div>

//             <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
//               <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
//                 Your role
//               </p>

//               <p className="mt-3 text-xl font-medium text-[#B8C58C]">
//                 {currentUserRole}
//               </p>

//               <p className="mt-1 text-[10px] text-[#625B50]">
//                 Current access level
//               </p>
//             </div>

//             <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
//               <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
//                 Canvases
//               </p>

//               <p className="mt-3 text-xl font-medium text-[#C08A68]">
//                 {teamCanvasCount}

//                 <span className="ml-1 text-sm text-[#625B50]">
//                   / {MAX_TEAM_CANVASES}
//                 </span>
//               </p>

//               <p className="mt-1 text-[10px] text-[#625B50]">
//                 Shared team workspaces
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* SCROLLABLE TEAM CONTENT */}
//         <div className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#3A3023_transparent] [scrollbar-width:thin]">
//           {/* MEMBERS */}
//           <div className="mb-10">
//             <div className="mb-4">
//               <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#71695D]">
//                 COLLABORATION
//               </p>

//               <div className="mt-1 flex items-center gap-3">
//                 <h2 className="text-[17px] font-medium text-[#F0E6D2]">
//                   Team members
//                 </h2>

//                 <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2A2118] bg-[#17130F] px-1.5 font-mono text-[9px] text-[#A9854F]">
//                   {memberList.length}
//                 </span>
//               </div>
//             </div>

//             <div className="overflow-hidden rounded-xl border border-[#211C16] bg-[#101211]">
//               <div className="flex items-center justify-between border-b border-[#211C16] px-5 py-3">
//                 <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#625B50]">
//                   PEOPLE
//                 </p>

//                 {isAdmin && (
//                   <div className="flex items-center gap-2">
//                     <input
//                       value={
//                         newMemberEmail
//                       }
//                       onChange={(event) =>
//                         setNewMemberEmail(
//                           event.target.value,
//                         )
//                       }
//                       placeholder="Member email"
//                       className="h-8 w-52 rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 text-[11px] text-[#F0E6D2] outline-none placeholder:text-[#514C44] focus:border-[#A9854F]"
//                     />

//                     <button
//                       type="button"
//                       onClick={
//                         handleAddMember
//                       }
//                       disabled={
//                         isAddingMember ||
//                         !newMemberEmail.trim()
//                       }
//                       className="flex h-8 items-center gap-1.5 rounded-lg bg-[#A9854F] px-3 text-[10px] font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                       <UserPlus className="h-3 w-3" />

//                       {isAddingMember
//                         ? "Adding..."
//                         : "Add member"}
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {isMembersLoading ? (
//                 <div className="px-5 py-12 text-center">
//                   <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

//                   <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
//                     Loading members
//                   </p>
//                 </div>
//               ) : memberList.length ===
//                 0 ? (
//                 <div className="px-5 py-12 text-center">
//                   <Users className="mx-auto h-5 w-5 text-[#625B50]" />

//                   <p className="mt-3 text-sm text-[#827B70]">
//                     No members have been
//                     added yet.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3 p-3">
//                   {memberList.map(
//                     (member) => {
//                       const isCurrentUser =
//                         member.userId ===
//                         userId;

//                       return (
//                         <div
//                           key={member.id}
//                           className="flex items-center justify-between gap-5 rounded-xl border border-[#211C16] bg-[#111312] px-4 py-4 transition hover:border-[#2A2118] hover:bg-[#151613]"
//                         >
//                           <div className="flex min-w-0 items-center gap-3">
//                             {member.profileImageUrl ? (
//                               <img
//                                 src={
//                                   member.profileImageUrl
//                                 }
//                                 alt=""
//                                 className="h-9 w-9 shrink-0 rounded-lg object-cover"
//                               />
//                             ) : (
//                               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A2118] bg-[#17130F] font-mono text-[10px] font-medium text-[#C9A467]">
//                                 {getInitials(
//                                   member.fullName,
//                                   member.email,
//                                 )}
//                               </div>
//                             )}

//                             <div className="min-w-0">
//                               <div className="flex items-center gap-2">
//                                 <p className="truncate text-sm font-medium text-[#E8DDCA]">
//                                   {isCurrentUser
//                                     ? "You"
//                                     : member.fullName ||
//                                       member.email}
//                                 </p>

//                                 {isCurrentUser && (
//                                   <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#806C4B]">
//                                     YOU
//                                   </span>
//                                 )}
//                               </div>

//                               <p className="mt-1 truncate text-[10px] text-[#625B50]">
//                                 {member.userId ===
//                                 teamData.createdBy
//                                   ? "Owner"
//                                   : formatRoleLabel(
//                                       member.role,
//                                     )}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex shrink-0 items-center gap-3">
//                             {isAdmin ? (
//                               <select
//                                 value={
//                                   member.role
//                                 }
//                                 onChange={(
//                                   event,
//                                 ) =>
//                                   handleRoleChange(
//                                     member,
//                                     event
//                                       .target
//                                       .value as TeamRole,
//                                   )
//                                 }
//                                 disabled={
//                                   isUpdatingRole
//                                 }
//                                 className="appearance-none rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 py-2 text-[10px] text-[#B39A72] outline-none focus:border-[#A9854F] disabled:opacity-50"
//                               >
//                                 <option value="ADMIN">
//                                   ADMIN
//                                 </option>

//                                 <option value="EDITOR">
//                                   EDITOR
//                                 </option>

//                                 <option value="VIEWER">
//                                   VIEWER
//                                 </option>
//                               </select>
//                             ) : (
//                               <span className="rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 py-2 font-mono text-[9px] text-[#827B70]">
//                                 {member.role}
//                               </span>
//                             )}

//                             {isAdmin &&
//                               !isCurrentUser &&
//                               member.userId !==
//                                 teamData.createdBy && (
//                                 <>
//                                   {removeMemberId ===
//                                   member.id ? (
//                                     <div className="flex items-center gap-2">
//                                       <button
//                                         type="button"
//                                         onClick={() =>
//                                           handleRemoveMember(
//                                             member,
//                                           )
//                                         }
//                                         disabled={
//                                           isRemovingMember
//                                         }
//                                         className="rounded-md border border-[#704034] bg-[#3A241E] px-2.5 py-1.5 text-[9px] text-[#E8B09A] disabled:opacity-50"
//                                       >
//                                         Confirm
//                                       </button>

//                                       <button
//                                         type="button"
//                                         onClick={() =>
//                                           setRemoveMemberId(
//                                             null,
//                                           )
//                                         }
//                                         className="rounded-md border border-[#2A2118] px-2.5 py-1.5 text-[9px] text-[#827B70]"
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         setRemoveMemberId(
//                                           member.id,
//                                         )
//                                       }
//                                       className="rounded-lg border border-[#2A2118] p-2 text-[#5F5A51] transition hover:border-[#704034] hover:text-[#C08A68]"
//                                     >
//                                       <Trash2 className="h-3.5 w-3.5" />
//                                     </button>
//                                   )}
//                                 </>
//                               )}
//                           </div>
//                         </div>
//                       );
//                     },
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* TEAM CANVASES */}
//           <div className="mb-10">
//             <div className="mb-4 flex items-end justify-between gap-5">
//               <div>
//                 <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#71695D]">
//                   WORKSPACE
//                 </p>

//                 <h2 className="mt-1 text-[17px] font-medium text-[#F0E6D2]">
//                   Team canvases
//                 </h2>

//                 <p className="mt-1 text-xs text-[#71695D]">
//                   Shared visual workspaces
//                   for your team.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   handleOpenCreateTeamProject
//                 }
//                 disabled={
//                   isCreatingTeamProject ||
//                   !canCreateTeamProject
//                 }
//                 className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#A9854F] bg-[#A9854F] px-3.5 text-xs font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <Plus className="h-3.5 w-3.5" />

//                 {isTeamCanvasLimitReached
//                   ? "Limit reached"
//                   : "Blank canvas"}
//               </button>
//             </div>

//             {isTeamProjectsLoading ? (
//               <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-12 text-center">
//                 <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

//                 <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
//                   Loading canvases
//                 </p>
//               </div>
//             ) : teamProjects.length ===
//               0 ? (
//               <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-12 text-center">
//                 <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A2118] bg-[#17130F]">
//                   <Plus className="h-4 w-4 text-[#806C4B]" />
//                 </div>

//                 <p className="mt-4 text-sm text-[#827B70]">
//                   No team canvases yet.
//                 </p>

//                 <p className="mt-1 text-xs text-[#5F5A51]">
//                   Create a blank canvas to
//                   start working together.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {teamProjects.map(
//                   (project) => {
//                     return (
//                       <div
//                         key={project.id}
//                         className="group flex w-full items-center gap-4 rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4 transition hover:border-[#2A2118] hover:bg-[#151613]"
//                       >
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleOpenTeamProject(
//                               project,
//                             )
//                           }
//                           className="flex min-w-0 flex-1 items-center gap-4 text-left"
//                         >
//                           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2A2118] bg-[#171813]">
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               className="text-[#A9854F]"
//                             >
//                               <rect
//                                 x="5"
//                                 y="5"
//                                 width="5"
//                                 height="5"
//                                 rx="1"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                               />

//                               <rect
//                                 x="14"
//                                 y="14"
//                                 width="5"
//                                 height="5"
//                                 rx="1"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                               />

//                               <path
//                                 d="M10 7.5H14C14.55 7.5 15 7.95 15 8.5V14"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                               />
//                             </svg>
//                           </div>

//                           <div className="min-w-0 flex-1">
//                             <p className="truncate text-sm font-medium text-[#E8DDCA]">
//                               {project.title}
//                             </p>

//                             <p className="mt-1 truncate text-xs text-[#625B50]">
//                               {project.description ||
//                                 "No description"}
//                             </p>
//                           </div>

//                           <div className="hidden shrink-0 text-right sm:block">
//                             <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#514C44]">
//                               UPDATED
//                             </p>

//                             <p className="mt-1 text-[10px] text-[#71695D]">
//                               {formatTeamDate(
//                                 project.updatedAt,
//                               )}
//                             </p>
//                           </div>

//                           <div className="shrink-0 text-[#4E4941] transition group-hover:translate-x-0.5 group-hover:text-[#A9854F]">
//                             →
//                           </div>
//                         </button>

//                         {/* DELETE CANVAS */}
//                         {isAdmin && (
//                           <div
//                             className="relative z-20 flex shrink-0 items-center"
//                             onClick={(event) =>
//                               event.stopPropagation()
//                             }
//                           >
//                             {!isConfirmingDelete(
//                               project.id,
//                             ) && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   startDeleteCanvas(
//                                     project.id,
//                                   )
//                                 }
//                                 disabled={
//                                   isDeletingTeamProject
//                                 }
//                                 aria-label={`Delete ${project.title}`}
//                                 className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#5F5A51] opacity-0 transition hover:border-[#704034] hover:bg-[#3A241E] hover:text-[#E8B09A] group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
//                               >
//                                 <Trash2 className="h-3.5 w-3.5" />
//                               </button>
//                             )}

//                             {isConfirmingDelete(
//                               project.id,
//                             ) && (
//                               <div className="absolute right-0 top-1/2 z-50 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-[#A9854F]/10 bg-[#101211] p-1 shadow-[0_8px_25px_rgba(0,0,0,0.45)]">
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleDeleteTeamProject(
//                                       project,
//                                     )
//                                   }
//                                   disabled={
//                                     isDeletingTeamProject
//                                   }
//                                   className="rounded-md border border-[#8A493D]/50 bg-[#5A2E27]/20 px-3 py-1.5 text-[9px] font-medium text-[#D8A69A] transition hover:border-[#A65B4E]/70 hover:bg-[#6B362E]/30 disabled:cursor-not-allowed disabled:opacity-50"
//                                 >
//                                   {isDeletingTeamProject
//                                     ? "Deleting..."
//                                     : "Confirm"}
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={
//                                     cancelDeleteCanvas
//                                   }
//                                   disabled={
//                                     isDeletingTeamProject
//                                   }
//                                   className="rounded-md border border-[#A9854F]/10 bg-[#0D0F0E] px-3 py-1.5 text-[9px] text-[#77736B] transition hover:border-[#A9854F]/20 hover:text-[#B9AD9B] disabled:cursor-not-allowed disabled:opacity-50"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   },
//                 )}
//               </div>
//             )}
//           </div>

//           {/* TEAM FOOTER NOTE */}
//           <div className="mb-4 rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#7E9A68]" />

//               <div>
//                 <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#806C4B]">
//                   LIVING WORKSPACE
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-[#71695D]">
//                   Ideas become clearer when
//                   people can see the same
//                   structure and build on it
//                   together.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CREATE TEAM CANVAS DIALOG */}
//       {isCreateCanvasDialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]">
//           <div
//             className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#3A3023] bg-[#111312] p-6 shadow-2xl"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >
//             <button
//               type="button"
//               onClick={
//                 handleCloseCreateTeamProject
//               }
//               disabled={
//                 isCreatingTeamProject
//               }
//               className="absolute right-5 top-5 text-[#71695D] transition hover:text-[#B39A72] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A9854F]">
//               NEW TEAM CANVAS
//             </p>

//             <h2 className="mt-3 font-serif text-2xl text-[#F0E6D2]">
//               Start with a blank thread
//             </h2>

//             <p className="mt-2 text-sm text-[#827B70]">
//               Give the workspace a name and
//               start shaping your idea from
//               scratch.
//             </p>

//             <div className="mt-7">
//               <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#827B70]">
//                 Title
//               </label>

//               <input
//                 autoFocus
//                 value={canvasTitle}
//                 onChange={(event) =>
//                   setCanvasTitle(
//                     event.target.value,
//                   )
//                 }
//                 placeholder="Untitled"
//                 disabled={
//                   isCreatingTeamProject
//                 }
//                 className="h-11 w-full rounded-xl border border-[#4A3925] bg-[#0A0D0C] px-4 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F] disabled:opacity-50"
//               />
//             </div>

//             <div className="mt-5">
//               <label className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#827B70]">
//                 Description

//                 <span className="normal-case tracking-normal text-[#5F5A51]">
//                   Optional
//                 </span>
//               </label>

//               <textarea
//                 value={
//                   canvasDescription
//                 }
//                 onChange={(event) =>
//                   setCanvasDescription(
//                     event.target.value,
//                   )
//                 }
//                 placeholder="What is this project about?"
//                 rows={4}
//                 disabled={
//                   isCreatingTeamProject
//                 }
//                 className="w-full resize-none rounded-xl border border-[#292D2A] bg-[#0A0D0C] px-4 py-3 text-sm leading-6 text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F] disabled:opacity-50"
//               />
//             </div>

//             <div className="mt-8 flex items-center justify-between border-t border-[#242822] pt-5">
//               <button
//                 type="button"
//                 onClick={
//                   handleCloseCreateTeamProject
//                 }
//                 disabled={
//                   isCreatingTeamProject
//                 }
//                 className="px-3 py-2 text-sm text-[#827B70] transition hover:text-[#B39A72] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   handleCreateTeamProject
//                 }
//                 disabled={
//                   isCreatingTeamProject ||
//                   !canvasTitle.trim()
//                 }
//                 className="flex h-11 items-center gap-2 rounded-xl border border-[#6A512F] bg-[#1E1B15] px-5 text-sm font-medium text-[#D6C4A3] transition hover:border-[#A9854F] hover:bg-[#262117] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {isCreatingTeamProject ? (
//                   <>
//                     <div className="h-3.5 w-3.5 animate-spin rounded-full border border-[#A9854F]/30 border-t-[#D6C4A3]" />
//                     Creating...
//                   </>
//                 ) : (
//                   "Create Canvas"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function getInitials(
//   fullName: string | null,
//   email: string,
// ) {
//   const source =
//     fullName?.trim() || email;

//   if (!source) {
//     return "U";
//   }

//   const parts = source
//     .split(/\s+/)
//     .filter(Boolean);

//   if (parts.length >= 2) {
//     return (
//       parts[0]!.charAt(0) +
//       parts[1]!.charAt(0)
//     ).toUpperCase();
//   }

//   return source
//     .slice(0, 2)
//     .toUpperCase();
// }

// function formatRoleLabel(
//   role: TeamRole,
// ) {
//   if (role === "ADMIN") {
//     return "Admin";
//   }

//   if (role === "EDITOR") {
//     return "Editor";
//   }

//   return "Viewer";
// }

// function formatTeamDate(
//   date: Date | string,
// ) {
//   const value =
//     new Date(date);

//   if (
//     Number.isNaN(
//       value.getTime(),
//     )
//   ) {
//     return "—";
//   }

//   return value.toLocaleDateString(
//     "en-GB",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     },
//   );
// }

"use client";



import {
  useEffect,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { useRouter } from "next/navigation";

import {
  UserPlus,
  Trash2,
  Users,
  Pencil,
  Check,
  X,
  Plus,
} from "lucide-react";

import {
  useCreateTeam,
  useDeleteTeam,
  useGetTeam,
  useUpdateTeam,
} from "~/hooks/api/team";

import {
  useAddTeamMember,
  useRemoveTeamMember,
  useTeamMembers,
  useUpdateTeamMemberRole,
} from "~/hooks/api/teamMembers";

import { useGetUserByEmail } from "~/hooks/api/auth";

import {
  useCreateTeamProject,
  useDeleteTeamProject,
  useTeamProjects,
} from "~/hooks/api/teamProjects";

type TeamPageProps = {
  userId?: string;
  fullName: string;
};

type TeamRole =
  | "ADMIN"
  | "EDITOR"
  | "VIEWER";

type TeamMember = {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  createdAt: Date | string;
  fullName: string | null;
  email: string;
  profileImageUrl: string | null;
};

type TeamData = {
  id: string;
  name: string;
  description: string | null;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type TeamProject = {
  id: string;
  teamId: string;
  projectId: string;
  title: string;
  description: string | null;
  canvasData: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const TEAM_ID_STORAGE_KEY =
  "sutradhara-team-id";

const MAX_TEAM_CANVASES = 3;

type TeamProjectCardProps = {
  project: TeamProject;
  authorName?: string;
  isAdmin: boolean;
  onOpenProject: (project: TeamProject) => void;
  onDeleteProject: (project: TeamProject) => Promise<void>;
};

function TeamProjectCard({
  project,
  authorName = "User",
  isAdmin,
  onOpenProject,
  onDeleteProject,
}: TeamProjectCardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenProject = () => {
    if (isConfirmingDelete || isDeleting) return;
    onOpenProject(project);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isConfirmingDelete || isDeleting) return;
      onOpenProject(project);
    }
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isDeleting) return;
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isDeleting) return;
    setIsConfirmingDelete(false);
  };

  const handleConfirmDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await onDeleteProject(project);
      setIsConfirmingDelete(false);
    } catch (error) {
      console.error("Failed to delete team canvas:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const createdDate = new Date(project.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const updatedDate = new Date(project.updatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const authorInitial = authorName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenProject}
      onKeyDown={handleKeyDown}
      className="group relative grid cursor-pointer grid-cols-[minmax(0,1fr)_125px_125px_58px_38px] items-center gap-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] px-5 py-4 transition duration-200 hover:border-[#A9854F]/25 hover:bg-[#141615]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
          <ProjectIcon />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium leading-6 text-[#E1D8C9]">{project.title}</h3>
          <p className="mt-0.5 truncate text-[12px] leading-5 text-[#77736B]">{project.description || "No description"}</p>
        </div>
      </div>

      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">Created</p>
        <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">{createdDate}</p>
      </div>

      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">Edited</p>
        <p className="mt-1.5 whitespace-nowrap text-[12px] text-[#B6ADA0]">{updatedDate}</p>
      </div>

      <div className="relative z-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">Author</p>
        <div className="mt-1.5 flex items-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-[12px] text-[#D6C4A3]">{authorInitial}</div>
        </div>
      </div>

      {isAdmin && (
        <div
          className="relative z-20 flex h-8 w-[38px] items-center justify-end"
          onClick={(event) => event.stopPropagation()}
        >
          {!isConfirmingDelete && (
            <button
              type="button"
              onClick={handleDelete}
              aria-label={`Delete ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#777169] opacity-0 transition hover:bg-[#25231F] hover:text-[#D8CEBD] group-hover:opacity-100"
            >
              <Trash2 className="h-[15px] w-[15px]" />
            </button>
          )}

          {isConfirmingDelete && (
            <div className="absolute right-0 top-1/2 z-50 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-[#A9854F]/10 bg-[#101211] p-1 shadow-[0_8px_25px_rgba(0,0,0,0.45)]">
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-md border border-[#8A493D]/50 bg-[#5A2E27]/20 px-3 py-1.5 text-[9px] font-medium text-[#D8A69A] transition hover:border-[#A65B4E]/70 hover:bg-[#6B362E]/30 disabled:cursor-not-allowed disabled:opacity-50"
              >{isDeleting ? "Deleting..." : "Confirm"}</button>
              <button
                type="button"
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="rounded-md border border-[#A9854F]/10 bg-[#0D0F0E] px-3 py-1.5 text-[9px] text-[#77736B] transition hover:border-[#A9854F]/20 hover:text-[#B9AD9B] disabled:cursor-not-allowed disabled:opacity-50"
              >Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="6" height="6" rx="1" stroke="#B99052" strokeWidth="1.3" />
      <rect x="14" y="14" width="6" height="6" rx="1" stroke="#B99052" strokeWidth="1.3" />
      <path d="M10 7H14" stroke="#B99052" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M17 10V14" stroke="#B99052" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 17H14" stroke="#B99052" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 10V14" stroke="#B99052" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function TeamPage({
  userId,
  fullName,
}: TeamPageProps) {
  const router = useRouter();

  const [teamId, setTeamId] =
    useState("");

  const [
    isEditingTeam,
    setIsEditingTeam,
  ] = useState(false);

  const [teamName, setTeamName] =
    useState("");

  const [
    teamDescription,
    setTeamDescription,
  ] = useState("");

  const [
    newMemberEmail,
    setNewMemberEmail,
  ] = useState("");

  const [
    deleteTeamConfirm,
    setDeleteTeamConfirm,
  ] = useState(false);

  const [
    removeMemberId,
    setRemoveMemberId,
  ] = useState<string | null>(null);


  const [
    isCreateCanvasDialogOpen,
    setIsCreateCanvasDialogOpen,
  ] = useState(false);

  const [canvasTitle, setCanvasTitle] =
    useState("Untitled");

  const [
    canvasDescription,
    setCanvasDescription,
  ] = useState("");

  /*
   * Team
   */
  const {
    createTeamAsync,
    status: createTeamStatus,
  } = useCreateTeam();

  const {
    updateTeamAsync,
    status: updateTeamStatus,
  } = useUpdateTeam();

  const {
    deleteTeamAsync,
    status: deleteTeamStatus,
  } = useDeleteTeam();

  const {
    team,
    isLoading: isTeamLoading,
  } = useGetTeam(teamId);

  /*
   * Members
   */
  const {
    members,
    isLoading: isMembersLoading,
  } = useTeamMembers(teamId);

  const {
    addTeamMemberAsync,
    status: addMemberStatus,
  } = useAddTeamMember();

  const {
    removeTeamMemberAsync,
    status: removeMemberStatus,
  } = useRemoveTeamMember();

  const {
    updateTeamMemberRoleAsync,
    status: updateRoleStatus,
  } =
    useUpdateTeamMemberRole();

  const {
    getUserByEmailAsync,
    status: getUserStatus,
  } = useGetUserByEmail();

  /*
   * Team projects
   */
  const {
    createTeamProjectAsync,
    status: createTeamProjectStatus,
  } = useCreateTeamProject();

  const {
    deleteTeamProjectAsync,
    status: deleteTeamProjectStatus,
  } = useDeleteTeamProject();

  const {
    teamProjects: fetchedTeamProjects,
    isLoading: isTeamProjectsLoading,
  } = useTeamProjects(teamId);

  const teamProjects =
    (fetchedTeamProjects ??
      []) as TeamProject[];

  /*
   * Restore selected team.
   */
  useEffect(() => {
    const savedTeamId =
      window.localStorage.getItem(
        TEAM_ID_STORAGE_KEY,
      );

    if (savedTeamId) {
      setTeamId(savedTeamId);
    }
  }, []);

  /*
   * Store team ID.
   */
  useEffect(() => {
    if (team?.id) {
      window.localStorage.setItem(
        TEAM_ID_STORAGE_KEY,
        team.id,
      );
    }
  }, [team?.id]);

  /*
   * Fill edit fields when team loads.
   */
  useEffect(() => {
    if (team) {
      setTeamName(team.name);

      setTeamDescription(
        team.description ?? "",
      );
    }
  }, [team]);

  const memberList =
    (members ?? []) as TeamMember[];

  const teamData =
    team as TeamData | undefined;

  /*
   * Current user's team role.
   */
  const currentUserMember =
    memberList.find(
      (member) =>
        member.userId === userId,
    );

  const currentUserRole: TeamRole =
    teamData?.createdBy === userId
      ? "ADMIN"
      : currentUserMember?.role ??
        "VIEWER";

  const isAdmin =
    currentUserRole === "ADMIN";

  /*
   * Team canvas limit.
   */
  const teamCanvasCount =
    teamProjects.length;

  const canCreateTeamProject =
    teamCanvasCount <
    MAX_TEAM_CANVASES;

  const isTeamCanvasLimitReached =
    teamCanvasCount >=
    MAX_TEAM_CANVASES;

  /*
   * Loading states.
   */
  const isCreatingTeam =
    createTeamStatus === "pending";

  const isUpdatingTeam =
    updateTeamStatus === "pending";

  const isDeletingTeam =
    deleteTeamStatus === "pending";

  const isAddingMember =
    addMemberStatus === "pending" ||
    getUserStatus === "pending";

  const isRemovingMember =
    removeMemberStatus === "pending";

  const isUpdatingRole =
    updateRoleStatus === "pending";

  const isCreatingTeamProject =
    createTeamProjectStatus ===
    "pending";

  const isDeletingTeamProject =
    deleteTeamProjectStatus ===
    "pending";

  /*
   * Create team.
   */
  const handleCreateTeam = async () => {
    if (isCreatingTeam) {
      return;
    }

    const name =
      teamName.trim();

    if (!name) {
      return;
    }

    try {
      const createdTeam =
        await createTeamAsync({
          name,
          description:
            teamDescription.trim() ||
            undefined,
        });

      if (createdTeam?.id) {
        setTeamId(
          createdTeam.id,
        );

        window.localStorage.setItem(
          TEAM_ID_STORAGE_KEY,
          createdTeam.id,
        );
      }
    } catch (error) {
      console.error(
        "Failed to create team:",
        error,
      );
    }
  };

  /*
   * Save team.
   */
  const handleSaveTeam = async () => {
    if (
      !teamId ||
      isUpdatingTeam
    ) {
      return;
    }

    const name =
      teamName.trim();

    if (!name) {
      return;
    }

    try {
      await updateTeamAsync({
        id: teamId,
        name,
        description:
          teamDescription.trim() ||
          undefined,
      });

      setIsEditingTeam(false);
    } catch (error) {
      console.error(
        "Failed to update team:",
        error,
      );
    }
  };

  /*
   * Delete team.
   */
  const handleDeleteTeam = async () => {
    if (
      !teamId ||
      isDeletingTeam
    ) {
      return;
    }

    try {
      await deleteTeamAsync({
        id: teamId,
      });

      window.localStorage.removeItem(
        TEAM_ID_STORAGE_KEY,
      );

      setTeamId("");
      setDeleteTeamConfirm(false);
    } catch (error) {
      console.error(
        "Failed to delete team:",
        error,
      );
    }
  };

  /*
   * Add member.
   */
  const handleAddMember = async () => {
    if (
      !teamId ||
      !newMemberEmail.trim() ||
      isAddingMember
    ) {
      return;
    }

    try {
      const user =
        await getUserByEmailAsync({
          email:
            newMemberEmail.trim(),
        });

      if (!user?.id) {
        return;
      }

      const alreadyMember =
        memberList.some(
          (member) =>
            member.userId ===
            user.id,
        );

      if (alreadyMember) {
        return;
      }

      await addTeamMemberAsync({
        teamId,
        userId: user.id,
        role: "VIEWER",
      });

      setNewMemberEmail("");
    } catch (error) {
      console.error(
        "Failed to add team member:",
        error,
      );
    }
  };

  /*
   * Remove member.
   */
  const handleRemoveMember = async (
    member: TeamMember,
  ) => {
    if (
      !teamId ||
      isRemovingMember
    ) {
      return;
    }

    try {
      await removeTeamMemberAsync({
        teamId,
        userId: member.userId,
      });

      setRemoveMemberId(null);
    } catch (error) {
      console.error(
        "Failed to remove team member:",
        error,
      );
    }
  };

  /*
   * Change member role.
   */
  const handleRoleChange = async (
    member: TeamMember,
    role: TeamRole,
  ) => {
    if (
      !teamId ||
      isUpdatingRole
    ) {
      return;
    }

    try {
      await updateTeamMemberRoleAsync({
        teamId,
        userId: member.userId,
        role,
      });
    } catch (error) {
      console.error(
        "Failed to update member role:",
        error,
      );
    }
  };

  /*
   * Open blank canvas dialog.
   */
  const handleOpenCreateTeamProject =
    () => {
      if (
        !teamId ||
        !canCreateTeamProject
      ) {
        return;
      }

      setCanvasTitle("Untitled");
      setCanvasDescription("");
      setIsCreateCanvasDialogOpen(
        true,
      );
    };

  /*
   * Close blank canvas dialog.
   */
  const handleCloseCreateTeamProject =
    () => {
      if (isCreatingTeamProject) {
        return;
      }

      setIsCreateCanvasDialogOpen(
        false,
      );

      setCanvasTitle("Untitled");
      setCanvasDescription("");
    };

  /*
   * Create team canvas.
   */
  const handleCreateTeamProject =
    async () => {
      if (
        !teamId ||
        isCreatingTeamProject ||
        !canCreateTeamProject
      ) {
        return;
      }

      const title =
        canvasTitle.trim();

      const description =
        canvasDescription.trim();

      if (!title) {
        return;
      }

      try {
        const teamProject =
          await createTeamProjectAsync({
            teamId,
            title,
            description:
              description ||
              undefined,
          });

        if (
          teamProject?.projectId
        ) {
          setIsCreateCanvasDialogOpen(
            false,
          );

          setCanvasTitle("Untitled");
          setCanvasDescription("");

          router.push(
            `/dashboard/project/${teamProject.projectId}`,
          );
        }
      } catch (error) {
        console.error(
          "Failed to create team canvas:",
          error,
        );
      }
    };

  /*
   * Open existing team canvas.
   */
  const handleOpenTeamProject = (
    project: TeamProject,
  ) => {
    router.push(
      `/dashboard/project/${project.projectId}`,
    );
  };

  /*
   * Delete team canvas.
   */
  const handleDeleteTeamProject =
    async (
      project: TeamProject,
    ) => {
      if (!teamId) {
        return;
      }

      await deleteTeamProjectAsync({
        projectId: project.projectId,
      });
    };

  /*
   * Loading screen.
   */
  if (isTeamLoading) {
    return (
      <section className="flex h-[calc(100vh-70px)] items-center justify-center overflow-hidden bg-[#090B0A]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-7 w-7 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#827B70]">
            Loading team
          </p>
        </div>
      </section>
    );
  }

  /*
   * No team yet.
   */
  if (!teamData) {
    return (
      <section className="h-[calc(100vh-70px)] overflow-y-auto bg-[#090B0A] p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-[#2A2118] bg-[#17130F] p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-[#2A2118] bg-[#211A13]">
              <Users className="h-5 w-5 text-[#A9854F]" />
            </div>

            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A9854F]">
              Team workspace
            </p>

            <h1 className="text-2xl font-medium text-[#F0E6D2]">
              Create your team
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#827B70]">
              Create a team workspace and
              invite people who already have
              a Sutradhara account.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#827B70]">
                  Team name
                </label>

                <input
                  value={teamName}
                  onChange={(event) =>
                    setTeamName(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Product Design"
                  className="w-full rounded-lg border border-[#2A2118] bg-[#0F0D0A] px-4 py-3 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F]"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#827B70]">
                  Description
                </label>

                <textarea
                  value={
                    teamDescription
                  }
                  onChange={(event) =>
                    setTeamDescription(
                      event.target.value,
                    )
                  }
                  placeholder="What is this team working on?"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#2A2118] bg-[#0F0D0A] px-4 py-3 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F]"
                />
              </div>

              <button
                type="button"
                onClick={
                  handleCreateTeam
                }
                disabled={
                  isCreatingTeam ||
                  !teamName.trim()
                }
                className="inline-flex items-center gap-2 rounded-lg bg-[#A9854F] px-5 py-3 text-sm font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Users className="h-4 w-4" />

                {isCreatingTeam
                  ? "Creating..."
                  : "Create Team"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[calc(100vh-70px)] overflow-hidden bg-[#090B0A]">
      <div className="mx-auto flex h-full max-w-[1180px] flex-col px-8 py-8">
        {/* FIXED TEAM HEADER */}
        <div className="shrink-0">
          <div className="mb-8 flex items-start justify-between gap-8">
            <div className="min-w-0">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#A9854F]">
                SUTRADHARA / TEAM
              </p>

              {isEditingTeam ? (
                <div className="max-w-2xl space-y-3">
                  <input
                    value={teamName}
                    onChange={(event) =>
                      setTeamName(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-[#3A3023] bg-[#111312] px-4 py-3 text-2xl font-medium text-[#F0E6D2] outline-none transition focus:border-[#A9854F]"
                  />

                  <textarea
                    value={
                      teamDescription
                    }
                    onChange={(event) =>
                      setTeamDescription(
                        event.target.value,
                      )
                    }
                    rows={3}
                    className="w-full resize-none rounded-xl border border-[#2A2118] bg-[#111312] px-4 py-3 text-sm leading-6 text-[#D6C4A3] outline-none transition focus:border-[#A9854F]"
                  />
                </div>
              ) : (
                <>
                  <h1 className="font-serif text-[32px] font-medium tracking-tight text-[#F0E6D2]">
                    {teamData.name}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#827B70]">
                    {teamData.description ||
                      "A shared workspace for structured thinking."}
                  </p>
                </>
              )}
            </div>

            {isAdmin && (
              <div className="flex shrink-0 items-center gap-2">
                {isEditingTeam ? (
                  <>
                    <button
                      type="button"
                      onClick={
                        handleSaveTeam
                      }
                      disabled={
                        isUpdatingTeam
                      }
                      className="flex h-9 items-center gap-2 rounded-lg border border-[#A9854F] bg-[#A9854F] px-3.5 text-xs font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />

                      {isUpdatingTeam
                        ? "Saving..."
                        : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingTeam(
                          false,
                        )
                      }
                      className="flex h-9 items-center gap-2 rounded-lg border border-[#2A2118] bg-[#17130F] px-3.5 text-xs text-[#B39A72] transition hover:border-[#3A3023] hover:bg-[#211A13]"
                    >
                      <X className="h-3.5 w-3.5" />

                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setIsEditingTeam(
                        true,
                      )
                    }
                    className="flex h-9 items-center gap-2 rounded-lg border border-[#2A2118] bg-[#17130F] px-3.5 text-xs text-[#B39A72] transition hover:border-[#A9854F] hover:bg-[#211A13]"
                  >
                    <Pencil className="h-3.5 w-3.5" />

                    Edit team
                  </button>
                )}
              </div>
            )}
          </div>

          {/* DELETE TEAM CONFIRMATION */}
          {deleteTeamConfirm && (
            <div className="mb-7 rounded-xl border border-[#3A241E] bg-[#17130F] px-5 py-4">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-medium text-[#F0E6D2]">
                    Delete this team?
                  </p>

                  <p className="mt-1 text-xs text-[#827B70]">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTeamConfirm(
                        false,
                      )
                    }
                    className="rounded-lg border border-[#2A2118] px-3 py-2 text-xs text-[#B39A72] transition hover:bg-[#211A13]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleDeleteTeam
                    }
                    disabled={
                      isDeletingTeam
                    }
                    className="rounded-lg border border-[#704034] bg-[#3A241E] px-3 py-2 text-xs text-[#E8B09A] transition hover:bg-[#4A2B23] disabled:opacity-50"
                  >
                    {isDeletingTeam
                      ? "Deleting..."
                      : "Delete Team"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TEAM OVERVIEW */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
                  Members
                </p>

                <Users className="h-3.5 w-3.5 text-[#665E51]" />
              </div>

              <p className="mt-3 text-xl font-medium text-[#D6C4A3]">
                {memberList.length}
              </p>

              <p className="mt-1 text-[10px] text-[#625B50]">
                People in this workspace
              </p>
            </div>

            <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
                Your role
              </p>

              <p className="mt-3 text-xl font-medium text-[#B8C58C]">
                {currentUserRole}
              </p>

              <p className="mt-1 text-[10px] text-[#625B50]">
                Current access level
              </p>
            </div>

            <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
                Canvases
              </p>

              <p className="mt-3 text-xl font-medium text-[#C08A68]">
                {teamCanvasCount}

                <span className="ml-1 text-sm text-[#625B50]">
                  / {MAX_TEAM_CANVASES}
                </span>
              </p>

              <p className="mt-1 text-[10px] text-[#625B50]">
                Shared team workspaces
              </p>
            </div>
          </div>
        </div>

        {/* SCROLLABLE TEAM CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#3A3023_transparent] [scrollbar-width:thin]">
          {/* MEMBERS */}
          <div className="mb-10">
            <div className="mb-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#71695D]">
                COLLABORATION
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h2 className="text-[17px] font-medium text-[#F0E6D2]">
                  Team members
                </h2>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2A2118] bg-[#17130F] px-1.5 font-mono text-[9px] text-[#A9854F]">
                  {memberList.length}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#211C16] bg-[#101211]">
              <div className="flex items-center justify-between border-b border-[#211C16] px-5 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#625B50]">
                  PEOPLE
                </p>

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <input
                      value={
                        newMemberEmail
                      }
                      onChange={(event) =>
                        setNewMemberEmail(
                          event.target.value,
                        )
                      }
                      placeholder="Member email"
                      className="h-8 w-52 rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 text-[11px] text-[#F0E6D2] outline-none placeholder:text-[#514C44] focus:border-[#A9854F]"
                    />

                    <button
                      type="button"
                      onClick={
                        handleAddMember
                      }
                      disabled={
                        isAddingMember ||
                        !newMemberEmail.trim()
                      }
                      className="flex h-8 items-center gap-1.5 rounded-lg bg-[#A9854F] px-3 text-[10px] font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <UserPlus className="h-3 w-3" />

                      {isAddingMember
                        ? "Adding..."
                        : "Add member"}
                    </button>
                  </div>
                )}
              </div>

              {isMembersLoading ? (
                <div className="px-5 py-12 text-center">
                  <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
                    Loading members
                  </p>
                </div>
              ) : memberList.length ===
                0 ? (
                <div className="px-5 py-12 text-center">
                  <Users className="mx-auto h-5 w-5 text-[#625B50]" />

                  <p className="mt-3 text-sm text-[#827B70]">
                    No members have been
                    added yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 p-3">
                  {memberList.map(
                    (member) => {
                      const isCurrentUser =
                        member.userId ===
                        userId;

                      return (
                        <div
                          key={member.id}
                          className="flex items-center justify-between gap-5 rounded-xl border border-[#211C16] bg-[#111312] px-4 py-4 transition hover:border-[#2A2118] hover:bg-[#151613]"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            {member.profileImageUrl ? (
                              <img
                                src={
                                  member.profileImageUrl
                                }
                                alt=""
                                className="h-9 w-9 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A2118] bg-[#17130F] font-mono text-[10px] font-medium text-[#C9A467]">
                                {getInitials(
                                  member.fullName,
                                  member.email,
                                )}
                              </div>
                            )}

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium text-[#E8DDCA]">
                                  {isCurrentUser
                                    ? "You"
                                    : member.fullName ||
                                      member.email}
                                </p>

                                {isCurrentUser && (
                                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#806C4B]">
                                    YOU
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 truncate text-[10px] text-[#625B50]">
                                {member.userId ===
                                teamData.createdBy
                                  ? "Owner"
                                  : formatRoleLabel(
                                      member.role,
                                    )}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            {isAdmin ? (
                              <select
                                value={
                                  member.role
                                }
                                onChange={(
                                  event,
                                ) =>
                                  handleRoleChange(
                                    member,
                                    event
                                      .target
                                      .value as TeamRole,
                                  )
                                }
                                disabled={
                                  isUpdatingRole
                                }
                                className="appearance-none rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 py-2 text-[10px] text-[#B39A72] outline-none focus:border-[#A9854F] disabled:opacity-50"
                              >
                                <option value="ADMIN">
                                  ADMIN
                                </option>

                                <option value="EDITOR">
                                  EDITOR
                                </option>

                                <option value="VIEWER">
                                  VIEWER
                                </option>
                              </select>
                            ) : (
                              <span className="rounded-lg border border-[#2A2118] bg-[#0C0E0D] px-3 py-2 font-mono text-[9px] text-[#827B70]">
                                {member.role}
                              </span>
                            )}

                            {isAdmin &&
                              !isCurrentUser &&
                              member.userId !==
                                teamData.createdBy && (
                                <>
                                  {removeMemberId ===
                                  member.id ? (
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveMember(
                                            member,
                                          )
                                        }
                                        disabled={
                                          isRemovingMember
                                        }
                                        className="rounded-md border border-[#704034] bg-[#3A241E] px-2.5 py-1.5 text-[9px] text-[#E8B09A] disabled:opacity-50"
                                      >
                                        Confirm
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setRemoveMemberId(
                                            null,
                                          )
                                        }
                                        className="rounded-md border border-[#2A2118] px-2.5 py-1.5 text-[9px] text-[#827B70]"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setRemoveMemberId(
                                          member.id,
                                        )
                                      }
                                      className="rounded-lg border border-[#2A2118] p-2 text-[#5F5A51] transition hover:border-[#704034] hover:text-[#C08A68]"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </>
                              )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </div>

          {/* TEAM CANVASES */}
          <div className="mb-10">
            <div className="mb-4 flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#71695D]">
                  WORKSPACE
                </p>

                <h2 className="mt-1 text-[17px] font-medium text-[#F0E6D2]">
                  Team canvases
                </h2>

                <p className="mt-1 text-xs text-[#71695D]">
                  Shared visual workspaces
                  for your team.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleOpenCreateTeamProject
                }
                disabled={
                  isCreatingTeamProject ||
                  !canCreateTeamProject
                }
                className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#A9854F] bg-[#A9854F] px-3.5 text-xs font-medium text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" />

                {isTeamCanvasLimitReached
                  ? "Limit reached"
                  : "Blank canvas"}
              </button>
            </div>

            {isTeamProjectsLoading ? (
              <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-12 text-center">
                <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#71695D]">
                  Loading canvases
                </p>
              </div>
            ) : teamProjects.length ===
              0 ? (
              <div className="rounded-xl border border-[#211C16] bg-[#101211] px-5 py-12 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A2118] bg-[#17130F]">
                  <Plus className="h-4 w-4 text-[#806C4B]" />
                </div>

                <p className="mt-4 text-sm text-[#827B70]">
                  No team canvases yet.
                </p>

                <p className="mt-1 text-xs text-[#5F5A51]">
                  Create a blank canvas to
                  start working together.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {teamProjects.map((project) => (
                  <TeamProjectCard
                    key={project.id}
                    project={project}
                    authorName={fullName}
                    isAdmin={isAdmin}
                    onOpenProject={handleOpenTeamProject}
                    onDeleteProject={handleDeleteTeamProject}
                  />
                ))}
              </div>
            )}
          </div>

          {/* TEAM FOOTER NOTE */}
          <div className="mb-4 rounded-xl border border-[#211C16] bg-[#101211] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#7E9A68]" />

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#806C4B]">
                  LIVING WORKSPACE
                </p>

                <p className="mt-1 text-xs leading-5 text-[#71695D]">
                  Ideas become clearer when
                  people can see the same
                  structure and build on it
                  together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE TEAM CANVAS DIALOG */}
      {isCreateCanvasDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]">
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#3A3023] bg-[#111312] p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={
                handleCloseCreateTeamProject
              }
              disabled={
                isCreatingTeamProject
              }
              className="absolute right-5 top-5 text-[#71695D] transition hover:text-[#B39A72] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A9854F]">
              NEW TEAM CANVAS
            </p>

            <h2 className="mt-3 font-serif text-2xl text-[#F0E6D2]">
              Start with a blank thread
            </h2>

            <p className="mt-2 text-sm text-[#827B70]">
              Give the workspace a name and
              start shaping your idea from
              scratch.
            </p>

            <div className="mt-7">
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#827B70]">
                Title
              </label>

              <input
                autoFocus
                value={canvasTitle}
                onChange={(event) =>
                  setCanvasTitle(
                    event.target.value,
                  )
                }
                placeholder="Untitled"
                disabled={
                  isCreatingTeamProject
                }
                className="h-11 w-full rounded-xl border border-[#4A3925] bg-[#0A0D0C] px-4 text-sm text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F] disabled:opacity-50"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#827B70]">
                Description

                <span className="normal-case tracking-normal text-[#5F5A51]">
                  Optional
                </span>
              </label>

              <textarea
                value={
                  canvasDescription
                }
                onChange={(event) =>
                  setCanvasDescription(
                    event.target.value,
                  )
                }
                placeholder="What is this project about?"
                rows={4}
                disabled={
                  isCreatingTeamProject
                }
                className="w-full resize-none rounded-xl border border-[#292D2A] bg-[#0A0D0C] px-4 py-3 text-sm leading-6 text-[#F0E6D2] outline-none transition placeholder:text-[#71695D] focus:border-[#A9854F] disabled:opacity-50"
              />
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#242822] pt-5">
              <button
                type="button"
                onClick={
                  handleCloseCreateTeamProject
                }
                disabled={
                  isCreatingTeamProject
                }
                className="px-3 py-2 text-sm text-[#827B70] transition hover:text-[#B39A72] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleCreateTeamProject
                }
                disabled={
                  isCreatingTeamProject ||
                  !canvasTitle.trim()
                }
                className="flex h-11 items-center gap-2 rounded-xl border border-[#6A512F] bg-[#1E1B15] px-5 text-sm font-medium text-[#D6C4A3] transition hover:border-[#A9854F] hover:bg-[#262117] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreatingTeamProject ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border border-[#A9854F]/30 border-t-[#D6C4A3]" />
                    Creating...
                  </>
                ) : (
                  "Create Canvas"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function getInitials(
  fullName: string | null,
  email: string,
) {
  const source =
    fullName?.trim() || email;

  if (!source) {
    return "U";
  }

  const parts = source
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return (
      parts[0]!.charAt(0) +
      parts[1]!.charAt(0)
    ).toUpperCase();
  }

  return source
    .slice(0, 2)
    .toUpperCase();
}

function formatRoleLabel(
  role: TeamRole,
) {
  if (role === "ADMIN") {
    return "Admin";
  }

  if (role === "EDITOR") {
    return "Editor";
  }

  return "Viewer";
}

function formatTeamDate(
  date: Date | string,
) {
  const value =
    new Date(date);

  if (
    Number.isNaN(
      value.getTime(),
    )
  ) {
    return "—";
  }

  return value.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}