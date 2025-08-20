export type Language = 'it' | 'en'
export type PageKey = 'home' | 'about' | 'services' | 'products' | 'contact'

export const navbarTranslations: Record<Language, Record<PageKey, string>> = {
  it: {
    home: "Home",
    about: "Chi Siamo",
    services: "Servizi",
    products: "Prodotti",
    contact: "Contatti",
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    products: "Products",
    contact: "Contact",
  },
}

export const homeTranslations = {
  it: {
    hero: "Il tuo stile, naturalmente perfetto",
    description: "Trasformiamo i tuoi capelli con cura naturale",
  },
  en: {
    hero: "Your style, naturally perfect",
    description: "We transform your hair with natural care",
  },
}

export const aboutTranslations = {
  it: {
    title: "Chi Siamo",
    description:
      "Scaramuzzo Hair Natural Beauty è un salone di bellezza all'avanguardia che combina tecniche tradizionali con le ultime innovazioni nel campo della cura dei capelli. Fondato da Giuseppe Scaramuzzo, il nostro salone si impegna a offrire servizi personalizzati e prodotti naturali per esaltare la bellezza unica di ogni cliente. Con anni di esperienza e una passione per l'eccellenza, il nostro team di stilisti altamente qualificati si dedica a creare look che riflettono la personalità e lo stile di vita di ciascun individuo. Utilizziamo solo prodotti di alta qualità e rispettosi dell'ambiente, garantendo risultati straordinari e capelli sani. Venite a scoprire l'esperienza Scaramuzzo, dove la bellezza naturale incontra l'arte del parrucchiere.",
  },
  en: {
    title: "About Us",
    description:
      "Scaramuzzo Hair Natural Beauty is a cutting-edge beauty salon that combines traditional techniques with the latest innovations in hair care. Founded by Giuseppe Scaramuzzo, our salon is committed to offering personalized services and natural products to enhance the unique beauty of each client. With years of experience and a passion for excellence, our team of highly skilled stylists is dedicated to creating looks that reflect the personality and lifestyle of each individual. We use only high-quality, environmentally friendly products, ensuring extraordinary results and healthy hair. Come and discover the Scaramuzzo experience, where natural beauty meets the art of hairdressing.",
  },
}

export const contactTranslations = {
  it: {
    title: "Contattaci",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    send: "Invia",
    sending: "Inviando...",
    success: "Messaggio inviato con successo!",
    error: "Si è verificato un errore nell'invio del messaggio.",
  },
  en: {
    title: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "An error occurred while sending the message.",
  },
}

export interface Service {
  id: string
  alias?: string
  name: string
  description: string
  image: string
  imageAlt: string
  detailedDescription: string
}

export const servicesTranslations: Record<Language, { title: string; services: Service[] }> = {
  it: {
    title: "I Nostri Servizi",
    services: [
      {
        id: "taglio-di-capelli",
        alias: "haircut",
        name: "Taglio di Capelli",
        description: "Taglio personalizzato per uomo e donna",
        image: "/TaglioNew.jpg",
        imageAlt: "Taglio di Capelli",
        detailedDescription: "Il nostro servizio di taglio capelli offre un'esperienza personalizzata per ogni cliente. ...",
      },
      {
        id: "colorazione-con-erbe-botaniche",
        alias: "botanical-hair-coloring",
        name: "Colorazione con erbe botaniche",
        description: "Tinte naturali e tecniche innovative",
        image: "/ERBE.jpg",
        imageAlt: "Colorazione con erbe botaniche",
        detailedDescription: "La nostra colorazione con erbe botaniche è un trattamento delicato e naturale ...",
      },
      {
        id: "trattamenti",
        alias: "treatments",
        name: "Trattamenti",
        description: "Trattamenti per capelli danneggiati e cure specifiche",
        image: "/trattamento.jpg",
        imageAlt: "Trattamenti",
        detailedDescription: `Offriamo una vasta gamma di trattamenti per capelli:
- Cheratina Vegetale: ...
- Trattamenti Cute con Erbe: ...
- Peeling: ...
- Rigenerante: ...
- Post Colore: ...
- Trattamento di Rigenerazione: ...`,
      },
      {
        id: "acconciature",
        alias: "hairstyling",
        name: "Acconciature",
        description: "Styling per ogni occasione",
        image: "/Acconciatura.jpg",
        imageAlt: "Acconciature",
        detailedDescription: "Che si tratti di un'occasione speciale o di un look quotidiano, ...",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Schiariture",
        image: "/sanlai.webp",
        imageAlt: "Schiariture Sanlai",
        detailedDescription: "La tecnica Sanlai è il nostro metodo innovativo per schiarire i capelli ...",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        alias: "scalp-massage",
        name: "Massaggio del Cuoio Capelluto",
        description: "Rilassante massaggio per la salute dei capelli",
        image: "/Massaggio.webp",
        imageAlt: "Massaggio del Cuoio Capelluto",
        detailedDescription: "Il nostro massaggio del cuoio capelluto non è solo rilassante, ma anche benefico ...",
      },
    ],
  },
  en: {
    title: "Our Services",
    services: [
      {
        id: "haircut",
        alias: "taglio-di-capelli",
        name: "Haircut",
        description: "Personalized cut for men and women",
        image: "/TaglioNew.jpg",
        imageAlt: "Haircut",
        detailedDescription: "Our haircut service offers a personalized experience ...",
      },
      {
        id: "botanical-hair-coloring",
        alias: "colorazione-con-erbe-botaniche",
        name: "Botanical Hair Coloring",
        description: "Natural dyes and innovative techniques",
        image: "/ERBE.jpg",
        imageAlt: "Botanical Hair Coloring",
        detailedDescription: "Our botanical hair coloring is a gentle and natural treatment ...",
      },
      {
        id: "treatments",
        alias: "trattamenti",
        name: "Treatments",
        description: "Treatments for damaged hair and specific care",
        image: "/trattamento.jpg",
        imageAlt: "Treatments",
        detailedDescription: `We offer a wide range of treatments for hair:
- Plant-Based Keratin: ...
- Herbal Scalp Treatments: ...
- Peeling: ...
- Revitalizing: ...
- Post Color: ...
- Deep Regeneration Treatment: ...`,
      },
      {
        id: "hairstyling",
        alias: "acconciature",
        name: "Hairstyling",
        description: "Styling for every occasion",
        image: "/Acconciatura.jpg",
        imageAlt: "Hairstyling",
        detailedDescription: "Whether it's for a special occasion or an everyday look, ...",
      },
      {
        id: "sanlai",
        alias: "sanlai",
        name: "Sanlai",
        description: "Hair lightening",
        image: "/sanlai.webp",
        imageAlt: "Sanlai Hair Lightening",
        detailedDescription: "The Sanlai technique is our innovative method for lightening hair ...",
      },
      {
        id: "scalp-massage",
        alias: "massaggio-del-cuoio-capelluto",
        name: "Scalp Massage",
        description: "Relaxing massage for hair health",
        image: "/Massaggio.webp",
        imageAlt: "Scalp Massage",
        detailedDescription: "Our scalp massage is not only relaxing but also beneficial ...",
      },
    ],
  },
}

export interface Product {
  id: string
  alias?: string
  name: string
  description: string
  image: string
  imageAlt: string
  detailedDescription: string
}

export const productsTranslations: Record<Language, { title: string; products: Product[] }> = {
  it: {
    title: "I Nostri Prodotti",
    products: [
      {
        id: "shampoo-riflessante-henne",
        alias: "reflective-henna-shampoo",
        name: "Shampoo Riflessante con Henné",
        description: "Mantiene i riflessi naturali dei capelli trattati con henné.",
        image: "/sh-hennè.webp",
        imageAlt: "Shampoo Riflessante con Henné",
        detailedDescription: "Formula riflessante per mantenere i toni spettacolari dell'hennè. Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità. MODO D'USO A capello bagnato applicare il prodotto, massaggiare, lasciare agire per 4 minuti e procedere al risciacquo.PRINCIPI ATTIVILawsonia inermis leaves extract, Zuccheri.AZIONI Protegge e ristruttura in profondità la fibra capillare per dare elasticità e idratazione.PUNTI DI FORZALe erbe botaniche rappresentano uno dei prodotti base della fitocosmesi, ricavato dalle foglie essiccate e polverizzate di un arbusto (Lawsonia inermis) comunemente chiamato henna. La formula miscelata con estratti di erbe botaniche, rende il prodotto ottimale nel creare riflessi particolari, migliorando la lucentezza dei colori applicati e la morbidezza del capello. Le basi detergenti, dolci e delicate, consentono di utilizzare il prodotto su qualsiasi tipo di capello senza impoverirne il manto idrolipidico.INGREDIENTILawsonia inermis leaves extract, Sodium coceth sulfate, Cocamido propyl betaine, Cetrimonium chloride, Polyquaterniurn 10, Parfurn, Phenoxy ethanol, Sodiurn chloride. PARABENS FREE - SILICONES FREE",
      },
      {
        id: "maschera-riflessante-henne",
        alias: "reflective-henna-mask",
        name: "Maschera Riflessante con Henné",
        description: "Nutre e ravviva il colore naturalmente.",
        image: "/mask-hennè.webp",
        imageAlt: "Maschera Riflessante con Henné",
        detailedDescription: "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso.",
      },
      {
        id: "Shampoo-Purificante-seboregolatore",
        alias: "hair-oil",
        name: "Shampoo Purificante-Seboregolatore",
        description: "Azione riequilibrante per cute grassa o sensibile.",
        image: "/sh-hennè.webp",
        imageAlt: "Shampoo Purificante",
        detailedDescription: "Il nostro Olio per Capelli è una formula leggera ma potente, studiata per nutrire in profondità i capelli senza appesantirli. Arricchito con oli naturali selezionati, questo prodotto aiuta a combattere il crespo, aumenta la lucentezza e protegge i capelli dai danni ambientali. Perfetto per tutti i tipi di capelli, può essere utilizzato sia come trattamento pre-shampoo che come finish per domare i capelli ribelli.",
      },
      {
        id: "Bagnoschiuma-Purificante",
        alias: "hydrating-bodywash",
        name: "Bagnoschiuma Purificante",
        description: "Sensazione di freschezza e pulizia profonda.",
        image: "/sh-hennè.webp",
        imageAlt: "Bagnoschiuma",
        detailedDescription: "Azione antibatterica grazie all'estratto di liquirizia, bergamotto, ortica, cedro che dona alla pelle un'eccezionale sensazione di pulizia e freschezza. Azione calmante e lenitiva grazie all'utilizzo dell'acqua termale",
      },
      {
        id: "Olio-lenitivo-olivo-e-girasole",
        alias: "soothing-oil",
        name: "Olio Lenitivo Olivo & Girasole",
        description: "Idratazione intensa e naturale.",
        image: "/sh-hennè.webp",
        imageAlt: "Olio Lenitivo",
        detailedDescription: "Formulato con puri oli di girasole e oliva, per un'idratazione emolliente intensa",
      },
    ],
  },
  en: {
    title: "Our Products",
    products: [
      {
        id: "reflective-henna-shampoo",
        alias: "shampoo-riflessante-henne",
        name: "Reflective Shampoo with Henna",
        description: "Enhances and maintains henna-treated hair tones.",
        image: "/sh-hennè.webp",
        imageAlt: "Reflective Shampoo",
        detailedDescription: "The Reflective Shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair. Its gentle formula, enriched with natural extracts, not only gently cleanses the hair but also helps preserve the brilliance and intensity of the color. Ideal for frequent use, this shampoo nourishes and protects hair, leaving it soft, luminous, and with vibrant reflections.",
      },
      {
        id: "reflective-henna-mask",
        alias: "maschera-riflessante-henne",
        name: "Reflective Mask with Henna",
        description: "Deeply nourishes and enhances reflections.",
        image: "/mask-hennè.webp",
        imageAlt: "Reflective Mask",
        detailedDescription: "The Reflective mask with henna extract is an intensive treatment that combines the nourishing and restructuring properties of henna with a formula rich in active ingredients. Pure henna extract, rich in natural sugars, penetrates deep into the hair fiber, repairing and strengthening it from within. This treatment not only keeps reflections vibrant but also improves hair structure, leaving it stronger, more elastic, and luminous.",
      },
      {
        id: "hair-oil",
        alias: "Shampoo-Purificante-seboregolatore",
        name: "Purifying Shampoo",
        description: "Sebum-balancing formula for a clean scalp.",
        image: "/sh-hennè.webp",
        imageAlt: "Purifying Shampoo",
        detailedDescription: "Sebum-balancing formula for a clean scalp.",
      },
      {
        id: "hydrating-bodywash",
        alias: "Bagnoschiuma-Purificante",
        name: "Purifying Bodywash",
        description: "Deep cleansing and fresh sensation.",
        image: "/sh-hennè.webp",
        imageAlt: "Purifying Bodywash",
        detailedDescription: "Deep cleansing and fresh sensation.",
      },
      {
        id: "soothing-oil",
        alias: "Olio-lenitivo-olivo-e-girasole",
        name: "Soothing Oil - Olive & Sunflower",
        description: "Moisturizing and softening treatment.",
        image: "/sh-hennè.webp",
        imageAlt: "Soothing Oil",
        detailedDescription: "Moisturizing and softening treatment.",
      },
    ],
  },
}

