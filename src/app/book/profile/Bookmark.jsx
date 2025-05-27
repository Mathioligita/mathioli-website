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
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { MyOrders } from "../../../../api/page";
// import "../../../styles/orders.css"; // Import CSS
// import ReviewModal from "../(bookviewpage)/reviewmodal";
// import { Button } from "primereact/button";
// import "../(bookviewpage)/[slug]/booksingle.css";

// export default function BookMark() {
//   const [myorders, setMyorders] = useState([]);
//   const [show, setShow] = useState(false);
//   const [slug, setSlugname] = useState(null);
//   // console.log(slug);

//   useEffect(() => {
//     const fetchdata = async () => {
//       const response = await MyOrders();
//       setMyorders(response.data.orders);
//     };
//     fetchdata();
//   }, []);
//   console.log(myorders, "myorders");

//   return (
//     <Container>
//       <h5 className="text-start mb-3">My Orders</h5>
//       {myorders?.map((order, orderIndex) =>
//         order.orderItems.map((item, itemIndex) => {
//           const book = item.book;
//           const isCompleted = order.orderStatus === "Completed";

//           return (
//             <Card
//               key={`${orderIndex}-${itemIndex}`}
//               className={`order-card mb-3 ${isCompleted ? "disabled" : ""}`}
//             >
//               <Row className="" style={{ textAlign: "center" }}>
//                 {/* Product Image */}
//                 <Col xs={2}>
//                   <img
//                     src={
//                       book.bookimage?.[0] || "https://via.placeholder.com/100"
//                     }
//                     alt={book.title}
//                     className="product-image"
//                   />
//                 </Col>

//                 {/* Product Details */}
//                 <Col xs={5} className="m-auto my-order-vakjs">
//                   <div
//                     className="d-flex font-size-myordxer"
//                     style={{ justifyContent: "space-between" }}
//                   >
//                     <h6 className="mb-1">{book.title}</h6>
//                     {/* <p className="text-muted mb-1">Color: Black | Size: Free</p> */}
//                     <span className="fw-bold mb-0">₹{book.price || "N/A"}</span>
//                   </div>
//                 </Col>

//                 {/* Order Status & Review */}
//                 <Col xs={5} className="text-end myorrder-title">
//                   <p
//                     className={`mb-1 ${
//                       isCompleted ? "text-success" : "text-warning"
//                     }`}
//                   >
//                     ●{" "}
//                     {/* {isCompleted ? "Delivered on May 25, 2023" : "In Progress"} */}
//                     {order.paymentStatus}
//                   </p>
//                   <p className="text-muted small">
//                     {/* Your item has been {isCompleted ? "delivered" : "shipped"}. */}
//                   </p>
//                   {/* <Button
//                     variant="link"
//                     className={`review-button ${isCompleted ? "disabled" : ""}`}
//                     onClick={() => {
//                       if (!isCompleted) {
//                         alert("Rate & Review functionality coming soon!");
//                       }
//                     }}
//                   >

//                   </Button> */}
//                   <Button
//                     className=""
//                     icon="pi pi-comments"
//                     label="Review"
//                     onClick={() => {
//                       setShow(true), setSlugname(book.slug);
//                     }}
//                     severity="success"
//                     outlined
//                   ></Button>
//                 </Col>
//               </Row>
//             </Card>
//           );
//         })
//       )}
// {show && (
//   <ReviewModal
//     slug={slug}
//     closeModal={() => setShow(false)}
//     show={show}
//   />
// )}
//     </Container>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyOrders } from "../../../../api/page";
import "../../../styles/orders.css";
import ReviewModal from "../(bookviewpage)/reviewmodal";
import { Button } from "primereact/button";
import "../(bookviewpage)/[slug]/booksingle.css";

export default function BookMark() {
  const [myorders, setMyorders] = useState([]);
  const [show, setShow] = useState(false);
  const [slug, setSlugname] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await MyOrders();
        setMyorders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchdata();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "text-success";
      case "Cancel":
        return "text-danger";
      case "Payment Pending":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="my-orders-container">
      <h5 className="text-start mb-4">My Orders</h5>

      {myorders.length === 0 ? (
        <div className="text-center py-5">
          <p>You haven't placed any orders yet.</p>
          <Button
            label="Browse Books"
            onClick={() => router.push("/books")}
            severity="info"
          />
        </div>
      ) : (
        myorders.map((order, orderIndex) => (
          <Card key={order._id} className=" mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold">Order #{orderIndex + 1}</span>
                <span className="ms-3 text-muted">
                  Placed on {formatDate(order.createdAt)}
                </span>
              </div>
              <div
                className={`status-badge ${getStatusColor(order.orderStatus)}`}
              >
                {order.orderStatus}
              </div>
            </Card.Header>

            {order.orderItems.map((item, itemIndex) => {
              const book = item.book;
              const canReview = ["Delivered", "Completed"].includes(
                order.orderStatus
              );

              return (
                <Card.Body key={`${order._id}-${itemIndex}`}>
                  <Row className="align-items-center">
                    {/* Product Image */}
                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src={
                              book.bookimage?.[0] || "/images/default-book.png"
                            }
                            alt={book.title}
                            className="product-image img-fluid"
                            onClick={() => router.push(`/books/${book.slug}`)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <h6 className="product-title">{book.title}</h6>
                          <p className="text-muted mb-2">
                            Quantity: {item.quantity}
                          </p>
                          <p className="fw-bold mb-0">₹{book.price || "N/A"}</p>
                        </div>
                      </div>
                    </Col>

                    {/* Product Details */}
                    {/* <Col xs={12} md={5} className="product-details"></Col> */}

                    {/* Order Status & Actions */}
                    <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
                      <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-md-center">
                        <div className="me-md-3 mb-2 mb-md-0 align-items-center my-auto">
                          <p
                            className={`status-indicator ${getStatusColor(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </p>
                          {order.orderStatus === "Delivered" && (
                            <small className="text-muted">
                              Delivered on {formatDate(order.updatedAt)}
                            </small>
                          )}
                        </div>
                        <div>
                          <Button
                            icon="pi pi-comments"
                            label="Write Review"
                            onClick={() => {
                              setShow(true);
                              setSlugname(book.slug);
                            }}
                            severity="success"
                            outlined
                            disabled={!canReview}
                            className="review-button"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              );
            })}
          </Card>
        ))
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
