
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import "../../audio-books/audio.css";
import { booksId } from "../../../../../api/page";
import { Col, Row, Nav } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "react-h5-audio-player/lib/styles.css";
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

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("episodes");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const audioRef = useRef(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const { Download, Print, OpenFile, ...rest } = slots;
          return <>{Object.values(rest).map((slot, index) => <div key={index}>{slot}</div>)}</>;
        }}
      </Toolbar>
    ),
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;

      try {
        const response = await retryFetch(() => booksId(id));
        setData(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("An error occurred while fetching book details.");
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.getCurrentTime();
      if (currentTime > 30) {
        setIsDisabled(true);
      }
    }
  };

  const openPopup = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    setIsDisabled(false);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const newimage = data?.book?.bookimage[0];
  console.log(newimage, "newimage");

  return (
    <div className="book-page">
      <div className="book-page-container ">
        <Row>
          <Col md={2}>
            <img src={newimage} alt="Book Cover" />
          </Col>
          <Col md={10}>
            <div className="book-details">
              <h3 className="book-title">{data?.book?.title}</h3>
              <p className="book-info">
                <strong>by {data?.book?.author}</strong>
              </p>
              <p className="book-info">Audiobook</p>
              <p className="book-info">
                ${data?.book?.price} ({data?.book?.quantity} copies available)
              </p>
              <p className="book-info">{data?.book?.description}</p>
              {/* <button className="listen-button">Listen</button> */}
            </div>
          </Col>
        </Row>

        <Nav
          variant="tabs"
          className="text-start"
          defaultActiveKey="details"
          onSelect={(k) => setActiveTab(k)}
        >
          <Nav.Item>
            <Nav.Link eventKey="episodes">Episodes</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="start">
          {activeTab === "episodes" && (
            <div className="episodes-container">
              {data?.book?.EbookUpload?.map((audio, index) => (
                <div
                  key={index}
                  className="episode-card"
                  style={{
                    backgroundImage: `url(${newimage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() =>
                    openPopup({ ...data.book, EbookUpload: [audio] })
                  }
                >
                  <p>Episode {index + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="d-flex">
              <div className="p-2">
                <div className="d-flex">
                  <div>
                    <img
                      src={selectedBook.bookimage[0]}
                      alt=""
                      style={{
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "15px",
                        padding: "2px",
                      }}
                    />
                  </div>
                  <div className="my-auto">
                    <h4 className="m-2">{selectedBook.title}</h4>
                  </div>
                </div>
              </div>
              <div
                style={{
                  pointerEvents: isDisabled ? "none" : "auto",
                  opacity: isDisabled ? 0.5 : 1,
                }}
                className="w-50 ms-auto mt-auto"
              >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={selectedBook.audiobookUpload}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
                {/* <AudioPlayer
                  ref={audioRef}
                  autoPlay
                  src={selectedBook.audiobookUpload}
                  onPlay={(e) => console.log("onPlay")}
                  onListen={handleTimeUpdate} // Track time and disable after 30 sec
                  controls
                  className="w-100"
                /> */}
              </div>
              <div onClick={() => setShowPopup(false)} className="my-auto ">
                <i className="pi pi-times ms-4 fw-1"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
