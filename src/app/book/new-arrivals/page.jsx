"use client";
import React, { useEffect, useState, useRef } from "react";
import "./newarrivals.scss";
import { Newarrival } from "api/page";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("newRelease");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const router = useRouter();

  const handlefetch = async () => {
    try {
      const response = await Newarrival();
      if (response) {
        setData(response?.data?.newArrivalbooks || []);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch new arrivals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleBookClick = (item) => {
    router.push(`/book/${item.id}`);
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="tab-container">
      {/* Tab Buttons */}
      <div className="tab-buttons ms-3">
        <button
          className={`new-arrivals-title ${
            activeTab === "newRelease" ? "active" : ""
          } `}
          onClick={() => setActiveTab("newRelease")}
          disabled={activeTab === "newRelease"}
          style={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderTop: "0px",
            borderLeft: "0px",
            borderRight: "0px",
            borderRadius: "none",
            border: "none",
          }}
        >
          {activeTab ? " New Arrivals" : "Recent Episodes"}
        </button>
        <button
          className={`new-arrivals-title ${
            activeTab === "recentEpisodes" ? "active" : ""
          }  ms-0`}
          onClick={() => setActiveTab("recentEpisodes")}
          disabled={activeTab === "recentEpisodes"}
          style={{
            border: "none",
            borderTopRightRadius: "0px",
            borderTop: "0px",
            borderRight: "0px",
            borderLeft: "0px",
            borderBottomRightRadius: "0px",
          }}
        >
          {activeTab ? "Recent Episodes" : " New Arrivals"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Slider Section */}
      <div className="tab-content">
        <FaArrowLeft className="slider-arrow left" onClick={slideLeft} />
        <Row className="bmc-book">
          {activeTab === "newRelease" && (
            <div className="slider-container gap-3" ref={sliderRef}>
              {loading ? (
                <p>Loading...</p>
              ) : data.length === 0 ? (
                <p>No new arrivals available.</p>
              ) : (
                data.map((item, index) => (
                  <Col key={index} lg={2} md={3} sm={3} className="text-center">
                    <div className="book-mobile-card">
                      <div className="new-arrivals-item new-books">
                        <img
                          src={item.bookimage}
                          alt={`New Arrival ${item.title}`}
                          className="new-arrivals-img"
                          onClick={() => handleBookClick(item)}
                        />
                      </div>
                    </div>
                  </Col>
                ))
              )}
            </div>
          )}
        </Row>
        {/* {activeTab === "recentEpisodes" && (
          <div className="slider-container" ref={sliderRef}>
            <p style={{ textAlign: "center", padding: "10px", paddingTop: "20px"}}>
              No Data
            </p>
          </div>
        )} */}
        {activeTab === "recentEpisodes" && (
          <div className="slider-container" ref={sliderRef}>
            <div>
              <h4>Stay Tuned for Recent Episodes</h4>
              <p>Currently, there are no recent episodes available.</p>
              <p>
                Check back soon, as new episodes will be added here as they
                become available.
              </p>
            </div>
          </div>
        )}

        <FaArrowRight className="slider-arrow right" onClick={slideRight} />
      </div>
    </div>
  );
};

export default TabComponent;
