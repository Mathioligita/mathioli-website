"use client";
import React, { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { UsersRegisterAPi } from "api/page";
import { useRouter } from "next/navigation";
import userContext from "../UseContext/UseContext";
import VerifyOTP from "../CommonPages/OTPVerification/OTPVerification"; // Import the VerifyOTP component

function Register({ visible, onHide }) {
  const toast = useRef(null);
  const { regsiterPopup, loginpoup } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "+91",
  });
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile.replace("+91", "").trim(),
    };

    try {
      const response = await UsersRegisterAPi(payload);
      console.log(response,"client error ")
      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: "OTP Sent",
          detail: response?.data?.message || "OTP has been sent to your email/mobile",
          life: 3000,
        });
        setRegistrationData(payload);
        setShowOTP(true); // Show OTP verification
      } else {
        console.log("error", error);
        toast.current.show({
          severity: "error",
          summary: "Registration Failed",
          detail: response?.data?.errors || "Registration failed",
          life: 3000,
        });
      }
    } catch (error) {
      // console.log(error,"ftfttftft");
      console.log("client error222", error);
      // toast.current.show({
      //   severity: "error",
      //   summary: "Registration Failed",
      //   detail: "An error occurred during registration.",
      //   life: 3000,
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    onHide(); // Close the modal after successful verification
    setShowOTP(false); // Hide OTP form
  };

  const handleBackToRegister = () => {
    setShowOTP(false); // Go back to registration form
  };

  return (
    visible && (
      <>
        <Toast ref={toast} />
        <div className="modal-overlay" onClick={onHide}></div>
        <div className="login-modal">
          {showOTP ? (
            <VerifyOTP
              email={formData.email}
              onVerifySuccess={handleVerifySuccess}
              onBack={handleBackToRegister}
            />
          ) : (
            <div className="content p-1">
              <div className="d-flex justify-content-center">
                <img src="/image/Logo black.svg" alt="Logo" width={"200px"} />
              </div>
              <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
                Welcome back!
              </p>
              <span
                className="d-flex justify-content-center"
                style={{
                  fontSize: "12px",
                  color: "#4D4D4D",
                  fontWeight: "200",
                }}
              >
                Register in to continue to MATHIOLI
              </span>
              <form onSubmit={handleSubmit} className="m-auto mt-2">
                <div className="p-my-2 d-flex">
                  <div>
                    <InputText
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter firstName"
                      className="p-inputtext w-100"
                      required
                    />
                  </div>
                  <div className="ms-3">
                    <InputText
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter lastName"
                      className="p-inputtext w-100"
                      required
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <InputText
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-100"
                    required
                  />
                </div>
                <div className="mt-2 login-password">
                  <Password
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-100"
                    toggleMask
                    required
                  />
                </div>
                <div className="p-d-flex">
                  <InputText
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-100 mt-2"
                    required
                  />
                </div>
                <Button
                  label="Continue"
                  className="w-100 mt-2"
                  type="submit"
                  loading={loading}
                  style={{ background: "#396664" }}
                />
              </form>
              <div className="mt-4">
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      loginpoup();
                      regsiterPopup();
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "blue",
                    }}
                  >
                    Login{" "}
                  </span>
                  here
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
}

export default Register;