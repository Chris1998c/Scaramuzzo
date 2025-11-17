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

export const metadata: Metadata = {
  title: "Scaramuzzo | Hair Natural Beauty",
  description:
    "Scopri i migliori servizi e prodotti per la cura naturale dei capelli.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* JSON-LD Multilocation SEO – OTTIMIZZATO */}
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
              "logo": "https://www.scaramuzzo.green/logo.png",
              "sameAs": [
                "https://www.instagram.com/scaramuzzohairnaturalbeauty/",
                "https://www.facebook.com/scaramuzzohairnaturalbeauty"
              ],
              "department": [
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Corigliano-Rossano",
                  "image": "https://www.scaramuzzo.green/logo.png",
                  "telephone": "+39 0983 889488",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Nazionale 70",
                    "addressLocality": "Corigliano-Rossano",
                    "addressRegion": "CS",
                    "postalCode": "87064",
                    "addressCountry": "IT"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 39.6612,
                    "longitude": 16.5186
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Tuesday","Wednesday","Thursday","Friday","Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "19:00"
                  }],
                  "priceRange": "$$$"
                },
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Castrovillari",
                  "image": "https://www.scaramuzzo.green/logo.png",
                  "telephone": "+39 0981 27228",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Corso Giuseppe Garibaldi 13",
                    "addressLocality": "Castrovillari",
                    "addressRegion": "CS",
                    "postalCode": "87012",
                    "addressCountry": "IT"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 39.816,
                    "longitude": 16.202
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday","Wednesday","Thursday","Friday","Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "19:00"
                  }],
                  "priceRange": "$$"
                },
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Cosenza",
                  "image": "https://www.scaramuzzo.green/logo.png",
                  "telephone": "+39 0984 74525",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Monte San Michele 13",
                    "addressLocality": "Cosenza",
                    "addressRegion": "CS",
                    "postalCode": "87100",
                    "addressCountry": "IT"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 39.298,
                    "longitude": 16.2537
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday","Wednesday","Thursday","Friday","Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "19:00"
                  }],
                  "priceRange": "$$"
                },
                {
                  "@type": "HairSalon",
                  "name": "Scaramuzzo Hair Natural Beauty – Roma",
                  "image": "https://www.scaramuzzo.green/logo.png",
                  "telephone": "+39 06 69318238",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via del Pellegrino 101",
                    "addressLocality": "Roma",
                    "addressRegion": "RM",
                    "postalCode": "00186",
                    "addressCountry": "IT"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 41.8948,
                    "longitude": 12.4737
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday","Tuesday","Thursday","Friday","Saturday"
                    ],
                    "opens": "10:00",
                    "closes": "20:00"
                  }],
                  "priceRange": "$$$"
                }
              ]
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
