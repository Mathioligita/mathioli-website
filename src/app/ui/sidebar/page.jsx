"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie";
import "./sidebar.css";
import Link from "next/link";
import { ProfileUser } from "api/page";
import userContext from "../../UseContext/UseContext";

export default function Sidebar({ setIsOpen }) {
  const [visible, setVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [legal, setLegal] = useState(false);
  const router = useRouter();
  const { usersdata } = useContext(userContext);

  const items = [
    { label: "Profile", to: "/book/profile" },
    { label: "Cart", to: "/book/addtocart" },
    { label: "Favourite", to: "/book/wishlist" },
    { label: "Payments", to: "/book/payments" },
    { label: "My Audio Books", to: "/book/audio-books" },
    { label: "My Orders", to: "/book/orders" },
  ];

  const aboutItems = [
    { label: "Rate us on Playstore", to: "/playstore" },
    { label: "About Us", to: "/book/about-us" },
  ];

  const legalItems = [
    { label: "Contact Us", to: "/book/contact-us" },
    { label: "Payment Policy", to: "/book/payment-policy" },
    { label: "Privacy Policy", to: "/book/privacy-policy" },
    { label: "Terms and Conditions", to: "/book/terms-and-conditions" },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        setVisible(false);
        setAboutVisible(false);
        setLegal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <span>
          <img
            src="/image/Logo black.svg"
            className="logo-text"
            alt="Logo"
            width="100%"
          />
        </span>
        <span className="mt-4 ms-4">
          <i className="pi pi-times fs-4" onClick={() => setIsOpen(false)} />
        </span>
      </div>

      {/* User Profile Section */}

      <div
        className="d-flex align-items-center user-dropdown"
        style={{
          gap: "13px",
          border: "1px solid black",
          padding: "5px",
          borderRadius: "50px",
          width: "fit-content",
          cursor: "pointer",
        }}
        onClick={() => setVisible(!visible)}
      >
        <img
          src={
            usersdata.profileImage ||
            "data:image/png;base64,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"
          }
          style={{ borderRadius: "50%" }}
          alt="User"
          width="40px"
        />
        <span>
          {usersdata?.firstName} {usersdata?.lastName || "no users"}
        </span>
        <i className="pi pi-angle-down" style={{ padding: "5px" }}></i>
      </div>

      {visible && (
        <ul
          className="list-unstyled card"
          style={{
            margin: "3px",
            padding: "15px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            position: "absolute",
            backgroundColor: "#fff",
            zIndex: 9999,
          }}
        >
          {items.map((item, index) => (
            <Link
              href={item.to}
              key={index}
              className="text-decoration-none text-black"
              onClick={() => setIsOpen(false)}
            >
              <li>{item.label}</li>
            </Link>
          ))}
        </ul>
      )}

      <ul className="list-unstyled p-2 m-auto">
        <li
          className="fw-bold p-2 about-dropdown"
          onClick={() => setAboutVisible(!aboutVisible)}
        >
          <i className="pi pi-user me-2"></i> About
        </li>

        {aboutVisible && (
          <ul className="list-unstyled about-dropdown">
            {aboutItems.map((item, index) => (
              <Link
                href={item.to}
                key={index}
                className="text-decoration-none text-black"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  <span className="fw-light">{item.label}</span>
                  <hr />
                </li>
              </Link>
            ))}
          </ul>
        )}

        <li
          className="fw-bold p-2 legal-dropdown"
          onClick={() => setLegal(!legal)}
        >
          <i className="pi pi-file me-2"></i> Legal
        </li>
        {legal && (
          <ul className="list-unstyled legal-dropdown">
            {legalItems.map((item, index) => (
              <Link
                href={item.to}
                key={index}
                className="text-decoration-none text-black"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  {item.label}
                  <hr />
                </li>
              </Link>
            ))}
          </ul>
        )}

        <li className="fw-bold p-2">
          <i className="pi pi-pencil me-2"></i> Blogs
        </li>

        {/* <ul className="fw-bold sidebar-values-adjustment"> */}
        <li
          className="fw-bold p-2 sidebar-values-adjustment"
          onClick={() => router.push("/book/topselling/all")}
        >
          <i className="pi pi-book me-2"></i>Books
        </li>
        {/* <li onClick={() => router.push("/book/e-books")}>E-Books</li> */}
        <li
          className="fw-bold p-2 sidebar-values-adjustment"
          onClick={() => router.push("/book/audio-books")}
        >
          <i className="pi pi-headphones me-2"></i>
          Audio Books
        </li>
        <li
          className="fw-bold p-2 sidebar-values-adjustment"
          onClick={() => router.push("//book/categories")}
        >
          {" "}
          <i className="pi pi-list me-2"></i>
          Categories
        </li>
        {/* </ul> */}
        <li className="fw-bold p-2" onClick={handleLogout}>
          <i className=" pi pi-sign-out" /> <span className="ms-2">Logout</span>
        </li>
      </ul>
    </div>
  );
}
