import { productTranslations } from "@/app/products/data";

export type Lang = "it" | "en";

export type Capello = "lisci" | "mossi" | "ricci" | "molto-ricci";
export type Cute = "grassa" | "secca" | "sensibile" | "normale";
export type Obiettivo =
  | "idratazione"
  | "nutrizione"
  | "purificazione"
  | "volume"
  | "lucentezza"
  | "definizione-ricci"
  | "anticaduta";
export type Profumo = "agrumi" | "ambrato" | "muschio" | "fruttato";
export type Intensita = "delicata" | "media" | "intensa";

export interface QuizAnswers {
  capello: Capello;
  cute: Cute;
  obiettivo: Obiettivo;
  profumo: Profumo;
  intensita: Intensita;
}

export interface Reco {
  kind: "shampoo" | "maschera" | "trattamento" | "styling";
  title: string;
  productId: string;
  productName: string;
  price: number;
  image: string;
  /** Attivi principali — solo da catalogo (keyActives), mai inventati */
  keyActives: string[];
  reason: string;
}

const CUTE_LABEL: Record<Lang, Record<Cute, string>> = {
  it: { grassa: "grassa", secca: "secca", sensibile: "sensibile", normale: "normale" },
  en: { grassa: "oily", secca: "dry", sensibile: "sensitive", normale: "normal" },
};

const GOAL_LABEL: Record<Lang, Record<Obiettivo, string>> = {
  it: {
    idratazione: "idratazione",
    nutrizione: "nutrizione",
    purificazione: "purificazione",
    volume: "volume",
    lucentezza: "lucentezza",
    "definizione-ricci": "definizione dei ricci",
    anticaduta: "anticaduta",
  },
  en: {
    idratazione: "hydration",
    nutrizione: "nourishment",
    purificazione: "purification",
    volume: "volume",
    lucentezza: "shine",
    "definizione-ricci": "curl definition",
    anticaduta: "anti-hair-loss",
  },
};

const KIND_TITLE: Record<Lang, Record<Reco["kind"], string>> = {
  it: {
    shampoo: "Shampoo consigliato",
    maschera: "Maschera consigliata",
    trattamento: "Trattamento consigliato",
    styling: "Styling consigliato",
  },
  en: {
    shampoo: "Recommended shampoo",
    maschera: "Recommended mask",
    trattamento: "Recommended treatment",
    styling: "Recommended styling",
  },
};

function getProduct(id: string, lang: Lang) {
  return productTranslations[lang].products.find((p) => p.id === id);
}

/** Estrae attivi dal campo keyActives del catalogo — nulla di inventato */
function keyActivesFromCatalog(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;]/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

function shampooPick(a: QuizAnswers): string {
  if (a.cute === "grassa") return "shampoo-purificante-seboregolatore";
  if (a.cute === "sensibile") return "shampoo-emolliente";
  if (a.cute === "secca") return "shampoo-rigenerante-bergamotto";
  if (a.obiettivo === "anticaduta" || a.obiettivo === "volume")
    return "shampoo-energizzante";
  if (a.obiettivo === "lucentezza") return "shampoo-riflessante-henne";
  return "shampoo-emolliente";
}

function maskPick(a: QuizAnswers): string {
  if (["nutrizione", "idratazione", "definizione-ricci"].includes(a.obiettivo))
    return "maschera-nutriente-oliva";
  if (a.obiettivo === "lucentezza") return "maschera-riflessante-henne";
  return "maschera-ristrutturante-bergamotto";
}

function thirdPick(
  a: QuizAnswers
): { id: string; kind: Reco["kind"] } | null {
  if (a.obiettivo === "anticaduta")
    return { id: "lozione-anticaduta", kind: "trattamento" };
  if (a.capello === "ricci" || a.capello === "molto-ricci")
    return { id: "styling-cream-curl", kind: "styling" };
  return null;
}

function shampooReason(a: QuizAnswers, lang: Lang): string {
  const cute = CUTE_LABEL[lang][a.cute];
  const goal = GOAL_LABEL[lang][a.obiettivo];
  return lang === "it"
    ? `Abbiamo selezionato questo prodotto perché compatibile con cute ${cute} e obiettivo ${goal}.`
    : `We selected this product because it suits a ${cute} scalp and your ${goal} goal.`;
}

function maskReason(a: QuizAnswers, lang: Lang): string {
  const goal = GOAL_LABEL[lang][a.obiettivo];
  return lang === "it"
    ? `Consigliata per sostenere l'obiettivo ${goal} sulle lunghezze.`
    : `Recommended to support your ${goal} goal along the lengths.`;
}

function thirdReason(kind: Reco["kind"], lang: Lang): string {
  if (kind === "trattamento") {
    return lang === "it"
      ? "Trattamento intensivo consigliato per l'obiettivo anticaduta."
      : "Intensive treatment recommended for your anti-hair-loss goal.";
  }
  return lang === "it"
    ? "Prodotto styling consigliato per definire e controllare i ricci."
    : "Styling product recommended to define and control curls.";
}

/**
 * Percorso B — Formula Personalizzata.
 * Restituisce SOLO descrittori di configurazione di alto livello derivati dalle
 * risposte del quiz. Nessun ingrediente / estratto / INCI: solo categoria,
 * base consigliata ed esigenza principale.
 */
export interface CustomFormula {
  baseSuggested: string;
  productCategory: string;
  mainNeed: string;
}

const BASE_BY_CUTE: Record<Lang, Record<Cute, string>> = {
  it: {
    grassa: "Base purificante",
    secca: "Base nutriente",
    sensibile: "Base delicata",
    normale: "Base equilibrata",
  },
  en: {
    grassa: "Purifying base",
    secca: "Nourishing base",
    sensibile: "Gentle base",
    normale: "Balanced base",
  },
};

const CATEGORY_BY_GOAL: Record<Lang, Record<Obiettivo, string>> = {
  it: {
    idratazione: "Shampoo + Maschera idratante",
    nutrizione: "Shampoo + Maschera nutriente",
    purificazione: "Shampoo purificante + Maschera",
    volume: "Shampoo volumizzante + Maschera",
    lucentezza: "Shampoo + Maschera illuminante",
    "definizione-ricci": "Detersione + Styling ricci",
    anticaduta: "Shampoo + Trattamento anticaduta",
  },
  en: {
    idratazione: "Shampoo + Hydrating mask",
    nutrizione: "Shampoo + Nourishing mask",
    purificazione: "Purifying shampoo + Mask",
    volume: "Volumizing shampoo + Mask",
    lucentezza: "Shampoo + Illuminating mask",
    "definizione-ricci": "Cleansing + Curl styling",
    anticaduta: "Shampoo + Anti-hair-loss treatment",
  },
};

export function customFormula(a: QuizAnswers, lang: Lang): CustomFormula {
  return {
    baseSuggested: BASE_BY_CUTE[lang][a.cute],
    productCategory: CATEGORY_BY_GOAL[lang][a.obiettivo],
    mainNeed: GOAL_LABEL[lang][a.obiettivo],
  };
}

export function recommend(a: QuizAnswers, lang: Lang): Reco[] {
  const recos: Reco[] = [];

  const shProd = getProduct(shampooPick(a), lang);
  if (shProd) {
    recos.push({
      kind: "shampoo",
      title: KIND_TITLE[lang].shampoo,
      productId: shProd.id,
      productName: shProd.name,
      price: shProd.price,
      image: shProd.image,
      keyActives: keyActivesFromCatalog(shProd.keyActives),
      reason: shampooReason(a, lang),
    });
  }

  const mkProd = getProduct(maskPick(a), lang);
  if (mkProd) {
    recos.push({
      kind: "maschera",
      title: KIND_TITLE[lang].maschera,
      productId: mkProd.id,
      productName: mkProd.name,
      price: mkProd.price,
      image: mkProd.image,
      keyActives: keyActivesFromCatalog(mkProd.keyActives),
      reason: maskReason(a, lang),
    });
  }

  const th = thirdPick(a);
  if (th) {
    const thProd = getProduct(th.id, lang);
    if (thProd) {
      recos.push({
        kind: th.kind,
        title: KIND_TITLE[lang][th.kind],
        productId: thProd.id,
        productName: thProd.name,
        price: thProd.price,
        image: thProd.image,
        keyActives: keyActivesFromCatalog(thProd.keyActives),
        reason: thirdReason(th.kind, lang),
      });
    }
  }

  return recos;
}
