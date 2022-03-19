/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["image.tmdb.org", "s4.anilist.co"],
  },
};

module.exports = nextConfig;
