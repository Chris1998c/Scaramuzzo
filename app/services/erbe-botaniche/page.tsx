import type { Metadata } from "next";
import BotanicalDetailClient from "./BotanicalDetailClient";

export const metadata: Metadata = {
  title: "Colorazione con Erbe Botaniche | Scaramuzzo",
  description:
    "Scopri le miscele botaniche professionali Scaramuzzo per riflessi naturali, profondi e luminosi.",
};

export default function BotanicalPage() {
  return <BotanicalDetailClient />;
}
