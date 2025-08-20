export interface Product {
  id: string
  name: string
  description: string
  image: string
  detailedDescription: string
}

export const productTranslations = {
  it: {
    products: [
      {
        id: "shampoo-riflessante-henne",
        name: "Shampoo Riflessante con estratto di hennè",
        description: "Formula riflessante per mantenere i toni spettacolari dell'hennè.",
        image: "/sh-hennè.webp",
        detailedDescription:" Formula riflessante per mantenere i toni spettacolari dell'hennè. Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità. MODO D'USO A capello bagnato applicare il prodotto, massaggiare, lasciare agire per 4 minuti e procedere al risciacquo.PRINCIPI ATTIVILawsonia inermis leaves extract, Zuccheri.AZIONI Protegge e ristruttura in profondità la fibra capillare per dare elasticità e idratazione.PUNTI DI FORZALe erbe botaniche rappresentano uno dei prodotti base della fitocosmesi, ricavato dalle foglie essiccate e polverizzate di un arbusto (Lawsonia inermis) comunemente chiamato henna. La formula miscelata con estratti di erbe botaniche, rende il prodotto ottimale nel creare riflessi particolari, migliorando la lucentezza dei colori applicati e la morbidezza del capello. Le basi detergenti, dolci e delicate, consentono di utilizzare il prodotto su qualsiasi tipo di capello senza impoverirne il manto idrolipidico.INGREDIENTILawsonia inermis leaves extract, Sodium coceth sulfate, Cocamido propyl betaine, Cetrimonium chloride, Polyquaterniurn 10, Parfurn, Phenoxy ethanol, Sodiurn chloride. PARABENS FREE - SILICONES FREE"
      },
      {
        id: "maschera-riflessante-henne",
        name: "Maschera riflessante con estratto di hennè",
        description: "Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità.",
        image: "/mask-hennè.webp",
        detailedDescription: "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso."
      },
      {
        id: "Shampoo-Purificante-seboregolatore",
        name: "Shampoo Purificante-seboregolatore",
        description: "Olio leggero per capelli lucenti",
        image: "/sh-hennè.webp",
        detailedDescription: "Il nostro Olio per Capelli è una formula leggera ma potente, studiata per nutrire in profondità i capelli senza appesantirli. Arricchito con oli naturali selezionati, questo prodotto aiuta a combattere il crespo, aumenta la lucentezza e protegge i capelli dai danni ambientali. Perfetto per tutti i tipi di capelli, può essere utilizzato sia come trattamento pre-shampoo che come finish per domare i capelli ribelli."
      },
      {
        id: "Bagnoschiuma-Purificante",
        name: "Bagnoschiuma-Purificante",
        description: "Bagnoschiuma-Purificante",
        image: "/sh-hennè.webp",
        detailedDescription: "Azione antibatterica grazie all'estratto di liquirizia, bergamotto, ortica, cedro che dona alla pelle un'eccezionale sensazione di pulizia e freschezza.Azione calmante e lenitiva grazie all'utilizzo dell'acqua termale"
      },
      {
        id: "Olio-lenitivo-olivo-e-girasole",
        name: "Olio lenitivo olivo e girasole",
        description: "Azione lenitiva intensa",
        image: "/sh-hennè.webp",
        detailedDescription: "Formulato con puri oli di girasole e oliva, per un'idratazione emolliente intensa"
      }
    ]
  },
  en: {
    products: [
      {
        id: "reflective-henna-shampoo",
        name: "Reflective Shampoo with henna extract",
        description: "Reflective formula to maintain spectacular henna tones.",
        image: "/sh-hennè.webp",
        detailedDescription: "The Reflective Shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair. Its gentle formula, enriched with natural extracts, not only gently cleanses the hair but also helps preserve the brilliance and intensity of the color. Ideal for frequent use, this shampoo nourishes and protects hair, leaving it soft, luminous, and with vibrant reflections."
      },
      {
        id: "reflective-henna-mask",
        name: "Reflective mask with henna extract",
        description: "A unique product formulated with pure henna extract, rich in sugars that restructure the hair fiber giving new vitality.",
        image: "/mask-hennè.webp",
        detailedDescription: "The Reflective mask with henna extract is an intensive treatment that combines the nourishing and restructuring properties of henna with a formula rich in active ingredients. Pure henna extract, rich in natural sugars, penetrates deep into the hair fiber, repairing and strengthening it from within. This treatment not only keeps reflections vibrant but also improves hair structure, leaving it stronger, more elastic, and luminous."
      }
    ]
  }
}
