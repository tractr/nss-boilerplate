import type { NextConfig } from 'next';
import { env } from './src/lib/env';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: env(),
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '/weather/**',
      },
      {
        protocol: 'https',
        hostname: 'molluscan-supabase.com',
        pathname: '/storage/v1/object/public/valvo_images/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
