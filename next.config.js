/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 200, 384],
    domains: ["image.tmdb.org", "s4.anilist.co"],
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
