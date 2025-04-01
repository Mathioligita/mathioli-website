import { useRouter } from "next/navigation";
import React from "react";
import { Col } from "react-bootstrap";
import "./BookCard.css"; // Import the CSS file for additional styling

// A helper component to display individual book details
const BookCard = ({ book }) => {
  const router = useRouter(); // Initialize the useRouter hook
  // Handle clicking on a book to navigate to the book detail page
  const handleBookClick = () => {
    router.push(`/book/${book.slug}`);
  };

  const ratings = book?.userReadingStatus?.map((item) => item?.ratings) || [5];

  // Get the first rating (assuming you want to display only one rating)
  const rating = ratings[0];

  if (!book) {
    return <p>no data</p>;
  }
  return (
    <Col
      xs={6}
      sm={4}
      md={3}
      lg={2}
      className="p-1 p-md-0 book-mobile-card image-card-book  "
    >
      <div
        className="book-card"
        onClick={handleBookClick}
        // style={{ width: "200px" }}
      >
        <div className="book-images card text-center ">
          <img
            src={
              book.bookimage && book.bookimage.length > 0
                ? book.bookimage[0]
                : "/image/image 9.png"
            }
            alt={book.title}
            width={"100%"}
          />
        </div>
        <div className="book-info mt-2 " style={{ position: "relative" }}>
          <div className="d-flex justify-content-between align-items-center mt-4 book-value-gamda  ">
            {/* <h5 className="mb-0">{book.title.split(" ")[0] + "..."}</h5>
             */}
            <div className="d-flex ">
              <h5
                className="mb-2 hoverbooks-title-2"
                style={{
                  fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#4D4D4D",
                }}
              >
                {book.title.split(" ")[0] + "..."}
              </h5>
              <h5
                className="mb-2 hoverbooks-title"
                style={{
                  fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "white",
                  position: "absolute",
                  top: "0",
                  maxWidth: "900px",
                }}
              >
                {book.title.split(" ").map((word, index) => (
                  <span key={index}>
                    {word} <br />
                  </span>
                ))}
              </h5>
            </div>
            <span className="ms-auto" style={{ fontSize: "10px" }}>
              {book.userReadingStatus.length > 0
                ? (
                    book.userReadingStatus.reduce(
                      (sum, item) => sum + item.ratings,
                      0
                    ) / book.userReadingStatus.length
                  ).toFixed(1)
                : 0}
              /5
            </span>
          </div>
          <div className="ratings mt-1 d-flex align-items-center">
            <span>{book.author}</span>
            <span className="ms-auto rate-values">
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`pi ${
                    index < rating ? "pi-star-fill" : "pi-star"
                  }`}
                  style={{
                    color: index < rating ? "#FFCB45" : "inherit",
                    fontSize: "12px",
                    margin: "1px",
                  }}
                ></i>
              ))}
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BookCard;
