// import React, { useState } from "react";

// // A helper component to display individual book details
// const BookCard = ({ book, onClick }) => {
//   console.log(book,"book")
//   const [showDetails, setShowDetails] = useState(false); // For toggling book details

//   // Handle clicking on a book to show more info
//   const handleBookClick = () => {
//     setShowDetails(!showDetails);
//     if (onClick) onClick(book);
//   };

//   return (
//     <div
//       className="book-card"
//       style={{
//         border: "1px solid #ccc",
//         padding: "15px",
//         borderRadius: "10px",
//         marginBottom: "20px",
//         cursor: "pointer",
//         maxWidth: "200px",
//       }}
//       onClick={handleBookClick}
//     >
//       <div className="book-image">
//         {/* Render book image if available, otherwise a placeholder */}
//         <img
//           src={book.bookimage && book.bookimage.length > 0 ? book.bookimage[0] : "https://via.placeholder.com/150"}
//           alt={book.title}
//           style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//         />
//       </div>
//       <div className="book-info" style={{ marginTop: "10px" }}>
//         <h5>{book.title}</h5>
//         <p><strong>Price:</strong> ₹{book.price}</p>
//         <p><strong>Category:</strong> {book.category}</p>
//         <p><strong>Language:</strong> {book.language}</p>
//         <div className="ratings" style={{ marginTop: "10px" }}>
//           <span>{'⭐'.repeat(5)}</span>
//         </div>
//       </div>
//       {showDetails && (
//         <div className="book-details" style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
//           <h6>About the Author:</h6>
//           <p>{book.authorBiography}</p>
//           <h6>Description:</h6>
//           <p>{book.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Books View component
// export default function Booksview({ book }) {
//   console.log(book, "book data"); // Log the book data for debugging
// const bookdata = book?.books || [];
//   // Check if book is an array
//   if (!Array.isArray(book)) {
//     return <p>No books available or invalid data structure.</p>;
//   }

//   return (
//     <div className="books-view" style={{ display: "flex", flexWrap: "wrap" }}>
//       {bookdata.map((bookItem) => (
//         <BookCard key={bookItem._id} book={bookItem} />
//       ))}
//     </div>
//   );
// }

// import React from "react";
// import BookCard from "./BookCard"; // Import the BookCard component
// import { Row } from "react-bootstrap";
// import "./bookview.css";
// import SkeletonPreloader from "../../../../components/SkeletonPreloader";

// // Main Books View component
// export default function Booksview({ book }) {
//   const bookdata = book?.books || [];
//   const location =
//     typeof window !== "undefined" ? window.location.pathname : null;
//   console.log(location, "/book/topselling");

//   // Check if bookdata is an array
//   if (!Array.isArray(bookdata)) {
//     return <p>No books available or invalid data structure.</p>;
//   }
//   if (!bookdata) {
//     return <p>no data</p>;
//   }
//   return (
//     <div className="books-view ">
//       <Row className="books-view-ed mb-2">
//         {bookdata.length > 0 ? (
//           <>
//             {location === "/book/topselling"
//               ? bookdata.map((bookItem) => (
//                   <BookCard key={bookItem._id} book={bookItem} />
//                 ))
//               : bookdata
//                   .slice(0, 6)
//                   .map((bookItem) => (
//                     <BookCard key={bookItem._id} book={bookItem} />
//                   ))}
//           </>
//         ) : (
//           <section className="container d-flex">
//             <SkeletonPreloader />
//             <SkeletonPreloader />
//           </section>
//         )}
//       </Row>
//     </div>
//   );
// }
import React from "react";
import BookCard from "./BookCard"; // Import the BookCard component
import { Row } from "react-bootstrap";
import "./bookview.css";
import SkeletonPreloader from "../../../../components/SkeletonPreloader";

// Main Books View component
export default function Booksview({ book }) {
  const bookdata = book?.books || [];
  const location =
    typeof window !== "undefined" ? window.location.pathname : null;
  // console.log(location, "/book/topselling");

  // Check if bookdata is an array
  if (!Array.isArray(bookdata)) {
    return <p>No books available or invalid data structure.</p>;
  }
  if (!bookdata) {
    return <p>no data</p>;
  }

  // Sort books by createdAt (most recent first)
  const sortedBooks = bookdata.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="books-view">
      <Row className="books-view-ed mb-2">
        {sortedBooks.length > 0 ? (
          <>
            {location === "/book/topselling"
              ? sortedBooks.map((bookItem) => (
                  <BookCard key={bookItem._id} book={bookItem} />
                ))
              : sortedBooks
                  .slice(0, 6)
                  .map((bookItem) => (
                    <BookCard key={bookItem._id} book={bookItem} />
                  ))}
          </>
        ) : (
          <section className="container d-flex">
            <SkeletonPreloader />
            <SkeletonPreloader />
          </section>
        )}
      </Row>
    </div>
  );
}
