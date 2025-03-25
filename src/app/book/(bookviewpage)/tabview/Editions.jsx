import { useRouter } from "next/navigation";
import React from "react";

export default function Editions({ books2 }) {
  const router = useRouter();
    // console.log(books2,"booksbooksbooks")
    const handleBookClick = (i) => {
      router.push(`/book/${i.slug}`);
    };
  return (
    <div className="d-flex ">
      {Array.isArray(books2?.editions) &&
        books2.editions.map((i, index) => (
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
  );
}
