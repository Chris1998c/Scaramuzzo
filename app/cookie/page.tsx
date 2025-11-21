export const metadata = {
  title: "Cookie Policy • Scaramuzzo Hair Natural Beauty",
  description:
    "Cookie Policy ufficiale di Scaramuzzo Hair Natural Beauty. Informazioni su cookie tecnici, analitici e di marketing utilizzati sul sito www.scaramuzzo.green.",
  alternates: {
    canonical: "https://www.scaramuzzo.green/cookie",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cookie Policy • Scaramuzzo Hair Natural Beauty",
    description:
      "Scopri come Scaramuzzo utilizza cookie tecnici, analitici e di marketing.",
    url: "https://www.scaramuzzo.green/cookie",
    siteName: "Scaramuzzo Hair Natural Beauty",
    images: ["/og-default.webp"],
    locale: "it_IT",
    type: "website",
  },
};

export default function CookiePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-sm text-gray-400 mb-10">
        Ultimo aggiornamento: 20/11/2025
      </p>

      <p className="mb-4">
        Il sito <strong>www.scaramuzzo.green</strong> utilizza cookie tecnici,
        analitici e, su consenso, cookie di marketing.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        1. Cosa sono i Cookie?
      </h2>
      <p>
        Piccoli file di testo che migliorano l’esperienza utente e permettono il
        corretto funzionamento del sito.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        2. Tipologie di Cookie
      </h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Cookie tecnici (obbligatori)</li>
        <li>Cookie analitici (statistiche)</li>
        <li>Cookie di marketing/profilazione</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        3. Cookie di Terze Parti
      </h2>
      <p>
        Il sito può utilizzare servizi come Stripe, Resend, Vercel Analytics,
        Google Analytics (se attivato), Meta Pixel (se attivato).
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        4. Gestione dei Cookie
      </h2>
      <p>
        Puoi gestire le preferenze tramite browser o tramite il banner cookie
        quando presente.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        5. Durata dei Cookie
      </h2>
      <p>
        I cookie possono essere di sessione (si cancellano alla chiusura del
        browser) o persistenti (durata variabile da 1 giorno a 12 mesi).
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        6. Contatti
      </h2>
      <p>
        Per qualsiasi richiesta:{" "}
        <strong>scaramuzzohnb@gmail.com</strong>
      </p>
    </div>
  );
}
