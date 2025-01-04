import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      "src/app/api/scrape": [
        path.join(process.cwd(), "node_modules/dayjs/**/*"),
      ],
    },
  },
};

export default nextConfig;
