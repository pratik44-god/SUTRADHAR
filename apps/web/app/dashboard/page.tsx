// "use client";

// import { useEffect, useState } from "react";
// import {
//   useRouter,
//   useSearchParams,
// } from "next/navigation";

// import {
//   useIsUserLoggedIn,
//   useUser,
// } from "~/hooks/api/auth/index";

// import {
//   useCreateProject,
//   useDeleteProject,
//   useProjects,
// } from "~/hooks/api/project/index";

// import DashboardHeader from "~/components/dashboard/DashboardHeader";
// import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
// import DashboardMain from "~/components/dashboard/DashboardMain";
// import TeamMembers from "~/components/dashboard/TeamMembers";
// import TeamPage from "~/components/dashboard/TeamPage";

// export type DashboardSection =
//   | "home"
//   | "projects"
//   | "shared"
//   | "archive"
//   | "team";

// export default function DashboardPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [activeSection, setActiveSection] =
//     useState<DashboardSection>("home");

//   const {
//     isUserLoggedIn,
//     isLoading: isAuthLoading,
//   } = useIsUserLoggedIn();

//   const {
//     user,
//     isLoading: isUserLoading,
//   } = useUser();

//   const {
//     projects,
//     isLoading: isProjectsLoading,
//   } = useProjects();

//   const {
//     createProjectAsync,
//     status: createProjectStatus,
//   } = useCreateProject();

//   const {
//     deleteProjectAsync,
//     status: deleteProjectStatus,
//   } = useDeleteProject();

//   useEffect(() => {
//     if (
//       !isAuthLoading &&
//       !isUserLoggedIn
//     ) {
//       router.replace("/googlelogin");
//     }
//   }, [
//     isAuthLoading,
//     isUserLoggedIn,
//     router,
//   ]);

//   useEffect(() => {
//     const section =
//       searchParams.get("section");

//     if (
//       section === "home" ||
//       section === "projects" ||
//       section === "shared" ||
//       section === "archive" ||
//       section === "team"
//     ) {
//       setActiveSection(section);
//     }
//   }, [searchParams]);

//   if (
//     isAuthLoading ||
//     isUserLoading
//   ) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#090B0A]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-7 w-7 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

//           <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#827B70]">
//             Opening workspace
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!isUserLoggedIn) {
//     return null;
//   }

//   const projectList =
//     projects ?? [];

//   const fullName =
//     user?.fullName || "User";

//   const isCreating =
//     createProjectStatus ===
//     "pending";

//   const isDeleting =
//     deleteProjectStatus ===
//     "pending";

//   const handleSectionChange = (
//     section: DashboardSection,
//   ) => {
//     setActiveSection(section);

//     router.replace(
//       section === "home"
//         ? "/dashboard"
//         : `/dashboard?section=${section}`,
//     );
//   };

//   const handleCreateProject = async (
//     title: string,
//     description?: string,
//   ) => {
//     const finalTitle =
//       title.trim() || "Untitled";

//     const project =
//       await createProjectAsync({
//         title: finalTitle,
//         description:
//           description?.trim() ||
//           undefined,
//       });

//     if (project?.id) {
//       router.push(
//         `/dashboard/project/${project.id}`,
//       );
//     }
//   };

//   const handleOpenProject = (
//     id: string,
//   ) => {
//     router.push(
//       `/dashboard/project/${id}`,
//     );
//   };

//   const handleDeleteProject = async (
//     id: string,
//   ) => {
//     if (isDeleting) {
//       return;
//     }

//     await deleteProjectAsync({
//       id,
//     });
//   };

//   return (
//     <main className="min-h-screen bg-[#090B0A] text-[#E5DDCE]">
//       <DashboardHeader
//         fullName={fullName}
//         email={user?.email || ""}
//       />

//       <div className="grid min-h-[calc(100vh-70px)] grid-cols-[285px_minmax(0,1fr)_315px] bg-[#090B0A]">
//         <DashboardSidebar
//           activeSection={
//             activeSection
//           }
//           projectCount={
//             projectList.length
//           }
//           onSectionChange={
//             handleSectionChange
//           }
//         />

//         {activeSection === "team" ? (
//           <TeamPage
//             userId={user?.id}
//             fullName={fullName}
//           />
//         ) : (
//           <DashboardMain
//             activeSection={
//               activeSection
//             }
//             fullName={fullName}
//             projects={
//               projectList
//             }
//             isProjectsLoading={
//               isProjectsLoading
//             }
//             isCreating={
//               isCreating
//             }
//             onCreateProject={
//               handleCreateProject
//             }
//             onOpenProject={
//               handleOpenProject
//             }
//             onDeleteProject={
//               handleDeleteProject
//             }
//           />
//         )}

//         <TeamMembers />
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useIsUserLoggedIn,
  useUser,
} from "~/hooks/api/auth/index";

import {
  useCreateProject,
  useDeleteProject,
  useProjects,
} from "~/hooks/api/project/index";

import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardSidebar from "~/components/dashboard/DashboardSidebar";
import DashboardMain from "~/components/dashboard/DashboardMain";
import TeamMembers from "~/components/dashboard/TeamMembers";
import TeamPage from "~/components/dashboard/TeamPage";

export type DashboardSection =
  | "home"
  | "projects"
  | "shared"
  | "archive"
  | "team";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("home");

  const {
    isUserLoggedIn,
    isLoading: isAuthLoading,
  } = useIsUserLoggedIn();

  const {
    user,
    isLoading: isUserLoading,
  } = useUser();

  const {
    projects,
    isLoading: isProjectsLoading,
  } = useProjects();

  const {
    createProjectAsync,
    status: createProjectStatus,
  } = useCreateProject();

  const {
    deleteProjectAsync,
    status: deleteProjectStatus,
  } = useDeleteProject();

  useEffect(() => {
    if (
      !isAuthLoading &&
      !isUserLoggedIn
    ) {
      router.replace("/googlelogin");
    }
  }, [
    isAuthLoading,
    isUserLoggedIn,
    router,
  ]);

  useEffect(() => {
    const section =
      searchParams.get("section");

    if (
      section === "home" ||
      section === "projects" ||
      section === "shared" ||
      section === "archive" ||
      section === "team"
    ) {
      setActiveSection(section);
    }
  }, [searchParams]);

  if (
    isAuthLoading ||
    isUserLoading
  ) {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden bg-[#090B0A]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-7 w-7 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#C49A5A]" />

          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#827B70]">
            Opening workspace
          </p>
        </div>
      </div>
    );
  }

  if (!isUserLoggedIn) {
    return null;
  }

  const projectList =
    projects ?? [];

  const fullName =
    user?.fullName || "User";

  const isCreating =
    createProjectStatus ===
    "pending";

  const isDeleting =
    deleteProjectStatus ===
    "pending";

  const handleSectionChange = (
    section: DashboardSection,
  ) => {
    setActiveSection(section);

    router.replace(
      section === "home"
        ? "/dashboard"
        : `/dashboard?section=${section}`,
    );
  };

  const handleCreateProject = async (
    title: string,
    description?: string,
  ) => {
    const finalTitle =
      title.trim() || "Untitled";

    const project =
      await createProjectAsync({
        title: finalTitle,
        description:
          description?.trim() ||
          undefined,
      });

    if (project?.id) {
      router.push(
        `/dashboard/project/${project.id}`,
      );
    }
  };

  const handleOpenProject = (
    id: string,
  ) => {
    router.push(
      `/dashboard/project/${id}`,
    );
  };

  const handleDeleteProject = async (
    id: string,
  ) => {
    if (isDeleting) {
      return;
    }

    await deleteProjectAsync({
      id,
    });
  };

  return (
    <main className="h-screen overflow-hidden bg-[#090B0A] text-[#E5DDCE]">
      <DashboardHeader
        fullName={fullName}
        email={user?.email || ""}
      />

      <div className="grid h-[calc(100vh-70px)] min-h-0 grid-cols-[285px_minmax(0,1fr)_315px] overflow-hidden bg-[#090B0A]">
        <div className="min-h-0 overflow-hidden">
          <DashboardSidebar
            activeSection={
              activeSection
            }
            projectCount={
              projectList.length
            }
            onSectionChange={
              handleSectionChange
            }
          />
        </div>

        <div className="min-h-0 min-w-0 overflow-hidden">
          {activeSection === "team" ? (
            <TeamPage
              userId={user?.id}
              fullName={fullName}
            />
          ) : (
            <DashboardMain
              activeSection={
                activeSection
              }
              fullName={fullName}
              projects={
                projectList
              }
              isProjectsLoading={
                isProjectsLoading
              }
              isCreating={
                isCreating
              }
              onCreateProject={
                handleCreateProject
              }
              onOpenProject={
                handleOpenProject
              }
              onDeleteProject={
                handleDeleteProject
              }
            />
          )}
        </div>

        <div className="min-h-0 overflow-hidden">
          <TeamMembers />
        </div>
      </div>
    </main>
  );
}