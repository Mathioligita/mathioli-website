// import { useRouter } from "next/navigation";
// import React from "react";
// import { Col } from "react-bootstrap";

// // A helper component to display individual book details
// const BookCard = ({ book }) => {
//   // const [showDetails, setShowDetails] = useState(false); // For toggling book details
//   const router = useRouter(); // Initialize the useRouter hook

//   // Handle clicking on a book to navigate to the book detail page
//   const handleBookClick = () => {
//     router.push(`/book/${book.slug}`);
//   };
//   const ratings = book?.userReadingStatus?.map((item) => item?.ratings) || [5];

//   // Get the first rating (assuming you want to display only one rating)
//   const rating = ratings[0];
//   return (
//     <Col xs={12} sm={12} md={4} lg={3} className="mb-4">
//       <div
//         className="book-card"
//         onClick={handleBookClick}
//         style={{
//           cursor: "pointer",
//           justifyContent: "space-between",
//           padding: "15px",
//           marginBottom: "20px",

//           borderRadius: "10px",
//           // backgroundColor: "#fff",
//           // height: "350px", // Fixed height for the card
//           // display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <div
//           className="book-image text-center"
//           style={{
//             flex: "1 0 auto",
//             background:"#ffff",
//             // boxShadow:
//             //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
//             boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//             borderRadius: "6px",
//             padding:"15px",
//               height:"220px",
//               display:"flex",
//               justifyContent:"center"
//           }}
//         >
//           {/* Render book image if available, otherwise a placeholder */}
//           <img
//             src={
//               book.bookimage && book.bookimage.length > 0
//                 ? book.bookimage[0]
//                 : "https://via.placeholder.com/150"
//             }
//             alt={book.title}
//             style={{ width: "100%", padding:"10px" }}
//           />
//         </div>
//         <div className="book-info mt-3" style={{ flex: "1 0 auto" }}>
//           <div className="d-flex justify-content-between align-items-center">
//             <h5 className="mb-0" style={{fontFamily:"Inter",fontSize:"15px", fontWeight: "700", color: "#4D4D4D"}}>{book.title}</h5>
//             <span className="ms-auto" style={{ fontSize: "12px" ,padding:"5px", fontFamily:"Inter"}}>
//               {book.userReadingStatus.length > 0
//                 ? (
//                     book.userReadingStatus.reduce(
//                       (sum, item) => sum + item.ratings,
//                       0
//                     ) / book.userReadingStatus.length
//                   ).toFixed(1)
//                 : 0}
//               /5
//             </span>
//           </div>
//           <div className="ratings d-flex align-items-center ">
//             <span style={{ fontSize: "12px" }}>{book.author}</span>
//             <span className="ms-auto" style={{ fontSize: "2px" }}>
//               {/* {book?.userReadingStatus.map((item)=>(item?.ratings)) || 5} */}

//               {Array.from({ length: 5 }, (_, index) => (
//                 <i
//                   key={index}
//                   className={`pi ${
//                     index < rating ? "pi-star-fill" : "pi-star"
//                   }`}
//                   style={{ color: index < rating ? "#FFCB45" : "inherit",fontSize:"12px",margin:"1px" }}
//                 ></i>
//               ))}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default BookCard;

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
<<<<<<< HEAD
      sm={12}
      md={4}
=======
      xs={12}
      sm={4}
      md={3}
>>>>>>> master
      lg={2}
      className="p-1 p-md-0 book-mobile-card image-card-book"
    >
      <div className="book-card" onClick={handleBookClick}>
        <div className="book-images card text-center ">
          <img
            src={
              book.bookimage && book.bookimage.length > 0
                ? book.bookimage[0]
                : "https://via.placeholder.com/150"
            }
            alt={book.title}
            width={"100%"}
          />
        </div>
        <div className="book-info mt-2">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5 className="mb-0">{book.title}</h5>
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
