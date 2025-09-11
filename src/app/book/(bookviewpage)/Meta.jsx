import { API_BASE_URL } from "@/app/utils";

export async function generateMetadata({ slug }) {
  console.log(slug, "slug");
  const res = await fetch(`${API_BASE_URL}/user/book/${slug}`);
  const book = await res.json();
  console.log(book, "book>???>?>?");

  return {
    title: book.metaTitle || "Default Title",
    description: book.metaDescription || "Default description",
    alternates: { canonical: book.canonicalTag },
    openGraph: {
      title: book.metaTitle,
      description: book.metaDescription,
      images: [book.bookimage?.[0] || "/default-book-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: book.metaTitle,
      description: book.metaDescription,
      images: [book.bookimage?.[0]],
    },
  };
}
