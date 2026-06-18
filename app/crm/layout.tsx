import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { CRM_COOKIE, isValidSessionValue } from "@/lib/crm/auth";

export const metadata: Metadata = {
  title: "CRM Team",
  robots: { index: false, follow: false },
};

export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authed = await isValidSessionValue(cookieStore.get(CRM_COOKIE)?.value);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-card/30">
        <div className="container mx-auto flex items-start justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Scaramuzzo
            </p>
            <h1 className="mt-1 text-lg font-semibold">CRM Team</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Dashboard operativa interna
            </p>
          </div>
          {authed && (
            <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap justify-end gap-2 text-sm">
                <Link
                  href="/crm"
                  className="rounded-full border border-border/50 px-4 py-2 font-medium transition hover:border-accent/50 hover:bg-background/40"
                >
                  Dashboard
                </Link>
                <Link
                  href="/crm/richieste"
                  className="rounded-full border border-border/50 px-4 py-2 font-medium transition hover:border-accent/50 hover:bg-background/40"
                >
                  Richieste
                </Link>
                <Link
                  href="/crm/ordini"
                  className="rounded-full border border-border/50 px-4 py-2 font-medium transition hover:border-accent/50 hover:bg-background/40"
                >
                  Ordini
                </Link>
              </nav>
              <form action="/api/crm/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:bg-background/40"
                >
                  Esci
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
