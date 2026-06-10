"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Check,
  RotateCcw,
  MessageCircle,
  Camera,
  ArrowRight,
} from "lucide-react";

type Lang = "it" | "en";

// Numero WhatsApp ufficiale (formato internazionale, solo cifre).
const WHATSAPP_NUMBER = "393470914731";

type AnswerKey =
  | "base"
  | "altezza"
  | "bianchiPerc"
  | "bianchiDistribuzione"
  | "porosita"
  | "struttura"
  | "cute"
  | "storico"
  | "intento"
  | "tonalita";

type Answers = Partial<Record<AnswerKey, string>>;

type Opt = { id: string; it: string; en: string };

interface ChoiceScreen {
  id: AnswerKey;
  type: "choice";
  title: { it: string; en: string };
  help?: { it: string; en: string };
  options: Opt[];
}

interface PhotoScreen {
  id: "foto";
  type: "photo";
}

type Screen = ChoiceScreen | PhotoScreen;

// ============================================================
// SCHERMATE (una domanda per schermata)
// ============================================================
const SCREENS: Screen[] = [
  {
    id: "base",
    type: "choice",
    title: { it: "Base naturale", en: "Natural base" },
    help: {
      it: "Il colore naturale dei tuoi capelli, senza trattamenti.",
      en: "Your natural hair color, before any treatment.",
    },
    options: [
      { id: "nero", it: "Nero", en: "Black" },
      { id: "castano-scuro", it: "Castano scuro", en: "Dark brown" },
      { id: "castano", it: "Castano", en: "Brown" },
      { id: "castano-chiaro", it: "Castano chiaro", en: "Light brown" },
      { id: "biondo-scuro", it: "Biondo scuro", en: "Dark blonde" },
      { id: "biondo", it: "Biondo", en: "Blonde" },
    ],
  },
  {
    id: "altezza",
    type: "choice",
    title: { it: "Altezza di tono", en: "Tone level" },
    help: {
      it: "Quanto è chiara o scura la tua base, in generale.",
      en: "How light or dark your base is, in general.",
    },
    options: [
      { id: "molto-scuro", it: "Molto scuro", en: "Very dark" },
      { id: "scuro", it: "Scuro", en: "Dark" },
      { id: "medio", it: "Medio", en: "Medium" },
      { id: "chiaro", it: "Chiaro", en: "Light" },
      { id: "molto-chiaro", it: "Molto chiaro", en: "Very light" },
    ],
  },
  {
    id: "bianchiPerc",
    type: "choice",
    title: { it: "Capelli bianchi", en: "Grey hair" },
    help: {
      it: "La percentuale indicativa di capelli bianchi.",
      en: "The approximate percentage of grey hair.",
    },
    options: [
      { id: "0", it: "Assenti", en: "None" },
      { id: "lt25", it: "Meno del 25%", en: "Under 25%" },
      { id: "25-50", it: "25–50%", en: "25–50%" },
      { id: "50-75", it: "50–75%", en: "50–75%" },
      { id: "gt75", it: "Oltre il 75%", en: "Over 75%" },
    ],
  },
  {
    id: "bianchiDistribuzione",
    type: "choice",
    title: { it: "Distribuzione dei bianchi", en: "Grey distribution" },
    help: {
      it: "Dove si concentrano maggiormente.",
      en: "Where they are mostly concentrated.",
    },
    options: [
      { id: "tempie", it: "Tempie", en: "Temples" },
      { id: "frontale", it: "Frontale", en: "Front" },
      { id: "nuca", it: "Nuca", en: "Nape" },
      { id: "diffusa", it: "Diffusa", en: "Diffuse" },
      { id: "uniforme", it: "Uniforme", en: "Uniform" },
    ],
  },
  {
    id: "porosita",
    type: "choice",
    title: { it: "Porosità", en: "Porosity" },
    help: {
      it: "Quanto i capelli assorbono acqua e prodotti. Nel dubbio scegli “Non lo so”.",
      en: "How much hair absorbs water and products. If unsure, pick “I don't know”.",
    },
    options: [
      { id: "bassa", it: "Bassa", en: "Low" },
      { id: "media", it: "Media", en: "Medium" },
      { id: "alta", it: "Alta", en: "High" },
      { id: "non-so", it: "Non lo so", en: "I don't know" },
    ],
  },
  {
    id: "struttura",
    type: "choice",
    title: { it: "Struttura del capello", en: "Hair structure" },
    help: {
      it: "Lo spessore del singolo capello.",
      en: "The thickness of a single hair.",
    },
    options: [
      { id: "fine", it: "Fine", en: "Fine" },
      { id: "media", it: "Media", en: "Medium" },
      { id: "spessa", it: "Spessa", en: "Thick" },
    ],
  },
  {
    id: "cute",
    type: "choice",
    title: { it: "Cute", en: "Scalp" },
    options: [
      { id: "normale", it: "Normale", en: "Normal" },
      { id: "grassa", it: "Grassa", en: "Oily" },
      { id: "secca", it: "Secca", en: "Dry" },
      { id: "sensibile", it: "Sensibile", en: "Sensitive" },
    ],
  },
  {
    id: "storico",
    type: "choice",
    title: { it: "Storico chimico", en: "Chemical history" },
    help: {
      it: "L'ultimo trattamento prevalente sui tuoi capelli.",
      en: "The main recent treatment on your hair.",
    },
    options: [
      { id: "mai", it: "Mai trattato", en: "Never treated" },
      { id: "colore", it: "Colore", en: "Color" },
      { id: "decolorazione", it: "Decolorazione", en: "Bleaching" },
      { id: "henne-erbe", it: "Henné o erbe", en: "Henna or herbs" },
      { id: "stiratura", it: "Stiratura o cheratina", en: "Straightening / keratin" },
    ],
  },
  {
    id: "intento",
    type: "choice",
    title: { it: "Qual è il tuo intento?", en: "What is your intent?" },
    options: [
      { id: "copertura", it: "Copertura bianchi", en: "Grey coverage" },
      { id: "riflesso", it: "Riflesso", en: "Reflection" },
      { id: "cambio-tono", it: "Cambio tono", en: "Tone change" },
    ],
  },
  {
    id: "tonalita",
    type: "choice",
    title: { it: "Tonalità desiderata", en: "Desired tone" },
    options: [
      { id: "castano", it: "Castano", en: "Brown" },
      { id: "nocciola", it: "Nocciola", en: "Hazel" },
      { id: "freddo", it: "Freddo", en: "Cool" },
      { id: "rosso", it: "Rosso", en: "Red" },
      { id: "rame", it: "Rame", en: "Copper" },
      { id: "biondo-caldo", it: "Biondo caldo", en: "Warm blonde" },
      { id: "biondo-freddo", it: "Biondo freddo", en: "Cool blonde" },
    ],
  },
  { id: "foto", type: "photo" },
];

const T = {
  it: {
    kicker: "Scaramuzzo",
    heroTitle: "Botanical Color Experience",
    heroSubtitle:
      "Analizza il tuo profilo colore, la storia dei tuoi capelli e ricevi una valutazione professionale per il tuo percorso botanico personalizzato.",
    heroCta: "Inizia la diagnosi",
    stepLabel: "Domanda",
    of: "di",
    back: "Indietro",
    restart: "Ricomincia",
    // foto
    photoKicker: "Foto",
    photoTitle: "Prepara le tue foto",
    photoIntro:
      "Per una valutazione accurata serviranno tre foto. Scattale con luce naturale, su capelli asciutti e pettinati.",
    photoNote:
      "Le foto verranno richieste nella fase finale tramite WhatsApp.",
    photoContinue: "Vai al risultato",
    photoItems: [
      {
        title: "Radice",
        text: "Inquadra la riga centrale per mostrare la ricrescita e i bianchi.",
      },
      {
        title: "Lunghezze",
        text: "Mostra il colore attuale lungo tutta la lunghezza.",
      },
      {
        title: "Nuca",
        text: "Una foto della parte posteriore, dove il colore spesso differisce.",
      },
    ],
    // risultato
    resultKicker: "Valutazione",
    resultTitle: "La tua Diagnosi Botanica Scaramuzzo",
    resultIntro:
      "Abbiamo raccolto il tuo profilo. Una valutazione professionale completa verrà confermata dal nostro team dopo aver visto le foto.",
    profileTitle: "Riepilogo profilo",
    objectiveTitle: "Riepilogo obiettivo",
    expectedTitle: "Risultato atteso",
    intentLabel: "Intento",
    toneLabel: "Tonalità",
    // labels profilo
    labels: {
      base: "Base naturale",
      altezza: "Altezza di tono",
      bianchiPerc: "Capelli bianchi",
      bianchiDistribuzione: "Distribuzione bianchi",
      porosita: "Porosità",
      struttura: "Struttura",
      cute: "Cute",
      storico: "Storico chimico",
    } as Record<string, string>,
    // consulenza
    consultTitle: "Completa la tua valutazione",
    consultText:
      "Invia le foto e ricevi la tua valutazione botanica personalizzata.",
    consultCta: "Continua su WhatsApp",
    // whatsapp
    waGreeting: "Ciao Carmen,",
    waIntro: "ho completato la Diagnosi Botanica sul sito.",
    waProfile: "Profilo:",
    waObjective: "Obiettivo:",
    waClosing:
      "Allego le foto (radice, lunghezze, nuca). Vorrei la mia valutazione botanica personalizzata.",
  },
  en: {
    kicker: "Scaramuzzo",
    heroTitle: "Botanical Color Experience",
    heroSubtitle:
      "Analyse your color profile, your hair history and receive a professional assessment for your personalized botanical journey.",
    heroCta: "Start the diagnosis",
    stepLabel: "Question",
    of: "of",
    back: "Back",
    restart: "Restart",
    photoKicker: "Photos",
    photoTitle: "Prepare your photos",
    photoIntro:
      "For an accurate assessment we'll need three photos. Take them in natural light, on dry, combed hair.",
    photoNote:
      "Photos will be requested in the final step via WhatsApp.",
    photoContinue: "Go to result",
    photoItems: [
      {
        title: "Roots",
        text: "Frame the central parting to show regrowth and grey hair.",
      },
      {
        title: "Lengths",
        text: "Show the current color along the full length.",
      },
      {
        title: "Nape",
        text: "A photo of the back, where color often differs.",
      },
    ],
    resultKicker: "Assessment",
    resultTitle: "Your Scaramuzzo Botanical Diagnosis",
    resultIntro:
      "We collected your profile. A full professional assessment will be confirmed by our team after reviewing the photos.",
    profileTitle: "Profile summary",
    objectiveTitle: "Objective summary",
    expectedTitle: "Expected result",
    intentLabel: "Intent",
    toneLabel: "Tone",
    labels: {
      base: "Natural base",
      altezza: "Tone level",
      bianchiPerc: "Grey hair",
      bianchiDistribuzione: "Grey distribution",
      porosita: "Porosity",
      struttura: "Structure",
      cute: "Scalp",
      storico: "Chemical history",
    } as Record<string, string>,
    consultTitle: "Complete your assessment",
    consultText:
      "Send your photos and receive your personalized botanical assessment.",
    consultCta: "Continue on WhatsApp",
    waGreeting: "Hi Carmen,",
    waIntro: "I completed the Botanical Diagnosis on the website.",
    waProfile: "Profile:",
    waObjective: "Objective:",
    waClosing:
      "I'm attaching the photos (roots, lengths, nape). I'd like my personalized botanical assessment.",
  },
};

// Risultato atteso — testo qualitativo, nessun prodotto/ingrediente
const EXPECTED: Record<Lang, Record<string, string>> = {
  it: {
    copertura:
      "Copertura uniforme e naturale dei capelli bianchi, con un risultato armonioso sulla tua base.",
    riflesso:
      "Riflesso luminoso e naturale che valorizza la base, senza stravolgere il colore di partenza.",
    "cambio-tono":
      "Passaggio graduale verso la nuova tonalità, rispettando la struttura del capello.",
  },
  en: {
    copertura:
      "Uniform, natural grey coverage with a harmonious result on your base.",
    riflesso:
      "Luminous, natural reflection that enhances your base without altering the starting color.",
    "cambio-tono":
      "Gradual transition toward the new tone, respecting the hair structure.",
  },
};

export default function DiagnosiClient() {
  const [language, setLanguage] = useState<Lang>("it");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("language") as Lang | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

  const t = T[language];

  // Schermate attive (salta distribuzione bianchi se assenti)
  const screens = SCREENS.filter(
    (s) => !(s.id === "bianchiDistribuzione" && answers.bianchiPerc === "0")
  );

  const total = screens.length;
  const current = screens[step];

  const optionLabel = (key: AnswerKey): string => {
    const screen = SCREENS.find(
      (s): s is ChoiceScreen => s.type === "choice" && s.id === key
    );
    const opt = screen?.options.find((o) => o.id === answers[key]);
    return opt ? opt[language] : "—";
  };

  const choose = (key: AnswerKey, id: string) => {
    setAnswers((prev) => ({ ...prev, [key]: id }));
    if (step < total - 1) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
    setStarted(false);
  };

  const waHref = () => {
    const profileKeys: AnswerKey[] = [
      "base",
      "altezza",
      "bianchiPerc",
      "bianchiDistribuzione",
      "porosita",
      "struttura",
      "cute",
      "storico",
    ];
    const lines = [
      t.waGreeting,
      "",
      t.waIntro,
      "",
      t.waProfile,
      "",
      ...profileKeys
        .filter((k) => answers[k])
        .map((k) => `• ${t.labels[k]}: ${optionLabel(k)}`),
      "",
      t.waObjective,
      "",
      `• ${t.intentLabel}: ${optionLabel("intento")}`,
      `• ${t.toneLabel}: ${optionLabel("tonalita")}`,
      "",
      t.waClosing,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  // ============================================================
  // STEP 0 — HERO
  // ============================================================
  if (!started) {
    return (
      <div className="bg-background text-foreground">
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
          <Image
            src="/ERBE.webp"
            alt="Diagnosi Botanica Professionale Scaramuzzo"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {t.kicker}
            </p>
            <h1 className="text-balance text-3xl font-bold leading-[1.12] drop-shadow-xl sm:text-4xl md:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg">
              {t.heroSubtitle}
            </p>
            <button
              onClick={() => setStarted(true)}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-lg transition hover:bg-neutral-200"
            >
              {t.heroCta}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================
  // STEP 4/5 — RISULTATO + CONSULENZA
  // ============================================================
  if (showResults) {
    const profileKeys: AnswerKey[] = [
      "base",
      "altezza",
      "bianchiPerc",
      "bianchiDistribuzione",
      "porosita",
      "struttura",
      "cute",
      "storico",
    ];
    const expected = answers.intento
      ? EXPECTED[language][answers.intento]
      : "";

    return (
      <div className="bg-background text-foreground">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.resultKicker}
          </p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-3xl font-bold sm:text-4xl">{t.resultTitle}</h1>
            <button
              onClick={restart}
              className="mt-3 inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition hover:text-foreground sm:mt-0"
            >
              <RotateCcw className="h-4 w-4" />
              {t.restart}
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.resultIntro}
          </p>

          {/* RIEPILOGO PROFILO + OBIETTIVO */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/40 bg-card/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t.profileTitle}
              </p>
              <dl className="mt-4 space-y-2.5 text-sm">
                {profileKeys
                  .filter((k) => answers[k])
                  .map((k) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{t.labels[k]}</dt>
                      <dd className="text-right font-medium">
                        {optionLabel(k)}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t.objectiveTitle}
              </p>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.intentLabel}</dt>
                  <dd className="font-medium">{optionLabel("intento")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.toneLabel}</dt>
                  <dd className="font-medium">{optionLabel("tonalita")}</dd>
                </div>
              </dl>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t.expectedTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {expected}
              </p>
            </div>
          </div>

          {/* CONSULENZA FINALE */}
          <div className="mt-12 rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.consultTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.consultText}
            </p>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t.consultCta}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // STEP 1–3 — STEPPER
  // ============================================================
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20">
        {/* PROGRESS */}
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>
              {t.stepLabel} {step + 1} {t.of} {total}
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

        {current.type === "choice" ? (
          <>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {current.title[language]}
            </h2>
            {current.help && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {current.help[language]}
              </p>
            )}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {current.options.map((o) => {
                const selected = answers[current.id] === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => choose(current.id, o.id)}
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
          </>
        ) : (
          // PHOTO SCREEN
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.photoKicker}
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              {t.photoTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t.photoIntro}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.photoItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/40 bg-card/40 p-6"
                >
                  <Camera className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border/40 bg-background/30 px-5 py-4">
              <p className="text-sm text-muted-foreground">{t.photoNote}</p>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md transition hover:bg-neutral-200"
            >
              {t.photoContinue}
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}

        {step > 0 && (
          <button
            onClick={goBack}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            ← {t.back}
          </button>
        )}
      </div>
    </div>
  );
}
