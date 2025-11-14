/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"], // WebP + AVIF automatico
    domains: ["scaramuzzo.vercel.app", "scaramuzzo.green"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 giorni cache
  },

  experimental: {
    optimizeCss: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
