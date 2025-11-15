import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prodotti Professionali | Scaramuzzo Hair Natural Beauty",
  description:
    "Scopri la gamma completa di shampo, maschere, trattamenti e styling professionali Scaramuzzo Hair Natural Beauty.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
