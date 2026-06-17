export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

const TYPE_LABELS: Record<string, string> = {
  personalizzati: "Prodotti Personalizzati",
  botanical_color: "Botanical Color",
};

const SOURCE_LABELS: Record<string, string> = {
  quiz_routine: "Quiz routine",
  quiz_custom: "Quiz custom",
  whatsapp_direct: "WhatsApp diretto",
  botanical_experience: "Botanical Experience",
  crm_manual: "CRM — pagamento manuale",
  ecommerce: "E-commerce",
};

const STATUS_LABELS: Record<string, string> = {
  nuova: "Nuova",
  in_lavorazione: "In lavorazione",
  in_attesa_cliente: "In attesa cliente",
  completata: "Completata",
  archiviata: "Archiviata",
};

export function labelType(value: string): string {
  return TYPE_LABELS[value] ?? value;
}

export function labelSource(value: string): string {
  return SOURCE_LABELS[value] ?? value;
}

export function labelStatus(value: string): string {
  return STATUS_LABELS[value] ?? value;
}

export function labelComplexity(value: string): string {
  const map: Record<string, string> = {
    basso: "Basso",
    medio: "Medio",
    alto: "Alto",
  };
  return map[value] ?? value;
}

export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
