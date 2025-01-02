/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },

  async headers() {
    return [
      {
        source: "/api/cron", // Apply only to the /api/cron path
        headers: [
          {
            key: "Cache-Control",
            value: "no-store", // Prevent caching
          },
          {
            key: "Pragma",
            value: "no-cache", // Prevent caching (legacy support)
          },
          {
            key: "Expires",
            value: "0", // Expire immediately
          },
        ],
      },
    ];
  },
};

export default nextConfig;
