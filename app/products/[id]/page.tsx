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
