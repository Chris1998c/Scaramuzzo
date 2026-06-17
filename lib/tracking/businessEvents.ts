import { trackEventOnce } from "./trackEventOnce";
import { trackEvent } from "./trackEvent";

export type QuizCompleteTrackingInput = {
  fingerprint: string;
  language: string;
  customOnly: boolean;
  recommendedCount: number;
  obiettivo: string;
  capello: string;
  cute: string;
};

export function trackQuizPersonalizzatiComplete(
  input: QuizCompleteTrackingInput
): void {
  trackEventOnce(`track-quiz-complete-${input.fingerprint}`, "quiz_personalizzati_complete", {
    category: "quiz",
    language: input.language,
    custom_only: input.customOnly,
    recommended_count: input.recommendedCount,
    source: input.customOnly ? "quiz_custom" : "quiz_routine",
    obiettivo: input.obiettivo,
    capello: input.capello,
    cute: input.cute,
  });
}

export type BceCompleteTrackingInput = {
  fingerprint: string;
  language: string;
  complexity: string;
  strandTest: string;
  intento: string;
  base: string;
  bianchiPerc: string;
  incarnato?: string;
};

export function trackBceComplete(input: BceCompleteTrackingInput): void {
  const payload: Record<string, string> = {
    category: "bce",
    language: input.language,
    complexity: input.complexity,
    strand_test: input.strandTest,
    intento: input.intento,
    base: input.base,
    bianchiPerc: input.bianchiPerc,
  };

  if (input.incarnato) payload.incarnato = input.incarnato;

  trackEventOnce(`track-bce-complete-${input.fingerprint}`, "bce_complete", payload);
}

export type WhatsappClickLocation =
  | "quiz_result"
  | "custom_formula"
  | "bce_result";

export type WhatsappClickTrackingInput = {
  page: "/erbe" | "/diagnosi-botanica";
  location: WhatsappClickLocation;
  intent: string;
  publicRef?: string | null;
  customOnly?: boolean;
  complexity?: string;
};

export function trackWhatsappClick(input: WhatsappClickTrackingInput): void {
  const payload: Record<string, string | boolean> = {
    category: "whatsapp",
    page: input.page,
    location: input.location,
    intent: input.intent,
  };

  if (input.publicRef) payload.public_ref = input.publicRef;
  if (input.customOnly !== undefined) payload.custom_only = input.customOnly;
  if (input.complexity) payload.complexity = input.complexity;

  trackEvent("whatsapp_click", payload);
}
