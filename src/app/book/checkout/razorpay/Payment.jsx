// // "use client";
// // import React, { useEffect, useState, useCallback } from "react";
// // import Swal from "sweetalert2";
// // import { Col, Row } from "react-bootstrap";
// // import { bookingVerifypayment } from "../../../../../api/page";
// // import { Button } from "primereact/button";

// // const Payment = ({
// //   PlaceOrders,
// //   formData,
// //   total,
// //   razopayshow,
// //   paynowbutton,
// //   paynowbuttonsuccess,
// //   shippingdata,
// // }) => {
// //   const [sdkLoaded, setSdkLoaded] = useState(false);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [browserSupported, setBrowserSupported] = useState(true);
// //   const [paymentInitialized, setPaymentInitialized] = useState(false);
// //   const [raso, setRaso] = useState({});

// //   // Define checkBrowserSupport inside the component
// //   const checkBrowserSupport = useCallback(() => {
// //     if (typeof window === "undefined") return true;

// //     const userAgent = navigator.userAgent;
// //     // Supported browsers: Chrome, Firefox, Safari, Edge (not IE, Opera Mini, etc.)
// //     const isSupported =
// //       /chrome|firefox|safari|edge/i.test(userAgent) &&
// //       !/opera|opr|ie|trident/i.test(userAgent);

// //     // Additional check for mobile browsers
// //     if (/android|iphone|ipad|ipod/i.test(userAgent)) {
// //       // Additional checks for mobile browser support if needed
// //     }

// //     return isSupported;
// //   }, []);

// //   // Get Razorpay order details from session storage
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       try {
// //         const razorpayOrder = sessionStorage.getItem("razorpayOrder");
// //         if (razorpayOrder) {
// //           setRaso(JSON.parse(razorpayOrder));
// //         }
// //       } catch (error) {
// //         console.error("Failed to parse razorpayOrder:", error);
// //       }
// //     }
// //   }, []);

// //   const loadRazorpayScript = useCallback(() => {
// //     return new Promise((resolve, reject) => {
// //       if (window.Razorpay) {
// //         // console.log("Razorpay SDK already loaded");
// //         setSdkLoaded(true);
// //         resolve(true);
// //         return;
// //       }

// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.async = true;
// //       script.id = "razorpay-script";

// //       script.onload = () => {
// //         // console.log("Razorpay SDK loaded successfully");
// //         setSdkLoaded(true);
// //         resolve(true);
// //       };

// //       script.onerror = (error) => {
// //         console.error("Failed to load Razorpay SDK", error);
// //         setSdkLoaded(false);
// //         reject(new Error("Failed to load Razorpay SDK"));
// //       };

// //       document.body.appendChild(script);
// //     });
// //   }, []);

// //   const initializePayment = useCallback(async () => {
// //     if (
// //       !paynowbuttonsuccess ||
// //       !sdkLoaded ||
// //       !browserSupported ||
// //       paymentInitialized
// //     ) {
// //       return;
// //     }

// //     try {
// //       if (!window.Razorpay) {
// //         throw new Error("Razorpay not available");
// //       }

// //       const razorpayKey = process.env.RAZORPAY_KEY || "rzp_live_wJBFoukfvdWNdP";
// //       const orderTotal = paynowbuttonsuccess?.orders[0]?.orderTotal || 0;
// //       const razorpayOrderId = paynowbuttonsuccess?.orders[0]?.razorpayOrderId;

// //       if (!razorpayOrderId) {
// //         throw new Error("Razorpay Order ID is missing");
// //       }

// //       const options = {
// //         key: razorpayKey,
// //         amount: Math.round(orderTotal * 100),
// //         currency: "INR",
// //         name: "Mathioli",
// //         description: "Payment for your order",
// //         order_id: razorpayOrderId,
// //         handler: async (response) => {
// //           // console.log("Payment success response:", response);
// //           try {
// //             const paymentData = {
// //               razorpayOrderId: response.razorpay_order_id,
// //               razorpayPaymentId: response.razorpay_payment_id,
// //               razorpaySignature: response.razorpay_signature,
// //             };

// //             const apiResponse = await bookingVerifypayment(paymentData);
// //             // console.log("Verification response:", apiResponse);

// //             if (apiResponse?.success) {
// //               Swal.fire({
// //                 title: "Success",
// //                 text: apiResponse?.message || "Payment successful!",
// //                 icon: "success",
// //                 confirmButtonText: "Continue",
// //               }).then(() => {
// //                 sessionStorage.removeItem("razorpayOrder");
// //                 sessionStorage.removeItem("buysinglebook");
// //                 window.location.href = "/";
// //               });
// //             } else {
// //               Swal.fire(
// //                 "Verification Failed",
// //                 apiResponse?.data?.message || "Payment verification failed",
// //                 "error"
// //               );
// //             }
// //           } catch (error) {
// //             console.error("Verification error:", error);
// //             Swal.fire(
// //               "Error",
// //               "Unable to verify payment. Please contact support.",
// //               "error"
// //             );
// //           }
// //         },
// //         prefill: {
// //           name: raso?.order?.shippingInfo?.firstname || "",
// //           email: raso?.order?.shippingInfo?.email || "",
// //           contact: raso?.order?.shippingInfo?.phone || "",
// //         },
// //         notes: {
// //           orderId: paynowbuttonsuccess?.orders[0]?.orderId,
// //         },
// //         theme: {
// //           color: "#396664",
// //           hide_topbar: false,
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             // console.log("Payment modal closed");
// //             setIsProcessing(false);
// //             setPaymentInitialized(false);
// //           },
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);

// //       rzp.on("payment.failed", (response) => {
// //         console.error("Payment failed:", response.error);
// //         Swal.fire(
// //           "Payment Failed",
// //           response.error.description || "Payment could not be completed",
// //           "error"
// //         );
// //         setIsProcessing(false);
// //         setPaymentInitialized(false);
// //       });

// //       rzp.on("payment.authorized", (response) => {
// //         // console.log("Payment authorized:", response);
// //       });

// //       setPaymentInitialized(true);
// //       rzp.open();
// //     } catch (error) {
// //       console.error("Payment initialization error:", error);
// //       Swal.fire(
// //         "Payment Error",
// //         error.message || "Unable to initialize payment. Please try again.",
// //         "error"
// //       );
// //       setIsProcessing(false);
// //       setPaymentInitialized(false);
// //     }
// //   }, [
// //     paynowbuttonsuccess,
// //     sdkLoaded,
// //     browserSupported,
// //     paymentInitialized,
// //     raso,
// //   ]);

// //   const handlePayment = async () => {
// //     try {
// //       setIsProcessing(true);

// //       if (!checkBrowserSupport()) {
// //         throw new Error("Unsupported browser detected");
// //       }

// //       await loadRazorpayScript();
// //       await PlaceOrders();
// //     } catch (error) {
// //       console.error("Payment process failed:", error);
// //       Swal.fire(
// //         "Payment Error",
// //         error.message || "Unable to process payment. Please try again.",
// //         "error"
// //       );
// //       setBrowserSupported(false);
// //       setIsProcessing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       setBrowserSupported(checkBrowserSupport());

// //       return () => {
// //         const script = document.getElementById("razorpay-script");
// //         if (script) {
// //           document.body.removeChild(script);
// //         }
// //       };
// //     }
// //   }, [checkBrowserSupport]);

// //   useEffect(() => {
// //     if (
// //       paynowbuttonsuccess &&
// //       sdkLoaded &&
// //       browserSupported &&
// //       !paymentInitialized
// //     ) {
// //       initializePayment();
// //     }
// //   }, [
// //     paynowbuttonsuccess,
// //     sdkLoaded,
// //     browserSupported,
// //     paymentInitialized,
// //     initializePayment,
// //   ]);

// //   return (
// //     <div className="payment-container" style={{ fontFamily: "Poppins" }}>
// //       <div className="booking-details">
// //         <Row>
// //           {!browserSupported && (
// //             <div className="alert alert-warning mb-3">
// //               <strong>Browser Not Supported:</strong> For the best payment
// //               experience, please use Google Chrome or Mozilla Firefox.
// //             </div>
// //           )}

// <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     if (browserSupported && !isProcessing) {
//       handlePayment();
//     }
//   }}
// >
//   <Button
//     label={"Pay Now"}
//     type="submit"
//     style={{
//       background: "#396664",
//       border: "none",
//       padding: "12px 24px",
//       fontSize: "16px",
//     }}
//     className="rounded-2 m-2 w-100"
//     disabled={
//       !formData.privacy_policy ||
//       !shippingdata ||
//       isProcessing ||
//       !browserSupported
//     }
//     icon={isProcessing ? "pi pi-spinner pi-spin" : ""}
//   />
// </form>

// //           {/* <div className="mt-3 text-center">
// //             <small className="text-muted">
// //               Secure payment powered by Razorpay
// //             </small>
// //           </div> */}
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Payment;
// // "use client";
// // import React, { useEffect, useState, useCallback } from "react";
// // import Swal from "sweetalert2";
// // import { Col, Row } from "react-bootstrap";
// // import { bookingVerifypayment } from "../../../../../api/page";
// // import { Button } from "primereact/button";

// // const Payment = ({
// //   PlaceOrders,
// //   formData,
// //   total,
// //   razopayshow,
// //   paynowbutton,
// //   paynowbuttonsuccess,
// //   shippingdata,
// // }) => {
// //   const [sdkLoaded, setSdkLoaded] = useState(false);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [browserSupported, setBrowserSupported] = useState(true);
// //   const [paymentInitialized, setPaymentInitialized] = useState(false);
// //   const [raso, setRaso] = useState({});

// //   // ✅ Feature-based browser support check
// //   const checkBrowserSupport = useCallback(() => {
// //     if (typeof window === "undefined") return true;

// //     try {
// //       const requiredFeatures = [
// //         "Promise",
// //         "fetch",
// //         "URL",
// //         "FormData",
// //         "CustomEvent",
// //         "IntersectionObserver",
// //       ];

// //       const isMissingFeature = requiredFeatures.some(
// //         (feature) => !(feature in window)
// //       );

// //       if (isMissingFeature) return false;

// //       const userAgent = navigator.userAgent.toLowerCase();
// //       const isUnsupportedBrowser = /msie|trident|edge\/1[0-7]/i.test(userAgent); // IE or old Edge only

// //       return !isUnsupportedBrowser;
// //     } catch (e) {
// //       console.error("Browser support check error:", e);
// //       return true;
// //     }
// //   }, []);

// //   // ✅ Get Razorpay order data from session
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       try {
// //         const razorpayOrder = sessionStorage.getItem("razorpayOrder");
// //         if (razorpayOrder) {
// //           setRaso(JSON.parse(razorpayOrder));
// //         }
// //       } catch (error) {
// //         console.error("Failed to parse razorpayOrder:", error);
// //       }
// //     }
// //   }, []);

// //   // ✅ Load Razorpay script
// //   const loadRazorpayScript = useCallback(() => {
// //     return new Promise((resolve, reject) => {
// //       if (window.Razorpay) {
// //         setSdkLoaded(true);
// //         resolve(true);
// //         return;
// //       }

// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.async = true;
// //       script.id = "razorpay-script";
// //       script.crossOrigin = "anonymous";

// //       script.onload = () => {
// //         setSdkLoaded(true);
// //         resolve(true);
// //       };

// //       script.onerror = (error) => {
// //         console.error("Failed to load Razorpay SDK", error);
// //         setSdkLoaded(false);
// //         reject(new Error("Failed to load Razorpay SDK"));
// //       };

// //       document.body.appendChild(script);
// //     });
// //   }, []);

// //   // ✅ Initialize Razorpay payment
// //   const initializePayment = useCallback(async () => {
// //     if (
// //       !paynowbuttonsuccess ||
// //       !sdkLoaded ||
// //       !browserSupported ||
// //       paymentInitialized
// //     ) {
// //       return;
// //     }

// //     try {
// //       if (!window.Razorpay) {
// //         await loadRazorpayScript();
// //         if (!window.Razorpay) throw new Error("Razorpay not available");
// //       }

// //       const razorpayKey = process.env.RAZORPAY_KEY || "rzp_live_wJBFoukfvdWNdP";
// //       const orderTotal = paynowbuttonsuccess?.orders[0]?.orderTotal || 0;
// //       const razorpayOrderId = paynowbuttonsuccess?.orders[0]?.razorpayOrderId;

// //       if (!razorpayOrderId) throw new Error("Razorpay Order ID is missing");

// //       const options = {
// //         key: razorpayKey,
// //         amount: Math.round(orderTotal * 100),
// //         currency: "INR",
// //         name: "Mathioli",
// //         description: "Payment for your order",
// //         order_id: razorpayOrderId,
// //         handler: async (response) => {
// //           try {
// //             const paymentData = {
// //               razorpayOrderId: response.razorpay_order_id,
// //               razorpayPaymentId: response.razorpay_payment_id,
// //               razorpaySignature: response.razorpay_signature,
// //             };

// //             const apiResponse = await bookingVerifypayment(paymentData);

// //             if (apiResponse?.success) {
// //               Swal.fire({
// //                 title: "Success",
// //                 text: apiResponse?.message || "Payment successful!",
// //                 icon: "success",
// //                 confirmButtonText: "Continue",
// //               }).then(() => {
// //                 sessionStorage.removeItem("razorpayOrder");
// //                 sessionStorage.removeItem("buysinglebook");
// //                 window.location.href = "/";
// //               });
// //             } else {
// //               Swal.fire(
// //                 "Verification Failed",
// //                 apiResponse?.data?.message || "Payment verification failed",
// //                 "error"
// //               );
// //             }
// //           } catch (error) {
// //             console.error("Verification error:", error);
// //             Swal.fire(
// //               "Error",
// //               "Unable to verify payment. Please contact support.",
// //               "error"
// //             );
// //           } finally {
// //             setIsProcessing(false);
// //             setPaymentInitialized(false);
// //           }
// //         },
// //         prefill: {
// //           name: raso?.order?.shippingInfo?.firstname || "",
// //           email: raso?.order?.shippingInfo?.email || "",
// //           contact: raso?.order?.shippingInfo?.phone || "",
// //         },
// //         notes: {
// //           orderId: paynowbuttonsuccess?.orders[0]?.orderId,
// //         },
// //         theme: {
// //           color: "#396664",
// //           hide_topbar: false,
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             setIsProcessing(false);
// //             setPaymentInitialized(false);
// //           },
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);

// //       rzp.on("payment.failed", (response) => {
// //         console.error("Payment failed:", response.error);
// //         Swal.fire(
// //           "Payment Failed",
// //           response.error.description || "Payment could not be completed",
// //           "error"
// //         );
// //         setIsProcessing(false);
// //         setPaymentInitialized(false);
// //       });

// //       setPaymentInitialized(true);
// //       rzp.open();
// //     } catch (error) {
// //       console.error("Payment initialization error:", error);
// //       Swal.fire(
// //         "Payment Error",
// //         error.message || "Unable to initialize payment. Please try again.",
// //         "error"
// //       );
// //       setIsProcessing(false);
// //       setPaymentInitialized(false);
// //     }
// //   }, [
// //     paynowbuttonsuccess,
// //     sdkLoaded,
// //     browserSupported,
// //     paymentInitialized,
// //     raso,
// //     loadRazorpayScript,
// //   ]);

// //   // ✅ Begin payment after placing order
// //   const handlePayment = async () => {
// //     try {
// //       setIsProcessing(true);
// //       await loadRazorpayScript();
// //       await PlaceOrders();
// //     } catch (error) {
// //       console.error("Payment process failed:", error);
// //       Swal.fire(
// //         "Payment Error",
// //         error.message || "Unable to process payment. Please try again.",
// //         "error"
// //       );
// //       setIsProcessing(false);
// //     }
// //   };

// //   // ✅ Check browser support once
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       const isSupported = checkBrowserSupport();
// //       setBrowserSupported(isSupported);

// //       return () => {
// //         const script = document.getElementById("razorpay-script");
// //         if (script) document.body.removeChild(script);
// //       };
// //     }
// //   }, [checkBrowserSupport]);

// //   // ✅ Trigger payment if ready
// //   useEffect(() => {
// //     if (
// //       paynowbuttonsuccess &&
// //       sdkLoaded &&
// //       browserSupported &&
// //       !paymentInitialized
// //     ) {
// //       initializePayment();
// //     }
// //   }, [
// //     paynowbuttonsuccess,
// //     sdkLoaded,
// //     browserSupported,
// //     paymentInitialized,
// //     initializePayment,
// //   ]);

// //   return (
// //     <div className="payment-container" style={{ fontFamily: "Poppins" }}>
// //       <div className="booking-details">
// //         <Row>
// //           {!browserSupported && (
// //             <div className="alert alert-warning mb-3">
// //               <strong>Note:</strong> Your browser is not supported. Please use
// //               the latest Chrome, Firefox, Safari, or Edge for a smooth payment
// //               experience.
// //             </div>
// //           )}

// //           <form
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               handlePayment();
// //             }}
// //           >
// //             <Button
// //               label={"Pay Now"}
// //               type="submit"
// //               style={{
// //                 background: "#396664",
// //                 border: "none",
// //                 padding: "12px 24px",
// //                 fontSize: "16px",
// //               }}
// //               className="rounded-2 m-2 w-100"
// //               disabled={
// //                 !formData.privacy_policy || !shippingdata || isProcessing
// //               }
// //               icon={isProcessing ? "pi pi-spinner pi-spin" : ""}
// //             />
// //           </form>
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Payment;
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import Swal from "sweetalert2";
// import { Col, Row } from "react-bootstrap";
// import { bookingVerifypayment } from "../../../../../api/page";
// import { Button } from "primereact/button";

// const Payment = ({
//   PlaceOrders,
//   formData,
//   total,
//   razopayshow,
//   paynowbutton,
//   paynowbuttonsuccess,
//   shippingdata,
// }) => {
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [browserSupported, setBrowserSupported] = useState(true);
//   const [paymentInitialized, setPaymentInitialized] = useState(false);
//   const [raso, setRaso] = useState({});
//   const [rzpInstance, setRzpInstance] = useState(null);

//   const checkBrowserSupport = useCallback(() => {
//     try {
//       const requiredFeatures = [
//         "Promise",
//         "fetch",
//         "URL",
//         "FormData",
//         "CustomEvent",
//         "IntersectionObserver",
//       ];
//       const isMissingFeature = requiredFeatures.some(
//         (feature) => !(feature in window)
//       );
//       const userAgent = navigator.userAgent.toLowerCase();
//       const isUnsupported = /msie|trident|edge\/1[0-7]/i.test(userAgent);
//       return !(isMissingFeature || isUnsupported);
//     } catch (e) {
//       console.error("Browser support check error:", e);
//       return false;
//     }
//   }, []);

//   const loadRazorpayScript = useCallback(() => {
//     return new Promise((resolve, reject) => {
//       if (window.Razorpay) {
//         console.log("Razorpay already loaded");
//         setSdkLoaded(true);
//         resolve(true);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       script.id = "razorpay-script";
//       script.crossOrigin = "anonymous";

//       script.onload = () => {
//         console.log("Razorpay SDK loaded successfully");
//         setSdkLoaded(true);
//         resolve(true);
//       };

//       script.onerror = (error) => {
//         console.error("Razorpay SDK load error:", error);
//         setSdkLoaded(false);
//         reject(new Error("Failed to load Razorpay SDK"));
//       };

//       document.body.appendChild(script);
//     });
//   }, []);

//   const cleanupRazorpay = useCallback(() => {
//     if (rzpInstance) {
//       console.log("Cleaning up Razorpay instance");
//       rzpInstance.close();
//       setRzpInstance(null);
//     }
//     setIsProcessing(false);
//     setPaymentInitialized(false);
//   }, [rzpInstance]);

//   const initializePayment = useCallback(async () => {
//     if (
//       !paynowbuttonsuccess ||
//       !sdkLoaded ||
//       !browserSupported ||
//       paymentInitialized
//     ) {
//       console.log("Payment not initialized due to unmet conditions");
//       return;
//     }

//     try {
//       const razorpayKey =
//         process.env.RAZORPAY_KEY || "rzp_test_your_test_key_here";
//       const order = paynowbuttonsuccess?.orders?.[0];

//       if (!order || !order.razorpayOrderId) {
//         throw new Error("Missing Razorpay Order ID");
//       }

//       console.log("Initializing payment with order:", order);

//       const options = {
// key: razorpayKey,
// amount: Math.round(order.orderTotal * 100),
// currency: "INR",
// name: "Mathioli",
//         description: "Payment for your order",
//         order_id: order.razorpayOrderId,
//         handler: async (response) => {
//           try {
//             console.log("Payment successful, verifying...", response);
//             const paymentData = {
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             };

//             const apiResponse = await bookingVerifypayment(paymentData);
//             if (apiResponse?.success) {
//               Swal.fire({
//                 title: "Success",
//                 text: apiResponse?.message || "Payment successful!",
//                 icon: "success",
//                 confirmButtonText: "Continue",
//               }).then(() => {
//                 sessionStorage.removeItem("razorpayOrder");
//                 sessionStorage.removeItem("buysinglebook");
//                 window.location.href = "/";
//               });
//             } else {
//               Swal.fire(
//                 "Verification Failed",
//                 apiResponse?.data?.message || "Payment verification failed",
//                 "error"
//               );
//             }
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             Swal.fire(
//               "Error",
//               "Unable to verify payment. Please contact support.",
//               "error"
//             );
//           } finally {
//             cleanupRazorpay();
//           }
//         },
//         prefill: {
//           name: raso?.order?.shippingInfo?.firstname || "Customer",
//           email: raso?.order?.shippingInfo?.email || "customer@example.com",
//           contact: raso?.order?.shippingInfo?.phone || "9999999999",
//         },
//         notes: {
//           orderId: order.orderId,
//         },
//         theme: {
//           color: "#396664",
//         },
//         modal: {
//           ondismiss: () => {
//             console.log("Modal dismissed by user");
//             Swal.fire({
//               title: "Payment Cancelled",
//               text: "You cancelled the payment process",
//               icon: "info",
//               confirmButtonText: "OK",
//             });
//             cleanupRazorpay();
//           },
//           escape: true,
//           backdropclose: true,
//         },
//       };

//       console.log("Creating Razorpay instance with options:", options);
//       const rzp = new window.Razorpay(options);
//       setRzpInstance(rzp);

//       rzp.on("payment.failed", (response) => {
//         console.error("Payment failed:", response.error);
//         Swal.fire(
//           "Payment Failed",
//           response.error.description || "Payment failed. Please try again.",
//           "error"
//         );
//         cleanupRazorpay();
//       });

//       rzp.on("modal.close", () => {
//         console.log("Modal explicitly closed");
//         cleanupRazorpay();
//       });

//       setPaymentInitialized(true);
//       rzp.open();
//       console.log("Razorpay modal opened");
//     } catch (error) {
//       console.error("Payment initialization failed:", error);
//       Swal.fire(
//         "Error",
//         error.message || "Payment initialization failed",
//         "error"
//       );
//       cleanupRazorpay();
//     }
//   }, [
//     paynowbuttonsuccess,
//     sdkLoaded,
//     browserSupported,
//     paymentInitialized,
//     raso,
//     cleanupRazorpay,
//   ]);

//   const handlePayment = async () => {
//     try {
//       setIsProcessing(true);
//       await loadRazorpayScript();
//       await PlaceOrders();
//     } catch (error) {
//       console.error("handlePayment error:", error);
//       Swal.fire("Error", error.message || "Payment failed", "error");
//       cleanupRazorpay();
//     }
//   };

//   // Load Razorpay Order from session (used for prefill)
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = sessionStorage.getItem("razorpayOrder");
//       if (data) {
//         try {
//           const parsedData = JSON.parse(data);
//           console.log("Loaded Razorpay order from session:", parsedData);
//           setRaso(parsedData);
//         } catch (err) {
//           console.error("Failed to parse razorpayOrder from sessionStorage");
//         }
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const isSupported = checkBrowserSupport();
//     setBrowserSupported(isSupported);
//     console.log("Browser supported:", isSupported);

//     return () => {
//       cleanupRazorpay();
//       const script = document.getElementById("razorpay-script");
//       if (script) {
//         console.log("Removing Razorpay script");
//         document.body.removeChild(script);
//       }
//     };
//   }, [checkBrowserSupport, cleanupRazorpay]);

//   useEffect(() => {
//     if (
//       paynowbuttonsuccess &&
//       sdkLoaded &&
//       browserSupported &&
//       !paymentInitialized
//     ) {
//       console.log("Conditions met, initializing payment");
//       initializePayment();
//     }
//   }, [
//     paynowbuttonsuccess,
//     sdkLoaded,
//     browserSupported,
//     paymentInitialized,
//     initializePayment,
//   ]);

//   return (
//     <div className="payment-container" style={{ fontFamily: "Poppins" }}>
//       <Row>
//         {!browserSupported && (
//           <div className="alert alert-warning mb-3">
//             <strong>Note:</strong> Your browser is not supported. Please use the
//             latest Chrome, Firefox, Safari, or Edge.
//           </div>
//         )}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handlePayment();
//           }}
//         >
//           <Button
//             label="Pay Now"
//             type="submit"
//             style={{
//               background: "#396664",
//               border: "none",
//               padding: "12px 24px",
//               fontSize: "16px",
//             }}
//             className="rounded-2 m-2 w-100"
//             disabled={
//               !formData?.privacy_policy || !shippingdata || isProcessing
//             }
//             icon={isProcessing ? "pi pi-spinner pi-spin" : ""}
//           />
//         </form>
//       </Row>
//     </div>
//   );
// };

// export default Payment;
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================

// "use client";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import { Button, Row } from "react-bootstrap";
// import { bookingVerifypayment } from "../../../../../api/page";

// const Payment = ({ PlaceOrders, paynowbuttonsuccess = [] }) => {
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         if (window.Razorpay) {
//           setSdkLoaded(true);
//           return resolve();
//         }

//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;

//         script.onload = () => {
//           setSdkLoaded(true);
//           resolve();
//         };

//         script.onerror = () => {
//           console.error("Razorpay SDK failed to load");
//           Swal.fire(
//             "Error",
//             "Payment gateway failed to load. Please refresh the page.",
//             "error"
//           );
//         };

//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpayScript();
//   }, []);

//   const initiatePayment = async () => {
//     if (!sdkLoaded) {
//       Swal.fire(
//         "Error",
//         "Payment gateway is still loading. Please wait.",
//         "error"
//       );
//       return;
//     }

//     // if (paynowbuttonsuccess.length === 0) {
//     //   Swal.fire("Info", "Please select at least one product", "info");
//     //   return;
//     // }

//     setIsProcessing(true);

//     try {
//       const res = await PlaceOrders();
//       console.log("Order response:", res);

//       const orderData = res?.orders?.[0];
//       if (!orderData?.razorpayOrderId) {
//         throw new Error("Failed to create Razorpay order");
//       }

//       console.log("Razorpay SDK Loaded:", !!window.Razorpay);

//       const options = {
//         key: "rzp_live_wJBFoukfvdWNdP", // Use live/test key accordingly
//         amount: Math.round(orderData.orderTotal * 100), // In paise
//         currency: "INR",
//         name: "Mathioli",
//         description: `Order #${orderData.orderId}`,
//         order_id: orderData.razorpayOrderId,
//         handler: async (response) => {
//           try {
//             const paymentData = {
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//               orderId: orderData.orderId,
//             };

//             const verification = await bookingVerifypayment(paymentData);
//             if (verification?.success) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Payment Successful!",
//                 text: `Order #${orderData.orderId} has been placed`,
//                 confirmButtonColor: "#0C8040",
//               });
//             } else {
//               throw new Error(
//                 verification?.message || "Payment verification failed"
//               );
//             }
//           } catch (error) {
//             console.error("Verification error:", error);
//             Swal.fire(
//               "Error",
//               error.message || "Payment verification failed",
//               "error"
//             );
//           }
//         },
//         theme: {
//           color: "#0c8040",
//         },
//         modal: {
//           ondismiss: () => {
//             setIsProcessing(false);
//             console.log("Payment modal closed");
//           },
//         },
//       };

//       console.log("Razorpay options:", options);

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", (response) => {
//         console.error("Payment failed:", response.error);
//         Swal.fire("Payment Failed", response.error.description, "error");
//         setIsProcessing(false);
//       });

//       // Attempt to open the modal
//       setTimeout(() => {
//         console.log("Attempting to open payment modal...");
//         rzp.open();

//         // Check fallback in case modal fails to render
//         setTimeout(() => {
//           if (!document.querySelector(".razorpay-container")) {
//             console.warn("Modal not detected, retrying...");
//             const rzpRetry = new window.Razorpay(options);
//             rzpRetry.open();
//           }
//         }, 1000);
//       }, 300);
//     } catch (error) {
//       console.error("Payment error:", error);
//       Swal.fire(
//         "Error",
//         error.message || "Failed to initiate payment",
//         "error"
//       );
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Poppins" }}>
//       <div className="booking-detailssssss">
//         <Row>
//           <Button
//             variant="contained"
//             style={{
//               color: "#fff",
//               width: "100%",
//               borderRadius: "15px",
//               marginTop: "10px",
//               background: "red",
//             }}
//             onClick={initiatePayment}
//           >
//             {isProcessing ? "Processing..." : "Pay Now"}
//           </Button>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Payment;
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================

// "use client";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import { Button, Row } from "react-bootstrap";
// import { bookingVerifypayment } from "../../../../../api/page";

// const Payment = ({ handlePayment, paynowbuttonsuccess = [] }) => {
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     // const loadRazorpayScript = () => {
//     //   return new Promise((resolve) => {
//     //     if (window.Razorpay) {
//     //       setSdkLoaded(true);
//     //       return resolve();
//     //     }

//     //     const script = document.createElement("script");
//     //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     //     script.async = true;

//     //     script.onload = () => {
//     //       setSdkLoaded(true);
//     //       resolve();
//     //     };

//     //     script.onerror = () => {
//     //       console.error("Razorpay SDK failed to load");
//     //       Swal.fire(
//     //         "Error",
//     //         "Payment gateway failed to load. Please refresh the page.",
//     //         "error"
//     //       );
//     //     };

//     //     document.body.appendChild(script);
//     //   });
//     // };

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
//   const initiatePayment = async () => {
//     console.log("initiatePayment called");
//     console.log("paynowbuttonsuccess called", paynowbuttonsuccess);
//     const orderData = await handlePayment();
//     console.log("handlePayment success response", orderData);
//     if (paynowbuttonsuccess?.length === 0) {
//       Swal.fire({
//         title: "info",
//         text: "Please select the product",
//         timer: 3000,
//         // confirm: true,
//       });
//       return;
//     }

//     if (orderData?.orders.length > 0) {
//       if (!sdkLoaded || !window.Razorpay) {
//         Swal.fire(
//           "Error",
//           "Razorpay SDK not loaded. Please refresh and try again.",
//           "error"
//         );
//         return;
//       }

//       const options = {
//         key: "asdasdas_asdaS_asd", // Use live/test key accordingly
//         amount: Math.round(orderData?.orders[0]?.orderTotal * 100), // In paise
//         currency: "INR",
//         name: "Mathioli",
//         description: `Order #${orderData?.orders[0]?.orderId}`,
//         order_id: orderData?.orders[0]?.razorpayOrderId,
//         handler: async (response) => {
//           try {
//             const paymentData = {
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//               orderId: orderData?.orders[0]?.orderId,
//             };

//             const verification = await bookingVerifypayment(paymentData);
//             if (verification?.success) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Payment Successful!",
//                 text: `Order #${orderData.orderId} has been placed`,
//                 confirmButtonColor: "#0C8040",
//               });
//             } else {
//               throw new Error(
//                 verification?.message || "Payment verification failed"
//               );
//             }
//           } catch (error) {
//             console.error("Verification error:", error);
//             Swal.fire(
//               "Error",
//               error.message || "Payment verification failed",
//               "error"
//             );
//           }
//         },
//         theme: {
//           color: "#0c8040",
//         },
//         modal: {
//           ondismiss: () => {
//             setIsProcessing(false);
//             console.log("Payment modal closed");
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", (response) => {
//         Swal.fire(
//           "Error",
//           response.error.description || "Payment failed.",
//           "error"
//         );
//       });

//       rzp.open();
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Poppins" }}>
//       <div className="booking-detailssssss">
//         <Row>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               setIsProcessing(true);
//               initiatePayment().finally(() => setIsProcessing(false));
//             }}
//           >
//             <Button
//               variant="contained"
//               style={{
//                 color: "#fff",
//                 width: "100%",
//                 borderRadius: "15px",
//                 marginTop: "10px",
//                 background: "red",
//               }}
//               onClick={initiatePayment}
//               disabled={!sdkLoaded || isProcessing}
//             >
//               {isProcessing ? "Processing..." : "Pay Now"}
//             </Button>
//           </form>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Payment;
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
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
        // script.onerror = () => {
        //   console.error("Failed to load Razorpay SDK");
        //   Swal.fire(
        //     "Error",
        //     "Payment gateway failed to load. Please refresh the page.",
        //     "error"
        //   );
        // };
        script.onerror = () => console.error("Failed to load Razorpay SDK");
        document.body.appendChild(script);
      } else {
        console.log("Loading Razorpay SDK... true");
        setSdkLoaded(true);
      }
    };

    loadRazorpayScript();
  }, []);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   script.onload = () => setSdkLoaded(true);
  //   script.onerror = () => console.error("Failed to load Razorpay SDK");
  //   document.body.appendChild(script);
  // }, []);

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
        // if (!window.Razorpay) {
        Swal.fire(
          "Error",
          "Razorpay SDK not loaded. Please refresh and try again.",
          "error"
        );
        return;
      }

      const options = {
        key: "rzp_live_wJBFoukfvdWNdP", // Use live/test key accordingly
        amount: Math.round(orderData?.orders[0]?.orderTotal * 100), // In paise
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
          console.log("Payment data:", paymentData);
          try {
            const verification = await bookingVerifypayment(paymentData);
            if (verification?.success) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: `Order #${orderData.orders[0].orderId} has been placed`,
                confirmButtonColor: "#0C8040",
              });
            } else {
              // throw new Error(
              //   verification?.message || "Payment verification failed"
              // );
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
      // rzp.on("payment.failed", (response) => {
      //   Swal.fire(
      //     "Error",
      //     response.error.description || "Payment failed.",
      //     "error"
      //   );
      // });

      rzp.open();
    } else {
      Swal.fire("Error", "Invalid order data. Please try again.", "error");
    }
  };

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <div className="booking-detailssssss">
        <Row>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsProcessing(true);
              initiatePayment().finally(() => setIsProcessing(false));
            }}
          >
            <Button
              variant="contained"
              style={{
                color: "#fff",
                width: "100%",
                borderRadius: "15px",
                marginTop: "10px",
                background: "red",
              }}
              onClick={initiatePayment}
              // disabled={!sdkLoaded || isProcessing}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </form> */}
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
                // !browserSupported
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
