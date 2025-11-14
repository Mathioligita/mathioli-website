"use client";
import React, { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { UsersRegisterAPi } from "api/page";
import { useRouter } from "next/navigation";
import userContext from "../UseContext/UseContext";
import VerifyOTP from "../CommonPages/OTPVerification/OTPVerification";

function Register({ visible, onHide }) {
  const toast = useRef(null);
  const { regsiterPopup, loginpoup } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.current.show({
        severity: "error",
        summary: "First Name Required",
        detail: "Please enter your first name.",
        life: 3000,
      });
      return false;
    }

    if (!formData.lastName.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Last Name Required",
        detail: "Please enter your last name.",
        life: 3000,
      });
      return false;
    }

    if (!formData.email.includes("@")) {
      toast.current.show({
        severity: "error",
        summary: "Invalid Email",
        detail: "Please enter a valid email address.",
        life: 3000,
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast.current.show({
        severity: "error",
        summary: "Weak Password",
        detail: "Password must be at least 6 characters.",
        life: 3000,
      });
      return false;
    }

    const mobileNum = formData.mobile.replace("").trim();
    if (mobileNum.length < 10) {
      toast.current.show({
        severity: "error",
        summary: "Invalid Mobile Number",
        detail: "Mobile number must be at least 10 digits.",
        life: 3000,
      });
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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

      if (response?.success) {
        toast.current.show({
          severity: "success",
          summary: "OTP Sent",
          detail:
            response?.data?.message ||
            "OTP has been sent successfully!",
          life: 3000,
        });

        setRegistrationData(payload);
        setShowOTP(true);
        return;
      }

      if (response?.data?.errors) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: response.data.errors,
          life: 4000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Registration Failed",
          detail: response?.data?.message || "Something went wrong!",
          life: 3000,
        });
      }

    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Server Error",
        detail:
          error?.response?.data?.errors ||
          error?.response?.data?.message ||
          "Something went wrong, try again later.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    onHide();
    setShowOTP(false);
  };

  const handleBackToRegister = () => {
    setShowOTP(false);
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
                <img src="/image/logo-black.svg" alt="Logo" width={"200px"} />
              </div>

              <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
                Welcome!
              </p>
              <span className="d-flex justify-content-center" style={{ fontSize: "12px", color: "#4D4D4D" }}>
                Register to continue
              </span>

              <form onSubmit={handleSubmit} className="m-auto mt-2">
                <div className="p-my-2 d-flex">
                  <div>
                    <InputText
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="p-inputtext w-100"
                    />
                  </div>

                  <div className="ms-3">
                    <InputText
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="p-inputtext w-100"
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
                  />
                </div>

                <div className="mt-2 login-password">
                  <Password
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-100"
                    toggleMask
                  />
                </div>

                <div className="p-d-flex">
                  <InputText
                    name="mobile"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-100 mt-2"
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
                    style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                  >
                    Login
                  </span>{" "}
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
