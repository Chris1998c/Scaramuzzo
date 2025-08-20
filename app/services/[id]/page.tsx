"use client"

import { FC, useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { servicesTranslations, Service } from "@/lib/translations"

const ServicePage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [service, setService] = useState<Service | null>(null)
  const translations = servicesTranslations

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
  }, [params.id, language, translations])

  const handleBackClick = useCallback(() => {
    // Torna alla home
    router.push('/')
    // Imposta navigateTo = 'services' così la home selezionerà la scheda Servizi
    localStorage.setItem('navigateTo', 'services')
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
