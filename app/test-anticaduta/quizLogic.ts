export type ObservationAnswer = "sudden" | "progressive" | "fragile";
export type ScalpAnswer = "frequent_oily" | "dry" | "balanced_tense";
export type DailyFactor =
  | "stress_sleep"
  | "tight_headwear"
  | "irregular_diet"
  | "styling_heat";

export type AnticadutaAnswers = {
  observation?: ObservationAnswer;
  scalp?: ScalpAnswer;
  dailyFactors: DailyFactor[];
};

export type ProfileVariant =
  | "routine_continuity"
  | "scalp_consistency"
  | "scalp_and_lengths";

export type RoutineVariant =
  | "frequent_washing"
  | "gentle_comfort"
  | "regular_balance";

export type AnticadutaResult = {
  profileVariant: ProfileVariant;
  routineVariant: RoutineVariant;
  dailyFactors: DailyFactor[];
};

export const SALON_IDS = [
  "roma",
  "cosenza",
  "corigliano_rossano",
  "castrovillari",
] as const;

export type SalonId = (typeof SALON_IDS)[number];

export function isSalonId(value: string | undefined): value is SalonId {
  return Boolean(value && SALON_IDS.includes(value as SalonId));
}

export function buildAnticadutaResult(
  answers: AnticadutaAnswers
): AnticadutaResult | null {
  if (!answers.observation || !answers.scalp) return null;

  const profileByObservation: Record<ObservationAnswer, ProfileVariant> = {
    sudden: "routine_continuity",
    progressive: "scalp_consistency",
    fragile: "scalp_and_lengths",
  };

  const routineByScalp: Record<ScalpAnswer, RoutineVariant> = {
    frequent_oily: "frequent_washing",
    dry: "gentle_comfort",
    balanced_tense: "regular_balance",
  };

  return {
    profileVariant: profileByObservation[answers.observation],
    routineVariant: routineByScalp[answers.scalp],
    dailyFactors: [...answers.dailyFactors],
  };
}
