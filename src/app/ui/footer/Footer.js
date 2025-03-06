"use client";
import React, { useContext } from "react";

import ContactInfo from "./ContactInfo";
import FooterSection from "./FooterSection";
import NewsletterForm from "./NewsletterForm";
import { CategoryAPI } from "api/page";
import userContext from "@/app/UseContext/UseContext";
import './container-footer.css'

const Footer = () => {


  const { categoriesdata } = useContext(userContext);

  

  const companyLinks = [
    { name: "About Us", to: "/book/about-us" },
    { name: "Blog", to: "/book/blog" },
    { name: "Contact Us", to: "/book/contact-us" },
    { name: "Terms and Condition", to: "/book/terms-and-conditions" },
  ];
  
  const categories = categoriesdata?.map((item) => ({
    name: item?.name,
    to: `/book/categories/${item?.slug}`,
  }));
  return (
    <footer
      className="footer text-white py-5 mt-5"
      style={{ backgroundColor: "#1D5755" }}
    >
      <div className="container-footer">
        <div className="row justify-content-between">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <img
              src="/image/Final-Logo 2.svg"
              alt="Mathioli Gita Logo"
              className="footer-logo "
              width={"100%"}
            />
            <p className="footer-description">
              Mathioli Gita is an attempt to reach the words of Guru Pujyashri
              Mathioli Saraswathy to the reading public. The books written by
              Her provide people with a guide to improve their lives and make it
              more meaningful.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-1">
            <FooterSection title="Categories" items={categories} />
          </div>
          <div
            className="col-sm-12 col-md-6 col-lg-2"
            style={{ cursor: "pointer" }}
          >
            <FooterSection title="Company" items={companyLinks} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <NewsletterForm />
          </div>
        </div>
        <hr className="my-4" />

        <ContactInfo

          address="Shanthi Vihar Complex, No 11 Luz Ginza complex - old, 140, Royapettah High Rd, Luz, Mylapore, Chennai, Tamil Nadu 600004"
          email="Ourstudio@hello.com"
          phone="123 456 6578"
        />
      </div>
    </footer>
  );
};

export default Footer;
