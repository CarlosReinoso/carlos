module.exports = {
  siteUrl: "https://www.carlosreinoso.co.uk",
  generateRobotsTxt: true, // ✅ Generates robots.txt automatically
  sitemapSize: 5000, // ✅ Ensures large sitemaps don’t break
  generateIndexSitemap: true, // ✅ Main sitemap indexes all sub-sitemaps

  transform: async (config, url) => {
    if (url === "https://www.carlosreinoso.co.uk/") {
      return {
        loc: url,
        lastmod: new Date().toISOString(),
        priority: 1.0,
        changefreq: "daily",
      };
    }
    if (url.includes("/web-dev")) {
      return {
        loc: url,
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      };
    }
    if (url.includes("/property")) {
      return {
        loc: url,
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      };
    }
    if (url.includes("/music")) {
      return {
        loc: url,
        lastmod: new Date().toISOString(),
        priority: 0.8,
        changefreq: "weekly",
      };
    }
    if (url.includes("/travel")) {
      return {
        loc: url,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        changefreq: "weekly",
      };
    }
    return config; // Default behavior for other pages
  },

  additionalSitemaps: [
    "https://www.carlosreinoso.co.uk/sitemap-web-dev.xml",
    "https://www.carlosreinoso.co.uk/sitemap-property.xml",
    "https://www.carlosreinoso.co.uk/sitemap-music.xml",
    "https://www.carlosreinoso.co.uk/sitemap-travel.xml",
  ],
};
