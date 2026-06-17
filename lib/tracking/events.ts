/** Categorie evento per il data layer — foundation, non ancora collegate ai componenti. */
export type TrackingCategory =
  | "ecommerce"
  | "quiz"
  | "bce"
  | "lead"
  | "whatsapp";

/** Valori serializzabili nel payload dataLayer. */
export type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

export type TrackingPayload = Record<string, Serializable>;

/** Convenzioni naming per eventi futuri (prefisso categoria). */
export type EcommerceEventName = `ecommerce.${string}`;
export type QuizEventName = `quiz.${string}`;
export type BceEventName = `bce.${string}`;
export type LeadEventName = `lead.${string}`;
export type WhatsappEventName = `whatsapp.${string}`;

export type TrackingEventName =
  | EcommerceEventName
  | QuizEventName
  | BceEventName
  | LeadEventName
  | WhatsappEventName
  | "consent_update"
  | "quiz_personalizzati_complete"
  | "bce_complete"
  | "whatsapp_click"
  | "view_item"
  | "add_to_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase";

export type TrackEventInput = {
  event: TrackingEventName;
  category?: TrackingCategory;
  payload?: TrackingPayload;
};
