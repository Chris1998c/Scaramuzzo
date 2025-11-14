/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.scaramuzzo.green",
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Percorsi statici o dinamici che vuoi escludere
  exclude: [
    "/api/*",
    "/404",
    "/500",
  ],

  // Impostazioni SEO raccomandate
  changefreq: "daily",
  priority: 0.7,
  generateIndexSitemap: true,
};
