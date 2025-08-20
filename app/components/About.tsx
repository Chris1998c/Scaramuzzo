import { FC } from 'react'
import Image from 'next/image'
import { aboutTranslations } from '@/lib/translations'

interface AboutProps {
  language: 'it' | 'en'
}

const About: FC<AboutProps> = ({ language }) => {
  const translations = aboutTranslations

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-background text-white">
      {/* 🔳 Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/about-background-optimized.jpg"
          alt="About Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay scuro */}
      </div>

      {/* ✅ Contenuto Testo */}
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          {translations[language].title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          {translations[language].description}
        </p>
      </div>
    </section>
  )
}

export default About
