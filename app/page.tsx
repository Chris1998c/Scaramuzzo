import type { Metadata } from "next";
import PageClient from "./PageClient";

// 🌟 URL ASSOLUTA DELL’IMMAGINE OG CHE COMPARE SU WHATSAPP / INSTAGRAM
const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.webp";

export const metadata: Metadata = {
  title: "Scaramuzzo | Colorazione Botanica, Henné Professionale & Consulenza Capelli",
  description:
    "Quattro saloni tra Roma e Calabria. Metodo Scaramuzzo: colorazione botanica, henné professionale, prodotti personalizzati capelli, diagnosi online e consulenza professionale.",

  keywords: [
    "colorazione botanica",
    "henné professionale",
    "consulenza capelli",
    "prodotti personalizzati capelli",
    "diagnosi capelli online",
    "saloni Scaramuzzo",
    "Metodo Scaramuzzo",
  ],

  alternates: {
    canonical: "https://www.scaramuzzo.green",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Scaramuzzo | Colorazione Botanica, Henné Professionale & Consulenza Capelli",
    description:
      "Colorazione botanica, henné professionale e consulenza capelli: scopri il Metodo Scaramuzzo, i saloni e i percorsi personalizzati online.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Scaramuzzo Hair Natural Beauty - Salone Roma",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Scaramuzzo | Colorazione Botanica & Consulenza Capelli",
    description:
      "Henné professionale, prodotti personalizzati e diagnosi capelli online con il Metodo Scaramuzzo.",
    images: [ogImage],
  },
};

export default function Page() {
  return <PageClient />;
}
