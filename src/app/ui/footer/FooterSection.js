// import { useRouter } from 'next/navigation';
// import React from 'react';

// const FooterSection = ({ title, items }) => {
//   const router = useRouter()

//   return (

//     < section className="footer-section mt-5" >
//       <h6 className="footer-section-title text-uppercase">{title}</h6>
//       <ul className="list-unstyled" >
//         {items?.map((item, index) => (
//           <li key={index} onClick={() => router.push(item.to)}>{item.name}</li>
//         ))}
//       </ul>
//     </section >
//   )
// };

// export default FooterSection;
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FooterSection = ({ title, items }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  return (
    <section className="footer-section mt-5 transition-all duration-500   ">
      <h6 className="footer-section-title text-uppercase">{title}</h6>
      <ul className="list-unstyled">
        {items?.map((item, index) => (
          <li
            key={index}
            onClick={() => router.push(item.to)}
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterSection;
