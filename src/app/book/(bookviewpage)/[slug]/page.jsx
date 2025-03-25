"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Col, Row, Modal } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
import Loading from "../../../../../components/Loading";
// import Overlayaudio from '../../audio-books/overlayaudio';
import "../../audio-books/aduiostyle.css";
import Overlayaudio from "../../audio-books/overlayaudio";

const renderAvailability = (isAvailable, label, book) => (
  <li style={{ textAlign: "start" }}>
    <span className="me-2">
      {isAvailable ? (
        <img src="../../Assert/Vector.png" alt="" className="" />
      ) : // <img src="../../Assert/Vector (1).png" alt="" className="" />
      null}
    </span>
    {isAvailable && (
      <>
        {label}
        {book.isAudiobookAvailable ? (
          <>
            {/* <span className="fw-bold fs-5 ms-5">{book.price} ₹ /-</span> <br /> */}
            {console.log(label, "label")}
            {/* {label} */}
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

  const handleOpenPopup = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  // const handleTimeUpdate = () => {
  //   if (audioRef.current.audio.current.currentTime >= 30) {
  //     audioRef.current.audio.current.pause();
  //     setIsDisabled(true);
  //   }
  //   Swal.fire({
  //     title: "Continue Listening",
  //     text: "Your 30-second preview has ended. Unlock the full audiobook and continue listening without interruption.",
  //     imageUrl: `${selectedBook?.bookimage[0]}`,
  //     imageAlt: "Custom image",
  //     showCancelButton: true,
  //     confirmButtonText: "Buy",
  //     cancelButtonText: "Cancel",
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     customClass: {
  //       popup: "custom-popup",
  //       confirmButton: "custom-confirm-button",
  //       cancelButton: "custom-cancel-button",
  //     },
  //     didOpen: () => {
  //       const popup = document.querySelector(".custom-popup");
  //       const confirmButton = document.querySelector(".custom-confirm-button");
  //       const cancelButton = document.querySelector(".custom-cancel-button");
  //       const image = popup.querySelector(".swal2-image");

  //       if (image) {
  //         image.style.backgroundColor = "#1D5755";
  //         image.style.height = "183px";
  //       }
  //       confirmButton.style.backgroundColor = "#1D5755";
  //       cancelButton.style.backgroundColor = "#1D5755";
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handlepayoverflow(selectedBook, "audioBook");
  //     }
  //   });
  // };
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
    console.log(bookDetails, "bookdetails");
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

  // const handleOpenPopup = () => {
  // 	setIsPopupOpen(true);
  // };

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
    // console.log(data, "faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // alert("JJJJ");
    const response = await SingleBuyProduct(data);
    // if (response) {
    const sessision = sessionStorage.getItem("selectedBook");
    // if (sessision) {
    sessionStorage.removeItem("selectedBook");
    sessionStorage.removeItem("selectedaudiocopy");
    sessionStorage.removeItem("selectedHardcopy");
    sessionStorage.setItem("buysinglebook", JSON.stringify(response.data));
    sessionStorage.setItem("singleBookBuying", true);
    // }
    // }
    router.push("/book/checkout");
  };

  // if (loading)
  //   return (
  //     <div
  //       className="d-flex"
  //       style={{ justifyContent: "center", height: "100vh" }}
  //     >
  //       {/* <img
  //         src="../Assert/Animation - 1740485995740.gif"
  //         alt=""
  //         width={"500px"}
  //         style={{ objectFit: "cover" }}
  //       /> */}
  //       loading ......
  //     </div>
  //   );
  if (error) return <div>{error}</div>;

  // Check if bookDetails and bookDetails.book are defined
  if (!bookDetails || !bookDetails.book) {
    return (
      <div>
        <Loading />
        {/* <h1>loading.......</h1> */}
      </div>
    );
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
          <Col md={3} lg={3}>
            <div className="ms-5 book-title">
              <img
                src={book?.bookimage?.[0] || "/default-image.jpg"}
                alt={book?.title || "Book Image"}
                // width={"80%"}
                className="images-books-valeu"
                // style={{ maxWidth: "80%" }}
              />

              <div className="book-btp mt-4 mb-2">
                {/* <Button
                  className=""
                  icon="pi pi-comments"
                  label="Review"
                  onClick={() => setShow(accessToken ? true : loginpoup())}
                  //   severity="success"
                  style={{
                    color: "#1D5755",
                    border: "1px solid #1D5755",
                    borderRadius: "6px",
                  }}
                  outlined
                ></Button> */}
                {/* <Button
                  onClick={() => setShow(accessToken ? true : loginpoup())}
                  className="rounded-2"
                  label="Review"
                  style={{
                    justifyContent: "center",
                    // background: "#FFA539",
                    padding: "10px",
                    width: "150px",
                    border: "none",
                    marginRight: "10px",
                    color: "#1D5755",
                    border: "1px solid #1D5755",
                    borderRadius: "6px",
                    // borderRadius: "5px",
                  }}
                  outlined
                > */}
                {/* Buy Now */}
                {/* </Button> */}
              </div>

              {show && (
                <ReviewModal
                  setReviewdata={setReviewdata}
                  reviewdata={reviewdata}
                  slug={slug}
                  closeModal={() => setShow(false)}
                  show={show}
                />
              )}
            </div>
          </Col>
          <Col md={4} lg={5}>
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
                {/* <span>{book?.genre}</span>,{" "} */}
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
                  {/* {renderAvailability(book?.isEBookAvailable, "E-Book")} */}
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
                      // className="love-icons"
                      onClick={() => handleFavoriteToggle(bookDetails)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      {/* {isFavorite ? ( */}
                      <FaHeart
                        className={`${
                          isFavorite ? "fav-icon-fill" : "fav-icon"
                        }`}
                        style={{ color: "red" }}
                      />
                      {/* ) : (
                       <FaHeart style={{ color: "grey" }} />
                    )} */}
                    </span>
                    {/* <Button
                    className="rounded-2 btn-cart ms-4"
                    style={{
                      background: "rgb(65, 182, 77)",
                      padding: "9px",
                      border: "none",
                      marginBottom: "10px",
                    }}
                    onClick={() => handleAddToCart(bookDetails)}
                  >
                    Add to Cart
                  </Button> */}
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
                    // borderRadius: "5px",
                  }}
                >
                  Buy Now
                </Button>
                {/* {book?.isEBookAvailable && (
									// <Button
									//   onClick={() => setShowebook(true)}
									//   className="rounded-2 mr-2 text-center"
									//   style={{
									//     background: "#41B64D",
									//     fontsize: "12px",
									//     justifyContent: "center",
									//     padding: "10px",
									//     width: "150px",
									//     border: "none",
									//     marginLeft: "10px",
									//   }}
									// >
									//   Read Now
									// </Button>
									
								)} */}
                <Button
                  className="rounded-2 btn-cart"
                  style={{
                    background: "#1D5755",
                    fontsize: "12px",
                    justifyContent: "center",
                    padding: "10px",
                    width: "150px",
                    border: "none",
                    // marginLeft: "10px",
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
                      // className="love-icons"
                      onClick={() => handleFavoriteToggle(bookDetails)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      {/* {isFavorite ? ( */}
                      <FaHeart
                        className={`${
                          isFavorite ? "fav-icon-fill" : "fav-icon"
                        }`}
                        style={{ color: "red" }}
                      />
                      {/* ) : (
				   <FaHeart style={{ color: "grey" }} />
				)} */}
                    </span>
                    {/* <Button
				className="rounded-2 btn-cart ms-4"
				style={{
				  background: "rgb(65, 182, 77)",
				  padding: "9px",
				  border: "none",
				  marginBottom: "10px",
				}}
				onClick={() => handleAddToCart(bookDetails)}
			  >
				Add to Cart
			  </Button> */}
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col md={4} lg={4}>
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
                  <p className="fw-bold mt-3">Related Books</p>
                  <OtherBooks books={bookDetails} />
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
        // <div className="popup">
        //   <div className="popup-content">
        //     <div className="d-flex">
        //       <div className="p-2">
        //         <div className="d-flex">
        //           <div>
        //             <img
        //               src={selectedBook.bookimage[0]}
        //               alt=""
        //               style={{
        //                 height: "100px",
        //                 objectFit: "cover",
        //                 borderRadius: "15px",
        //                 padding: "2px",
        //               }}
        //             />
        //           </div>
        //           <div className="my-auto">
        //             <h4 className="m-2">{selectedBook.title}</h4>
        //           </div>
        //         </div>
        //       </div>
        //       <div
        //         style={{
        //           pointerEvents: isDisabled ? "none" : "auto",
        //           opacity: isDisabled ? 0.5 : 1,
        //         }}
        //         className="w-50 ms-auto mt-auto"
        //       >
        //         <AudioPlayer
        //           ref={audioRef}
        //           autoPlay
        //           src={selectedBook.audiobookUpload[0]}
        //           onPlay={(e) => console.log("onPlay")}
        //           onListen={handleTimeUpdate} // Track time and disable after 30 sec
        //           controls
        //           className="w-100"
        //         />
        //       </div>
        //       <div onClick={() => setIsPopupOpen(false)} className="my-auto">
        //         <i className="pi pi-times ms-4 fw-1"></i>
        //       </div>
        //     </div>
        //   </div>
        // </div>
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
