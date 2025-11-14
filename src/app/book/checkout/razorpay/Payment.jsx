"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Button, Row } from "react-bootstrap";
import { bookingVerifypayment } from "../../../../../api/page";

const Payment = ({
  handlePayment,
  paynowbuttonsuccess = [],
  formData,
  paynowbutton,
  selectedProduct,
  shippingdata,
  activeAddress,
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (window.Razorpay) {
        console.log("Loading Razorpay SDK...");
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setSdkLoaded(true);
        script.onerror = () => console.error("Failed to load Razorpay SDK");
        document.body.appendChild(script);
      } else {
        console.log("Loading Razorpay SDK... true");
        setSdkLoaded(true);
      }
    };

    loadRazorpayScript();
  }, []);

  const initiatePayment = async () => {
    console.log("initiatePayment called");
    console.log("paynowbuttonsuccess called", paynowbuttonsuccess);

    const orderData = await handlePayment();
    console.log(
      "handlePayment success response orderData ----------->",
      orderData
    );
    if (orderData?.orders.length > 0) {
      if (!sdkLoaded || !window.Razorpay) {
        Swal.fire(
          "Error",
          "Razorpay SDK not loaded. Please refresh and try again.",
          "error"
        );
        return;
      }

      const options = {
        key: "rzp_live_wJBFoukfvdWNdP",
        amount: Math.round(orderData?.orders[0]?.orderTotal * 100),
        currency: "INR",
        name: "Mathioli",
        description: `Order #${orderData?.orders[0]?.orderId}`,
        order_id: orderData?.orders[0]?.razorpayOrderId,
        handler: async (response) => {
          const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: orderData?.orders[0]?.orderId,
          };
          try {
            const verification = await bookingVerifypayment(paymentData);
            if (verification?.success) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: `Order #${orderData.orders[0].orderId} has been placed`,
                confirmButtonColor: "#0C8040",
              })
                .then(() => {
                  router.push(`/`);
                });
            } else {
              Swal.fire(
                "Error",
                verification?.message || "Payment failed",
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
        theme: {
          color: "#0c8040",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      Swal.fire("Error", "Invalid order data. Please try again.", "error");
    }
  };

  return (
    <div style={{ fontFamily: "Poppins" }}>
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
              type="submit"
              style={{
                background: "#396664",
                border: "none",
                padding: "12px 24px",
                fontSize: "16px",
              }}
              className="rounded-2 m-2 w-100"
              disabled={
                !formData.privacy_policy ||
                !shippingdata ||
                isProcessing ||
                !activeAddress
              }
              icon={isProcessing ? "pi pi-spinner pi-spin" : ""}
            >
              Pay Now
            </Button>
          </form>
        </Row>
      </div>
    </div>
  );
};

export default Payment;
