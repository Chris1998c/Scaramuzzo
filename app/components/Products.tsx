'use client'

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsProps {
  language: "it" | "en";
}

const Products: FC<ProductsProps> = ({ language }) => {
  const router = useRouter();

  const translations = {
    it: {
      title: "I Nostri Prodotti",
      products: [
        {
          id: "shampoo-riflessante-henne",
          name: "Shampoo Riflessante con estratto di hennè",
          description: "Formula riflessante per mantenere i toni spettacolari dell'hennè.",
          image: "/sh-hennè.webp",
          imageAlt: "Shampoo Riflessante con estratto di hennè",
          detailedDescription: "Lo Shampoo Riflessante con estratto di hennè è stato appositamente formulato per mantenere e intensificare i riflessi dei capelli trattati con hennè. La sua formula delicata, arricchita con estratti naturali, non solo pulisce delicatamente i capelli ma aiuta anche a preservare la brillantezza e l'intensità del colore. Ideale per l'uso frequente, questo shampoo nutre e protegge i capelli, lasciandoli morbidi, luminosi e con riflessi vivaci.",
        },
        {
          id: "maschera-riflessante-henne",
          name: "Maschera riflessante con estratto di hennè",
          description: "Un prodotto unico formulato con puro estratto di hennè, ricco di zuccheri che ristrutturano la fibra capillare donando nuova vitalità.",
          image: "/mask-hennè.webp",
          imageAlt: "Maschera riflessante con estratto di hennè",
          detailedDescription: "La Maschera riflessante con estratto di hennè è un trattamento intensivo che combina le proprietà nutrienti e ristrutturanti dell'hennè con una formula ricca di principi attivi. Il puro estratto di hennè, ricco di zuccheri naturali, penetra in profondità nella fibra capillare, riparandola e rinforzandola dall'interno. Questo trattamento non solo mantiene vivaci i riflessi, ma migliora anche la struttura del capello, lasciandolo più forte, elastico e luminoso.",
        },
        {
          id: "Shampoo seboregolatore",
          name: "Shampoo seboregolatore",
          description: "Olio leggero per capelli lucenti",
          image: "/sh-hennè.webp",
          imageAlt: "Olio per Capelli",
          detailedDescription: "Il nostro Olio per Capelli è una formula leggera ma potente, studiata per nutrire in profondità i capelli senza appesantirli. Arricchito con oli naturali selezionati, questo prodotto aiuta a combattere il crespo, aumenta la lucentezza e protegge i capelli dai danni ambientali. Perfetto per tutti i tipi di capelli, può essere utilizzato sia come trattamento pre-shampoo che come finish per domare i capelli ribelli.",
        },
        {
          id: "maschera-idratante",
          name: "Maschera Idratante",
          description: "Maschera intensiva per capelli secchi",
          image: "/placeholder.svg",
          imageAlt: "Maschera Idratante",
          detailedDescription: "La nostra Maschera Idratante è un trattamento intensivo progettato per ripristinare l'idratazione ottimale dei capelli secchi e danneggiati. Arricchita con ingredienti naturali e vitamine essenziali, questa maschera penetra in profondità nella fibra capillare, riparando i danni e sigillando l'idratazione. Un trattamento settimanale con questa maschera trasforma i capelli secchi e spenti in capelli morbidi, elastici e luminosi.",
        },
      ],
    },
    en: {
      title: "Our Products",
      products: [
        {
          id: "reflective-henna-shampoo",
          name: "Reflective Shampoo with henna extract",
          description: "Reflective formula to maintain spectacular henna tones.",
          image: "/sh-hennè.webp",
          imageAlt: "Reflective Shampoo with henna extract",
          detailedDescription: "The Reflective Shampoo with henna extract has been specially formulated to maintain and enhance the reflections of henna-treated hair. Its gentle formula, enriched with natural extracts, not only gently cleanses the hair but also helps preserve the brilliance and intensity of the color. Ideal for frequent use, this shampoo nourishes and protects hair, leaving it soft, luminous, and with vibrant reflections.",
        },
        {
          id: "reflective-henna-mask",
          name: "Reflective mask with henna extract",
          description: "A unique product formulated with pure henna extract, rich in sugars that restructure the hair fiber giving new vitality.",
          image: "/mask-hennè.webp",
          imageAlt: "Reflective mask with henna extract",
          detailedDescription: "The Reflective mask with henna extract is an intensive treatment that combines the nourishing and restructuring properties of henna with a formula rich in active ingredients. Pure henna extract, rich in natural sugars, penetrates deep into the hair fiber, repairing and strengthening it from within. This treatment not only keeps reflections vibrant but also improves hair structure, leaving it stronger, more elastic, and luminous.",
        },
        {
          id: "hair-oil",
          name: "Hair Oil",
          description: "Lightweight oil for shiny hair",
          image: "/placeholder.svg",
          imageAlt: "Hair Oil",
          detailedDescription: "Our Hair Oil is a lightweight yet powerful formula designed to deeply nourish hair without weighing it down. Enriched with selected natural oils, this product helps fight frizz, increases shine, and protects hair from environmental damage. Perfect for all hair types, it can be used both as a pre-shampoo treatment and as a finish to tame unruly hair.",
        },
        {
          id: "hydrating-mask",
          name: "Hydrating Mask",
          description: "Intensive mask for dry hair",
          image: "/placeholder.svg",
          imageAlt: "Hydrating Mask",
          detailedDescription: "Our Hydrating Mask is an intensive treatment designed to restore optimal hydration to dry and damaged hair. Enriched with natural ingredients and essential vitamins, this mask penetrates deep into the hair fiber, repairing damage and sealing in moisture. A weekly treatment with this mask transforms dry and dull hair into soft, elastic, and luminous hair.",
        },
      ],
    },
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {translations[language].title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations[language].products.map((product, index) => (
            <Card 
              key={product.id}
              className="w-full h-full flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative w-full h-80">
                <Image
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg p-4"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;