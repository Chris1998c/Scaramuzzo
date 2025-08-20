import type { Metadata } from "next"
import BotanicalDetailClient from "./BotanicalDetailClient"

export const metadata: Metadata = {
  title: "Colorazione con Erbe Botaniche | Scaramuzzo",
  description: "Scopri le nostre miscele botaniche per colori vibranti e naturali.",
}

export default function Page() {
  return <BotanicalDetailClient />
}
