"use client"

import React from "react";
import AboutUs from "../book/about-us/abouts";
import Navbar from "../CommonPages/Navbar/Navbar";
import Footer from "../CommonPages/Footer/footer";

// export const metadata = {
//   title: "Story book online | Kids books online",
//   description:
//     "Discover fun and educational kids' story books online! Read engaging stories for children anytime, anywhere. Perfect for early readers and young imaginations.",
//   keywords: "story book online,kids books online",
// };

export default function Page() {
  return (
    <div>
      <Navbar />
      <AboutUs />
      <Footer />
    </div>
  );
}