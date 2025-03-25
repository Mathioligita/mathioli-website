"use client";

import React, { useEffect, useState, memo, useContext } from "react";
import Booksview from "./Booksview";
import TabView from "./TabView";
import userContext from "../../UseContext/UseContext";
import { BookAPI, CategoryAPI } from "../../../../api/page";
// import SkeletonPreloader from "../../components/SkeletonPreloader";
import { Col, Row } from "react-bootstrap";

const MemoizedTabView = memo(({ data, book }) => {
  return (
    <div>
      <TabView data={data} book={book} />
    </div>
  );
});

MemoizedTabView.displayName = "MemoizedTabView"; // Adding display name

const MemoizedBooksView = memo(({ book }) => {
  return (
    <div>
      <Booksview book={book} />
    </div>
  );
});

MemoizedBooksView.displayName = "MemoizedBooksView"; // Adding display name

export default function BooksAPI() {
  const [state, setState] = useState({
    data: [],
    book: [],
  });

  const { setBooksData, setCategoriesdata } = useContext(userContext);

  const fetchWithRetry = async (apiCall, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await apiCall();
        return response;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.warn(
            `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw error;
        }
      }
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetchWithRetry(BookAPI);
      const books = response?.data?.books;
      setBooksData(books);
      setState((prevState) => {
        if (JSON.stringify(books) !== JSON.stringify(prevState.book)) {
          return {
            ...prevState,
            book: books,
          };
        }
        return prevState;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchWithRetry(CategoryAPI);
      const categories = response?.data?.categories;
      setCategoriesdata(categories);
      setState((prevState) => {
        if (JSON.stringify(categories) !== JSON.stringify(prevState.data)) {
          return {
            ...prevState,
            data: categories,
          };
        }
        return prevState;
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const { data, book } = state;

  return (
    <div>
      <MemoizedTabView data={data} book={book} />
      {/* <MemoizedBooksView book={book} /> */}
    </div>
  );
}
