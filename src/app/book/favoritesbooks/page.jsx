"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import userContext from "../../UseContext/UseContext";
import "../topselling/BookCard.css";
// A helper component to display individual book details
const FavoritesBooks = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const { wishlistvalues } = useContext(userContext);

  // Handle clicking on a book to navigate to the book detail page
  const handleBookClick = (book) => {
    // Use router.push to navigate to the dynamic book detail page
    router.push(`/book/${book.slug}`); // Assuming book has a unique `slug` field
  };

  // If wishlistvalues is not available, return null to hide the component
  // if (!wishlistvalues) {
  //   return null;
  // }

  return (
    <>
      {!wishlistvalues?.length ? (
        ""
      ) : (
        <div className="books-view ms-0 ms-md-5">
          <p className="Top-selling">Find your favorites Books</p>
          <Row className="mb-2">
            {wishlistvalues.map((bookId, index) => (
              <Col
                xs={6}
                sm={6}
                md={4}
                lg={2}
                key={index}
                className=" p-1 p-md-0 book-mobile-card image-card-book"
              >
                <div
                  className="book-card"
                  onClick={() => handleBookClick(bookId.bookId)}
                  // style={{
                  //   cursor: "pointer",
                  //   padding: "15px",
                  //   marginBottom: "20px",
                  //   borderRadius: "10px",
                  //   flexDirection: "column",
                  // }}
                >
                  <div
                    className="book-images"
                    // style={{
                    //   flex: "1 0 auto",
                    //   background: "#ffff",
                    //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    //   borderRadius: "6px",
                    //   padding: "15px",
                    //   display: "flex",
                    //   justifyContent: "center",
                    // }}
                  >
                    {/* Render book image if available, otherwise a placeholder */}
                    <img
                      src={
                        bookId?.bookId?.bookimage?.length > 0
                          ? bookId.bookId.bookimage[0]
                          : "/image/image 9.png"
                      }
                      alt={bookId?.bookId?.title}
                      width={"100%"}
                      // height={"123px"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="book-info mt-2">
                    {/* <div className="d-flex mt-4">
                      <h5
                        className="mb-0"
                        style={{
                          fontFamily: "Inter",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#4D4D4D",
                        }}
                      >
                        {bookId?.bookId?.title.split(" ")[0] + "..."}
                      
                      </h5>

                      <span
                        className="ms-auto"
                        style={{
                          fontSize: "12px",
                          textAlign: "end",
                        }}
                      >
                        {bookId.bookId?.userReadingStatus?.length > 0
                          ? (
                              bookId.bookId.userReadingStatus.reduce(
                                (sum, item) => sum + item.ratings,
                                0
                              ) / bookId.bookId.userReadingStatus.length
                            ).toFixed(1)
                          : 0}
                        /5
                      </span>
                    </div> */}
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
                          {bookId?.bookId?.title.split(" ")[0] + "..."}
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
                          {bookId?.bookId?.title
                            .split(" ")
                            .map((word, index) => (
                              <span key={index}>
                                {word} <br />
                              </span>
                            ))}
                        </h5>
                      </div>
                      <span className="ms-auto" style={{ fontSize: "10px" }}>
                        {bookId.bookId?.userReadingStatus?.length > 0
                          ? (
                              bookId.bookId.userReadingStatus.reduce(
                                (sum, item) => sum + item.ratings,
                                0
                              ) / bookId.bookId.userReadingStatus.length
                            ).toFixed(1)
                          : 0}
                        /5
                      </span>
                    </div>
                    <div className="ratings mt-2 d-flex align-items-center">
                      <span style={{ fontSize: "12px" }}>
                        {bookId?.bookId?.author}
                      </span>
                      <span
                        className="ms-auto rate-values"
                        style={{ fontSize: "9px" }}
                      >
                        {Array.from({ length: 5 }, (_, index) => {
                          const rating =
                            bookId?.bookId?.userReadingStatus?.length > 0
                              ? bookId.bookId.userReadingStatus[0].ratings
                              : 0;
                          return (
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
                          );
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default FavoritesBooks;
