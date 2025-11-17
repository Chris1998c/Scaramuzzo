/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scaramuzzo.vercel.app",
      },
      {
        protocol: "https",
        hostname: "www.scaramuzzo.green",
      },
      {
        protocol: "https",
        hostname: "scaramuzzo.green",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;
