import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contatti | Scaramuzzo Hair Natural Beauty",
  description:
    "Contattaci per informazioni su servizi, prodotti, appuntamenti e collaborazioni professionali.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
