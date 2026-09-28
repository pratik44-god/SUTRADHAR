"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CanvasSaveState = "saved" | "unsaved" | "saving" | "error";

type Options = {
  debounceMs?: number;
  maxRetries?: number;
  /** Called after each successful save, e.g. to refresh a query cache. */
  onSaved?: (canvasData: string) => void;
};

/**
 * Debounced, ordered, retrying autosave for <BlankWorkspace onCanvasChange={save} />.
 *
 * It does NOT know about tRPC, routes or the database. You pass `persist`,
 * a function that stores the canvas JSON using whatever mutation you already
 * have (for example `updateProjectAsync` from `useUpdateProject`).
 *
 *  - debounced: a burst of edits becomes one request
 *  - one request at a time, newest data wins (no out-of-order overwrites)
 *  - failed saves keep the data, retry with backoff, and can be retried
 *    manually with `flush()`
 *  - flushes on unmount / tab hide, and warns before leaving while unsaved
 *
 * Use one instance per project (mount it under a component keyed by project id).
 */
export function useCanvasAutosave(
  persist: (canvasData: string) => Promise<unknown>,
  { debounceMs = 800, maxRetries = 5, onSaved }: Options = {},
) {
  const persistRef = useRef(persist);
  const onSavedRef = useRef(onSaved);
  persistRef.current = persist;
  onSavedRef.current = onSaved;

  const pendingRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);
  const retryCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flushRef = useRef<() => Promise<void>>(async () => {});

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
          await persistRef.current(canvasData);
          onSavedRef.current?.(canvasData);
          retryCountRef.current = 0;
        } catch (error) {
          console.error("[useCanvasAutosave] save failed", error);

          // Keep the data for a retry, unless something newer arrived meanwhile.
          if (pendingRef.current === null) pendingRef.current = canvasData;

          setState("error");

          if (retryCountRef.current < maxRetries) {
            const delay = Math.min(30_000, 2_000 * 2 ** retryCountRef.current);
            retryCountRef.current += 1;
            timerRef.current = setTimeout(() => void flushRef.current(), delay);
          }
          return;
        }
      }

      setState("saved");
    } finally {
      inFlightRef.current = false;
    }
  }, [maxRetries]);

  flushRef.current = flush;

  /** Pass this to <BlankWorkspace onCanvasChange={save} />. */
  const save = useCallback(
    (canvasData: string) => {
      pendingRef.current = canvasData;
      retryCountRef.current = 0;
      setState((current) => (current === "saving" ? current : "unsaved"));

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => void flushRef.current(), debounceMs);
    },
    [debounceMs],
  );

  useEffect(() => {
    const flushNow = () => void flushRef.current();

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") flushNow();
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingRef.current !== null || inFlightRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("pagehide", flushNow);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", flushNow);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushNow();
    };
  }, []);

  return { save, flush, state };
}