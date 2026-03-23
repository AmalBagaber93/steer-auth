import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n/request.ts');

const nextConfig: NextConfig = { 
  typedRoutes: true,
  output: 'standalone'
};

export default withNextIntl(nextConfig);
