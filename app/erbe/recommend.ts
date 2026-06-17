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

/** Motivi verificati — legati al prodotto reale in catalogo, non claim generici */
const PRODUCT_REASON: Record<string, { it: string; en: string }> = {
  "shampoo-purificante-seboregolatore": {
    it: "Formula purificante del catalogo, pensata per cute grassa.",
    en: "Purifying formula from our catalogue, designed for oily scalp.",
  },
  "shampoo-emolliente": {
    it: "Detersione delicata del catalogo, pensata per cute sensibile.",
    en: "Gentle cleansing formula from our catalogue, designed for sensitive scalp.",
  },
  "shampoo-rigenerante-bergamotto": {
    it: "Shampoo ristrutturante del catalogo, pensato per cute secca o capelli che richiedono nutrimento.",
    en: "Restructuring shampoo from our catalogue, designed for dry scalp or hair needing nourishment.",
  },
  "shampoo-energizzante": {
    it: "Shampoo stimolante del catalogo, pensato per rinforzo e volume.",
    en: "Stimulating shampoo from our catalogue, designed for strength and volume.",
  },
  "shampoo-riflessante-henne": {
    it: "Shampoo riflessante del catalogo, pensato per lucentezza e riflessi.",
    en: "Reflective shampoo from our catalogue, designed for shine and reflection.",
  },
  "maschera-nutriente-oliva": {
    it: "Maschera nutriente del catalogo, pensata per idratazione e nutrimento delle lunghezze.",
    en: "Nourishing mask from our catalogue, designed to hydrate and nourish lengths.",
  },
  "maschera-riflessante-henne": {
    it: "Maschera riflessante del catalogo, pensata per lucentezza sulle lunghezze.",
    en: "Reflective mask from our catalogue, designed for shine along the lengths.",
  },
  "maschera-ristrutturante-bergamotto": {
    it: "Maschera ristrutturante del catalogo, pensata per lunghezze che necessitano riparazione.",
    en: "Restructuring mask from our catalogue, designed for lengths needing repair.",
  },
  "lozione-anticaduta": {
    it: "Trattamento anticaduta del catalogo, pensato come supporto intensivo.",
    en: "Anti-hair-loss treatment from our catalogue, designed as intensive support.",
  },
  "styling-cream-curl": {
    it: "Crema modellante del catalogo, pensata per definire ricci e mossi.",
    en: "Styling cream from our catalogue, designed to define curls and waves.",
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

function productReason(productId: string, lang: Lang): string {
  const copy = PRODUCT_REASON[productId];
  if (copy) return copy[lang];
  return lang === "it"
    ? "Prodotto selezionato dal catalogo Scaramuzzo."
    : "Product selected from the Scaramuzzo catalogue.";
}

type RoutineSpec = {
  shampooId: string;
  maskId: string;
  third?: { id: string; kind: Reco["kind"] };
};

const CURLY: Capello[] = ["ricci", "molto-ricci"];

/**
 * Routine catalogo ammessa solo con match forte e prodotti realmente coerenti.
 * Nessun fallback generico: null → customOnly.
 */
function resolveCatalogRoutine(a: QuizAnswers): RoutineSpec | null {
  if (a.intensita === "intensa") return null;

  if (
    a.obiettivo === "definizione-ricci" &&
    !CURLY.includes(a.capello)
  ) {
    return null;
  }

  if (a.cute === "secca" && a.obiettivo === "purificazione") return null;
  if (a.cute === "grassa" && a.obiettivo === "purificazione") {
    return {
      shampooId: "shampoo-purificante-seboregolatore",
      maskId: "maschera-ristrutturante-bergamotto",
    };
  }
  if (
    a.cute === "grassa" &&
    ["nutrizione", "idratazione", "lucentezza", "volume", "anticaduta"].includes(
      a.obiettivo
    )
  ) {
    return null;
  }
  if (
    a.cute === "sensibile" &&
    [
      "anticaduta",
      "volume",
      "purificazione",
      "lucentezza",
      "definizione-ricci",
    ].includes(a.obiettivo)
  ) {
    return null;
  }
  if (
    a.cute === "grassa" &&
    a.capello === "molto-ricci" &&
    a.obiettivo === "definizione-ricci"
  ) {
    return null;
  }
  if (a.capello === "molto-ricci" && a.cute === "sensibile") return null;
  if (a.capello === "molto-ricci" && a.obiettivo === "anticaduta") return null;

  switch (a.obiettivo) {
    case "purificazione":
      return null;

    case "nutrizione":
    case "idratazione":
      if (a.cute === "secca") {
        return {
          shampooId: "shampoo-rigenerante-bergamotto",
          maskId: "maschera-nutriente-oliva",
        };
      }
      if (a.cute === "sensibile") {
        return {
          shampooId: "shampoo-emolliente",
          maskId: "maschera-nutriente-oliva",
        };
      }
      if (a.cute === "normale") {
        return {
          shampooId: "shampoo-rigenerante-bergamotto",
          maskId: "maschera-nutriente-oliva",
        };
      }
      return null;

    case "lucentezza":
      if (a.cute === "secca" || a.cute === "normale") {
        return {
          shampooId: "shampoo-riflessante-henne",
          maskId: "maschera-riflessante-henne",
        };
      }
      return null;

    case "volume":
      if (a.cute === "normale" && !CURLY.includes(a.capello)) {
        return {
          shampooId: "shampoo-energizzante",
          maskId: "maschera-ristrutturante-bergamotto",
        };
      }
      return null;

    case "anticaduta":
      if (a.cute === "normale" || a.cute === "grassa") {
        return {
          shampooId: "shampoo-energizzante",
          maskId: "maschera-ristrutturante-bergamotto",
          third: { id: "lozione-anticaduta", kind: "trattamento" },
        };
      }
      return null;

    case "definizione-ricci":
      if (!CURLY.includes(a.capello)) return null;
      if (a.cute === "normale" || a.cute === "secca") {
        return {
          shampooId: "shampoo-rigenerante-bergamotto",
          maskId: "maschera-nutriente-oliva",
          third: { id: "styling-cream-curl", kind: "styling" },
        };
      }
      return null;

    default:
      return null;
  }
}

function buildCustomReason(a: QuizAnswers, lang: Lang): string {
  const isIT = lang === "it";
  const reasons: string[] = [];

  if (a.intensita === "intensa") {
    reasons.push(
      isIT
        ? "La profumazione intensa non è gestibile con una routine pronta del catalogo."
        : "Intense fragrance cannot be covered by a ready-made catalogue routine."
    );
  }

  if (a.obiettivo === "definizione-ricci" && !CURLY.includes(a.capello)) {
    reasons.push(
      isIT
        ? "L'obiettivo definizione ricci su capelli lisci o mossi richiede una valutazione personalizzata."
        : "Curl definition on straight or wavy hair requires a personalized assessment."
    );
  }

  if (a.cute === "secca" && a.obiettivo === "purificazione") {
    reasons.push(
      isIT
        ? "Cute secca con obiettivo purificazione richiede una valutazione per non stressare capello e cute."
        : "Dry scalp with a purification goal requires assessment to avoid stressing hair and scalp."
    );
  }

  if (
    a.cute === "grassa" &&
    ["nutrizione", "idratazione", "lucentezza"].includes(a.obiettivo)
  ) {
    reasons.push(
      isIT
        ? "Cute grassa con questo obiettivo richiede un equilibrio non coperto da una routine standard del catalogo."
        : "Oily scalp with this goal needs a balance not covered by a standard catalogue routine."
    );
  }

  if (a.cute === "sensibile" && a.obiettivo === "anticaduta") {
    reasons.push(
      isIT
        ? "Cute sensibile con obiettivo anticaduta richiede una valutazione personalizzata."
        : "Sensitive scalp with an anti-hair-loss goal requires a personalized assessment."
    );
  }

  if (a.cute === "sensibile" && a.obiettivo === "volume") {
    reasons.push(
      isIT
        ? "Cute sensibile con obiettivo volume richiede prodotti calibrati professionalmente."
        : "Sensitive scalp with a volume goal requires professionally calibrated products."
    );
  }

  if (a.cute === "sensibile" && a.obiettivo === "definizione-ricci") {
    reasons.push(
      isIT
        ? "Cute sensibile con obiettivo definizione ricci richiede prodotti calibrati professionalmente."
        : "Sensitive scalp with curl definition goal requires professionally calibrated products."
    );
  }

  if (
    a.cute === "grassa" &&
    a.capello === "molto-ricci" &&
    a.obiettivo === "definizione-ricci"
  ) {
    reasons.push(
      isIT
        ? "Cute grassa, capelli molto ricci e definizione ricci richiedono un equilibrio su misura."
        : "Oily scalp, very curly hair and curl definition need a tailored balance."
    );
  }

  if (a.capello === "molto-ricci" && a.cute === "sensibile") {
    reasons.push(
      isIT
        ? "Capelli molto ricci con cute sensibile richiedono un approccio delicato e personalizzato."
        : "Very curly hair with a sensitive scalp requires a gentle, personalized approach."
    );
  }

  if (a.capello === "molto-ricci" && a.obiettivo === "anticaduta") {
    reasons.push(
      isIT
        ? "Capelli molto ricci con obiettivo anticaduta richiedono un percorso personalizzato."
        : "Very curly hair with an anti-hair-loss goal requires a personalized journey."
    );
  }

  if (a.obiettivo === "volume" && (a.cute !== "normale" || CURLY.includes(a.capello))) {
    reasons.push(
      isIT
        ? "L'obiettivo volume su questo profilo non è coperto da una routine pronta coerente del catalogo."
        : "The volume goal for this profile is not covered by a coherent ready-made catalogue routine."
    );
  }

  if (a.obiettivo === "purificazione" && a.cute !== "grassa") {
    reasons.push(
      isIT
        ? "L'obiettivo purificazione su questa cute non è coperto da una routine pronta del catalogo."
        : "The purification goal for this scalp type is not covered by a ready-made catalogue routine."
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      isIT
        ? "Il profilo indicato non corrisponde a una routine pronta del catalogo: il Team Scaramuzzo valuterà la soluzione più adatta."
        : "Your profile does not match a ready-made catalogue routine: the Scaramuzzo team will assess the most suitable solution."
    );
  }

  return reasons.join(" ");
}

function buildReco(
  kind: Reco["kind"],
  productId: string,
  lang: Lang
): Reco | null {
  const prod = getProduct(productId, lang);
  if (!prod) return null;

  return {
    kind,
    title: KIND_TITLE[lang][kind],
    productId: prod.id,
    productName: prod.name,
    price: prod.price,
    image: prod.image,
    keyActives: keyActivesFromCatalog(prod.keyActives),
    reason: productReason(prod.id, lang),
  };
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

export interface RecommendResult {
  recommendedProducts: Reco[];
  customOnly: boolean;
  customReason: string;
  customProductLabel: string;
}

export function recommend(a: QuizAnswers, lang: Lang): RecommendResult {
  const customProductLabel =
    lang === "it"
      ? "Routine personalizzata Scaramuzzo"
      : "Scaramuzzo personalized routine";

  const spec = resolveCatalogRoutine(a);
  if (!spec) {
    return {
      recommendedProducts: [],
      customOnly: true,
      customReason: buildCustomReason(a, lang),
      customProductLabel,
    };
  }

  const recos: Reco[] = [];

  const shampoo = buildReco("shampoo", spec.shampooId, lang);
  const mask = buildReco("maschera", spec.maskId, lang);
  if (!shampoo || !mask) {
    return {
      recommendedProducts: [],
      customOnly: true,
      customReason: buildCustomReason(a, lang),
      customProductLabel,
    };
  }

  recos.push(shampoo, mask);

  if (spec.third) {
    const third = buildReco(spec.third.kind, spec.third.id, lang);
    if (!third) {
      return {
        recommendedProducts: [],
        customOnly: true,
        customReason: buildCustomReason(a, lang),
        customProductLabel,
      };
    }
    recos.push(third);
  }

  return {
    recommendedProducts: recos,
    customOnly: false,
    customReason: "",
    customProductLabel: "",
  };
}
