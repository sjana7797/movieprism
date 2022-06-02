/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384, 500],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 300,
  },
};

module.exports = nextConfig;
