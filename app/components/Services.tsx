'use client';

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServicesProps {
  language: "it" | "en";
}

const Services: FC<ServicesProps> = ({ language }) => {
  const router = useRouter();

  const translations = {
    it: {
      title: "I Nostri Servizi",
      services: [
        {
          id: "taglio-di-capelli",
          name: "Taglio di Capelli",
          description: "Taglio personalizzato per uomo e donna",
          image: "/TaglioNew.jpg",
          imageAlt: "Taglio di Capelli",
          detailedDescription: "Il nostro servizio di taglio capelli offre un'esperienza personalizzata per ogni cliente. I nostri stilisti esperti lavorano con voi per creare un look che si adatti perfettamente al vostro stile di vita e alla forma del vostro viso.",
        },
        {
          id: "colorazione-con-erbe-botaniche",
          name: "Colorazione con erbe botaniche",
          description: "Tinte naturali e tecniche innovative",
          image: "/ERBE.jpg",
          imageAlt: "Colorazione con erbe botaniche",
          detailedDescription: "La nostra colorazione con erbe botaniche è un trattamento delicato e naturale per i vostri capelli. Utilizziamo solo ingredienti di origine vegetale per ottenere colori vibranti e duraturi, proteggendo al contempo la salute dei vostri capelli.",
        },
        {
          id: "trattamenti",
          name: "Trattamenti",
          description: "Trattamenti per capelli danneggiati e cure specifiche",
          image: "/trattamento.jpg",
          imageAlt: "Trattamenti",
          detailedDescription: 
`Offriamo una vasta gamma di trattamenti per capelli:
- Cheratina Vegetale: Ripristina forza, elasticità e lucentezza naturale.
- Trattamenti Cute con Erbe: Soluzioni naturali per migliorare la salute del cuoio capelluto.
- Peeling: Detersione profonda per un cuoio capelluto rigenerato.
- Rigenerante: Rivitalizza i capelli fragili e danneggiati.
- Post Colore: Mantieni la brillantezza e la durata del colore.
- Trattamento di Rigenerazione: Rigenera i capelli in profondità per un aspetto sano e forte.`,
        },
        {
          id: "acconciature",
          name: "Acconciature",
          description: "Styling per ogni occasione",
          image: "/Acconciatura.jpg",
          imageAlt: "Acconciature",
          detailedDescription: "Che si tratti di un'occasione speciale o di un look quotidiano, i nostri stilisti creano acconciature uniche e personalizzate. Dalle pettinature eleganti per matrimoni alle acconciature casual per tutti i giorni, vi faremo sentire al meglio.",
        },
        {
          id: "sanlai",
          name: "Sanlai",
          description: "Schiariture",
          image: "/sanlai.webp",
          imageAlt: "Schiariture Sanlai",
          detailedDescription: "La tecnica Sanlai è il nostro metodo innovativo per schiarire i capelli in modo naturale e delicato. Questa tecnica permette di ottenere riflessi luminosi e naturali, rispettando la struttura del capello e mantenendolo sano e forte.",
        },
        {
          id: "massaggio-del-cuoio-capelluto",
          name: "Massaggio del Cuoio Capelluto",
          description: "Rilassante massaggio per la salute dei capelli",
          image: "/Massaggio.webp",
          imageAlt: "Massaggio del Cuoio Capelluto",
          detailedDescription: "Il nostro massaggio del cuoio capelluto non è solo rilassante, ma anche benefico per la salute dei vostri capelli. Stimola la circolazione, promuove la crescita dei capelli e aiuta a ridurre lo stress, lasciandovi completamente rinnovati.",
        },
      ],
    },
    en: {
      title: "Our Services",
      services: [
        {
          id: "haircut",
          name: "Haircut",
          description: "Personalized cut for men and women",
          image: "/taglio.jpg",
          imageAlt: "Haircut",
          detailedDescription: "Our haircut service offers a personalized experience for each client. Our expert stylists work with you to create a look that perfectly suits your lifestyle and face shape.",
        },
        {
          id: "botanical-hair-coloring",
          name: "Botanical Hair Coloring",
          description: "Natural dyes and innovative techniques",
          image: "/ERBE.jpg",
          imageAlt: "Botanical Hair Coloring",
          detailedDescription: "Our botanical hair coloring is a gentle and natural treatment for your hair. We use only plant-based ingredients to achieve vibrant and long-lasting colors while protecting the health of your hair.",
        },
        {
          id: "treatments",
          name: "Treatments",
          description: "Treatments for damaged hair and specific care",
          image: "/trattamento.jpg",
          imageAlt: "Treatments",
          detailedDescription:
`We offer a wide range of treatments for hair:
- Plant-Based Keratin: Restores strength, elasticity, and natural shine.
- Herbal Scalp Treatments: Natural solutions to improve scalp health.
- Peeling: Deep cleansing for a rejuvenated scalp.
- Revitalizing: Revitalizes fragile and damaged hair.
- Post Color: Maintains color brilliance and longevity.
- Deep Regeneration Treatment: Deeply regenerates hair for a healthy and strong look.`,
        },
        {
          id: "hairstyling",
          name: "Hairstyling",
          description: "Styling for every occasion",
          image: "/Acconciatura.jpg",
          imageAlt: "Hairstyling",
          detailedDescription: "Whether it's for a special occasion or an everyday look, our stylists create unique and personalized hairstyles. From elegant wedding updos to casual everyday styles, we'll make you look and feel your best.",
        },
        {
          id: "sanlai",
          name: "Sanlai",
          description: "Hair lightening",
          image: "/sanlai.webp",
          imageAlt: "Sanlai Hair Lightening",
          detailedDescription: "The Sanlai technique is our innovative method for lightening hair naturally and gently. This technique allows for bright and natural-looking highlights while respecting the hair structure and keeping it healthy and strong.",
        },
        {
          id: "scalp-massage",
          name: "Scalp Massage",
          description: "Relaxing massage for hair health",
          image: "/Massaggio.webp",
          imageAlt: "Scalp Massage",
          detailedDescription: "Our scalp massage is not only relaxing but also beneficial for your hair health. It stimulates circulation, promotes hair growth, and helps reduce stress, leaving you feeling completely renewed.",
        },
      ],
    },
  };

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  // Per mostrare i trattamenti su più righe, aggiungiamo una classe per gestire il whitespace
  // Assicurati che la classe "whitespace-pre-line" esista (tailwind la supporta di default)
  // e che "CardDescription" accetti className (dal tuo codice sembra di sì, è un componente UI generico).

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {translations[language].title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations[language].services.map((service) => (
            <Card 
              key={service.id} 
              className="w-full h-full flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="whitespace-pre-line">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
