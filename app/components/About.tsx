"use client";

import { FC } from "react";

interface AboutProps {
  language: "it" | "en";
}

const translations = {
  it: {
    title: "Chi Siamo",
    intro: `Scaramuzzo Hair Natural Beauty nasce dal desiderio di unire tradizione, natura e ricerca continua.
I nostri saloni sono luoghi in cui tecnica, esperienza e botanica si trasformano in un percorso personale di bellezza.
Crediamo in uno stile costruito su misura, rispettoso della fibra capillare e capace di esaltare la naturale unicità di ogni persona.`,
    sections: [
      {
        heading: "La nostra storia",
        paragraphs: [
          `La storia del brand inizia molto prima dell’apertura dei saloni: nasce dall’idea che la bellezza debba essere autentica, naturale e costruita intorno alla persona.`,
          `Giuseppe Scaramuzzo entra nel mondo dell’hairstyling giovanissimo. Dopo gli studi a Roma e le prime collaborazioni con professionisti italiani, nel 1993 inizia un percorso che segnerà profondamente il suo stile e la sua visione del mestiere: anni di lavoro, formazione e crescita artistica che lo portano a sviluppare un approccio sempre più sartoriale alla bellezza.`,
          `Nel 2013 decide di trasformare questa esperienza in un progetto personale e apre il suo primo salone a Corigliano Calabro, dando vita al marchio Scaramuzzo Hair Natural Beauty. Da lì inizia una crescita costante, costruita sulla fiducia delle clienti, sulla qualità del servizio e su una forte identità legata alla natura e alla ricerca.`,
        ],
      },
      {
        heading: "I nostri saloni",
        paragraphs: [
          `Negli anni, il progetto si espande e Scaramuzzo Hair Natural Beauty diventa una realtà strutturata con quattro saloni:`,
          `• Corigliano - Rossano  
• Cosenza  
• Castrovillari  
• Roma – Centro Storico`,
          `Ogni salone è pensato come uno spazio accogliente, luminoso e funzionale, dove consulenza, tecnica e attenzione al dettaglio si uniscono per creare un’esperienza completa di benessere.`,
        ],
      },
      {
        heading: "Il nostro team",
        paragraphs: [
          `La vera forza del marchio sono le persone. Il team Scaramuzzo è composto da professionisti appassionati, formati internamente e in costante aggiornamento, uniti da una visione comune: ascoltare, valorizzare e creare bellezza rispettosa e personalizzata.`,
          `Nei nostri saloni non esistono servizi “standard”: tagli, colori, schiariture e trattamenti nascono sempre dallo studio della struttura del capello, del viso, dello stile di vita e della personalità di ogni cliente. Ogni risultato è pensato per essere armonico, portabile e unico.`,
        ],
      },
      {
        heading: "Laboratorio e ricerca botanica",
        paragraphs: [
          `Parallelamente al lavoro in salone, negli anni abbiamo sviluppato un laboratorio dedicato allo studio delle erbe botaniche e alla creazione di prodotti professionali.`,
          `Qui nascono miscele riflessanti alle erbe, henné di alta qualità, oli botanici e trattamenti naturali formulati con ingredienti selezionati. L’obiettivo è semplice: prodotti efficaci, sicuri, naturali e compatibili con la salute del capello.`,
        ],
      },
      {
        heading: "La nostra filosofia",
        paragraphs: [
          `Portiamo avanti ogni giorno una visione precisa: la bellezza non deve essere forzata, ma esaltata.`,
          `Capelli naturali, setosi e sani. Colori rispettosi della fibra. Tecniche personalizzate. Un’accoglienza autentica, mai frettolosa.`,
          `Ogni stile è un abito sartoriale, cucito su misura per valorizzare chi lo indossa. Questa è l’essenza di Scaramuzzo Hair Natural Beauty.`,
        ],
      },
    ],
  },
  en: {
    title: "About Us",
    intro: `Scaramuzzo Hair Natural Beauty was created from the desire to bring together tradition, nature, and continuous research.
Our salons are places where technique, experience, and botanicals become a personal journey of beauty.
We believe in a made-to-measure style, respectful of the hair fiber and able to enhance each person’s natural uniqueness.`,
    sections: [
      {
        heading: "Our History",
        paragraphs: [
          `The story of the brand begins long before the opening of the salons. It starts from the idea that beauty should be authentic, natural, and built around the individual.`,
          `Giuseppe Scaramuzzo entered the world of hairstyling at a very young age. After studying in Rome and working with Italian professionals, in **1993** he began a journey that would deeply shape his style and professional vision: years of work, training, and artistic growth that led him to develop a truly tailor-made approach to beauty.`,
          `In **2013**, he decided to transform this experience into his own project and opened his first salon in Corigliano Calabro, giving life to the Scaramuzzo Hair Natural Beauty brand. From there, a steady growth began, built on client trust, service quality, and a strong identity rooted in nature and research.`,
        ],
      },
      {
        heading: "Our Salons",
        paragraphs: [
          `Over the years, Scaramuzzo Hair Natural Beauty has grown into a structured reality with four salons:`,
          `• Corigliano Calabro  
• Cosenza  
• Castrovillari  
• Rome – Historic Center`,
          `Each salon is designed as a welcoming, functional space where consultation, technique, and attention to detail come together to create a complete beauty and well-being experience.`,
        ],
      },
      {
        heading: "Our Team",
        paragraphs: [
          `Our real strength lies in people. The Scaramuzzo team is made up of passionate professionals, trained within the brand and constantly evolving, united by a shared vision: listening, enhancing, and creating respectful, personalized beauty.`,
          `In our salons, no service is ever “standard”. Haircuts, colors, lightening techniques, and treatments are always tailored to each client’s hair type, face shape, lifestyle, and personality. Every result is designed to be harmonious, wearable, and unique.`,
        ],
      },
      {
        heading: "Laboratory & Botanical Research",
        paragraphs: [
          `Alongside our salon work, we have developed a laboratory dedicated to the study of botanicals and the creation of professional haircare products.`,
          `Here we produce herbal reflective blends, high-quality henna, botanical oils, and natural treatments formulated with carefully selected ingredients. Our goal is clear: effective, safe, natural products that fully respect hair health.`,
        ],
      },
      {
        heading: "Our Philosophy",
        paragraphs: [
          `Every day we pursue a clear vision: beauty should not be forced, but enhanced.`,
          `Natural, silky, healthy hair. Colors that respect the hair fiber. Personalized techniques. A genuine, never rushed welcome.`,
          `Every style is like a tailored garment, designed to enhance the person who wears it. This is the essence of Scaramuzzo Hair Natural Beauty.`,
        ],
      },
    ],
  },
};

const About: FC<AboutProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-6">
        {/* Titolo */}
        <h1 className="text-4xl font-bold text-center mb-8">
          {t.title}
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed mb-10 text-center whitespace-pre-line">
          {t.intro}
        </p>

        {/* Sezioni */}
        {t.sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="leading-relaxed mb-4 whitespace-pre-line"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
