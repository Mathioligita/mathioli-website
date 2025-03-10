// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useParams, useRouter } from "next/navigation";
// import { BookAPI, CategoryAPI } from "../../../api/page";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
// import { InputText } from "primereact/inputtext";
// // import "./topselling/[name]/styles.css"; // Import your CSS file
// import { IconField } from "primereact/iconfield";
// import "../book/topselling/bookCard.css";
// import { InputIcon } from "primereact/inputicon";
// import userContext from "../UseContext/UseContext";
// import SkeletonPreloader from "components/SkeletonPreloader";

// export default function Page() {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [globalFilterValue, setGlobalFilterValue] = useState(""); // Initialize with an empty string
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedAuthors, setSelectedAuthors] = useState([]);
//   const [selectedFormats, setSelectedFormats] = useState([]);
//   const [booksData, setBooksData] = useState([]);
//   const { name } = useParams();
//   const { categoriesdata, setCategoriesdata } = useContext(userContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       // for (let i = 0; i < retries; i++) {
//       try {
//         setLoading(true);
//         const response = await CategoryAPI();
//         const data = response?.data?.categories;

//         console.log("Fetched categories data:", data);
//         setCategoriesdata(data);

//         // if (Array.isArray(data) && data.length > 0) {
//         setCategoriesData(data);
//         // }
//         // return; // Exit the function if the request is successful
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           console.warn(
//             `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
//           );
//           await new Promise((resolve) => setTimeout(resolve, delay));
//           delay *= 2; // Exponential backoff
//         } else {
//           console.error("Error fetching categories:", error);
//           // break; // Exit the loop if the error is not a rate limit error
//           // }
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     // if (Array.isArray(categoriesdata) && categoriesdata.length === 0) {
//     fetchCategories();
//     // }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     console.log("Name parameter:", name);
//     if (name && name !== "all") {
//       const category =
//         categoriesdata ||
//         null.find((cat) => cat.name.toLowerCase() === name.toLowerCase());
//       console.log("Selected Category based on name:", category);
//       setSelectedCategory(category);
//       setLoading(false);
//     } else {
//       setSelectedCategory(null);
//       setLoading(false);
//     }
//   }, [name, categoriesData]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await BookAPI();
//         const data = response?.data?.books;
//         setBooksData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [name]);

//   const handleBookClick = (book) => {
//     router.push(`/book/${book.slug}`);
//   };

//   const filteredBooks = booksData?.filter((book) => {
//     const categoryMatch =
//       !selectedCategory ||
//       book?.category?.toLowerCase() === selectedCategory?.name?.toLowerCase();
//     const genreMatch =
//       !selectedGenres?.length || selectedGenres?.includes(book?.genre);
//     const languageMatch =
//       !selectedLanguages?.length || selectedLanguages?.includes(book?.language);
//     const authorMatch =
//       !selectedAuthors?.length || selectedAuthors?.includes(book?.author);
//     const formatMatch =
//       !selectedFormats?.length ||
//       (selectedFormats?.includes("EBook") && book?.isEBookAvailable) ||
//       (selectedFormats?.includes("Audiobook") && book?.isAudiobookAvailable) ||
//       (selectedFormats?.includes("Hard Copy") && book?.isHardCopyAvailable);
//     const globalMatch =
//       book?.title?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       book?.author?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       book?.genre?.toLowerCase().includes(globalFilterValue?.toLowerCase()) ||
//       book?.language?.toLowerCase().includes(globalFilterValue?.toLowerCase());

//     console.log("Category Match for book:", book.title, "is", categoryMatch);
//     return (
//       categoryMatch &&
//       genreMatch &&
//       languageMatch &&
//       authorMatch &&
//       formatMatch &&
//       globalMatch
//     );
//   });

//   const genres = [...new Set(booksData?.map((book) => book?.genre))];
//   const languages = [...new Set(booksData?.map((book) => book?.language))];
//   const authors = [...new Set(booksData?.map((book) => book?.author))];
//   const formats = ["EBook", "Audiobook", "Hard Copy"];

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     setGlobalFilterValue(value);
//   };

//   const renderHeader = () => {
//     return (
//       <div className="table-header">
//         <div className="">
//           <IconField iconPosition="left">
//             <InputIcon className="pi pi-search"> </InputIcon>
//             <InputText
//               type="search"
//               value={globalFilterValue ?? ""} // Ensure the value is set correctly
//               onChange={(e) => onGlobalFilterChange(e)}
//               placeholder="Global Search"
//             />
//           </IconField>
//         </div>
//       </div>
//     );
//   };

//   const header = renderHeader();

//   return (
//     <div className="container mt-4">
//       <div className="mt-5">
//         {/* <div className="col-md-3 col-sm-12">
//           <div className="sidebar-book">
//             <div className="filter-section">
//               <Dropdown
//                 value={selectedCategory ? selectedCategory.name : ""}
//                 options={categoriesData || null}
//                 onChange={(e) =>
//                   setSelectedCategory(
//                     categoriesData?.find(
//                       (cat) =>
//                         cat?.name === e.value ||
//                         cat?.name === e?.target?.value?.name
//                     )
//                   )
//                 }
//                 placeholder="Select a Category"
//                 className="category-select w-100"
//                 optionLabel="name"
//               />
//             </div>
//             <div className="filter-section">
//               <MultiSelect
//                 value={selectedGenres}
//                 options={genres}
//                 onChange={(e) => setSelectedGenres(e.value)}
//                 placeholder="Select Genres"
//                 className="filter-select"
//               />
//             </div>
//             <div className="filter-section">
//               <MultiSelect
//                 value={selectedLanguages}
//                 options={languages}
//                 onChange={(e) => setSelectedLanguages(e.value)}
//                 placeholder="Select Languages"
//                 className="filter-select"
//               />
//             </div>
//             <div className="filter-section">
//               <MultiSelect
//                 value={selectedAuthors}
//                 options={authors}
//                 onChange={(e) => setSelectedAuthors(e.value)}
//                 placeholder="Select Authors"
//                 className="filter-select"
//               />
//             </div>
//             <div className="filter-section">
//               <MultiSelect
//                 value={selectedFormats}
//                 options={formats}
//                 onChange={(e) => setSelectedFormats(e.value)}
//                 placeholder="Select Formats"
//                 className="filter-select"
//               />
//             </div>
//           </div>
//         </div> */}
//         <div className=" mb-4">
//           <div className="main-content mb-4">
//             {header}
//             <div className="book-sdbjd">
//               <Row>
//                 {loading ? (
//                   <Col md={4} lg={2} sm={6} className="d-flex">
//                     <SkeletonPreloader />
//                     <SkeletonPreloader />
//                   </Col>
//                 ) : (
//                   <>
//                     {" "}
//                     {filteredBooks?.map((book) => (
//                       <Col
//                         md={4}
//                         lg={2}
//                         sm={6}
//                         key={book._id}
//                         className=" p-1 p-md-0 book-mobile-card image-card-book"
//                       >
//                         <div
//                           className="book-card"
//                           onClick={() => handleBookClick(book)}
//                         >
//                           <div
//                             className="book-images card text-center"
//                             // style={{
//                             //   flex: "1 0 auto",
//                             //   background: "#ffff",
//                             //   padding: "15px",
//                             //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                             //   borderRadius: "6px",
//                             //   height: "220px",
//                             //   display: "flex",
//                             //   justifyContent: "center",
//                             // }}
//                           >
//                             <img
//                               src={
//                                 book.bookimage && book.bookimage.length > 0
//                                   ? book.bookimage[0]
//                                   : "https://via.placeholder.com/150"
//                               }
//                               alt={book.title}
//                               // width={"100%"}
//                             />
//                           </div>
//                           <div className="book-info mt-2">
//                             <div className="d-flex mt-4">
//                               <h5
//                                 className="mb-0"
//                                 style={{
//                                   fontFamily: "Inter",
//                                   fontSize: "15px",
//                                   fontWeight: "700",
//                                   color: "#4D4D4D",
//                                 }}
//                               >
//                                 {book.title}
//                               </h5>
//                               <span
//                                 className="ms-auto"
//                                 style={{
//                                   fontSize: "10px",
//                                   justifyContent: "end",
//                                   textAlign: "end",
//                                 }}
//                               >
//                                 {book.userReadingStatus.length > 0
//                                   ? (
//                                       book.userReadingStatus.reduce(
//                                         (sum, item) => sum + item.ratings,
//                                         0
//                                       ) / book?.userReadingStatus?.length
//                                     ).toFixed(1)
//                                   : 0}
//                                 /5
//                               </span>
//                             </div>
//                             <div
//                               className="ratings d-flex"
//                               style={{ marginTop: "10px", fontSize: "12px" }}
//                             >
//                               <span>{book?.author}</span>
//                               <span className="ms-auto rate-values">
//                                 {Array.from({ length: 5 }, (_, index) => {
//                                   const rating =
//                                     book.userReadingStatus?.length > 0
//                                       ? book.userReadingStatus[0].ratings
//                                       : 0;
//                                   return (
//                                     <i
//                                       key={index}
//                                       className={`pi ${
//                                         index < rating
//                                           ? "pi-star-fill"
//                                           : "pi-star"
//                                       }`}
//                                       style={{
//                                         color:
//                                           index < rating
//                                             ? "#FFCB45"
//                                             : "inherit",
//                                       }}
//                                     ></i>
//                                   );
//                                 })}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Col>
//                     ))}
//                   </>
//                 )}
//               </Row>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ==========================================================
// ==========================================================
// ==========================================================
// ==========================================================
"use client";
import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { BookAPI, CategoryAPI } from "../../../api/page";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Paginator } from "primereact/paginator";
import userContext from "../UseContext/UseContext";
import SkeletonPreloader from "components/SkeletonPreloader";
import "../book/topselling/bookCard.css";

export default function Page() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const { name } = useParams();
  const { categoriesdata, setCategoriesdata } = useContext(userContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await CategoryAPI();
        const data = response?.data?.categories;
        setCategoriesdata(data);
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (name && name !== "all") {
      const category = categoriesdata?.find(
        (cat) => cat.name.toLowerCase() === name.toLowerCase()
      );
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setLoading(false);
  }, [name, categoriesdata]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await BookAPI();
        const data = response?.data?.books;
        setBooksData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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

    return (
      categoryMatch &&
      genreMatch &&
      languageMatch &&
      authorMatch &&
      formatMatch &&
      globalMatch
    );
  });

  const paginatedBooks = filteredBooks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);

  const genres = [...new Set(booksData?.map((book) => book?.genre))];
  const languages = [...new Set(booksData?.map((book) => book?.language))];
  const authors = [...new Set(booksData?.map((book) => book?.author))];
  const formats = ["EBook", "Audiobook", "Hard Copy"];

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  const renderHeader = () => {
    return (
      <div className="table-header">
        <div className="">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              type="search"
              value={globalFilterValue ?? ""}
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
    <div>
      {loading ? (
        <section>
          <div className="container mt-4">
            <div className="mt-5">
              <div className="mb-4">
                <div className="main-content mb-4">
                  <div className="book-sdbjd">
                    <Row>
                      <Col
                        md={4}
                        lg={2}
                        sm={6}
                        className="p-1 p-md-0 book-mobile-card image-card-book"
                      >
                        <SkeletonPreloader />
                      </Col>
                      <Col
                        md={4}
                        lg={2}
                        sm={6}
                        className="p-1 p-md-0 book-mobile-card image-card-book"
                      >
                        <SkeletonPreloader />
                      </Col>
                      <Col
                        md={4}
                        lg={2}
                        sm={6}
                        className="p-1 p-md-0 book-mobile-card image-card-book"
                      >
                        <SkeletonPreloader />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container mt-4">
          <div className="mt-5">
            <div className="mb-4">
              <div className="main-content mb-4">
                {header}
                <div className="book-sdbjd">
                  <Row>
                    {filteredBooks.length > 0 ? (
                      paginatedBooks?.map((book) => (
                        <Col
                          md={4}
                          lg={2}
                          sm={6}
                          key={book._id}
                          className="p-1 p-md-0 book-mobile-card image-card-book"
                        >
                          <div
                            className="book-card"
                            onClick={() => handleBookClick(book)}
                          >
                            <div className="book-images card text-center">
                              <img
                                src={
                                  book.bookimage && book.bookimage.length > 0
                                    ? book.bookimage[0]
                                    : "https://via.placeholder.com/150"
                                }
                                alt={book.title}
                              />
                            </div>
                            <div className="book-info mt-2">
                              <div className="d-flex mt-4">
                                <h5
                                  className="mb-0"
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
                                    fontSize: "10px",
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
                              </div>
                              <div
                                className="ratings d-flex"
                                style={{ marginTop: "10px", fontSize: "12px" }}
                              >
                                <span>{book?.author}</span>
                                <span className="ms-auto rate-values">
                                  {Array.from({ length: 5 }, (_, index) => {
                                    const rating =
                                      book.userReadingStatus?.length > 0
                                        ? book.userReadingStatus[0].ratings
                                        : 0;
                                    return (
                                      <i
                                        key={index}
                                        className={`pi ${
                                          index < rating
                                            ? "pi-star-fill"
                                            : "pi-star"
                                        }`}
                                        style={{
                                          color:
                                            index < rating
                                              ? "#FFCB45"
                                              : "inherit",
                                        }}
                                      ></i>
                                    );
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <div className="no-books-message">
                        <p>Sorry, no books are available at the moment.</p>
                        <p>
                          Please check back later, as new books are added
                          regularly.
                        </p>
                        <p>
                          In the meantime, explore our other sections or let us
                          know what you'd like to see!
                        </p>
                      </div>
                    )}
                  </Row>
                  {totalPages > 1 && (
                    <Paginator
                      first={currentPage}
                      rows={itemsPerPage}
                      totalRecords={filteredBooks.length}
                      onPageChange={onPageChange}
                    ></Paginator>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
