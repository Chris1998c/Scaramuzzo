import type { Metadata } from "next";
import PageClient from "./PageClient";

// 🌟 URL ASSOLUTA DELL’IMMAGINE OG CHE COMPARE SU WHATSAPP / INSTAGRAM
const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scaramuzzo.green"),
  title: "Scaramuzzo Hair Natural Beauty | Saloni & Prodotti Professionali",
  description:
    "Scopri i saloni Scaramuzzo Hair Natural Beauty e la nostra linea professionale di shampoo, maschere, trattamenti e styling naturali.",

  alternates: {
    canonical: "https://www.scaramuzzo.green",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green",
    title: "Scaramuzzo Hair Natural Beauty | Saloni & Prodotti Professionali",
    description:
      "Tecnica, natura, erbe botaniche e ricerca uniti in un percorso personale di bellezza. Scopri i nostri saloni e i prodotti professionali Scaramuzzo.",
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
    title: "Scaramuzzo Hair Natural Beauty",
    description:
      "Scopri i saloni Scaramuzzo e i nostri prodotti professionali naturali.",
    images: [ogImage],
  },
};

export default function Page() {
  return <PageClient />;
}
