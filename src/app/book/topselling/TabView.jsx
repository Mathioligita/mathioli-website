// import React, { useState } from "react";
// import Booksview from "./Booksview";
// import "./topselling.css";
// import { useRouter } from "next/navigation";
// import { Button } from "primereact/button";
// import { Skeleton } from "primereact/skeleton";

// export default function TabView({ data, book }) {
//   const [activeTab, setActiveTab] = useState("All");
//   const router = useRouter();
//   const locations =
//     typeof window !== "undefined" ? window.location.pathname.split("/") : null;

//   // Function to handle tab clicks
//   const handleTabClick = (tab) => {
//     setActiveTab(tab.name); // Set the clicked tab as active
//   };

//   // Function to filter books by category, with a default case for "All"
//   const getBooksByCategory = (category) => {
//     if (category === "All") {
//       return book; // Return all books if "All" is selected
//     }
//     return book.filter((book) => book.category === category);
//   };

//   // Dynamically filter books based on the active tab
//   const tabContent = (
//     <Booksview book={{ books: getBooksByCategory(activeTab) }} />
//   );

//   const handleviwall = () => {
//     let category = activeTab === "All" ? "all" : activeTab.toLowerCase();
//     router.push(`/book/topselling`);
//   };

//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
//       <div className="d-flex align-items-center mb-2">
//         <span className="Top-selling">Top Selling</span>
//         <Button
//           className="top-selling-showall"
//           onClick={handleviwall}
//           style={{
//             border: "1px solid gray",
//           }}
//         >
//           Show All
//         </Button>
//       </div>
//       <div className="top-selling-tabs mb-3">
//         <div
//           key="All"
//           onClick={() => handleTabClick({ name: "All" })}
// style={{
//   padding: "10px 20px",
//   cursor: "pointer",
//   backgroundColor:
//     activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
//   color: activeTab === "All" ? "white" : "#969696",
//   borderRadius: "40px",
//   marginRight: "10px",
//   fontWeight: "bold",
// }}
//         >
//           All
//         </div>

//         {/* Render tabs */}
//         {data?.length > 0 ? (
//           <>
//             {data?.map((tab) => (
//               <div
//                 className=""
//                 key={tab.name}
//                 onClick={() => handleTabClick(tab)}
//                 style={{
//                   padding: "10px 20px",
//                   cursor: "pointer",
//                   backgroundColor:
//                     activeTab === tab.name ? "#1D5755" : "rgb(241, 239, 239)",
//                   color: activeTab === tab.name ? "white" : "#969696",
//                   borderRadius: "40px",
//                   marginRight: "10px",
//                   fontWeight: "bold",
//                   textTransform: "capitalize",
//                 }}
//               >
//                 {tab.name}
//               </div>
//             ))}
//           </>
//         ) : (
//           <div className="">
//             <div className="surface-border surface-card">
//               <div className="" style={{ display: "flex" }}>
//                 <Skeleton
//                   width="6rem"
//                   height="3rem"
//                   borderRadius="40px"
//                   className="me-2"
//                 ></Skeleton>
//                 <Skeleton
//                   width="6rem"
//                   height="3rem"
//                   borderRadius="40px"
//                 ></Skeleton>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Render content based on active tab */}
//       <div>{tabContent}</div>
//     </div>
//   );
// }
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

//   // Function to handle tab clicks
//   const handleTabClick = (tab) => {
//     setActiveTab(tab.name);
//   };

//   // Function to filter books by category
//   const getBooksByCategory = (category) => {
//     return category === "All"
//       ? book
//       : book.filter((b) => b.category === category);
//   };

//   // Scroll function for left and right navigation
//   const scrollTabs = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 150; // Adjust as needed
//       scrollContainerRef.current.scrollLeft +=
//         direction === "left" ? -scrollAmount : scrollAmount;
//     }
//   };

//   const handleviwall = () => {
//     router.push(`/book/topselling`);
//   };

//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
//       <div className="d-flex align-items-center mb-2">
//         <span className="Top-selling">Top Selling</span>
//         <Button
//           className="top-selling-showall"
//           onClick={handleviwall}
//           style={{ border: "1px solid gray" }}
//         >
//           Show All
//         </Button>
//       </div>

//       <div className="top-selling-tabs-container">
//         {/* Left Scroll Icon */}
//         <FaChevronLeft
//           className="scroll-icon left"
//           onClick={() => scrollTabs("left")}
//         />

//         <div className="top-selling-tabs" ref={scrollContainerRef}>
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
//               marginRight: "10px",
//               fontWeight: "bold",
//             }}
//           >
//             All
//           </div>

//           {data?.length > 0 ? (
//             data.map((tab) => (
//               <div
//                 style={{
//                   padding: "10px 20px",
//                   cursor: "pointer",
//                   backgroundColor:
//                     activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
//                   color: activeTab === "All" ? "white" : "#969696",
//                   borderRadius: "40px",
//                   marginRight: "10px",
//                   fontWeight: "bold",
//                 }}
//                 key={tab.name}
//                 onClick={() => handleTabClick(tab)}
//                 className={`tab-item ${activeTab === tab.name ? "active" : ""}`}
//               >
//                 {tab.name}
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

//         {/* Right Scroll Icon */}
//         <FaChevronRight
//           className="scroll-icon right"
//           onClick={() => scrollTabs("right")}
//         />
//       </div>

//       {/* Render content based on active tab */}
//       <div>
//         <Booksview book={{ books: getBooksByCategory(activeTab) }} />
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
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

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
  };

  const getBooksByCategory = (category) => {
    return category === "All"
      ? book
      : book.filter((b) => b.category === category);
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleviwall = () => {
    router.push(`/book/topselling`);
  };

  return (
    <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
      <div className="d-flex align-items-center mb-2">
        <span className="Top-selling">Top Selling</span>
        <Button
          className="top-selling-showall"
          onClick={handleviwall}
          style={{ border: "1px solid gray" }}
        >
          Show All
        </Button>
      </div>

      <div className="top-selling-tabs-container">
        {/* Left Scroll Button */}
        <FaChevronLeft
          className="scroll-icon left"
          onClick={() => scrollTabs("left")}
        />

        <div className="top-selling-tabs" ref={scrollContainerRef}>
          <div
            key="All"
            onClick={() => handleTabClick({ name: "All" })}
            className={`tab-item ${activeTab === "All" ? "active" : ""}`}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor:
                activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
              color: activeTab === "All" ? "white" : "#969696",
              borderRadius: "40px",
              marginRight: "10px",
              fontWeight: "bold",
            }}
          >
            All
          </div>

          {data?.length > 0 ? (
            data.map((tab) => (
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === tab.name ? "#1D5755" : "rgb(241, 239, 239)",
                  color: activeTab === tab.name ? "white" : "#969696",
                  borderRadius: "40px",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`tab-item ${activeTab === tab.name ? "active" : ""}`}
              >
                {tab.name}
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
  );
}
