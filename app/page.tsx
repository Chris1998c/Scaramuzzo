import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Scaramuzzo Hair Natural Beauty | Saloni & Prodotti Professionali",
  description:
    "Scopri i saloni Scaramuzzo Hair Natural Beauty e la nostra linea professionale di shampoo, maschere, trattamenti e styling naturali.",
};

export default function Page() {
  return <PageClient />; // niente props
}
