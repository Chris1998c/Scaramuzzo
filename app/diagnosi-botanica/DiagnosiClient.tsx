"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Check,
  RotateCcw,
  MessageCircle,
  Camera,
  ArrowRight,
  FlaskConical,
} from "lucide-react";

type Lang = "it" | "en";

// Numero WhatsApp ufficiale (formato internazionale, solo cifre).
const WHATSAPP_NUMBER = "393470914731";

type AnswerKey =
  | "base"
  | "riflesso"
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
    title: {
      it: "Colore naturale dei tuoi capelli",
      en: "Your natural hair color",
    },
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
    id: "riflesso",
    type: "choice",
    title: { it: "Riflesso naturale", en: "Natural reflection" },
    help: {
      it: "Come percepisci il riflesso dei tuoi capelli alla luce? (facoltativo)",
      en: "How do you perceive your hair's reflection in the light? (optional)",
    },
    options: [
      { id: "freddo-cenere", it: "Freddo / Cenere", en: "Cool / Ash" },
      { id: "naturale", it: "Naturale / Neutro", en: "Natural / Neutral" },
      { id: "dorato", it: "Dorato", en: "Golden" },
      { id: "ramato", it: "Ramato", en: "Coppery" },
      { id: "rosso", it: "Rosso", en: "Red" },
      { id: "non-so", it: "Non lo so", en: "I don't know" },
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
      { id: "castano-freddo", it: "Castano freddo", en: "Cool brown" },
      { id: "nocciola", it: "Nocciola", en: "Hazel" },
      { id: "nocciola-freddo", it: "Nocciola freddo", en: "Cool hazel" },
      { id: "rame", it: "Rame", en: "Copper" },
      { id: "rosso", it: "Rosso", en: "Red" },
      { id: "biondo-caldo", it: "Biondo caldo", en: "Warm blonde" },
      { id: "biondo-freddo", it: "Biondo freddo", en: "Cool blonde" },
    ],
  },
  { id: "foto", type: "photo" },
];

// Sezione di appartenenza di ogni schermata (per percezione "diagnosi", non "quiz").
const SECTION: Record<AnswerKey, "profilo" | "obiettivo"> = {
  base: "profilo",
  riflesso: "profilo",
  bianchiPerc: "profilo",
  bianchiDistribuzione: "profilo",
  porosita: "profilo",
  struttura: "profilo",
  cute: "profilo",
  storico: "profilo",
  intento: "obiettivo",
  tonalita: "obiettivo",
};

const T = {
  it: {
    kicker: "Scaramuzzo",
    heroTitle: "Botanical Color Experience",
    heroSubtitle:
      "Analizza il tuo profilo colore, la storia dei tuoi capelli e ricevi una valutazione professionale per il tuo percorso botanico personalizzato.",
    heroCta: "Inizia la diagnosi",
    stepLabel: "Passaggio",
    of: "di",
    back: "Indietro",
    restart: "Ricomincia",
    sections: { profilo: "Profilo Capello", obiettivo: "Obiettivo Colore" },
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
    resultKicker: "Botanical Color Experience",
    resultTitle: "La tua Carta Professionale Botanica",
    cardHolder: "Scaramuzzo Hair Natural Beauty",
    colorProfileTitle: "Profilo colore",
    objectiveTitle: "Obiettivo",
    expectedTitle: "Risultato atteso",
    complexityTitle: "Livello di complessità",
    complexityLevels: { basso: "Basso", medio: "Medio", alto: "Alto" },
    strandTitle: "Prova ciocca",
    strandRecommended: "Consigliata",
    strandStrong: "Fortemente consigliata",
    finalTitle: "Valutazione finale",
    finalText:
      "La formula definitiva viene confermata dopo valutazione fotografica e consulenza professionale.",
    notesTitle: "Note professionali",
    intentLabel: "Intento",
    toneLabel: "Tonalità desiderata",
    strand: {
      title: "Perché consigliamo sempre una prova ciocca",
      text: "Ogni capello ha una storia diversa. La prova ciocca verifica copertura, riflesso e compatibilità prima della formula definitiva.",
    },
    // labels profilo
    labels: {
      base: "Colore naturale",
      riflesso: "Riflesso naturale",
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
    refLabel: "Riferimento consulenza",
    refUnavailable: "Riferimento non disponibile",
    // whatsapp
    waGreeting: "Buongiorno,",
    waIntro: "ho completato la Botanical Color Experience sul sito.",
    waRef: "Riferimento consulenza",
    waProfile: "Profilo:",
    waObjective: "Obiettivo:",
    waComplexity: "Livello di complessità:",
    waStrand: "Prova ciocca:",
    waRequest: "Desidero una consulenza Botanical Color Experience.",
    waFinalRequest:
      "Richiedo la valutazione finale dopo analisi fotografica e consulenza professionale.",
    waClosing: "Allego le foto (radice, lunghezze, nuca).",
  },
  en: {
    kicker: "Scaramuzzo",
    heroTitle: "Botanical Color Experience",
    heroSubtitle:
      "Analyse your color profile, your hair history and receive a professional assessment for your personalized botanical journey.",
    heroCta: "Start the diagnosis",
    stepLabel: "Step",
    of: "of",
    back: "Back",
    restart: "Restart",
    sections: { profilo: "Hair Profile", obiettivo: "Color Objective" },
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
    resultKicker: "Botanical Color Experience",
    resultTitle: "Your Professional Botanical Chart",
    cardHolder: "Scaramuzzo Hair Natural Beauty",
    colorProfileTitle: "Color profile",
    objectiveTitle: "Objective",
    expectedTitle: "Expected result",
    complexityTitle: "Complexity level",
    complexityLevels: { basso: "Low", medio: "Medium", alto: "High" },
    strandTitle: "Strand test",
    strandRecommended: "Recommended",
    strandStrong: "Strongly recommended",
    finalTitle: "Final assessment",
    finalText:
      "The final formula is confirmed after photo evaluation and professional consultation.",
    notesTitle: "Professional notes",
    intentLabel: "Intent",
    toneLabel: "Desired tone",
    strand: {
      title: "Why we always recommend a strand test",
      text: "Every hair has a different history. A strand test verifies coverage, reflection and compatibility before the final formula.",
    },
    labels: {
      base: "Natural color",
      riflesso: "Natural reflection",
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
    refLabel: "Consultation reference",
    refUnavailable: "Reference unavailable",
    waGreeting: "Hello,",
    waIntro: "I completed the Botanical Color Experience on the website.",
    waRef: "Consultation reference",
    waProfile: "Profile:",
    waObjective: "Objective:",
    waComplexity: "Complexity level:",
    waStrand: "Strand test:",
    waRequest: "I'd like a Botanical Color Experience consultation.",
    waFinalRequest:
      "I'm requesting the final assessment after photo analysis and professional consultation.",
    waClosing: "I'm attaching the photos (roots, lengths, nape).",
  },
};

// Livello di complessità — stima prudente dal profilo, nessuna formula.
type Complexity = "basso" | "medio" | "alto";
function buildComplexity(a: Answers): Complexity {
  const high =
    a.bianchiPerc === "50-75" ||
    a.bianchiPerc === "gt75" ||
    a.storico === "decolorazione" ||
    a.porosita === "alta" ||
    a.tonalita === "biondo-freddo" ||
    a.intento === "cambio-tono";
  if (high) return "alto";

  const medium =
    a.bianchiPerc === "25-50" ||
    a.porosita === "media" ||
    a.storico === "colore" ||
    a.storico === "henne-erbe";
  if (medium) return "medio";

  return "basso";
}

// Unione elenco con virgole e congiunzione finale ("a, b e c").
function listJoin(items: string[], lang: Lang): string {
  if (items.length <= 1) return items[0] ?? "";
  const conj = lang === "it" ? " e " : " and ";
  return items.slice(0, -1).join(", ") + conj + items[items.length - 1];
}

// Valutazione preliminare qualitativa — composta dai dati raccolti, mai una formula.
function buildAssessment(a: Answers, lang: Lang): string {
  const isIT = lang === "it";
  const focuses: string[] = [];

  const greyRelevant =
    !!a.bianchiPerc &&
    a.bianchiPerc !== "0" &&
    (a.intento === "copertura" ||
      ["25-50", "50-75", "gt75"].includes(a.bianchiPerc));
  if (greyRelevant) {
    focuses.push(isIT ? "la copertura dei capelli bianchi" : "grey hair coverage");
  }
  if (a.porosita === "alta" || a.porosita === "media") {
    focuses.push(
      isIT ? "la porosità delle lunghezze" : "the porosity of the lengths"
    );
  }
  if (
    a.storico === "decolorazione" ||
    a.storico === "henne-erbe" ||
    a.storico === "stiratura"
  ) {
    focuses.push(
      isIT
        ? "la compatibilità con lo storico tecnico"
        : "compatibility with the technical history"
    );
  }
  if (focuses.length === 0) {
    focuses.push(
      isIT
        ? "l'equilibrio tra base naturale e tonalità desiderata"
        : "the balance between the natural base and the desired tone"
    );
  }

  const joined = listJoin(focuses, lang);
  return isIT
    ? `Il profilo rilevato suggerisce una valutazione approfondita di ${joined}.`
    : `The detected profile suggests an in-depth assessment of ${joined}.`;
}

// Note professionali qualitative — nessun prodotto, nessun ingrediente, nessuna formula.
function buildNotes(a: Answers, lang: Lang): string[] {
  const isIT = lang === "it";
  const notes: string[] = [];

  if (a.storico === "henne-erbe") {
    notes.push(
      isIT
        ? "Lo storico con henné o erbe richiede una prova ciocca per verificare la compatibilità con il nuovo trattamento."
        : "A history of henna or herbs requires a strand test to verify compatibility with the new treatment."
    );
  }
  if (a.storico === "decolorazione") {
    notes.push(
      isIT
        ? "La presenza di decolorazione richiede attenzione alla porosità e alla tenuta del riflesso."
        : "Previous bleaching requires attention to porosity and reflection retention."
    );
  }
  if (a.porosita === "alta") {
    notes.push(
      isIT
        ? "Una porosità alta può assorbire il colore più rapidamente: la prova ciocca aiuta a calibrare i tempi."
        : "High porosity can absorb color more quickly: a strand test helps calibrate the timing."
    );
  }
  if (a.bianchiPerc === "50-75" || a.bianchiPerc === "gt75") {
    notes.push(
      isIT
        ? "Una percentuale elevata di capelli bianchi richiede una base di copertura ben strutturata."
        : "A high percentage of grey hair requires a well-structured coverage base."
    );
  }
  if (a.cute === "sensibile") {
    notes.push(
      isIT
        ? "La cute sensibile orienta verso un approccio delicato e una valutazione preliminare attenta."
        : "A sensitive scalp points toward a gentle approach and a careful preliminary assessment."
    );
  }
  if (notes.length === 0) {
    notes.push(
      isIT
        ? "Il profilo non evidenzia criticità particolari: la valutazione finale confermerà la strategia di colore più adatta."
        : "The profile shows no particular concerns: the final assessment will confirm the most suitable color strategy."
    );
  }

  return notes.slice(0, 3);
}

function answersFingerprint(answers: Answers): string {
  return JSON.stringify(answers);
}

function crmRefStorageKey(fingerprint: string): string {
  return `bce-crm-ref-${fingerprint}`;
}

function crmLockStorageKey(fingerprint: string): string {
  return `bce-crm-lock-${fingerprint}`;
}

export default function DiagnosiClient() {
  const [language, setLanguage] = useState<Lang>("it");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [publicRef, setPublicRef] = useState<string | null>(null);
  const [refUnavailable, setRefUnavailable] = useState(false);
  const savedFingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("language") as Lang | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

  useEffect(() => {
    if (!showResults) return;

    const fingerprint = answersFingerprint(answers);
    const refKey = crmRefStorageKey(fingerprint);
    const lockKey = crmLockStorageKey(fingerprint);

    const cachedRef = sessionStorage.getItem(refKey);
    if (cachedRef) {
      setPublicRef(cachedRef);
      setRefUnavailable(false);
      savedFingerprintRef.current = fingerprint;
      return;
    }

    if (savedFingerprintRef.current === fingerprint) return;

    const lock = sessionStorage.getItem(lockKey);
    if (lock === "pending") return;

    sessionStorage.setItem(lockKey, "pending");
    savedFingerprintRef.current = fingerprint;

    const complexity = buildComplexity(answers);
    const strandTest =
      complexity === "alto"
        ? T[language].strandStrong
        : T[language].strandRecommended;
    const assessment = buildAssessment(answers, language);
    const notes = buildNotes(answers, language);

    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "botanical_color",
            source: "botanical_experience",
            language,
            payload: {
              answers: { ...answers },
              complexity,
              strandTest,
              assessment,
              notes,
            },
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
          savedFingerprintRef.current = null;
          setRefUnavailable(true);
        }
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem(lockKey);
          savedFingerprintRef.current = null;
          setRefUnavailable(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [showResults, answers, language]);

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
    setPublicRef(null);
    setRefUnavailable(false);
    savedFingerprintRef.current = null;
  };

  const waHref = (ref: string | null) => {
    const profileKeys: AnswerKey[] = [
      "base",
      "riflesso",
      "bianchiPerc",
      "bianchiDistribuzione",
      "porosita",
      "struttura",
      "cute",
      "storico",
    ];
    const complexity = buildComplexity(answers);
    const strandLabel =
      complexity === "alto" ? t.strandStrong : t.strandRecommended;
    const lines = [
      t.waGreeting,
      "",
      t.waIntro,
      "",
      ...(ref ? [`${t.waRef}: ${ref}`, ""] : []),
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
      `${t.waComplexity} ${t.complexityLevels[complexity]}`,
      `${t.waStrand} ${strandLabel}`,
      "",
      t.waRequest,
      t.waFinalRequest,
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
    const colorProfileKeys: AnswerKey[] = [
      "base",
      "riflesso",
      "bianchiPerc",
      "porosita",
    ];
    const assessment = buildAssessment(answers, language);
    const notes = buildNotes(answers, language);
    const complexity = buildComplexity(answers);
    const strandLabel =
      complexity === "alto" ? t.strandStrong : t.strandRecommended;

    return (
      <div className="bg-background text-foreground">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                {t.resultKicker}
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                {t.resultTitle}
              </h1>
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
              onClick={restart}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">{t.restart}</span>
            </button>
          </div>

          {/* CARTA PROFESSIONALE BOTANICA */}
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-accent/30 bg-card/40 shadow-xl">
            {/* intestazione certificato */}
            <div className="flex items-center gap-3 border-b border-border/40 bg-gradient-to-br from-accent/10 to-transparent px-6 py-5 sm:px-10">
              <FlaskConical className="h-6 w-6 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold tracking-wide">
                  {t.cardHolder}
                </p>
                <p className="text-xs text-muted-foreground">{t.resultKicker}</p>
              </div>
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
              {/* 1 + 2 — profilo colore + obiettivo */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {t.colorProfileTitle}
                  </p>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    {colorProfileKeys
                      .filter((k) => answers[k])
                      .map((k) => (
                        <div key={k} className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">
                            {t.labels[k]}
                          </dt>
                          <dd className="text-right font-medium">
                            {optionLabel(k)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {t.objectiveTitle}
                  </p>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{t.intentLabel}</dt>
                      <dd className="text-right font-medium">
                        {optionLabel("intento")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{t.toneLabel}</dt>
                      <dd className="text-right font-medium">
                        {optionLabel("tonalita")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="h-px bg-border/40" />

              {/* 3 — risultato atteso */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {t.expectedTitle}
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground/90">
                  {assessment}
                </p>
              </div>

              {/* 4 + 5 — complessità + prova ciocca */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/40 bg-background/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {t.complexityTitle}
                  </p>
                  <span
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                      complexity === "alto"
                        ? "bg-accent text-accent-foreground"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {t.complexityLevels[complexity]}
                  </span>
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {t.strandTitle}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                    <FlaskConical className="h-4 w-4" />
                    {strandLabel}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {t.strand.text}
                  </p>
                </div>
              </div>

              {/* 6 — note professionali */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {t.notesTitle}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {notes.map((n, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-border/40" />

              {/* valutazione finale */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {t.finalTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.finalText}
                </p>
              </div>
            </div>
          </div>

          {/* CONSULENZA FINALE */}
          <div className="mt-10 rounded-3xl border border-accent/30 bg-gradient-to-br from-card to-card/40 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.consultTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.consultText}
            </p>
            <a
              href={waHref(publicRef)}
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.sections[SECTION[current.id]]}
            </p>
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
