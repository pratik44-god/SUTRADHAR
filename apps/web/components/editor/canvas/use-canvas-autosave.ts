"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { trpc } from "~/trpc/client";

export type CanvasSaveState = "saved" | "unsaved" | "saving" | "error";

const DEBOUNCE_MS = 800;

/**
 * Saves the canvas JSON produced by <BlankWorkspace onCanvasChange={save} />.
 *
 *  - debounced: a burst of edits becomes one request
 *  - one request at a time, newest data wins: two overlapping requests can
 *    arrive out of order and an older canvas would overwrite a newer one
 *  - failed saves keep the data and can be retried with `flush()`
 *  - keeps the react-query cache in sync, so reopening the project never
 *    shows an older copy
 *  - flushes on unmount and on tab close, and warns before leaving while
 *    something is unsaved
 */
export function useCanvasAutosave(projectId: string) {
  const utils = trpc.useUtils();
  const utilsRef = useRef(utils);
  utilsRef.current = utils;

  const pendingRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<CanvasSaveState>("saved");

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // A request is already running; it re-checks `pending` when it finishes.
    if (inFlightRef.current) return;

    inFlightRef.current = true;

    try {
      while (pendingRef.current !== null) {
        const canvasData = pendingRef.current;
        pendingRef.current = null;
        setState("saving");

        try {
          // The vanilla client keeps working even if this component unmounts
          // (for example when the user clicks Back right after an edit).
          await utilsRef.current.client.project.updateProject.mutate({
            id: projectId,
            canvasData,
          });

          utilsRef.current.project.getProjectById.setData(
            { id: projectId },
            (old) => (old ? { ...old, canvasData } : old),
          );
        } catch (error) {
          console.error("[useCanvasAutosave] save failed", error);

          // Keep the data for a retry, unless something newer arrived meanwhile.
          if (pendingRef.current === null) pendingRef.current = canvasData;

          setState("error");
          return;
        }
      }

      setState("saved");
    } finally {
      inFlightRef.current = false;
    }
  }, [projectId]);

  /** Pass this to <BlankWorkspace onCanvasChange={save} />. */
  const save = useCallback(
    (canvasData: string) => {
      pendingRef.current = canvasData;
      setState((current) => (current === "saving" ? current : "unsaved"));

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => void flush(), DEBOUNCE_MS);
    },
    [flush],
  );

  useEffect(() => {
    const handlePageHide = () => void flush();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingRef.current !== null || inFlightRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      void flush();
    };
  }, [flush]);

  return { save, flush, state };
}