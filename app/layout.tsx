import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* ✅ Importazione font migliorata */
const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
});
const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

/* ✅ Meta tag migliorati */
export const metadata: Metadata = {
  title: "Scaramuzzo | Hair Natural Beauty",
  description: "Scopri i migliori servizi e prodotti per la cura dei capelli.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${mono.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
