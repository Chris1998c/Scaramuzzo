'use client'

import { FC, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  image: string
  detailedDescription: string
}

const productsTranslations: Record<'it' | 'en', Product[]> = {
  it: [
    {
      id: "shampoo-riflessante-henne",
      name: "Shampoo Riflessante con estratto di hennè",
      description: "Formula riflessante per mantenere i toni spettacolari dell'hennè.",
      image: "/sh-hennè.webp",
      detailedDescription:
        "Formula riflessante per mantenere i toni spettacolari dell'hennè. Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare...",
    },
    // ...gli altri prodotti IT con stessi id
  ],
  en: [
    {
      id: "shampoo-riflessante-henne",
      name: "Reflective shampoo with henna extract",
      description: "Reflective formula to maintain spectacular henna tones.",
      image: "/sh-hennè.webp",
      detailedDescription:
        "The reflective shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair...",
    },
    // ...gli altri prodotti EN con stessi id
  ],
}

const ProductPage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en' | null
    if (storedLanguage) setLanguage(storedLanguage)
  }, [])

  useEffect(() => {
    const { id } = params as { id: string }
    const data = productsTranslations[language]
    const found = data.find(p => p.id === id) || null
    setProduct(found)
  }, [params, language])

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-4xl font-bold text-white text-center px-4">{product.name}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg mb-8 whitespace-pre-line">{product.detailedDescription}</p>
        <Button onClick={() => router.back()}>
          {language === 'it' ? 'Torna ai Prodotti' : 'Back to Products'}
        </Button>
      </div>
    </div>
  )
}

export default ProductPage
