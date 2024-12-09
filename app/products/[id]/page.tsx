'use client'

import { FC, useEffect, useState, useCallback } from 'react'
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

interface Translations {
  [key: string]: {
    products: Product[]
  }
}

const ProductPage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [product, setProduct] = useState<Product | null>(null)

  const translations: Translations = {
    it: {
      products: [
        {
          id: "shampoo-riflessante-henne",
          name: "Shampoo Riflessante con estratto di hennè",
          description: "Formula riflessante per mantenere i toni spettacolari dell'hennè.",
          image: "/sh-hennè.webp",
          detailedDescription: "Lo Shampoo Riflessante con estratto di hennè è stato appositamente formulato per mantenere e intensificare i riflessi dei capelli trattati con hennè. La sua formula delicata, arricchita con estratti naturali, non solo pulisce delicatamente i capelli ma aiuta anche a preservare la brillantezza e l'intensità del colore. Ideale per l'uso frequente, questo shampoo nutre e protegge i capelli, lasciandoli morbidi, luminosi e con riflessi vivaci.",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera riflessante con estratto di hennè",
          description: "Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità.",
          image: "/mask-hennè.webp",
          detailedDescription: "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso.",
        },
        // Aggiungi altri prodotti qui...
      ],
    },
    en: {
      products: [
        {
          id: "reflective-henna-shampoo",
          name: "Reflective Shampoo with henna extract",
          description: "Reflective formula to maintain spectacular henna tones.",
          image: "/sh-hennè.webp",
          detailedDescription: "The Reflective Shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair. Its gentle formula, enriched with natural extracts, not only gently cleanses the hair but also helps preserve the brilliance and intensity of the color. Ideal for frequent use, this shampoo nourishes and protects hair, leaving it soft, luminous, and with vibrant reflections.",
        },
        {
          id: "reflective-henna-mask",
          name: "Reflective mask with henna extract",
          description: "A unique product formulated with pure henna extract, rich in sugars that restructure the hair fiber giving new vitality.",
          image: "/mask-hennè.webp",
          detailedDescription: "The Reflective mask with henna extract is an intensive treatment that combines the nourishing and restructuring properties of henna with a formula rich in active ingredients. Pure henna extract, rich in natural sugars, penetrates deep into the hair fiber, repairing and strengthening it from within. This treatment not only keeps reflections vibrant but also improves hair structure, leaving it stronger, more elastic, and luminous.",
        },
        // Aggiungi altri prodotti qui...
      ],
    },
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en'
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    if (params.id) {
      const currentProduct = translations[language].products.find(p => p.id === params.id)
      if (currentProduct) {
        setProduct(currentProduct)
      } else {
        // Se non trovato nella lingua corrente, prova a trovare il prodotto corrispondente nell'altra lingua
        const otherLanguage = language === 'it' ? 'en' : 'it'
        const matchingProduct = translations[otherLanguage].products.find(p => p.id === params.id)
        if (matchingProduct) {
          const correspondingProduct = translations[language].products.find(p => 
            (language === 'it' && p.id === 'shampoo-riflessante-henne' && matchingProduct.id === 'reflective-henna-shampoo') ||
            (language === 'it' && p.id === 'maschera-riflessante-henne' && matchingProduct.id === 'reflective-henna-mask') ||
            (language === 'en' && p.id === 'reflective-henna-shampoo' && matchingProduct.id === 'shampoo-riflessante-henne') ||
            (language === 'en' && p.id === 'reflective-henna-mask' && matchingProduct.id === 'maschera-riflessante-henne')
          )
          if (correspondingProduct) {
            setProduct(correspondingProduct)
          }
        }
      }
    }
  }, [params.id, language])

  const handleBackClick = useCallback(() => {
    router.push('/')  // adesso torni alla home
    localStorage.setItem('navigateTo', 'products')
  }, [router])
  

  useEffect(() => {
    const navigateTo = localStorage.getItem('navigateTo')
    if (navigateTo === 'products') {
      const timer = setTimeout(() => {
        const buttons = document.querySelectorAll('button');
        const productsButton = Array.from(buttons).find(button => 
          button.textContent === 'Prodotti' || button.textContent === 'Products'
        ) as HTMLButtonElement | undefined;
        
        if (productsButton) {
          productsButton.click();
        }
        localStorage.removeItem('navigateTo')
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [])

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
          layout="fill"
          objectFit="contain"
          className="p-8"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-4xl font-bold text-white text-center px-4">{product.name}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg mb-8">{product.detailedDescription}</p>
        <Button onClick={handleBackClick}>
          {language === 'it' ? 'Torna ai Prodotti' : 'Back to Products'}
        </Button>
      </div>
    </div>
  )
}

export default ProductPage