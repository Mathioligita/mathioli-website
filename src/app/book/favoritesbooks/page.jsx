<<<<<<< HEAD

=======
>>>>>>> master
"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import userContext from "../../UseContext/UseContext";
<<<<<<< HEAD
import "../topselling/BookCard.css"
=======
import "../topselling/BookCard.css";
>>>>>>> master
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
<<<<<<< HEAD
      {!wishlistvalues?.length ?
        ""
        : <div className="books-view ms-0 ms-md-5">

          <p className="Top-selling">Find your favorites Books</p>
          <Row className="mb-2">
            {wishlistvalues.map((bookId, index) => (
              <Col xs={12} sm={6} md={4} lg={2} key={index} className=" p-1 p-md-0 book-mobile-card image-card-book">
=======
      {!wishlistvalues?.length ? (
        ""
      ) : (
        <div className="books-view ms-0 ms-md-5">
          <p className="Top-selling">Find your favorites Books</p>
          <Row className="mb-2">
            {wishlistvalues.map((bookId, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={2}
                key={index}
                className=" p-1 p-md-0 book-mobile-card image-card-book"
              >
>>>>>>> master
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
                          : "https://via.placeholder.com/150"
                      }
                      alt={bookId?.bookId?.title}
                      width={"100%"}
                      // height={"123px"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="book-info mt-2">
                    <div className="d-flex mt-4">
<<<<<<< HEAD
                    <h5 className="mb-0" style={{fontFamily:"Inter",fontSize:"15px", fontWeight: "700", color: "#4D4D4D"}}>{bookId?.bookId?.title}</h5>
                    
=======
                      <h5
                        className="mb-0"
                        style={{
                          fontFamily: "Inter",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#4D4D4D",
                        }}
                      >
                        {bookId?.bookId?.title}
                      </h5>

>>>>>>> master
                      <span
                        className="ms-auto"
                        style={{
                          fontSize: "12px",
                          textAlign: "end",
                        }}
                      >
                        {bookId.bookId?.userReadingStatus?.length > 0
                          ? (
<<<<<<< HEAD
                            bookId.bookId.userReadingStatus.reduce(
                              (sum, item) => sum + item.ratings,
                              0
                            ) / bookId.bookId.userReadingStatus.length
                          ).toFixed(1)
=======
                              bookId.bookId.userReadingStatus.reduce(
                                (sum, item) => sum + item.ratings,
                                0
                              ) / bookId.bookId.userReadingStatus.length
                            ).toFixed(1)
>>>>>>> master
                          : 0}
                        /5
                      </span>
                    </div>
                    <div className="ratings mt-2 d-flex align-items-center">
                      <span style={{ fontSize: "12px" }}>
                        {bookId?.bookId?.author}
                      </span>
<<<<<<< HEAD
                      <span className="ms-auto rate-values" style={{ fontSize: "9px" }}>
=======
                      <span
                        className="ms-auto rate-values"
                        style={{ fontSize: "9px" }}
                      >
>>>>>>> master
                        {Array.from({ length: 5 }, (_, index) => {
                          const rating =
                            bookId?.bookId?.userReadingStatus?.length > 0
                              ? bookId.bookId.userReadingStatus[0].ratings
                              : 0;
                          return (
                            <i
                              key={index}
<<<<<<< HEAD
                              className={`pi ${index < rating ? "pi-star-fill" : "pi-star"
                                }`}
                              style={{
                                color: index < rating ? "#FFCB45" : "inherit",
                               fontSize:"12px",margin:"1px"
=======
                              className={`pi ${
                                index < rating ? "pi-star-fill" : "pi-star"
                              }`}
                              style={{
                                color: index < rating ? "#FFCB45" : "inherit",
                                fontSize: "12px",
                                margin: "1px",
>>>>>>> master
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
<<<<<<< HEAD
        </div>}

=======
        </div>
      )}
>>>>>>> master
    </>
  );
};

export default FavoritesBooks;
