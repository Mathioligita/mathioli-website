// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------entire forgot password flow with reusbale verify otp component------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
"use client";
import React, { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import "./login.css";
import Cookies from "js-cookie";
import { LoginAPi } from "../../../api/page";
import userContext from "../UseContext/UseContext";
import { ForgotPasswordAPI, ResetPasswordAPI } from "api/verifyOTP";
import VerifyOTP from "../CommonPages/OTPVerification/OTPVerification"; // Import the reusable component

function Login({ visible, onHide }) {
  const toast = useRef(null);
  const { registerpoup, closeLoginPopup } = useContext(userContext);
  const guest = Cookies.get("guestId");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  
  // Forgot password states
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email: formData.email, password: formData.password, guestId: guest };
    
    try {
      const response = await LoginAPi(payload);
      if (response.success) {
        Cookies.set("refreshToken", response.data.refreshToken);
        Cookies.set("accessToken", response.data.accessToken);
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: "Login successfully",
          life: 3000,
        });
        setTimeout(() => onHide(), 1000);
      } else {
        toast.current.show({
          severity: "error",
          detail: response.data,
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: "An error occurred during login.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter your email address",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload = { email: forgotPasswordEmail };
      const data = await ForgotPasswordAPI(payload);

      if (data.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.message || "OTP sent to your email",
          life: 3000,
        });
        setCurrentView("verify");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to send OTP",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "An error occurred while processing your request",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    setCurrentView("reset");
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter and confirm your new password",
        life: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Passwords do not match",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload = { 
        email: forgotPasswordEmail,
        newPassword,
        confirmPassword
      };
      const data = await ResetPasswordAPI(payload);

      if (data.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.message || "Password reset successfully",
          life: 3000,
        });
        setCurrentView("login");
        setForgotPasswordEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to reset password",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while resetting password",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLoginView = () => (
    <>
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
        <div className="mb-3 text-end">
          <span
            className="forgot-password-link"
            onClick={() => setCurrentView("forgot")}
          >
            Forgot Password?
          </span>
        </div>
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
          Don't have an account yet?{" "}
          <span
            onClick={() => {
              closeLoginPopup();
              registerpoup();
            }}
            className="signup-link"
          >
            signup
          </span>{" "}
          here
        </p>
      </div>
    </>
  );

  const renderForgotPasswordView = () => (
    <div className="m-auto mt-4">
      <div className="mb-3">
        <InputText
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-100"
        />
      </div>
      <Button
        label="Send OTP"
        className="w-100"
        onClick={handleForgotPassword}
        loading={loading}
        style={{ background: "#396664" }}
      />
      <div className="mt-3 text-center">
        <span
          className="back-to-login-link"
          onClick={() => setCurrentView("login")}
        >
          Back to Login
        </span>
      </div>
    </div>
  );

  const renderVerifyOTPView = () => (
    <VerifyOTP
      email={forgotPasswordEmail}
      onVerifySuccess={handleVerifySuccess}
      onBack={() => setCurrentView("forgot")}
      mode="forgot-password"
      title="Verify OTP"
      subtitle="We've sent a 6-digit verification code to"
    />
  );

  const renderResetPasswordView = () => (
    <div className="m-auto mt-4">
      <div className="mb-3 login-password">
        <Password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-100"
          feedback={false}
          toggleMask
        />
      </div>
      <div className="mb-3 login-password">
        <Password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-100"
          feedback={false}
          toggleMask
        />
      </div>
      <Button
        label="Reset Password"
        className="w-100"
        onClick={handleResetPassword}
        loading={loading}
        style={{ background: "#396664" }}
      />
      <div className="mt-3 text-center">
        <span
          className="back-to-login-link"
          onClick={() => setCurrentView("login")}
        >
          Back to Login
        </span>
      </div>
    </div>
  );

  const getViewTitle = () => {
    switch (currentView) {
      case "forgot": return "Reset Password";
      case "verify": return "Verify OTP";
      case "reset": return "Set New Password";
      default: return "Welcome back!";
    }
  };

  const getViewSubtitle = () => {
    switch (currentView) {
      case "forgot": return "Enter your email to receive an OTP";
      case "verify": return "Enter the OTP sent to your email";
      case "reset": return "Set your new password";
      default: return "Login to continue to MATHIOLI";
    }
  };

  return (
    visible && (
      <>
        <Toast ref={toast} />
        <div className="modal-overlay" onClick={onHide}></div>
         <div className="login-modal">
          <div className="d-flex" style={{ justifyContent: "end" }} onClick={onHide}>
            <i className="pi pi-times" style={{ color: "rgb(177 181 184)" }}></i>
          </div>
          <div className="content p-1">
            { currentView === "verify" ? (
              ""
            ):(
              <>
            <div className="d-flex justify-content-center">
              <img src="/image/logo-black.svg" alt="Logo" width={"200px"} />
            </div> 
             <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
              {getViewTitle()}
            </p>
            <span
              className="d-flex justify-content-center"
              style={{ fontSize: "12px", color: "#4D4D4D", fontWeight: "200" }}
            >
              {getViewSubtitle()}
            </span> 
            </>
            )

            }
            {currentView === "login" && renderLoginView()}
            {currentView === "forgot" && renderForgotPasswordView()}
            {currentView === "verify" && renderVerifyOTPView()}
            {currentView === "reset" && renderResetPasswordView()}
          </div>
        </div>
      </>
    )
  );
}

export default Login;