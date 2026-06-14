import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.webp";

export const metadata: Metadata = {
  title: "Contatti & Consulenza Capelli | Scaramuzzo Hair Natural Beauty",
  description:
    "Contattaci per consulenza capelli, appuntamenti e informazioni. Saloni Scaramuzzo a Roma, Cosenza, Corigliano-Rossano e Castrovillari: colorazione botanica e henné professionale.",

  keywords: [
    "consulenza capelli",
    "contatti salone parrucchiere",
    "Scaramuzzo Roma",
    "Scaramuzzo Calabria",
    "appuntamento parrucchiere",
  ],

  alternates: {
    canonical: "https://www.scaramuzzo.green/contact",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/contact",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Contatti & Consulenza Capelli | Scaramuzzo Hair Natural Beauty",
    description:
      "Richiedi consulenza capelli o informazioni sui saloni Scaramuzzo: Roma, Cosenza, Corigliano-Rossano e Castrovillari.",
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
    title: "Contatti & Consulenza Capelli | Scaramuzzo",
    description:
      "Consulenza capelli e informazioni sui saloni Scaramuzzo in Roma e Calabria.",
    images: [ogImage],
  },
};

export default function Page() {
  return <ContactClient />;
}
