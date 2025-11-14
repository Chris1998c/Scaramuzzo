export interface Service {
  id: string;
  alias?: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  detailedDescription: string;
}

export const serviceTranslations = {
  it: {
    services: [
      {
        id: "taglio-di-capelli",
        alias: "haircut",
        name: "Taglio di Capelli",
        description: "Taglio personalizzato per uomo e donna",
        image: "/TaglioNew.jpg",
        imageAlt: "Taglio di Capelli",
        detailedDescription:
          "Il nostro taglio nasce sempre da una consulenza attenta: analizziamo forma del viso, movimento naturale dei capelli e abitudini quotidiane per creare una linea pulita, contemporanea e facile da gestire anche a casa. Lavoriamo con forbici e, quando serve, rasoio, per dare leggerezza, volume o definizione rispettando la struttura naturale del capello.",
      },
      {
        id: "trattamenti",
        alias: "treatments",
        name: "Trattamenti",
        description: "Trattamenti per capelli danneggiati e cure specifiche",
        image: "/trattamento.jpg",
        imageAlt: "Trattamenti",
        detailedDescription: `I trattamenti Scaramuzzo uniscono attivi professionali e formulazioni delicate per ricostruire, idratare e proteggere la fibra del capello senza appesantirla.

- Cheratina vegetale Biokeratin Solution: complesso di proteine vegetali e attivi condizionanti che ricompattano la fibra, migliorano elasticità e lucentezza.
- Bond Repair con acido maleico e proteine idrolizzate: trattamento interno ispirato ai plex, aiuta a rinforzare i legami indeboliti da colore e decolorazioni, donando capelli più forti e resistenti.
- Trattamenti idratanti intensivi: maschere e impacchi emollienti per capelli secchi, opachi o sensibilizzati.
- Trattamento post-colore protettivo: aiuta a richiudere delicatamente la cuticola e mantiene il colore più brillante e omogeneo nel tempo.

Ogni percorso viene scelto dopo una consulenza personalizzata, in base allo stato di cute e lunghezze.`,
      },
      {
        id: "acconciature",
        alias: "hairstyling",
        name: "Acconciature",
        description: "Styling per ogni occasione",
        image: "/Acconciatura.jpg",
        imageAlt: "Acconciature",
        detailedDescription:
          "Dalle onde morbide ai raccolti strutturati dall’effetto naturale, creiamo acconciature pensate per matrimoni, eventi, shooting o semplicemente per farti sentire al meglio. Lavoriamo sempre in armonia con il viso, l’abito e lo stile personale, privilegiando volumi morbidi, texture leggere e una tenuta confortevole, mai rigida.",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Schiariture naturali e luminose",
        image: "/sanlai.webp",
        imageAlt: "Schiariture Sanlai",
        detailedDescription:
          "Sanlai è la nostra tecnica di schiaritura a mano libera ispirata alla luce naturale del sole. Utilizziamo decolorazioni e ossigeni calibrati, evitando volumi eccessivamente alti, per rispettare il più possibile la struttura del capello. Il risultato sono riflessi morbidi, luminosi e sfumati, senza stacchi netti, pensati per crescere bene nel tempo e integrarsi con il colore naturale.",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        alias: "scalp-massage",
        name: "Massaggio del Cuoio Capelluto",
        description: "Rilassante massaggio per la salute della cute",
        image: "/Massaggio.webp",
        imageAlt: "Massaggio del Cuoio Capelluto",
        detailedDescription:
          "Al lavatesta trasformiamo lo shampoo in un vero rituale di benessere. Il massaggio del cuoio capelluto, eseguito con movimenti lenti e profondi, aiuta a stimolare la microcircolazione, favorire l’ossigenazione della radice e sciogliere le tensioni accumulate. È il momento ideale per rilassarsi, preparare la cute ai trattamenti specifici e prendersi una pausa solo per sé.",
      },
    ],
  },
  en: {
    services: [
      {
        id: "taglio-di-capelli",
        alias: "taglio-di-capelli",
        name: "Haircut",
        description: "Personalized haircut for men and women",
        image: "/TaglioNew.jpg",
        imageAlt: "Haircut",
        detailedDescription:
          "Our haircut service always starts with a careful consultation: we analyse face shape, natural hair movement and your daily routine to create a clean, contemporary cut that is easy to manage at home. We work with scissors and, when needed, razor techniques to add lightness, volume or definition while respecting the natural texture of the hair.",
      },
      {
        id: "treatments",
        alias: "trattamenti",
        name: "Treatments",
        description: "Treatments for damaged hair and specific care",
        image: "/trattamento.jpg",
        imageAlt: "Treatments",
        detailedDescription: `Scaramuzzo treatments combine professional actives and gentle formulas to rebuild, hydrate and protect the hair fiber without weighing it down.

- Plant-based keratin Biokeratin Solution: a blend of vegetable proteins and conditioning agents that compacts the fiber and improves elasticity and shine.
- Bond Repair with maleic acid and hydrolysed proteins: an inner treatment inspired by plex systems, helping to reinforce bonds weakened by colour and lightening services for stronger, more resilient hair.
- Intensive moisturising treatments: masks and emollient packs for dry, dull or sensitised hair.
- Protective post-colour treatment: gently helps to close the cuticle and keeps colour brighter and more even over time.

Each protocol is chosen after a personalised consultation, based on the condition of both scalp and lengths.`,
      },
      {
        id: "acconciature",
        alias: "acconciature",
        name: "Hairstyling",
        description: "Styling for every occasion",
        image: "/Acconciatura.jpg",
        imageAlt: "Hairstyling",
        detailedDescription:
          "From soft waves to structured yet natural-looking updos, we create hairstyles designed for weddings, events, shootings or simply to make you feel your best. We always work in harmony with face shape, outfit and personality, favouring soft volumes, lightweight textures and a comfortable hold rather than rigid looks.",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Natural lightening technique",
        image: "/sanlai.webp",
        imageAlt: "Sanlai Hair Lightening",
        detailedDescription:
          "Sanlai is our freehand lightening technique inspired by natural sunlight. We use carefully controlled lighteners and developers, avoiding excessively high volumes, to respect the hair structure as much as possible. The result is soft, luminous and blended highlights with no harsh lines, designed to grow out beautifully and blend with your natural colour.",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        alias: "massaggio-del-cuoio-capelluto",
        name: "Scalp Massage",
        description: "Relaxing massage for hair health",
        image: "/Massaggio.webp",
        imageAlt: "Scalp Massage",
        detailedDescription:
          "At the backwash we turn shampoo time into a small wellness ritual. The scalp massage, performed with slow and deep movements, helps stimulate microcirculation, promote root oxygenation and release accumulated tension. It is the perfect moment to relax, prepare the scalp for targeted treatments and take a proper break for yourself.",
      },
    ],
  },
};
