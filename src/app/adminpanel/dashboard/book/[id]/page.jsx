"use client";
import React from "react";
// import EditBookForm from '../EditBookForm'
import { useParams } from "next/navigation";
import BookForm from "../create/createbook";

export default function page() {
  const { id } = useParams();
  return (
    <div>
      <BookForm id={id} />
    </div>
  );
}
