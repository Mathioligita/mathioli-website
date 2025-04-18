"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { bookingVerifypayment } from "../../../../../api/order"; // Import your API function

const Payment = ({ handlePayment, selectedProduct }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setSdkLoaded(true);
        script.onerror = () => console.error("Failed to load Razorpay SDK");
        document.body.appendChild(script);
      } else {
        setSdkLoaded(true);
      }
    };

    loadRazorpayScript();
  }, []);

  const initiatePayment = async () => {
    const res = await handlePayment();

    if (selectedProduct.length === 0) {
      Swal.fire({
        title: "Info",
        text: "Please select the product",
        timer: 3000,
      });
      return;
    }

    if (res) {
      if (!sdkLoaded || !window.Razorpay) {
        Swal.fire(
          "Error",
          "Razorpay SDK not loaded. Please refresh and try again.",
          "error"
        );
        return;
      }

      const options = {
        key: "rzp_test_KSAPXNLwGmp9M2", // Replace with your Razorpay Key ID
        amount: (res?.orderTotalAmount || 0) * 100, // Convert amount to paise
        currency: "INR",
        name: "Selli Trader ",
        order_id: res?.razorpayOrderId, // Order ID from backend
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          try {
            const apiResponse = await bookingVerifypayment(paymentData);
            if (apiResponse?.data?.success) {
              Swal.fire("Success", "Payment successful!", "success");
            } else {
              Swal.fire(
                "Error",
                apiResponse?.data?.message || "Payment failed",
                "error"
              );
            }
          } catch (error) {
            console.error("API error:", error);
            Swal.fire(
              "Error",
              "Unable to verify payment. Please try again.",
              "error"
            );
          }
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        Swal.fire(
          "Error",
          response.error.description || "Payment failed.",
          "error"
        );
      });

      rzp.open();
    }
  };

  return (
    <div className="" style={{ fontFamily: "Poppins" }}>
      <div className="booking-detailssssss">
        <Row>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsProcessing(true);
              initiatePayment().finally(() => setIsProcessing(false));
            }}
          >
            <Button
              label={isProcessing ? "Processing..." : "Pay Now"}
              icon="pi pi-shopping-cart"
              className="p-button-primary"
              style={{ width: "100%", borderRadius: "15px", marginTop: "10px" }}
              onClick={initiatePayment}
              disabled={!sdkLoaded || isProcessing}
            />
          </form>
        </Row>
      </div>
    </div>
  );
};

export default Payment;
