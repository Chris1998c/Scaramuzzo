"use client";

import { useState, useTransition } from "react";
import { CONSULTATION_STATUSES } from "@/lib/crm/types";
import { labelStatus } from "@/lib/crm/format";
import { updateStatusAction } from "./actions";

export function StatusSelect({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const [value, setValue] = useState(current);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onChange(next: string) {
    const previous = value;
    setValue(next);
    setError(null);
    startTransition(async () => {
      try {
        await updateStatusAction(id, next);
      } catch {
        setValue(previous);
        setError("Aggiornamento non riuscito.");
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <select
        value={value}
        disabled={isPending}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-border/50 bg-background/60 px-3 py-1.5 text-sm font-medium outline-none transition focus:border-accent/60 disabled:opacity-60"
        aria-label="Stato pratica"
      >
        {CONSULTATION_STATUSES.map((status) => (
          <option key={status} value={status}>
            {labelStatus(status)}
          </option>
        ))}
      </select>
      {isPending && (
        <span className="text-xs text-muted-foreground">Salvataggio…</span>
      )}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
