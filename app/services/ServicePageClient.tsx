'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Service, serviceTranslations } from './data'

interface Props {
  id: string
}

const ServicePageClient: FC<Props> = ({ id }) => {
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [service, setService] = useState<Service | null>(null)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en'
    if (storedLanguage) setLanguage(storedLanguage)
  }, [])

  useEffect(() => {
    let currentService = serviceTranslations[language].services.find(s => s.id === id)
    if (!currentService) {
      const otherLanguage = language === 'it' ? 'en' : 'it'
      const serviceInOtherLang = serviceTranslations[otherLanguage].services.find(s => s.id === id)
      if (serviceInOtherLang) {
        currentService = serviceTranslations[language].services.find(s => s.alias === serviceInOtherLang.id)
      }
    }
    setService(currentService || null)
  }, [id, language])

  const handleBackClick = useCallback(() => {
    router.push('/')
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

export default ServicePageClient
