// app/services/page.tsx
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Servizi Professionali | Scaramuzzo Hair Natural Beauty",
  description:
    "Taglio, trattamenti, acconciature, schiariture Sanlai e colorazioni naturali con erbe botaniche. Scopri tutti i servizi Scaramuzzo.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/services",
  },
  openGraph: {
    title: "Servizi Professionali | Scaramuzzo Hair Natural Beauty",
    description:
      "Taglio, trattamenti, acconciature, schiariture Sanlai e colorazioni naturali con erbe botaniche.",
    images: [
      {
        url: "/TaglioNew.jpg",
        width: 1200,
        height: 800,
      },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
