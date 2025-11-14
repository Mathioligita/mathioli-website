"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "primeflex/primeflex.css";
import "./sidebar.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Cookies from "js-cookie";
import {
  FaHome,
  FaBoxOpen,
  FaBook,
  FaQuoteLeft,
  FaAddressBook,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname.split("/")[3] : "";
  const [isOpen, setIsOpen] = useState(false);

  const model = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: <FaHome size={25} />,
          to: "/adminpanel/dashboard",
        },
      ],
    },
    {
      label: "Components",
      items: [
        {
          label: "Category",
          icon: <FaBoxOpen size={25} />,
          to: "/adminpanel/dashboard/category",
        },
        {
          label: "Book",
          icon: <FaBook size={25} />,
          to: "/adminpanel/dashboard/book",
        },
        {
          label: "Quote",
          icon: <FaQuoteLeft size={25} />,
          to: "/adminpanel/dashboard/quote",
        },
        {
          label: "Contact",
          icon: <FaAddressBook size={25} />,
          to: "/adminpanel/dashboard/contactus",
        },
        {
          label: "Orders",
          icon: <FaShoppingCart size={25} />,
          to: "/adminpanel/dashboard/orders",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/adminpanel");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    Cookies.set("sidebar", isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"}`}
      style={{ borderRight: "1px solid #8080804f" }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ position: "relative" }}
      >
        {isOpen && (
          <div className="text-center mt-2">
            <img
              src="/svg/Final-Logo 2.png"
              className="ms-3"
              alt="Logo"
              width="180px"
            />
          </div>
        )}
        {!isOpen && <img src="/Fav icon.svg" alt="" />}
        <div className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? (
            <i className="pi pi-chevron-circle-left"></i>
          ) : (
            <i className="pi pi-chevron-circle-right"></i>
          )}
        </div>
      </div>

      <ul className="layout-menu">
        {model.map((section, index) => (
          <li key={index} className="layout-root-menuitem">
            {section.items && (
              <ul className="sub-menu">
                {section.items.map((item, subIndex) => {
                  const isActive = pathname === item.to.split("/")[3];
                  return (
                    <a
                      href={item.to}
                      className={`p-ripple ${isActive ? "active" : ""}`}
                      key={subIndex}
                    >
                      <i style={{ fontSize: "1rem" }}>{item.icon}</i>
                      <span className="layout-menuitem-text">{item.label}</span>
                    </a>
                  );
                })}
              </ul>
            )}
          </li>
        ))}

        <ul className="sub-menu">
          <a className="layout-topbar-button" onClick={handleLogout}>
            <span className="layout-menuitem-icon">
              <FaSignOutAlt size={25} />
            </span>
            <span className="layout-menuitem-text ms-2">Log out</span>
          </a>
        </ul>

        {isOpen && (
          <div className="book-image">
            <img
              src="/book.png"
              alt="book"
              className="img-fluid sidebar-footer-image"
              loading="lazy"
              width="100px"
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
