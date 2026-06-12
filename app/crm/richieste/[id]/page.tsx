import Link from "next/link";
import { notFound } from "next/navigation";
import { hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import { getConsultationById } from "@/lib/crm/fetchConsultations";
import { listConsultationNotes } from "@/lib/crm/notes";
import {
  formatDateTime,
  isPlainObject,
  labelComplexity,
  labelSource,
  labelType,
} from "@/lib/crm/format";
import { StatusSelect } from "./StatusSelect";
import { NoteForm } from "./NoteForm";

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium sm:text-right">{value}</dd>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/40 bg-card/40 p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function KeyValueGrid({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data);
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }
  return (
    <dl className="space-y-2.5">
      {entries.map(([key, value]) => (
        <Field
          key={key}
          label={key}
          value={
            Array.isArray(value)
              ? value.join(", ")
              : isPlainObject(value)
                ? JSON.stringify(value)
                : String(value ?? "—")
          }
        />
      ))}
    </dl>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
  );
}

function StringList({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">—</p>;
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductList({ products }: { products: unknown[] }) {
  if (products.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }
  return (
    <div className="space-y-3">
      {products.map((item, i) => {
        if (!isPlainObject(item)) return null;
        const name =
          typeof item.productName === "string"
            ? item.productName
            : typeof item.name === "string"
              ? item.name
              : `Prodotto ${i + 1}`;
        const kind = typeof item.kind === "string" ? item.kind : null;
        const price = typeof item.price === "number" ? item.price : null;
        return (
          <div
            key={i}
            className="rounded-xl border border-border/40 bg-background/30 px-4 py-3"
          >
            <p className="font-medium">{name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {[kind, price != null ? `€ ${price.toFixed(2)}` : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default async function CrmRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!hasSupabaseAdminCredentials()) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
        Configurazione server incompleta: manca{" "}
        <code className="text-foreground">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }

  let row: Awaited<ReturnType<typeof getConsultationById>> = null;
  try {
    row = await getConsultationById(id);
  } catch {
    notFound();
  }

  if (!row) notFound();

  let internalNotes: Awaited<ReturnType<typeof listConsultationNotes>> = [];
  let notesError: string | null = null;
  try {
    internalNotes = await listConsultationNotes(row.id);
  } catch (err) {
    notesError =
      err instanceof Error ? err.message : "Errore nel caricamento note.";
  }

  const payload = isPlainObject(row.payload) ? row.payload : {};
  const answers = isPlainObject(payload.answers) ? payload.answers : null;
  const complexity =
    typeof payload.complexity === "string" ? payload.complexity : null;
  const assessment =
    typeof payload.assessment === "string" ? payload.assessment : null;
  const customReason =
    typeof payload.customReason === "string" ? payload.customReason : null;
  const strandTest =
    typeof payload.strandTest === "string" ? payload.strandTest : null;
  const customProductLabel =
    typeof payload.customProductLabel === "string"
      ? payload.customProductLabel
      : null;
  const notes = Array.isArray(payload.notes)
    ? payload.notes.filter((n): n is string => typeof n === "string")
    : [];
  const recommendedProducts = Array.isArray(payload.recommendedProducts)
    ? payload.recommendedProducts
    : [];
  const customFormula = isPlainObject(payload.customFormula)
    ? payload.customFormula
    : null;
  const customOnly = payload.customOnly === true;

  return (
    <div>
      <Link
        href="/crm"
        className="text-sm font-medium text-accent hover:underline"
      >
        ← Torna alla lista
      </Link>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {labelType(row.type)}
          </p>
          <h2 className="mt-1 text-2xl font-semibold">{row.public_ref}</h2>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Stato pratica
          </span>
          <StatusSelect id={row.id} current={row.status} />
        </div>
      </div>

      <Section title="Cliente">
        <dl className="space-y-2.5">
          <Field label="Nome" value={row.customer_name ?? "—"} />
          <Field label="WhatsApp" value={row.customer_phone ?? "—"} />
          <Field
            label="Fascia età"
            value={
              typeof payload.ageRange === "string" && payload.ageRange
                ? payload.ageRange
                : "—"
            }
          />
        </dl>
      </Section>

      <div className="mt-6">
        <Section title="Informazioni richiesta">
          <dl className="space-y-2.5">
            <Field label="Tipo" value={labelType(row.type)} />
            <Field label="Source" value={labelSource(row.source)} />
          <Field label="Lingua" value={row.language.toUpperCase()} />
          <Field label="Creata il" value={formatDateTime(row.created_at)} />
          <Field
            label="WhatsApp cliccato"
            value={row.whatsapp_clicked ? "Sì" : "No"}
          />
          {complexity && (
            <Field
              label="Complessità"
              value={labelComplexity(complexity)}
            />
          )}
          {strandTest && <Field label="Prova ciocca" value={strandTest} />}
          {customOnly && (
            <Field label="Solo personalizzato" value="Sì" />
          )}
          {customProductLabel && (
            <Field label="Label prodotto" value={customProductLabel} />
          )}
          </dl>
        </Section>
      </div>

      <div className="mt-6 space-y-6">
        {answers && (
          <Section title="Risposte profilo">
            <KeyValueGrid data={answers} />
          </Section>
        )}

        {assessment && (
          <Section title="Valutazione preliminare">
            <TextBlock text={assessment} />
          </Section>
        )}

        {notes.length > 0 && (
          <Section title="Note professionali">
            <StringList items={notes} />
          </Section>
        )}

        {customReason && (
          <Section title="Motivo personalizzazione">
            <TextBlock text={customReason} />
          </Section>
        )}

        {recommendedProducts.length > 0 && (
          <Section title="Prodotti consigliati">
            <ProductList products={recommendedProducts} />
          </Section>
        )}

        {customFormula && (
          <Section title="Formula personalizzata (descrittiva)">
            <KeyValueGrid data={customFormula} />
          </Section>
        )}

        <Section title="Note interne">
          <NoteForm id={row.id} />

          {notesError && (
            <p className="mt-4 text-sm text-red-400">{notesError}</p>
          )}

          {internalNotes.length === 0 && !notesError ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Nessuna nota interna.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {internalNotes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-xl border border-border/40 bg-background/30 px-4 py-3"
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                    {note.body}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {note.author} · {formatDateTime(note.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}
