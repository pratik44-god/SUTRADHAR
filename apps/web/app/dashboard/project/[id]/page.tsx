"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import BlankWorkspace from "~/components/editor/BlankWorkspace";
import { useIsUserLoggedIn } from "~/hooks/api/auth/index";
import {
  useGetProject,
  useUpdateProject,
} from "~/hooks/api/project/index";

export default function ProjectWorkspacePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { isUserLoggedIn } = useIsUserLoggedIn();
  const { project, isLoading: isProjectLoading } = useGetProject(id);
  const { updateProjectAsync } = useUpdateProject();

  const [title, setTitle] = useState("Untitled");

  const updateProjectRef = useRef(updateProjectAsync);
  const lastSavedTitleRef = useRef("Untitled");
  const loadedProjectIdRef = useRef<string | null>(null);

  useEffect(() => {
    updateProjectRef.current = updateProjectAsync;
  }, [updateProjectAsync]);

  useEffect(() => {
    if (isUserLoggedIn === false) {
      router.replace("/googlelogin");
    }
  }, [isUserLoggedIn, router]);

  useEffect(() => {
    if (!project || loadedProjectIdRef.current === id) {
      return;
    }

    const nextTitle = project.title?.trim() || "Untitled";

    loadedProjectIdRef.current = id;
    lastSavedTitleRef.current = nextTitle;
    setTitle(nextTitle);
  }, [id, project]);

  useEffect(() => {
    if (!id || !project || loadedProjectIdRef.current !== id) {
      return;
    }

    const normalizedTitle = title.trim() || "Untitled";

    if (normalizedTitle === lastSavedTitleRef.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void updateProjectRef
        .current({
          id,
          title: normalizedTitle,
          description: project.description ?? "",
        })
        .then(() => {
          lastSavedTitleRef.current = normalizedTitle;
        })
        .catch((error: unknown) => {
          console.error("Failed to save project title:", error);
        });
    }, 700);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [id, project, title]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (!isUserLoggedIn || isProjectLoading) {
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

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0D0A] text-[#D6C4A3]">
        <div className="text-center">
          <p className="font-serif text-xl text-[#F0E6D2]">
            Project not found
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-4 rounded-lg border border-[#2A2118] bg-[#17130F] px-4 py-2 text-[11px] text-[#B39A72] transition hover:border-[#A9854F]/40 hover:text-[#F0E6D2]"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <BlankWorkspace
      title={title}
      onTitleChange={setTitle}
      onBack={handleBack}
    />
  );
}
