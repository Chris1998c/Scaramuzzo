import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Chi Siamo | Scaramuzzo Hair Natural Beauty",
  description:
    "Scaramuzzo Hair Natural Beauty: tradizione, erbe botaniche, ricerca e innovazione tra Calabria e Roma.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
