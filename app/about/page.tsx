import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const ogImage = "https://www.scaramuzzo.green/roma-salone-hero-wide.webp";

export const metadata: Metadata = {
  title: "Chi Siamo | Scaramuzzo Hair Natural Beauty",
  description:
    "Scaramuzzo Hair Natural Beauty: tradizione, erbe botaniche, ricerca e innovazione tra Calabria e Roma.",

  alternates: {
    canonical: "https://www.scaramuzzo.green/about",
  },

  openGraph: {
    type: "article",
    url: "https://www.scaramuzzo.green/about",
    title: "Chi Siamo | Scaramuzzo Hair Natural Beauty",
    description:
      "La storia, la filosofia e il team Scaramuzzo: tradizione, naturalezza e ricerca continua.",
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
    title: "Chi Siamo | Scaramuzzo",
    description:
      "Scaramuzzo Hair Natural Beauty: tradizione, botanica e ricerca applicata alla bellezza.",
    images: [ogImage],
  },
};

export default function Page() {
  return <AboutClient />;
}
