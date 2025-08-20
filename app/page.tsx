import type { Metadata } from "next"
import MainPage from "./components/MainPage"

export const metadata: Metadata = {
  title: "Scaramuzzo Hair Natural Beauty | Home",
  description: "Benvenuto nel nostro salone: servizi naturali, prodotti e contatti.",
}

export default function Page() {
  return <MainPage />
}
