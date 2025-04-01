"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import { bookingVerifypayment } from "../../../../../api/page"; // Import your API function
import { Button } from "primereact/button";

const Payment = ({
  PlaceOrders,
  // formData,
  // total,
  // razopayshow,
  // paynowbutton,
  paynowbuttonsuccess,
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get Razorpay order details from session storage
  let raso = {};
  raso =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("AudioPay"))
      : null || {};
  // try {
  // } catch (error) {
  //   console.error("Failed to parse razorpayOrder from session storage:", error);
  // }
  console.log(raso, "raso>>>>>>>>>>>>>>>");

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

  const handlePayment = async () => {
    PlaceOrders();
  };
  console.log(paynowbuttonsuccess, "paynowbuttonsuccess");
  useEffect(() => {
    if (paynowbuttonsuccess) {
      // console.log("paynowbuttonsuccess state updated:", paynowbuttonsuccess);
      // Proceed with Razorpay options
      const options = {
        key: "rzp_live_wJBFoukfvdWNdP",
        // amount:  (raso?.orders[0]?.orderTotal || 0) * 100,
        amount: (raso?.order?.totalAmount || 0) * 100,
        currency: "INR",
        name: "Mathioli ",
        order_id: raso?.order?.razorpayOrderId,
        // key_secret: "UVRURpVTJBiXiHQcET8ZBEUt",
        handler: async (response) => {
          console.log(response, "responsepayementVerfity");
          localStorage.setItem("verifypaymeny", response);
          if (response) {
            const paymentData = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };

            try {
              const apiResponse = await bookingVerifypayment(paymentData);
              console.log(apiResponse, "apiResponse");
              if (apiResponse?.success) {
                Swal.fire("Success", apiResponse.message, "success");
              } else {
                Swal.fire(
                  "Error",
                  apiResponse?.data?.message || "Payment failed",
                  "error"
                );
              }
            } catch (error) {}
            console.error("API error:", error);
            Swal.fire(
              "Error",
              "Unable to verify payment. Please try again.",
              "error"
            );
          }
        },
        prefill: {
          name: raso?.order?.shippingInfo?.firstname,
          email: raso?.order?.shippingInfo?.email,
          contact: raso?.order?.shippingInfo?.phone,
        },
        theme: { color: "#396664" },
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
  }, [paynowbuttonsuccess]);

  return (
    <div className="" style={{ fontFamily: "Poppins" }}>
      <div className=" booking-detailssssss">
        <Row>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsProcessing(true);
              handlePayment().finally(() => setIsProcessing(false));
            }}
            className="text-end"
          >
            <Button
              label={
                isProcessing
                  ? "Processing..."
                  : sdkLoaded
                  ? "Pay Now"
                  : "Loading Payment..."
              }
              type="submit"
              // className="place-order"
              style={{ background: "#396664" }}
              className="rounded-2  me-2 mb-2"
              // disabled={
              //   !formData.privacy_policy ||
              //   // !paynowbutton ||
              //   !sdkLoaded ||
              //   isProcessing
              // }
            ></Button>
          </form>
        </Row>
      </div>
    </div>
  );
};

export default Payment;
