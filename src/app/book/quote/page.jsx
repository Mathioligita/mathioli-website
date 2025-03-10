"use client";
import React, { useState, useEffect } from "react";
import "./Quote.css";
import "./newquote.css";

import { QuoteAPi } from "api/page";

export default function Quote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuoteAPi();
        const data = response?.data;
        setItem(data?.Quotes || []); // Ensure default empty array
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchData();
  }, []); // Runs only once when component mounts

  useEffect(() => {
    if (item.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
        setActiveDot((prevDot) => (prevDot + 1) % item.length);
      }, 2000); // Change every 2 seconds

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [item]); // Runs whenever `item` changes

  if (item.length === 0) {
    return (
      <div className="quote-container">
        <div className="quote-card active">
          <div className="slider-header">Today’s Quote</div>
          <div className="quote mt-5" style={{ position: "relative" }}>
            கோபத்திலிருந்து மாயை எழுகிறது. மனம் மாயையால் குழப்பமடைகிறது. மனம்
            குழப்பமடையும்போது பகுத்தறிவு அழிக்கப்படுகிறது.
          </div>
          <div
            className="author text-end me-4"
            style={{ position: "fixed", right: "0" }}
          >
            - Mathioli Gita
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-container">
      <div className="quote-card active">
        <div className="slider-header">Today’s Quote</div>
        <div className="quote mt-5" style={{ position: "relative" }}>
          {item[currentIndex]?.quote}
        </div>
        <div
          className="author text-end me-4"
          style={{ position: "fixed", right: "0" }}
        >
          -{item[currentIndex]?.author}
        </div>
      </div>

      <div className="dots-container">
        {item.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeDot ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
