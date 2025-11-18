
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prodotti professionali per capelli • Scaramuzzo Hair Natural Beauty",
  description:
    "Scopri shampoo, maschere, trattamenti e prodotti styling professionali Scaramuzzo Hair Natural Beauty. Formule avanzate, ingredienti selezionati e risultati da salone.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/products",
  },
  openGraph: {
    title: "Prodotti professionali per capelli | Scaramuzzo Hair Natural Beauty",
    description:
      "Linea completa di prodotti professionali per la cura dei capelli: shampoo, maschere, trattamenti specifici e styling Scaramuzzo.",
    url: "https://www.scaramuzzo.green/products",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
