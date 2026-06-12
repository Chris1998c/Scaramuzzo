"use client";

import { useRef, useState, useTransition } from "react";
import { addNoteAction } from "./actions";

export function NoteForm({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    const body = String(formData.get("body") ?? "").trim();
    if (body.length === 0) {
      setError("Scrivi una nota prima di aggiungere.");
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        await addNoteAction(id, formData);
        formRef.current?.reset();
      } catch {
        setError("Salvataggio non riuscito.");
      }
    });
  }

  return (
    <form ref={formRef} action={onSubmit} className="space-y-3">
      <textarea
        name="body"
        rows={3}
        placeholder="Scrivi una nota interna…"
        className="w-full resize-y rounded-xl border border-border/50 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-accent/60"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Aggiunta…" : "Aggiungi nota"}
        </button>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    </form>
  );
}
