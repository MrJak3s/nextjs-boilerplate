/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['skins.mcstats.com', 'minotar.net', 'api.mineatar.io', 'playerdb.co'],
    unoptimized: true
  }
};

module.exports = withNextIntl(nextConfig);
