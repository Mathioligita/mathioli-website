import React from 'react';
import './BannerSection.css'; // Import the CSS file

export default function Bannersection() {
  return (
    <div className="banner-container">
      <img src="../image/Banner image 2.png" alt="Banner" className="banner-image" />
      <div className="banner-text">
        <h1>
          <span className="line1">Read <span style={{fontWeight:"300"}}>and</span></span>
          <span className="line2">Dream it</span>
        </h1>
      </div>
    </div>
  );
}
