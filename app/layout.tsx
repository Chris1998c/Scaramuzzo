import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/site/Navbar";
import Footer from "./components/site/Footer";
import Script from "next/script";

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

// 🧠 SEO + OG + TWITTER premium
export const metadata: Metadata = {
  metadataBase: new URL("https://www.scaramuzzo.green"),

  title: {
    default: "Scaramuzzo | Hair Natural Beauty",
    template: "%s • Scaramuzzo",
  },

  description:
    "Scaramuzzo Hair Natural Beauty — prodotti premium, servizi professionali e trattamenti avanzati per la cura naturale dei capelli.",

  openGraph: {
    type: "website",
    url: "https://www.scaramuzzo.green",
    title: "Scaramuzzo Hair Natural Beauty",
    description:
      "Scopri i nostri prodotti professionali, trattamenti naturali e servizi dedicati alla salute dei capelli.",
    siteName: "Scaramuzzo Hair Natural Beauty",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Scaramuzzo Hair Natural Beauty",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Scaramuzzo Hair Natural Beauty",
    description:
      "Prodotti professionali e trattamenti naturali per i capelli.",
    images: ["/og-default.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* JSON-LD Multilocation SEO – mantiene il tuo */}
        <Script
          id="schema-multilocation"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Scaramuzzo Hair Natural Beauty",
              "url": "https://www.scaramuzzo.green",
              "logo":
                "https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp",
              "sameAs": [
                "https://www.instagram.com/scaramuzzohairnaturalbeauty/",
                "https://www.facebook.com/scaramuzzohairnaturalbeauty",
              ],
              "department": [
                // ROMA
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Roma",
                  "image":
                    "https://www.scaramuzzo.green/roma-salone-hero-wide.webp",
                  "telephone": "+390669318238",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via del Pellegrino 101",
                    "addressLocality": "Roma",
                    "addressRegion": "RM",
                    "postalCode": "00186",
                    "addressCountry": "IT",
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      "opens": "10:00",
                      "closes": "20:00",
                    },
                  ],
                  "priceRange": "$$",
                },

                // CORIGLIANO-ROSSANO
                {
                  "@type": "HairSalon",
                  "name":
                    "Scaramuzzo Hair Natural Beauty – Corigliano-Rossano",
                  "image":
                    "https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp",
                  "telephone": "+390983889488",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Nazionale 70",
                    "addressLocality": "Corigliano-Rossano",
                    "addressRegion": "CS",
                    "postalCode": "87064",
                    "addressCountry": "IT",
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      "opens": "09:00",
                      "closes": "19:00",
                    },
                  ],
                  "priceRange": "$$",
                },

                // COSENZA
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Cosenza",
                  "image":
                    "https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp",
                  "telephone": "+39098474525",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Monte San Michele 13/A",
                    "addressLocality": "Cosenza",
                    "addressRegion": "CS",
                    "postalCode": "87100",
                    "addressCountry": "IT",
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      "opens": "09:00",
                      "closes": "19:00",
                    },
                  ],
                  "priceRange": "$$",
                },

                // CASTROVILLARI
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Castrovillari",
                  "image":
                    "https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp",
                  "telephone": "+39098127228",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Corso Giuseppe Garibaldi 13",
                    "addressLocality": "Castrovillari",
                    "addressRegion": "CS",
                    "postalCode": "87012",
                    "addressCountry": "IT",
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      "opens": "09:00",
                      "closes": "19:00",
                    },
                  ],
                  "priceRange": "$$",
                },
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${mono.variable} bg-background text-foreground antialiased min-h-screen`}
      >
        <Navbar />
        <main className="py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
