import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.scaramuzzo.green";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/checkout/*",
          "/cart",
          "/api/*",
          "/404",
          "/500"
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
