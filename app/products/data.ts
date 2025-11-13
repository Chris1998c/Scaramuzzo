// app/products/data.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  detailedDescription: string;
  heroTagline: string;
  benefits: string[];
  howToUse: string;
  keyActives: string;
  inci: string;
}

export const productTranslations = {
  it: {
    products: [
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Shampoo Purificante Seboregolatore",
        description:
          "Detergente professionale per cute grassa e radici appesantite.",
        image: "/sh-hennè.webp", // placeholder, stesso file già usato
        heroTagline: "Cute riequilibrata, fresca e pulita più a lungo.",
        detailedDescription:
          "Shampoo purificante professionale ideale per cute grassa, radici appesantite e produzione eccessiva di sebo. La sua formula con attivi seboregolatori e oli essenziali purificanti deterge in profondità senza irritare la cute e mantiene più a lungo una sensazione di freschezza. Perfetto per chi avverte prurito, lucidità alla radice e capelli che si sporcano velocemente.",
        benefits: [
          "Riduce l’eccesso di sebo già dalle prime applicazioni.",
          "Azione purificante e rinfrescante sulla cute.",
          "Cute più leggera e radici meno appesantite.",
          "Non secca eccessivamente le lunghezze.",
          "Ideale come trattamento riequilibrante periodico.",
        ],
        howToUse:
          "Applicare sui capelli bagnati, massaggiare delicatamente la cute con movimenti circolari, lasciare agire 2–3 minuti e risciacquare con cura. Ripetere se necessario.",
        keyActives:
          "Olio essenziale di menta, olio essenziale di tea tree, agenti seboregolatori e condizionanti delicati.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Sodium Chloride, Polyquaternium-10, Mentha Piperita Oil, Melaleuca Alternifolia Leaf Oil, Phenoxyethanol, Sodium Benzoate, Parfum.",
      },

      {
        id: "shampoo-riflessante-henne",
        name: "Shampoo Riflessante all’Henné",
        description: "Shampoo ristrutturante con puro estratto di henné.",
        image: "/sh-hennè.webp",
        heroTagline: "Luminosità, forza e riflessi intensi già dal primo lavaggio.",
        detailedDescription:
          "Shampoo professionale formulato con estratto puro di Lawsonia inermis (henné). Ricco di zuccheri e polisaccaridi naturali, aiuta a rinforzare la fibra capillare, migliorare la lucentezza e mantenere vivi i riflessi ottenuti con l’henné o con le miscele di erbe botaniche. Ideale per capelli spenti, fini o che necessitano di maggiore corpo e brillantezza.",
        benefits: [
          "Esalta e mantiene i riflessi naturali e cosmetici dell’henné.",
          "Rinforza la fibra capillare nel tempo.",
          "Dona corpo, lucentezza e morbidezza.",
          "Basi lavanti delicate adatte anche a lavaggi frequenti.",
          "Perfetto in abbinamento alle miscele botaniche riflessanti.",
        ],
        howToUse:
          "Applicare su cute e lunghezze bagnate, massaggiare delicatamente, lasciare agire 2–4 minuti per potenziare l’effetto riflessante e risciacquare con cura.",
        keyActives:
          "Estratto di Lawsonia inermis (henné), agenti condizionanti e filmogeni delicati.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Lawsonia Inermis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      {
        id: "maschera-riflessante-henne",
        name: "Maschera Riflessante all’Henné",
        description:
          "Maschera nutriente e illuminante con henné puro e oli vegetali.",
        image: "/mask-hennè.webp",
        heroTagline: "Morbidezza, brillantezza e riflessi vibranti.",
        detailedDescription:
          "Trattamento intensivo arricchito con estratto di henné e oli vegetali emollienti. Migliora la struttura della fibra, dona corpo e luminosità, facilita la pettinabilità ed esalta i riflessi naturali o cosmetici. Ideale dopo i trattamenti con erbe botaniche o dopo servizi colore per mantenere il capello morbido e luminoso.",
        benefits: [
          "Aumenta brillantezza e riflessi.",
          "Nutre e rinforza la fibra capillare.",
          "Migliora morbidezza e pettinabilità.",
          "Aiuta a mantenere il colore più pieno e uniforme.",
          "Perfetta come trattamento settimanale dopo l’henné.",
        ],
        howToUse:
          "Applicare dopo lo shampoo su lunghezze e punte tamponate. Lasciare agire 5–10 minuti, pettinare e risciacquare con cura. Per un effetto più intenso, prolungare la posa fino a 15 minuti.",
        keyActives:
          "Estratto di henné, olio di girasole, olio di cocco, agenti condizionanti.",
        inci:
          "Aqua, Cetearyl Alcohol, Myristyl Alcohol, Lawsonia Inermis Extract, Behentrimonium Chloride, Glycerin, Helianthus Annuus Seed Oil, Cocos Nucifera Oil, Parfum, Phenoxyethanol.",
      },

      {
        id: "shampoo-volume",
        name: "Shampoo Volume & Leggerezza",
        description:
          "Shampoo ideale per capelli fini, senza corpo e che si appesantiscono facilmente.",
        image: "/sh-hennè.webp",
        heroTagline: "Volume naturale e leggerezza assoluta.",
        detailedDescription:
          "Shampoo delicato pensato per dare corpo e sostegno ai capelli fini senza appesantirli. Le proteine del grano contribuiscono a migliorare la struttura del fusto, mentre le basi lavanti leggere rimuovono impurità e sebo in eccesso mantenendo la chioma ariosa e morbida al tatto.",
        benefits: [
          "Radici più sollevate e capelli più pieni.",
          "Capelli corposi ma leggeri, senza effetto pesante.",
          "Detersione delicata adatta anche a lavaggi frequenti.",
          "Migliora brillantezza e idratazione della fibra.",
        ],
        howToUse:
          "Applicare su capelli bagnati, massaggiare delicatamente la cute e le lunghezze, emulsionare e risciacquare. Ripetere se necessario.",
        keyActives:
          "Proteine idrolizzate del grano, agenti condizionanti leggeri, glicerina.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Hydrolyzed Wheat Protein, Polyquaternium-7, Glycerin, Phenoxyethanol, Parfum.",
      },
    ],
  },

  en: {
    products: [
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Purifying Sebum-Regulating Shampoo",
        description: "Professional cleanser for oily scalp and excess sebum.",
        image: "/sh-hennè.webp",
        heroTagline: "A fresh, clean and rebalanced scalp.",
        detailedDescription:
          "A professional shampoo designed to rebalance an oily scalp and control excess sebum. Thanks to purifying botanical extracts and sebum-regulating actives, it deeply cleanses without irritating the scalp and helps keep a lasting sensation of freshness. Ideal for those who experience itching, heavy roots and hair that gets greasy quickly.",
        benefits: [
          "Helps reduce excess sebum from the very first washes.",
          "Purifying and refreshing action on the scalp.",
          "Leaves the scalp lighter and roots less weighed down.",
          "Does not overly dry mid-lengths and ends.",
          "Ideal as a rebalancing treatment.",
        ],
        howToUse:
          "Apply to wet hair, massage gently onto the scalp using circular movements, leave on for 2–3 minutes, then rinse thoroughly. Repeat if needed.",
        keyActives:
          "Peppermint essential oil, tea tree essential oil, gentle sebum-regulating and conditioning agents.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Sodium Chloride, Polyquaternium-10, Mentha Piperita Oil, Melaleuca Alternifolia Leaf Oil, Phenoxyethanol, Sodium Benzoate, Parfum.",
      },

      {
        id: "shampoo-riflessante-henne",
        name: "Reflective Henna Shampoo",
        description: "Strengthening shampoo with pure henna extract.",
        image: "/sh-hennè.webp",
        heroTagline: "Shine, strength and vibrant tones from the first wash.",
        detailedDescription:
          "A professional shampoo enriched with pure Lawsonia inermis (henna) extract. Naturally rich in polysaccharides and sugars, it helps strengthen the hair fiber, enhance shine and keep both natural and cosmetic henna tones vivid and luminous. Ideal for dull, fine or weakened hair.",
        benefits: [
          "Enhances and maintains natural and cosmetic henna reflections.",
          "Strengthens the hair fiber over time.",
          "Adds body, shine and softness.",
          "Gentle surfactants suitable for frequent washing.",
          "Perfect in combination with botanical herbal blends.",
        ],
        howToUse:
          "Apply to damp scalp and lengths, massage gently, leave on for 2–4 minutes to boost the reflective effect, then rinse thoroughly.",
        keyActives:
          "Lawsonia inermis (henna) extract, gentle conditioning and film-forming agents.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Lawsonia Inermis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      {
        id: "maschera-riflessante-henne",
        name: "Reflective Henna Mask",
        description:
          "Nourishing and illuminating mask with pure henna and plant oils.",
        image: "/mask-hennè.webp",
        heroTagline: "Softness, shine and vibrant reflections.",
        detailedDescription:
          "An intensive treatment enriched with henna extract and emollient plant oils. It improves the structure of the hair fiber, adds body and shine, enhances manageability and brings out natural or cosmetic reflections. Ideal after herbal treatments or color services to keep the hair soft, shiny and full of life.",
        benefits: [
          "Boosts shine and vibrancy of reflections.",
          "Deeply nourishes and strengthens the hair fiber.",
          "Improves softness and detangling.",
          "Helps maintain a fuller, more uniform color.",
          "Perfect as a weekly treatment after henna applications.",
        ],
        howToUse:
          "Apply after shampooing on towel-dried mid-lengths and ends. Leave on for 5–10 minutes, comb through and rinse thoroughly. For a more intense effect, leave on up to 15 minutes.",
        keyActives:
          "Henna extract, sunflower oil, coconut oil, conditioning agents.",
        inci:
          "Aqua, Cetearyl Alcohol, Myristyl Alcohol, Lawsonia Inermis Extract, Behentrimonium Chloride, Glycerin, Helianthus Annuus Seed Oil, Cocos Nucifera Oil, Parfum, Phenoxyethanol.",
      },

      {
        id: "shampoo-volume",
        name: "Volume & Lightweight Shampoo",
        description: "Delicate cleanser for fine, flat hair lacking body.",
        image: "/sh-hennè.webp",
        heroTagline: "Natural volume and effortless lightness.",
        detailedDescription:
          "A gentle shampoo specifically designed to provide body and support to fine hair without weighing it down. Hydrolyzed wheat proteins help improve hair structure, while light surfactants remove impurities and excess sebum leaving the hair airy, soft and full of movement.",
        benefits: [
          "Lifts roots and adds natural volume.",
          "Hair feels fuller yet lightweight.",
          "Gentle cleansing suitable for frequent use.",
          "Enhances shine and hydration.",
        ],
        howToUse:
          "Apply to wet hair, gently massage scalp and lengths, emulsify and rinse thoroughly. Repeat if necessary.",
        keyActives:
          "Hydrolyzed wheat proteins, light conditioning agents, glycerin.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Hydrolyzed Wheat Protein, Polyquaternium-7, Glycerin, Phenoxyethanol, Parfum.",
      },
    ],
  },
};
