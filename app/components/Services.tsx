'use client'

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

const servicesData = {
  it: {
    title: "I Nostri Servizi",
    services: [
      {
        id: "taglio-di-capelli",
        name: "Taglio di Capelli",
        description: "Taglio personalizzato per uomo e donna",
        image: "/TaglioNew.jpg",
        imageAlt: "Taglio di Capelli",
      },
      {
        id: "colorazione-con-erbe-botaniche",
        name: "Colorazione con erbe botaniche",
        description: "Tinte naturali e tecniche innovative",
        image: "/ERBE.jpg",
        imageAlt: "Colorazione con erbe botaniche",
      },
      {
        id: "trattamenti",
        name: "Trattamenti",
        description: "Trattamenti per capelli danneggiati e cure specifiche",
        image: "/trattamento.jpg",
        imageAlt: "Trattamenti",
      },
      {
        id: "acconciature",
        name: "Acconciature",
        description: "Styling per ogni occasione",
        image: "/Acconciatura.jpg",
        imageAlt: "Acconciature",
      },
      {
        id: "sanlai",
        name: "Sanlai",
        description: "Schiariture naturali e luminose",
        image: "/sanlai.webp",
        imageAlt: "Schiariture Sanlai",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        name: "Massaggio del Cuoio Capelluto",
        description: "Rilassante massaggio per la salute dei capelli",
        image: "/Massaggio.webp",
        imageAlt: "Massaggio del Cuoio Capelluto",
      },
    ],
  },
  en: {
    title: "Our Services",
    services: [
      {
        id: "taglio-di-capelli",
        name: "Haircut",
        description: "Personalized haircut for men and women",
        image: "/TaglioNew.jpg",
        imageAlt: "Haircut",
      },
      {
        id: "colorazione-con-erbe-botaniche",
        name: "Botanical Hair Coloring",
        description: "Natural dyes and innovative techniques",
        image: "/ERBE.jpg",
        imageAlt: "Botanical Hair Coloring",
      },
      {
        id: "trattamenti",
        name: "Treatments",
        description: "Treatments for damaged hair and specific needs",
        image: "/trattamento.jpg",
        imageAlt: "Treatments",
      },
      {
        id: "acconciature",
        name: "Hairstyling",
        description: "Styling for every occasion",
        image: "/Acconciatura.jpg",
        imageAlt: "Hairstyling",
      },
      {
        id: "sanlai",
        name: "Sanlai",
        description: "Natural and bright lightening",
        image: "/sanlai.webp",
        imageAlt: "Sanlai Highlights",
      },
      {
        id: "massaggio-del-cuoio-capelluto",
        name: "Scalp Massage",
        description: "Relaxing massage for scalp and hair health",
        image: "/Massaggio.webp",
        imageAlt: "Scalp Massage",
      },
    ],
  },
};

const Services: FC<ServicesProps> = ({ language }) => {
  const router = useRouter();
  const t = servicesData[language];

  const handleServiceClick = (id: string) => {
    router.push(`/services/${id}`);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          {t.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
