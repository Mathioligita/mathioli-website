// module.exports = {
//   siteUrl: "https://www.mathioligita.com",
//   generateRobotsTxt: true, // (optional)
//   // ...other options
// };
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.mathioligita.com/",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/server-sitemap.xml",
    "/admin",
    "/admin/*",
    "/account",
    "/account/*",
    "/cart",
    "/checkout",
    "/thank-you",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/cart", "/checkout", "/thank-you"],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || "https://www.mathioligita.com/"}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transformation for specific paths
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    if (path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
