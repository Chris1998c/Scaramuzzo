"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Language = "it" | "en";

type Status = "idle" | "sending" | "sent" | "error";

const translations = {
  it: {
    title: "Contattaci",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    send: "Invia",
    sending: "Inviando...",
    success: "Messaggio inviato con successo!",
    error: "Si è verificato un errore nell'invio del messaggio.",
  },
  en: {
    title: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "An error occurred while sending the message.",
  },
} as const;

export default function ContactClient() {
  const [language, setLanguage] = useState<Language>("it");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "it" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">{t.title}</h1>

        <form
          className="max-w-md mx-auto bg-card shadow-card rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              placeholder={t.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Textarea
              rows={5}
              placeholder={t.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? t.sending : t.send}
          </Button>

          {status === "sent" && (
            <p className="text-green-500 mt-2 text-sm">{t.success}</p>
          )}
          {status === "error" && (
            <p className="text-red-500 mt-2 text-sm">{t.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
