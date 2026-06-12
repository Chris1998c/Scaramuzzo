"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Check, RotateCcw, ShoppingBag, MessageCircle, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import {
  recommend,
  customFormula,
  type Lang,
  type Capello,
  type Cute,
  type Obiettivo,
  type Profumo,
  type Intensita,
  type Reco,
  type RecommendResult,
} from "./recommend";

type Answers = {
  capello?: Capello;
  cute?: Cute;
  obiettivo?: Obiettivo;
  profumo?: Profumo;
  intensita?: Intensita;
};

interface Props {
  language: Lang;
  whatsappNumber: string;
}

type StepKey = keyof Answers;

interface StepDef {
  key: StepKey;
  title: { it: string; en: string };
  options: { id: string; it: string; en: string }[];
}

const STEPS: StepDef[] = [
  {
    key: "capello",
    title: { it: "Tipo di capello", en: "Hair type" },
    options: [
      { id: "lisci", it: "Lisci", en: "Straight" },
      { id: "mossi", it: "Mossi", en: "Wavy" },
      { id: "ricci", it: "Ricci", en: "Curly" },
      { id: "molto-ricci", it: "Molto ricci", en: "Very curly" },
    ],
  },
  {
    key: "cute",
    title: { it: "Tipo di cute", en: "Scalp type" },
    options: [
      { id: "grassa", it: "Grassa", en: "Oily" },
      { id: "secca", it: "Secca", en: "Dry" },
      { id: "sensibile", it: "Sensibile", en: "Sensitive" },
      { id: "normale", it: "Normale", en: "Normal" },
    ],
  },
  {
    key: "obiettivo",
    title: { it: "Obiettivo principale", en: "Main goal" },
    options: [
      { id: "idratazione", it: "Idratazione", en: "Hydration" },
      { id: "nutrizione", it: "Nutrizione", en: "Nourishment" },
      { id: "purificazione", it: "Purificazione", en: "Purification" },
      { id: "volume", it: "Volume", en: "Volume" },
      { id: "lucentezza", it: "Lucentezza", en: "Shine" },
      { id: "definizione-ricci", it: "Definizione ricci", en: "Curl definition" },
      { id: "anticaduta", it: "Anticaduta", en: "Anti-hair-loss" },
    ],
  },
  {
    key: "profumo",
    title: { it: "Profumazione", en: "Fragrance" },
    options: [
      { id: "agrumi", it: "Agrumi", en: "Citrus" },
      { id: "ambrato", it: "Ambrato", en: "Amber" },
      { id: "muschio", it: "Muschio", en: "Musk" },
      { id: "fruttato", it: "Fruttato", en: "Fruity" },
    ],
  },
  {
    key: "intensita",
    title: { it: "Intensità profumo", en: "Fragrance intensity" },
    options: [
      { id: "delicata", it: "Delicata", en: "Light" },
      { id: "media", it: "Media", en: "Medium" },
      { id: "intensa", it: "Intensa", en: "Intense" },
    ],
  },
];

const T = {
  it: {
    stepLabel: "Passo",
    of: "di",
    back: "Indietro",
    restart: "Ricomincia",
    combinationsBadge: "Oltre 200 combinazioni possibili",
    resultsTitle: "La tua routine Scaramuzzo",
    resultsIntro:
      "In base alle tue risposte abbiamo selezionato una routine compatibile con le esigenze che hai indicato.",
    profileTitle: "Profilo olfattivo scelto",
    fragrance: "Profumazione",
    intensity: "Intensità",
    keyActives: "Attivi principali",
    why: "Perché lo consigliamo",
    add: "Aggiungi",
    added: "Aggiunto ✔",
    // Percorso A
    pathATag: "Percorso A — Disponibile subito",
    pathATitle: "Routine disponibile subito",
    pathAText:
      "Prodotti già pronti dalla nostra linea, selezionati in base al tuo profilo.",
    addRoutine: "Aggiungi tutta la routine al carrello",
    // Percorso B
    pathBTag: "Percorso B — Su misura",
    pathBQuestion: "Vuoi qualcosa di ancora più personalizzato?",
    pathBName: "Formula Personalizzata Scaramuzzo",
    pathBText:
      "Creiamo una formula su misura partendo dal tuo profilo. Un nostro consulente definirà con te la soluzione ideale.",
    profileLabel: "Profilo",
    configLabel: "Configurazione consigliata",
    baseSuggested: "Base suggerita",
    productCategory: "Categoria prodotto",
    mainNeed: "Esigenza principale",
    requestCustom: "Richiedi Formula Personalizzata",
    waCta: "Continua su WhatsApp",
    waGreeting: "Buongiorno,",
    waIntro: "ho completato il quiz Prodotti Personalizzati.",
    waProfile: "Profilo:",
    waRoutine: "Routine suggerita:",
    waClosing: "Vorrei un tuo parere professionale.",
    refLabel: "Riferimento consulenza",
    refUnavailable: "Riferimento non disponibile",
    waRef: "Riferimento consulenza",
    customOnlyTitle: "Prodotto personalizzato su misura",
    customOnlyText:
      "Il profilo indicato richiede una valutazione personalizzata prima di consigliare una routine pronta.",
    customReasonLabel: "Motivo della personalizzazione",
    customWaClosing:
      "Vorrei un prodotto personalizzato adatto al mio profilo.",
    customWaCta: "Continua su WhatsApp",
    waCustomIntro:
      "vorrei richiedere una Formula Personalizzata Scaramuzzo.",
    waConfig: "Configurazione consigliata:",
    waCustomClosing:
      "Potete crearmi una formula su misura in base a questo profilo?",
    hairLabel: "Capelli",
    scalpLabel: "Cute",
    goalLabel: "Obiettivo",
  },
  en: {
    stepLabel: "Step",
    of: "of",
    back: "Back",
    restart: "Restart",
    combinationsBadge: "Over 200 possible combinations",
    resultsTitle: "Your Scaramuzzo routine",
    resultsIntro:
      "Based on your answers, we selected a routine compatible with the needs you indicated.",
    profileTitle: "Your chosen fragrance profile",
    fragrance: "Fragrance",
    intensity: "Intensity",
    keyActives: "Key actives",
    why: "Why we recommend it",
    add: "Add",
    added: "Added ✔",
    // Path A
    pathATag: "Path A — Available now",
    pathATitle: "Routine available now",
    pathAText:
      "Ready-made products from our line, selected based on your profile.",
    addRoutine: "Add the whole routine to cart",
    // Path B
    pathBTag: "Path B — Made to measure",
    pathBQuestion: "Want something even more personalized?",
    pathBName: "Scaramuzzo Custom Formula",
    pathBText:
      "We create a made-to-measure formula starting from your profile. One of our advisors will define the ideal solution with you.",
    profileLabel: "Profile",
    configLabel: "Recommended configuration",
    baseSuggested: "Suggested base",
    productCategory: "Product category",
    mainNeed: "Main need",
    requestCustom: "Request Custom Formula",
    waCta: "Continue on WhatsApp",
    waGreeting: "Hello,",
    waIntro: "I completed the Personalized Products quiz.",
    waProfile: "Profile:",
    waRoutine: "Suggested routine:",
    waClosing: "I'd like your professional opinion.",
    refLabel: "Consultation reference",
    refUnavailable: "Reference unavailable",
    waRef: "Consultation reference",
    customOnlyTitle: "Made-to-measure personalized product",
    customOnlyText:
      "Your profile requires a personalized assessment before we recommend a ready-made routine.",
    customReasonLabel: "Reason for personalization",
    customWaClosing:
      "I'd like a personalized product suited to my profile.",
    customWaCta: "Continue on WhatsApp",
    waCustomIntro: "I'd like to request a Scaramuzzo Custom Formula.",
    waConfig: "Recommended configuration:",
    waCustomClosing:
      "Could you create a made-to-measure formula based on this profile?",
    hairLabel: "Hair",
    scalpLabel: "Scalp",
    goalLabel: "Goal",
  },
};

type CompleteAnswers = {
  capello: Capello;
  cute: Cute;
  obiettivo: Obiettivo;
  profumo: Profumo;
  intensita: Intensita;
};

type CrmSource = "quiz_routine" | "quiz_custom";

function answersFingerprint(answers: CompleteAnswers): string {
  return JSON.stringify(answers);
}

function crmRefStorageKey(source: CrmSource, fingerprint: string): string {
  return `pp-crm-ref-${source}-${fingerprint}`;
}

function crmLockStorageKey(source: CrmSource, fingerprint: string): string {
  return `pp-crm-lock-${source}-${fingerprint}`;
}

export default function QuizConfigurator({ language, whatsappNumber }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [publicRef, setPublicRef] = useState<string | null>(null);
  const [publicRefCustom, setPublicRefCustom] = useState<string | null>(null);
  const [refUnavailable, setRefUnavailable] = useState(false);
  const savedRoutineRef = useRef<string | null>(null);
  const savedCustomRef = useRef<string | null>(null);

  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  const t = T[language];
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const select = (key: StepKey, id: string) => {
    const next = { ...answers, [key]: id } as Answers;
    setAnswers(next);
    if (isLast) {
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
    setAddedIds([]);
    setPublicRef(null);
    setPublicRefCustom(null);
    setRefUnavailable(false);
    savedRoutineRef.current = null;
    savedCustomRef.current = null;
  };

  const labelFor = (key: StepKey): string => {
    const def = STEPS.find((s) => s.key === key);
    const opt = def?.options.find((o) => o.id === answers[key]);
    return opt ? opt[language] : "";
  };

  const completeAnswers: CompleteAnswers | null =
    showResults &&
    answers.capello &&
    answers.cute &&
    answers.obiettivo &&
    answers.profumo &&
    answers.intensita
      ? {
          capello: answers.capello,
          cute: answers.cute,
          obiettivo: answers.obiettivo,
          profumo: answers.profumo,
          intensita: answers.intensita,
        }
      : null;

  const recommendResult: RecommendResult | null = completeAnswers
    ? recommend(completeAnswers, language)
    : null;

  const recos = recommendResult?.recommendedProducts ?? [];
  const customOnly = recommendResult?.customOnly ?? false;
  const customReason = recommendResult?.customReason ?? "";
  const customProductLabel = recommendResult?.customProductLabel ?? "";

  const formula =
    completeAnswers && !customOnly
      ? customFormula(completeAnswers, language)
      : null;

  const buildCrmPayload = () => {
    if (!completeAnswers) return null;
    return {
      answers: { ...completeAnswers },
      recommendedProducts: recos.map((r) => ({
        kind: r.kind,
        productId: r.productId,
        productName: r.productName,
        price: r.price,
      })),
      customFormula: formula
        ? {
            baseSuggested: formula.baseSuggested,
            productCategory: formula.productCategory,
            mainNeed: formula.mainNeed,
          }
        : null,
      customOnly,
      customReason: customOnly ? customReason : "",
      customProductLabel: customOnly ? customProductLabel : "",
    };
  };

  useEffect(() => {
    if (!showResults || !completeAnswers || customOnly) return;

    const source: CrmSource = "quiz_routine";
    const fingerprint = answersFingerprint(completeAnswers);
    const refKey = crmRefStorageKey(source, fingerprint);
    const lockKey = crmLockStorageKey(source, fingerprint);

    const cachedRef = sessionStorage.getItem(refKey);
    if (cachedRef) {
      setPublicRef(cachedRef);
      setRefUnavailable(false);
      savedRoutineRef.current = fingerprint;
      return;
    }

    if (savedRoutineRef.current === fingerprint) return;
    if (sessionStorage.getItem(lockKey) === "pending") return;

    const payload = buildCrmPayload();
    if (!payload) return;

    sessionStorage.setItem(lockKey, "pending");
    savedRoutineRef.current = fingerprint;

    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "personalizzati",
            source,
            language,
            payload,
          }),
        });

        if (cancelled) return;

        if (res.ok) {
          const data = (await res.json()) as { publicRef?: string };
          if (data.publicRef) {
            sessionStorage.setItem(refKey, data.publicRef);
            sessionStorage.setItem(lockKey, "done");
            setPublicRef(data.publicRef);
            setRefUnavailable(false);
          } else {
            sessionStorage.removeItem(lockKey);
            setRefUnavailable(true);
          }
        } else {
          sessionStorage.removeItem(lockKey);
          savedRoutineRef.current = null;
          setRefUnavailable(true);
        }
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem(lockKey);
          savedRoutineRef.current = null;
          setRefUnavailable(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recos/formula derivati da completeAnswers
  }, [showResults, completeAnswers, language, customOnly]);

  useEffect(() => {
    if (!showResults || !completeAnswers) return;
    if (!customOnly && !formula) return;

    const source: CrmSource = "quiz_custom";
    const fingerprint = answersFingerprint(completeAnswers);
    const refKey = crmRefStorageKey(source, fingerprint);
    const lockKey = crmLockStorageKey(source, fingerprint);

    const cachedRef = sessionStorage.getItem(refKey);
    if (cachedRef) {
      if (customOnly) {
        setPublicRef(cachedRef);
        setRefUnavailable(false);
      } else {
        setPublicRefCustom(cachedRef);
      }
      savedCustomRef.current = fingerprint;
      return;
    }

    if (savedCustomRef.current === fingerprint) return;
    if (sessionStorage.getItem(lockKey) === "pending") return;

    const payload = buildCrmPayload();
    if (!payload) return;

    sessionStorage.setItem(lockKey, "pending");
    savedCustomRef.current = fingerprint;

    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "personalizzati",
            source,
            language,
            payload,
          }),
        });

        if (cancelled) return;

        if (res.ok) {
          const data = (await res.json()) as { publicRef?: string };
          if (data.publicRef) {
            sessionStorage.setItem(refKey, data.publicRef);
            sessionStorage.setItem(lockKey, "done");
            if (customOnly) {
              setPublicRef(data.publicRef);
              setRefUnavailable(false);
            } else {
              setPublicRefCustom(data.publicRef);
            }
          } else if (customOnly) {
            setRefUnavailable(true);
          }
        } else {
          sessionStorage.removeItem(lockKey);
          savedCustomRef.current = null;
          if (customOnly) setRefUnavailable(true);
        }
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem(lockKey);
          savedCustomRef.current = null;
          if (customOnly) setRefUnavailable(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recos/formula derivati da completeAnswers
  }, [showResults, completeAnswers, formula, language, customOnly]);

  const addOne = (r: Reco) => {
    addToCart({
      id: r.productId,
      name: r.productName,
      price: r.price,
      image: r.image,
    });
    setAddedIds((prev) =>
      prev.includes(r.productId) ? prev : [...prev, r.productId]
    );
    openCart();
  };

  const addAll = () => {
    recos.forEach((r) =>
      addToCart({
        id: r.productId,
        name: r.productName,
        price: r.price,
        image: r.image,
      })
    );
    setAddedIds(recos.map((r) => r.productId));
    openCart();
  };

  const waHref = (ref: string | null) => {
    const lines = [
      t.waGreeting,
      "",
      t.waIntro,
      "",
      ...(ref ? [`${t.waRef}: ${ref}`, ""] : []),
      t.waProfile,
      "",
      `• ${t.hairLabel}: ${labelFor("capello")}`,
      `• ${t.scalpLabel}: ${labelFor("cute")}`,
      `• ${t.goalLabel}: ${labelFor("obiettivo")}`,
      `• ${t.fragrance}: ${labelFor("profumo")}`,
      `• ${t.intensity}: ${labelFor("intensita")}`,
      "",
      t.waRoutine,
      "",
      ...recos.map((r) => `• ${r.productName}`),
      "",
      t.waClosing,
    ];
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const waHrefCustomOnly = (ref: string | null) => {
    const lines = [
      t.waGreeting,
      "",
      t.waIntro,
      "",
      ...(ref ? [`${t.waRef}: ${ref}`, ""] : []),
      t.waProfile,
      "",
      `• ${t.hairLabel}: ${labelFor("capello")}`,
      `• ${t.scalpLabel}: ${labelFor("cute")}`,
      `• ${t.goalLabel}: ${labelFor("obiettivo")}`,
      `• ${t.fragrance}: ${labelFor("profumo")}`,
      `• ${t.intensity}: ${labelFor("intensita")}`,
      "",
      customReason,
      "",
      t.customWaClosing,
    ];
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const waHrefCustom = (ref: string | null) => {
    const lines = [
      t.waGreeting,
      "",
      t.waCustomIntro,
      "",
      ...(ref ? [`${t.waRef}: ${ref}`, ""] : []),
      t.waProfile,
      "",
      `• ${t.hairLabel}: ${labelFor("capello")}`,
      `• ${t.scalpLabel}: ${labelFor("cute")}`,
      `• ${t.goalLabel}: ${labelFor("obiettivo")}`,
      `• ${t.fragrance}: ${labelFor("profumo")}`,
      `• ${t.intensity}: ${labelFor("intensita")}`,
    ];
    if (formula) {
      lines.push(
        "",
        t.waConfig,
        "",
        `• ${t.baseSuggested}: ${formula.baseSuggested}`,
        `• ${t.productCategory}: ${formula.productCategory}`,
        `• ${t.mainNeed}: ${formula.mainNeed}`
      );
    }
    lines.push("", t.waCustomClosing);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  // ---------------- RISULTATI ----------------
  if (showResults) {
    return (
      <div>
        <p className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          {t.combinationsBadge}
        </p>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
              {t.resultsTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.resultsIntro}
            </p>
            {(publicRef || refUnavailable) && (
              <p className="mt-3 text-sm text-muted-foreground">
                {t.refLabel}:{" "}
                {publicRef ?? (
                  <span className="italic">{t.refUnavailable}</span>
                )}
              </p>
            )}
          </div>
          <button
            onClick={reset}
            className="mt-3 inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition hover:text-foreground sm:mt-0"
          >
            <RotateCcw className="h-4 w-4" />
            {t.restart}
          </button>
        </div>

        {/* Profilo olfattivo — una sola volta, non per prodotto */}
        {!customOnly && (
          <div className="mt-8 rounded-2xl border border-border/40 bg-card/30 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.profileTitle}
            </p>
            <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">{t.fragrance}:</dt>
                <dd className="font-medium">{labelFor("profumo")}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">{t.intensity}:</dt>
                <dd className="font-medium">{labelFor("intensita")}</dd>
              </div>
            </dl>
          </div>
        )}

        {customOnly ? (
          /* ===================== FALLBACK PERSONALIZZATO ===================== */
          <div className="mt-10 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {customProductLabel}
            </p>
            <h4 className="mt-3 text-xl font-semibold sm:text-2xl">
              {t.customOnlyTitle}
            </h4>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.customOnlyText}
            </p>

            <div className="mt-8 rounded-2xl border border-border/40 bg-background/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.profileLabel}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.hairLabel}</dt>
                  <dd className="font-medium">{labelFor("capello")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.scalpLabel}</dt>
                  <dd className="font-medium">{labelFor("cute")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.goalLabel}</dt>
                  <dd className="font-medium">{labelFor("obiettivo")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.fragrance}</dt>
                  <dd className="font-medium">{labelFor("profumo")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.intensity}</dt>
                  <dd className="font-medium">{labelFor("intensita")}</dd>
                </div>
              </dl>
            </div>

            {customReason && (
              <div className="mt-6 rounded-2xl border border-border/40 bg-background/30 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {t.customReasonLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {customReason}
                </p>
              </div>
            )}

            <a
              href={waHrefCustomOnly(publicRef)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t.customWaCta}
            </a>
          </div>
        ) : (
          <>
        {/* ===================== PERCORSO A ===================== */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t.pathATag}
          </p>
          <h4 className="mt-2 text-xl font-semibold sm:text-2xl">
            {t.pathATitle}
          </h4>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.pathAText}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {recos.map((r) => {
            const isAdded = addedIds.includes(r.productId);
            return (
              <div
                key={r.kind + r.productId}
                className="flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/40"
              >
                <div className="relative h-48 w-full border-b border-border/30">
                  <Image
                    src={r.image}
                    alt={r.productName}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="object-contain p-6"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                    {r.title}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold">
                    {r.productName}
                  </h4>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      {t.why}:{" "}
                    </span>
                    {r.reason}
                  </p>

                  {r.keyActives.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t.keyActives}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {r.keyActives.map((active) => (
                          <li
                            key={active}
                            className="text-sm text-foreground/90 before:mr-2 before:text-accent before:content-['•']"
                          >
                            {active}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4">
                    <span className="text-lg font-semibold">
                      € {r.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addOne(r)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        isAdded
                          ? "border border-accent/50 text-accent"
                          : "bg-white text-black hover:bg-neutral-200"
                      }`}
                    >
                      {isAdded ? t.added : t.add}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA PERCORSO A */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={addAll}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
          >
            <ShoppingBag className="h-5 w-5" />
            {t.addRoutine}
          </button>
          <a
            href={waHref(publicRef)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-7 py-3.5 text-base font-semibold transition hover:border-accent/50 hover:bg-card/60"
          >
            <MessageCircle className="h-5 w-5" />
            {t.waCta}
          </a>
        </div>

        {/* ===================== PERCORSO B — FORMULA PERSONALIZZATA ===================== */}
        {formula && (
          <div className="mt-14 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {t.pathBTag}
            </p>
            <h4 className="mt-3 text-xl font-semibold sm:text-2xl">
              {t.pathBQuestion}
            </h4>

            <div className="mt-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 shrink-0 text-accent" />
              <p className="text-lg font-semibold tracking-wide">
                {t.pathBName}
              </p>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.pathBText}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* PROFILO */}
              <div className="rounded-2xl border border-border/40 bg-background/30 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.profileLabel}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.hairLabel}</dt>
                    <dd className="font-medium">{labelFor("capello")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.scalpLabel}</dt>
                    <dd className="font-medium">{labelFor("cute")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.goalLabel}</dt>
                    <dd className="font-medium">{labelFor("obiettivo")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.fragrance}</dt>
                    <dd className="font-medium">{labelFor("profumo")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.intensity}</dt>
                    <dd className="font-medium">{labelFor("intensita")}</dd>
                  </div>
                </dl>
              </div>

              {/* CONFIGURAZIONE CONSIGLIATA */}
              <div className="rounded-2xl border border-border/40 bg-background/30 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.configLabel}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      {t.baseSuggested}
                    </dt>
                    <dd className="font-medium">{formula.baseSuggested}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      {t.productCategory}
                    </dt>
                    <dd className="text-right font-medium">
                      {formula.productCategory}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.mainNeed}</dt>
                    <dd className="font-medium capitalize">
                      {formula.mainNeed}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <a
              href={waHrefCustom(publicRefCustom ?? publicRef)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              <Sparkles className="h-5 w-5" />
              {t.requestCustom}
            </a>
          </div>
        )}
          </>
        )}
      </div>
    );
  }

  // ---------------- STEPPER ----------------
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      {/* PROGRESS */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {t.stepLabel} {step + 1} {t.of} {STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-semibold sm:text-3xl">
        {current.title[language]}
      </h3>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {current.options.map((o) => {
          const selected = answers[current.key] === o.id;
          return (
            <button
              key={o.id}
              onClick={() => select(current.key, o.id)}
              aria-pressed={selected}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border/50 bg-card/40 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              }`}
            >
              {o[language]}
              {selected && <Check className="h-5 w-5 text-accent" />}
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          ← {t.back}
        </button>
      )}
    </div>
  );
}
