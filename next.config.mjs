/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com", // Allow Wix images
      },
    ],
    domains: [
      "gelato-api-live.s3.eu-west-1.amazonaws.com", // Gelato API S3 bucket
      "swxkoqljwvokdwuukgii.supabase.co", // Supabase storage domain added
    ],
  },
};

export default nextConfig;
