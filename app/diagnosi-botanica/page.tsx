import type { Metadata } from "next";
import DiagnosiClient from "./DiagnosiClient";

const ogImage = "https://www.scaramuzzo.green/ERBE.webp";

export const metadata: Metadata = {
  title: {
    absolute:
      "Diagnosi Capelli Online | Botanical Color Experience Scaramuzzo",
  },
  description:
    "Diagnosi capelli online e valutazione professionale del profilo colore: porosità, bianchi, storico tecnico e consulenza per colorazione botanica e henné professionale.",

  keywords: [
    "diagnosi capelli online",
    "colorazione botanica",
    "henné professionale",
    "consulenza capelli",
    "Botanical Color Experience",
    "valutazione colore capelli",
  ],

  alternates: {
    canonical: "https://www.scaramuzzo.green/diagnosi-botanica",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/diagnosi-botanica",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Diagnosi Capelli Online | Botanical Color Experience Scaramuzzo",
    description:
      "Valutazione professionale del profilo colore, capelli bianchi e storico tecnico. Consulenza per colorazione botanica personalizzata.",
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
    title: "Diagnosi Capelli Online | Scaramuzzo",
    description:
      "Colorazione botanica e consulenza professionale: valutazione profilo colore, bianchi e porosità.",
    images: [ogImage],
  },
};

export default function DiagnosiBotanicaPage() {
  return <DiagnosiClient />;
}
