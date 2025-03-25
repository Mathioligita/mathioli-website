// // ===============================================================================================================================================
// // ===============================================================================================================================================
// // ===============================================================================================================================================
// // ===============================================================================================================================================
// // ===============================================================================================================================================
// // ===============================================================================================================================================

// "use client";

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { BookAPI, CategoryAPI } from "../../../../api/page";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { Paginator } from "primereact/paginator";
// // import "../topselling/[name]/styles.css";
// import "./top-selling.scss";
// import { Button } from "primereact/button";
// // import Overlayaudio from "./overlayaudio";
// import userContext from "../../UseContext/UseContext";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import Swal from "sweetalert2";

// import "../../../app/book/topselling/BookCard.css";
// import Overlayaudio from "../audio-books/overlayaudio";
// import SkeletonPreloader from "../../../../components/SkeletonPreloader";

// const retryFetch = async (fn, retries = 3, delay = 1000) => {
//   try {
//     return await fn();
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       console.warn(`Rate limited. Retrying in ${delay / 1000} seconds...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return retryFetch(fn, retries - 1, delay * 2);
//     }
//     throw error;
//   }
// };

// export default function TopsellingAudioBooks() {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const { categoriesdata, setCategoriesdata } = useContext(userContext);
//   const [globalFilterValue, setGlobalFilterValue] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedAuthors, setSelectedAuthors] = useState([]);
//   const [selectedFormats, setSelectedFormats] = useState([]);
//   const [booksData, setBooksData] = useState([]);
//   const [showaudioBooking, setShowaudioBooking] = useState(false);
//   const [audioBookingdetails, setAudioBokkingDetails] = useState(null);
//   const [showAudiobooksFirst, setShowAudiobooksFirst] = useState(true);
//   const router = useRouter();
//   const [audiocount, setAudiocount] = useState(30);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const audioRef = useRef(null);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await retryFetch(CategoryAPI);
//         const data = response?.data?.categories;

//         console.log("Fetched categories data:", data);
//         setCategoriesdata(data || null);
//         setCategoriesData(data || null);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await retryFetch(BookAPI);
//       const data = response?.data?.books;
//       setBooksData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     const interval = setInterval(() => {
//       setAudiocount((prevCount) => (prevCount <= 0 ? 30 : prevCount - 1));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (audiocount === 0 && audioRef.current) {
//       audioRef.current.currentTime = 0;
//       setShowPopup(false);
//       Swal.fire({
//         title: "Continue Listening",
//         text: "Your 30-second preview has ended. Unlock the full audiobook and continue listening without interruption.",
//         imageUrl: `${selectedBook?.bookimage[0]}`,
//         imageAlt: "Custom image",
//         showCancelButton: true,
//         confirmButtonText: "Buy",
//         cancelButtonText: "Cancel",
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         customClass: {
//           popup: "custom-popup",
//           confirmButton: "custom-confirm-button",
//           cancelButton: "custom-cancel-button",
//         },
//         didOpen: () => {
//           const popup = document.querySelector(".custom-popup");
//           const confirmButton = document.querySelector(
//             ".custom-confirm-button"
//           );
//           const cancelButton = document.querySelector(".custom-cancel-button");
//           const image = popup.querySelector(".swal2-image");

//           if (image) {
//             image.style.backgroundColor = "#1D5755";
//             image.style.height = "183px";
//           }
//           confirmButton.style.backgroundColor = "#1D5755";
//           cancelButton.style.backgroundColor = "#1D5755";
//         },
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handlepayoverflow(selectedBook, "audioBook");
//         }
//       });
//     }
//   }, [audiocount]);

//   const handleBookClick = (book) => {
//     router.push(`/book/${book.slug}`);
//   };

//   const filteredBooks = booksData
//     ?.sort((a, b) => {
//       if (showAudiobooksFirst) {
//         if (a.isAudiobookAvailable && !b.isAudiobookAvailable) {
//           return -1;
//         }
//         if (!a.isAudiobookAvailable && b.isAudiobookAvailable) {
//           return 1;
//         }
//       }
//       return 0;
//     })
//     .filter((book) => {
//       const categoryMatch =
//         !selectedCategory ||
//         (book.category &&
//           book.category.toLowerCase() ===
//             selectedCategory?.name?.toLowerCase());

//       const genreMatch =
//         !selectedGenres.length ||
//         (book.genre && selectedGenres.includes(book.genre));
//       const languageMatch =
//         !selectedLanguages.length ||
//         (book.language && selectedLanguages.includes(book.language));

//       const authorMatch =
//         !selectedAuthors.length ||
//         (book.author && selectedAuthors.includes(book.author));

//       const formatMatch =
//         !selectedFormats.length ||
//         (selectedFormats.includes("EBook") && book.isEBookAvailable) ||
//         (selectedFormats.includes("Hard Copy") && book.isHardCopyAvailable);

//       const globalMatch =
//         (book.title &&
//           book.title
//             .toLowerCase()
//             .includes(globalFilterValue?.toLowerCase() || "")) ||
//         (book.author &&
//           book.author
//             .toLowerCase()
//             .includes(globalFilterValue?.toLowerCase() || "")) ||
//         (book.genre &&
//           book.genre
//             .toLowerCase()
//             .includes(globalFilterValue?.toLowerCase() || "")) ||
//         (book.language &&
//           book.language
//             .toLowerCase()
//             .includes(globalFilterValue?.toLowerCase() || ""));

//       if (!showAudiobooksFirst && book.isAudiobookAvailable) {
//         return false;
//       }

//       if ("/audio-books" === "audio-books" && !book.isAudiobookAvailable) {
//         return false;
//       }

//       return (
//         categoryMatch &&
//         genreMatch &&
//         languageMatch &&
//         authorMatch &&
//         formatMatch &&
//         globalMatch
//       );
//     });

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

//   const groupedBooks = filteredBooks?.reduce((acc, book) => {
//     const category = book?.category;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category]?.push(book);
//     return acc;
//   }, {});

//   const handlePlayButtonClick = (book) => {
//     setSelectedBook(book);
//     setShowPopup(true);
//     setAudiocount(30); // Reset the audio count when a new book is selected
//   };

//   const handlepayoverflow = (book, bookType) => {
//     setShowaudioBooking(true);
//     setAudioBokkingDetails({ book, bookType });
//   };

//   const handleTimeUpdate = () => {
//     const audio = audioRef.current?.audio?.current;
//     if (audio && audio.currentTime >= 30) {
//       audio.currentTime = 30; // Lock at 30 sec
//       setIsDisabled(true);

//       // Close the popup
//       setShowPopup(false);

//       // Show SweetAlert with a "Pay" button
//       Swal.fire({
//         title: "Continue Listening",
//         text: "Your 30-second preview has ended. Unlock the full audiobook and continue listening without interruption.",
//         imageUrl: `${selectedBook?.bookimage[0]}`,
//         imageAlt: "Custom image",
//         showCancelButton: true,
//         confirmButtonText: "Buy",
//         cancelButtonText: "Cancel",
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         customClass: {
//           popup: "custom-popup",
//           confirmButton: "custom-confirm-button",
//           cancelButton: "custom-cancel-button",
//         },
//         didOpen: () => {
//           const popup = document.querySelector(".custom-popup");
//           const confirmButton = document.querySelector(
//             ".custom-confirm-button"
//           );
//           const cancelButton = document.querySelector(".custom-cancel-button");
//           const image = popup.querySelector(".swal2-image");

//           if (image) {
//             image.style.backgroundColor = "#1D5755";
//             image.style.height = "183px";
//           }
//           confirmButton.style.backgroundColor = "#1D5755";
//           cancelButton.style.backgroundColor = "#1D5755";
//         },
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handlepayoverflow(selectedBook, "audioBook");
//         }
//       });
//     }
//   };

//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
//       <div className="mt-5">
//         <div className="mb-4">
//           <div className=" mb-4">
//             {/* {header} */}
//             <span className="Top-selling ">Top Selling AudioBooks</span>
//             <div className="book-sdbjd mt-4">
//               {loading ? (
//                 <Row>
//                   {[...Array(itemsPerPage)].map((_, index) => (
//                     <Col
//                       xs={12}
//                       sm={4}
//                       md={3}
//                       lg={2}
//                       key={index}
//                       className="p-1 p-md-0 book-mobile-card image-card-book"
//                     >
//                       <SkeletonPreloader />
//                     </Col>
//                   ))}
//                 </Row>
//               ) : filteredBooks?.length > 0 ? (
//                 <>
//                   {Object.keys(groupedBooks)?.map((category, index) => (
//                     <div key={index}>
//                       {/* <div className="d-flex mt-5">
//                         <h3>{category}</h3>
//                       </div> */}
//                       <Row className="gap-1">
//                         {groupedBooks[category]?.map((book) => (
//                           <>
//                             {book.isAudiobookAvailable && (
//                               <Col
//                                 md={4}
//                                 lg={2}
//                                 sm={6}
//                                 key={book._id}
//                                 className="p-1 p-md-0 book-mobile-card image-card-book"
//                               >
//                                 <div
//                                   className="book-card book-adio"
//                                   onClick={() => handleBookClick(book)}
//                                   style={{
//                                     cursor: "pointer",
//                                     justifyContent: "space-between",
//                                     padding: "0px 15px",
//                                     borderRadius: "6px",
//                                     flexDirection: "column",
//                                   }}
//                                 >
//                                   <div
//                                     className="book-images card text-center"
//                                     style={{
//                                       flex: "1 0 auto",
//                                       background: "#ffff",
//                                       boxShadow:
//                                         "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                                       borderRadius: "6px",
//                                       padding: "15px",
//                                       justifyContent: "center",
//                                       display: "flex",
//                                     }}
//                                   >
//                                     <img
//                                       src={
//                                         book.bookimage &&
//                                         book.bookimage.length > 0
//                                           ? book.bookimage[0]
//                                           : "/image/image 9.png"
//                                       }
//                                       alt={book.title}
//                                       width={"100%"}
//                                     />

//                                     {book.isAudiobookAvailable && (
//                                       <button
//                                         className="play-button"
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handlePlayButtonClick(book);
//                                         }}
//                                       >
//                                         ▶
//                                       </button>
//                                     )}
//                                   </div>
//                                   <div className="book-info mt-3 mb-">
//                                     {/* <div className="d-flex">
//                                       <h5
//                                         className="mb-0"
//                                         style={{
//                                           fontFamily: "Inter",
//                                           fontSize: "15px",
//                                           fontWeight: "700",
//                                           color: "#4D4D4D",
//                                         }}
//                                       >

//                                         {book.title.split(" ")[0] + "..."}
//                                       </h5>{" "}
//                                       <span
//                                         className="ms-auto"
//                                         style={{
//                                           fontSize: "12px",
//                                           justifyContent: "end",
//                                           textAlign: "end",
//                                         }}
//                                       >
//                                         {book.userReadingStatus.length > 0
//                                           ? (
//                                               book.userReadingStatus.reduce(
//                                                 (sum, item) =>
//                                                   sum + item.ratings,
//                                                 0
//                                               ) /
//                                               book?.userReadingStatus?.length
//                                             ).toFixed(1)
//                                           : 0}
//                                         /5
//                                       </span>
//                                     </div> */}
//                                     <div className="d-flex justify-content-between align-items-center mt-4 book-value-gamda  ">
//                                       {/* <h5 className="mb-0">{book.title.split(" ")[0] + "..."}</h5>
//                                        */}
//                                       <div className="d-flex ">
//                                         <h5
//                                           className="mb-2 hoverbooks-title-2"
//                                           style={{
//                                             fontFamily: "Inter",
//                                             fontSize: "15px",
//                                             fontWeight: "700",
//                                             color: "#4D4D4D",
//                                           }}
//                                         >
//                                           {book.title.split(" ")[0] + "..."}
//                                         </h5>
//                                         <h5
//                                           className="mb-2 hoverbooks-title"
//                                           style={{
//                                             fontFamily: "Inter",
//                                             fontSize: "15px",
//                                             fontWeight: "700",
//                                             color: "white",
//                                             position: "absolute",
//                                             top: "0",
//                                             maxWidth: "900px",
//                                           }}
//                                         >
//                                           {book.title
//                                             .split(" ")
//                                             .map((word, index) => (
//                                               <span key={index}>
//                                                 {word} <br />
//                                               </span>
//                                             ))}
//                                         </h5>
//                                       </div>
//                                       <span
//                                         className="ms-auto"
//                                         style={{ fontSize: "10px" }}
//                                       >
//                                         {book.userReadingStatus.length > 0
//                                           ? (
//                                               book.userReadingStatus.reduce(
//                                                 (sum, item) =>
//                                                   sum + item.ratings,
//                                                 0
//                                               ) / book.userReadingStatus.length
//                                             ).toFixed(1)
//                                           : 0}
//                                         /5
//                                       </span>
//                                     </div>
//                                     <div
//                                       className="ratings mt-1 mb-2 d-flex"
//                                       style={{
//                                         marginTop: "5px",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       <span>{book?.author}</span>
//                                       <span
//                                         className="ms-auto rate-values"
//                                         style={{ fontSize: "4px" }}
//                                       >
//                                         {Array.from(
//                                           { length: 5 },
//                                           (_, index) => {
//                                             const rating =
//                                               book.userReadingStatus?.length > 0
//                                                 ? book.userReadingStatus[0]
//                                                     .ratings
//                                                 : 0;
//                                             return (
//                                               <i
//                                                 key={index}
//                                                 className={`pi ${
//                                                   index < rating
//                                                     ? "pi-star-fill"
//                                                     : "pi-star"
//                                                 }`}
//                                                 style={{
//                                                   color:
//                                                     index < rating
//                                                       ? "#FFCB45"
//                                                       : "inherit",
//                                                   fontSize: "12px",
//                                                   margin: "1px",
//                                                 }}
//                                               ></i>
//                                             );
//                                           }
//                                         )}
//                                       </span>
//                                     </div>
//                                   </div>
//                                   {/* <div className="profile-contents-button">
//                                     <Button
//                                       className="profile-buttonssssss w-100"
//                                       onClick={() =>
//                                         handlepayoverflow(
//                                           book,
//                                           book.isAudiobookAvailable
//                                             ? "audioBook"
//                                             : "audioBook"
//                                         )
//                                       }
//                                     >
//                                       Buy Now
//                                     </Button>
//                                   </div> */}
//                                 </div>
//                               </Col>
//                             )}
//                           </>
//                         ))}
//                       </Row>
//                     </div>
//                   ))}
//                   {totalPages > 1 && (
//                     <Paginator
//                       first={currentPage}
//                       rows={itemsPerPage}
//                       totalRecords={filteredBooks.length}
//                       onPageChange={onPageChange}
//                     ></Paginator>
//                   )}
//                 </>
//               ) : (
//                 <div className="no-books-message">
//                   <p>Sorry, no books are available at the moment.</p>
//                   <p>
//                     Please check back later, as new books are added regularly.
//                   </p>
//                   <p>
//                     In the meantime, explore our other sections or let us know
//                     what you'd like to see!
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showaudioBooking && (
//         <Overlayaudio
//           audioBookingdetails={audioBookingdetails}
//           setShowaudioBooking={setShowaudioBooking}
//         />
//       )}

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <div className="d-flex">
//               <div className="p-2">
//                 <div className="d-flex">
//                   <div>
//                     <img
//                       src={selectedBook.bookimage[0]}
//                       alt=""
//                       style={{
//                         height: "100px",
//                         objectFit: "cover",
//                         borderRadius: "15px",
//                         padding: "2px",
//                       }}
//                     />
//                   </div>
//                   <div className="my-auto">
//                     <h4 className="m-2">{selectedBook.title}</h4>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   pointerEvents: isDisabled ? "none" : "auto",
//                   opacity: isDisabled ? 0.5 : 1,
//                 }}
//                 className="w-50 ms-auto mt-auto"
//               >
//                 <AudioPlayer
//                   ref={audioRef}
//                   autoPlay
//                   src={selectedBook.audiobookUpload[0]}
//                   onPlay={(e) => console.log("onPlay")}
//                   onListen={handleTimeUpdate} // Track time and disable after 30 sec
//                   controls
//                   className="w-100"
//                 />
//               </div>
//               <div onClick={() => setShowPopup(false)} className="my-auto">
//                 <i className="pi pi-times ms-4 fw-1"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BookAPI, CategoryAPI } from "../../../../api/page";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Paginator } from "primereact/paginator";
import "./top-selling.scss";
import { Button } from "primereact/button";
import userContext from "../../UseContext/UseContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Swal from "sweetalert2";
import "../../../app/book/topselling/BookCard.css";
import Overlayaudio from "../audio-books/overlayaudio";
import SkeletonPreloader from "../../../../components/SkeletonPreloader";

const retryFetch = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limited. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryFetch(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export default function TopsellingAudioBooks() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categoriesdata, setCategoriesdata } = useContext(userContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [showaudioBooking, setShowaudioBooking] = useState(false);
  const [audioBookingdetails, setAudioBokkingDetails] = useState(null);
  const [showAudiobooksFirst, setShowAudiobooksFirst] = useState(true);
  const router = useRouter();
  const [audiocount, setAudiocount] = useState(30);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const audioRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await retryFetch(CategoryAPI);
        const data = response?.data?.categories;
        setCategoriesdata(data || null);
        setCategoriesData(data || null);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await retryFetch(BookAPI);
      const data = response?.data?.books;
      setBooksData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setAudiocount((prevCount) => (prevCount <= 0 ? 30 : prevCount - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audiocount === 0 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setShowPopup(false);
      Swal.fire({
        title: "Continue Listening",
        text: "Your 30-second preview has ended. Unlock the full audiobook and continue listening without interruption.",
        imageUrl: `${selectedBook?.bookimage[0]}`,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: "Buy",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: "custom-popup",
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
        },
        didOpen: () => {
          const popup = document.querySelector(".custom-popup");
          const confirmButton = document.querySelector(
            ".custom-confirm-button"
          );
          const cancelButton = document.querySelector(".custom-cancel-button");
          const image = popup.querySelector(".swal2-image");

          if (image) {
            image.style.backgroundColor = "#1D5755";
            image.style.height = "183px";
          }
          confirmButton.style.backgroundColor = "#1D5755";
          cancelButton.style.backgroundColor = "#1D5755";
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handlepayoverflow(selectedBook, "audioBook");
        }
      });
    }
  }, [audiocount]);

  const handleBookClick = (book) => {
    router.push(`/book/${book.slug}`);
  };

  const filteredBooks = booksData
    ?.sort((a, b) => {
      if (showAudiobooksFirst) {
        if (a.isAudiobookAvailable && !b.isAudiobookAvailable) {
          return -1;
        }
        if (!a.isAudiobookAvailable && b.isAudiobookAvailable) {
          return 1;
        }
      }
      return 0;
    })
    .filter((book) => {
      const categoryMatch =
        !selectedCategory ||
        (book.category &&
          book.category.toLowerCase() ===
            selectedCategory?.name?.toLowerCase());

      const genreMatch =
        !selectedGenres.length ||
        (book.genre && selectedGenres.includes(book.genre));
      const languageMatch =
        !selectedLanguages.length ||
        (book.language && selectedLanguages.includes(book.language));

      const authorMatch =
        !selectedAuthors.length ||
        (book.author && selectedAuthors.includes(book.author));

      const formatMatch =
        !selectedFormats.length ||
        (selectedFormats.includes("EBook") && book.isEBookAvailable) ||
        (selectedFormats.includes("Hard Copy") && book.isHardCopyAvailable);

      if (!showAudiobooksFirst && book.isAudiobookAvailable) {
        return false;
      }

      if ("/audio-books" === "audio-books" && !book.isAudiobookAvailable) {
        return false;
      }

      return (
        categoryMatch &&
        genreMatch &&
        languageMatch &&
        authorMatch &&
        formatMatch
      );
    });

  const paginatedBooks = filteredBooks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);

  const genres = [...new Set(booksData?.map((book) => book?.genre))];
  const languages = [...new Set(booksData?.map((book) => book?.language))];
  const authors = [...new Set(booksData?.map((book) => book?.author))];
  const formats = ["EBook", "Audiobook", "Hard Copy"];

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  const groupedBooks = filteredBooks?.reduce((acc, book) => {
    const category = book?.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category]?.push(book);
    return acc;
  }, {});

  const handlePlayButtonClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    setAudiocount(30); // Reset the audio count when a new book is selected
  };

  const handlepayoverflow = (book, bookType) => {
    setShowaudioBooking(true);
    setAudioBokkingDetails({ book, bookType });
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current?.audio?.current;
    if (audio && audio.currentTime >= 30) {
      audio.currentTime = 30; // Lock at 30 sec
      setIsDisabled(true);

      // Close the popup and show SweetAlert
      setShowPopup(false);
      Swal.fire({
        title: "Continue Listening",
        text: "Your 30-second preview has ended. Unlock the full audiobook and continue listening without interruption.",
        imageUrl: `${selectedBook?.bookimage[0]}`,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: "Buy",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: "custom-popup",
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
        },
        didOpen: () => {
          const popup = document.querySelector(".custom-popup");
          const confirmButton = document.querySelector(
            ".custom-confirm-button"
          );
          const cancelButton = document.querySelector(".custom-cancel-button");
          const image = popup.querySelector(".swal2-image");

          if (image) {
            image.style.backgroundColor = "#1D5755";
            image.style.height = "183px";
          }
          confirmButton.style.backgroundColor = "#1D5755";
          cancelButton.style.backgroundColor = "#1D5755";
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handlepayoverflow(selectedBook, "audioBook");
        }
      });
    }
  };

  return (
    <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
      <div className="mt-5">
        <div className="mb-4">
          <div className=" mb-4">
            <span className="Top-selling ">Top Selling AudioBooks</span>
            <div className="book-sdbjd mt-4">
              {loading ? (
                <Row>
                  {[...Array(itemsPerPage)].map((_, index) => (
                    <Col
                      xs={12}
                      sm={4}
                      md={3}
                      lg={2}
                      key={index}
                      className="p-1 p-md-0 book-mobile-card image-card-book"
                    >
                      <SkeletonPreloader />
                    </Col>
                  ))}
                </Row>
              ) : filteredBooks?.length > 0 ? (
                <>
                  {Object.keys(groupedBooks)?.map((category, index) => (
                    <div key={index}>
                      <Row className="gap-1">
                        {groupedBooks[category]?.map(
                          (book) =>
                            book.isAudiobookAvailable && (
                              <Col
                                md={4}
                                lg={2}
                                sm={6}
                                key={book._id}
                                className="p-1 p-md-0 book-mobile-card image-card-book"
                              >
                                <div
                                  className="book-card book-adio"
                                  onClick={() => handleBookClick(book)}
                                  style={{
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                    padding: "0px 15px",
                                    borderRadius: "6px",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div
                                    className="book-images card text-center"
                                    style={{
                                      flex: "1 0 auto",
                                      background: "#ffff",
                                      boxShadow:
                                        "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                      borderRadius: "6px",
                                      padding: "15px",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <img
                                      src={
                                        book.bookimage &&
                                        book.bookimage.length > 0
                                          ? book.bookimage[0]
                                          : "/image/image 9.png"
                                      }
                                      alt={book.title}
                                      width={"100%"}
                                    />

                                    {book.isAudiobookAvailable && (
                                      <button
                                        className="play-button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePlayButtonClick(book);
                                        }}
                                      >
                                        ▶
                                      </button>
                                    )}
                                  </div>
                                  <div className="book-info mt-3 mb-">
                                    <div className="d-flex justify-content-between align-items-center mt-4 book-value-gamda">
                                      <div className="d-flex">
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
                                          {book.title
                                            .split(" ")
                                            .map((word, index) => (
                                              <span key={index}>
                                                {word} <br />
                                              </span>
                                            ))}
                                        </h5>
                                      </div>
                                      <span
                                        className="ms-auto"
                                        style={{ fontSize: "10px" }}
                                      >
                                        {book.userReadingStatus.length > 0
                                          ? (
                                              book.userReadingStatus.reduce(
                                                (sum, item) =>
                                                  sum + item.ratings,
                                                0
                                              ) / book.userReadingStatus.length
                                            ).toFixed(1)
                                          : 0}
                                        /5
                                      </span>
                                    </div>
                                    <div
                                      className="ratings mt-1 mb-2 d-flex"
                                      style={{
                                        marginTop: "5px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      <span>{book?.author}</span>
                                      <span
                                        className="ms-auto rate-values"
                                        style={{ fontSize: "4px" }}
                                      >
                                        {Array.from(
                                          { length: 5 },
                                          (_, index) => {
                                            const rating =
                                              book.userReadingStatus?.length > 0
                                                ? book.userReadingStatus[0]
                                                    .ratings
                                                : 0;
                                            return (
                                              <i
                                                key={index}
                                                className={`pi ${
                                                  index < rating
                                                    ? "pi-star-fill"
                                                    : "pi-star"
                                                }`}
                                                style={{
                                                  color:
                                                    index < rating
                                                      ? "#FFCB45"
                                                      : "inherit",
                                                  fontSize: "12px",
                                                  margin: "1px",
                                                }}
                                              ></i>
                                            );
                                          }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            )
                        )}
                      </Row>
                    </div>
                  ))}
                  {/* {totalPages > 1 && (
                    <Paginator
                      first={currentPage}
                      rows={itemsPerPage}
                      totalRecords={filteredBooks.length}
                      onPageChange={onPageChange}
                    ></Paginator>
                  )} */}
                </>
              ) : (
                <div className="no-books-message">
                  <p>Sorry, no books are available at the moment.</p>
                  <p>
                    Please check back later, as new books are added regularly.
                  </p>
                  <p>
                    In the meantime, explore our other sections or let us know
                    what you'd like to see!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showaudioBooking && (
        <Overlayaudio
          audioBookingdetails={audioBookingdetails}
          setShowaudioBooking={setShowaudioBooking}
        />
      )}

      {showPopup && (
        // <div className="popup">
        //   <div className="popup-content p-3">
        //     {/* <Row> */}
        //     {/* Book Image and Title */}
        //     {/* <Col md={12} sm={12} lg={12}> */}
        //     <Row >
        //       <Col md={2}>
        //         <div>
        //           <img
        //             src={selectedBook.bookimage[0]}
        //             alt="Book Cover"
        //             style={{
        //               height: "100px",
        //               objectFit: "cover",
        //               borderRadius: "15px",
        //               padding: "2px",
        //             }}
        //           />
        //         </div>
        //       </Col>
        //       <Col md={2}  style={{ textAlign: "center" }}>
        //         <div className="" style={{ textAlign: "center" }}>
        //           <h4 className="">{selectedBook.title}</h4>
        //         </div>
        //       </Col>
        //       <Col md={2}>
        //         <div className="d-flex">
        //           <div
        //             style={{
        //               pointerEvents: isDisabled ? "none" : "auto",
        //               opacity: isDisabled ? 0.5 : 1,
        //             }}
        //           >
        //             <AudioPlayer
        //               ref={audioRef}
        //               autoPlay
        //               src={selectedBook.audiobookUpload[0]}
        //               onPlay={() => console.log("onPlay")}
        //               onListen={handleTimeUpdate}
        //               controls
        //               // className="w-100"
        //             />
        //           </div>
        //           <div className="my-auto">
        //             <i
        //               className="pi pi-times fs-4 cursor-pointer"
        //               onClick={() => setShowPopup(false)}
        //             ></i>
        //           </div>
        //         </div>
        //       </Col>
        //     </Row>
        //     {/* </Col> */}

        //     {/* Audio Player */}
        //     {/* <Col
        //         md={2}
        //         sm={2}
        //         lg={2}
        //         className="text-center"
        //         style={{
        //           pointerEvents: isDisabled ? "none" : "auto",
        //           opacity: isDisabled ? 0.5 : 1,
        //         }}
        //       >
        //         <AudioPlayer
        //           ref={audioRef}
        //           autoPlay
        //           src={selectedBook.audiobookUpload[0]}
        //           onPlay={() => console.log("onPlay")}
        //           onListen={handleTimeUpdate}
        //           controls
        //           // className="w-100"
        //         />
        //       </Col> */}
        //     {/* <Col md={2}>
        // <i
        //   className="pi pi-times fs-4 cursor-pointer"
        //   onClick={() => setShowPopup(false)}
        // ></i>
        //       </Col> */}
        //     {/* </Row> */}
        //   </div>
        // </div>
        <div className="custom-popups">
          <div className="custom-popup-contents p-3">
            <div className="text-end">
              <i
                className="pi pi-times fs-4 cursor-pointers-kkk"
                onClick={() => setShowPopup(false)}
              ></i>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <div className="text-center mx-2">
                <img
                  src={selectedBook.bookimage[0]}
                  alt="Book Cover"
                  style={{
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    padding: "2px",
                  }}
                />
              </div>
              <div className="text-center mx-2">
                <h4>{selectedBook.title}</h4>
              </div>
              <div className="text-center mx-2">
                <div
                  style={{
                    pointerEvents: isDisabled ? "none" : "auto",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <AudioPlayer
                    ref={audioRef}
                    autoPlay
                    src={selectedBook.audiobookUpload[0]}
                    onPlay={() => console.log("onPlay")}
                    onListen={handleTimeUpdate}
                    controls
                  />
                </div>
              </div>
              <i
                className="pi pi-times fs-4 cursor-pointers"
                onClick={() => setShowPopup(false)}
              ></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
