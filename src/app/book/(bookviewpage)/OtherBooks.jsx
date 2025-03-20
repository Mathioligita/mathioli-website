import { useRouter } from "next/navigation";
import React from "react";

export default function OtherBooks({ books }) {
  console.log(books, "books");

  const router = useRouter();
  const handleBookClick = (i) => {
    router.push(`/book/${i.slug}`);
  };
  return (
    <>
      <div
        className="d-flex"
        style={{ justifyContent: "space-evenly", cursor: "pointer" }}
      >
        {Array.isArray(books.relatedBooks) &&
          books.relatedBooks.slice(0, 3).map((i, index) => (
            <div
              key={i?.id || index}
              className="d-flex"
              onClick={() => handleBookClick(i)}
            >
              {" "}
              {/* Use a unique key */}
              <img
                src={i?.bookimage || "No image available."}
                className="author-image"
                alt="Book Image"
                width={"80px"}
              />
            </div>
          ))}
      </div>
    </>
  );
}
