"use client";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./searchbar.css";
import { BookAPI, searchbarGet, SearchLog } from "../../../../api/page";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";

const SearchInput = ({ setShow }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const router = useRouter();
  const [bookdata, setBooksData] = useState([]);

  const handleViewAll = () => {
    setShowAll(true);
  };

  const clearInput = () => {
    setSearchValue("");
    setBookResults([]);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;

    try {
      const response = await searchbarGet(searchValue);
      setBookResults(response.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setBookResults([]);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await SearchLog();
      setSearchResults(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlesubmit(e);
    }
  };

  const handleTagClick = (tag) => {
    setSearchValue(tag);
    // Trigger search immediately when a tag is clicked
    const event = { preventDefault: () => {} };
    handlesubmit(event);
  };

  // Filter books based on search value
  const filteredBooks = bookdata.filter((book) => {
    return (
      book?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchValue.toLowerCase()) ||
      book?.tags?.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });

  // Items to show for trending searches
  const itemsToShow = searchResults.Trending_searches?.filter((item) => {
    const matchesSearchValue =
      item?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.tags?.includes(searchValue);
    return matchesSearchValue;
  }).slice(0, showAll ? undefined : 9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookAPI();
        const data = response?.data?.books;
        const sortedBooks = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBooksData(sortedBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="search-overlay">
      <button
        className="close-search-button"
        onClick={() => setShow(false)}
        aria-label="Close search"
      >
        <i className="pi pi-times"></i>
      </button>
      <div className="search-container ">
        <div className="search-input-container">
          <i className="pi pi-search search-icon"></i>
          <InputText
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (e.target.value === "") {
                setBookResults([]);
              }
            }}
            onKeyPress={handleKeyPress}
            placeholder="Search for a book title, series, author, narrator or tag"
            className="search-input"
          />
          {searchValue && (
            <i className="pi pi-times clear-icon" onClick={clearInput}></i>
          )}
        </div>

        {/* Show book search results first if they exist */}
        {bookResults.length > 0 || filteredBooks.length > 0 ? (
          <div className="book-results-container">
            <h6 className="trending-title">Search Results</h6>

            <Row className="gap-2">
              {(bookResults.length > 0 ? bookResults : filteredBooks).map(
                (item, index) => (
                  <Col sm={12} md={2}>
                    <div
                      key={index}
                      className="trending-search"
                      onClick={() => {
                        router.push(`/book/${item?.slug}`);
                        setShow(false);
                      }}
                    >
                      <img
                        src={item.bookimage[0]}
                        alt={item.title}
                        className="trending-search-image"
                        style={{ width: "70px", height: "80px" }}
                      />
                      <div className="trending-search-details">
                        <h6>{item.title}</h6>
                        <p>{item.author}</p>
                      </div>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </div>
        ) : (
          <>
            {/* Only show trending tags and searches if no book results */}
            <h6 className="trending-title">Trending tags</h6>
            <div className="trending-tags-container">
              {searchResults?.Trending_tags?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="trending-tag"
                    onClick={() => handleTagClick(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            <h6 className="trending-title">Trending searches</h6>
            <div className="trending-searches-container">
              {itemsToShow?.map((item, index) => (
                <div
                  key={index}
                  className="trending-search"
                  onClick={() => {
                    router.push(`/book/${item?.slug}`);
                    setShow(false);
                  }}
                >
                  <img
                    src={item.bookimage[0]}
                    alt={item.title}
                    className="trending-search-image"
                    style={{ width: "70px", height: "80px" }}
                  />
                  <div className="trending-search-details">
                    <h6>{item.title}</h6>
                    <p>{item.author}</p>
                  </div>
                </div>
              ))}
              {!showAll && searchResults?.Trending_searches?.length > 9 && (
                <div className="ms-auto">
                  <Button
                    onClick={handleViewAll}
                    style={{
                      background: "rgb(29, 87, 85)",
                      fontSize: "12px",
                      border: "1px solid rgb(29, 87, 85)",
                      borderRadius: "6px",
                    }}
                  >
                    View All
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
