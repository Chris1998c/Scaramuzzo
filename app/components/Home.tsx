import { FC } from 'react'
import Image from 'next/image'

interface HomeProps {
  language: 'it' | 'en'
}

const Home: FC<HomeProps> = ({ language }) => {
  const translations = {
    it: {
      hero: "Il tuo stile, naturalmente perfetto",
      description: "Trasformiamo i tuoi capelli con cura naturale",
    },
    en: {
      hero: "Your style, naturally perfect",
      description: "We transform your hair with natural care",
    },
  }

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/img-home.webp" 
        fill
        alt="Salon Background"
        style={{ objectFit: 'cover' }} 
        className="brightness-50"
      />
      <div className="relative container mx-auto px-4 text-center text-white z-10">
        <h1 className="font-bold text-4xl md:text-6xl mb-6 text-white">{translations[language].hero}</h1>
        <p className="text-xl md:text-2xl text-white">{translations[language].description}</p>
      </div>
    </section>
  )
}

export default Home