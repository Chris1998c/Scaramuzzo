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
  price: number; // <— AGGIUNTO
}

export const productTranslations = {
  it: {
    products: [
      // -------------------------------------------------------
      // SHAMPOO 1 — RIFLESSANTE HENNÈ
      // -------------------------------------------------------
      {
        id: "shampoo-riflessante-henne",
        name: "Shampoo Riflessante con Estratto di Hennè",
        price: 20,
        description:
          "Shampoo ristrutturante con puro estratto di hennè per riflessi luminosi.",
        image: "/shampoo-hennè-nuovo.webp",
        heroTagline: "Riflessi intensi, luce naturale e fibra più forte.",
        detailedDescription:
          "Lo Shampoo Riflessante con Estratto di Hennè mantiene vivi e luminosi i riflessi ottenuti con hennè ed erbe botaniche. L’estratto di Lawsonia inermis, ricco di zuccheri naturali, rinforza la fibra, aumenta la brillantezza e dona corpo ai capelli spenti o fini.",
        benefits: [
          "Mantiene e valorizza i riflessi dell’hennè.",
          "Rinforza la fibra capillare.",
          "Dona corpo, luminosità e morbidezza.",
          "Delicato anche per lavaggi frequenti.",
        ],
        howToUse:
          "Applicare su cute e lunghezze bagnate, massaggiare, lasciare agire 2–4 minuti, risciacquare.",
        keyActives: "Estratto di hennè, condizionanti delicati.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Lawsonia Inermis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      // SHAMPOO 2 — EMOLLIENTE
      // -------------------------------------------------------
      {
        id: "shampoo-emolliente",
        name: "Shampoo Emolliente",
        price: 20,
        description:
          "Detersione delicata per cute sensibile e capelli secchi o fragili.",
        image: "/shampoo-emo-nuovo.webp",
        heroTagline: "Morbidezza immediata, sollievo per cute sensibile.",
        detailedDescription:
          "Lo Shampoo Emolliente deterge delicatamente la cute sensibile e i capelli secchi o fragili. Estratti di avena e camomilla calmano e idratano, mentre i condizionanti naturali rendono il capello morbido, elastico e facile da districare senza appesantire.",
        benefits: [
          "Azione calmante ed emolliente.",
          "Avena e camomilla lenitive.",
          "Capelli morbidi e setosi.",
          "Non appesantisce e rispetta la cute.",
        ],
        howToUse:
          "Applicare sui capelli bagnati, massaggiare, lasciare agire 4 minuti e risciacquare.",
        keyActives: "Estratto di avena, estratto di camomilla.",
        inci:
          "Aqua, Avena Sativa Extract, Chamomilla Recutita Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Cetrimonium Chloride, Glycerin, Polyquaternium-10, Dimethiconol, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      // SHAMPOO 3 — PURIFICANTE
      // -------------------------------------------------------
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Shampoo Purificante Seboregolatore",
        price: 20,
        description:
          "Formula purificante con estratti vegetali per cute grassa.",
        image: "/shampoo-purificante-nuovo.webp",
        heroTagline: "Cute fresca, leggera e riequilibrata.",
        detailedDescription:
          "Detergente purificante per capelli normali o grassi. Gli estratti di bergamotto, ortica, malva e liquirizia aiutano a ridurre il sebo e purificano la cute da impurità e residui. Lascia una sensazione di freschezza e leggerezza già dal primo utilizzo.",
        benefits: [
          "Riduce l’eccesso di sebo.",
          "Purifica e riequilibra la cute.",
          "Azione antibatterica naturale.",
          "Radici leggere più a lungo.",
        ],
        howToUse:
          "Applicare sui capelli bagnati, massaggiare, lasciare 2 minuti e risciacquare.",
        keyActives:
          "Estratto di bergamotto, ortica, malva e liquirizia.",
        inci:
          "Aqua, Citrus Bergamia Extract, Urtica Dioica Extract, Malva Sylvestris Extract, Glycyrrhiza Glabra Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      // SHAMPOO 4 — ENERGIZZANTE
      // -------------------------------------------------------
      {
        id: "shampoo-energizzante",
        name: "Shampoo Energizzante – Stimolante",
        price: 20,
        description:
          "Formula rinforzante con rosmarino, mentolo e attivi stimolanti.",
        image: "/sh-energizzante-nuovo.webp",
        heroTagline: "Freschezza intensa e capelli più forti.",
        detailedDescription:
          "Shampoo progettato per rinforzare la fibra capillare e stimolare la microcircolazione. Rosmarino, mentolo, mentil lattato e condizionanti rinfrescano e rivitalizzano la cute, donando capelli più forti, sani e vigorosi.",
        benefits: [
          "Azione stimolante sulla cute.",
          "Cristalli di mentolo rinfrescanti.",
          "Rosmarino tonificante.",
          "Capelli più forti e vitali.",
        ],
        howToUse:
          "Applicare sui capelli bagnati, massaggiare, lasciare agire 2 minuti, risciacquare.",
        keyActives:
          "Rosmarino, mentolo, mentil lattato.",
        inci:
          "Aqua, Rosmarinus Officinalis Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Menthyl Lactate, Polyquaternium-7, Menthol, Parfum, Phenoxyethanol.",
      },

      // -------------------------------------------------------
      // SHAMPOO 5 — RISTRUTTURANTE BERGAMOTTO
      // -------------------------------------------------------
      {
        id: "shampoo-rigenerante-bergamotto",
        name: "Shampoo Ristrutturante al Bergamotto",
        price: 20,
        description:
          "Detersione delicata e nutriente per capelli sensibilizzati.",
        image: "/shampoo-ristrutturante-nuovo.webp",
        heroTagline: "Morbidezza, luce e rigenerazione profonda.",
        detailedDescription:
          "Formula rigenerante con olio di bergamotto, ideale per capelli sensibilizzati da trattamenti chimici. Nutre, ammorbidisce e dona luminosità, senza risultare aggressivo sulla cute.",
        benefits: [
          "Nutre e ammorbidisce.",
          "Illumina e rigenera.",
          "Delicato anche su cute sensibile.",
          "Adatto a lavaggi frequenti.",
        ],
        howToUse:
          "Applicare sui capelli bagnati, massaggiare, lasciare 4 minuti e risciacquare.",
        keyActives: "Olio di bergamotto.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Polyquaternium-10, Cetrimonium Chloride, Dimethiconol, Parfum, Phenoxyethanol, Sodium Chloride, Citrus Bergamia Oil.",
      },

      // -------------------------------------------------------
      // MASCHERA 1 — RIFLESSANTE HENNÈ
      // -------------------------------------------------------
      {
        id: "maschera-riflessante-henne",
        name: "Maschera Riflessante con Estratto di Hennè",
        price: 23,
        description: "Impacco riflessante con hennè puro per luce e vitalità.",
        image: "/mask-hennè-nuovo.webp",
        heroTagline: "Riflessi spettacolari e fibra ristrutturata.",
        detailedDescription:
          "La Maschera Riflessante con Estratto di Hennè mantiene e potenzia i toni dell’hennè, ristrutturando la fibra grazie agli zuccheri naturali della Lawsonia. Dona morbidezza, luminosità e vitalità alle lunghezze.",
        benefits: [
          "Rinforza e ristruttura la fibra.",
          "Esalta i riflessi naturali e cosmetici.",
          "Aumenta morbidezza e luminosità.",
          "Migliora la pettinabilità.",
        ],
        howToUse:
          "Applicare su lunghezze e punte dopo lo shampoo, lasciare agire 5 minuti e risciacquare.",
        keyActives:
          "Estratto di hennè, olio di mandorla.",
        inci:
          "Lawsonia Inermis Leaves Extract, Myristyl Alcohol, Cetyl Alcohol, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate.",
      },

      // -------------------------------------------------------
      // MASCHERA 2 — OLIO D'OLIVA
      // -------------------------------------------------------
      {
        id: "maschera-nutriente-oliva",
        name: "Maschera Nutriente all’Olio d’Oliva",
        price: 23,
        description:
          "Impacco nutriente e idratante con olio d’oliva e mandorla.",
        image: "/mask-nutri-nuovo.webp",
        heroTagline: "Elasticità, morbidezza e idratazione profonda.",
        detailedDescription:
          "La Maschera Nutriente all’Olio d’Oliva dona idratazione profonda e nutrimento grazie agli acidi grassi dell’olio d’oliva. L’olio di mandorla e il pantenolo migliorano elasticità, setosità e struttura del capello.",
        benefits: [
          "Nutrimento intenso e profondo.",
          "Capelli morbidi e più elastici.",
          "Azione emolliente e riparatrice.",
          "Maggiore luminosità e setosità.",
        ],
        howToUse:
          "Applicare dopo lo shampoo, lasciare agire per 5 minuti e risciacquare.",
        keyActives:
          "Olio d’oliva, estratto di mandorla, pantenolo.",
        inci:
          "Aqua, Myristyl Alcohol, Cetearyl Alcohol, Olea Europaea Fruit Oil, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Panthenol, Tetra-di-t-Butylhydroxyhydrocinnamate.",
      },

      // -------------------------------------------------------
      // MASCHERA 3 — BERGAMOTTO
      // -------------------------------------------------------
      {
        id: "maschera-ristrutturante-bergamotto",
        name: "Maschera Ristrutturante con Estratto di Bergamotto",
        price: 23,
        description:
          "Impacco ristrutturante per capelli danneggiati e trattati.",
        image: "/mask-ristrutturante-nuovo.webp",
        heroTagline: "Fibra rigenerata, protezione e luce intensa.",
        detailedDescription:
          "Maschera ad azione ristrutturante intensa che rigenera la fibra capillare danneggiata. L’olio di bergamotto dona brillantezza e protegge, mentre i condizionanti rendono i capelli morbidi e compatti.",
        benefits: [
          "Azione riparatrice profonda.",
          "Più brillantezza e protezione.",
          "Capelli compatti e più forti.",
          "Perfetta dopo trattamenti chimici.",
        ],
        howToUse:
          "Applicare su lunghezze e punte, lasciare agire 5 minuti e risciacquare.",
        keyActives:
          "Olio di bergamotto, estratto di mandorla, condizionanti filmogeni.",
        inci:
          "Aqua, Myristyl Alcohol, Cetearyl Alcohol, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Dimethiconol, Parfum, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate, Citrus Bergamia Oil.",
      },

      // -------------------------------------------------------
      // STYLING — CURL CREAM
      // -------------------------------------------------------
      {
        id: "styling-cream-curl",
        name: "Styling Cream Curl",
        price: 25,
        description:
          "Crema modellante idratante per ricci definiti e morbidi.",
        image: "/styling-nuovo.webp",
        heroTagline: "Ricci elastici, definiti e senza effetto rigido.",
        detailedDescription:
          "Crema modellante leggera che definisce il riccio senza appesantire. La base con glicerina, aloe vera e olio di mandorla idrata, controlla il crespo e migliora la forma naturale del capello.",
        benefits: [
          "Ricci definiti ma morbidi.",
          "Riduce il crespo.",
          "Idrata grazie ad aloe e malva.",
          "Non appesantisce né lascia residui.",
        ],
        howToUse:
          "Applicare su capelli umidi o asciutti, distribuire sulle lunghezze, modellare. Non risciacquare.",
        keyActives: "Aloe vera, olio di mandorla.",
        inci:
          "Aqua, Sodium Chloride, Alcohol Denat., Glycerin, Propylene Glycol, Aloe Barbadensis Leaf Extract, Malva Sylvestris Extract, PVP/VA Copolymer, Polyquaternium-7, Prunus Amygdalus Dulcis Oil, Polyacrylamide, C13-14 Isoparaffin, Laureth-7, Phenoxyethanol, Parfum.",
      },

      // -------------------------------------------------------
      // CREMA MANI
      // -------------------------------------------------------
      {
        id: "crema-mani-liquirizia",
        name: "Crema Idratante Mani con Estratto di Liquirizia",
        price: 15,
        description:
          "Crema mani nutriente e uniformante con liquirizia.",
        image: "/crema-mani-nuovo.webp",
        heroTagline: "Mani morbide, setose e più uniformi.",
        detailedDescription:
          "Crema mani ad azione idratante e levigante, arricchita con estratto di liquirizia ad azione uniformante sulle discromie. Nutre in profondità senza ungere e migliora la morbidezza della pelle.",
        benefits: [
          "Idrata mani secche e screpolate.",
          "Azione levigante ed emolliente.",
          "Estratto di liquirizia uniformante.",
          "Assorbimento rapido senza ungere.",
        ],
        howToUse:
          "Applicare una piccola quantità e massaggiare fino ad assorbimento.",
        keyActives:
          "Estratto di liquirizia, olio di oliva, olio di vinaccioli, glicerina.",
        inci:
          "Aqua, Glycyrrhiza Glabra Extract, Myristyl Alcohol, Cetearyl Alcohol, Olea Europaea Fruit Oil, Vitis Vinifera Seed Oil, Glycerin, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate, Parfum.",
      },

      // -------------------------------------------------------
      // LOZIONE ANTICADUTA
      // -------------------------------------------------------
      {
        id: "lozione-anticaduta",
        name: "Lozione Intensiva Anticaduta",
        price: 40,
        description:
          "Lozione rinforzante con peptidi vegetali ed estratti stimolanti.",
        image: "/lozione-nuovo.webp",
        heroTagline: "Cute attiva, radici forti, caduta ridotta.",
        detailedDescription:
          "Lozione cosmetica intensiva ad azione stimolante e rinforzante. Con peptidi bioattivi ed estratti vegetali che favoriscono la microcircolazione cutanea, aiutando a contrastare la caduta e a rinforzare la fibra capillare.",
        benefits: [
          "Stimola la microcircolazione.",
          "Rinforza la fibra e la radice.",
          "Riduce la caduta eccessiva.",
          "Effetto fresco e rivitalizzante.",
        ],
        howToUse:
          "Applicare alcune gocce sul cuoio capelluto pulito e tamponato, 2–3 volte a settimana. Non risciacquare.",
        keyActives:
          "Peptidi da cereali e semi, rosmarino, ortica, zucca, mentile lattato, oli essenziali stimolanti.",
        inci:
          "Aqua, Alcohol Denat., Propylene Glycol, Ethoxydiglycol, Glycerin, Polyquaternium-7, Hydrolyzed Vegetable Protein, Cetrimonium Chloride, Hydroxyethylcellulose, Rosmarinus Officinalis Leaf Extract, Urtica Dioica Extract, Oryza Sativa Extract, Cucurbita Pepo Seed Extract, Capalgin®, Alistin®, Menthyl Lactate, Zingiber Officinale Root Oil, Mentha Piperita Oil, Capsicum Frutescens Fruit Extract, Disodium EDTA, Decylene Glycol, Phenoxyethanol, Lactic Acid, Citric Acid.",
      },
    ],
  },

  // ---------------------
  //    VERSIONE EN
  // ---------------------
  en: {
    products: [
      // -------------------------------------------------------
      {
        id: "shampoo-riflessante-henne",
        name: "Reflective Henna Shampoo",
        price: 20,
        description:
          "Strengthening shampoo with pure henna extract for bright reflections.",
        image: "/shampoo-hennè-nuovo.webp",
        heroTagline: "Stronger hair, natural shine and vibrant tones.",
        detailedDescription:
          "The Reflective Henna Shampoo enhances and preserves henna-based tones while strengthening the hair fiber. Lawsonia inermis extract, rich in natural sugars, boosts shine, body and vitality, making it ideal for dull or fine hair.",
        benefits: [
          "Maintains and enhances henna reflections.",
          "Strengthens and revitalizes the fiber.",
          "Improves shine, softness and manageability.",
          "Gentle cleansing suitable for frequent washing.",
        ],
        howToUse:
          "Apply to wet scalp and lengths, massage gently, leave on 2–4 minutes and rinse.",
        keyActives: "Henna extract, gentle conditioning agents.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Lawsonia Inermis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      {
        id: "shampoo-emolliente",
        name: "Soothing Emollient Shampoo",
        price: 20,
        description:
          "Gentle cleanser for sensitive scalp and dry, fragile hair.",
        image: "/shampoo-emo-nuovo.webp",
        heroTagline:
          "Immediate softness and comfort for sensitive scalp.",
        detailedDescription:
          "This soothing shampoo gently cleanses sensitive scalps and dry or fragile hair. Oat and chamomile extracts calm the skin while lightweight conditioning agents leave the hair soft, hydrated and easy to detangle.",
        benefits: [
          "Soothing and calming effect.",
          "Soft and hydrated hair.",
          "Does not weigh down.",
          "Respects sensitive scalp.",
        ],
        howToUse:
          "Apply to wet hair, massage, leave on for 4 minutes and rinse.",
        keyActives: "Oat extract, chamomile extract.",
        inci:
          "Aqua, Avena Sativa Extract, Chamomilla Recutita Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Cetrimonium Chloride, Glycerin, Polyquaternium-10, Dimethiconol, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      {
        id: "shampoo-purificante-seboregolatore",
        name: "Purifying Sebum-Regulating Shampoo",
        price: 20,
        description:
          "Purifying formula with botanical extracts for oily scalp.",
        image: "/shampoo-purificante-nuovo.webp",
        heroTagline:
          "Fresh, balanced and lightweight scalp.",
        detailedDescription:
          "A purifying shampoo for normal to oily hair. Bergamot, nettle, mallow and licorice extracts help reduce excess sebum and cleanse the scalp from impurities while maintaining a fresh, light sensation.",
        benefits: [
          "Reduces excess sebum.",
          "Purifies and rebalances the scalp.",
          "Natural antibacterial effect.",
          "Keeps roots lighter for longer.",
        ],
        howToUse:
          "Apply to wet hair, massage, leave on for 2 minutes and rinse.",
        keyActives: "Bergamot, nettle, mallow, licorice extracts.",
        inci:
          "Aqua, Citrus Bergamia Extract, Urtica Dioica Extract, Malva Sylvestris Extract, Glycyrrhiza Glabra Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Sodium Chloride.",
      },

      // -------------------------------------------------------
      {
        id: "shampoo-energizzante",
        name: "Energizing Stimulating Shampoo",
        price: 20,
        description:
          "Strengthening formula with rosemary, menthol and stimulating actives.",
        image: "/sh-energizzante-nuovo.webp",
        heroTagline: "Refreshing boost and stronger hair.",
        detailedDescription:
          "A stimulating shampoo designed to strengthen the hair fiber and boost microcirculation. Rosemary, menthol crystals and menthyl lactate refresh and tone the scalp, promoting stronger, healthier and more vigorous hair.",
        benefits: [
          "Stimulating action on scalp.",
          "Refreshing menthol crystals.",
          "Strengthens weak hair.",
          "Ideal for invigorating the scalp.",
        ],
        howToUse:
          "Apply to wet hair, massage, leave on 2 minutes and rinse.",
        keyActives:
          "Rosemary extract, menthol, menthyl lactate.",
        inci:
          "Aqua, Rosmarinus Officinalis Extract, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Menthyl Lactate, Polyquaternium-7, Menthol, Parfum, Phenoxyethanol.",
      },

      // -------------------------------------------------------
      {
        id: "shampoo-rigenerante-bergamotto",
        name: "Regenerating Bergamot Shampoo",
        price: 20,
        description:
          "Nourishing and gentle cleanser for chemically-treated hair.",
        image: "/shampoo-ristrutturante-nuovo.webp",
        heroTagline: "Softness, shine and deep regeneration.",
        detailedDescription:
          "A regenerating formula enriched with bergamot oil. Ideal for hair sensitized by chemical treatments, it nourishes, softens and enhances shine without irritating the scalp.",
        benefits: [
          "Nourishes and softens.",
          "Enhances shine and luminosity.",
          "Gentle on sensitive scalp.",
          "Perfect for treated or weakened hair.",
        ],
        howToUse:
          "Apply to wet hair, massage, leave on 4 minutes and rinse.",
        keyActives: "Bergamot oil.",
        inci:
          "Aqua, Sodium Coceth Sulfate, Cocamidopropyl Betaine, Polyquaternium-10, Cetrimonium Chloride, Dimethiconol, Parfum, Phenoxyethanol, Sodium Chloride, Citrus Bergamia Oil.",
      },

      // -------------------------------------------------------
      {
        id: "maschera-riflessante-henne",
        name: "Reflective Henna Mask",
        price: 23,
        description:
          "Nourishing mask with pure henna extract and plant oils.",
        image: "/mask-hennè-nuovo.webp",
        heroTagline:
          "Shine, softness and vibrant reflections.",
        detailedDescription:
          "A nourishing mask enriched with natural henna extract. It restores the hair fiber, boosts shine and enhances both natural and cosmetic reflections.",
        benefits: [
          "Boosts shine and color vibrancy.",
          "Strengthens and nourishes.",
          "Improves softness and manageability.",
          "Perfect after henna or botanical treatments.",
        ],
        howToUse:
          "Apply on mid-lengths and ends after shampoo. Leave on 5 minutes and rinse.",
        keyActives:
          "Henna extract, almond extract, conditioning agents.",
        inci:
          "Lawsonia Inermis Leaves Extract, Myristyl Alcohol, Cetyl Alcohol, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate.",
      },

      // -------------------------------------------------------
      {
        id: "maschera-nutriente-oliva",
        name: "Nourishing Olive Mask",
        price: 23,
        description:
          "Deep hydrating mask with olive oil and almond extract.",
        image: "/mask-nutri-nuovo.webp",
        heroTagline:
          "Elasticity, softness and intense nourishment.",
        detailedDescription:
          "A rich and deeply hydrating mask formulated with olive oil, rich in essential fatty acids and antioxidants. It penetrates the hair fiber, improving elasticity, softness and overall hair health. Almond extract and panthenol enhance smoothness and shine.",
        benefits: [
          "Deep nourishment and hydration.",
          "Improves elasticity and softness.",
          "Emollient, repairing action.",
          "Adds shine and smoothness.",
        ],
        howToUse:
          "Apply after shampooing. Leave on for 5 minutes and rinse thoroughly.",
        keyActives:
          "Olive oil, almond extract, panthenol.",
        inci:
          "Aqua, Myristyl Alcohol, Cetearyl Alcohol, Olea Europaea Fruit Oil, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Parfum, Phenoxyethanol, Panthenol, Tetra-di-t-Butylhydroxyhydrocinnamate.",
      },

      // -------------------------------------------------------
      {
        id: "maschera-ristrutturante-bergamotto",
        name: "Restructuring Bergamot Mask",
        price: 23,
        description:
          "Intensive restructuring mask for damaged or treated hair.",
        image: "/mask-ristrutturante-nuovo.webp",
        heroTagline:
          "Regenerated fiber, protection and intense shine.",
        detailedDescription:
          "An intensive restructuring treatment ideal for chemically treated or damaged hair. Bergamot oil enhances shine and provides protection, while conditioning agents strengthen and smooth the hair fiber.",
        benefits: [
          "Deep repairing action.",
          "Boosts shine and softness.",
          "Strengthens and smooths the fiber.",
          "Ideal after chemical treatments.",
        ],
        howToUse:
          "Apply to mid-lengths and ends. Leave on 5 minutes and rinse.",
        keyActives:
          "Bergamot oil, almond extract, film-forming conditioners.",
        inci:
          "Aqua, Myristyl Alcohol, Cetearyl Alcohol, Prunus Amygdalus Dulcis Extract, Polyquaternium-10, Cetrimonium Chloride, Dimethiconol, Parfum, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate, Citrus Bergamia Oil.",
      },

      // -------------------------------------------------------
      {
        id: "styling-cream-curl",
        name: "Styling Cream Curl",
        price: 25,
        description:
          "Hydrating curl-defining cream for soft, bouncy curls.",
        image: "/styling-nuovo.webp",
        heroTagline:
          "Defined curls, natural elasticity and zero frizz.",
        detailedDescription:
          "A lightweight curl cream designed to define, shape and hydrate curls without weighing them down. Formulated with Sepigel, aloe vera, mallow extract and almond oil, it controls frizz, enhances curl formation and provides lasting softness.",
        benefits: [
          "Enhances curl definition.",
          "Reduces frizz with lasting hydration.",
          "Soft, natural movement with no stiffness.",
          "Absorbs quickly without leaving residue.",
        ],
        howToUse:
          "Apply to damp or dry hair, distribute evenly through lengths and style. Do not rinse.",
        keyActives:
          "Aloe vera, mallow extract, almond oil.",
        inci:
          "Aqua, Sodium Chloride, Alcohol Denat., Glycerin, Propylene Glycol, Aloe Barbadensis Leaf Extract, Malva Sylvestris Extract, PVP/VA Copolymer, Polyquaternium-7, Prunus Amygdalus Dulcis Oil, Polyacrylamide, C13-14 Isoparaffin, Laureth-7, Phenoxyethanol, Parfum.",
      },

      // -------------------------------------------------------
      {
        id: "crema-mani-liquirizia",
        name: "Hydrating Hand Cream with Licorice Extract",
        price: 15,
        description:
          "Nourishing and brightening hand cream for dry, chapped skin.",
        image: "/crema-mani-nuovo.webp",
        heroTagline: "Soft, smooth and more even-looking hands.",
        detailedDescription:
          "A deeply hydrating and softening hand cream enriched with licorice extract, known for its brightening and soothing properties. It nourishes without greasiness and helps improve the appearance of dry or uneven skin.",
        benefits: [
          "Hydrates dry and cracked hands.",
          "Softening and smoothing effect.",
          "Licorice extract helps even out skin tone.",
          "Quick absorption, non-greasy texture.",
        ],
        howToUse:
          "Apply a small amount and massage until completely absorbed.",
        keyActives:
          "Licorice extract, olive oil, grapeseed oil, glycerin.",
        inci:
          "Aqua, Glycyrrhiza Glabra Extract, Myristyl Alcohol, Cetearyl Alcohol, Olea Europaea Fruit Oil, Vitis Vinifera Seed Oil, Glycerin, Phenoxyethanol, Tetra-di-t-Butylhydroxyhydrocinnamate, Parfum.",
      },

      // -------------------------------------------------------
      {
        id: "lozione-anticaduta",
        name: "Intensive Anti-Hair Loss Lotion",
        price: 40,
        description:
          "Stimulating cosmetic lotion with bioactive peptides and plant extracts.",
        image: "/lozione-nuovo.webp",
        heroTagline:
          "Stimulated scalp, stronger roots, reduced fall.",
        detailedDescription:
          "A powerful anti-hair loss lotion formulated with stimulating plant extracts and bioactive peptide complexes derived from hydrolyzed grains and seeds. It improves microcirculation, reinforces the follicle and helps reduce excessive shedding.",
        benefits: [
          "Stimulates scalp microcirculation.",
          "Strengthens the follicle with plant-derived peptides.",
          "Helps reduce hair loss.",
          "Refreshing and invigorating effect.",
        ],
        howToUse:
          "Apply a few drops to clean, towel-dried scalp 2–3 times weekly. Massage until absorbed. Do not rinse.",
        keyActives:
          "Peptides from hydrolyzed grains and seeds, rosemary, nettle, pumpkin seed, menthyl lactate, ginger and mint oils.",
        inci:
          "Aqua, Alcohol Denat., Propylene Glycol, Ethoxydiglycol, Glycerin, Polyquaternium-7, Hydrolyzed Vegetable Protein, Cetrimonium Chloride, Hydroxyethylcellulose, Rosmarinus Officinalis Leaf Extract, Urtica Dioica Extract, Oryza Sativa Extract, Cucurbita Pepo Seed Extract, Capalgin®, Alistin®, Menthyl Lactate, Zingiber Officinale Root Oil, Mentha Piperita Oil, Capsicum Frutescens Fruit Extract, Disodium EDTA, Decylene Glycol, Phenoxyethanol, Lactic Acid, Citric Acid.",
      },
    ],
  },
};
