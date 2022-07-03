/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    { source: '/api/:path*', destination: 'http://localhost:5001/api/:path*'},
    { source: '/oauth/:path*', destination: 'http://localhost:5001/oauth/:path*'},
  ]
}

module.exports = nextConfig
