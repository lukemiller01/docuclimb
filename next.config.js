/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.docuclimb.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
