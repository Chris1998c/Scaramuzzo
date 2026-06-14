import type { Metadata } from "next";
import ErbeClient from "./ErbeClient";

const ogImage = "https://www.scaramuzzo.green/ERBE.webp";

export const metadata: Metadata = {
  title: "Prodotti Personalizzati Capelli | Routine su Misura Scaramuzzo",
  description:
    "Configura la tua routine capelli con diagnosi online: prodotti personalizzati, erbe botaniche e consulenza professionale. Valutazione su misura se la routine pronta non è adatta.",

  keywords: [
    "prodotti personalizzati capelli",
    "routine capelli su misura",
    "diagnosi capelli online",
    "consulenza capelli",
    "erbe botaniche capelli",
    "Metodo Scaramuzzo",
  ],

  alternates: {
    canonical: "https://www.scaramuzzo.green/erbe",
  },

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/erbe",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Prodotti Personalizzati Capelli | Routine su Misura Scaramuzzo",
    description:
      "Diagnosi capelli online e prodotti personalizzati: routine professionale su misura con consulenza Scaramuzzo.",
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
    title: "Prodotti Personalizzati Capelli | Scaramuzzo",
    description:
      "Diagnosi capelli online, prodotti personalizzati e consulenza professionale con il Metodo Scaramuzzo.",
    images: [ogImage],
  },
};

export default function ErbePage() {
  return <ErbeClient />;
}
