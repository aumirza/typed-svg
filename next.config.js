/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
