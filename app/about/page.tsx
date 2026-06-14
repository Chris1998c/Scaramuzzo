import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.webp";

export const metadata: Metadata = {
  title: "Chi Siamo | Metodo Scaramuzzo, Henné e Colorazione Botanica",
  description:
    "Storia di Giuseppe Scaramuzzo dal 1993: henné professionale, colorazione botanica, ricerca botanica e consulenza capelli nei saloni di Roma, Cosenza, Corigliano-Rossano e Castrovillari.",

  keywords: [
    "Giuseppe Scaramuzzo",
    "Metodo Scaramuzzo",
    "henné professionale",
    "colorazione botanica",
    "consulenza capelli",
    "saloni parrucchiere Calabria Roma",
  ],

  alternates: {
    canonical: "https://www.scaramuzzo.green/about",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/about",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Chi Siamo | Metodo Scaramuzzo, Henné e Colorazione Botanica",
    description:
      "Oltre 30 anni di esperienza in henné professionale, colorazione botanica e consulenza capelli: la storia e il metodo Scaramuzzo.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Scaramuzzo Hair Natural Beauty",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | Metodo Scaramuzzo",
    description:
      "Henné professionale, colorazione botanica e consulenza capelli: la storia Scaramuzzo dal 1993.",
    images: [ogImage],
  },
};

export default function Page() {
  return <AboutClient />;
}
