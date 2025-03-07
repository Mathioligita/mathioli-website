<<<<<<< HEAD
"use client";
import Link from "next/link";

import "./navbar.css";


export default function NavigationMenu() {
  

  const menuItems = [
    { name: "Books", to: "/book" },
    // { name: "E-Books", to: "/book/e-books" },
=======
// // "use client";
// // import Link from "next/link";

// // import "./navbar.css";


// // export default function NavigationMenu() {
  

// //   const menuItems = [
// //     { name: "Books", to: "/book" },
// //     // { name: "E-Books", to: "/book/e-books" },
// //     { name: "Audio Books", to: "/book/audio-books" },
// //     { name: "Categories", to: "/book/categories" },
// //   ];

// //   return (
// //     <nav className="navigation-menu">
// //       <ul className="navva d-flex align-self-center">
// //         {menuItems.map((item, index) => (
// //           <li key={index} className="nav-item align-self-center">
// //             <Link href={item.to} className="nav-link text-black">
// //               {item.name}
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </nav>
// //   );
// // }


// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import "./navbar.css";

// export default function NavigationMenu() {
//   const router = useRouter();

//   const menuItems = [
//     { name: "Books", to: "/book" },
//     { name: "Audio Books", to: "/book/audio-books" },
//     { name: "Categories", to: "/book/categories" },
//   ];

//   return (
//     <nav className="navigation-menu">
//       <ul className="navva d-flex align-self-center">
//         {menuItems.map((item, index) => (
//           <li key={index} className="nav-item align-self-center">
//             <Link href={item.to} className={`nav-link text-black ${router.pathname === item.to ? 'active' : ''}`}>
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <style jsx>{`
//         .nav-link.active {
//           color: #1D5755;
//         }
//       `}</style>
//     </nav>
//   );
// }















"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function NavigationMenu() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Books", to: "/book" },
>>>>>>> master
    { name: "Audio Books", to: "/book/audio-books" },
    { name: "Categories", to: "/book/categories" },
  ];

  return (
    <nav className="navigation-menu">
      <ul className="navva d-flex align-self-center">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item align-self-center">
<<<<<<< HEAD
            <Link href={item.to} className="nav-link text-black">
=======
            <Link href={item.to} className={`nav-link text-black ${pathname === item.to ? 'active' : ''}`}>
>>>>>>> master
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
<<<<<<< HEAD
=======
      <style jsx>{`
        .nav-link.active {
          color: #1D5755;
        }
      `}</style>
>>>>>>> master
    </nav>
  );
}
