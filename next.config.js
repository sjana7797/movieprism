/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384, 500],
    domains: ["image.tmdb.org", "s4.anilist.co", "dummyimage.com"],
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
