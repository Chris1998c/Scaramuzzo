"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Language = "it" | "en";

const botanicalItems = {
  it: [
    {
      id: "miscela-1",
      name: "Erbe Riflessanti – Nutri",
      description:
        "Miscela di cereali ed erbe botaniche dalla Calabria, formulata per nutrire i capelli e donare riflessi morbidi e naturali. Avena, riso, orzo, farro, liquirizia, foglie di mandarino e camomilla per capelli più forti, setosi e lucenti.",
      image: "/Nutri.webp",
    },
    {
      id: "miscela-2",
      name: "Erbe Riflessanti – Rosso",
      description:
        "Henné puro da Lawsonia inermis, ideale per riflessi rossi intensi e luminosi.",
      image: "/Rosso.webp",
    },
    {
      id: "miscela-3",
      name: "Erbe Riflessanti – Rosso Profondo",
      description:
        "Versione potenziata dell’henné rosso per un rosso vibrante e profondo.",
      image: "/RossoProfondo.webp",
    },
    {
      id: "miscela-4",
      name: "Erbe Riflessanti – Mallo di Noce",
      description:
        "Miscela a base di mallo di noce per sfumature castane calde e avvolgenti.",
      image: "/Mallo.webp",
    },
    {
      id: "miscela-5",
      name: "Erbe Riflessanti – Ice",
      description:
        "Formula per bilanciare i toni caldi dell’henné e creare riflessi più freddi.",
      image: "/Ice.webp",
    },
  ],
  en: [
    {
      id: "miscela-1",
      name: "Reflective Herbs – Nutri",
      description:
        "Herbal and cereal blend from Calabria, designed to nourish hair and give soft, natural highlights.",
      image: "/Nutri.webp",
    },
    {
      id: "miscela-2",
      name: "Reflective Herbs – Red",
      description:
        "Pure Lawsonia inermis henna for intense, bright red tones.",
      image: "/Rosso.webp",
    },
    {
      id: "miscela-3",
      name: "Reflective Herbs – Deep Red",
      description:
        "Enhanced henna blend for a deeper, more vibrant red result.",
      image: "/RossoProfondo.webp",
    },
    {
      id: "miscela-4",
      name: "Reflective Herbs – Walnut Hull",
      description:
        "Walnut hull–based blend for warm, enveloping brown undertones.",
      image: "/Mallo.webp",
    },
    {
      id: "miscela-5",
      name: "Reflective Herbs – Ice",
      description:
        "Designed to counteract warm tones and create cooler, more neutral reflections.",
      image: "/Ice.webp",
    },
  ],
};

const BotanicalDetailClient: FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") setLanguage(stored);
  }, []);

  const t = botanicalItems[language];

  const handleBackClick = useCallback(() => {
    router.push("/services");
  }, [router]);

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {language === "it"
            ? "Colorazione con Erbe Botaniche"
            : "Botanical Herbal Hair Coloring"}
        </h1>

        <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
          {language === "it"
            ? "Le nostre miscele botaniche professionali nascono da erbe selezionate e cereali della nostra terra."
            : "Our professional botanical blends are made with selected herbs and cereals from our local land."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {t.map((item) => (
            <Card key={item.id} className="w-full h-full flex flex-col">
              <div className="relative w-full h-80">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {item.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleBackClick}>
            {language === "it" ? "Torna ai Servizi" : "Back to Services"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BotanicalDetailClient;
