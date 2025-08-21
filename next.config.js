/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // No fallar el build por errores de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // No fallar el build por errores de TypeScript
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
