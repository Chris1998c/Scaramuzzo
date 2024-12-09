'use client'

import { FC, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactProps {
  language: 'it' | 'en'
}

const Contact: FC<ContactProps> = ({ language }) => {
  const translations = {
    it: {
      title: "Contattaci",
      name: "Nome",
      email: "Email",
      message: "Messaggio",
      send: "Invia",
      sending: "Inviando...",
      success: "Messaggio inviato con successo!",
      error: "Si è verificato un errore nell'invio del messaggio."
    },
    en: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred while sending the message."
    },
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      if (res.ok) {
        setStatus("sent")
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{translations[language].title}</h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                placeholder={translations[language].name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={translations[language].email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder={translations[language].message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={status === 'sending'}>
              {status === 'sending' ? translations[language].sending : translations[language].send}
            </Button>
            {status === 'sent' && <p className="text-green-500 mt-2">{translations[language].success}</p>}
            {status === 'error' && <p className="text-red-500 mt-2">{translations[language].error}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
