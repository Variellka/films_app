/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL_FOR_GENRES: process.env.URL_FOR_GENRES,
    URL_FOR_MOVIES: process.env.URL_FOR_MOVIES,
    AUTH_KEY: process.env.AUTH_KEY,
    URL_FOR_MOVIE_DETAILS: process.env.URL_FOR_MOVIE_DETAILS
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
				source: '/api/:path*',
				destination: 'https://api.themoviedb.org/3/:path*',
			},
    ]
  },
};

export default nextConfig;
