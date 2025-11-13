'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Language = 'it' | 'en'

export default function ProductsPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('it')

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored) {
      setLanguage(stored)
    }
  }, [])

  const translations = {
    it: {
      title: 'I Nostri Prodotti',
      products: [
        {
          id: 'shampoo-riflessante-henne',
          name: 'Shampoo Riflessante con Henné',
          description: 'Mantiene i riflessi naturali dei capelli trattati con henné.',
          image: '/sh-hennè.webp',
          imageAlt: 'Shampoo Riflessante con Henné',
        },
        {
          id: 'maschera-riflessante-henne',
          name: 'Maschera Riflessante con Henné',
          description: 'Nutre e ravviva il colore naturalmente.',
          image: '/mask-hennè.webp',
          imageAlt: 'Maschera Riflessante con Henné',
        },
        {
          id: 'Shampoo-Purificante-seboregolatore',
          name: 'Shampoo Purificante-Seboregolatore',
          description: 'Azione riequilibrante per cute grassa o sensibile.',
          image: '/sh-hennè.webp',
          imageAlt: 'Shampoo Purificante',
        },
        {
          id: 'Bagnoschiuma-Purificante',
          name: 'Bagnoschiuma Purificante',
          description: 'Sensazione di freschezza e pulizia profonda.',
          image: '/sh-hennè.webp',
          imageAlt: 'Bagnoschiuma',
        },
        {
          id: 'Olio-lenitivo-olivo-e-girasole',
          name: 'Olio Lenitivo Olivo & Girasole',
          description: 'Idratazione intensa e naturale.',
          image: '/sh-hennè.webp',
          imageAlt: 'Olio Lenitivo',
        },
      ],
    },
    en: {
      title: 'Our Products',
      products: [
        {
          id: 'reflective-henna-shampoo',
          name: 'Reflective Shampoo with Henna',
          description: 'Enhances and maintains henna-treated hair tones.',
          image: '/sh-hennè.webp',
          imageAlt: 'Reflective Shampoo',
        },
        {
          id: 'reflective-henna-mask',
          name: 'Reflective Mask with Henna',
          description: 'Deeply nourishes and enhances reflections.',
          image: '/mask-hennè.webp',
          imageAlt: 'Reflective Mask',
        },
        {
          id: 'hair-oil',
          name: 'Purifying Shampoo',
          description: 'Sebum-balancing formula for a clean scalp.',
          image: '/sh-hennè.webp',
          imageAlt: 'Purifying Shampoo',
        },
        {
          id: 'hydrating-bodywash',
          name: 'Purifying Bodywash',
          description: 'Deep cleansing and fresh sensation.',
          image: '/sh-hennè.webp',
          imageAlt: 'Bodywash',
        },
        {
          id: 'soothing-oil',
          name: 'Soothing Oil - Olive & Sunflower',
          description: 'Moisturizing and softening treatment.',
          image: '/sh-hennè.webp',
          imageAlt: 'Soothing Oil',
        },
      ],
    },
  }

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`)
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          {translations[language].title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations[language].products.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-contain rounded-t-lg p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  {product.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

