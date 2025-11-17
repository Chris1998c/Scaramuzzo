import { MetadataRoute } from "next";
import { productTranslations } from "./products/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.scaramuzzo.green";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/services",
    "/erbe",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Pagine dinamiche prodotti
  const productRoutes: MetadataRoute.Sitemap = productTranslations.it.products.map(
    (p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...productRoutes];
}
