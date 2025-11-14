"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { ResendOTPAPI, VerifyOTPAPI, VerifyForgotPasswordOTPAPI } from "api/verifyOTP";
import userContext from "../../UseContext/UseContext";
function VerifyOTP({
  email,
  onVerifySuccess,
  onBack,
  mode = "register", // 'register' or 'forgot-password'
  title = "Verify Your Email",
  subtitle = "We've sent a 6-digit verification code to"
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { regsiterPopup, loginpoup } = useContext(userContext);
  const toast = useRef(null);
  const router = useRouter();
  const inputRefs = useRef([]);

  // Function to mask email
  const maskEmail = (email) => {
    if (!email) return '';

    const atIndex = email.indexOf('@');
    if (atIndex <= 5) {
      // If @ is within first 5 characters, show first 3 characters
      const visiblePart = email.substring(0, 3);
      const domain = email.substring(atIndex);
      return `${visiblePart}${'*'.repeat(atIndex - 3)}${domain}`;
    } else {
      // Show first 5 characters, mask the rest before @
      const visiblePart = email.substring(0, 5);
      const maskedPart = '*'.repeat(atIndex - 5);
      const domain = email.substring(atIndex);
      return `${visiblePart}${maskedPart}${domain}`;
    }
  };

  const maskedEmail = maskEmail(email);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (pasteArray[i]) {
          newOtp[i] = pasteArray[i];
        }
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter a 6-digit OTP code",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: email,
        otp: otpCode
      };

      let response;
      if (mode === "forgot-password") {
        response = await VerifyForgotPasswordOTPAPI(payload);
      } else {
        response = await VerifyOTPAPI(payload);
      }

      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: "Verification Successful",
          detail: response?.message || "Verification successful",
          life: 1500,
        });

        setTimeout(() => {
          onVerifySuccess();
          regsiterPopup();
          loginpoup();
        }, 1500);
      }
      else {
        toast.current.show({
          severity: "error",
          summary: "Verification Failed",
          detail: response?.errors || "Invalid OTP code",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred during verification",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const payload = { email: email };

      let response;
      if (mode === "forgot-password") {
        response = await ResendOTPAPI(payload);
      } else {
        response = await ResendOTPAPI(payload);
      }

      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: "OTP Resent",
          detail: response.message || "A new OTP has been sent to your email",
          life: 3000,
        });

        setCountdown(30);
        setOtp(["", "", "", "", "", ""]);

        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        throw new Error(response.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to resend OTP. Please try again.",
        life: 3000,
      });
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="content p-1">
      <Toast ref={toast} />
      <div className="d-flex justify-content-center">
        <img src="/image/logo-black.svg" alt="Logo" width={"200px"} />
      </div>
      <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
        {title}
      </p>
      <span
        className="d-flex justify-content-center text-center"
        style={{
          fontSize: "12px",
          color: "#4D4D4D",
          fontWeight: "200",
        }}
      >
        {subtitle} {maskedEmail}
      </span>

      <form onSubmit={handleSubmit} className="m-auto mt-4">
        <div className="d-flex justify-content-center gap-2 mb-4">
          {otp?.map((digit, index) => (
            <InputText
              key={index}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              className="text-center"
              style={{ width: "40px", height: "50px", fontSize: "20px" }}
            />
          ))}
        </div>

        <Button
          label="Verify"
          className="w-100 mt-2"
          type="submit"
          loading={loading}
          style={{ background: "#396664" }}
        />

        <div className="mt-3 text-center">
          {countdown > 0 ? (
            <p style={{ fontSize: "14px", color: "#6c757d" }}>
              Resend OTP in {countdown} seconds
            </p>
          ) : (
            <Button
              label="Resend OTP"
              className="p-button-text"
              onClick={handleResendOTP}
              loading={resendLoading}
              disabled={resendLoading}
              style={{ color: "#396664" }}
            />
          )}
        </div>
      </form>

      <div className="mt-4 text-center">
        <p>
          Wrong email?{" "}
          <span
            onClick={onBack}
            style={{
              cursor: "pointer",
              color: "blue",
            }}
          >
            Go back
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;