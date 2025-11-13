'use client'

import { FC, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Service {
  id: string
  name: string
  description: string
  image: string
  imageAlt: string
  detailedDescription: string
}

const servicesTranslations: Record<'it' | 'en', Service[]> = {
  it: [
    {
      id: "taglio-di-capelli",
      name: "Taglio di Capelli",
      description: "Taglio personalizzato per uomo e donna",
      image: "/taglio.jpg",
      imageAlt: "Taglio di Capelli",
      detailedDescription: "Il nostro servizio di taglio capelli offre un'esperienza personalizzata per ogni cliente...",
    },
    // ...le altre 5 voci italiane
  ],
  en: [
    {
      id: "taglio-di-capelli",
      name: "Haircut",
      description: "Personalized haircut for men and women",
      image: "/taglio.jpg",
      imageAlt: "Haircut",
      detailedDescription: "Our haircut service offers a personalized experience for every client...",
    },
    // ...le altre 5 voci inglesi con stessi id
  ],
}

const ServicePage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [service, setService] = useState<Service | null>(null)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en' | null
    if (storedLanguage) setLanguage(storedLanguage)
  }, [])

  useEffect(() => {
    const { id } = params as { id: string }
    const data = servicesTranslations[language]
    const found = data.find(s => s.id === id) || null
    setService(found)
  }, [params, language])

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">{service.name}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg mb-8 whitespace-pre-line">{service.detailedDescription}</p>
        <Button onClick={() => router.back()}>
          {language === 'it' ? 'Torna ai Servizi' : 'Back to Services'}
        </Button>
      </div>
    </div>
  )
}

export default ServicePage
