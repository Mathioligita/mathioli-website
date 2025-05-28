// module.exports = {
//   siteUrl: "https://www.mathioligita.com",
//   generateRobotsTxt: true, // (optional)
//   // ...other options
// };
// //

// next-sitemap.config.js
const axios = require("axios");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.mathioligita.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: "./public",
  sitemapBaseFileName: "sitemap_index",
  generateIndexSitemap: true,

  additionalPaths: async (config) => {
    try {
      // Call the same backend API used in your React frontend
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/book`
      ); // <-- Change if needed
      const books = response?.data?.data.books || [];

      // Optional: Sort like your frontend
      const sortedBooks = books.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return [
        // Static book routes
        {
          loc: "/book",
          changefreq: "weekly",
          priority: 0.9,
          lastmod: new Date().toISOString(),
        },
        {
          loc: "/book/categories",
          changefreq: "weekly",
          priority: 0.9,
          lastmod: new Date().toISOString(),
        },
        // Dynamic book slugs
        ...sortedBooks.map((book) => ({
          loc: `/book/${book.slug}`, // or book._id or any identifier
          changefreq: "weekly",
          priority: 0.8,
          lastmod: book.updatedAt || book.createdAt || new Date().toISOString(),
        })),
      ];
    } catch (error) {
      console.error("Error generating sitemap:", error);
      return [];
    }
  },
};
