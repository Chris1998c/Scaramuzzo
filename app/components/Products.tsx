"use client"

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productsTranslations } from "@/lib/translations";

interface ProductsProps {
  language: "it" | "en";
}

const Products: FC<ProductsProps> = ({ language }) => {
  const router = useRouter();

  const translations = productsTranslations;

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          {translations[language].title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations[language].products.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-contain rounded-t-lg p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  {product.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
