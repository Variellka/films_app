/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL_FOR_GENRES: process.env.URL_FOR_GENRES,
    URL_FOR_MOVIES: process.env.URL_FOR_MOVIES,
    AUTH_KEY: process.env.AUTH_KEY
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
