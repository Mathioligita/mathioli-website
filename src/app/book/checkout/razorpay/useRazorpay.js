"use client";
import { useState, useEffect } from "react";

export default function useRazorpay() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.id = "razorpay-script";

      script.onload = () => {
        setRazorpayLoaded(true);
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
      };

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  return razorpayLoaded;
}
