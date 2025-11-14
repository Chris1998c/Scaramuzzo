"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Language = "it" | "en";

export default function ServicesClient() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const translations = {
    it: {
      title: "I Nostri Servizi",
      services: [
        {
          id: "taglio-di-capelli",
          name: "Taglio di Capelli",
          description:
            "Consulenza e taglio su misura per valorizzare viso e texture naturale.",
          image: "/TaglioNew.jpg",
          imageAlt: "Taglio di Capelli",
        },
        {
          id: "colorazione-con-erbe-botaniche",
          name: "Colorazione con Erbe Botaniche",
          description:
            "Colorazioni naturali con miscele di erbe e cereali dalla nostra terra.",
          image: "/ERBE.jpg",
          imageAlt: "Colorazione con erbe botaniche",
        },
        {
          id: "trattamenti",
          name: "Trattamenti",
          description:
            "Percorsi di ricostruzione, idratazione e Bond Repair studiati su misura.",
          image: "/trattamento.jpg",
          imageAlt: "Trattamenti",
        },
        {
          id: "acconciature",
          name: "Acconciature",
          description:
            "Raccolti, onde e styling per matrimoni, eventi e momenti speciali.",
          image: "/Acconciatura.jpg",
          imageAlt: "Acconciature",
        },
        {
          id: "sanlai",
          name: "Sanlai",
          description:
            "Schiariture a mano libera ispirate alla luce del sole, morbide e naturali.",
          image: "/sanlai.webp",
          imageAlt: "Schiariture Sanlai",
        },
        {
          id: "massaggio-del-cuoio-capelluto",
          name: "Massaggio del Cuoio Capelluto",
          description:
            "Rituale shampoo e massaggio per rilassare la mente e riattivare la circolazione.",
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
          description:
            "Tailor-made haircut to enhance face shape and natural hair texture.",
          image: "/TaglioNew.jpg",
          imageAlt: "Haircut",
        },
        {
          id: "colorazione-con-erbe-botaniche",
          name: "Botanical Hair Coloring",
          description:
            "Natural color services with herbal and cereal blends from our land.",
          image: "/ERBE.jpg",
          imageAlt: "Botanical Hair Coloring",
        },
        {
          id: "trattamenti",
          name: "Treatments",
          description:
            "Rebuilding, hydrating and Bond Repair rituals designed for your hair.",
          image: "/trattamento.jpg",
          imageAlt: "Treatments",
        },
        {
          id: "acconciature",
          name: "Hairstyling",
          description:
            "Updos, waves and styling for weddings, events and special moments.",
          image: "/Acconciatura.jpg",
          imageAlt: "Hairstyling",
        },
        {
          id: "sanlai",
          name: "Sanlai",
          description:
            "Freehand lightening inspired by sunlight, soft and naturally blended.",
          image: "/sanlai.webp",
          imageAlt: "Sanlai Highlights",
        },
        {
          id: "massaggio-del-cuoio-capelluto",
          name: "Scalp Massage",
          description:
            "Shampoo and massage ritual to relax and gently stimulate circulation.",
          image: "/Massaggio.webp",
          imageAlt: "Scalp Massage",
        },
      ],
    },
  };

  const t = translations[language];

  const handleServiceClick = (id: string) => {
    if (id === "colorazione-con-erbe-botaniche") {
      router.push("/services/erbe-botaniche");
    } else {
      router.push(`/services/${id}`);
    }
  };

  const isSignature = (id: string) =>
    id === "sanlai" || id === "colorazione-con-erbe-botaniche";

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          {t.title}
        </h1>
        <p className="max-w-2xl mx-auto text-center text-sm sm:text-base text-muted-foreground mb-10 sm:mb-12">
          {language === "it"
            ? "Una selezione di servizi pensati per unire benessere, naturalezza e ricerca stilistica, nel pieno rispetto della struttura del capello."
            : "A selection of services designed to combine well-being, natural results and style research, always respecting the hair structure."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {t.services.map((service) => (
            <Card
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                {isSignature(service.id) && (
                  <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                    Signature
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg md:text-xl">
                  {service.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-5">
                <CardDescription className="text-sm md:text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
