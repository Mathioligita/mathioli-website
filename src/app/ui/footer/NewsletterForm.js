import React from "react";
// import { Button, InputText } from 'primereact';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import './footer-sec.css'

const NewsletterForm = () => {
  return (
    <section className="newsletter-section mt-5">
      <h6 className="newsletter-title mb-3">Join our Newsletter</h6>
      <form className="newsletter-form " >
        <div className="d-flex">

        <div className="">
          <InputText
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="form-control in-box"
            required
          />
        </div>
        <div className="ms-3">
          <Button
            label="Subscribe"
            type="submit"
            style={{
              background: "#FFA539",
              color: "black",
              borderRadius: "10px",
              border: "none",
              // padding:"11px"
            }}
            className="sub-btn"
          />
        </div>
        </div>
      {/* <ul className="d-flex " style={{justifyContent:"stretch"}}>
        <li><i className="pi pi-facebook"></i></li>
        <li> <i className="pi pi-facebook"></i></li>
        <li> <i className="pi pi-facebook"></i></li>
      </ul> */}

      </form>
      <div className="d-flex mt-3 icon-footer">
        <div className="btn-item-icon"><Link href={'/'}><FaFacebookF /></Link></div>
        <div className="btn-item-icon"><Link href={'/'} ><RiInstagramFill /></Link></div>
        <div className="btn-item-icon"><Link href={'/'} ><FaLinkedinIn /></Link></div>
      </div>      
    </section>
  );
};

export default NewsletterForm;
