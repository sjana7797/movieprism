/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "s4.anilist.co"],
  },
};

module.exports = nextConfig;
