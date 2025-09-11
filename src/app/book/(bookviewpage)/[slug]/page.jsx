// import { API_BASE_URL } from "@/app/utils";
// import SingleViewPage from "./SingleViewPage"; // client UI

// export async function generateMetadata({ params }) {
//   console.log(params.slug, "params");
//   const res = await fetch(`${API_BASE_URL}/user/book/${params.slug}`, {
//     cache: "no-store", // or "force-cache" depending on freshness
//   });
//   const data = await res?.json();

//   const book = data.data.book;
//   console.log(book, "book");

//   return {
//     title: book?.metaTitle || "Default Title",
//     description:
//       book?.metaDescription ||
//       "Discover this amazing book. Explore its details, reviews, and more.",
//     alternates: { canonical: book?.canonicalTag },
//     openGraph: {
//       title: book?.metaTitle,
//       description: book?.metaDescription,
//       url: book?.canonicalTag,
//       images: [book?.bookimage?.[0] || "/default-book-image.jpg"],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: book?.metaTitle,
//       description: book?.metaDescription,
//       images: [book?.bookimage?.[0] || "/default-book-image.jpg"],
//     },
//   };
// }

// export default async function BookDetailPage({ params }) {
//   console.log();
//   const res = await fetch(`${API_BASE_URL}/user/book/${params.slug}`, {
//     cache: "no-store",
//   });
//   const book = await res.json();

//   return <SingleViewPage book={book} />;
// }

import { API_BASE_URL } from "@/app/utils";
import SingleViewPage from "./SingleViewPage"; // client UI

export async function generateMetadata({ params }) {
  // Fetch book data for SEO
  const res = await fetch(`${API_BASE_URL}/user/book/${params?.slug}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const book = data?.data?.book;

  // Build canonical URL from current slug
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const canonicalUrl = `${baseUrl}/book/${params?.slug}`;

  return {
    title: book?.metaTitle || "Default Title",
    description:
      book?.metaDescription ||
      "Discover this amazing book. Explore its details, reviews, and more.",
    keywords: book?.keywords || "books, reading, literature, novels",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: book?.metaTitle,
      description: book?.metaDescription,
      url: canonicalUrl,
      images: [book?.bookimage?.[0] || "/default-book-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: book?.metaTitle,
      description: book?.metaDescription,
      images: [book?.bookimage?.[0] || "/default-book-image.jpg"],
    },
  };
}

export default async function BookDetailPage({ params }) {
  return <SingleViewPage slug={params?.slug} />;
}
