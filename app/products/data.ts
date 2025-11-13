export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  detailedDescription: string;

  // nuovi campi opzionali per layout più bello
  heroTagline?: string;
  benefits?: string[];
  howToUse?: string;
  keyActives?: string;
  inci?: string;
}

export const productTranslations = {
  it: {
    products: [
      {
        id: "shampoo-riflessante-henne",
        name: "Shampoo Riflessante con estratto di hennè",
        description:
          "Formula riflessante per mantenere i toni spettacolari dell'hennè.",
        image: "/sh-hennè.webp",
        detailedDescription:
          "Formula riflessante per mantenere i toni spettacolari dell'hennè. Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità.",
        heroTagline:
          "Shampoo riflessante con estratto di hennè per mantenere riflessi intensi, luce e morbidezza.",
        benefits: [
          "Mantiene e intensifica i riflessi dell’hennè.",
          "Protegge e ristruttura in profondità la fibra capillare.",
          "Dona elasticità e idratazione al capello.",
          "Migliora lucentezza e morbidezza della chioma.",
          "Basi detergenti dolci, adatte a lavaggi frequenti.",
          "PARABENS FREE – SILICONES FREE.",
        ],
        howToUse:
          "A capelli bagnati applicare una quantità adeguata di prodotto, massaggiare delicatamente cute e lunghezze, lasciare agire per circa 4 minuti e risciacquare accuratamente. Ripetere se necessario.",
        keyActives:
          "Lawsonia inermis leaves extract (estratto di hennè) ricco di zuccheri naturali ristrutturanti.",
        inci:
          "Lawsonia inermis leaves extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Cetrimonium Chloride, Polyquaternium-10, Parfum, Phenoxyethanol, Sodium Chloride.",
      },
      {
        id: "maschera-riflessante-henne",
        name: "Maschera riflessante con estratto di hennè",
        description:
          "Un prodotto unico con puro estratto di hennè, ricco di zuccheri ristrutturanti.",
        image: "/mask-hennè.webp",
        detailedDescription:
          "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso.",
        heroTagline:
          "Trattamento riflessante intensivo che nutre, rinforza e illumina i capelli trattati con hennè.",
        benefits: [
          "Esalta e mantiene vivi i riflessi dell’hennè.",
          "Nutre in profondità la fibra capillare.",
          "Rende il capello più corposo, elastico e resistente.",
          "Aumenta lucentezza e morbidezza.",
          "Ideale dopo le miscele di erbe botaniche.",
        ],
        howToUse:
          "Dopo lo shampoo, applicare una quantità generosa di prodotto su lunghezze e punte. Lasciare in posa da 5 a 10 minuti a seconda del risultato desiderato, quindi risciacquare con cura.",
        keyActives:
          "Estratto di hennè ricco di zuccheri naturali e attivi condizionanti.",
      },
      {
        id: "Shampoo-Purificante-seboregolatore",
        name: "Shampoo Purificante-seboregolatore",
        description: "Shampoo riequilibrante per cute grassa o sensibile.",
        image: "/sh-hennè.webp",
        detailedDescription:
          "Shampoo purificante e seboregolatore pensato per cute grassa o facilmente appesantita. Aiuta a riequilibrare la produzione di sebo lasciando una piacevole sensazione di freschezza e leggerezza, senza seccare le lunghezze.",
        heroTagline:
          "Cute leggera, pulita e riequilibrata, senza rinunciare alla morbidezza delle lunghezze.",
        benefits: [
          "Azione purificante sulla cute.",
          "Aiuta a riequilibrare la produzione di sebo.",
          "Sensazione di pulizia profonda e freschezza.",
          "Non secca eccessivamente le lunghezze.",
        ],
        howToUse:
          "Applicare su capelli bagnati, massaggiare delicatamente la cute con movimenti circolari, emulsionare sulle lunghezze e risciacquare. Ripetere se necessario.",
        keyActives:
          "Complesso purificante e sebo-regolatore (ingredienti specifici indicati sull’etichetta del prodotto).",
      },
      {
        id: "Bagnoschiuma-Purificante",
        name: "Bagnoschiuma Purificante",
        description:
          "Azione purificante con sensazione di freschezza e pulizia profonda.",
        image: "/sh-hennè.webp",
        detailedDescription:
          "Bagnoschiuma purificante con estratti di liquirizia, bergamotto, ortica e cedro: dona alla pelle una sensazione di pulizia profonda e freschezza. L’acqua termale contribuisce ad un’azione calmante e lenitiva, ideale anche per pelli più delicate.",
        heroTagline:
          "Detersione purificante e delicata, con una piacevole sensazione di freschezza sulla pelle.",
        benefits: [
          "Azione purificante grazie agli estratti vegetali.",
          "Sensazione di freschezza immediata.",
          "Supporta l’equilibrio della pelle.",
          "Azione calmante grazie all’acqua termale.",
        ],
        howToUse:
          "Applicare una piccola quantità di prodotto sulla pelle bagnata, massaggiare fino a creare una morbida schiuma e risciacquare.",
        keyActives:
          "Estratti di liquirizia, bergamotto, ortica, cedro e acqua termale.",
      },
      {
        id: "Olio-lenitivo-olivo-e-girasole",
        name: "Olio lenitivo olivo e girasole",
        description: "Azione lenitiva intensa e idratazione emolliente.",
        image: "/sh-hennè.webp",
        detailedDescription:
          "Olio lenitivo formulato con puri oli di girasole e oliva per un’idratazione emolliente intensa. Ideale per cute secca o sensibilizzata e per lunghezze disidratate che necessitano di morbidezza e protezione.",
        heroTagline:
          "Un olio leggero e nutriente che avvolge cute e capelli in un’idratazione emolliente profonda.",
        benefits: [
          "Azione lenitiva su cute sensibile o secca.",
          "Apporta nutrimento e morbidezza alle lunghezze.",
          "Texture leggera, non eccessivamente unta.",
          "Perfetto come impacco pre-shampoo o finish sulle punte.",
        ],
        howToUse:
          "Come impacco: applicare su cute e lunghezze asciutte o leggermente umide, lasciare agire 10–20 minuti e procedere con lo shampoo. Come finish: applicare qualche goccia sulle punte asciutte.",
        keyActives: "Olio di girasole e olio di oliva ad azione emolliente.",
      },
    ],
  },

  en: {
    products: [
      {
        id: "reflective-henna-shampoo",
        name: "Reflective Shampoo with henna extract",
        description:
          "Reflective formula to maintain spectacular henna tones.",
        image: "/sh-hennè.webp",
        detailedDescription:
          "The Reflective Shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair. Its gentle formula, enriched with natural extracts, not only gently cleanses the hair but also helps preserve the brilliance and intensity of the color. Ideal for frequent use, this shampoo nourishes and protects hair, leaving it soft, luminous, and with vibrant reflections.",
        heroTagline:
          "Reflective shampoo with henna extract for intense tones, shine and softness.",
      },
      {
        id: "reflective-henna-mask",
        name: "Reflective mask with henna extract",
        description:
          "A unique product formulated with pure henna extract, rich in sugars that restructure the hair fiber giving new vitality.",
        image: "/mask-hennè.webp",
        detailedDescription:
          "The Reflective mask with henna extract is an intensive treatment that combines the nourishing and restructuring properties of henna with a formula rich in active ingredients. Pure henna extract, rich in natural sugars, penetrates deep into the hair fiber, repairing and strengthening it from within. This treatment not only keeps reflections vibrant but also improves hair structure, leaving it stronger, more elastic, and luminous.",
        heroTagline:
          "Intensive reflective treatment that nourishes, strengthens and enhances henna-treated hair.",
      },
    ],
  },
};
