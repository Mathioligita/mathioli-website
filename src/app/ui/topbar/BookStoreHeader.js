// "use client"
// import React, { useState } from 'react';
// import Logo from './Logo'; // Default export
// import NavigationMenu from './NavigationMenu'; // Default export
// // import LanguageSelector from './LanguageSelector'; // Default export
// import DownloadApp from './DownloadApp'; // Default export
// // import SubscribeButton from './SubscribeButton'; // Default export
// import UserActions from './UserActions'; // Default export
// import SearchBar from './SearchBar'; // Default export
// import Sidebar from "../sidebar/page"
// import "./navbar.css"
// import Link from 'next/link';

// export default function BookStoreHeader () {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
      
//     <header className="book-store-header">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <button style={{all: 'unset'}} type="button" className='m-4 m-lg-1' onClick={() => setIsOpen(!isOpen)} >
//           <span className="navbar-toggler-icon"></span>
//         </button>
        
        
//         <Link className="m-3 m-lg-1 link-image flex-fill" href="/" >
//           <Logo />
//         </Link>
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav"  >
//           <ul className="navbar-nav">
//             <NavigationMenu />
//           </ul>
//           <div className="d-flex align-items-center gap-1  m-xl-3 ms-auto">
//             {/* <LanguageSelector /> */}
//             <DownloadApp />
//             {/* <SubscribeButton /> */}
//             <UserActions />
//           </div>
//           <SearchBar />
//         </div>
//       </nav>
//     </header>


//     {
//       isOpen && (
//         <>
//         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
//         </>
//       )
//     }
//     </div>



//   );
// };
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo'; // Default export
import NavigationMenu from './NavigationMenu'; // Default export
// import LanguageSelector from './LanguageSelector'; // Default export
import DownloadApp from './DownloadApp'; // Default export
// import SubscribeButton from './SubscribeButton'; // Default export
import UserActions from './UserActions'; // Default export
import SearchBar from './SearchBar'; // Default export
import Sidebar from "../sidebar/page"
import "./navbar.css"
import Link from 'next/link';

export default function BookStoreHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  // Close the sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="book-store-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button style={{ all: 'unset' }} type="button" className='m-4 m-lg-1' onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="m-3 m-lg-1 link-image" href="/">
            <Logo />
          </Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
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
