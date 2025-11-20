export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-gray-400 mb-10">
        Ultimo aggiornamento: 20/11/2025
      </p>

      <p className="mb-4">
        Questa Privacy Policy descrive come Scaramuzzo Studio SRL raccoglie,
        utilizza e protegge i dati personali degli utenti attraverso il sito{" "}
        <strong>www.scaramuzzo.green</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        1. Titolare del trattamento
      </h2>
      <p>
        Scaramuzzo Studio SRL – Via Nazionale 70, 87064 Corigliano-Rossano (CS)
        <br />
        Email: <strong>scaramuzzohnb@gmail.com</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        2. Tipologie di dati raccolti
      </h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Dati forniti dall’utente (nome, email, indirizzo, ecc.)</li>
        <li>Dati tecnici (IP, browser, pagine visitate)</li>
        <li>Dati necessari per completare ordini e spedizioni</li>
        <li>Dati relativi ai pagamenti (gestiti da Stripe)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">3. Finalità</h2>
      <p>
        I dati vengono utilizzati per gestire ordini, spedizioni, assistenza,
        sicurezza del sito, analisi interne e obblighi fiscali.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">4. Conservazione</h2>
      <p>
        I dati sono conservati per il tempo necessario agli obblighi legali e
        operativi, inclusi 10 anni per documentazione fiscale.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">5. Diritti dell’utente</h2>
      <p>
        Puoi richiedere accesso, modifica, cancellazione, portabilità,
        opposizione e revoca del consenso scrivendo a{" "}
        <strong>scaramuzzohnb@gmail.com</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">6. Sicurezza</h2>
      <p>
        Il sito utilizza HTTPS, protezioni server Vercel e pagamenti Stripe
        certificati PCI-DSS.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        7. Modifiche alla Privacy Policy
      </h2>
      <p>
        La presente informativa può essere aggiornata periodicamente. Ti
        consigliamo di consultarla regolarmente.
      </p>
    </div>
  );
}
