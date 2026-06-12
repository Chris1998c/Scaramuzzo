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

export type ConsultationType = (typeof CONSULTATION_TYPES)[number];
export type ConsultationSource = (typeof CONSULTATION_SOURCES)[number];
export type ConsultationLanguage = (typeof CONSULTATION_LANGUAGES)[number];

export interface CreateConsultationInput {
  type: ConsultationType;
  source: ConsultationSource;
  language: ConsultationLanguage;
  payload: Record<string, unknown>;
}

export interface CreateConsultationResult {
  id: string;
  publicRef: string;
}
