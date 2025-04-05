// "use client";
// import React, { useState, useRef } from "react";
// import Booksview from "./Booksview";
// import "./topselling.css";
// import { useRouter } from "next/navigation";
// import { Button } from "primereact/button";
// import { Skeleton } from "primereact/skeleton";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function TabView({ data, book }) {
//   const [activeTab, setActiveTab] = useState("All");
//   const router = useRouter();
//   const scrollContainerRef = useRef(null);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab.category);
//   };

//   const getBooksByCategory = (category) => {
//     return category === "All"
//       ? book
//       : book.filter((b) => b.category === category);
//   };

//   const scrollTabs = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 100;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleviwall = () => {
//     router.push(`/book/topselling`);
//   };
//   const locations = typeof window !== "undefined" ? location.pathname : null;
//   console.log(locations, "locations");
//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
//       <div className="d-flex align-items-center mb-2">
//         <span className="Top-selling">Top Selling</span>

//         {locations === "/book/topselling" ? null : (
//           <Button
//             className="top-selling-showall"
//             onClick={handleviwall}
//             style={{ border: "1px solid gray" }}
//           >
//             Show All
//           </Button>
//         )}
//       </div>

//       <div className="top-selling-tabs-container">
//         {/* Left Scroll Button */}
//         <FaChevronLeft
//           className="scroll-icon left"
//           onClick={() => scrollTabs("left")}
//         />

//         <div className="top-selling-tabs " ref={scrollContainerRef}>
//           <div
//             key="All"
//             onClick={() => handleTabClick({ name: "All" })}
//             className={`tab-item ${activeTab === "All" ? "active" : ""}`}
//             style={{
//               padding: "10px 20px",
//               cursor: "pointer",
//               backgroundColor:
//                 activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
//               color: activeTab === "All" ? "white" : "#969696",
//               borderRadius: "40px",
//               // marginRight: "10px",
//               marginLeft: "24px",
//               fontWeight: "bold",
//             }}
//           >
//             All
//           </div>

//           {book?.length > 0 ? (
//             book.map((tab) => (
//               <div
//                 style={{
//                   padding: "10px 20px",
//                   cursor: "pointer",
//                   backgroundColor:
//                     activeTab === tab.category ? "#1D5755" : "rgb(241, 239, 239)",
//                   color: activeTab === tab.category ? "white" : "#969696",
//                   borderRadius: "40px",
//                   marginRight: "10px",
//                   fontWeight: "bold",
//                 }}
//                 key={tab.category}
//                 onClick={() => handleTabClick(tab)}
//                 className={`tab-item ${activeTab === tab.category ? "active" : ""}`}
//               >
//                 {tab.category}
//               </div>
//             ))
//           ) : (
//             <div className="tab-skeletons d-flex">
//               <Skeleton
//                 width="6rem"
//                 height="3rem"
//                 borderRadius="40px"
//                 className="me-2"
//               />
//               <Skeleton width="6rem" height="3rem" borderRadius="40px" />
//             </div>
//           )}
//         </div>

//         {/* Right Scroll Button */}
//         <FaChevronRight
//           className="scroll-icon right"
//           onClick={() => scrollTabs("right")}
//         />
//       </div>

//       {/* Books List */}
//       <div>
//         <Booksview book={{ books: getBooksByCategory(activeTab) }} />
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useRef } from "react";
import Booksview from "./Booksview";
import "./topselling.css";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TabView({ data, book }) {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  const getBooksByCategory = (category) => {
    return category === "All"
      ? book
      : book.filter((b) => b.category === category);
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 202;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleviwall = () => {
    router.push(`/book/topselling`);
  };

  const locations = typeof window !== "undefined" ? location.pathname : null;
  // console.log(locations, "locations");

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(book?.map((b) => b.category)));

  return (
    <div className="sm-ss-container">
      <div
        className="ms-0 ms-md-5 p-2 p-md-0 mt-4"
        style={{ overflow: "hidden" }}
      >
        <div
          className="d-flex align-items-center mb-2"
          style={{ justifyContent: "space-between" }}
        >
          <span className="Top-selling">Mathioli List of Books </span>

          {locations === "/book/topselling" ? null : (
            <Button
              className="top-selling-showall ms-auto"
              onClick={handleviwall}
              style={{ border: "1px solid gray" }}
            >
              Show All
            </Button>
          )}
        </div>

        <div className="top-selling-tabs-container">
          {/* Left Scroll Button */}
          <FaChevronLeft
            className="scroll-icon left"
            onClick={() => scrollTabs("left")}
          />

          <div className="top-selling-tabs " ref={scrollContainerRef}>
            <div
              key="All"
              onClick={() => handleTabClick("All")}
              className={`tab-item ${activeTab === "All" ? "active" : ""}`}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
                color: activeTab === "All" ? "white" : "#969696",
                borderRadius: "40px",
                marginLeft: "24px",
                fontWeight: "bold",
              }}
            >
              All
            </div>

            {uniqueCategories.length > 0 ? (
              uniqueCategories.map((category) => (
                <div
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTab === category ? "#1D5755" : "rgb(241, 239, 239)",
                    color: activeTab === category ? "white" : "#969696",
                    borderRadius: "40px",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                  key={category}
                  onClick={() => handleTabClick(category)}
                  className={`tab-item ${
                    activeTab === category ? "active" : ""
                  }`}
                >
                  {category}
                </div>
              ))
            ) : (
              <div className="tab-skeletons d-flex">
                <Skeleton
                  width="6rem"
                  height="3rem"
                  borderRadius="40px"
                  className="me-2"
                />
                <Skeleton width="6rem" height="3rem" borderRadius="40px" />
              </div>
            )}
          </div>

          {/* Right Scroll Button */}
          <FaChevronRight
            className="scroll-icon right"
            onClick={() => scrollTabs("right")}
          />
        </div>

        {/* Books List */}
        <div>
          <Booksview book={{ books: getBooksByCategory(activeTab) }} />
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useRef, useEffect } from "react";
// import Booksview from "./Booksview";
// import "./topselling.css";
// import { useRouter } from "next/navigation";
// import { Button } from "primereact/button";
// import { Skeleton } from "primereact/skeleton";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function TabView({ data, book }) {
//   const [activeTab, setActiveTab] = useState("All");
//   const router = useRouter();
//   const scrollContainerRef = useRef(null);
//   const [showScrollIcons, setShowScrollIcons] = useState(false);

//   const handleTabClick = (category) => {
//     setActiveTab(category);
//   };

//   const getBooksByCategory = (category) => {
//     return category === "All"
//       ? book
//       : book.filter((b) => b.category === category);
//   };

//   const scrollTabs = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 100;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleviwall = () => {
//     router.push(`/book/topselling`);
//   };

//   const locations = typeof window !== "undefined" ? location.pathname : null;
//   console.log(locations, "locations");

//   // Extract unique categories
//   const uniqueCategories = Array.from(new Set(book?.map((b) => b.category)));

//   useEffect(() => {
//     const checkScrollIconsVisibility = () => {
//       if (scrollContainerRef.current) {
//         const tabs = scrollContainerRef.current.children;
//         const targetIndex = 6; // The index you want to check visibility for

//         if (tabs[targetIndex]) {
//           const targetPosition = tabs[targetIndex].offsetLeft;
//           const containerWidth = scrollContainerRef.current.offsetWidth;
//           const isVisible =
//             targetPosition >= scrollContainerRef.current.scrollLeft &&
//             targetPosition <
//               scrollContainerRef.current.scrollLeft + containerWidth;

//           setShowScrollIcons(!isVisible);
//         }
//       }
//     };

//     checkScrollIconsVisibility();
//     window.addEventListener("resize", checkScrollIconsVisibility);
//     return () => {
//       window.removeEventListener("resize", checkScrollIconsVisibility);
//     };
//   }, [book]);

//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
//       <div className="d-flex align-items-center mb-2">
//         <span className="Top-selling">Top Selling</span>

//         {locations === "/book/topselling" ? null : (
//           <Button
//             className="top-selling-showall"
//             onClick={handleviwall}
//             style={{ border: "1px solid gray" }}
//           >
//             Show All
//           </Button>
//         )}
//       </div>

//       <div className="top-selling-tabs-container">
//         {showScrollIcons && (
//           <FaChevronLeft
//             className="scroll-icon left"
//             onClick={() => scrollTabs("left")}
//           />
//         )}

//         <div className="top-selling-tabs " ref={scrollContainerRef}>
//           <div
//             key="All"
//             onClick={() => handleTabClick("All")}
//             className={`tab-item ${activeTab === "All" ? "active" : ""}`}
//             style={{
//               padding: "10px 20px",
//               cursor: "pointer",
//               backgroundColor:
//                 activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
//               color: activeTab === "All" ? "white" : "#969696",
//               borderRadius: "40px",
//               marginLeft: "24px",
//               fontWeight: "bold",
//             }}
//           >
//             All
//           </div>

//           {uniqueCategories.length > 0 ? (
//             uniqueCategories.map((category) => (
//               <div
//                 style={{
//                   padding: "10px 20px",
//                   cursor: "pointer",
//                   backgroundColor:
//                     activeTab === category ? "#1D5755" : "rgb(241, 239, 239)",
//                   color: activeTab === category ? "white" : "#969696",
//                   borderRadius: "40px",
//                   marginRight: "10px",
//                   fontWeight: "bold",
//                 }}
//                 key={category}
//                 onClick={() => handleTabClick(category)}
//                 className={`tab-item ${activeTab === category ? "active" : ""}`}
//               >
//                 {category}
//               </div>
//             ))
//           ) : (
//             <div className="tab-skeletons d-flex">
//               <Skeleton
//                 width="6rem"
//                 height="3rem"
//                 borderRadius="40px"
//                 className="me-2"
//               />
//               <Skeleton width="6rem" height="3rem" borderRadius="40px" />
//             </div>
//           )}
//         </div>

//         {showScrollIcons && (
//           <FaChevronRight
//             className="scroll-icon right"
//             onClick={() => scrollTabs("right")}
//           />
//         )}
//       </div>

//       {/* Books List */}
//       <div>
//         <Booksview book={{ books: getBooksByCategory(activeTab) }} />
//       </div>
//     </div>
//   );
// }
