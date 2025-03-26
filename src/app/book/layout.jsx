"use client";
import React, { useState } from "react";

import FooterPage from "../ui/footer/page";
import Topbars from "../ui/topbar/page";
// import userContext from "../UseContext/UseContext"
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Example of a theme
import "primereact/resources/primereact.min.css"; // PrimeReact core styles
import "primeicons/primeicons.css"; // PrimeIcons (if you need icons)
// import Loading from "../loading";
import { LoadingContext } from "../layout";

export default function Layout({ children }) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const [loading, setLoading] = useState(false);

  // const accessToken = localStorage.getItem("accessToken");

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  // if (!accessToken) {
  //   return <NotFound />; // Render NotFound component if no access token
  // }

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <div className="layout-container" >
        <Topbars toggleSidebar={toggleSidebar} />
        <div className={`layout-sidebar ${isSidebarVisible ? "" : "hidden"}`}>
          {/* <Sidebar  /> */}
        </div>
        {/* <div
          className={`layout-main-container ${
            isSidebarVisible ? "" : "sidebar-hidden"
          }`}
          // style={{ background: "#fff" }}
        > */}
          <div className="layout-main"  >
            {children}
             {/* {loading && <Loading />}{" "} */}
          </div>
        </div>
        <FooterPage />
      {/* </div> */}
    </LoadingContext.Provider>
  );
}
