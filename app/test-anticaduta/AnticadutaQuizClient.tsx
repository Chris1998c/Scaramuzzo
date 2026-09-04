"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useLanguage } from "@/app/components/site/LanguageProvider";
import {
  captureAttributionFromUrl,
  getAttributionForPayload,
  trackAnticadutaDiagnosiClick,
  trackAnticadutaMetodoClick,
  trackAnticadutaOfferReveal,
  trackAnticadutaOfferView,
  trackAnticadutaQuizComplete,
  trackAnticadutaQuizStart,
  trackAnticadutaQuizStep,
  trackAnticadutaQuizView,
} from "@/lib/tracking";
import {
  buildAnticadutaResult,
  isSalonId,
  type AnticadutaAnswers,
  type DailyFactor,
  type ObservationAnswer,
  type ProfileVariant,
  type RoutineVariant,
  type SalonId,
  type ScalpAnswer,
} from "./quizLogic";

type Language = "it" | "en";
type SalonTrackingId = SalonId | "unknown";

const INITIAL_ANSWERS: AnticadutaAnswers = {
  dailyFactors: [],
};

const STEP_IDS = ["question_1", "question_2", "question_3"] as const;

const copy = {
  it: {
    eyebrow: "Routine Scaramuzzo",
    title: "Scopri la routine più adatta ai tuoi capelli",
    subtitle:
      "Rispondi a 3 semplici domande. Al termine riceverai una routine personalizzata e un trattamento Scaramuzzo gratuito in salone.",
    start: "Inizia il test",
    cosmeticNote: "Indicazioni cosmetiche, non una diagnosi medica.",
    productAlt: "Lozione Anticaduta Scaramuzzo",
    step: "Domanda",
    of: "di",
    continue: "Continua",
    back: "Indietro",
    questions: [
      {
        title: "Cosa noti principalmente quando perdi i capelli?",
        options: [
          {
            id: "sudden",
            label:
              "Una caduta improvvisa e abbondante, per esempio in periodi di stress o cambio stagione.",
          },
          {
            id: "progressive",
            label: "Un diradamento lento e progressivo nel tempo.",
          },
          {
            id: "fragile",
            label:
              "Capelli che si spezzano facilmente e sembrano progressivamente più fragili.",
          },
        ],
      },
      {
        title:
          "Ogni quanto lavi i capelli e come senti la cute dopo il lavaggio?",
        options: [
          {
            id: "frequent_oily",
            label:
              "Ogni giorno o a giorni alterni perché si ingrassano rapidamente.",
          },
          {
            id: "dry",
            label:
              "1-2 volte a settimana e la cute tende a essere secca o a tirare.",
          },
          {
            id: "balanced_tense",
            label:
              "Ho una frequenza di lavaggio regolare, ma a volte sento la cute rigida o tesa.",
          },
        ],
      },
      {
        title: "Quali di questi fattori fanno parte della tua quotidianità?",
        help:
          "Puoi selezionare più opzioni oppure continuare senza selezionare.",
        options: [
          {
            id: "stress_sleep",
            label: "Periodi di forte stress o poche ore di sonno.",
          },
          {
            id: "tight_headwear",
            label: "Uso frequente di cappelli, caschi o legature strette.",
          },
          {
            id: "irregular_diet",
            label: "Alimentazione irregolare.",
          },
          {
            id: "styling_heat",
            label:
              "Uso frequente di gel, lacche o strumenti ad alte temperature.",
          },
        ],
      },
    ],
    profileKicker: "Il tuo profilo",
    profileNames: {
      routine_continuity: "Rituale di continuità",
      scalp_consistency: "Cura costante della cute",
      scalp_and_lengths: "Equilibrio tra cute e lunghezze",
    } satisfies Record<ProfileVariant, string>,
    profileDescriptions: {
      routine_continuity:
        "Dalle tue risposte emerge il bisogno di una routine cosmetica essenziale e costante, facile da mantenere nella quotidianità.",
      scalp_consistency:
        "Dalle tue risposte emerge l’importanza di dedicare alla cute una cura cosmetica regolare, con gesti semplici e senza sovraccaricare la routine.",
      scalp_and_lengths:
        "Dalle tue risposte emerge l’esigenza di affiancare alla cura della cute un’attenzione specifica alle lunghezze, che percepisci più fragili.",
    } satisfies Record<ProfileVariant, string>,
    routineTitle: "La tua routine consigliata",
    usageTitle: "Lozione Anticaduta",
    officialUsage:
      "Applica alcune gocce sulla cute pulita e tamponata, 2–3 volte a settimana. Non risciacquare.",
    routineAdvice: {
      frequent_washing:
        "Con lavaggi frequenti, mantieni la detersione semplice e delicata.",
      gentle_comfort:
        "Durante lavaggio e asciugatura, tratta la cute con gesti delicati.",
      regular_balance:
        "Mantieni una frequenza regolare e osserva il comfort della cute dopo il lavaggio.",
    } satisfies Record<RoutineVariant, string>,
    complementaryTitle: "Consigli complementari",
    factorTips: {
      stress_sleep:
        "Rendi la routine facile da mantenere anche nei periodi più intensi.",
      tight_headwear:
        "Quando possibile, preferisci legature morbide e limita la tensione sui capelli.",
      irregular_diet:
        "Per dubbi legati all’alimentazione, chiedi consiglio a un professionista qualificato.",
      styling_heat:
        "Limita le temperature elevate e tratta le lunghezze con delicatezza.",
    } satisfies Record<DailyFactor, string>,
    offerLabel: "Il tuo trattamento Scaramuzzo",
    offerText:
      "Il tuo profilo è completo. In base alle tue risposte, Scaramuzzo ti riserva un trattamento specifico per la tua tipologia di capello, che il nostro operatore selezionerà per te in salone.",
    offerHighlight:
      "Il trattamento è gratuito e puoi effettuarlo entro 30 giorni.",
    offerInstruction:
      "Mostra questa schermata al tuo operatore Scaramuzzo.",
    showOperator: "Mostra all’operatore",
    close: "Chiudi",
    disclaimer:
      "Questo risultato offre indicazioni cosmetiche e non costituisce una diagnosi medica. In caso di caduta improvvisa, persistente o associata ad altri sintomi, rivolgiti a un professionista sanitario.",
    exploreKicker: "Continua il tuo percorso",
    exploreTitle: "Vuoi conoscere meglio i tuoi capelli?",
    diagnosis: "Fai la Diagnosi Botanica completa",
    method: "Scopri il Metodo Scaramuzzo",
    restart: "Ricomincia",
  },
  en: {
    eyebrow: "Scaramuzzo Routine",
    title: "Discover the routine best suited to your hair",
    subtitle:
      "Answer 3 simple questions. At the end, you will receive a personalized routine and a complimentary Scaramuzzo salon treatment.",
    start: "Start the test",
    cosmeticNote: "Cosmetic guidance, not a medical diagnosis.",
    productAlt: "Scaramuzzo Anti-Hair Loss Lotion",
    step: "Question",
    of: "of",
    continue: "Continue",
    back: "Back",
    questions: [
      {
        title: "What do you mainly notice when you lose hair?",
        options: [
          {
            id: "sudden",
            label:
              "Sudden, abundant shedding, for example during stressful periods or seasonal changes.",
          },
          {
            id: "progressive",
            label: "Slow and progressive thinning over time.",
          },
          {
            id: "fragile",
            label:
              "Hair that breaks easily and seems progressively more fragile.",
          },
        ],
      },
      {
        title: "How often do you wash your hair and how does your scalp feel?",
        options: [
          {
            id: "frequent_oily",
            label: "Daily or every other day because it becomes oily quickly.",
          },
          {
            id: "dry",
            label: "Once or twice a week, and my scalp tends to feel dry or tight.",
          },
          {
            id: "balanced_tense",
            label:
              "I wash it regularly, but sometimes my scalp feels stiff or tight.",
          },
        ],
      },
      {
        title: "Which of these factors are part of your daily life?",
        help: "Select more than one, or continue without selecting any.",
        options: [
          {
            id: "stress_sleep",
            label: "Periods of high stress or too little sleep.",
          },
          {
            id: "tight_headwear",
            label: "Frequent use of hats, helmets or tight hairstyles.",
          },
          {
            id: "irregular_diet",
            label: "Irregular diet.",
          },
          {
            id: "styling_heat",
            label: "Frequent use of styling products or high-heat tools.",
          },
        ],
      },
    ],
    profileKicker: "Your profile",
    profileNames: {
      routine_continuity: "A consistent ritual",
      scalp_consistency: "Consistent scalp care",
      scalp_and_lengths: "Balance between scalp and lengths",
    } satisfies Record<ProfileVariant, string>,
    profileDescriptions: {
      routine_continuity:
        "Your answers suggest the need for a simple, consistent cosmetic routine that is easy to maintain every day.",
      scalp_consistency:
        "Your answers highlight the importance of regular cosmetic scalp care, with simple steps that do not overload your routine.",
      scalp_and_lengths:
        "Your answers suggest pairing scalp care with specific attention to the lengths, which you perceive as more fragile.",
    } satisfies Record<ProfileVariant, string>,
    routineTitle: "Your recommended routine",
    usageTitle: "Anti-Hair Loss Lotion",
    officialUsage:
      "Apply a few drops to clean, towel-dried scalp 2–3 times a week. Do not rinse.",
    routineAdvice: {
      frequent_washing:
        "With frequent washing, keep cleansing simple and gentle.",
      gentle_comfort:
        "Treat your scalp gently during washing and drying.",
      regular_balance:
        "Keep a regular washing frequency and observe how comfortable your scalp feels afterwards.",
    } satisfies Record<RoutineVariant, string>,
    complementaryTitle: "Complementary tips",
    factorTips: {
      stress_sleep:
        "Keep your routine easy to maintain even during demanding periods.",
      tight_headwear:
        "When possible, choose softer hairstyles and limit tension on the hair.",
      irregular_diet:
        "For questions about nutrition, seek advice from a qualified professional.",
      styling_heat:
        "Limit high temperatures and treat your lengths gently.",
    } satisfies Record<DailyFactor, string>,
    offerLabel: "Your Scaramuzzo treatment",
    offerText:
      "Your profile is complete. Based on your answers, Scaramuzzo reserves a treatment specific to your hair type, which our operator will select for you in the salon.",
    offerHighlight:
      "The treatment is complimentary and can be received within 30 days.",
    offerInstruction:
      "Show this screen to your Scaramuzzo operator.",
    showOperator: "Show the operator",
    close: "Close",
    disclaimer:
      "This result provides cosmetic guidance and is not a medical diagnosis. If hair loss is sudden, persistent or accompanied by other symptoms, consult a healthcare professional.",
    exploreKicker: "Continue your journey",
    exploreTitle: "Would you like to understand your hair better?",
    diagnosis: "Take the complete Botanical Diagnosis",
    method: "Discover the Scaramuzzo Method",
    restart: "Start again",
  },
} as const;

function resolveSalonFromAttribution(): SalonTrackingId {
  if (typeof window === "undefined") return "unknown";

  const currentContent = new URL(window.location.href).searchParams
    .get("utm_content")
    ?.trim()
    .toLowerCase()
    .replace(/-/g, "_");
  if (isSalonId(currentContent)) return currentContent;

  const attribution = getAttributionForPayload();
  const storedContent = (
    attribution.last_touch?.utm_content ??
    attribution.first_touch?.utm_content
  )
    ?.trim()
    .toLowerCase()
    .replace(/-/g, "_");

  return isSalonId(storedContent) ? storedContent : "unknown";
}

export default function AnticadutaQuizClient() {
  const { language } = useLanguage();
  const t = copy[language as Language];
  const reduceMotion = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] =
    useState<AnticadutaAnswers>(INITIAL_ANSWERS);
  const [showResults, setShowResults] = useState(false);
  const [offerPresentation, setOfferPresentation] = useState(false);
  const [salonId, setSalonId] = useState<SalonTrackingId>("unknown");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(() => buildAnticadutaResult(answers), [answers]);

  useEffect(() => {
    captureAttributionFromUrl();
    const resolvedSalonId = resolveSalonFromAttribution();
    setSalonId(resolvedSalonId);
    trackAnticadutaQuizView({
      language,
      salonId: resolvedSalonId,
    });
  }, [language]);

  useEffect(() => {
    if (!started || showResults) return;

    trackAnticadutaQuizStep({
      language,
      salonId,
      stepNumber: step + 1,
      stepId: STEP_IDS[step]!,
    });
    headingRef.current?.focus();
  }, [language, salonId, showResults, started, step]);

  useEffect(() => {
    if (!showResults || !result) return;

    trackAnticadutaQuizComplete({
      language,
      salonId,
      profileVariant: result.profileVariant,
      routineVariant: result.routineVariant,
    });
    trackAnticadutaOfferView({
      language,
      salonId,
    });
    headingRef.current?.focus();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [language, result, salonId, showResults]);

  const startQuiz = () => {
    trackAnticadutaQuizStart({ language, salonId });
    setStarted(true);
    setStep(0);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const resetQuiz = () => {
    setAnswers(INITIAL_ANSWERS);
    setStep(0);
    setStarted(false);
    setShowResults(false);
    setOfferPresentation(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setStep((current) => current - 1);
  };

  const continueQuiz = () => {
    if (step === 0 && !answers.observation) return;
    if (step === 1 && !answers.scalp) return;

    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }

    setShowResults(true);
  };

  const toggleDailyFactor = (factor: DailyFactor) => {
    setAnswers((current) => ({
      ...current,
      dailyFactors: current.dailyFactors.includes(factor)
        ? current.dailyFactors.filter((item) => item !== factor)
        : [...current.dailyFactors, factor],
    }));
  };

  const showOfferToOperator = () => {
    trackAnticadutaOfferReveal({ language, salonId });
    setOfferPresentation(true);
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: "easeOut" as const };

  if (!started) {
    return (
      <div className="bg-background text-foreground">
        <section className="container mx-auto max-w-5xl px-4 py-10 sm:py-16">
          <div className="overflow-hidden rounded-[2rem] border border-accent/25 bg-gradient-to-br from-card to-card/40 shadow-2xl">
            <div className="grid items-center md:grid-cols-[1.15fr_0.85fr]">
              <div className="order-2 px-6 py-10 sm:px-10 sm:py-14 md:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
                  {t.eyebrow}
                </p>
                <h1 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                  {t.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t.subtitle}
                </p>
                <button
                  type="button"
                  onClick={startQuiz}
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  {t.start}
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Leaf className="h-4 w-4 text-accent" />
                  {t.cosmeticNote}
                </p>
              </div>

              <div className="relative order-1 min-h-64 border-b border-border/30 bg-background/20 md:order-2 md:min-h-full md:border-b-0 md:border-l">
                <Image
                  src="/lozione-nuovo.webp"
                  alt={t.productAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-8 sm:p-12"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (showResults && result) {
    const safeDailyFactor = result.dailyFactors.find(
      (factor) => factor === "tight_headwear" || factor === "styling_heat"
    );
    const factorTips = safeDailyFactor
      ? [t.factorTips[safeDailyFactor]]
      : [];

    return (
      <div className="bg-background text-foreground">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  {t.profileKicker}
                </p>
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-3 text-3xl font-bold outline-none sm:text-4xl"
                >
                  {t.profileNames[result.profileVariant]}
                </h1>
              </div>
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">{t.restart}</span>
              </button>
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.profileDescriptions[result.profileVariant]}
            </p>

            <section className="mt-10 rounded-3xl border border-border/40 bg-card/40 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {t.routineTitle}
              </p>
              <div className="mt-6 border-l-2 border-accent/40 pl-5">
                <h2 className="text-xl font-semibold">{t.usageTitle}</h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/90">
                  {t.officialUsage}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.routineAdvice[result.routineVariant]}
                </p>
              </div>

              {factorTips.length > 0 && (
                <div className="mt-8 border-t border-border/30 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
                    {t.complementaryTitle}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {factorTips.map((tip) => (
                      <li
                        key={tip}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-accent/40 bg-gradient-to-br from-accent/[0.16] via-card to-card/60 p-7 text-center shadow-2xl sm:p-10">
              <Sparkles className="mx-auto h-7 w-7 text-accent" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                {t.offerLabel}
              </p>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/90 sm:text-lg">
                {t.offerText}
              </p>
              <p className="mx-auto mt-5 max-w-lg text-lg font-semibold leading-relaxed text-accent sm:text-xl">
                {t.offerHighlight}
              </p>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/90">
                {t.offerInstruction}
              </p>
              <button
                type="button"
                onClick={showOfferToOperator}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 sm:w-auto"
              >
                {t.showOperator}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                {t.cosmeticNote}
              </p>
            </section>

            <p className="mt-6 rounded-2xl border border-border/40 bg-background/30 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
              {t.disclaimer}
            </p>

            <section className="mt-12 border-t border-border/40 pt-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                {t.exploreKicker}
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                {t.exploreTitle}
              </h2>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/diagnosi-botanica"
                  onClick={() =>
                    trackAnticadutaDiagnosiClick({ language, salonId })
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  {t.diagnosis}
                </Link>
                <Link
                  href="/#metodo"
                  onClick={() =>
                    trackAnticadutaMetodoClick({ language, salonId })
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border/60 px-7 py-3.5 text-center text-sm font-semibold transition hover:border-accent/50 hover:bg-card/60"
                >
                  {t.method}
                </Link>
              </div>
            </section>
          </motion.div>
        </div>

        <AnimatePresence>
          {offerPresentation && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.offerLabel}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={transition}
                className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-accent/50 bg-[#2b1409] px-6 py-12 text-center text-white shadow-2xl sm:px-10"
              >
                <button
                  type="button"
                  onClick={() => setOfferPresentation(false)}
                  aria-label={t.close}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
                <Image
                  src="/lozione-nuovo.webp"
                  alt={t.productAlt}
                  width={180}
                  height={240}
                  className="mx-auto h-44 w-auto object-contain"
                />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                  {t.offerLabel}
                </p>
                <p className="mx-auto mt-4 max-w-sm text-lg font-medium leading-relaxed">
                  {t.offerText}
                </p>
                <p className="mx-auto mt-5 max-w-sm text-xl font-semibold leading-relaxed text-accent">
                  {t.offerHighlight}
                </p>
                <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-white/90">
                  {t.offerInstruction}
                </p>
                <p className="mt-6 text-xs text-white/60">{t.cosmeticNote}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const question = t.questions[step]!;
  const canContinue =
    step === 0 ? Boolean(answers.observation) : step === 1 ? Boolean(answers.scalp) : true;
  const selectedSingle =
    step === 0 ? answers.observation : step === 1 ? answers.scalp : undefined;

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto flex min-h-[70vh] max-w-3xl flex-col px-4 py-10 sm:py-16">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>
              {t.step} {step + 1} {t.of} 3
            </span>
            <span>{Math.round(((step + 1) / 3) * 100)}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step + 1}
            className="h-1.5 overflow-hidden rounded-full bg-border/40"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
            transition={transition}
            className="mt-10 flex-1"
          >
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-balance text-2xl font-semibold leading-tight outline-none sm:text-3xl"
            >
              {question.title}
            </h1>
            {"help" in question && question.help && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {question.help}
              </p>
            )}

            <div
              role={step === 2 ? "group" : "radiogroup"}
              aria-label={question.title}
              className="mt-8 grid grid-cols-1 gap-3"
            >
              {question.options.map((option, index) => {
                const isMultiple = step === 2;
                const selected = isMultiple
                  ? answers.dailyFactors.includes(option.id as DailyFactor)
                  : selectedSingle === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    role={isMultiple ? "checkbox" : "radio"}
                    aria-checked={selected}
                    onClick={() => {
                      if (step === 0) {
                        setAnswers((current) => ({
                          ...current,
                          observation: option.id as ObservationAnswer,
                        }));
                      } else if (step === 1) {
                        setAnswers((current) => ({
                          ...current,
                          scalp: option.id as ScalpAnswer,
                        }));
                      } else {
                        toggleDailyFactor(option.id as DailyFactor);
                      }
                    }}
                    className={`flex min-h-16 items-start gap-4 rounded-2xl border px-5 py-4 text-left text-sm leading-relaxed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      selected
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border/50 bg-card/40 text-foreground/90 hover:border-accent/40 hover:bg-card/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-semibold ${
                        isMultiple ? "rounded-lg" : "rounded-full"
                      } ${
                        selected
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {selected ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className="pt-0.5">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="sticky bottom-0 mt-8 flex gap-3 border-t border-border/30 bg-background/95 py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/60 px-5 py-3 text-sm font-semibold transition hover:border-accent/50"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </button>
          <button
            type="button"
            onClick={continueQuiz}
            disabled={!canContinue}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.continue}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
