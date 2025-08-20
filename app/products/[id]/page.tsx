"use client"

import { FC, useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { productsTranslations, Product } from "@/lib/translations"

const ProductPage: FC = () => {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  const [product, setProduct] = useState<Product | null>(null)
  const translations = productsTranslations

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en'
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    if (params.id) {
      let currentProduct = translations[language].products.find(p => p.id === params.id)

      if (!currentProduct) {
        const otherLanguage = language === 'it' ? 'en' : 'it'
        const productInOtherLanguage = translations[otherLanguage].products.find(p => p.id === params.id)
        if (productInOtherLanguage) {
          currentProduct = translations[language].products.find(p => p.alias === productInOtherLanguage.id)
        }
      }

      setProduct(currentProduct || null)
    }
  }, [params.id, language, translations])

  const handleBackClick = useCallback(() => {
    router.push('/')
    localStorage.setItem('navigateTo', 'products')
  }, [router])

  useEffect(() => {
    const navigateTo = localStorage.getItem('navigateTo')
    if (navigateTo === 'products') {
      const timer = setTimeout(() => {
        const buttons = document.querySelectorAll('button')
        const productsButton = Array.from(buttons).find(button =>
          button.textContent === 'Prodotti' || button.textContent === 'Products'
        ) as HTMLButtonElement | undefined

        if (productsButton) {
          productsButton.click()
        }
        localStorage.removeItem('navigateTo')
      }, 100)

      return () => clearTimeout(timer)
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
