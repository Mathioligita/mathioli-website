"use client";
import React, { useContext, useRef, useState } from "react";
// import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast"; // Use primereact Toast
import { FcGoogle } from "react-icons/fc";
// import { API_BASE_URL } from "../utils";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./login.css";
import Cookies from "js-cookie";
import { LoginAPi } from "../../../api/page";
import userContext from "../UseContext/UseContext";

// console.log(API_BASE_URL, "API_BASE_URL");

function Login({ visible, onHide }) {
  const toast = useRef(null);
  const { registerpoup, regsiterPopup, closeLoginPopup } =
    useContext(userContext);
  const guest = Cookies.get("guestId");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
      guestId: guest,
    };

    try {
      const response = await LoginAPi(payload);
      // const response = await axios.post(`${API_BASE_URL}/users/login`, payload);
      // console.log(response, "response");
      if (response.success) {
        // console.log(response);
        const Data = response.data;
        // console.log(Data);
        Cookies.set("refreshToken", Data.refreshToken);
        Cookies.set("accessToken", Data.accessToken);

        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: "Login successfully",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          // summary: "",
          detail: response.data,
          life: 3000,
        });
      }
      setTimeout(() => {
        onHide();
      }, [1000]);
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: "An error occurred during login.",
        life: 3000,
      });
      // console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    visible && (
      <>
        <Toast ref={toast} />
        <div className="modal-overlay" onClick={onHide}></div>
        <div className="login-modal">
          <div
            className="d-flex "
            style={{
              justifyContent: "end",
            }}
            onClick={onHide}
          >
            <i
              className="pi pi-times "
              style={{
                color: "rgb(177 181 184) ",
              }}
            ></i>
          </div>
          <div className="content p-1">
            <div className="d-flex justify-content-center">
              <img src="/image/Logo black.svg" alt="Logo" width={"200px"} />
            </div>
            <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
              Welcome back!
            </p>
            <span
              className="d-flex justify-content-center"
              style={{ fontSize: "12px", color: "#4D4D4D", fontWeight: "200" }}
            >
              Login to continue to MATHIOLI
            </span>
            <form onSubmit={handleSubmit} className="m-auto mt-4">
              <div className="mb-3">
                <InputText
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-100"
                />
              </div>
              <div className="mb-3 login-password">
                <Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-100"
                  feedback={false}
                  toggleMask
                />
              </div>

              {/* <span className="d-flex justify-content-center">OR</span>

              <div
                className="d-flex justify-content-center"
                style={{
                  // cursor: loading ? "not-allowed" : "pointer",
                  cursor: "not-allowed",
                  // border: "1px solid black",
                  border: "0px",
                  borderRadius: "10px",
                  padding: "10px",
                  opacity: loading ? 0.5 : 1,
                  backgroundColor: "#e7e7e7",
                }}
                disabled={loading}
              >
                <FcGoogle className="fs-3" />
                <span className="ms-2">Continue via Google</span>
              </div> */}
              <Button
                label="Continue"
                className="w-100"
                type="submit"
                loading={loading}
                style={{ background: "#396664" }}
              />
            </form>
            <div className="mt-4">
              <p>
                Don’t have an account yet?{" "}
                <span
                  onClick={() => {
                    closeLoginPopup();
                    registerpoup();
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  signup
                </span>
                {""} here
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Login;
