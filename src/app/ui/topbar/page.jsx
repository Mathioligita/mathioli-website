"use client";
import React from "react";
import BookStoreHeader from "./BookStoreHeader";

export default function Topbars() {
  return (
    <div style={{ top: 0, position: "fixed", zIndex: 999, margin: 0 }}>
      <BookStoreHeader />
    </div>
  );
}
