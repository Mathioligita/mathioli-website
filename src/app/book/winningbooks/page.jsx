// import React, { useContext } from "react";
// import userContext from "../../UseContext/UseContext";
// import { Col, Row } from "react-bootstrap";
// export default function Winingbooks() {
//   const { booksdata } = useContext(userContext);
//   console.log(booksdata, "booksdata");

//   return (
//     <>
//     {
//       booksdata.map((book, index) =>(
//         <>
//         {book ? }
//         </>

//       ))

//     }
//     </>
//     // <div>
//     //   <div className="books-view ms-5" style={{ flexWrap: "wrap" }}>
//     //     <p style={{ fontSize: "25px" }}>Award Winning Books</p>
//     //     <Row>
//     //       {wishlistvalues?.map((bookId, index) => (
//     //         <Col md={2} key={index}>

//     //           <div
//     //             className="book-card"
//     //             onClick={handleBookClick}
//     //             style={{
//     //               cursor: "pointer",

//     //               justifyContent: "space-between",
//     //               padding: "15px",

//     //               marginBottom: "20px",
//     //             }}
//     //           >
//     //             <div
//     //               className="book-image "
//     //               style={{
//     //                 cursor: "pointer",
//     //                 // border: "1px solid #ccc",

//     //                 padding: "19px",
//     //                 borderRadius: "10px",
//     //                 // marginBottom: "20px",
//     //                 boxShadow:
//     //                   " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
//     //                 width: "fit-content",
//     //               }}
//     //             >
//     //               {/* Render book image if available, otherwise a placeholder */}
//     //               <img
//     //                 src={
//     //                   bookId.bookId.bookimage &&
//     //                   bookId.bookId.bookimage.length > 0
//     //                     ? bookId.bookId.bookimage[0]
//     //                     : "https://via.placeholder.com/150"
//     //                 }
//     //                 alt={bookId.bookId.title}
//     //                 style={{ height: "200px", width: "150px" }}
//     //               />
//     //             </div>
//     //             <div className="book-info" style={{ marginTop: "10px" }}>
//     //               {/* {console.log(
//     //             book.userReadingStatus.map((item) => item.ratings),
//     //             "book"
//     //           )} */}
//     //               {/* <h5>{book.title} <span>{book.userReadingStatus.map((item)=>{item.ratings})}/5</span></h5> */}
//     //               <div className="d-flex">
//     //                 <h5>{bookId.bookId.title}</h5>
//     //                 <span
//     //                   className="ms-auto"
//     //                   style={{
//     //                     fontSize: "12px",
//     //                     justifyContent: "end",
//     //                     textAlign: "end",
//     //                   }}
//     //                 >
//     //                   {bookId.bookId?.userReadingStatus?.length > 0
//     //                     ? (
//     //                         bookId.bookId.userReadingStatus.reduce(
//     //                           (sum, item) => sum + item.ratings,
//     //                           0
//     //                         ) / bookId.bookId.userReadingStatus.length
//     //                       ).toFixed(1)
//     //                     : 0}
//     //                   /5
//     //                 </span>
//     //               </div>

//     //               <div
//     //                 className="ratings d-flex"
//     //                 style={{ marginTop: "10px", fontSize: "14px" }}
//     //               >
//     //                 {bookId.bookId.author}
//     //                 {/* Display stars based on a dynamic rating */}
//     //                 <span className="mt-1" style={{ fontSize: "9px" }}>
//     //                   {"⭐".repeat(bookId.bookId.rating || 5)}
//     //                 </span>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </Col>
//     //       ))}
//     //     </Row>
//     //   </div>
//     // </div>
//   );
// }
"use client";
import React, { useContext } from "react";
import userContext from "../../UseContext/UseContext";
import { Col, Row } from "react-bootstrap";
import "./Winingbooks.css";
import SkeletonPreloader from "components/SkeletonPreloader";

export default function Winingbooks() {
  const { booksdata } = useContext(userContext);
  // console.log(booksdata, "booksdata");

  // Filter booksdata to include only award-winning books
  const awardWinningBooks = booksdata?.filter((book) => book.awardWinningBook);

  return (
    <div>
      <div className="books-view ms-0 ms-md-5">
        <p className="Top-selling">Award Winning Books</p>
        <Row className="mb-3">
          {awardWinningBooks?.length > 0 ? (
            <>
              {awardWinningBooks.map((bookId, index) => (
                <Col
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  key={index}
                  className="p-1 p-md-0 book-mobile-card image-card-book"
                >
                  <div
                    className="book-card"
                    onClick={() => handleBookClick(bookId.bookId)}
                  >
                    <div className="book-images">
                      {/* Render book image if available, otherwise a placeholder */}
                      <img
                        src={
                          bookId?.bookimage && bookId?.bookimage?.length > 0
                            ? bookId?.bookimage[0]
                            : "/image/image 9.png"
                        }
                        // src={
                        //   bookId?.bookId?.bookimage?.length > 0
                        //     ? bookId.bookId.bookimage[0]
                        //     : "https://via.placeholder.com/150"
                        // }
                        alt={bookId?.bookId?.title}
                        width={"100%"}
                        // height={"123px"}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="book-info mt-2">
                      <div className="d-flex  mt-4">
                        <h5
                          className="mb-0"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#4D4D4D",
                          }}
                        >
                          {bookId?.title}
                        </h5>

                        <span
                          className="ms-auto"
                          style={{
                            fontSize: "12px",
                            textAlign: "end",
                          }}
                        >
                          {bookId?.userReadingStatus?.length > 0
                            ? (
                                bookId.userReadingStatus.reduce(
                                  (sum, item) => sum + item.ratings,
                                  0
                                ) / bookId.userReadingStatus.length
                              ).toFixed(1)
                            : 0}
                          /5
                        </span>
                      </div>
                      <div className="ratings mt-1 d-flex align-items-center">
                        <span style={{ fontSize: "12px" }}>
                          {bookId?.author}
                        </span>
                        <span
                          className="ms-auto rate-values"
                          style={{ fontSize: "9px" }}
                        >
                          {Array.from({ length: 5 }, (_, index) => {
                            const rating =
                              bookId?.userReadingStatus?.length > 0
                                ? bookId.userReadingStatus[0].ratings
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
            </>
          ) : (
            <>
              <section style={{ display: "flex" }}>
                <SkeletonPreloader />
                <SkeletonPreloader />
              </section>
            </>
          )}
        </Row>
      </div>
    </div>
  );
}
