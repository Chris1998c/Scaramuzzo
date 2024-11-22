import { FC } from 'react'
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
    },
    en: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
    },
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{translations[language].title}</h2>
        <form className="max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <Input placeholder={translations[language].name} />
            </div>
            <div>
              <Input type="email" placeholder={translations[language].email} />
            </div>
            <div>
              <Textarea placeholder={translations[language].message} />
            </div>
            <Button type="submit" className="w-full">
              {translations[language].send}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact