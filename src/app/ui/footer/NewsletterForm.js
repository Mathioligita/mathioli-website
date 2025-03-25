// import React from "react";
// // import { Button, InputText } from 'primereact';
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import Link from "next/link";
// import { FaFacebookF } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
// import { RiInstagramFill } from "react-icons/ri";
// import "./footer-sec.css";
// import { NewsletterFormS } from "../../../../api/page";

// const NewsletterForm = () => {
//   const handleNewsletter = async () => {
//     const payload = {
//       email,
//     };
//     const response = await NewsletterFormS(payload);
//     if (response.success) {
//     }
//   };
//   return (
//     <section className="newsletter-section mt-5">
//       <h6 className="newsletter-title mb-3">Join our Newsletter</h6>
//       <form className="newsletter-form ">
//         <div className="d-flex">
//           <div className="">
//             <InputText
//               id="email"
//               name="email"
//               placeholder="Enter Your Email"
//               className="form-control in-box"
//               required
//             />
//           </div>
//           <div className="ms-3">
// <Button
//   onClick={handleNewsletter}
//   label="Subscribe"
//   type="submit"
//   style={{
//     background: "#FFA539",
//     color: "black",
//     borderRadius: "10px",
//     border: "none",
//     // padding:"11px"
//   }}
//   className="sub-btn"
// />
//           </div>
//         </div>

//       </form>
//       <div className="d-flex mt-3 icon-footer">
//         <div className="btn-item-icon">
//           <Link href={"/"}>
//             <FaFacebookF />
//           </Link>
//         </div>
//         <div className="btn-item-icon">
//           <Link href={"/"}>
//             <RiInstagramFill />
//           </Link>
//         </div>
//         <div className="btn-item-icon">
//           <Link href={"/"}>
//             <FaLinkedinIn />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsletterForm;
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import "./footer-sec.css";
import { NewsletterFormS } from "../../../../api/page";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await NewsletterFormS({ email });
      if (response.success) {
        alert("Subscribed successfully!");
        setEmail(""); // Clear input after successful subscription
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="newsletter-section mt-5">
      <h6 className="newsletter-title mb-3">Join our Newsletter</h6>
      <form className="newsletter-form" onSubmit={handleNewsletter}>
        <div className="d-flex">
          <div>
            <InputText
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control in-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                borderRadius: "6px",
                border: "none",
                // padding:"11px"
              }}
              className="sub-btn"
            />
          </div>
        </div>
      </form>
      <div className="d-flex mt-3 icon-footer">
        <div className="btn-item-icon">
          <Link href={"http://facebook.com/mathioligita"} target="_blank">
            <FaFacebookF />
          </Link>
        </div>
        <div className="btn-item-icon">
          <Link
            href={"https://www.instagram.com/mathioligita/"}
            target="_blank"
          >
            <RiInstagramFill />
          </Link>
        </div>
        <div className="btn-item-icon">
          <Link
            href={"https://www.youtube.com/@uthiradambooks"}
            target="_blank"
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
