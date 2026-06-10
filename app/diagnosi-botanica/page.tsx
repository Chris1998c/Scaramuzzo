import type { Metadata } from "next";
import DiagnosiClient from "./DiagnosiClient";

const ogImage = "https://www.scaramuzzo.green/ERBE.webp";

export const metadata: Metadata = {
  title: { absolute: "Scaramuzzo Botanical Color Experience" },
  description:
    "Esperienza professionale di valutazione botanica personalizzata per capelli, colore, porosità e capelli bianchi.",

  alternates: {
    canonical: "https://www.scaramuzzo.green/diagnosi-botanica",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/diagnosi-botanica",
    title: "Scaramuzzo Botanical Color Experience",
    description:
      "Esperienza professionale di valutazione botanica personalizzata per capelli, colore, porosità e capelli bianchi.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Scaramuzzo Botanical Color Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Scaramuzzo Botanical Color Experience",
    description:
      "Esperienza professionale di valutazione botanica personalizzata per capelli, colore, porosità e capelli bianchi.",
    images: [ogImage],
  },
};

export default function DiagnosiBotanicaPage() {
  return <DiagnosiClient />;
}
