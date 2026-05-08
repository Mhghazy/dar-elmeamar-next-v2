/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'motion',
      '@supabase/supabase-js',
      'react-icons',
      'three',
      'vanta',
    ],
  },
  generateBuildId: async () => 'darelmeamar-prod',
};

export default nextConfig;