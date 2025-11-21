import { MetadataRoute } from "next";
import { productTranslations } from "@/app/products/data";
import { serviceTranslations } from "@/app/services/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.scaramuzzo.green";
  const now = new Date();

  // Pagine statiche principali
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/services/erbe-botaniche`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/erbe`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // PAGINE LEGALI AGGIUNTE
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/cookie`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/termini`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Prodotti dinamici
  const productPages: MetadataRoute.Sitemap = productTranslations.it.products.map(
    (product) => ({
      url: `${base}/products/${product.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  // Servizi dinamici
  const servicePages: MetadataRoute.Sitemap = serviceTranslations.it.services.map(
    (service) => ({
      url: `${base}/services/${service.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticPages, ...productPages, ...servicePages];
}
