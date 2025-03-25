import { useRouter } from "next/navigation";
import React from "react";

export default function RelatedBooks({ books2 }) {
  // console.log(books2, "booksbooksbooks");
  const router = useRouter();
  const handleBookClick = (i) => {
    router.push(`/book/${i.slug}`);
  };
  return (
    <div>
      <div className="d-flex ">
        {Array.isArray(books2?.relatedBooks) &&
          books2.relatedBooks.map((i, index) => (
            <div key={i?.id || index} className=" d-flex" onClick={() => handleBookClick(i)}>
              {" "}
              {/* Use a unique key */}
              <img
                src={i?.bookimage || "No image available."}
                className="author-image ms-3"
                alt="Book Image"
                width={"80px"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
