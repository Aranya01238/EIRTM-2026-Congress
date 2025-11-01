/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line to disable Turbopack
  experimental: {
    // appDir: true, // Keep this if you are using the app directory
    // Other experimental flags you might have
    // webpack: true, // Explicitly enable webpack
  },
};

export default nextConfig;