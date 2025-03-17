// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Container, Row, Col, Button, Card } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { MyOrders } from "../../../../api/page";

// // export default function BookMark() {
// //   const [myorders, setMyorders] = useState([]);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchdata = async () => {
// //       const response = await MyOrders();
// //       setMyorders(response.data.orders);
// //     };
// //     fetchdata();
// //   }, []);

// //   return (
// //     <Container>
// //       <h5 className="text-start">My Orders</h5>
// //       <Row>
// //         {myorders?.map((order, orderIndex) =>
// //           order.orderItems.map((item, itemIndex) => {
// //             const book = item.book;
// //             const isCompleted = order.orderStatus === "Completed";

// //             return (
// //               <Col
// //                 key={`${orderIndex}-${itemIndex}`}
// //                 xs={12}
// //                 md={6}
// //                 lg={3}
// //                 className="mb-4"
// //               >
// //                 <Card
// //                   className="p-3"
// //                   style={{ opacity: isCompleted ? 0.5 : 1 }}
// //                 >
// //                   <Card.Img
// //                     variant="top"
// //                     src={
// //                       book.bookimage?.[0] || "https://via.placeholder.com/150"
// //                     }
// //                     alt={book.title}
// //                     style={{ objectFit: "cover", width: "100px" }}
// //                   />
// //                   <Card.Body>
// //                     <Card.Title>{book.title}</Card.Title>
// //                     <Card.Text>
// //                       <strong>Order Status:</strong> {order.orderStatus}
// //                     </Card.Text>
// //                     <Button
// //                       variant="primary"
// //                       disabled={isCompleted}
// //                       onClick={() =>
// //                         router.push(`/book/audio-books/${book.slug}`)
// //                       }
// //                     >
// //                       {isCompleted ? "Order Completed" : "View Book"}
// //                     </Button>
// //                   </Card.Body>
// //                 </Card>
// //               </Col>
// //             );
// //           })
// //         )}
// //       </Row>
// //     </Container>
// //   );
// // }
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Container, Button, Card, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { MyOrders } from "../../../../api/page";

// export default function BookMark() {
//   const [myorders, setMyorders] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();
//   const itemsPerPage = 4; // Show 4 items at a time

//   useEffect(() => {
//     const fetchdata = async () => {
//       const response = await MyOrders();
//       setMyorders(response.data.orders);
//     };
//     fetchdata();
//   }, []);

//   // Flatten the orders into a single array of books
//   const books = myorders.flatMap((order) =>
//     order.orderItems.map((item) => ({
//       ...item.book,
//       orderStatus: order.orderStatus,
//     }))
//   );

//   const totalSlides = Math.ceil(books.length / itemsPerPage); // Total number of slides

//   // Get current set of books to display
//   const visibleBooks = books.slice(currentIndex, currentIndex + itemsPerPage);

//   // Navigation handlers
//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev + itemsPerPage < books.length ? prev + itemsPerPage : 0
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev - itemsPerPage >= 0
//         ? prev - itemsPerPage
//         : books.length - itemsPerPage
//     );
//   };

//   return (
//     <Container className="text-center">
//       <h5 className="text-start">My Orders</h5>
//       {books.length > 0 && (
//         <Row className="justify-content-center align-items-center">
//           <Col xs="auto">
//             <Button onClick={handlePrev} variant="secondary">
//               ◀
//             </Button>
//           </Col>
//           <Col xs={10}>
//             <Row>
//               {visibleBooks.map((book, index) => (
//                 <Col key={index} xs={12} md={6} lg={3}>
//                   <Card
//                     className="p-3"
//                     style={{
//                       opacity: book.orderStatus === "Completed" ? 0.5 : 1,
//                     }}
//                   >
//                     <Card.Img
//                       variant="top"
//                       src={
//                         book.bookimage?.[0] || "https://via.placeholder.com/150"
//                       }
//                       alt={book.title}
//                       style={{ objectFit: "cover", width: "80px" }}
//                     />
//                     <Card.Body>
//                       <Card.Title style={{ fontSize: "12px" }}>
//                         {book.title}
//                       </Card.Title>
//                       <Card.Text style={{ fontSize: "12px" }}>
//                         <strong>Order Status:</strong> {book.orderStatus}
//                       </Card.Text>
//                       <Button
//                         style={{ fontSize: "12px" }}
//                         variant="primary"
//                         disabled={book.orderStatus === "Completed"}
//                         onClick={() =>
//                           router.push(`/book/audio-books/${book.slug}`)
//                         }
//                       >
//                         {book.orderStatus === "Completed"
//                           ? "Order Completed"
//                           : "View Book"}
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//           <Col xs="auto">
//             <Button onClick={handleNext} variant="secondary">
//               ▶
//             </Button>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyOrders } from "../../../../api/page";
import "../../../styles/orders.css"; // Import CSS
import ReviewModal from "../(bookviewpage)/reviewmodal";
import { Button } from "primereact/button";
import "../(bookviewpage)/[slug]/booksingle.css";

export default function BookMark() {
  const [myorders, setMyorders] = useState([]);
  const [show, setShow] = useState(false);
  const [slug, setSlugname] = useState(null);
  console.log(slug);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await MyOrders();
      setMyorders(response.data.orders);
    };
    fetchdata();
  }, []);

  return (
    <Container>
      <h5 className="text-start mb-3">My Orders</h5>
      {myorders?.map((order, orderIndex) =>
        order.orderItems.map((item, itemIndex) => {
          const book = item.book;
          const isCompleted = order.orderStatus === "Completed";

          return (
            <Card
              key={`${orderIndex}-${itemIndex}`}
              className={`order-card mb-3 ${isCompleted ? "disabled" : ""}`}
            >
              <Row className="align-items-center">
                {/* Product Image */}
                <Col xs={2} className="text-center">
                  <img
                    src={
                      book.bookimage?.[0] || "https://via.placeholder.com/100"
                    }
                    alt={book.title}
                    className="product-image"
                  />
                </Col>

                {/* Product Details */}
                <Col xs={2}>
                  <h6 className="mb-1">{book.title}</h6>
                  {/* <p className="text-muted mb-1">Color: Black | Size: Free</p> */}
                  <p className="fw-bold mb-0">₹{book.price || "N/A"}</p>
                </Col>

                {/* Order Status & Review */}
                <Col xs={8} className="text-end">
                  <p
                    className={`mb-1 ${
                      isCompleted ? "text-success" : "text-warning"
                    }`}
                  >
                    ●{" "}
                    {isCompleted ? "Delivered on May 25, 2023" : "In Progress"}
                  </p>
                  <p className="text-muted small">
                    Your item has been {isCompleted ? "delivered" : "shipped"}.
                  </p>
                  {/* <Button
                    variant="link"
                    className={`review-button ${isCompleted ? "disabled" : ""}`}
                    onClick={() => {
                      if (!isCompleted) {
                        alert("Rate & Review functionality coming soon!");
                      }
                    }}
                  >
                    
                  </Button> */}
                  <Button
                    className=""
                    icon="pi pi-comments"
                    label="Review"
                    onClick={() => {
                      setShow(true), setSlugname(book.slug);
                    }}
                    severity="success"
                    outlined
                  ></Button>
                </Col>
              </Row>
            </Card>
          );
        })
      )}
      {show && (
        <ReviewModal
          slug={slug}
          closeModal={() => setShow(false)}
          show={show}
        />
      )}
    </Container>
  );
}
