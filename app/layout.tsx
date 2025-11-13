import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Scaramuzzo | Hair Natural Beauty",
  description: "Scopri i migliori servizi e prodotti naturali per la cura e la bellezza dei capelli.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} bg-background text-foreground antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
