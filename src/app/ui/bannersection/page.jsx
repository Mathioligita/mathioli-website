"use client";

import React from "react";
import "./BannerSection.css"; // Import the CSS file
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function Bannersection() {
  const router = useRouter();

  return (
    <div className="banner-container">
      <img
        src="/Assert/Frame 287 (1).png"
        alt="Banner"
        className="banner-image"
      />
      <div className="banner-text">
        <span
          style={{
            textAlign: "start",
            color: "#1d5755",
            fontSize: "18px",
            fontWeight: "700",
          }}
          className="ms-auto"
        >
          Uthiradam Books
        </span>
        <h1>
          <span className="line1">
            Read and Dream it
            <p className=" paragrap-banner">
              Immerse in words, unlock adventures, and <br />{" "}
              <span className="paragaada">dream beyond limits.</span>
            </p>
          </span>
        </h1>
        <div className="text-start">
          <Button className="btn-banner" onClick={() => router.push("/book")}>
            Explore Our Books
          </Button>
        </div>
      </div>
    </div>
  );
}
