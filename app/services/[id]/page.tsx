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

const ServicePage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [service, setService] = useState<Service | null>(null)
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false)

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
          detailedDescription: "Il nostro servizio di taglio capelli offre un'esperienza personalizzata per ogni cliente. I nostri stilisti esperti lavorano con voi per creare un look che si adatti perfettamente al vostro stile di vita e alla forma del vostro viso.",
        },
        {
          id: "colorazione-con-erbe-botaniche",
          alias: "botanical-hair-coloring",
          name: "Colorazione con erbe botaniche",
          description: "Tinte naturali e tecniche innovative",
          image: "/ERBE.jpg",
          imageAlt: "Colorazione con erbe botaniche",
          detailedDescription: "La nostra colorazione con erbe botaniche è un trattamento delicato e naturale per i vostri capelli. Utilizziamo solo ingredienti di origine vegetale per ottenere colori vibranti e duraturi, proteggendo al contempo la salute dei vostri capelli.",
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
- Cheratina Vegetale: Ripristina forza, elasticità e lucentezza naturale.
- Trattamenti Cute con Erbe: Soluzioni naturali per migliorare la salute del cuoio capelluto.
- Peeling: Detersione profonda per un cuoio capelluto rigenerato.
- Rigenerante: Rivitalizza i capelli fragili e danneggiati.
- Post Colore: Mantieni la brillantezza e la durata del colore.
- Trattamento di Rigenerazione: Rigenera i capelli in profondità per un aspetto sano e forte.`,
        },
        {
          id: "acconciature",
          alias: "hairstyling",
          name: "Acconciature",
          description: "Styling per ogni occasione",
          image: "/erbe.jpg",
          imageAlt: "Acconciature",
          detailedDescription: "Che si tratti di un'occasione speciale o di un look quotidiano, i nostri stilisti creano acconciature uniche e personalizzate. Dalle pettinature eleganti per matrimoni alle acconciature casual per tutti i giorni, vi faremo sentire al meglio.",
        },
        {
          id: "sanlai",
          alias: "sanlai",
          name: "Sanlai",
          description: "Schiariture",
          image: "/sanlai.webp",
          imageAlt: "Schiariture Sanlai",
          detailedDescription: "La tecnica Sanlai è il nostro metodo innovativo per schiarire i capelli in modo naturale e delicato. Questa tecnica permette di ottenere riflessi luminosi e naturali, rispettando la struttura del capello e mantenendolo sano e forte.",
        },
        {
          id: "massaggio-del-cuoio-capelluto",
          alias: "scalp-massage",
          name: "Massaggio del Cuoio Capelluto",
          description: "Rilassante massaggio per la salute dei capelli",
          image: "/Massaggio.webp",
          imageAlt: "Massaggio del Cuoio Capelluto",
          detailedDescription: "Il nostro massaggio del cuoio capelluto non è solo rilassante, ma anche benefico per la salute dei vostri capelli. Stimola la circolazione, promuove la crescita dei capelli e aiuta a ridurre lo stress, lasciandovi completamente rinnovati.",
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
          detailedDescription: "Our haircut service offers a personalized experience for each client. Our expert stylists work with you to create a look that perfectly suits your lifestyle and face shape.",
        },
        {
          id: "botanical-hair-coloring",
          alias: "colorazione-con-erbe-botaniche",
          name: "Botanical Hair Coloring",
          description: "Natural dyes and innovative techniques",
          image: "/erbe.jpg",
          imageAlt: "Botanical Hair Coloring",
          detailedDescription: "Our botanical hair coloring is a gentle and natural treatment for your hair. We use only plant-based ingredients to achieve vibrant and long-lasting colors while protecting the health of your hair.",
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
- Plant-Based Keratin: Restores strength, elasticity, and natural shine.
- Herbal Scalp Treatments: Natural solutions to improve scalp health.
- Peeling: Deep cleansing for a rejuvenated scalp.
- Revitalizing: Revitalizes fragile and damaged hair.
- Post Color: Maintains color brilliance and longevity.
- Deep Regeneration Treatment: Deeply regenerates hair for a healthy and strong look.`,
        },
        {
          id: "hairstyling",
          alias: "acconciature",
          name: "Hairstyling",
          description: "Styling for every occasion",
          image: "/erbe.jpg",
          imageAlt: "Hairstyling",
          detailedDescription: "Whether it's for a special occasion or an everyday look, our stylists create unique and personalized hairstyles. From elegant wedding updos to casual everyday styles, we'll make you look and feel your best.",
        },
        {
          id: "sanlai",
          alias: "sanlai",
          name: "Sanlai",
          description: "Hair lightening",
          image: "/sanlai.webp",
          imageAlt: "Sanlai Hair Lightening",
          detailedDescription: "The Sanlai technique is our innovative method for lightening hair naturally and gently. This technique allows for bright and natural-looking highlights while respecting the hair structure and keeping it healthy and strong.",
        },
        {
          id: "scalp-massage",
          alias: "massaggio-del-cuoio-capelluto",
          name: "Scalp Massage",
          description: "Relaxing massage for hair health",
          image: "/erbe.jpg",
          imageAlt: "Scalp Massage",
          detailedDescription: "Our scalp massage is not only relaxing but also beneficial for your hair health. It stimulates circulation, promotes hair growth, and helps reduce stress, leaving you feeling completely renewed.",
        },
      ],
    },
  }

  useEffect(() => {
    const handleLanguageChange = () => {
      const storedLanguage = localStorage.getItem('language') as 'it' | 'en'
      if (storedLanguage && storedLanguage !== language) {
        setLanguage(storedLanguage)
      }
    }

    window.addEventListener('storage', handleLanguageChange)

    // Initial language check
    handleLanguageChange()

    return () => {
      window.removeEventListener('storage', handleLanguageChange)
    }
  }, [language])

  useEffect(() => {
    if (params.id) {
      let currentService = translations[language].services.find(s => s.id === params.id);
      
      if (!currentService) {
        // Se non troviamo il servizio, cerchiamo usando l'alias
        const otherLanguage = language === 'it' ? 'en' : 'it';
        const serviceInOtherLanguage = translations[otherLanguage].services.find(s => s.id === params.id);
        if (serviceInOtherLanguage) {
          currentService = translations[language].services.find(s => s.alias === serviceInOtherLanguage.id);
        }
      }

      setService(currentService || null);
    }
  }, [params.id, language,translations])

  const handleBackClick = useCallback(() => {
    router.push('/')
    localStorage.setItem('navigateTo', 'services')
    setShouldNavigateBack(true)
  }, [router])

  useEffect(() => {
    if (shouldNavigateBack) {
      const timer = setTimeout(() => {
        const buttons = document.querySelectorAll('button');
        const servicesButton = Array.from(buttons).find(button => 
          button.textContent === 'Servizi' || button.textContent === 'Services'
        ) as HTMLButtonElement | undefined;
        
        if (servicesButton) {
          servicesButton.click();
        }
        setShouldNavigateBack(false)
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldNavigateBack]);

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
        {/* Aggiunta della classe whitespace-pre-line per rispettare i ritorni a capo */}
        <p className="text-lg mb-8 whitespace-pre-line">{service.detailedDescription}</p>
        <Button onClick={handleBackClick}>
          {language === 'it' ? 'Torna ai Servizi' : 'Back to Services'}
        </Button>
      </div>
    </div>
  )
}

export default ServicePage
