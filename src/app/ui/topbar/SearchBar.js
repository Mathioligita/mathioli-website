// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import SearchInput from "../searchbar/page";

// export default function SearchBar() {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="search-bar d-flex align-items-center ms-3">
//       <div className="search-toggle-button">
//         {!show ? (
//           <Button
//             icon="pi pi-search"
//             className="search-button align-self-center text-danger  fs-4"
//             style={{ all: 'unset' }}
//             onClick={() => setShow(!show)}
//           />
//         ) : (
//           <Button
//             icon="pi pi-times"
//             className="search-button align-self-center text-danger fs-4"
//             style={{ all: 'unset' }}
//             onClick={() => setShow(!show)}
//           />
//         )}
//       </div>

//       {show && (
//         <div >
//           <SearchInput setShow={setShow}  />
//         </div>
//       )}
//     </div>
//   );
// }
 'use client'
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import SearchInput from "../searchbar/page";

export default function SearchBar() {
  const [show, setShow] = useState(false);
  const searchBarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div
      className="search-bar d-flex align-items-center ms-3"
      ref={searchBarRef}
    >
      <div className="search-toggle-button">
        {/* {!show ? ( */}
        <Button
          icon={show ? "pi pi-times" : "pi pi-search"}
          className="search-button align-self-center text-danger fs-4"
          style={{ all: "unset", fontSize: "24px", cursor: "pointer" }}
          onClick={() => setShow(!show)}
        />
        {/* // ) : (
        //   <Button
        //     icon="pi pi-times"
        //     className="search-button align-self-center text-danger fs-4"
        //     style={{ all: "unset", fontSize: "24px", cursor: "pointer" }}
        //     onClick={() => setShow(!show)}
        //   />
        // )} */}
      </div>

      {show && (
        <div>
          <SearchInput setShow={setShow} />
        </div>
      )}
    </div>
  );
}
