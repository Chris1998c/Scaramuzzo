import type { Metadata } from "next";
import AnticadutaQuizClient from "./AnticadutaQuizClient";

export const metadata: Metadata = {
  title: "Test Anticaduta | Routine Scaramuzzo",
  description:
    "Tre domande per scoprire una routine cosmetica personalizzata e ricevere un trattamento Scaramuzzo gratuito in salone.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/test-anticaduta",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green/test-anticaduta",
    locale: "it_IT",
    siteName: "Scaramuzzo Hair Natural Beauty",
    title: "Scopri la routine più adatta ai tuoi capelli",
    description:
      "Completa il mini test Scaramuzzo e scopri la tua routine cosmetica.",
    images: [
      {
        url: "/lozione-nuovo.webp",
        alt: "Lozione Anticaduta Scaramuzzo",
      },
    ],
  },
};

export default function TestAnticadutaPage() {
  return <AnticadutaQuizClient />;
}
