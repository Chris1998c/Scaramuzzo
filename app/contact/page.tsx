import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.jpg";

export const metadata: Metadata = {
  title: "Contatti | Scaramuzzo Hair Natural Beauty",
  description:
    "Contattaci per informazioni su servizi, prodotti, appuntamenti e collaborazioni professionali.",

  alternates: {
    canonical: "https://www.scaramuzzo.green/contact",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/contact",
    title: "Contatti | Scaramuzzo Hair Natural Beauty",
    description:
      "Richiedi informazioni su servizi, prodotti, trattamenti o collaborazioni.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Scaramuzzo Contact",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contatti | Scaramuzzo",
    description: "Scrivici per informazioni su servizi e prodotti.",
    images: [ogImage],
  },
};

export default function Page() {
  return <ContactClient />;
}
