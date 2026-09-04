import { trackEventOnce } from "./trackEventOnce";
import { trackEvent } from "./trackEvent";
import { withTrackingAttribution } from "./attribution";

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
  trackEventOnce(`track-quiz-complete-${input.fingerprint}`, "quiz_personalizzati_complete", withTrackingAttribution({
    category: "quiz",
    language: input.language,
    custom_only: input.customOnly,
    recommended_count: input.recommendedCount,
    source: input.customOnly ? "quiz_custom" : "quiz_routine",
    obiettivo: input.obiettivo,
    capello: input.capello,
    cute: input.cute,
  }));
}

export type AnticadutaBaseTrackingInput = {
  language: string;
  salonId: string;
};

function anticadutaBasePayload(input: AnticadutaBaseTrackingInput) {
  return withTrackingAttribution({
    category: "quiz",
    quiz_name: "anticaduta",
    page: "/test-anticaduta",
    language: input.language,
    salon_id: input.salonId,
  });
}

export function trackAnticadutaQuizView(
  input: AnticadutaBaseTrackingInput
): void {
  trackEventOnce(
    `track-anticaduta-view-${input.salonId}`,
    "anticaduta_quiz_view",
    anticadutaBasePayload(input)
  );
}

export function trackAnticadutaQuizStart(
  input: AnticadutaBaseTrackingInput
): void {
  trackEventOnce(
    `track-anticaduta-start-${input.salonId}`,
    "anticaduta_quiz_start",
    anticadutaBasePayload(input)
  );
}

export type AnticadutaStepTrackingInput = AnticadutaBaseTrackingInput & {
  stepNumber: number;
  stepId: string;
};

export function trackAnticadutaQuizStep(
  input: AnticadutaStepTrackingInput
): void {
  trackEventOnce(
    `track-anticaduta-step-${input.salonId}-${input.stepNumber}`,
    "anticaduta_quiz_step",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      step_number: input.stepNumber,
      step_id: input.stepId,
    })
  );
}

export type AnticadutaCompleteTrackingInput =
  AnticadutaBaseTrackingInput & {
    profileVariant: string;
    routineVariant: string;
  };

export function trackAnticadutaQuizComplete(
  input: AnticadutaCompleteTrackingInput
): void {
  trackEventOnce(
    `track-anticaduta-complete-${input.salonId}`,
    "anticaduta_quiz_complete",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      profile_variant: input.profileVariant,
      routine_variant: input.routineVariant,
    })
  );
}

export function trackAnticadutaOfferView(
  input: AnticadutaBaseTrackingInput
): void {
  trackEventOnce(
    `track-anticaduta-offer-view-${input.salonId}`,
    "anticaduta_offer_view",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      offer_id: "trattamento_scaramuzzo_gratuito_30_giorni",
    })
  );
}

export function trackAnticadutaOfferReveal(
  input: AnticadutaBaseTrackingInput
): void {
  trackEvent(
    "anticaduta_offer_reveal",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      offer_id: "trattamento_scaramuzzo_gratuito_30_giorni",
    })
  );
}

export function trackAnticadutaDiagnosiClick(
  input: AnticadutaBaseTrackingInput
): void {
  trackEvent(
    "anticaduta_diagnosi_click",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      destination: "/diagnosi-botanica",
    })
  );
}

export function trackAnticadutaMetodoClick(
  input: AnticadutaBaseTrackingInput
): void {
  trackEvent(
    "anticaduta_metodo_click",
    withTrackingAttribution({
      ...anticadutaBasePayload(input),
      destination: "/#metodo",
    })
  );
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

  trackEventOnce(`track-bce-complete-${input.fingerprint}`, "bce_complete", withTrackingAttribution(payload));
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

  trackEvent("whatsapp_click", withTrackingAttribution(payload));
}
