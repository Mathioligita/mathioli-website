import React from "react";

const ContactInfo = ({ address, email, phone }) => (
  <div
    className="contact-info row d-flex"
    style={{ fontSize: "16px", justifyContent: "space-between" }}
  >
    <div
      className="copyright col-md-2 col-sm-12 col-md-6 col-lg-2 mb-3 mb-md-0"
      style={{ cursor: "pointer" }}
    >
      © 2025 by{" "}
      <a
        href="https://www.webdads2u.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-decoration-none"

      >
        WEBDADS2U
      </a>{" "}
      PVT LTD.
    </div>
    <div className="contact-item d-flex  mb-3 col-sm-12 col-md-6 col-lg-5 mb-3 mb-md-0">
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/8a9ae8fe4a4c15f7effb4a3be181352c7a5917852c482060956795a563c074c0?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
          alt="Address"
          className="contact-icon me-2"
        />
      </div>
      <div>
        <span>{address}</span>
      </div>
    </div>
    <div className="contact-item d-flex  mb-3 col-sm-12 col-md-6 col-lg-2 mb-3 mb-md-0">
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/59095dc2584d074cb56c55746cb9242ddcb23386c774d75cb42a7a116368090a?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
          alt="Email"
          className="contact-icon me-2"
        />
      </div>
      <div>
        <span>{email}</span>
      </div>
    </div>
    <div className="contact-item d-flex  mb-3 col-sm-12 col-md-6 col-lg-2 mb-3 mb-md-0">
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/75b26c4665532e3374b179c00fc56bec8ce532e696dc609792ed601d3d9c8b7d?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
          alt="Phone"
          className="contact-icon me-2"
        />
      </div>
      <div>
        <span>{phone}</span>
      </div>
    </div>
  </div>
);

export default ContactInfo;
