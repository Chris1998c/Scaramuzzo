codex/organize-routes-and-update-navbar
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
          detailedDescription:" Formula riflessante per mantenere i toni spettacolari dell'hennè. Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità. MODO D'USO A capello bagnato applicare il prodotto, massaggiare, lasciare agire per 4 minuti e procedere al risciacquo.PRINCIPI ATTIVILawsonia inermis leaves extract, Zuccheri.AZIONI Protegge e ristruttura in profondità la fibra capillare per dare elasticità e idratazione.PUNTI DI FORZALe erbe botaniche rappresentano uno dei prodotti base della fitocosmesi, ricavato dalle foglie essiccate e polverizzate di un arbusto (Lawsonia inermis) comunemente chiamato henna. La formula miscelata con estratti di erbe botaniche, rende il prodotto ottimale nel creare riflessi particolari, migliorando la lucentezza dei colori applicati e la morbidezza del capello. Le basi detergenti, dolci e delicate, consentono di utilizzare il prodotto su qualsiasi tipo di capello senza impoverirne il manto idrolipidico.INGREDIENTILawsonia inermis leaves extract, Sodium coceth sulfate, Cocamido propyl betaine, Cetrimonium chloride, Polyquaterniurn 10, Parfurn, Phenoxy ethanol, Sodiurn chloride. PARABENS FREE - SILICONES FREE"
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera riflessante con estratto di hennè",
          description: "Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità.",
          image: "/mask-hennè.webp",
          detailedDescription: "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso.",
        },
        {
        id: "Shampoo-Purificante-seboregolatore",
        name: "Shampoo Purificante-seboregolatore",
        description: "Olio leggero per capelli lucenti",
        image: "/sh-hennè.webp",
        detailedDescription: "Il nostro Olio per Capelli è una formula leggera ma potente, studiata per nutrire in profondità i capelli senza appesantirli. Arricchito con oli naturali selezionati, questo prodotto aiuta a combattere il crespo, aumenta la lucentezza e protegge i capelli dai danni ambientali. Perfetto per tutti i tipi di capelli, può essere utilizzato sia come trattamento pre-shampoo che come finish per domare i capelli ribelli."},
        {
          id: "Bagnoschiuma-Purificante",
          name: "Bagnoschiuma-Purificante",
          description: "Bagnoschiuma-Purificante",
          image: "/sh-hennè.webp",
          detailedDescription: "Azione antibatterica grazie all'estratto di liquirizia, bergamotto, ortica, cedro che dona alla pelle un'eccezionale sensazione di pulizia e freschezza.Azione calmante e lenitiva grazie all'utilizzo dell'acqua termale",
        },
        {
          id: "Olio-lenitivo-olivo-e-girasole",
          name: "Olio lenitivo olivo e girasole",
          description: "Azione lenitiva intensa",
          image: "/sh-hennè.webp",
          detailedDescription: "Formulato con puri oli di girasole e oliva, per un'idratazione emolliente intensad",
        },
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, language])

  const handleBackClick = useCallback(() => {
    router.push('/products')
  }, [router])
  


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
import type { Metadata } from "next"
import ProductPageClient from "../ProductPageClient"
import { productTranslations } from "../data"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product =
    productTranslations.it.products.find(p => p.id === id) ||
    productTranslations.en.products.find(p => p.id === id)
  return {
    title: product ? `${product.name} | Scaramuzzo` : 'Prodotto | Scaramuzzo',
    description: product ? product.description : 'Dettagli del prodotto',
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductPageClient id={id} />
}
 master
