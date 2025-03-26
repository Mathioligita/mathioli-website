"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie";
import "./sidebar.css";
import Link from "next/link";
import userContext from "../../UseContext/UseContext";

export default function Sidebar({ setIsOpen }) {
  const [visible, setVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [legal, setLegal] = useState(false);
  const router = useRouter();
  const { usersdata, loginpoup, registerpoup } = useContext(userContext);
  const accessToken = Cookies.get("accessToken");
  const items = [
    { label: "Profile", to: "/book/profile" },
    { label: "Cart", to: "/book/addtocart" },
    { label: "Favourite", to: "/book/wishlist" },
    // { label: "Payments", to: "/book/payments" },
    { label: "My Audio Books", to: "/book/profile" },
    // { label: "My Orders", to: "/book/orders" },
  ];

  const aboutItems = [
    // { label: 'Rate us on Playstore', to: '/playstore' },
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
        <span className="mt-2 ms-4">
          <i className="pi pi-times fs-4" onClick={() => setIsOpen(false)} />
        </span>
      </div>

      {/* /* User Profile Section */}
      {accessToken ? (
        <div
          className="d-flex align-items-center user-dropdown"
          style={{
            gap: "13px",
            border: "1px solid black",
            padding: "5px",
            borderRadius: "50px",
            marginLeft: "12px",
            width: "fit-content",
            cursor: "pointer",
          }}
          onClick={() => setVisible(!visible)}
        >
          <img
            src={usersdata?.profileImage || "/image/Ellipse 10.png"}
            style={{ borderRadius: "50%" }}
            alt="User"
            width="40px"
          />
          <span>
            {usersdata?.firstName
              ? `${usersdata.firstName} ${usersdata.lastName}`
              : "No users"}
          </span>
          <i className="pi pi-angle-down" style={{ padding: "5px" }}></i>
        </div>
      ) : null}

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
                <li className="p-3 " style={{ borderBottom: "1px solid gray" }}>
                  <span className="fw-light">{item.label}</span>
                  {/* <hr /> */}
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
                <li className="p-3 " style={{ borderBottom: "1px solid gray" }}>
                  {item.label}
                  {/* <hr /> */}
                </li>
              </Link>
            ))}
          </ul>
        )}

        {/* <li className="fw-bold p-2">
					<i className="pi pi-pencil me-2"></i> Blogs
				</li> */}

        {/* <ul className="fw-bold sidebar-values-adjustment"> */}
        <li
          className="fw-bold p-2 sidebar-values-adjustment"
          onClick={() => router.push("/book")}
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
          onClick={() => router.push("/book/categories")}
        >
          {" "}
          <i className="pi pi-list me-2"></i>
          Categories
        </li>
        {/* </ul> */}
        {accessToken ? (
          <>
            <li className="fw-bold p-2" onClick={handleLogout}>
              <i className=" pi pi-sign-out" />{" "}
              <span className="ms-2">Logout</span>
            </li>
          </>
        ) : (
          <>
            <li
              className="fw-bold p-2"
              onClick={() => {
                loginpoup(true), setIsOpen(false);
              }}
            >
              <i className=" pi pi-sign-in" />{" "}
              <span className="ms-2">Login</span>
            </li>
            {/* <li className="fw-bold p-2" onClick={() =>  registerpoup(true)}>
              <i className=" pi pi-user-plus" /> <span className="ms-2">Sign Up</span>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
}
