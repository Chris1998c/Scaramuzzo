"use client";

import { FC, useCallback } from "react";
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

const botanicalItems = [
  {
    id: "miscela-1",
    name: "Erbe Riflessanti – Nutri",
    description:
      "Miscela di cereali ed erbe botaniche dalla Calabria, formulata per nutrire i capelli e donare riflessi morbidi e naturali. Avena, riso, orzo, farro, liquirizia, foglie di mandarino e camomilla per capelli più forti, setosi e lucenti.",
    image: "/Nutri.jpg",
  },
  {
    id: "miscela-2",
    name: "Erbe Riflessanti – Rosso",
    description:
      "Henné puro da Lawsonia inermis, ideale per riflessi rossi intensi e luminosi. Dona corpo, lucentezza e rinforza la fibra capillare con una colorazione naturale e duratura.",
    image: "/Rosso.jpg",
  },
  {
    id: "miscela-3",
    name: "Erbe Riflessanti – Rosso Profondo",
    description:
      "Versione potenziata dell’henné rosso, arricchita con componenti naturali per un rosso più vibrante e profondo. Perfetta per chi cerca intensità e struttura, nel pieno rispetto del capello.",
    image: "/RossoProfondo.webp",
  },
  {
    id: "miscela-4",
    name: "Erbe Riflessanti – Mallo di Noce",
    description:
      "Miscela a base di mallo di noce per sfumature castane calde e avvolgenti. Ideale per capelli scuri che desiderano intensificare il colore, la morbidezza e la brillantezza.",
    image: "/Mallo.webp",
  },
  {
    id: "miscela-5",
    name: "Erbe Riflessanti – Ice",
    description:
      "Formula studiata per bilanciare i toni caldi dell’henné, creando riflessi più freddi e neutri. Attenua le sfumature eccessivamente ramate, nutre intensamente e lascia i capelli morbidi e luminosi.",
    image: "/Ice.webp",
  },
];

const BotanicalDetailClient: FC = () => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    router.push("/services");
  }, [router]);

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Colorazione con Erbe Botaniche
        </h1>
        <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
          Le nostre miscele botaniche professionali nascono da erbe selezionate
          e cereali della nostra terra. Pensate per riflessi naturali, profondi,
          luminosi e per un capello più forte, protetto e rispettato.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {botanicalItems.map((item) => (
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
          <Button onClick={handleBackClick}>Torna ai Servizi</Button>
        </div>
      </div>
    </section>
  );
};

export default BotanicalDetailClient;
