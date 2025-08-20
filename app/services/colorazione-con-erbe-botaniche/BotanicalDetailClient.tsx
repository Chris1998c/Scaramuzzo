'use client'

import { FC, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const botanicalItems = [
  {
    id: "miscela-1",
    name: "Erbe RIflessanti-Nutri",
    description: "Un'esclusiva miscela di cereali ed erbe botaniche provenienti dalla Calabria, formulata per nutrire i capelli e donare riflessi naturali. Grazie all’avena, riso, orzo, farro e un tocco di liquirizia, foglie di mandarino e camomilla, i capelli risulteranno forti, setosi e lucenti, esaltando la bellezza naturale.",
    image: "/Nutri.jpg",
  },
  {
    id: "miscela-2",
    name: "Erbe RIflessanti-Rosso",
    description: "Viene estratto dalla pianta  Lawsonia Inermis. Il suo utilizzo è soprattutto cosmetico per le proprietà coloranti e nutritive.  Le parti utilizzate sono le foglie che vengono essiccate al sole e poi triturate fino ad ottenere una polvere che si scioglie facilmente in acqua,Ottieni riflessi naturali rossi intensi grazie all’Henné puro. Dona lucentezza e rinforza i capelli, garantendo una colorazione naturale e duratura.",
    image: "/Rosso.jpg",
  },
  {
    id: "miscela-3",
    name: "Erbe RIflessanti-Rosso Profondo",
    description: "Una versione potenziata dell’Henné Rosso, arricchita con coloranti naturali per un rosso ancora più vibrante e duraturo. Ideale per chi cerca intensità e rinforzo, con il massimo rispetto per la naturalezza e la salute dei capelli.",
    image: "/RossoProfondo.webp",
  },
  {
    id: "miscela-4",
    name: "Erbe RIflessanti-Mallo di Noce",
    description: "Una colorazione naturale che dona sfumature castane e calde, ideale per capelli scuri che vogliono intensificare il colore e la morbidezza.",
    image: "/Mallo.webp",
  },
  {
    id: "miscela-5",
    name: "Erbe RIflessanti-Ice",
    description: "Una formula studiata per bilanciare i toni caldi dell’henné, creando riflessi più freddi e naturali. Ideale per chi desidera attenuare le sfumature rossastre tipiche dell’henné, donando un aspetto più neutro e armonioso ai capelli. Questa miscela non solo regola il tono, ma nutre intensamente i capelli, lasciandoli morbidi, lucenti e visibilmente sani. Perfetta per ottenere un risultato sofisticato e naturale.",
    image: "/Ice.webp",
  },
]

const BotanicalDetailClient: FC = () => {
  const router = useRouter()

  const handleBackClick = useCallback(() => {
    router.push('/')
    localStorage.setItem('navigateTo', 'services')
  }, [router])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Colorazione con Erbe Botaniche</h2>
        <p className="text-lg mb-8 text-center">
          Scopri la nostra selezione di miscele botaniche per ottenere colori vibranti, naturali e rispettosi della salute dei tuoi capelli.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {botanicalItems.map(item => (
            <Card key={item.id} className="w-full h-full flex flex-col">
              <div className="relative w-full h-96">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
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
            Torna ai Servizi
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BotanicalDetailClient
