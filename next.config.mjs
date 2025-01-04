const path = require('path');

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
        path.join(__dirname, "node_modules/dayjs/**/*")
      ]
    }
  }
};

module.exports = nextConfig;
