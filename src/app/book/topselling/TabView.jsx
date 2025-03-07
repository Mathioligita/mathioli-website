<<<<<<< HEAD
=======
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
//   // console.log(locations[2],"da")
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

//   let tabContent;
//   switch (activeTab) {
//     case "All":
//       tabContent = <Booksview book={{ books: getBooksByCategory("All") }} />;
//       break;
//     case "Biography":
//       tabContent = (
//         <Booksview book={{ books: getBooksByCategory("Biography") }} />
//       );
//       break;
//     case "Children":
//       tabContent = (
//         <Booksview book={{ books: getBooksByCategory("Children") }} />
//       );
//       break;
//     case "General":
//       tabContent = (
//         <Booksview book={{ books: getBooksByCategory("General") }} />
//       );
//       break;
//     case "Philosophy":
//       tabContent = (
//         <Booksview book={{ books: getBooksByCategory("Philosophy") }} />
//       );
//       break;
//     case "Lang":
//       tabContent = (
//         <Booksview book={{ books: getBooksByCategory("Language") }} />
//       );
//       break;
//     case "Poetry":
//       tabContent = <Booksview book={{ books: getBooksByCategory("Poetry") }} />;
//       break;
//     default:
//       tabContent = <p>Please select a tab.</p>;
//   }
//   const handleviwall = () => {
//     let category = activeTab === "All" ? "all" : activeTab.toLowerCase();
//     router.push(`/book/topselling`);
//   };
//   // const handleviwall =()=> router.push(`/book/topselling/${tabContent}`)
//   return (
//     <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4 ">
//       <div className="d-flex align-items-center mb-2">
//         <span className="  Top-selling">Top Selling</span>{" "}
//         <Button
//           className="top-selling-showall"
//           onClick={handleviwall}
//           style={{
//             // display:
//             //   // locations.find((i)=>i === "topselling")
//             //   //   ? "none"
//             //   //   : "block",
//             border: "1px solid gray",
//           }}
//         >
//           {" "}
//           Show All
//         </Button>
//       </div>
//       <div
//         // style={{ display: "flex", marginBottom: "10px" }}
//         className="top-selling-tabs mb-3"
//       >
//         <div
//           key="All"
//           onClick={() => handleTabClick({ name: "All" })}
//           style={{
//             padding: "10px 20px",
//             cursor: "pointer",
//             backgroundColor:
//               activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
//             color: activeTab === "All" ? "white" : "#969696",
//             borderRadius: "40px",
//             marginRight: "10px",

//             fontWeight: "bold",
//           }}
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
//                   // backgroundColor: " #f1efef",
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
//                 {/* <div>
//                   <Skeleton width="10rem" className="mb-2"></Skeleton>
//                   <Skeleton width="5rem" className="mb-2"></Skeleton>
//                   <Skeleton height=".5rem"></Skeleton>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//         {/* Include the "All" tab */}
//       </div>
//       {/* Render content based on active tab */}
//       <div>{tabContent}</div>
//     </div>
//   );
// }

>>>>>>> master
import React, { useState } from "react";
import Booksview from "./Booksview";
import "./topselling.css";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
<<<<<<< HEAD
=======

>>>>>>> master
export default function TabView({ data, book }) {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();
  const locations =
    typeof window !== "undefined" ? window.location.pathname.split("/") : null;
<<<<<<< HEAD
  // console.log(locations[2],"da")
=======

>>>>>>> master
  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab.name); // Set the clicked tab as active
  };

  // Function to filter books by category, with a default case for "All"
  const getBooksByCategory = (category) => {
    if (category === "All") {
      return book; // Return all books if "All" is selected
    }
    return book.filter((book) => book.category === category);
  };

<<<<<<< HEAD
  let tabContent;
  switch (activeTab) {
    case "All":
      tabContent = <Booksview book={{ books: getBooksByCategory("All") }} />;
      break;
    case "Biography":
      tabContent = (
        <Booksview book={{ books: getBooksByCategory("Biography") }} />
      );
      break;
    case "Children":
      tabContent = (
        <Booksview book={{ books: getBooksByCategory("Children") }} />
      );
      break;
    case "General":
      tabContent = (
        <Booksview book={{ books: getBooksByCategory("General") }} />
      );
      break;
    case "Philosophy":
      tabContent = (
        <Booksview book={{ books: getBooksByCategory("Philosophy") }} />
      );
      break;
    case "Lang":
      tabContent = (
        <Booksview book={{ books: getBooksByCategory("Language") }} />
      );
      break;
    case "Poetry":
      tabContent = <Booksview book={{ books: getBooksByCategory("Poetry") }} />;
      break;
    default:
      tabContent = <p>Please select a tab.</p>;
  }
=======
  // Dynamically filter books based on the active tab
  const tabContent = (
    <Booksview book={{ books: getBooksByCategory(activeTab) }} />
  );

>>>>>>> master
  const handleviwall = () => {
    let category = activeTab === "All" ? "all" : activeTab.toLowerCase();
    router.push(`/book/topselling`);
  };
<<<<<<< HEAD
  // const handleviwall =()=> router.push(`/book/topselling/${tabContent}`)
  return (
    <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4 ">
      <div className="d-flex align-items-center mb-2">
        <span className="  Top-selling">Top Selling</span>{" "}
=======

  return (
    <div className="ms-0 ms-md-5 p-2 p-md-0 mt-4">
      <div className="d-flex align-items-center mb-2">
        <span className="Top-selling">Top Selling</span>
>>>>>>> master
        <Button
          className="top-selling-showall"
          onClick={handleviwall}
          style={{
<<<<<<< HEAD
            // display:
            //   // locations.find((i)=>i === "topselling")
            //   //   ? "none"
            //   //   : "block",
            border: "1px solid gray",
          }}
        >
          {" "}
          Show All
        </Button>
      </div>
      <div
        // style={{ display: "flex", marginBottom: "10px" }}
        className="top-selling-tabs mb-3"
      >
=======
            border: "1px solid gray",
          }}
        >
          Show All
        </Button>
      </div>
      <div className="top-selling-tabs mb-3">
>>>>>>> master
        <div
          key="All"
          onClick={() => handleTabClick({ name: "All" })}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor:
              activeTab === "All" ? "#1D5755" : "rgb(241, 239, 239)",
            color: activeTab === "All" ? "white" : "#969696",
            borderRadius: "40px",
            marginRight: "10px",
<<<<<<< HEAD

=======
>>>>>>> master
            fontWeight: "bold",
          }}
        >
          All
        </div>

        {/* Render tabs */}
        {data?.length > 0 ? (
          <>
            {data?.map((tab) => (
              <div
                className=""
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === tab.name ? "#1D5755" : "rgb(241, 239, 239)",
                  color: activeTab === tab.name ? "white" : "#969696",
                  borderRadius: "40px",
                  marginRight: "10px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
<<<<<<< HEAD
                  // backgroundColor: " #f1efef",
=======
>>>>>>> master
                }}
              >
                {tab.name}
              </div>
            ))}
          </>
        ) : (
          <div className="">
            <div className="surface-border surface-card">
              <div className="" style={{ display: "flex" }}>
                <Skeleton
                  width="6rem"
                  height="3rem"
                  borderRadius="40px"
                  className="me-2"
                ></Skeleton>
                <Skeleton
                  width="6rem"
                  height="3rem"
                  borderRadius="40px"
                ></Skeleton>
<<<<<<< HEAD
                {/* <div>
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton width="5rem" className="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div> */}
=======
>>>>>>> master
              </div>
            </div>
          </div>
        )}
<<<<<<< HEAD
        {/* Include the "All" tab */}
=======
>>>>>>> master
      </div>
      {/* Render content based on active tab */}
      <div>{tabContent}</div>
    </div>
  );
}
