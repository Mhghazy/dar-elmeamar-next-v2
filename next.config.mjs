/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/dar-el-meamar-next', // DISABLING FOR LOCAL DEBUGGING
  images: {
    unoptimized: true,
  },
};

export default nextConfig;