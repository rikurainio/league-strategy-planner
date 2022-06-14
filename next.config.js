/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ddragon.leagueoflegends.com', 'upload.wikimedia.org']
  },
  experimental: { images: { layoutRaw: true } }
}

module.exports = nextConfig
