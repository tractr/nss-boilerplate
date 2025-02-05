import type { NextConfig } from 'next';
import { env } from './src/lib/env';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: env(),
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'arxsqqmtbmdvlslshkgb.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
