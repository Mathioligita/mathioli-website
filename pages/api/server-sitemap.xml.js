import { getServerSideSitemap } from "next-sitemap";
// import { getAllProducts } from "../../lib/products";
import { BookAPI } from "api/page";

export const getServerSideProps = async (ctx) => {
  try {
    // Fetch dynamic content from your CMS or database
    const [posts, products, categories] = await Promise.all([
      BookAPI(),
    //   getAllProducts(),
    //   getAllCategories(),
    ]);

    const fields = [
      // Static important pages
      {
        loc: `${process.env.SITE_URL || "https://www.mathioligita.com/"}/about`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: `${process.env.SITE_URL || "https://www.mathioligita.com/"}/contact`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      },

      // Dynamic posts
      ...posts.map((post) => ({
        loc: `${process.env.SITE_URL || "https://www.mathioligita.com/"}/book/${
          post.slug
        }`,
        lastmod: new Date(post.updatedAt).toISOString(),
        changefreq: "weekly",
        priority: 0.9,
      })),

      // Dynamic products
      ...products.map((product) => ({
        loc: `${process.env.SITE_URL || "https://www.mathioligita.com/"}/book/audio-books/${
          product.slug
        }`,
        lastmod: new Date(product.updatedAt).toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      })),

      // Dynamic categories
      ...categories.map((category) => ({
        loc: `${process.env.SITE_URL || "https://www.mathioligita.com/"}/book/categories${
          category.slug
        }`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.7,
      })),
    ];

    return getServerSideSitemap(ctx, fields);
  } catch (e) {
    console.error("Error generating server sitemap:", e);
    return getServerSideSitemap(ctx, []);
  }
};

// Default export to prevent next.js errors
export default function ServerSitemap() {}
