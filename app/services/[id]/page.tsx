import type { Metadata } from "next"
import ServicePageClient from "../ServicePageClient"
import { serviceTranslations } from "../data"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const service =
    serviceTranslations.it.services.find(s => s.id === id || s.alias === id) ||
    serviceTranslations.en.services.find(s => s.id === id || s.alias === id)
  return {
    title: service ? `${service.name} | Scaramuzzo` : 'Servizio | Scaramuzzo',
    description: service ? service.description : 'Dettagli del servizio',
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ServicePageClient id={id} />
}
