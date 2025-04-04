"use client";
import React from "react";
// import EditBookForm from "../EditBookForm";
import { useParams } from "next/navigation";
import Bookdetailpage from "../../Bookdetailpage";

export default function page() {
  const { id } = useParams();
  return (
    <div>
      <Bookdetailpage id={id} />
    </div>
  );
}
