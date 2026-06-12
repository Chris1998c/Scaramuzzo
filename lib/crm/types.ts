export const CONSULTATION_TYPES = [
  "personalizzati",
  "botanical_color",
] as const;

export const CONSULTATION_SOURCES = [
  "quiz_routine",
  "quiz_custom",
  "whatsapp_direct",
  "botanical_experience",
] as const;

export const CONSULTATION_LANGUAGES = ["it", "en"] as const;

export const CONSULTATION_STATUSES = [
  "nuova",
  "in_lavorazione",
  "in_attesa_cliente",
  "completata",
  "archiviata",
] as const;

export const CONSULTATION_COMPLEXITIES = ["basso", "medio", "alto"] as const;

export type ConsultationType = (typeof CONSULTATION_TYPES)[number];
export type ConsultationSource = (typeof CONSULTATION_SOURCES)[number];
export type ConsultationLanguage = (typeof CONSULTATION_LANGUAGES)[number];
export type ConsultationStatus = (typeof CONSULTATION_STATUSES)[number];

export interface CreateConsultationInput {
  type: ConsultationType;
  source: ConsultationSource;
  language: ConsultationLanguage;
  payload: Record<string, unknown>;
  customerName?: string | null;
  customerPhone?: string | null;
}

export interface CreateConsultationResult {
  id: string;
  publicRef: string;
}
