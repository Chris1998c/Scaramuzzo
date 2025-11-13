import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Chi Siamo | Scaramuzzo Hair Natural Beauty",
  description:
    "La storia del brand Scaramuzzo Hair Natural Beauty: tradizione, natura, innovazione e un team di professionisti tra Calabria e Roma.",
};

export default function AboutPage() {
  return <AboutClient />;
}
