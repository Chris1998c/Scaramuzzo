import { isCrmAuthConfigured } from "@/lib/crm/auth";

export default async function CrmLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const configured = isCrmAuthConfigured();

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Accesso CRM</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Area riservata. Inserisci la password per continuare.
        </p>

        {!configured && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            Configurazione mancante: impostare{" "}
            <code className="text-foreground">CRM_ACCESS_PASSWORD</code>.
          </div>
        )}

        {error === "1" && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            Password non corretta.
          </div>
        )}

        <form action="/api/crm/login" method="post" className="mt-6">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-border/50 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-accent/60"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
          >
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}
