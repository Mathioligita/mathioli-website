// "use client";
// import React, { useState, useEffect, useRef, useContext } from "react";
// import Logo from "@/app/ui/topbar/Logo"; // Default export
// import NavigationMenu from "@/app/ui/topbar/NavigationMenu"; // Default export
// // import LanguageSelector from './LanguageSelector'; // Default export
// import DownloadApp from "@/app/ui/topbar/DownloadApp"; // Default export
// // import SubscribeButton from './SubscribeButton'; // Default export
// import UserActions from "@/app/ui/topbar/UserActions"; // Default export
// // import SearchBar from"; // Default export
// // import Sidebar from "../sidebar/page";
// // import "./navbar.css";
// import Link from "next/link";
// import userContext from "../../UseContext/UseContext";
// import { Badge } from "primereact/badge";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const sidebarRef = useRef(null); // Create a ref for the sidebar
//   const { cart, wishlistvalues } = useContext(userContext);
//   const router = useRouter();
//   // const accessToken = Cookies.get("accessToken");
//   const wishlistcount = wishlistvalues?.length || 0;
//   const cart1 = cart?.length || 0;
//   const handleWishlist = () => {
//     router.push("/book/wishlist");
//   };

//   const handleAddToCart = () => {
//     router.push("/book/addtocart");
//   };
//   // Close the sidebar when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div>
//       <header className="book-store-header" >
//         <nav className="navbar navbar-expand-lg navbar-light bg-light p-0" /*style={{padding:"0px !important"}}*/ >
//           <div className="d-flex" style={{ justifyContent: "space-between" }}>
//             {/* <div>
//               <button
//                 style={{ all: "unset" }}
//                 type="button"
//                 className="m-4 m-lg-1"
//                 onClick={() => setIsOpen(!isOpen)}
//               >
//                 <span className="navbar-toggler-icon"></span>
//               </button>
//             </div> */}

//             <div className="logo-damksmladas">
//               <Link className="m-3 m-lg-1 link-image" href="">
//                 <Logo />
//               </Link>
//             </div>
//             {/* <div className="fav-wishlist" >
//               <div
//                 className="fav-wishlist me-4  d-flex"
//                 style={{ marginTop: "32px", display: "none" }}
//               >
//                 <span onClick={handleWishlist} className="ms-3 m">
//                   <i className="pi pi-heart p-overlay-badge fs-5">
//                     <Badge value={wishlistcount}></Badge>
//                   </i>
//                 </span>

//                 <span onClick={handleAddToCart} className="ms-3 ">
//                   <i
//                     className="pi pi-shopping-cart p-overlay-badge fs-5"
//                     style={{ fontSize: "1rem" }}
//                   >
//                     <Badge value={cart1}></Badge>
//                   </i>
//                 </span>
//               </div>
//             </div> */}
//           </div>

//           <Link className="m-3 m-lg-1 link-image" href="">
//             <Logo />
//           </Link>
//           <div
//             className="collapse navbar-collapse justify-content-end   dkjndkjfdnkjfndfkjd"
//             id="navbarNav"
//           >
//             {/* <ul className="navbar-nav">
//               <NavigationMenu />
//             </ul> */}

//             {/* <div className="d-flex align-items-center gap-1 m-xl-3 ms-auto"> */}
//               {/* <LanguageSelector /> */}
//               {/* <DownloadApp /> */}
//               {/* <SubscribeButton /> */}
//               {/* <UserActions /> */}
//             {/* </div> */}
//             {/* <SearchBar /> */}
//           </div>
//         </nav>
//       </header>

//       {/* Render Sidebar when isOpen is true */}
//       {isOpen && (
//         <div ref={sidebarRef}>
//           <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//         </div>
//       )}
//     </div>
//   );
// }
// // ------------------------------------------------------------------------------------------------------------------------------
// // ------------------------------------------------------------------------------------------------------------------------------
// // ------------------------------------------------------------------------------------------------------------------------------
// // ------------------------------------------------------------------------------------------------------------------------------
// // ------------------------------------------------------------------------------------------------------------------------------
// // "use client";
// // import React, { useState, useEffect, useRef, useContext } from "react";
// // import Logo from "@/app/ui/topbar/Logo";
// // import NavigationMenu from "@/app/ui/topbar/NavigationMenu";
// // import DownloadApp from "@/app/ui/topbar/DownloadApp";
// // import UserActions from "@/app/ui/topbar/UserActions";
// // import Link from "next/link";
// // import userContext from "../../UseContext/UseContext";
// // import { Badge } from "primereact/badge";
// // import { useRouter } from "next/navigation";

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const sidebarRef = useRef(null);
// //   const { cart, wishlistvalues } = useContext(userContext);
// //   const router = useRouter();
// //   const wishlistcount = wishlistvalues?.length || 0;
// //   const cart1 = cart?.length || 0;

// //   const handleWishlist = () => {
// //     router.push("/book/wishlist");
// //   };

// //   const handleAddToCart = () => {
// //     router.push("/book/addtocart");
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <header className="book-store-header">
// //         <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: "0.5rem 1rem" }}>
// //           <div className="container-fluid" style={{ padding: "0" }}>
// //             <div className="logo-damksmladas">
// //               <Link className="link-image" href="" style={{ padding: "0" }}>
// //                 <Logo style={{ height: "10px" }} /> {/* Adjust logo height if needed */}
// //               </Link>
// //             </div>

// //             <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
// //               {/* Add your navigation items here if needed */}
// //             </div>
// //           </div>
// //         </nav>
// //       </header>

// //       {isOpen && (
// //         <div ref={sidebarRef}>
// //           <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
import Logo from '@/app/ui/topbar/Logo'
import Link from 'next/link'
import React from 'react'
import "./navbarstyles.css"

export default function Navbar() {
  return (
    <div>
      <div className="Nabar  " style={{ background: "#8080801f" }}>
        {/* <Link className="m-3 m-lg-1 link-image" href=""> */}
        <div className=" logo-images-reduces">

          <Logo />
        </div>
        {/* </Link F> */}
      </div>
    </div>
  )
}
