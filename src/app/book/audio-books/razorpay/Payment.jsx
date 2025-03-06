

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { Col, Row } from "react-bootstrap";
// import { bookingVerifypayment } from "api/page"; // Import your API function
// import { Button } from "primereact/button";

// const Payment = ({ Paymentplace }) => {
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Get Razorpay order details from session storage
//   const raso = JSON.parse(sessionStorage.getItem("razorpayOrder")) || {};

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       if (!window.Razorpay) {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
//         script.onload = () => setSdkLoaded(true);
//         script.onerror = () => console.error("Failed to load Razorpay SDK");
//         document.body.appendChild(script);
//       } else {
//         setSdkLoaded(true);
//       }
//     };

//     loadRazorpayScript();
//   }, []);

//   const handlePayment = async () => {
//     Paymentplace();
//     if (!sdkLoaded || !window.Razorpay) {
//       Swal.fire(
//         "Error",
//         "Razorpay SDK not loaded. Please refresh and try again.",
//         "error"
//       );
//       return;
//     }

//     const options = {
//       key: "rzp_live_wJBFoukfvdWNdP", // Replace with your Razorpay Key ID
//       amount: (raso?.order?.orderTotal || 0) * 100, // Convert amount to paise
//       currency: "INR",
//       name: "Mathioli ",
//       order_id: raso?.razorpayOrder?.id, // Order ID from backend
//       handler: async (response) => {
//         const paymentData = {
//           orderId: response.razorpay_order_id,
//           paymentId: response.razorpay_payment_id,
//           signature: response.razorpay_signature,
//         };

//         try {
//           const apiResponse = await bookingVerifypayment(paymentData);
//           if (apiResponse?.data?.success) {
//             Swal.fire("Success", "Payment successful!", "success");
//           } else {
//             Swal.fire(
//               "Error",
//               apiResponse?.data?.message || "Payment failed",
//               "error"
//             );
//           }
//         } catch (error) {
//           console.error("API error:", error);
//           Swal.fire(
//             "Error",
//             "Unable to verify payment. Please try again.",
//             "error"
//           );
//         }
//       },
//       prefill: {
//         name: raso?.order?.shippingInfo?.firstname,
//         email: raso?.order?.shippingInfo?.email,
//         contact: raso?.order?.shippingInfo?.phone,
//       },
//       theme: { color: "#F37254" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.on("payment.failed", (response) => {
//       Swal.fire(
//         "Error",
//         response.error.description || "Payment failed.",
//         "error"
//       );
//     });

//     rzp.open();
//   };

//   return (
//     // <div className="overlay" style={{ fontFamily: "Poppins" }}>
//     <div className=" booking-detailssssss">
//       <Row>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             setIsProcessing(true);
//             handlePayment().finally(() => setIsProcessing(false));
//           }}
//         >
//           <div className="m-2 text-end">
//             <Button
//               label={
//                 isProcessing
//                   ? "Processing..."
//                   : sdkLoaded
//                   ? "Pay Now"
//                   : "Loading Payment..."
//               }
//               type="submit"
//               className="place-order"
//               disabled={!sdkLoaded || isProcessing}
//             ></Button>
//           </div>
//         </form>
//       </Row>
//     </div>
//     // </div>
//   );
// };

// export default Payment;
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import { bookingVerifypayment } from "api/page"; // Import your API function
import { Button } from "primereact/button";

const Payment = ({ handlePaymentplace }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  // Get Razorpay order details from session storage
  const raso = JSON.parse(sessionStorage.getItem("AudioPay")) || {};

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
    setIsProcessing(true);
    // First, create the order
    await handlePaymentplace();
    setOrderCreated(true);
    setIsProcessing(false);
  };

  const initiateRazorpayPayment = () => {
    if (!sdkLoaded || !window.Razorpay) {
      Swal.fire(
        "Error",
        "Razorpay SDK not loaded. Please refresh and try again.",
        "error"
      );
      return;
    }

    const options = {
      key: "rzp_live_wJBFoukfvdWNdP", // Replace with your Razorpay Key ID
      amount: (raso?.order?.orderTotal || 0) * 100, // Convert amount to paise
      currency: "INR",
      name: "Mathioli ",
      order_id: raso?.razorpayOrder?.id, // Order ID from backend
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
      prefill: {
        name: raso?.order?.shippingInfo?.firstname,
        email: raso?.order?.shippingInfo?.email,
        contact: raso?.order?.shippingInfo?.phone,
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
  };

  useEffect(() => {
    if (orderCreated) {
      initiateRazorpayPayment();
    }
  }, [orderCreated]);

  return (
    <div className="booking-detailssssss">
      <Row>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
        >
          <div className="m-2 text-end">
            <Button
              label={
                isProcessing
                  ? "Processing..."
                  : sdkLoaded
                  ? "Pay Now"
                  : "Loading Payment..."
              }
              type="submit"
              className="place-order"
              disabled={!sdkLoaded || isProcessing}
            ></Button>
          </div>
        </form>
      </Row>
    </div>
  );
};

export default Payment;
