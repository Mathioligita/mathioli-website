"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from "./Logo"; // Default export
import NavigationMenu from "./NavigationMenu"; // Default export
// import LanguageSelector from './LanguageSelector'; // Default export
import DownloadApp from "./DownloadApp"; // Default export
// import SubscribeButton from './SubscribeButton'; // Default export
import UserActions from "./UserActions"; // Default export
import SearchBar from "./SearchBar"; // Default export
import Sidebar from "../sidebar/page";
import "./navbar.css";
import Link from "next/link";
import userContext from "../../../app/UseContext/UseContext";
import { Badge } from "primereact/badge";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { addToCartAPI } from "api/page";

export default function BookStoreHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar
  const { cart, wishlistvalues } = useContext(userContext);
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const wishlistcount = wishlistvalues?.length || 0;
  const cart1 = cart?.length || 0;
  const handleWishlist = () => {
    router.push("/book/wishlist");
  };

  useEffect(() => {
    if (accessToken) {
      addToCartAPI();
    }
  }, [accessToken, wishlistvalues, cart]);

  const handleAddToCart = () => {
    router.push("/book/addtocart");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="book-store-header ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <button
                style={{ all: "unset" }}
                type="button"
                className="m-4 m-lg-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="logo-damksmladas">
              <Link className="m-3 m-lg-1 link-image" href="/">
                <Logo />
              </Link>
            </div>
            <div className="fav-wishlist">
              <div
                className="fav-wishlist me-4  d-flex"
                style={{ marginTop: "32px", display: "none" }}
              >
                <span onClick={handleWishlist} className="ms-3 m">
                  <i className="pi pi-heart p-overlay-badge fs-5">
                    <Badge value={wishlistcount}></Badge>
                  </i>
                </span>

                <span onClick={handleAddToCart} className="ms-3 ">
                  <i
                    className="pi pi-shopping-cart p-overlay-badge fs-5"
                    style={{ fontSize: "1rem" }}
                  >
                    <Badge value={cart1}></Badge>
                  </i>
                </span>
              </div>
            </div>
          </div>

          <Link className="m-3 m-lg-1 link-image" href="/">
            <Logo />
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end   dkjndkjfdnkjfndfkjd"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <NavigationMenu />
            </ul>

            <div className="d-flex align-items-center gap-1 m-xl-3 ms-auto">
              {/* <LanguageSelector /> */}
              <DownloadApp />
              {/* <SubscribeButton /> */}
              <UserActions />
            </div>
            <SearchBar />
          </div>
        </nav>
      </header>

      {/* Render Sidebar when isOpen is true */}
      {isOpen && (
        <div ref={sidebarRef}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
}
