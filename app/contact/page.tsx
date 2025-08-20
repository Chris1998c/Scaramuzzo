import type { Metadata } from "next"
import Contact from "../components/Contact"

export const metadata: Metadata = {
  title: "Contatti | Scaramuzzo Hair Natural Beauty",
  description: "Contattaci per informazioni su servizi, prodotti e appuntamenti.",
}

export default function ContactPage() {
  return <Contact language="it" />
}
