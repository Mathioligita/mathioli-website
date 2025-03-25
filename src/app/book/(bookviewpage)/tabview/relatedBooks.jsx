import { useRouter } from "next/navigation";
import React from "react";
import { Col, Row } from "react-bootstrap";

export default function RelatedBooks({ books2 }) {
  // console.log(books2, "booksbooksbooks");
  const router = useRouter();
  const handleBookClick = (i) => {
    router.push(`/book/${i.slug}`);
  };
  return (
    <div>
      <Row className="d-flex ">
        {Array.isArray(books2?.relatedBooks) &&
          books2.relatedBooks.map((i, index) => (
            <Col
              md={1}
              sm={6}
              key={i?.id || index}
              className=" d-flex"
              onClick={() => handleBookClick(i)}
            >
              {" "}
              {/* Use a unique key */}
              <img
                src={i?.bookimage || "No image available."}
                className="author-image ms-3"
                alt="Book Image"
                width={"80px"}
                style={{ cursor: "pointer" }}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}
