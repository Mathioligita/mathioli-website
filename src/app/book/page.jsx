// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useParams, useRouter } from "next/navigation";
// import { BookAPI, CategoryAPI } from "../../../api/page";
// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { Paginator } from "primereact/paginator";
// import userContext from "../UseContext/UseContext";
// import SkeletonPreloader from "../../../components/SkeletonPreloader";
// import "../book/topselling/BookCard.css";
// import Head from "next/head";

// export default function Page() {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [globalFilterValue, setGlobalFilterValue] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedAuthors, setSelectedAuthors] = useState([]);
//   const [selectedFormats, setSelectedFormats] = useState([]);
//   const [booksData, setBooksData] = useState([]);
//   const { name } = useParams();
//   const { categoriesdata, setCategoriesdata } = useContext(userContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await CategoryAPI();
//         const data = response?.data?.categories;
//         setCategoriesdata(data);
//         setCategoriesData(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     if (name && name !== "all") {
//       const category = categoriesdata?.find(
//         (cat) => cat.name.toLowerCase() === name.toLowerCase()
//       );
//       setSelectedCategory(category);
//     } else {
//       setSelectedCategory(null);
//     }
//     setLoading(false);
//   }, [name, categoriesdata]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await BookAPI();
//         const data = response?.data?.books;
//         const sortedBooks = data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setBooksData(sortedBooks);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [name]);

//   const handleBookClick = (book) => {
//     router.push(`/book/${book.slug}`);
//   };

//   const filteredBooks = booksData?.filter((book) => {
//     const categoryMatch =
//       !selectedCategory ||
//       book?.category?.toLowerCase() === selectedCategory?.name?.toLowerCase();
//     const genreMatch =
//       !selectedGenres?.length || selectedGenres?.includes(book?.genre);
//     const languageMatch =
//       !selectedLanguages?.length || selectedLanguages?.includes(book?.language);
//     const authorMatch =
//       !selectedAuthors?.length || selectedAuthors?.includes(book?.author);
//     const formatMatch =
//       !selectedFormats?.length ||
//       (selectedFormats?.includes("EBook") && book?.isEBookAvailable) ||
//       (selectedFormats?.includes("Audiobook") && book?.isAudiobookAvailable) ||
//       (selectedFormats?.includes("Hard Copy") && book?.isHardCopyAvailable);
//     const globalMatch =
//       book?.title?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       book?.author?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       // book?.genre?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       book?.language?.toLowerCase().includes(globalFilterValue?.toLowerCase());

//     return (
//       categoryMatch &&
//       genreMatch &&
//       languageMatch &&
//       authorMatch &&
//       formatMatch &&
//       globalMatch
//     );
//   });

//   const paginatedBooks = filteredBooks?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);

//   const genres = [...new Set(booksData?.map((book) => book?.genre))];
//   const languages = [...new Set(booksData?.map((book) => book?.language))];
//   const authors = [...new Set(booksData?.map((book) => book?.author))];
//   const formats = ["EBook", "Audiobook", "Hard Copy"];

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     setGlobalFilterValue(value);
//     setCurrentPage(1); // Reset to the first page when filter changes
//   };

//   const onPageChange = (event) => {
//     setCurrentPage(event.page + 1);
//   };

//   const renderHeader = () => {
//     return (
//       <div className="table-header">
//         <div className="">
//           <IconField iconPosition="left">
//             <InputIcon className="pi pi-search"> </InputIcon>
//             <InputText
//               type="search"
//               value={globalFilterValue ?? ""}
//               onChange={(e) => onGlobalFilterChange(e)}
//               placeholder="Global Search"
//             />
//           </IconField>
//         </div>
//       </div>
//     );
//   };

//   const header = renderHeader();

//   return (
//     <>
//       <Head>
//         <title>best book shop in chennai</title>
//         <meta
//           name="description"
//           content="Discover a vast collection of Tamil books online! Shop for novels, classics, spiritual books, and more. Buy now for doorstep delivery."
//         />
//         <meta
//           name="keywords"
//           content="best book shop in chennai,tamilbooks, tamil bookstore, tamil story books, tamil novels and stories, best tamil novels, best tamil books to read, tamil books to read, best books to read in tamil, Online tamil books shopping, Tamil books online, Tamil Online Book Shop, Tamil books online shopping with discount, buy Tamil books online with discount"
//         />
//       </Head>
//       <div className="sm-ss-container">
//         {loading ? (
//           <section className="">
//             <div className="container ">
//               <div className="mt-5">
//                 <div className="mb-4">
//                   <div className="main-content mb-4">
//                     <div className="book-sdbjd">
//                       <Row>
//                         <Col
//                           md={4}
//                           lg={2}
//                           sm={6}
//                           className="p-1 p-md-0 book-mobile-card image-card-book"
//                         >
//                           <SkeletonPreloader />
//                         </Col>
//                         <Col
//                           md={4}
//                           lg={2}
//                           sm={6}
//                           className="p-1 p-md-0 book-mobile-card image-card-book"
//                         >
//                           <SkeletonPreloader />
//                         </Col>
//                         <Col
//                           md={4}
//                           lg={2}
//                           sm={6}
//                           className="p-1 p-md-0 book-mobile-card image-card-book"
//                         >
//                           <SkeletonPreloader />
//                         </Col>
//                       </Row>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         ) : (
//           <div className="container ">
//             <div className="mt-5">
//               <div className="mb-4">
//                 <div className="main-content mb-4">
//                   {header}
//                   <div className="book-sdbjd">
//                     <Row>
//                       {filteredBooks?.length > 0 ? (
//                         paginatedBooks?.map((book) => (
//                           <Col
//                             md={4}
//                             lg={2}
//                             sm={6}
//                             xs={6}
//                             key={book._id}
//                             className="p-1 p-md-0 book-mobile-card image-card-book"
//                           >
//                             <div
//                               className="book-card"
//                               onClick={() => handleBookClick(book)}
//                             >
//                               <div className="book-images card text-center">
//                                 <img
//                                   src={
//                                     book.bookimage && book.bookimage.length > 0
//                                       ? book.bookimage[0]
//                                       : "/image/image 9.png"
//                                   }
//                                   alt={book.title}
//                                 />
//                               </div>
//                               <div className="book-info mt-2">
//                                 <div className="d-flex justify-content-between align-items-center mt-4 book-value-gamda  ">
//                                   {/* <h5 className="mb-0">{book.title.split(" ")[0] + "..."}</h5>
//                                    */}
//                                   <div className="d-flex ">
//                                     <h5
//                                       className="mb-2 hoverbooks-title-2"
//                                       style={{
//                                         fontFamily: "Inter",
//                                         fontSize: "15px",
//                                         fontWeight: "700",
//                                         color: "#4D4D4D",
//                                       }}
//                                     >
//                                       {book.title.split(" ")[0] + "..."}
//                                     </h5>
//                                     <h5
//                                       className="mb-2 hoverbooks-title"
//                                       style={{
//                                         fontFamily: "Inter",
//                                         fontSize: "15px",
//                                         fontWeight: "700",
//                                         color: "white",
//                                         position: "absolute",
//                                         top: "0",
//                                         maxWidth: "900px",
//                                       }}
//                                     >
//                                       {book.title
//                                         .split(" ")
//                                         .map((word, index) => (
//                                           <span key={index}>
//                                             {word} <br />
//                                           </span>
//                                         ))}
//                                     </h5>
//                                   </div>
//                                   <span
//                                     className="ms-auto"
//                                     style={{ fontSize: "10px" }}
//                                   >
//                                     {book.userReadingStatus.length > 0
//                                       ? (
//                                           book.userReadingStatus.reduce(
//                                             (sum, item) => sum + item.ratings,
//                                             0
//                                           ) / book.userReadingStatus.length
//                                         ).toFixed(1)
//                                       : 0}
//                                     /5
//                                   </span>
//                                 </div>
//                                 <div
//                                   className="ratings d-flex"
//                                   style={{
//                                     marginTop: "10px",
//                                     fontSize: "12px",
//                                   }}
//                                 >
//                                   <span>{book?.author}</span>
//                                   <span className="ms-auto rate-values">
//                                     {Array.from({ length: 5 }, (_, index) => {
//                                       const rating =
//                                         book.userReadingStatus?.length > 0
//                                           ? book.userReadingStatus[0].ratings
//                                           : 0;
//                                       return (
//                                         <i
//                                           key={index}
//                                           className={`pi ${
//                                             index < rating
//                                               ? "pi-star-fill"
//                                               : "pi-star"
//                                           }`}
//                                           style={{
//                                             color:
//                                               index < rating
//                                                 ? "#FFCB45"
//                                                 : "inherit",
//                                           }}
//                                         ></i>
//                                       );
//                                     })}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </Col>
//                         ))
//                       ) : (
//                         <div className="no-books-message">
//                           <p>Sorry, no books are available at the moment.</p>
//                           <p>
//                             Please check back later, as new books are added
//                             regularly.
//                           </p>
//                           <p>
//                             In the meantime, explore our other sections or let
//                             us know what you'd like to see!
//                           </p>
//                         </div>
//                       )}
//                     </Row>
//                     {totalPages > 1 && (
//                       <Paginator
//                         first={currentPage * itemsPerPage - 1}
//                         rows={itemsPerPage}
//                         totalRecords={filteredBooks.length}
//                         onPageChange={onPageChange}
//                         className="paginator-button"
//                       ></Paginator>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React from "react";
import Books from "./Books";
// import Head from "next/head";
export const metadata = {
  title: "Best book shop in Chennai",
  description:
    "Discover a vast collection of Tamil books online! Shop for novels, classics, spiritual books, and more. Buy now for doorstep delivery.",
  keywords:
    "best book shop in chennai, tamilbooks, tamil bookstore, tamil story books, tamil novels and stories, best tamil novels, best tamil books to read, tamil books to read, best books to read in tamil, online tamil books shopping, tamil books online, tamil online book shop, tamil books online shopping with discount, buy tamil books online with discount",
};
export default function Page() {
  return (
    <>
      {/* <Head>
        <title>Best book shop in chennai</title>
        <meta
          name="description"
          content="Discover a vast collection of Tamil books online! Shop for novels, classics, spiritual books, and more. Buy now for doorstep delivery."
        />
        <meta
          name="keywords"
          content="best book shop in chennai,tamilbooks, tamil bookstore, tamil story books, tamil novels and stories, best tamil novels, best tamil books to read, tamil books to read, best books to read in tamil, Online tamil books shopping, Tamil books online, Tamil Online Book Shop, Tamil books online shopping with discount, buy Tamil books online with discount"
        />
      </Head> */}
      <Books />
    </>
  );
}
