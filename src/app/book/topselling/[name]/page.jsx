"use client";
import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { BookAPI, CategoryAPI } from "../../../../../api/page";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
// import "./styles.css"; // Import your CSS file
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import userContext from "../../../UseContext/UseContext";
import "../BookCard.css";
export default function Page() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState(""); // Initialize with an empty string
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [topSellingBooks, setTopSellingBooks] = useState([]);
  const { name } = useParams();
  const { categoriesdata, setCategoriesdata } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryAPI();
        const data = response?.data?.categories;
        console.log("Fetched categories data:", data);
        setCategoriesdata(data || null);
        setCategoriesData(data || null);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("Name parameter:", name);
    if (name && name !== "all") {
      const category = categoriesdata.find(
        (cat) => cat.name.toLowerCase() === name.toLowerCase()
      );
      console.log("Selected Category based on name:", category);
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [name, categoriesData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookAPI();
        const data = response?.data?.books;
        console.log("Fetched books data:", data);
        setBooksData(data); // Set the fetched data to the state

        // Filter top selling books
        const topSelling = data.filter((book) => book.isTopSelling);
        console.log("Top Selling Books:", topSelling);
        setTopSellingBooks(topSelling);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [name]);

  const handleBookClick = (book) => {
    router.push(`/book/${book.slug}`);
  };

  const filteredBooks = booksData?.filter((book) => {
    const categoryMatch =
      !selectedCategory ||
      book?.category?.toLowerCase() === selectedCategory?.name?.toLowerCase();
    const genreMatch =
      !selectedGenres?.length || selectedGenres?.includes(book?.genre);
    const languageMatch =
      !selectedLanguages?.length || selectedLanguages?.includes(book?.language);
    const authorMatch =
      !selectedAuthors?.length || selectedAuthors?.includes(book?.author);
    const formatMatch =
      !selectedFormats?.length ||
      (selectedFormats?.includes("EBook") && book?.isEBookAvailable) ||
      (selectedFormats?.includes("Audiobook") && book?.isAudiobookAvailable) ||
      (selectedFormats?.includes("Hard Copy") && book?.isHardCopyAvailable);
    const globalMatch =
      book?.title?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
      book?.author?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
      book?.genre?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
      book?.language?.toLowerCase().includes(globalFilterValue?.toLowerCase());

    console.log("Category Match for book:", book.title, "is", categoryMatch);
    return (
      categoryMatch &&
      genreMatch &&
      languageMatch &&
      authorMatch &&
      formatMatch &&
      globalMatch
    );
  });

  const genres = [...new Set(topSellingBooks?.map((book) => book?.genre))];
  const languages = [
    ...new Set(topSellingBooks?.map((book) => book?.language)),
  ];
  const authors = [...new Set(topSellingBooks?.map((book) => book?.author))];
  const formats = ["EBook", "Audiobook", "Hard Copy"];

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="table-header">
        <div className="">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              type="search"
              value={globalFilterValue ?? ""} // Ensure the value is set correctly
              onChange={(e) => onGlobalFilterChange(e)}
              placeholder="Global Search"
            />
          </IconField>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="container mt-4">
      <div className="row mt-5">
        {/* <div className="col-md-9"> */}
        <div className="main-content">
          {header}
          <div className="book-sdbjd">
            <Row>
              {filteredBooks?.map((book) => (
                <Col
                  md={4}
                  lg={2}
                  sm={6}
                  key={book._id}
                  className=" p-1 p-md-0 book-mobile-card image-card-book"
                >
                  <div
                    className="book-card"
                    onClick={() => handleBookClick(book)}
                    // style={{
                    //   cursor: "pointer",
                    //   justifyContent: "space-between",
                    //   marginBottom: "20px",
                    //   borderRadius: "10px",
                    //   flexDirection: "column",
                    // }}
                  >
                    <div
                      className="book-images card text-center"
                      // style={{
                      //   flex: "1 0 auto",
                      //   background: "#ffff",
                      //   padding: "15px",
                      //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      //   borderRadius: "6px",
                      //   height: "220px",
                      //   display: "flex",
                      //   justifyContent: "center",
                      // }}
                    >
                      <img
                        src={
                          book.bookimage && book.bookimage.length > 0
                            ? book.bookimage[0]
                            : "https://via.placeholder.com/150"
                        }
                        // style={{margin: '-2px'}}
                        alt={book.title}
                        // width={"100%"}
                      />
                    </div>
                    <div className="book-info">
                      {/* <div className="d-flex" style={{ position: "relative" }}>
                        <h5
                          className="mb-2 hoverbooks-title-2"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#4D4D4D",
                          }}
                        >
                          {book.title.split(" ")[0] + "..."}
                        </h5>
                        <h5
                          className="mb-2    hoverbooks-title"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#4D4D4D",
                          }}
                        >
                          {book.title}
                        </h5>
                        <span
                          className="ms-auto"
                          style={{
                            fontSize: "12px",
                            justifyContent: "end",
                            textAlign: "end",
                          }}
                        >
                          {book.userReadingStatus.length > 0
                            ? (
                                book.userReadingStatus.reduce(
                                  (sum, item) => sum + item.ratings,
                                  0
                                ) / book?.userReadingStatus?.length
                              ).toFixed(1)
                            : 0}
                          /5
                        </span>
                      </div> */}
                      <div className="d-flex book-value-gamda" style={{ position: "relative" }}>
                        <h5
                          className="mb-2 hoverbooks-title-2"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#4D4D4D",
                          }}
                        >
                          {book.title.split(" ")[0] + "..."}
                        </h5>
                        <h5
                          className="mb-2 hoverbooks-title"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#4D4D4D",
                          }}
                        >
                          {book.title}
                        </h5>
                      </div>
                      <div
                        className="ratings d-flex"
                        style={{ marginTop: "10px", fontSize: "12px" }}
                      >
                        <span>{book?.author}</span>
                        <span
                          className="ms-auto rate-values"
                          style={{ fontSize: "9px" }}
                        >
                          {Array.from({ length: 5 }, (_, index) => {
                            const rating =
                              book.userReadingStatus?.length > 0
                                ? book.userReadingStatus[0].ratings
                                : 0;
                            return (
                              <i
                                key={index}
                                className={`pi ${
                                  index < rating ? "pi-star-fill" : "pi-star"
                                }`}
                                style={{
                                  color: index < rating ? "#FFCB45" : "inherit",
                                  fontSize: "12px",
                                  margin: "1px",
                                }}
                              ></i>
                            );
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
