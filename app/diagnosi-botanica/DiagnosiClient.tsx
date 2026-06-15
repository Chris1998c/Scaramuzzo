"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/components/site/LanguageProvider";
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
const WHATSAPP_NUMBER = "393920655925";

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

interface ContactScreen {
  id: "dati";
  type: "contact";
}

type Screen = ChoiceScreen | PhotoScreen | ContactScreen;

const AGE_RANGES = ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"] as const;

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
  { id: "dati", type: "contact" },
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
    processKicker: "Pre-consulenza professionale",
    processTitle: "Cosa succede dopo la diagnosi?",
    processText:
      "Dopo l’invio, il team tecnico Scaramuzzo valuta il profilo colore, la presenza di capelli bianchi, la porosità e lo storico tecnico per orientare la consulenza botanica più adatta.",
    processSteps: [
      "Compili il profilo colore",
      "Il team Scaramuzzo valuta le informazioni",
      "Ricevi una prima indicazione professionale",
      "Se necessario, prosegui su WhatsApp con il Centro Consulenze",
    ],
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
    photoContinue: "Continua",
    contactKicker: "Ultimo passaggio",
    contactTitle: "I tuoi dati",
    contactIntro:
      "Inseriscili per ricevere la tua valutazione personalizzata e completare la consulenza.",
    nameLabel: "Nome e Cognome",
    namePlaceholder: "Es. Mario Rossi",
    phoneLabel: "Numero WhatsApp",
    phonePlaceholder: "Es. +39 347 0000000",
    ageLabel: "Fascia d’età",
    contactError:
      "Controlla i dati: nome (min. 2 caratteri), WhatsApp valido e fascia d’età.",
    contactSubmit: "Vai al risultato",
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
    synthesisTitle: "Sintesi professionale",
    technicalProfileTitle: "Profilo tecnico rilevato",
    indicationsTitle: "Indicazioni prima della consulenza",
    clientLabel: "Cliente",
    indications: [
      "Allegare foto di radice, lunghezze e nuca in luce naturale.",
      "Non effettuare nuovi trattamenti prima della valutazione professionale.",
      "Attendere la conferma del team Scaramuzzo prima di procedere.",
    ],
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
    resultSavedNote:
      "La tua diagnosi viene salvata nel Centro Consulenze Scaramuzzo e può essere seguita dal nostro team.",
    // whatsapp
    waGreeting: "Buongiorno,",
    waIntro: "ho completato la Botanical Color Experience sul sito.",
    waName: "Nome",
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
    processKicker: "Professional pre-consultation",
    processTitle: "What happens after the diagnosis?",
    processText:
      "After submission, the Scaramuzzo technical team evaluates your color profile, grey hair, porosity and technical history to guide the most suitable botanical consultation.",
    processSteps: [
      "You complete your color profile",
      "The Scaramuzzo team reviews your information",
      "You receive a preliminary professional indication",
      "If needed, continue on WhatsApp with the Consultation Centre",
    ],
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
    photoContinue: "Continue",
    contactKicker: "Last step",
    contactTitle: "Your details",
    contactIntro:
      "Enter them to receive your personalized assessment and complete the consultation.",
    nameLabel: "Full name",
    namePlaceholder: "E.g. Mario Rossi",
    phoneLabel: "WhatsApp number",
    phonePlaceholder: "E.g. +39 347 0000000",
    ageLabel: "Age range",
    contactError:
      "Check your details: name (min. 2 chars), valid WhatsApp and age range.",
    contactSubmit: "Go to result",
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
    synthesisTitle: "Professional summary",
    technicalProfileTitle: "Detected technical profile",
    indicationsTitle: "Before your consultation",
    clientLabel: "Client",
    indications: [
      "Attach photos of roots, lengths and nape in natural light.",
      "Do not perform new treatments before the professional assessment.",
      "Wait for confirmation from the Scaramuzzo team before proceeding.",
    ],
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
    resultSavedNote:
      "Your diagnosis is saved in the Scaramuzzo Consultation Centre and can be followed up by our team.",
    waGreeting: "Hello,",
    waIntro: "I completed the Botanical Color Experience on the website.",
    waName: "Name",
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

// Applica la contrazione di + articolo (di la → della, di l' → dell', …).
function applyItalianDi(phrase: string): string {
  const s = phrase.trim();
  if (s.startsWith("l'")) return "dell'" + s.slice(2);
  if (s.startsWith("la ")) return "della " + s.slice(3);
  if (s.startsWith("le ")) return "delle " + s.slice(3);
  if (s.startsWith("lo ")) return "dello " + s.slice(3);
  if (s.startsWith("il ")) return "del " + s.slice(3);
  if (s.startsWith("i ")) return "dei " + s.slice(2);
  return "di " + s;
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

  const joined = isIT
    ? listJoin(focuses.map(applyItalianDi), lang)
    : listJoin(focuses, lang);
  return isIT
    ? `Il profilo rilevato suggerisce una valutazione approfondita ${joined}.`
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
  const { language } = useLanguage();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [publicRef, setPublicRef] = useState<string | null>(null);
  const [refUnavailable, setRefUnavailable] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [contactError, setContactError] = useState(false);
  const savedFingerprintRef = useRef<string | null>(null);

  const isContactValid =
    customerName.trim().length >= 2 &&
    customerPhone.replace(/\D/g, "").length >= 8 &&
    /^[+\d][\d\s().-]*$/.test(customerPhone.trim()) &&
    ageRange.length > 0;

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
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim(),
            payload: {
              answers: { ...answers },
              ageRange,
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
  }, [showResults, answers, language, customerName, customerPhone, ageRange]);

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
    setCustomerName("");
    setCustomerPhone("");
    setAgeRange("");
    setContactError(false);
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
      ...(customerName.trim() ? [`${t.waName}: ${customerName.trim()}`] : []),
      ...(ref ? [`${t.waRef}: ${ref}`] : []),
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
        <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden sm:min-h-[60vh]">
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
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <div className="rounded-3xl border border-border/40 bg-card/40 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.processKicker}
            </p>
            <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
              {t.processTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.processText}
            </p>
            <ol className="mt-8 space-y-0">
              {t.processSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 border-b border-border/30 py-4 last:border-0 last:pb-0 first:pt-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <button
              onClick={() => setStarted(true)}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 sm:w-auto"
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
    const technicalProfileKeys: AnswerKey[] = [
      "base",
      "riflesso",
      "bianchiPerc",
      ...(answers.bianchiPerc && answers.bianchiPerc !== "0"
        ? (["bianchiDistribuzione"] as AnswerKey[])
        : []),
      "porosita",
      "storico",
    ];
    const assessment = buildAssessment(answers, language);
    const notes = buildNotes(answers, language);
    const complexity = buildComplexity(answers);
    const strandLabel =
      complexity === "alto" ? t.strandStrong : t.strandRecommended;
    const clientName = customerName.trim();

    const profileRow = (key: AnswerKey) =>
      answers[key] ? (
        <div
          key={key}
          className="flex items-start justify-between gap-4 border-b border-border/30 py-3 last:border-0"
        >
          <dt className="text-sm text-muted-foreground">{t.labels[key]}</dt>
          <dd className="max-w-[55%] text-right text-sm font-medium leading-snug">
            {optionLabel(key)}
          </dd>
        </div>
      ) : null;

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
            </div>
            <button
              onClick={restart}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">{t.restart}</span>
            </button>
          </div>

          {/* CARTA PROFESSIONALE BOTANICA — documento premium */}
          <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-accent/25 bg-card/50 shadow-2xl">
            {/* barra oro superiore */}
            <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

            {/* header certificato */}
            <div className="border-b border-border/40 bg-gradient-to-b from-accent/[0.08] to-transparent px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
                {t.cardHolder}
              </p>
              <p className="mt-3 font-serif text-xl font-medium tracking-wide text-foreground sm:text-2xl">
                {t.resultKicker}
              </p>
              <div className="mx-auto mt-6 max-w-md space-y-2 border-y border-border/30 py-4">
                {(publicRef || refUnavailable) && (
                  <p className="text-sm text-muted-foreground">
                    {t.refLabel}
                    <br />
                    <span className="mt-1 inline-block font-mono text-base font-semibold tracking-wide text-accent">
                      {publicRef ?? t.refUnavailable}
                    </span>
                  </p>
                )}
                {clientName && (
                  <p className="text-sm text-muted-foreground">
                    {t.clientLabel}
                    <br />
                    <span className="mt-1 inline-block text-base font-semibold text-foreground">
                      {clientName}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
              <p className="rounded-xl border border-border/40 bg-background/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {t.resultSavedNote}
              </p>

              {/* 1 — Sintesi professionale */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {t.synthesisTitle}
                </p>
                <div className="mt-5 space-y-5 rounded-2xl border border-border/40 bg-background/30 p-5 sm:p-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.expectedTitle}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-foreground/90">
                      {assessment}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 border-t border-border/30 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {t.complexityTitle}
                      </p>
                      <span
                        className={`mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                          complexity === "alto"
                            ? "bg-accent text-accent-foreground"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {t.complexityLevels[complexity]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {t.strandTitle}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                        <FlaskConical className="h-4 w-4" />
                        {strandLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2 — Profilo tecnico rilevato */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {t.technicalProfileTitle}
                </p>
                <dl className="mt-5 rounded-2xl border border-border/40 bg-background/20 px-5 sm:px-6">
                  {technicalProfileKeys.map((k) => profileRow(k))}
                </dl>
              </section>

              {/* Obiettivo colore */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {t.objectiveTitle}
                </p>
                <dl className="mt-5 rounded-2xl border border-border/40 bg-background/20 px-5 sm:px-6">
                  <div className="flex items-start justify-between gap-4 border-b border-border/30 py-3">
                    <dt className="text-sm text-muted-foreground">
                      {t.intentLabel}
                    </dt>
                    <dd className="max-w-[55%] text-right text-sm font-medium">
                      {optionLabel("intento")}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-sm text-muted-foreground">
                      {t.toneLabel}
                    </dt>
                    <dd className="max-w-[55%] text-right text-sm font-medium">
                      {optionLabel("tonalita")}
                    </dd>
                  </div>
                </dl>
              </section>

              {/* Note professionali */}
              {notes.length > 0 && (
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                    {t.notesTitle}
                  </p>
                  <ul className="mt-5 space-y-3 rounded-2xl border border-border/40 bg-background/20 p-5 sm:p-6">
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
                </section>
              )}

              {/* 3 — Indicazioni prima della consulenza */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {t.indicationsTitle}
                </p>
                <ul className="mt-5 space-y-0 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 sm:p-6">
                  {t.indications.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-border/20 py-4 last:border-0 last:pb-0 first:pt-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-background/60 text-xs font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-foreground/85">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Valutazione finale */}
              <div className="rounded-2xl border border-dashed border-border/50 bg-background/10 px-5 py-4 sm:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {t.finalTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.finalText}
                </p>
              </div>
            </div>

            {/* footer documento */}
            <div className="border-t border-border/40 bg-background/20 px-6 py-4 text-center sm:px-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {t.cardHolder}
              </p>
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
        ) : current.type === "photo" ? (
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
              onClick={() => setStep((s) => s + 1)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md transition hover:bg-neutral-200"
            >
              {t.photoContinue}
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        ) : current.type === "contact" ? (
          // CONTACT SCREEN
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.contactKicker}
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              {t.contactTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t.contactIntro}
            </p>

            <div className="mt-8 max-w-lg space-y-5">
              <div>
                <label
                  htmlFor="customerName"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {t.nameLabel}
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="mt-2 w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-base outline-none transition focus:border-accent/60"
                />
              </div>

              <div>
                <label
                  htmlFor="customerPhone"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {t.phoneLabel}
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  inputMode="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="mt-2 w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-base outline-none transition focus:border-accent/60"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.ageLabel}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {AGE_RANGES.map((range) => {
                    const selected = ageRange === range;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setAgeRange(range)}
                        aria-pressed={selected}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          selected
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border/50 bg-card/40 hover:border-accent/40"
                        }`}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </div>

              {contactError && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {t.contactError}
                </p>
              )}

              <button
                onClick={() => {
                  if (isContactValid) {
                    setContactError(false);
                    setShowResults(true);
                  } else {
                    setContactError(true);
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
              >
                {t.contactSubmit}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : null}

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
