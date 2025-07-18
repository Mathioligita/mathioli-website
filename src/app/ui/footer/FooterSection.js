
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FooterSection = ({ title, items }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  return (
    <section className="footer-section mt-5 transition-all duration-500">
      <h6 className="footer-section-title text-uppercase">{title}</h6>
      <ul className="list-unstyled">
        {items
          ?.reverse()
          ?.slice(0, 6)
          ?.map((item, index) => {


            if (!items) return null;
            return (

              <li key={index} className="footer-item">
                {item?.to ? (
                  <Link
                    href={item?.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-content"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item?.name}
                  </Link>
                ) : (
                  <span className="footer-content">{item.name}</span>
                )}
              </li>
            )
          })}

        {/* //</ul> ?.map((item, index) => (
          //   <li 
          //    key={index}
          //   onClick={() => router.push(item.to)}
          //     style={{ cursor: "pointer" }}
          //    className="footer-item"
          //   >
          //     <span className="footer-content">{item.name}</span>
          // </li>
           ))
          }*/}

      </ul>
    </section>
  );
};

export default FooterSection;
