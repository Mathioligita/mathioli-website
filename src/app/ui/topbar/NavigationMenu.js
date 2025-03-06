"use client";
import Link from "next/link";

import "./navbar.css";


export default function NavigationMenu() {
  

  const menuItems = [
    { name: "Books", to: "/book" },
    // { name: "E-Books", to: "/book/e-books" },
    { name: "Audio Books", to: "/book/audio-books" },
    { name: "Categories", to: "/book/categories" },
  ];

  return (
    <nav className="navigation-menu">
      <ul className="navva d-flex align-self-center">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item align-self-center">
            <Link href={item.to} className="nav-link text-black">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
