import { FC } from 'react'
import Image from 'next/image'
import { homeTranslations } from '@/lib/translations'

interface HomeProps {
  language: 'it' | 'en'
}

const Home: FC<HomeProps> = ({ language }) => {
  const translations = homeTranslations

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/roma-salone-hero-wide.jpg"
        fill
        alt="Salone Roma"
        style={{ objectFit: 'cover' }}
        className="brightness-[0.4]"
        priority
      />

      <div className="container mx-auto px-4 text-center text-white z-10">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
          {translations[language].hero}
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl">
          {translations[language].description}
        </p>
      </div>
    </section>
  )
}

export default Home
