// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import BlankWorkspace from "~/components/editor/BlankWorkspace";
// import { parseCanvasData } from "~/components/editor/canvas/parse-canvas";
// import { useCanvasAutosave } from "~/components/editor/canvas/use-canvas-autosave";
// import { useIsUserLoggedIn } from "~/hooks/api/auth/index";
// import {
//   useGetProject,
//   useUpdateProject,
//   useUpdateProjectStatus,
// } from "~/hooks/api/project/index";

// type Project = NonNullable<ReturnType<typeof useGetProject>["project"]>;

// function WorkspaceWithCanvas({
//   project,
//   title,
//   onTitleChange,
//   onBack,
//   onArchive,
// }: {
//   project: Project;
//   title: string;
//   onTitleChange: (title: string) => void;
//   onBack: () => void;
//   onArchive: () => void;
// }) {
//   const { updateProjectAsync } = useUpdateProject();

//   const persistCanvas = useCallback(
//     (canvasData: string) =>
//       updateProjectAsync({
//         id: project.id,
//         canvasData,
//       }),
//     [updateProjectAsync, project.id],
//   );

//   const { save, flush, state } = useCanvasAutosave(persistCanvas);

//   const initial = useMemo(
//     () => parseCanvasData(project.canvasData),
//     [project.canvasData],
//   );

//   return (
//     <BlankWorkspace
//       key={project.id}
//       title={title}
//       onTitleChange={onTitleChange}
//       onBack={onBack}
//       onArchive={onArchive}
//       initialShapes={initial.shapes}
//       initialViewport={initial.viewport}
//       onCanvasChange={save}
//       onFlush={flush}
//       saveStatus={state}
//     />
//   );
// }

// export default function ProjectWorkspacePage() {
//   const router = useRouter();
//   const params = useParams<{ id: string }>();
//   const id = params.id;

//   const {
//     isUserLoggedIn,
//     isLoading: isAuthLoading,
//   } = useIsUserLoggedIn();

//   const {
//     project,
//     isLoading: isProjectLoading,
//     refetch,
//   } = useGetProject(id);

//   const { updateProjectAsync } = useUpdateProject();

//   const { updateProjectStatusAsync } = useUpdateProjectStatus();

//   const [title, setTitle] = useState("Untitled");

//   const updateProjectRef = useRef(updateProjectAsync);
//   const lastSavedTitleRef = useRef("Untitled");
//   const loadedProjectIdRef = useRef<string | null>(null);

//   const description = project?.description ?? "";

//   useEffect(() => {
//     void refetch?.();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   useEffect(() => {
//     updateProjectRef.current = updateProjectAsync;
//   }, [updateProjectAsync]);

//   useEffect(() => {
//     if (!isAuthLoading && isUserLoggedIn === false) {
//       router.replace("/googlelogin");
//     }
//   }, [isAuthLoading, isUserLoggedIn, router]);

//   useEffect(() => {
//     if (!project || loadedProjectIdRef.current === id) {
//       return;
//     }

//     const nextTitle = project.title?.trim() || "Untitled";

//     loadedProjectIdRef.current = id;
//     lastSavedTitleRef.current = nextTitle;
//     setTitle(nextTitle);
//   }, [id, project]);

//   const hasProject = Boolean(project);

//   useEffect(() => {
//     if (!id || !hasProject || loadedProjectIdRef.current !== id) {
//       return;
//     }

//     const normalizedTitle = title.trim() || "Untitled";

//     if (normalizedTitle === lastSavedTitleRef.current) {
//       return;
//     }

//     const timeout = window.setTimeout(() => {
//       void updateProjectRef
//         .current({
//           id,
//           title: normalizedTitle,
//           description,
//         })
//         .then(() => {
//           lastSavedTitleRef.current = normalizedTitle;
//         })
//         .catch((error: unknown) => {
//           console.error("Failed to save project title:", error);
//         });
//     }, 700);

//     return () => {
//       window.clearTimeout(timeout);
//     };
//   }, [id, hasProject, description, title]);

//   const handleBack = () => {
//     router.push("/dashboard");
//   };

//   const handleArchive = async () => {
//     if (!id) {
//       return;
//     }

//     try {
//       await updateProjectStatusAsync({
//         id,
//         status: "ARCHIVED",
//       });

//       router.push("/dashboard?section=archive");
//     } catch (error) {
//       console.error("Failed to archive project:", error);
//     }
//   };

//   if (isAuthLoading || isProjectLoading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#0F0D0A] text-[#D6C4A3]">
//         <div className="text-center">
//           <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#A9854F]" />

//           <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#655A4E]">
//             Opening file
//           </p>
//         </div>
//       </main>
//     );
//   }

//   if (isUserLoggedIn === false) {
//     return null;
//   }

//   if (!project) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#0F0D0A] text-[#D6C4A3]">
//         <div className="text-center">
//           <p className="font-serif text-xl text-[#F0E6D2]">
//             Project not found
//           </p>

//           <button
//             type="button"
//             onClick={handleBack}
//             className="mt-4 rounded-lg border border-[#2A2118] bg-[#17130F] px-4 py-2 text-[11px] text-[#B39A72] transition hover:border-[#A9854F]/40 hover:text-[#F0E6D2]"
//           >
//             Back to dashboard
//           </button>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <WorkspaceWithCanvas
//       project={project}
//       title={title}
//       onTitleChange={setTitle}
//       onBack={handleBack}
//       onArchive={handleArchive}
//     />
//   );
// }

"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import BlankWorkspace from "~/components/editor/BlankWorkspace";
import ShareDialog from "~/components/editor/ShareDialog";

import { parseCanvasData } from "~/components/editor/canvas/parse-canvas";
import { useCanvasAutosave } from "~/components/editor/canvas/use-canvas-autosave";

import {
  useIsUserLoggedIn,
} from "~/hooks/api/auth/index";

import {
  useGetProject,
  useUpdateProject,
  useUpdateProjectStatus,
} from "~/hooks/api/project/index";

import {
  useCreateShareLink,
} from "~/hooks/api/shareLink/index";

type Project = NonNullable<
  ReturnType<
    typeof useGetProject
  >["project"]
>;

function WorkspaceWithCanvas({
  project,
  title,
  onTitleChange,
  onBack,
  onArchive,
  onShare,
}: {
  project: Project;
  title: string;
  onTitleChange: (
    title: string,
  ) => void;
  onBack: () => void;
  onArchive: () => void;
  onShare: () => void;
}) {
  const {
    updateProjectAsync,
  } = useUpdateProject();

  const persistCanvas =
    useCallback(
      (canvasData: string) =>
        updateProjectAsync({
          id: project.id,
          canvasData,
        }),
      [
        updateProjectAsync,
        project.id,
      ],
    );

  const {
    save,
    flush,
    state,
  } = useCanvasAutosave(
    persistCanvas,
  );

  const initial = useMemo(
    () =>
      parseCanvasData(
        project.canvasData,
      ),
    [
      project.canvasData,
    ],
  );

  return (
    <BlankWorkspace
      key={project.id}
      title={title}
      onTitleChange={
        onTitleChange
      }
      onBack={onBack}
      onArchive={onArchive}
      onShare={onShare}
      initialShapes={
        initial.shapes
      }
      initialViewport={
        initial.viewport
      }
      onCanvasChange={save}
      onFlush={flush}
      saveStatus={state}
    />
  );
}

export default function ProjectWorkspacePage() {
  const router = useRouter();

  const params =
    useParams<{ id: string }>();

  const id = params.id;

  const {
    isUserLoggedIn,
    isLoading: isAuthLoading,
  } = useIsUserLoggedIn();

  const {
    project,
    isLoading:
      isProjectLoading,
    refetch,
  } = useGetProject(id);

  const {
    updateProjectAsync,
  } = useUpdateProject();

  const {
    updateProjectStatusAsync,
  } =
    useUpdateProjectStatus();

  const {
    createShareLinkAsync,
    isPending:
      isCreatingShareLink,
  } = useCreateShareLink();

  const [title, setTitle] =
    useState("Untitled");

  const [shareUrl, setShareUrl] =
    useState<string | null>(
      null,
    );

  const updateProjectRef =
    useRef(
      updateProjectAsync,
    );

  const lastSavedTitleRef =
    useRef("Untitled");

  const loadedProjectIdRef =
    useRef<string | null>(
      null,
    );

  const description =
    project?.description ?? "";

  useEffect(() => {
    void refetch?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    updateProjectRef.current =
      updateProjectAsync;
  }, [updateProjectAsync]);

  useEffect(() => {
    if (
      !isAuthLoading &&
      isUserLoggedIn === false
    ) {
      router.replace(
        "/googlelogin",
      );
    }
  }, [
    isAuthLoading,
    isUserLoggedIn,
    router,
  ]);

  useEffect(() => {
    if (
      !project ||
      loadedProjectIdRef.current ===
        id
    ) {
      return;
    }

    const nextTitle =
      project.title?.trim() ||
      "Untitled";

    loadedProjectIdRef.current =
      id;

    lastSavedTitleRef.current =
      nextTitle;

    setTitle(nextTitle);
  }, [
    id,
    project,
  ]);

  const hasProject =
    Boolean(project);

  useEffect(() => {
    if (
      !id ||
      !hasProject ||
      loadedProjectIdRef.current !==
        id
    ) {
      return;
    }

    const normalizedTitle =
      title.trim() ||
      "Untitled";

    if (
      normalizedTitle ===
      lastSavedTitleRef.current
    ) {
      return;
    }

    const timeout =
      window.setTimeout(() => {
        void updateProjectRef
          .current({
            id,
            title: normalizedTitle,
            description,
          })
          .then(() => {
            lastSavedTitleRef.current =
              normalizedTitle;
          })
          .catch(
            (error: unknown) => {
              console.error(
                "Failed to save project title:",
                error,
              );
            },
          );
      }, 700);

    return () => {
      window.clearTimeout(
        timeout,
      );
    };
  }, [
    id,
    hasProject,
    description,
    title,
  ]);

  const handleBack = () => {
    router.push(
      "/dashboard",
    );
  };

  const handleArchive =
    async () => {
      if (!id) {
        return;
      }

      try {
        await updateProjectStatusAsync(
          {
            id,
            status: "ARCHIVED",
          },
        );

        router.push(
          "/dashboard?section=archive",
        );
      } catch (error) {
        console.error(
          "Failed to archive project:",
          error,
        );
      }
    };

  const handleShare =
    async () => {
      if (
        !id ||
        isCreatingShareLink
      ) {
        return;
      }

      try {
        const result =
          await createShareLinkAsync(
            {
              projectsId: id,
            },
          );

        const token = result?.shareToken;

        if (!token) {
          console.error(
            "Share link token was not returned.",
          );

          return;
        }

        const url =
          `${window.location.origin}/share/${token}`;

        setShareUrl(url);
      } catch (error) {
        console.error(
          "Failed to create share link:",
          error,
        );
      }
    };

  const handleCloseShare =
    () => {
      setShareUrl(null);
    };

  if (
    isAuthLoading ||
    isProjectLoading
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0D0A] text-[#D6C4A3]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#A9854F]/20 border-t-[#A9854F]" />

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#655A4E]">
            Opening file
          </p>
        </div>
      </main>
    );
  }

  if (
    isUserLoggedIn === false
  ) {
    return null;
  }

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0D0A] text-[#D6C4A3]">
        <div className="text-center">
          <p className="font-serif text-xl text-[#F0E6D2]">
            Project not found
          </p>

          <button
            type="button"
            onClick={
              handleBack
            }
            className="mt-4 rounded-lg border border-[#2A2118] bg-[#17130F] px-4 py-2 text-[11px] text-[#B39A72] transition hover:border-[#A9854F]/40 hover:text-[#F0E6D2]"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <WorkspaceWithCanvas
        project={project}
        title={title}
        onTitleChange={
          setTitle
        }
        onBack={handleBack}
        onArchive={
          handleArchive
        }
        onShare={
          handleShare
        }
      />

      {shareUrl ? (
        <ShareDialog
          shareUrl={shareUrl}
          onClose={
            handleCloseShare
          }
        />
      ) : null}
    </>
  );
}