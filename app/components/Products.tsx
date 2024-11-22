import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface ProductsProps {
  language: 'it' | 'en'
}

const Products: FC<ProductsProps> = ({ language }) => {
  const translations = {
    it: {
      title: "I Nostri Prodotti",
      products: [
        { name: "Shampoo Nutriente", description: "Shampoo arricchito con oli naturali", image: "/placeholder.svg?height=200&width=300" },
        { name: "Balsamo Riparatore", description: "Balsamo per capelli danneggiati", image: "/placeholder.svg?height=200&width=300" },
        { name: "Olio per Capelli", description: "Olio leggero per capelli lucenti", image: "/placeholder.svg?height=200&width=300" },
        { name: "Maschera Idratante", description: "Maschera intensiva per capelli secchi", image: "/placeholder.svg?height=200&width=300" },
        { name: "Spray Volumizzante", description: "Spray per dare volume ai capelli fini", image: "/placeholder.svg?height=200&width=300" },
        { name: "Crema Styling", description: "Crema modellante per acconciature", image: "/placeholder.svg?height=200&width=300" },
        { name: "Siero Anticrespo", description: "Siero per controllare il crespo", image: "/placeholder.svg?height=200&width=300" },
        { name: "Tinta Naturale", description: "Colorazione a base di erbe", image: "/placeholder.svg?height=200&width=300" },
        { name: "Lozione Anticaduta", description: "Trattamento per prevenire la caduta dei capelli", image: "/placeholder.svg?height=200&width=300" },
        { name: "Scrub per Cuoio Capelluto", description: "Esfoliante per un cuoio capelluto sano", image: "/placeholder.svg?height=200&width=300" },
      ],
    },
    en: {
      title: "Our Products",
      products: [
        { name: "Nourishing Shampoo", description: "Shampoo enriched with natural oils", image: "/placeholder.svg?height=200&width=300" },
        { name: "Repairing Conditioner", description: "Conditioner for damaged hair", image: "/placeholder.svg?height=200&width=300" },
        { name: "Hair Oil", description: "Lightweight oil for shiny hair", image: "/placeholder.svg?height=200&width=300" },
        { name: "Hydrating Mask", description: "Intensive mask for dry hair", image: "/placeholder.svg?height=200&width=300" },
        { name: "Volumizing Spray", description: "Spray to add volume to fine hair", image: "/placeholder.svg?height=200&width=300" },
        { name: "Styling Cream", description: "Molding cream for hairstyles", image: "/placeholder.svg?height=200&width=300" },
        { name: "Anti-Frizz Serum", description: "Serum to control frizz", image: "/placeholder.svg?height=200&width=300" },
        { name: "Natural Hair Dye", description: "Herbal-based hair coloring", image: "/placeholder.svg?height=200&width=300" },
        { name: "Anti-Hair Loss Lotion", description: "Treatment to prevent hair loss", image: "/placeholder.svg?height=200&width=300" },
        { name: "Scalp Scrub", description: "Exfoliant for a healthy scalp", image: "/placeholder.svg?height=200&width=300" },
      ],
    },
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{translations[language].title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {translations[language].products.map((product, index) => (
            <Card key={index}>
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products