'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Service {
  id: string
  alias?: string
  name: string
  description: string
  image: string
  imageAlt: string
  detailedDescription: string
}

// Definisci translations fuori dal componente se vuoi evitare warning sui useEffect
const translations = {
  it: {
    services: [
      {
        id: "taglio-di-capelli",
        alias: "haircut",
        name: "Taglio di Capelli",
        description: "Taglio personalizzato per uomo e donna",
        image: "/taglio.jpg",
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
        detailedDescription: 
`Offriamo una vasta gamma di trattamenti per capelli:
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
        image: "/erbe.jpg",
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
    services: [
      {
        id: "taglio-di-capelli",
        alias: "taglio-di-capelli",
        name: "Haircut",
        description: "Personalized cut for men and women",
        image: "/taglio.jpg",
        imageAlt: "Haircut",
        detailedDescription: "Our haircut service offers a personalized experience ...",
      },
      {
        id: "botanical-hair-coloring",
        alias: "colorazione-con-erbe-botaniche",
        name: "Botanical Hair Coloring",
        description: "Natural dyes and innovative techniques",
        image: "/erbe.jpg",
        imageAlt: "Botanical Hair Coloring",
        detailedDescription: "Our botanical hair coloring is a gentle and natural treatment ...",
      },
      {
        id: "treatments",
        alias: "trattamenti",
        name: "Treatments",
        description: "Treatments for damaged hair and specific care",
        image: "/erbe.jpg",
        imageAlt: "Treatments",
        detailedDescription:
`We offer a wide range of treatments for hair:
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
        image: "/erbe.jpg",
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
        image: "/erbe.jpg",
        imageAlt: "Scalp Massage",
        detailedDescription: "Our scalp massage is not only relaxing but also beneficial ...",
      },
    ],
  },
};

const ServicePage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [service, setService] = useState<Service | null>(null)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en'
    if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage)
    }
  }, [language])

  useEffect(() => {
    if (params.id) {
      let currentService = translations[language].services.find(s => s.id === params.id);
      
      if (!currentService) {
        const otherLanguage = language === 'it' ? 'en' : 'it';
        const serviceInOtherLanguage = translations[otherLanguage].services.find(s => s.id === params.id);
        if (serviceInOtherLanguage) {
          currentService = translations[language].services.find(s => s.alias === serviceInOtherLanguage.id);
        }
      }

      setService(currentService || null);
    }
  }, [params.id, language])

  const handleBackClick = useCallback(() => {
    router.push('/services')
  }, [router])

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh]">
        <Image
          src={service.image}
          alt={service.imageAlt || service.name}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{service.name}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg mb-8 whitespace-pre-line">{service.detailedDescription}</p>
        <Button onClick={handleBackClick}>
          {language === 'it' ? 'Torna ai Servizi' : 'Back to Services'}
        </Button>
      </div>
    </div>
  )
}

export default ServicePage
