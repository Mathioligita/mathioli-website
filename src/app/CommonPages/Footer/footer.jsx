

"use client";
import React, { useContext } from "react";
import ContactInfo from "@/app/ui/footer/ContactInfo";
import FooterSection from "@/app/ui/footer/FooterSection";
import NewsletterForm from "@/app/ui/footer/NewsletterForm";
import userContext from "../../UseContext/UseContext";
import "../../../app/ui/footer/container-footer.css";

const Footer = () => {
  const { categoriesdata } = useContext(userContext);

  const companyLinks = [
    { name: "About Us", to: "/about-us" },
    { name: "Payment Policy", to: "/payment-policy" },
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Contact Us", to: "/contact-us" },
    { name: "Terms and Condition", to: "/terms-and-conditions" },
    { name: "Return Policy", to: "/return-policy" },
  ];

  const categories = categoriesdata?.map((item) => ({
    name: item?.name,
    to: `/book/categories/${item?.slug}`,
  }));

  return (
    <footer
      className="footer text-white pt-5"
      style={{ backgroundColor: "#1D5755" }}
    >
      <div className="container-footer container">
        <div className="row gy-4">
          {/* Logo & Description */}
          <div className="col-12 col-md-6 col-lg-4">
            <img
              src="/image/Logo.svg"
              alt="Mathioli Gita Logo"
              className="footer-logo mb-3"
              style={{ maxWidth: "200px" }}
            />
            <p className="footer-description">
              Mathioli Gita is an attempt to reach the words of Guru
              Pujyashri Mathioli Saraswathy to the reading public. The books
              written by Her provide people with a guide to improve their
              lives and make it more meaningful.
            </p>
          </div>

          {/* Company Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <FooterSection title="Company" items={companyLinks} />
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-6 col-lg-4">
            <NewsletterForm />
          </div>
        </div>

        <hr className="my-4 border-light" />

        {/* Contact Info */}
        <ContactInfo
          address="Shanthi Vihar Complex, No 11 Luz Ginza complex - old, 140, Royapettah High Rd, Luz, Mylapore, Chennai, Tamil Nadu 600004"
          email="uthiradambooks@gmail.com"
          phone="9884810585"
        />
      </div>
    </footer>
  );
};

export default Footer;
