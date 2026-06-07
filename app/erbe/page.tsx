import type { Metadata } from "next";
import ErbeClient from "./ErbeClient";

const ogImage = "https://www.scaramuzzo.green/ERBE.webp";

export const metadata: Metadata = {
  title: "Prodotti Personalizzati | Scaramuzzo Hair Natural Beauty",
  description:
    "Scopri la routine capelli su misura del Metodo Scaramuzzo: diagnosi, erbe botaniche e prodotti professionali scelti per il tuo capello.",

  alternates: {
    canonical: "https://www.scaramuzzo.green/erbe",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/erbe",
    title: "Prodotti Personalizzati | Scaramuzzo Hair Natural Beauty",
    description:
      "Diagnosi capelli e routine personalizzata: erbe botaniche e prodotti professionali scelti per te.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Prodotti Personalizzati Scaramuzzo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Prodotti Personalizzati | Scaramuzzo",
    description:
      "Diagnosi capelli e routine personalizzata con il Metodo Scaramuzzo.",
    images: [ogImage],
  },
};

export default function ErbePage() {
  return <ErbeClient />;
}
