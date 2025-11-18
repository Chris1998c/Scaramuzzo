import type { Metadata } from "next";
import BotanicalDetailClient from "./BotanicalDetailClient";

const ogImage = "https://www.scaramuzzo.green/ERBE.jpg";

export const metadata: Metadata = {
  title: "Colorazione con Erbe Botaniche | Scaramuzzo",
  description:
    "Scopri le miscele botaniche professionali Scaramuzzo per riflessi naturali, profondi e luminosi.",

  alternates: {
    canonical: "https://www.scaramuzzo.green/services/erbe-botaniche",
  },

  openGraph: {
    type: "article",
    url: "https://www.scaramuzzo.green/services/erbe-botaniche",
    title: "Colorazione con Erbe Botaniche | Scaramuzzo",
    description:
      "Erbe botaniche professionali per riflessi naturali, castani, rossi e tonalizzazioni fredde Ice.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Erbe Botaniche Scaramuzzo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Erbe Botaniche | Scaramuzzo",
    description: "Scopri le miscele di erbe botaniche per colorazioni naturali.",
    images: [ogImage],
  },
};

export default function BotanicalPage() {
  return <BotanicalDetailClient />;
}
