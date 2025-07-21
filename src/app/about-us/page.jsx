"use client"

import React from "react";
import AboutUs from "./abouts";

import Footer from "../CommonPages/Footer/footer";
import Navbar from "../CommonPages/Navbar/navbar";

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