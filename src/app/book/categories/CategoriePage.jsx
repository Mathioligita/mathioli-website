
// "use client";

// import React, { useState, useEffect, useContext } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { BookAPI, CategoryAPI } from "../../../../api/page";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import "../topselling/[name]/styles.css"
// import userContext from "../../UseContext/UseContext";

// export default function CategoriePage() {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [globalFilterValue, setGlobalFilterValue] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedAuthors, setSelectedAuthors] = useState([]);
//   const [selectedFormats, setSelectedFormats] = useState([]);
//   const [booksData, setBooksData] = useState([]);
//   const router = useRouter();
//   const { categoriesdata, setCategoriesdata } = useContext(userContext);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await CategoryAPI();
//         const data = response?.data?.categories;

//         console.log("Fetched categories data:", data);
//         setCategoriesdata(data || null);

//         if (Array.isArray(data) && data.length > 0) {
//           setCategoriesData(data || null);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     if (Array.isArray(categoriesdata) && categoriesdata.length === 0) {
//       fetchCategories();
//     }
//   }, []);
//   useEffect(() => {

//     const fetchData = async () => {
//       try {

//         const response = await BookAPI();
//         const data = response?.data?.books;
//         setBooksData(data);

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

    
//     fetchData();
//   }, []);



//   const handleBookClick = (book) => {
//     router.push(`/book/${book.slug}`);
//   };

//   const filteredBooks = booksData.filter((book) => {
//     const categoryMatch =
//       !selectedCategory ||
//       book.category.toLowerCase() === selectedCategory.name.toLowerCase();
//     const genreMatch =
//       !selectedGenres.length || selectedGenres.includes(book.genre);
//     const languageMatch =
//       !selectedLanguages.length || selectedLanguages.includes(book.language);
//     const authorMatch =
//       !selectedAuthors.length || selectedAuthors.includes(book.author);
//     const formatMatch =
//       !selectedFormats.length ||
//       (selectedFormats.includes("EBook") && book.isEBookAvailable) ||
//       (selectedFormats.includes("Audiobook") && book.isAudiobookAvailable) ||
//       (selectedFormats.includes("Hard Copy") && book.isHardCopyAvailable);
//     const globalMatch =
//       book.title.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
//       book.author.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
//       book.genre.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
//       book.language.toLowerCase().includes(globalFilterValue.toLowerCase());

//     return (
//       categoryMatch &&
//       genreMatch &&
//       languageMatch &&
//       authorMatch &&
//       formatMatch &&
//       globalMatch
//     );
//   });

//   const genres = [...new Set(booksData.map((book) => book?.genre))];
//   const languages = [...new Set(booksData.map((book) => book?.language))];
//   const authors = [...new Set(booksData.map((book) => book?.author))];
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
//               value={globalFilterValue ?? ""}
//               onChange={(e) => onGlobalFilterChange(e)}
//               placeholder="Global Search"
//             />
//           </IconField>
//         </div>
//       </div>
//     );
//   };

//   const header = renderHeader();

//   // Group books by category
//   const groupedBooks = filteredBooks.reduce((acc, book) => {
//     const category = book.category;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(book);
//     return acc;
//   }, {});

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {/* <div className="col-md-3 col-sm-12">
//           <div className="sidebar-book">
//             <div className="filter-section">
//               <Dropdown
//                 value={selectedCategory ? selectedCategory.name : ""}
//                 options={categoriesData}
//                 onChange={(e) =>
//                   setSelectedCategory(
//                     categoriesData.find(
//                       (cat) => cat.name === e?.target?.value?.name
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
//         <div className="col-md-9 mb-4">
//           <div className="main-content">
//             {header}
//             <div className="book-sdbjd">
//               {Object.keys(groupedBooks).map((category) => (
//                 <div key={category}>
//                   <h3>{category}</h3>
//                   <Row>
//                     {groupedBooks[category].map((book) => (
//                       <Col md={6} lg={3} sm={6} key={book._id}>
//                         <div
//                           className="book-card"
//                           onClick={() => handleBookClick(book)}
//                           style={{
//                             cursor: "pointer",
//                             justifyContent: "space-between",
//                             padding: "15px",
//                             marginBottom: "20px",
//                             borderRadius: "10px",
//                             flexDirection: "column",
//                           }}
//                         >
//                           <div
//                             className="book-images"
//                             style={{
//                               flex: "1 0 auto",
//                               background: "#ffff",
//                               boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                               borderRadius: "6px",
//                               padding: "15px",
//                               display: "flex",
//                               justifyContent: "center"
//                             }}
//                           >
//                             <img
//                               src={
//                                 book.bookimage && book.bookimage.length > 0
//                                   ? book.bookimage[0]
//                                   : "https://via.placeholder.com/150"
//                               }
//                               alt={book.title}
//                               width={"100%"}
//                             />
//                           </div>
//                           <div className="book-info mt-4">
//                             <div className="d-flex">
//                               <h6>{book.title}</h6>
//                               <span
//                                 className="ms-auto"
//                                 style={{
//                                   fontSize: "12px",
//                                   justifyContent: "end",
//                                   textAlign: "end",
//                                 }}
//                               >
//                                 {book.userReadingStatus.length > 0
//                                   ? (
//                                     book.userReadingStatus.reduce(
//                                       (sum, item) => sum + item.ratings,
//                                       0
//                                     ) / book?.userReadingStatus?.length
//                                   ).toFixed(1)
//                                   : 0}
//                                 /5
//                               </span>
//                             </div>
//                             <div
//                               className="ratings mt-3 d-flex"
//                               style={{  fontSize: "12px" }}
//                             >
//                               <span>

//                               {book?.author}
//                               </span>
//                               <span className="ms-auto" style={{ fontSize: "4px" }}>
//                                 {Array.from({ length: 5 }, (_, index) => {
//                                   const rating =
//                                     book.userReadingStatus?.length > 0
//                                       ? book.userReadingStatus[0].ratings
//                                       : 0;
//                                   return (
//                                     <i
//                                       key={index}
//                                       className={`pi ${index < rating ? "pi-star-fill" : "pi-star"
//                                         }`}
//                                       style={{
//                                         color:
//                                           index < rating ? "#FFCB45" : "inherit",
//                                         fontSize: "12px",
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
//                   </Row>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



