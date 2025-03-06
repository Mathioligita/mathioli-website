"use client"



import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BookAPI, CategoryAPI } from "../../../../api/page";

import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import "../topselling/[name]/styles.css";
import "./aduiostyle.css";
import { Button } from "primereact/button";
// import Overlayaudio from "./overlayaudio";
import userContext from "../../UseContext/UseContext";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Swal from "sweetalert2";
import Overlayaudio from "../audio-books/overlayaudio";
import './e-book.css';
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

export default function Ebookpage( ) {
  const pathname = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : null
  
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categoriesdata, setCategoriesdata } = useContext(userContext);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
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
  // const audioRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await retryFetch(CategoryAPI);
        const data = response?.data?.categories;

        console.log("Fetched categories data:", data);
        setCategoriesdata(data);

        // if (Array.isArray(data) && data.length > 0) {
        setCategoriesData(data);
        // }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // if (Array.isArray(categoriesdata) && categoriesdata.length === 0) {
    fetchCategories();
    // }
  }, []);

  const fetchData = async () => {
    try {
      const response = await retryFetch(BookAPI);
      const data = response?.data?.books;
      setBooksData(data);

    } catch (error) {
      console.error("Error fetching data:", error);
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
      // audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
        (book.category && book.category.toLowerCase() === selectedCategory?.name?.toLowerCase());

      const genreMatch =
        !selectedGenres.length || (book.genre && selectedGenres.includes(book.genre));

      const languageMatch =
        !selectedLanguages.length || (book.language && selectedLanguages.includes(book.language));

      const authorMatch =
        !selectedAuthors.length || (book.author && selectedAuthors.includes(book.author));

      const formatMatch =
        !selectedFormats.length ||
        (selectedFormats.includes("EBook") && book.isEBookAvailable) ||
        (selectedFormats.includes("Hard Copy") && book.isHardCopyAvailable);

      const globalMatch =
        (book.title && book.title.toLowerCase().includes(globalFilterValue?.toLowerCase() || '')) ||
        (book.author && book.author.toLowerCase().includes(globalFilterValue?.toLowerCase() || '')) ||
        (book.genre && book.genre.toLowerCase().includes(globalFilterValue?.toLowerCase() || '')) ||
        (book.language && book.language.toLowerCase().includes(globalFilterValue?.toLowerCase() || ''));

      if (!showAudiobooksFirst && book.isAudiobookAvailable) {
        return false;
      }

      // Filter based on the current route
      if (pathname === 'e-books' && !book.isEBookAvailable) {
        return false;
      }
      if (pathname === 'audio-books' && !book.isAudiobookAvailable) {
        return false;
      }

      return (
        categoryMatch &&
        genreMatch &&
        languageMatch &&
        authorMatch &&
        formatMatch &&
        globalMatch
      );
    });

  const genres = [...new Set(booksData?.map((book) => book?.genre))];
  const languages = [...new Set(booksData?.map((book) => book?.language))];
  const authors = [...new Set(booksData?.map((book) => book?.author))];
  const formats = ["EBook", "Audiobook", "Hard Copy"];

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="table-header ">
        <div className="">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              type="search"
              value={globalFilterValue ?? ""}
              onChange={(e) => onGlobalFilterChange(e)}
              placeholder="Global Search"
            />
          </IconField>
        </div>
      </div>
    );
  };

  const header = renderHeader();

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
    // router.push(`/book/audio-books/${book.slug}`);
  };

  const handlepayoverflow = (book, bookType) => {
    setShowaudioBooking(true);
    setAudioBokkingDetails({ book, bookType });
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current?.audio?.current;
    if (audio && audio.currentTime >= 30) {
      audio;
      audio.currentTime = 30; // Lock at 30 sec
      setIsDisabled(true);

    }

  };
  const shouldRenderButtons = pathname;
  console.log(shouldRenderButtons,)

  return (
    <div className="container mt-4">
      <div className="row mt-5" >
        <div className="col-lg-3 col-md-5 col-sm-12 e-book-sidebar">
          <div className="sidebar-book">
            {/* <div className="w-100 mt-0">
              <Dropdown
                value={selectedCategory ? selectedCategory.name : ""}
                options={categoriesData}
                onChange={(e) =>
                  setSelectedCategory(
                    categoriesData.find(
                      (cat) => cat.name === e?.target?.value?.name
                    )
                  )
                }
                placeholder="Select a Category"
                className="category-select w-100"
                optionLabel="name"
              />
            </div> */}
            <div className="filter-section mt-3">
              <MultiSelect
                value={selectedGenres}
                options={genres}
                onChange={(e) => setSelectedGenres(e.value)}
                placeholder="Select Genres"
                className="filter-select"
              />
            </div>
            <div className="filter-section">
              <MultiSelect
                value={selectedLanguages}
                options={languages}
                onChange={(e) => setSelectedLanguages(e.value)}
                placeholder="Select Languages"
                className="filter-select"
              />
            </div>
            <div className="filter-section">
              <MultiSelect
                value={selectedAuthors}
                options={authors}
                onChange={(e) => setSelectedAuthors(e.value)}
                placeholder="Select Authors"
                className="filter-select"
              />
            </div>
            {/* <div className="filter-section">
              <MultiSelect
                value={selectedFormats}
                options={formats}
                onChange={(e) => setSelectedFormats(e.value)}
                placeholder="Select Formats"
                className="filter-select"
              />
            </div> */}
          </div>
        </div>
        <div className="col-md-7 col-lg-9 mb-4">
          <div className="main-content ">
            {header}
            <div className="book-sdbjd">
              {pathname === 'categories' ? (
                // Render categories
                categoriesData.map((category) => (
                  <div key={category.name}>
                    <h3>{category.name}</h3>
                    {/* Render books for the category */}
                    <Row>

                      {groupedBooks[category.name]?.map((book) => (
                        <Col md={4} lg={2} sm={6} key={book._id}>
                          <div
                            className="book-card"
                            onClick={() => handleBookClick(book)}
                            style={{
                              cursor: "pointer",
                              justifyContent: "space-between",
                              marginBottom: "20px",
                              borderRadius: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="book-image"
                              style={{
                                flex: "1 0 auto",
                                background: "#ffff",
                                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              borderRadius: "6px",
                                padding: "15px",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <img
                                src={
                                  book.bookimage && book.bookimage.length > 0
                                    ? book.bookimage[0]
                                    : "https://via.placeholder.com/150"
                                }
                                alt={book.title}
                                width={"100%"}
                              />
                              {/* 
                              {shouldRenderButtons && (
                                <>
                                  {book.isAudiobookAvailable && shouldRenderButtons === "audio-books" ? (

                                    <button
                                      className="play-button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlayButtonClick(book);
                                      }}
                                    >
                                      ▶
                                    </button>

                                  ) : book.isEBookAvailable && shouldRenderButtons === "e-books" ? (
                                    <button
                                      className="play-button"
                                      onClick={() => handlePlayButtonClick(book)}
                                    >
                                      <i className="pi pi-book"></i>
                                    </button>
                                  ) : null}
                                </>
                              )} */}
                              {pathname === 'e-books' && book.isEBookAvailable && <button
                                className="play-button"
                                onClick={() => handlePlayButtonClick(book)}
                              >
                                <i className="pi pi-book"></i>
                              </button>}
                              {pathname === 'audio-books' && book.isAudiobookAvailable && <button
                                className="play-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayButtonClick(book);
                                }}
                              >
                                ▶
                              </button>}


                            </div>
                            <div
                              className="book-info"
                              style={{ marginTop: "10px" }}
                            >
                              <div className="d-flex">
                              <h5 className="mb-0" style={{fontFamily:"Inter",fontSize:"15px", fontWeight: "700", color: "#4D4D4D"}}>{book.title}</h5>
                                <span
                                  className="ms-auto"
                                  style={{
                                    fontSize: "12px",
                                    justifyContent: "end",
                                    textAlign: "end",
                                  }}
                                >
                                  {book.userReadingStatus.length > 0
                                    ? (
                                      book.userReadingStatus.reduce(
                                        (sum, item) => sum + item.ratings,
                                        0
                                      ) / book?.userReadingStatus?.length
                                    ).toFixed(1)
                                    : 0}
                                  /5
                                </span>
                              </div>
                              <div
                                className="ratings d-flex"
                                style={{  fontSize: "12px" }}
                              >
                                {book?.author}
                                <span
                                  className="ms-auto"
                                  style={{ fontSize: "4px" }}
                                >
                                  {Array.from({ length: 5 }, (_, index) => {
                                    const rating =
                                      book.userReadingStatus?.length > 0
                                        ? book.userReadingStatus[0].ratings
                                        : 0;
                                    return (
                                      <i
                                        key={index}
                                        className={`pi ${index < rating
                                          ? "pi-star-fill"
                                          : "pi-star"
                                          }`}
                                        style={{
                                          color:
                                            index < rating
                                              ? "#FFCB45"
                                              : "inherit",
                                          fontSize: "12px",
                                        }}
                                      ></i>
                                    );
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-end profile-contents-button">
                            <Button
                              className="profile-buttonssssss w-100"
                              onClick={() => handlepayoverflow(book, book.isAudiobookAvailable ? "audio book" : "e-book")}
                            >
                              Pay Now
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))
              ) : 
              (
                // Render books
                Object.keys(groupedBooks)?.map((category, index) => (
                  <div key={index}>
                    <div className="d-flex mt-5" style={{ justifyContent: "space-between" }}>
                      <div>

                        <h3>{category}</h3>
                      </div>
                      {/* {index === 0 && (

                        <div className="filter-section profile-contents-button">

                          <Button
                            onClick={() => setShowAudiobooksFirst(!showAudiobooksFirst)}
                            className="w-100 profile-buttonssssss"
                          >
                            {showAudiobooksFirst ? "Hide Audiobooks" : "Show Audiobooks First"}
                          </Button>

                        </div>)
                      } */}
                    </div>
                    <Row>
                      {groupedBooks[category]?.map((book) => (
                        <Col md={6} lg={3} sm={6} key={book._id}>
                          <div
                            className="book-card"
                            onClick={() => handleBookClick(book)}
                            style={{
                              cursor: "pointer",
                              justifyContent: "space-between",
                              // marginBottom: "20px",
                              borderRadius: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="book-image"
                              style={{
                                flex: "1 0 auto",
                                background: "#ffff",
                                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                borderRadius: "6px",
                                padding: "10px",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <img
                                src={
                                  book.bookimage && book.bookimage.length > 0
                                    ? book.bookimage[0]
                                    : "https://via.placeholder.com/150"
                                }
                                alt={book.title}
                                width={"100%"}
                                style={{objectFit: "cover"}}
                              />
                              {/* {(book.isAudiobookAvailable === true || pathname === "audio-books") ? (
                                <button
                                  className="play-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayButtonClick(book);
                                  }}
                                >
                                  ▶
                                </button>
                              ) : book.isEBookAvailable === true || pathname === "e-books" ? (
                                <button
                                  className="ebook-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEBookButtonClick(book);
                                  }}
                                >
                                  📖
                                </button>
                              ) : null} */}


                              {pathname === 'e-books' && book.isEBookAvailable &&
                                <button
                                  className="play-button"
                                  onClick={() => handlePlayButtonClick(book)}
                                >
                                  <i className="pi pi-book"></i>
                                </button>}
                              {/* {pathname === 'audio-books' && book.isAudiobookAvailable && <button
                                className="play-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayButtonClick(book);
                                }}
                              >
                                ▶
                              </button>} */}


                            </div>
                            <div
                              className="book-info"
                              
                            >
                              <div className="d-flex" style={{justifyContent:"space-between"}}>
                                <div>

                                <h6>{book.title}</h6>
                                </div>
                                <div>

                                <span
                                  className="ms-auto"
                                  style={{
                                    fontSize: "12px",
                                    justifyContent: "end",
                                    textAlign: "end",
                                  }}
                                >
                                  {book.userReadingStatus.length > 0
                                    ? (
                                      book.userReadingStatus.reduce(
                                        (sum, item) => sum + item.ratings,
                                        0
                                      ) / book?.userReadingStatus?.length
                                    ).toFixed(1)
                                    : 0}
                                  /5
                                </span>
                                </div>
                              </div>
                              <div
                                className="ratings d-flex" 
                                style={{  fontSize: "12px" ,justifyContent:"space-between"}}
                              >
                                <div>

                                <span>

                                {book?.author}
                                </span>
                                </div>
                                <div>
                                <span
                                  className="ms-auto rate-values"
                                  style={{ fontSize: "4px" }}
                                >
                                  {Array.from({ length: 5 }, (_, index) => {
                                    const rating =
                                      book.userReadingStatus?.length > 0
                                        ? book.userReadingStatus[0].ratings
                                        : 0;
                                    return (
                                      <i
                                        key={index}
                                        className={`pi ${index < rating
                                          ? "pi-star-fill"
                                          : "pi-star"
                                          }`}
                                        style={{
                                          color:
                                            index < rating
                                              ? "#FFCB45"
                                              : "inherit",
                                          fontSize: "12px",
                                        }}
                                      ></i>
                                    );
                                  })}
                                </span>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end profile-contents-button">
                            <Button
                              className="profile-buttonssssss w-100"
                              onClick={() => handlepayoverflow(book, book.isAudiobookAvailable ? "audioBook" : "audioBook")}
                            >
                              Buy Now
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showaudioBooking && (
        <Overlayaudio audioBookingdetails={audioBookingdetails} setShowaudioBooking={setShowaudioBooking} />
      )}

      {/* {showPopup && (
        <div className="popup">
          <div className="popup-content">



            <div className="d-flex">

              <div className="p-2">
                <div className="d-flex">

                  <div>
                    <img src={selectedBook.bookimage[0]} alt="" style={{ height: "100px", objectFit: "cover", borderRadius: "15px", padding: "2px" }} />

                  </div>
                  <div className="my-auto">
                    {console.log(selectedBook)}
                    <h4 className="m-2">{selectedBook.title}</h4>
                  </div>
                </div>
              </div>
              <div style={{ pointerEvents: isDisabled ? "none" : "auto", opacity: isDisabled ? 0.5 : 1 }} className="w-50 ms-auto mt-auto">
                <AudioPlayer
                  ref={audioRef}
                  autoPlay
                  src={selectedBook.audiobookUpload[0]}
                  onPlay={(e) => console.log("onPlay")}
                  onListen={handleTimeUpdate} // Track time and disable after 30 sec
                  controls
                  className="w-100"
                />
              </div>
              <div onClick={() => setShowPopup(false)} className="my-auto ">
                <i className="pi pi-times ms-4 fw-1"></i>
              </div>
            </div>


          </div>
        </div>
      )} */}
    </div>
  );
}