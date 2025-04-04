
"use client";
import { createContext, useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { v4 as uuidv4 } from "uuid";
import UserContext from "./UseContext/UseContext"; // Ensure c
import Cookies from "js-cookie";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import Loading from "../../components/Loading";
// Import the Loading component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create Loading Context
export const LoadingContext = createContext();

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlistvalues, setwishlistvalues] = useState([]);
  const [booksdata, setBooksData] = useState([]);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [usersdata, setusersdata] = useState(null);
  const [registerpop, setRegisterpop] = useState(false);

  const loginpoup = () => {
    setLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupVisible(false);
  };
  const registerpoup = () => {
    setRegisterpop(true);
  };

  const regsiterPopup = () => {
    setRegisterpop(false);
  };

  useEffect(() => {
    function getGuestId() {
      const storedGuestId = Cookies.get("guestId");

      if (!storedGuestId) {
        const newGuestId = `${uuidv4()}_${Date.now()}`;
        Cookies.set("guestId", newGuestId);
        return newGuestId;
      }

      return storedGuestId;
    }

    getGuestId();
  }, []);

  const defaultValue = {
    cart,
    setCart,
    setwishlistvalues,
    wishlistvalues,
    booksdata,
    setBooksData,
    categoriesdata,
    setCategoriesdata,
    loginpoup,
    closeLoginPopup,
    loginPopupVisible,
    usersdata,
    setusersdata,
    regsiterPopup,
    registerpoup,
    registerpop,
    setRegisterpop,

    // loading,
    // setLoading,
  };

  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        
        /> */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <title> Mathioli Gita</title>
        <link rel="icon" href="/Fav icon.svg" type="image/x-icon" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContext.Provider value={defaultValue}>
          {/* Show loader when loading */}
          {children}
        </UserContext.Provider>
      </body>

      {/* <script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"
      ></script> */}
      {/* <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script> */}
    </html>
  );
}
