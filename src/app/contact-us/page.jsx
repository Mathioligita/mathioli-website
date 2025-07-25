"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { contactusAPi } from "api/page.jsx";
import Swal from "sweetalert2";
import Navbar from "../CommonPages/Navbar/navbar";
import Footer from "../CommonPages/Footer/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Submitted", formData);

    try {
      const response = await contactusAPi(formData);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Your message has been sent successfully!",
        });
        setFormData({ name: "", email: "", message: "", mobile: "" });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5 mb-4">
      <h2 className="text-center">Contact Us</h2>
      <p className="text-center">
        We’re here to help you with all your queries about our books and audio
        collections!
      </p>
      <div className="row ">
        <div className="col-md-6">
          <div
            className="text-start mt-5"
            // style={{ textAlign: "center", position: "relative" }}
          >
            <div className="pt-5">
              <h5>Our Contact Details:</h5>
              <p>📞 Phone: +91 9884810585</p>
              <p>📧 Email: uthiradambooks@gmail.com</p>
              <p>
                📍 Address: Shanthi Vihar Complex, No 11 Luz Ginza complex -
                old, 140, Royapettah High Rd, Luz, Mylapore, Chennai, Tamil Nadu
                600004
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <InputText
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <InputText
                name="email"
                className="form-control"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <InputText
                name="mobile"
                className="form-control"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <InputText
                name="message"
                className="form-control"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              label="Submit"
              icon="pi pi-send"
              className="btn w-100"
              type="submit"
              style={{ background: "#FFA539" }}
            />
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
