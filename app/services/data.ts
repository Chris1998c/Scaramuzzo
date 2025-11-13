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
          "Il nostro servizio di taglio capelli offre un'esperienza completamente personalizzata. Studiamo la forma del viso, la struttura del capello e lo stile di vita per creare un taglio armonico, portabile e in linea con la tua personalità.",
      },
      {
        id: "trattamenti",
        alias: "treatments",
        name: "Trattamenti",
        description: "Trattamenti per capelli danneggiati e cure specifiche",
        image: "/trattamento.jpg",
        imageAlt: "Trattamenti",
        detailedDescription:
`Offriamo una gamma di trattamenti mirati per capelli e cute:
- Cheratina vegetale: per rinforzare e ricompattare la fibra.
- Trattamenti cute con erbe: ideali per cute sensibile, grassa o desquamata.
- Peeling cute: per purificare e ossigenare.
- Trattamenti rigeneranti post-colore: per mantenere luce e morbidezza.
Ogni trattamento viene scelto dopo una consulenza personalizzata.`,
      },
      {
        id: "acconciature",
        alias: "hairstyling",
        name: "Acconciature",
        description: "Styling per ogni occasione",
        image: "/Acconciatura.jpg",
        imageAlt: "Acconciature",
        detailedDescription:
          "Dalle acconciature raccolte alle onde morbide, fino ai look più essenziali: creiamo styling per matrimoni, eventi, shooting o semplicemente per sentirti speciale. Ogni acconciatura nasce in armonia con il viso, l’abito e il carattere di chi la indossa.",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Schiariture naturali e luminose",
        image: "/sanlai.webp",
        imageAlt: "Schiariture Sanlai",
        detailedDescription:
          "Sanlai è la nostra tecnica di schiaritura a mano libera ispirata alla luce del sole. Lavoriamo per creare contrasti morbidi, naturali e luminosi, rispettando la struttura del capello e mantenendo un risultato elegante, mai artificiale.",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        alias: "scalp-massage",
        name: "Massaggio del Cuoio Capelluto",
        description: "Rilassante massaggio per la salute della cute",
        image: "/Massaggio.webp",
        imageAlt: "Massaggio del Cuoio Capelluto",
        detailedDescription:
          "Il massaggio del cuoio capelluto è un rituale di benessere che stimola la microcircolazione, favorisce l’ossigenazione della radice e dona una profonda sensazione di relax. Ideale in abbinamento a trattamenti specifici per cute e capelli.",
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
          "Our haircut service offers a fully personalized experience. We study face shape, hair structure, and lifestyle to create a harmonious, wearable cut that reflects your personality.",
      },
      {
        id: "treatments",
        alias: "trattamenti",
        name: "Treatments",
        description: "Treatments for damaged hair and specific care",
        image: "/trattamento.jpg",
        imageAlt: "Treatments",
        detailedDescription:
`We offer a range of targeted treatments for hair and scalp:
- Plant-based keratin: to strengthen and rebuild the fiber.
- Herbal scalp treatments: ideal for sensitive, oily, or flaky scalp.
- Scalp peeling: to purify and oxygenate.
- Regenerating post-color treatments: to maintain shine and softness.
Each treatment is chosen after a personalized consultation.`,
      },
      {
        id: "acconciature",
        alias: "acconciature",
        name: "Hairstyling",
        description: "Styling for every occasion",
        image: "/Acconciatura.jpg",
        imageAlt: "Hairstyling",
        detailedDescription:
          "From updos to soft waves and essential looks: we create styling for weddings, events, shootings, or simply to make you feel special. Every hairstyle is designed in harmony with your face, outfit, and personality.",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Natural lightening technique",
        image: "/sanlai.webp",
        imageAlt: "Sanlai Hair Lightening",
        detailedDescription:
          "Sanlai is our freehand lightening technique inspired by sunlight. We work to create soft, natural, luminous contrasts, respecting the hair structure and ensuring an elegant, never artificial result.",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        alias: "massaggio-del-cuoio-capelluto",
        name: "Scalp Massage",
        description: "Relaxing massage for hair health",
        image: "/Massaggio.webp",
        imageAlt: "Scalp Massage",
        detailedDescription:
          "Our scalp massage is a wellness ritual that stimulates microcirculation, promotes root oxygenation, and offers deep relaxation. Perfect when combined with targeted scalp and hair treatments.",
      },
    ],
  },
};
