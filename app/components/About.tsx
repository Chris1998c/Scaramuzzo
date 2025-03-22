import { FC } from 'react'

interface AboutProps {
  language: 'it' | 'en'
}

const About: FC<AboutProps> = ({ language }) => {
  const translations = {
    it: {
      title: "Chi Siamo",
      description: "Scaramuzzo Hair Natural Beauty è un salone di bellezza all'avanguardia che combina tecniche tradizionali con le ultime innovazioni nel campo della cura dei capelli. Fondato da Giuseppe Scaramuzzo, il nostro salone si impegna a offrire servizi personalizzati e prodotti naturali per esaltare la bellezza unica di ogni cliente. Con anni di esperienza e una passione per l'eccellenza, il nostro team di stilisti altamente qualificati si dedica a creare look che riflettono la personalità e lo stile di vita di ciascun individuo. Utilizziamo solo prodotti di alta qualità e rispettosi dell'ambiente, garantendo risultati straordinari e capelli sani. Venite a scoprire l'esperienza Scaramuzzo, dove la bellezza naturale incontra l'arte del parrucchiere.",
    },
    en: {
      title: "About Us",
      description: "Scaramuzzo Hair Natural Beauty is a cutting-edge beauty salon that combines traditional techniques with the latest innovations in hair care. Founded by Giuseppe Scaramuzzo, our salon is committed to offering personalized services and natural products to enhance the unique beauty of each client. With years of experience and a passion for excellence, our team of highly skilled stylists is dedicated to creating looks that reflect the personality and lifestyle of each individual. We use only high-quality, environmentally friendly products, ensuring extraordinary results and healthy hair. Come and discover the Scaramuzzo experience, where natural beauty meets the art of hairdressing.",
    },
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          {translations[language].title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
          {translations[language].description}
        </p>
      </div>
    </section>
  )
}

export default About
