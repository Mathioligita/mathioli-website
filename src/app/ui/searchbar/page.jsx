"use client";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./searchbar.css";
import { searchbarGet, SearchLog } from "../../../../api/page";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const SearchInput = ({ setShow }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const handleViewAll = () => {
    setShowAll(true);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = searchValue;
    const response = await searchbarGet(data);
    console.log(response);
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
  };

  const itemsToShow = searchResults.Trending_searches?.filter((item) => {
    const matchesSearchValue =
      item?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.tags?.includes(searchValue);
    return matchesSearchValue;
  }).slice(0, showAll ? undefined : 9);

  return (
    <div className="search-overlay">
      <div className="search-container ">
        <div className="search-input-container">
          <i className="pi pi-search search-icon"></i>
          <InputText
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a book title, series, author, narrator or tag"
            className="search-input"
          />
          {searchValue && (
            <i className="pi pi-times clear-icon" onClick={clearInput}></i>
          )}
        </div>

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
                router.push(`/book/${item?.slug}`), setShow(false);
              }}
            >
              {/* {console.log(item,"item")} */}
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
            <Button onClick={handleViewAll}>View All</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
