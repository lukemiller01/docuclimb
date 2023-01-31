/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docuclimb.onrender.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
