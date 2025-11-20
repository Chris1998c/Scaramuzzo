import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrello • Scaramuzzo Hair Natural Beauty",
  description:
    "Rivedi i prodotti nel tuo carrello e procedi al pagamento in sicurezza.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.scaramuzzo.green/cart",
  },
  openGraph: {
    title: "Carrello • Scaramuzzo Hair Natural Beauty",
    description:
      "Controlla gli articoli selezionati e completa il tuo ordine.",
    url: "https://www.scaramuzzo.green/cart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrello • Scaramuzzo",
    description:
      "Rivedi i prodotti e procedi al pagamento.",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
