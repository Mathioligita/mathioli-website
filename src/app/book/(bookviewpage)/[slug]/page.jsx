// "use client";
// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Col, Row } from "react-bootstrap";
// import { FaHeart } from "react-icons/fa";
// import { Toast } from "primereact/toast";
// import axios from "axios";
// import Cookies from "js-cookie";
// import userContext from "../../../../app/UseContext/UseContext";
// import { API_BASE_URL } from "../../../../app/utils";
// import {
//   CartADDAPI,
//   Favoriteadd,
//   FavoriteAPI,
//   SingleBuyProduct,
// } from "../../../../../api/page";
// import OtherBooks from "../OtherBooks";
// import TabViews from "../tabview/TabView";
// import ReviewModal from "../reviewmodal";
// import PdfViewer from "../pdfViewer/PDFViewer";
// import FormatSelectionModal from "../FormatSelectionModal";
// import "./booksingle.css";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import "./books.css";
// import Swal from "sweetalert2";
// import { LoadingContext } from "../../../../app/layout";
// import { Button } from "primereact/button";
// import { Galleria } from "primereact/galleria";
// import Loading from "../../../../../components/Loading";
// import "../../audio-books/aduiostyle.css";
// import Overlayaudio from "../../audio-books/overlayaudio";

// const Lightbox = ({ images, activeIndex, onClose, onIndexChange }) => {
//   return (
//     <div className="lightbox-overlay" onClick={onClose}>
//       <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
//         <button className="lightbox-close" onClick={onClose}>
//           <i className="pi pi-times"></i>
//         </button>
//         <div className="lightbox-main-image">
//           <img src={images[activeIndex]} alt={`Slide ${activeIndex}`} />
//         </div>
//         <div className="lightbox-thumbnails">
//           {images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Thumbnail ${index}`}
//               className={index === activeIndex ? "active" : ""}
//               onClick={() => onIndexChange(index)}
//             />
//           ))}
//         </div>
//         <button
//           className="lightbox-nav prev"
//           onClick={(e) => {
//             e.stopPropagation();
//             onIndexChange((activeIndex - 1 + images.length) % images.length);
//           }}
//         >
//           <i className="pi pi-chevron-left"></i>
//         </button>
//         <button
//           className="lightbox-nav next"
//           onClick={(e) => {
//             e.stopPropagation();
//             onIndexChange((activeIndex + 1) % images.length);
//           }}
//         >
//           <i className="pi pi-chevron-right"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// const renderAvailability = (isAvailable, label, book) => (
//   <li style={{ textAlign: "start" }}>
//     <span className="me-2">
//       {isAvailable ? (
//         <img src="../../Assert/Vector.png" alt="" className="" />
//       ) : null}
//     </span>
//     {isAvailable && (
//       <>
//         {label}
//         {book.isAudiobookAvailable ? (
//           <>
//             <span className="fw-bold fs-5 ms-5">{book} ₹ /-</span>
//           </>
//         ) : (
//           <>
//             <span className="fw-bold fs-5 ms-5" style={{ textAlign: "start" }}>
//               {book} ₹ /-
//             </span>
//           </>
//         )}
//       </>
//     )}
//   </li>
// );

// export default function BookDetailPage() {
//   const { slug } = useParams();
//   const [showEbook, setShowebook] = useState(false);
//   const { wishlistvalues, setCart, setwishlistvalues, loginpoup } =
//     useContext(userContext);
//   const toast = useRef(null);
//   const accessToken = Cookies.get("accessToken");
//   const guestId = Cookies.get("guestId");
//   const [show, setShow] = useState(false);
//   const [bookDetails, setBookDetails] = useState();
//   const router = useRouter();
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [showFormatModal, setShowFormatModal] = useState(false);
//   const [selectedFormat, setSelectedFormat] = useState(null);
//   const { loading, setLoading } = useContext(LoadingContext);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const audioRef = useRef(null);
//   const [showaudioBooking, setShowaudioBooking] = useState(false);
//   const [audioBookingdetails, setAudioBokkingDetails] = useState(null);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [reviewdata, setReviewdata] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);

//   const handleOpenPopup = (book) => {
//     setSelectedBook(book);
//     setIsPopupOpen(true);
//   };

//   const handleTimeUpdate = () => {
//     const audio = audioRef.current?.audio?.current;
//     if (audio && audio.currentTime >= 30) {
//       audio.currentTime = 30;
//       setIsDisabled(true);
//       setIsPopupOpen(false);
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

//   const fetchBookDetails = async () => {
//     setLoading(true);
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const response = await axios.get(`${API_BASE_URL}/user/book/${slug}`, {
//         headers,
//       });

//       if (response?.status === 200 && response?.data?.data) {
//         setBookDetails(response?.data?.data);
//       } else {
//         setError("Failed to load book details.");
//       }
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//       setError("Failed to load book details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookDetails();
//   }, [slug, accessToken, reviewdata]);

//   useEffect(() => {
//     const wishlistIds = wishlistvalues?.map((item) => item?.bookId?._id);
//     const isSame = wishlistIds?.includes(bookDetails?.book?._id);
//     setIsFavorite(isSame);
//   }, [wishlistvalues, bookDetails]);

//   const handleAddToCart = async (bookDetails) => {
//     try {
//       if (accessToken) {
//         const data = {
//           bookId: bookDetails?.book?._id || bookDetails._id,
//           quantity: 1,
//         };
//         const response = await CartADDAPI(data);
//         setCart(response?.data?.cart);
//         toast.current.show({
//           severity: "success",
//           summary: "Success",
//           detail: response.data.message,
//           life: 3000,
//         });
//       } else {
//         const data = {
//           bookId: bookDetails?.book?._id || bookDetails?._id,
//           quantity: 1,
//           guestId: guestId,
//         };
//         const response = await CartADDAPI(data);
//         setCart(response?.data?.cart);
//         toast.current.show({
//           severity: "success",
//           summary: "Success",
//           detail: response.data.message,
//           life: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleFavoriteToggle = async (bookDetails) => {
//     try {
//       if (accessToken) {
//         const data = { bookId: bookDetails.book._id };
//         const response = await Favoriteadd(data);
//         if (response) {
//           toast.current.show({
//             severity: "success",
//             summary: "Success",
//             detail: response.data.message,
//             life: 3000,
//           });
//           const data1 = await FavoriteAPI();
//           setwishlistvalues(data1?.data?.favorites);
//           setIsFavorite(!isFavorite);
//         } else {
//           toast.current.show({
//             severity: "error",
//             summary: "error",
//             detail: response?.data?.message,
//             life: 3000,
//           });
//         }
//       } else {
//         const data = { bookId: bookDetails.book._id, guestId: guestId };
//         const response = await Favoriteadd(data);
//         if (response) {
//           toast.current.show({
//             severity: "success",
//             summary: "Success",
//             detail: response.data.message,
//             life: 3000,
//           });
//           const data1 = await FavoriteAPI();
//           setwishlistvalues(data1?.data?.favorites);
//           setIsFavorite(!isFavorite);
//         } else {
//           toast.current.show({
//             severity: "error",
//             summary: "error",
//             detail: response?.data?.message,
//             life: 3000,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error updating favorite status:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleSubmitbuy = () => {
//     if (accessToken) {
//       setShowFormatModal(true);
//     } else {
//       loginpoup();
//     }
//   };

//   const handleFormatSelection = async (format) => {
//     setSelectedFormat(format);
//     setShowFormatModal(false);
//     const data = bookDetails.book.slug;
//     const response = await SingleBuyProduct(data);
//     sessionStorage.removeItem("selectedBook");
//     sessionStorage.removeItem("selectedaudiocopy");
//     sessionStorage.removeItem("selectedHardcopy");
//     sessionStorage.setItem("buysinglebook", JSON.stringify(response.data));
//     sessionStorage.setItem("singleBookBuying", true);
//     router.push("/book/checkout");
//   };

//   const handlepayoverflow = (book, bookType) => {
//     setShowaudioBooking(true);
//     setAudioBokkingDetails({ book, bookType });
//   };

//   if (error) return <div>{error}</div>;

//   if (!bookDetails || !bookDetails.book) {
//     return <Loading />;
//   }

//   const { book } = bookDetails;

//   return (
//     <div className="p-3">
//       <div className="container" style={{ cursor: "pointer" }}>
//         <div onClick={() => window.history.back("/")} className="book-btp ">
//           <i className="pi pi-arrow-left "></i>
//           <span className="ms-2">Back to Page</span>
//         </div>
//       </div>
//       <Toast ref={toast} />
//       <div className="container mt-3" key={book?.slug}>
//         <Row>
//           {show && (
//             <ReviewModal
//               setReviewdata={setReviewdata}
//               reviewdata={reviewdata}
//               slug={slug}
//               closeModal={() => setShow(false)}
//               show={show}
//             />
//           )}
//           <Col md={6} lg={3}>
//             <div className="book-title">
//               {book?.bookimage?.length > 0 ? (
//                 <div className="d-flex flex-column">
//                   {/* Main image display */}
//                   <div
//                     className="mb-3"
//                     style={{
//                       height: "400px",
//                       overflow: "hidden",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => {
//                       setLightboxIndex(activeIndex);
//                       setLightboxOpen(true);
//                     }}
//                   >
//                     <img
//                       src={book.bookimage[activeIndex]}
//                       alt={book.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "contain",
//                       }}
//                     />
//                   </div>

//                   {/* Thumbnail navigation */}
//                   <div className="d-flex justify-content-center flex-wrap">
//                     {book.bookimage.map((img, index) => (
//                       <div
//                         key={index}
//                         className="mx-1 mb-2"
//                         style={{
//                           cursor: "pointer",
//                           border:
//                             activeIndex === index
//                               ? "2px solid #1D5755"
//                               : "1px solid #ddd",
//                           borderRadius: "4px",
//                           padding: "2px",
//                         }}
//                         onClick={() => {
//                           setActiveIndex(index);
//                           setLightboxIndex(index);
//                           setLightboxOpen(true);
//                         }}
//                       >
//                         <img
//                           src={img}
//                           alt={`Thumbnail ${index}`}
//                           width={60}
//                           height={60}
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   {/* Navigation arrows for mobile */}
//                   {book.bookimage.length > 1 && (
//                     <div className="d-flex justify-content-center mt-2 d-md-none">
//                       <button
//                         className="btn btn-sm me-2"
//                         onClick={() =>
//                           setActiveIndex(
//                             (prev) =>
//                               (prev - 1 + book.bookimage.length) %
//                               book.bookimage.length
//                           )
//                         }
//                         style={{ background: "#f8f9fa" }}
//                       >
//                         <i className="pi pi-chevron-left"></i>
//                       </button>
//                       <button
//                         className="btn btn-sm"
//                         onClick={() =>
//                           setActiveIndex(
//                             (prev) => (prev + 1) % book.bookimage.length
//                           )
//                         }
//                         style={{ background: "#f8f9fa" }}
//                       >
//                         <i className="pi pi-chevron-right"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <img
//                   src="/default-image.jpg"
//                   alt="Book Image"
//                   className="images-books-valeu"
//                 />
//               )}
//             </div>
//           </Col>
//           <Col md={6} lg={5}>
//             <div className="book-detail-left">
//               <h1 className="book-title">
//                 {book?.title || "No Title Available"}
//               </h1>
//               <div className="book-author">
//                 By{" "}
//                 <span style={{ textDecoration: "underline" }}>
//                   {book?.author || "Unknown Author"}
//                 </span>
//                 , {new Date(book?.publishDate).getFullYear() || "N/A"}
//               </div>
//               <div className="book-publish-date">
//                 {new Date(book?.publishDate).toDateString()}
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="mt-1" style={{ fontSize: "11px" }}>
//                   {Array.from({ length: 5 }, (_, index) => {
//                     const rating =
//                       book?.userReadingStatus?.length > 0
//                         ? book?.userReadingStatus[0]?.ratings
//                         : 0;
//                     return (
//                       <i
//                         key={index}
//                         className={`pi ${
//                           index < rating ? "pi-star-fill" : "pi-star"
//                         }`}
//                         style={{
//                           color: index < rating ? "#FFCB45" : "inherit",
//                           fontSize: "12px",
//                           margin: "2px",
//                         }}
//                       ></i>
//                     );
//                   })}
//                 </span>
//                 <span className="ms-2">
//                   {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
//                 </span>
//               </div>
//               <div className="mt-2 mt-md-3">
//                 <span className="fw-bold">Availability</span>
//                 <ul className="list-unstyled">
//                   {renderAvailability(
//                     book?.isHardCopyAvailable,
//                     "Hard Copy",
//                     book?.price
//                   )}
//                   {renderAvailability(
//                     book?.isAudiobookAvailable,
//                     "Audio Book",
//                     book?.audiobookPrice
//                   )}
//                 </ul>
//               </div>
//               <div
//                 className="book-price d-flex flex-md-wrap"
//                 style={{ justifyContent: "space-between", maxWidth: "353px" }}
//               >
//                 {book?.isAudiobookAvailable ? (
//                   <div className="d-flex ms-auto">
//                     <span
//                       onClick={() => handleFavoriteToggle(bookDetails)}
//                       style={{ cursor: "pointer", fontSize: "24px" }}
//                     >
//                       <FaHeart
//                         className={`${
//                           isFavorite ? "fav-icon-fill" : "fav-icon"
//                         }`}
//                         style={{ color: "red" }}
//                       />
//                     </span>
//                   </div>
//                 ) : null}
//               </div>
//               <div
//                 className="book-pages mb-2 d-flex "
//                 style={{ justifyContent: "" }}
//               >
//                 <Button
//                   onClick={handleSubmitbuy}
//                   className="rounded-2"
//                   style={{
//                     justifyContent: "center",
//                     background: "#FFA539",
//                     padding: "10px",
//                     width: "150px",
//                     border: "none",
//                     marginRight: "10px",
//                   }}
//                 >
//                   Buy Now
//                 </Button>
//                 <Button
//                   className="rounded-2 btn-cart"
//                   style={{
//                     background: "#1D5755",
//                     fontsize: "12px",
//                     justifyContent: "center",
//                     padding: "10px",
//                     width: "150px",
//                     border: "none",
//                   }}
//                   onClick={() => handleAddToCart(bookDetails)}
//                 >
//                   Add to Cart
//                 </Button>
//                 {book?.isAudiobookAvailable ? (
//                   <Button
//                     onClick={() => handleOpenPopup(bookDetails.book)}
//                     className="rounded-2 text-center"
//                     style={{
//                       background: "white",
//                       justifyContent: "center",
//                       padding: "10px",
//                       border: "none",
//                       marginLeft: "10px",
//                       color: "#FFA539",
//                       border: "1px solid #FFA539",
//                     }}
//                   >
//                     <i className="pi pi-headphones fw-bold"></i>
//                   </Button>
//                 ) : (
//                   <div className="d-flex ms-2">
//                     <span
//                       onClick={() => handleFavoriteToggle(bookDetails)}
//                       style={{ cursor: "pointer", fontSize: "24px" }}
//                     >
//                       <FaHeart
//                         className={`${
//                           isFavorite ? "fav-icon-fill" : "fav-icon"
//                         }`}
//                         style={{ color: "red" }}
//                       />
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Col>
//           <Col md={12} lg={4}>
//             <div className="author-info" style={{ padding: "20px" }}>
//               <h6 className="fw-bold">
//                 <span
//                   style={{
//                     color: "#F27851",
//                     fontWeight: "bold",
//                     fontSize: "17px",
//                   }}
//                 >
//                   About Author
//                 </span>{" "}
//               </h6>
//               <p className="fw-bold m-0">{book?.author || "Unknown Author"}</p>
//               <span style={{ fontSize: "13px" }}>
//                 {book?.authorBiography || "No biography available."}
//               </span>
//               {bookDetails && (
//                 <>
//                   {bookDetails.length >= 0 ? (
//                     <>
//                       {" "}
//                       <p className="fw-bold mt-3">Related Books</p>
//                       <OtherBooks books={bookDetails} />
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               )}
//             </div>
//           </Col>
//         </Row>
//         <div className="mt-5">
//           <TabViews books={bookDetails} setShow={setShow} show={show} />
//         </div>
//       </div>

//       {/* Lightbox component */}
//       {lightboxOpen && (
//         <Lightbox
//           images={book.bookimage}
//           activeIndex={lightboxIndex}
//           onClose={() => setLightboxOpen(false)}
//           onIndexChange={(index) => {
//             setLightboxIndex(index);
//             setActiveIndex(index);
//           }}
//         />
//       )}

//       {isPopupOpen && (
//         <div className="custom-popups">
//           <div className="custom-popup-contents p-3">
//             <div className="text-end">
//               <i
//                 className="pi pi-times fs-4 cursor-pointers-kkk"
//                 onClick={() => setIsPopupOpen(false)}
//               ></i>
//             </div>
//             <div className="d-flex align-items-center justify-content-center flex-wrap">
//               <div className="text-center mx-2">
//                 <img
//                   src={selectedBook.bookimage[0]}
//                   alt="Book Cover"
//                   style={{
//                     height: "100px",
//                     objectFit: "cover",
//                     borderRadius: "15px",
//                     padding: "2px",
//                   }}
//                 />
//               </div>
//               <div className="text-center mx-2">
//                 <h4>{selectedBook.title}</h4>
//               </div>
//               <div className="text-center mx-2">
//                 <div
//                   style={{
//                     pointerEvents: isDisabled ? "none" : "auto",
//                     opacity: isDisabled ? 0.5 : 1,
//                   }}
//                 >
//                   <AudioPlayer
//                     ref={audioRef}
//                     autoPlay
//                     src={selectedBook.audiobookUpload[0]}
//                     onPlay={() => console.log("onPlay")}
//                     onListen={handleTimeUpdate}
//                     controls
//                   />
//                 </div>
//               </div>
//               <i
//                 className="pi pi-times fs-4 cursor-pointers-eee"
//                 onClick={() => setIsPopupOpen(false)}
//               ></i>
//             </div>
//           </div>
//         </div>
//       )}
//       {showEbook && (
//         <PdfViewer setShowebook={setShowebook} ebookSrc={bookDetails.book} />
//       )}
//       <FormatSelectionModal
//         handleAddToCart={handleAddToCart}
//         show={showFormatModal}
//         book={book}
//         handleClose={() => setShowFormatModal(false)}
//         handleSelection={handleFormatSelection}
//       />
//       {showaudioBooking && (
//         <Overlayaudio
//           audioBookingdetails={audioBookingdetails}
//           setShowaudioBooking={setShowaudioBooking}
//         />
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Toast } from "primereact/toast";
import axios from "axios";
import Cookies from "js-cookie";
import userContext from "../../../../app/UseContext/UseContext";
import { API_BASE_URL } from "../../../../app/utils";
import {
  CartADDAPI,
  Favoriteadd,
  FavoriteAPI,
  SingleBuyProduct,
} from "../../../../../api/page";
import OtherBooks from "../OtherBooks";
import TabViews from "../tabview/TabView";
import ReviewModal from "../reviewmodal";
import PdfViewer from "../pdfViewer/PDFViewer";
import FormatSelectionModal from "../FormatSelectionModal";
import "./booksingle.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./books.css";
import Swal from "sweetalert2";
import { LoadingContext } from "../../../../app/layout";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import Loading from "../../../../../components/Loading";
import "../../audio-books/aduiostyle.css";
import Overlayaudio from "../../audio-books/overlayaudio";
import { SlideshowLightbox } from "lightbox.js-react";
// import "lightbox.js-react/dist/index.css";

const renderAvailability = (isAvailable, label, book) => (
  <li style={{ textAlign: "start" }}>
    <span className="me-2">
      {isAvailable ? (
        <img src="../../Assert/Vector.png" alt="" className="" />
      ) : null}
    </span>
    {isAvailable && (
      <>
        {label}
        {book.isAudiobookAvailable ? (
          <>
            <span className="fw-bold fs-5 ms-5">{book} ₹ /-</span>
          </>
        ) : (
          <>
            <span className="fw-bold fs-5 ms-5" style={{ textAlign: "start" }}>
              {book} ₹ /-
            </span>
          </>
        )}
      </>
    )}
  </li>
);

export default function BookDetailPage() {
  const { slug } = useParams();
  const [showEbook, setShowebook] = useState(false);
  const { wishlistvalues, setCart, setwishlistvalues, loginpoup } =
    useContext(userContext);
  const toast = useRef(null);
  const accessToken = Cookies.get("accessToken");
  const guestId = Cookies.get("guestId");
  const [show, setShow] = useState(false);
  const [bookDetails, setBookDetails] = useState();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const audioRef = useRef(null);
  const [showaudioBooking, setShowaudioBooking] = useState(false);
  const [audioBookingdetails, setAudioBokkingDetails] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [reviewdata, setReviewdata] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenPopup = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current?.audio?.current;
    if (audio && audio.currentTime >= 30) {
      audio.currentTime = 30;
      setIsDisabled(true);
      setIsPopupOpen(false);
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

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${API_BASE_URL}/user/book/${slug}`, {
        headers,
      });

      if (response?.status === 200 && response?.data?.data) {
        setBookDetails(response?.data?.data);
      } else {
        setError("Failed to load book details.");
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      setError("Failed to load book details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [slug, accessToken, reviewdata]);

  useEffect(() => {
    const wishlistIds = wishlistvalues?.map((item) => item?.bookId?._id);
    const isSame = wishlistIds?.includes(bookDetails?.book?._id);
    setIsFavorite(isSame);
  }, [wishlistvalues, bookDetails]);

  const handleAddToCart = async (bookDetails) => {
    try {
      if (accessToken) {
        const data = {
          bookId: bookDetails?.book?._id || bookDetails._id,
          quantity: 1,
        };
        const response = await CartADDAPI(data);
        setCart(response?.data?.cart);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.message,
          life: 3000,
        });
      } else {
        const data = {
          bookId: bookDetails?.book?._id || bookDetails?._id,
          quantity: 1,
          guestId: guestId,
        };
        const response = await CartADDAPI(data);
        setCart(response?.data?.cart);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.message,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavoriteToggle = async (bookDetails) => {
    try {
      if (accessToken) {
        const data = { bookId: bookDetails.book._id };
        const response = await Favoriteadd(data);
        if (response) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: response.data.message,
            life: 3000,
          });
          const data1 = await FavoriteAPI();
          setwishlistvalues(data1?.data?.favorites);
          setIsFavorite(!isFavorite);
        } else {
          toast.current.show({
            severity: "error",
            summary: "error",
            detail: response?.data?.message,
            life: 3000,
          });
        }
      } else {
        const data = { bookId: bookDetails.book._id, guestId: guestId };
        const response = await Favoriteadd(data);
        if (response) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: response.data.message,
            life: 3000,
          });
          const data1 = await FavoriteAPI();
          setwishlistvalues(data1?.data?.favorites);
          setIsFavorite(!isFavorite);
        } else {
          toast.current.show({
            severity: "error",
            summary: "error",
            detail: response?.data?.message,
            life: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitbuy = () => {
    if (accessToken) {
      setShowFormatModal(true);
    } else {
      loginpoup();
    }
  };

  const handleFormatSelection = async (format) => {
    setSelectedFormat(format);
    setShowFormatModal(false);
    const data = bookDetails.book.slug;
    const response = await SingleBuyProduct(data);
    sessionStorage.removeItem("selectedBook");
    sessionStorage.removeItem("selectedaudiocopy");
    sessionStorage.removeItem("selectedHardcopy");
    sessionStorage.setItem("buysinglebook", JSON.stringify(response.data));
    sessionStorage.setItem("singleBookBuying", true);
    router.push("/book/checkout");
  };

  const handlepayoverflow = (book, bookType) => {
    setShowaudioBooking(true);
    setAudioBokkingDetails({ book, bookType });
  };

  if (error) return <div>{error}</div>;

  if (!bookDetails || !bookDetails.book) {
    return <Loading />;
  }

  const { book } = bookDetails;

  return (
    <div className="p-3">
      <div className="container" style={{ cursor: "pointer" }}>
        <div onClick={() => window.history.back("/")} className="book-btp ">
          <i className="pi pi-arrow-left "></i>
          <span className="ms-2">Back to Page</span>
        </div>
      </div>
      <Toast ref={toast} />
      <div className="container mt-3" key={book?.slug}>
        <Row>
          {show && (
            <ReviewModal
              setReviewdata={setReviewdata}
              reviewdata={reviewdata}
              slug={slug}
              closeModal={() => setShow(false)}
              show={show}
            />
          )}
          <Col md={6} lg={3}>
            <div className="book-title">
              {/* First check if book exists, then check bookimage */}
              {book &&
              Array.isArray(book.bookimage) &&
              book.bookimage.length > 0 ? (
                <SlideshowLightbox
                  lightboxIdentifier="bookLightbox"
                  className="container grid grid-cols-1 gap-2"
                  framework="next"
                  images={book.bookimage.map((img, index) => ({
                    src: img,
                    alt: `${book.title || "Book"} - Image ${index + 1}`,
                    thumbnail: img,
                    width: "100%",
                    height: "400px",
                    style: {
                      objectFit: "contain",
                      cursor: "pointer",
                    },
                  }))}
                >
                  {/* Main image */}
                  <img
                    src={book.bookimage[0]}
                    alt={book.title || "Book cover"}
                    className="mb-3"
                    style={{
                      height: "400px",
                      width: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    data-lightboxjs="bookLightbox"
                  />

                  {/* Thumbnail navigation */}
                  <div className="d-flex justify-content-center flex-wrap">
                    {book.bookimage.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={60}
                        height={60}
                        style={{
                          objectFit: "cover",
                          border:
                            activeIndex === index
                              ? "2px solid #1D5755"
                              : "1px solid #ddd",
                          borderRadius: "4px",
                          padding: "2px",
                          margin: "0 4px 8px 4px",
                          cursor: "pointer",
                        }}
                        data-lightboxjs="bookLightbox"
                      />
                    ))}
                  </div>
                </SlideshowLightbox>
              ) : (
                <img
                  src="/default-image.jpg"
                  alt="Book placeholder"
                  className="images-books-valeu"
                  style={{
                    height: "400px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          </Col>
          <Col md={6} lg={5}>
            <div className="book-detail-left">
              <h1 className="book-title">
                {book?.title || "No Title Available"}
              </h1>
              <div className="book-author">
                By{" "}
                <span style={{ textDecoration: "underline" }}>
                  {book?.author || "Unknown Author"}
                </span>
                , {new Date(book?.publishDate).getFullYear() || "N/A"}
              </div>
              <div className="book-publish-date">
                {new Date(book?.publishDate).toDateString()}
              </div>
              <div className="d-flex align-items-center">
                <span className="mt-1" style={{ fontSize: "11px" }}>
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating =
                      book?.userReadingStatus?.length > 0
                        ? book?.userReadingStatus[0]?.ratings
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
                          margin: "2px",
                        }}
                      ></i>
                    );
                  })}
                </span>
                <span className="ms-2">
                  {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
                </span>
              </div>
              <div className="mt-2 mt-md-3">
                <span className="fw-bold">Availability</span>
                <ul className="list-unstyled">
                  {renderAvailability(
                    book?.isHardCopyAvailable,
                    "Hard Copy",
                    book?.price
                  )}
                  {renderAvailability(
                    book?.isAudiobookAvailable,
                    "Audio Book",
                    book?.audiobookPrice
                  )}
                </ul>
              </div>
              <div
                className="book-price d-flex flex-md-wrap"
                style={{ justifyContent: "space-between", maxWidth: "353px" }}
              >
                {book?.isAudiobookAvailable ? (
                  <div className="d-flex ms-auto">
                    <span
                      onClick={() => handleFavoriteToggle(bookDetails)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      <FaHeart
                        className={`${
                          isFavorite ? "fav-icon-fill" : "fav-icon"
                        }`}
                        style={{ color: "red" }}
                      />
                    </span>
                  </div>
                ) : null}
              </div>
              <div
                className="book-pages mb-2 d-flex "
                style={{ justifyContent: "" }}
              >
                <Button
                  onClick={handleSubmitbuy}
                  className="rounded-2"
                  style={{
                    justifyContent: "center",
                    background: "#FFA539",
                    padding: "10px",
                    width: "150px",
                    border: "none",
                    marginRight: "10px",
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  className="rounded-2 btn-cart"
                  style={{
                    background: "#1D5755",
                    fontsize: "12px",
                    justifyContent: "center",
                    padding: "10px",
                    width: "150px",
                    border: "none",
                  }}
                  onClick={() => handleAddToCart(bookDetails)}
                >
                  Add to Cart
                </Button>
                {book?.isAudiobookAvailable ? (
                  <Button
                    onClick={() => handleOpenPopup(bookDetails.book)}
                    className="rounded-2 text-center"
                    style={{
                      background: "white",
                      justifyContent: "center",
                      padding: "10px",
                      border: "none",
                      marginLeft: "10px",
                      color: "#FFA539",
                      border: "1px solid #FFA539",
                    }}
                  >
                    <i className="pi pi-headphones fw-bold"></i>
                  </Button>
                ) : (
                  <div className="d-flex ms-2">
                    <span
                      onClick={() => handleFavoriteToggle(bookDetails)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      <FaHeart
                        className={`${
                          isFavorite ? "fav-icon-fill" : "fav-icon"
                        }`}
                        style={{ color: "red" }}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className="author-info" style={{ padding: "20px" }}>
              <h6 className="fw-bold">
                <span
                  style={{
                    color: "#F27851",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  About Author
                </span>{" "}
              </h6>
              <p className="fw-bold m-0">{book?.author || "Unknown Author"}</p>
              <span style={{ fontSize: "13px" }}>
                {book?.authorBiography || "No biography available."}
              </span>
              {bookDetails && (
                <>
                  {bookDetails.length >= 0 ? (
                    <>
                      {" "}
                      <p className="fw-bold mt-3">Related Books</p>
                      <OtherBooks books={bookDetails} />
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
        <div className="mt-5">
          <TabViews books={bookDetails} setShow={setShow} show={show} />
        </div>
      </div>

      {isPopupOpen && (
        <div className="custom-popups">
          <div className="custom-popup-contents p-3">
            <div className="text-end">
              <i
                className="pi pi-times fs-4 cursor-pointers-kkk"
                onClick={() => setIsPopupOpen(false)}
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
                className="pi pi-times fs-4 cursor-pointers-eee"
                onClick={() => setIsPopupOpen(false)}
              ></i>
            </div>
          </div>
        </div>
      )}
      {showEbook && (
        <PdfViewer setShowebook={setShowebook} ebookSrc={bookDetails.book} />
      )}
      <FormatSelectionModal
        handleAddToCart={handleAddToCart}
        show={showFormatModal}
        book={book}
        handleClose={() => setShowFormatModal(false)}
        handleSelection={handleFormatSelection}
      />
      {showaudioBooking && (
        <Overlayaudio
          audioBookingdetails={audioBookingdetails}
          setShowaudioBooking={setShowaudioBooking}
        />
      )}
    </div>
  );
}
