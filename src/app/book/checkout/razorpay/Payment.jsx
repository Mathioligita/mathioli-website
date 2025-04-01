// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import Swal from "sweetalert2";
// // // import { Col, Row } from "react-bootstrap";
// // // import { bookingVerifypayment } from "../../../../../api/page"; // Import your API function
// // // import { Button } from "primereact/button";

// // // const Payment = ({
// // //   PlaceOrders,
// // //   formData,
// // //   total,
// // //   razopayshow,
// // //   paynowbutton,
// // //   paynowbuttonsuccess,
// // //   shippingdata,
// // // }) => {
// // //   const [sdkLoaded, setSdkLoaded] = useState(false);
// // //   const [isProcessing, setIsProcessing] = useState(false);

// // //   // Get Razorpay order details from session storage
// // //   let raso = {};
// // //   raso =
// // //     typeof window !== "undefined"
// // //       ? JSON.parse(sessionStorage.getItem("razorpayOrder"))
// // //       : null || {};
// // //   // try {
// // //   // } catch (error) {
// // //   //   console.error("Failed to parse razorpayOrder from session storage:", error);
// // //   // }
// // //   // console.log(raso, "raso>>>>>>>>>>>>>>>");

// // //   useEffect(() => {
// // //     const loadRazorpayScript = () => {
// // //       if (!window.Razorpay) {
// // //         const script = document.createElement("script");
// // //         script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //         script.async = true;
// // //         script.onload = () => setSdkLoaded(true);
// // //         script.onerror = () => console.error("Failed to load Razorpay SDK");
// // //         document.body.appendChild(script);
// // //       } else {
// // //         setSdkLoaded(true);
// // //       }
// // //     };

// // //     loadRazorpayScript();
// // //   }, []);

// // //   const handlePayment = async () => {
// // //     PlaceOrders();
// // //   };
// // //   useEffect(() => {
// // //     if (paynowbuttonsuccess) {
// // //       // console.log("paynowbuttonsuccess state updated:", paynowbuttonsuccess);
// // //       // Proceed with Razorpay options
// // //       const options = {
// // //         key: "rzp_live_wJBFoukfvdWNdP",
// // //         // amount:  (raso?.orders[0]?.orderTotal || 0) * 100,
// // //         amount: (raso?.orders[0]?.orderTotal || 0) * 100,
// // //         currency: "INR",
// // //         name: "Mathioli ",
// // //         order_id: raso?.orders?.razorpayOrderId,
// // //         // key_secret: "UVRURpVTJBiXiHQcET8ZBEUt",
// // //         handler: async (response) => {
// // //           console.log(response, "responsepayementVerfity");
// // //           localStorage.setItem("verifypaymeny", response);
// // //           if (response) {
// // //             const paymentData = {
// // //               razorpayOrderId: response.razorpay_order_id,
// // //               razorpayPaymentId: response.razorpay_payment_id,
// // //               razorpaySignature: response.razorpay_signature,
// // //             };

// // //             try {
// // //               const apiResponse = await bookingVerifypayment(paymentData);

// // //               if (apiResponse?.data?.success) {
// // //                 Swal.fire("Success", "Payment successful!", "success");
// // //               } else {
// // //                 Swal.fire(
// // //                   "Error",
// // //                   apiResponse?.data?.message || "Payment failed",
// // //                   "error"
// // //                 );
// // //               }
// // //             } catch (error) {}
// // //             console.error("API error:", error);
// // //             Swal.fire(
// // //               "Error",
// // //               "Unable to verify payment. Please try again.",
// // //               "error"
// // //             );
// // //           }
// // //         },
// // //         prefill: {
// // //           name: raso?.order?.shippingInfo?.firstname,
// // //           email: raso?.order?.shippingInfo?.email,
// // //           contact: raso?.order?.shippingInfo?.phone,
// // //         },
// // //         theme: { color: "#396664" },
// // //       };
// // //       const rzp = new window.Razorpay(options);
// // //       rzp.on("payment.failed", (response) => {
// // //         Swal.fire(
// // //           "Error",
// // //           response.error.description || "Payment failed.",
// // //           "error"
// // //         );
// // //       });
// // //       rzp.open();
// // //     }
// // //   }, [paynowbuttonsuccess]);

// // //   return (
// // //     <div className="" style={{ fontFamily: "Poppins" }}>
// // //       <div className=" booking-detailssssss">
// // //         <Row>
// // //           <form
// // //             onSubmit={(e) => {
// // //               e.preventDefault();
// // //               setIsProcessing(true);
// // //               handlePayment().finally(() => setIsProcessing(false));
// // //             }}
// // //           >
// // //             <Button
// // //               label={
// // //                 isProcessing
// // //                   ? "Processing..."
// // //                   : sdkLoaded
// // //                   ? "Pay Now"
// // //                   : "Loading Payment..."
// // //               }
// // //               type="submit"
// // //               // className="place-order"
// // //               style={{ background: "#396664" }}
// // //               className="rounded-2 m-2 w-100"
// // //               disabled={
// // //                 !formData.privacy_policy ||
// // //                 !shippingdata ||
// // //                 // !paynowbutton ||
// // //                 !sdkLoaded ||
// // //                 isProcessing
// // //               }
// // //             ></Button>
// // //           </form>
// // //         </Row>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Payment;
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import Swal from "sweetalert2";
// // import { Col, Row } from "react-bootstrap";
// // import { bookingVerifypayment } from "../../../../../api/page"; // Import your API function
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

// //   // Get Razorpay order details from session storage
// //   let raso = {};
// //   if (typeof window !== "undefined") {
// //     try {
// //       raso = JSON.parse(sessionStorage.getItem("razorpayOrder")) || {};
// //     } catch (error) {
// //       console.error(
// //         "Failed to parse razorpayOrder from session storage:",
// //         error
// //       );
// //     }
// //   }

// //   useEffect(() => {
// //     const loadRazorpayScript = () => {
// //       if (!window.Razorpay) {
// //         const script = document.createElement("script");
// //         script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //         script.async = true;
// //         script.onload = () => {
// //           console.log("Razorpay SDK loaded successfully");
// //           setSdkLoaded(true);
// //         };
// //         script.onerror = () => {
// //           console.error("Failed to load Razorpay SDK");
// //         };
// //         document.body.appendChild(script);
// //       } else {
// //         console.log("Razorpay SDK already loaded");
// //         setSdkLoaded(true);
// //       }
// //     };

// //     loadRazorpayScript();
// //   }, []);

// //   const handlePayment = async () => {
// //     PlaceOrders();
// //   };

// //   useEffect(() => {
// //     if (paynowbuttonsuccess) {
// //       // const options = {
// //       //   key: process.env.RAZORPAY_KEY_ID,
// //       //   amount: (raso?.orders[0]?.orderTotal || 0) * 100,
// //       //   currency: "INR",
// //       //   name: "Mathioli",
// //       //   order_id: raso?.orders?.razorpayOrderId,
// //       //   handler: async (response) => {
// //       //     console.log(response, "responsepayementVerfity");
// //       //     localStorage.setItem("verifypaymeny", response);
// //       //     if (response) {
// //       //       const paymentData = {
// //       //         razorpayOrderId: response.razorpay_order_id,
// //       //         razorpayPaymentId: response.razorpay_payment_id,
// //       //         razorpaySignature: response.razorpay_signature,
// //       //       };

// //       //       try {
// //       //         const apiResponse = await bookingVerifypayment(paymentData);

// //       //         if (apiResponse?.data?.success) {
// //       //           Swal.fire("Success", "Payment successful!", "success");
// //       //         } else {
// //       //           Swal.fire(
// //       //             "Error",
// //       //             apiResponse?.data?.message || "Payment failed",
// //       //             "error"
// //       //           );
// //       //         }
// //       //       } catch (error) {
// //       //         console.error("API error:", error);
// //       //         Swal.fire(
// //       //           "Error",
// //       //           "Unable to verify payment. Please try again.",
// //       //           "error"
// //       //         );
// //       //       }
// //       //     }
// //       //   },
// //       //   prefill: {
// //       //     name: raso?.order?.shippingInfo?.firstname,
// //       //     email: raso?.order?.shippingInfo?.email,
// //       //     contact: raso?.order?.shippingInfo?.phone,
// //       //   },
// //       //   theme: { color: "#396664" },
// //       // };
// //       const options = {
// //         key: process.env.RAZORPAY_KEY_ID, // Ensure this key is correctly set
// //         amount: (raso?.orders[0]?.orderTotal || 0) * 100,
// //         currency: "INR",
// //         name: "Mathioli",
// //         order_id: raso?.orders?.razorpayOrderId,
// //         handler: async (response) => {
// //           // Handler code
// //         },
// //         prefill: {
// //           name: raso?.order?.shippingInfo?.firstname,
// //           email: raso?.order?.shippingInfo?.email,
// //           contact: raso?.order?.shippingInfo?.phone,
// //         },
// //         theme: { color: "#396664" },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.on("payment.failed", (response) => {
// //         Swal.fire(
// //           "Error",
// //           response.error.description || "Payment failed.",
// //           "error"
// //         );
// //       });
// //       rzp.open();
// //     }
// //   }, [paynowbuttonsuccess]);

// //   return (
// //     <div className="" style={{ fontFamily: "Poppins" }}>
// //       <div className=" booking-detailssssss">
// //         <Row>
// //           <form
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               setIsProcessing(true);
// //               handlePayment().finally(() => setIsProcessing(false));
// //             }}
// //           >
// //             <Button
// //               label={
// //                 isProcessing
// //                   ? "Processing..."
// //                   : sdkLoaded
// //                   ? "Pay Now"
// //                   : "Loading Payment..."
// //               }
// //               type="submit"
// //               style={{ background: "#396664" }}
// //               className="rounded-2 m-2 w-100"
// //               disabled={
// //                 !formData.privacy_policy ||
// //                 !shippingdata ||
// //                 !sdkLoaded ||
// //                 isProcessing
// //               }
// //             ></Button>
// //           </form>
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Payment;
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import Swal from "sweetalert2";
// // import { Col, Row } from "react-bootstrap";
// // import { bookingVerifypayment } from "../../../../../api/page"; // Import your API function
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

// //   // Get Razorpay order details from session storage
// //   let raso = {};
// //   if (typeof window !== "undefined") {
// //     try {
// //       raso = JSON.parse(sessionStorage.getItem("razorpayOrder")) || {};
// //     } catch (error) {
// //       console.error(
// //         "Failed to parse razorpayOrder from session storage:",
// //         error
// //       );
// //     }
// //   }

// //   useEffect(() => {
// //     const loadRazorpayScript = () => {
// //       if (!window.Razorpay) {
// //         const script = document.createElement("script");
// //         script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //         script.async = true;
// //         script.onload = () => {
// //           console.log("Razorpay SDK loaded successfully");
// //           setSdkLoaded(true);
// //         };
// //         script.onerror = () => {
// //           console.error("Failed to load Razorpay SDK");
// //         };
// //         document.body.appendChild(script);
// //       } else {
// //         console.log("Razorpay SDK already loaded");
// //         setSdkLoaded(true);
// //       }
// //     };

// //     loadRazorpayScript();
// //   }, []);

// //   const handlePayment = async () => {
// //     PlaceOrders();
// //   };
// //   console.log(paynowbuttonsuccess, "raso>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
// //   useEffect(() => {
// //     if (paynowbuttonsuccess) {
// //       const razorpayKey = "rzp_live_wJBFoukfvdWNdP";
// //       console.log("Razorpay Key:", razorpayKey); // Debugging statement

// //       // if (!paynowbuttonsuccess?.orders?.razorpayOrderId) {
// //       //   console.error("Razorpay Order ID is missing");
// //       //   return;
// //       // }

// //       const options = {
// //         key: razorpayKey,
// //         amount: (paynowbuttonsuccess?.orders[0].orderTotal || 0) * 100,
// //         currency: "INR",
// //         name: "Mathioli",
// //         order_id: paynowbuttonsuccess?.orders[0]?.razorpayOrderId,
// //         handler: async (response) => {
// //   console.log(response, "responsepayementVerfity");
// //   localStorage.setItem("verifypaymeny", response);
// //   if (response) {
// //     const paymentData = {
// //       razorpayOrderId: response.razorpay_order_id,
// //       razorpayPaymentId: response.razorpay_payment_id,
// //       razorpaySignature: response.razorpay_signature,
// //     };

// //     try {
// //       const apiResponse = await bookingVerifypayment(paymentData);

// //       console.log(apiResponse);
// //       if (apiResponse?.success) {
// //         Swal.fire("Success", apiResponse?.message, "success");
// //         sessionStorage.removeItem("razorpayOrder");
// //         sessionStorage.removeItem("buysinglebook");
// //         window.location.href = "/";
// //       } else {
// //         Swal.fire(
// //           "Error",
// //           apiResponse?.data?.message || "Payment failed",
// //           "error"
// //         );
// //       }
// //     } catch (error) {
// //       console.error("API error:", error);
// //       Swal.fire(
// //         "Error",
// //         "Unable to verify payment. Please try again.",
// //         "error"
// //       );
// //     }
// //   }
// // },
// //         prefill: {
// //           name: raso?.order?.shippingInfo?.firstname,
// //           email: raso?.order?.shippingInfo?.email,
// //           contact: raso?.order?.shippingInfo?.phone,
// //         },
// //         theme: { color: "#396664" },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.on("payment.failed", (response) => {
// //         Swal.fire(
// //           "Error",
// //           response.error.description || "Payment failed.",
// //           "error"
// //         );
// //       });
// //       rzp.open();
// //     }
// //   }, [paynowbuttonsuccess]);

// //   return (
// //     <div className="" style={{ fontFamily: "Poppins" }}>
// //       <div className=" booking-detailssssss">
// //         <Row>
// //           <form
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               setIsProcessing(true);
// //               handlePayment().finally(() => setIsProcessing(false));
// //             }}
// //           >
// //             <Button
// //               label={
// //                 isProcessing
// //                   ? "Processing..."
// //                   : sdkLoaded
// //                   ? "Pay Now"
// //                   : "Loading Payment..."
// //               }
// //               type="submit"
// //               style={{ background: "#396664" }}
// //               className="rounded-2 m-2 w-100"
// //               disabled={
// //                 !formData.privacy_policy ||
// //                 !shippingdata ||
// //                 !sdkLoaded ||
// //                 isProcessing
// //               }
// //             ></Button>
// //           </form>
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Payment;
// // "use client";
// // import React, { useEffect, useState } from "react";
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

// //   // Get Razorpay order details from session storage
// //   let raso = {};
// //   if (typeof window !== "undefined") {
// //     try {
// //       raso = JSON.parse(sessionStorage.getItem("razorpayOrder")) || {};
// //     } catch (error) {
// //       console.error("Failed to parse razorpayOrder:", error);
// //     }
// //   }

// //   const isBrowserSupported = () => {
// //     const userAgent = navigator.userAgent;
// //     return (
// //       /chrome|firefox|safari|edge/i.test(userAgent) &&
// //       !/opera|opr|ie|trident/i.test(userAgent)
// //     );
// //   };

// //   const loadRazorpayScript = () => {
// //     return new Promise((resolve, reject) => {
// //       if (window.Razorpay) {
// //         console.log("Razorpay SDK already loaded");
// //         resolve(true);
// //         return;
// //       }

// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.async = true;

// //       script.onload = () => {
// //         console.log("Razorpay SDK loaded successfully");
// //         setSdkLoaded(true);
// //         resolve(true);
// //       };

// //       script.onerror = () => {
// //         console.error("Failed to load Razorpay SDK");
// //         reject(new Error("Failed to load Razorpay SDK"));
// //       };

// //       document.body.appendChild(script);
// //     });
// //   };

// //   const handlePayment = async () => {
// //     try {
// //       setIsProcessing(true);
// //       if (!isBrowserSupported()) {
// //         throw new Error("Unsupported browser");
// //       }
// //       await loadRazorpayScript();
// //       PlaceOrders();
// //     } catch (error) {
// //       console.error("Payment initialization failed:", error);
// //       Swal.fire(
// //         "Browser Issue",
// //         "Please try payment in Chrome or Firefox browser.",
// //         "error"
// //       );
// //       setBrowserSupported(false);
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       setBrowserSupported(isBrowserSupported());
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (paynowbuttonsuccess && sdkLoaded && browserSupported) {
// //       try {
// //         if (!window.Razorpay) {
// //           throw new Error("Razorpay not available");
// //         }

// //         const razorpayKey = "rzp_live_wJBFoukfvdWNdP";
// //         const options = {
// //           key: razorpayKey,
// //           amount: (paynowbuttonsuccess?.orders[0].orderTotal || 0) * 100,
// //           currency: "INR",
// //           name: "Mathioli",
// //           order_id: paynowbuttonsuccess?.orders[0]?.razorpayOrderId,
// //           handler: async (response) => {
// //             console.log(response, "responsepayementVerfity");
// //             localStorage.setItem("verifypaymeny", response);
// //             if (response) {
// //               const paymentData = {
// //                 razorpayOrderId: response.razorpay_order_id,
// //                 razorpayPaymentId: response.razorpay_payment_id,
// //                 razorpaySignature: response.razorpay_signature,
// //               };

// //               try {
// //                 const apiResponse = await bookingVerifypayment(paymentData);

// //                 console.log(apiResponse);
// //                 if (apiResponse?.success) {
// //                   Swal.fire("Success", apiResponse?.message, "success");
// //                   sessionStorage.removeItem("razorpayOrder");
// //                   sessionStorage.removeItem("buysinglebook");
// //                   window.location.href = "/";
// //                 } else {
// //                   Swal.fire(
// //                     "Error",
// //                     apiResponse?.data?.message || "Payment failed",
// //                     "error"
// //                   );
// //                 }
// //               } catch (error) {
// //                 console.error("API error:", error);
// //                 Swal.fire(
// //                   "Error",
// //                   "Unable to verify payment. Please try again.",
// //                   "error"
// //                 );
// //               }
// //             }
// //           },
// //           prefill: {
// //             name: raso?.order?.shippingInfo?.firstname,
// //             email: raso?.order?.shippingInfo?.email,
// //             contact: raso?.order?.shippingInfo?.phone,
// //           },
// //           theme: { color: "#396664" },
// //         };

// //         const rzp = new window.Razorpay(options);
// //         rzp.on("payment.failed", (response) => {
// //           Swal.fire(
// //             "Error",
// //             response.error.description || "Payment failed.",
// //             "error"
// //           );
// //         });
// //         rzp.open();
// //       } catch (error) {
// //         console.error("Payment initialization error:", error);
// //         Swal.fire(
// //           "Browser Not Supported",
// //           "Please try payment in Chrome or Firefox browser.",
// //           "error"
// //         );
// //       }
// //     }
// //   }, [paynowbuttonsuccess, sdkLoaded, browserSupported]);

// //   return (
// //     <div className="" style={{ fontFamily: "Poppins" }}>
// //       <div className=" booking-detailssssss">
// //         <Row>
// //           {!browserSupported && (
// //             <div className="alert alert-warning">
// //               Your browser is not fully supported. For best results, please use
// //               Chrome or Firefox.
// //             </div>
// //           )}
// //           <form
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               handlePayment();
// //             }}
// //           >
// //             <Button
// //               label={
// //                 !browserSupported
// //                   ? "Browser Not Supported"
// //                   : isProcessing
// //                   ? "Processing..."
// //                   : sdkLoaded
// //                   ? "Pay Now"
// //                   : "Loading Payment..."
// //               }
// //               type="submit"
// //               style={{ background: "#396664" }}
// //               className="rounded-2 m-2 w-100"
// //               disabled={
// //                 !formData.privacy_policy ||
// //                 !shippingdata ||
// //                 !sdkLoaded ||
// //                 isProcessing ||
// //                 !browserSupported
// //               }
// //             />
// //           </form>
// //         </Row>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Payment;
// "use client";
// import React, { useEffect, useState } from "react";
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

//   // Get Razorpay order details from session storage
//   const [raso, setRaso] = useState({});

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const razorpayOrder = sessionStorage.getItem("razorpayOrder");
//         if (razorpayOrder) {
//           setRaso(JSON.parse(razorpayOrder));
//         }
//       } catch (error) {
//         console.error("Failed to parse razorpayOrder:", error);
//       }
//     }
//   }, []);

//   const checkBrowserSupport = () => {
//     if (typeof window === "undefined") return true;

//     const userAgent = navigator.userAgent;
//     // Supported browsers: Chrome, Firefox, Safari, Edge (not IE, Opera Mini, etc.)
//     const isSupported = /chrome|firefox|safari|edge/i.test(userAgent) &&
//                       !/opera|opr|ie|trident/i.test(userAgent);

//     // Additional check for mobile browsers
//     if (/android|iphone|ipad|ipod/i.test(userAgent)) {
//       // Additional checks for mobile browser support if needed
//     }

//     return isSupported;
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve, reject) => {
//       if (window.Razorpay) {
//         console.log("Razorpay SDK already loaded");
//         setSdkLoaded(true);
//         resolve(true);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;

//       script.onload = () => {
//         console.log("Razorpay SDK loaded successfully");
//         setSdkLoaded(true);
//         resolve(true);
//       };

//       script.onerror = (error) => {
//         console.error("Failed to load Razorpay SDK", error);
//         setSdkLoaded(false);
//         reject(new Error("Failed to load Razorpay SDK"));
//       };

//       document.body.appendChild(script);
//     });
//   };

//   const initializePayment = async () => {
//     if (!paynowbuttonsuccess || !sdkLoaded || !browserSupported) return;

//     try {
//       if (!window.Razorpay) {
//         throw new Error("Razorpay not available");
//       }

//       const razorpayKey = process.env.RAZORPAY_KEY || "rzp_live_wJBFoukfvdWNdP";
//       const orderTotal = paynowbuttonsuccess?.orders[0]?.orderTotal || 0;
//       const razorpayOrderId = paynowbuttonsuccess?.orders[0]?.razorpayOrderId;

//       if (!razorpayOrderId) {
//         throw new Error("Razorpay Order ID is missing");
//       }

//       const options = {
//         key: razorpayKey,
//         amount: Math.round(orderTotal * 100), // Convert to paise
//         currency: "INR",
//         name: "Mathioli",
//         description: "Payment for your order",
//         order_id: razorpayOrderId,
//         handler: async (response) => {
//           console.log("Payment success response:", response);
//           try {
//             const paymentData = {
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             };

//             const apiResponse = await bookingVerifypayment(paymentData);
//             console.log("Verification response:", apiResponse);

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
//           } catch (error) {
//             console.error("Verification error:", error);
//             Swal.fire(
//               "Error",
//               "Unable to verify payment. Please contact support.",
//               "error"
//             );
//           }
//         },
//         prefill: {
//           name: raso?.order?.shippingInfo?.firstname || "",
//           email: raso?.order?.shippingInfo?.email || "",
//           contact: raso?.order?.shippingInfo?.phone || "",
//         },
//         notes: {
//           orderId: paynowbuttonsuccess?.orders[0]?.orderId,
//         },
//         theme: {
//           color: "#396664",
//           hide_topbar: false,
//         },
//         modal: {
//           ondismiss: () => {
//             console.log("Payment modal closed");
//             setIsProcessing(false);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", (response) => {
//         console.error("Payment failed:", response.error);
//         Swal.fire(
//           "Payment Failed",
//           response.error.description || "Payment could not be completed",
//           "error"
//         );
//         setIsProcessing(false);
//       });

//       rzp.on("payment.authorized", (response) => {
//         console.log("Payment authorized:", response);
//       });

//       setPaymentInitialized(true);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment initialization error:", error);
//       Swal.fire(
//         "Payment Error",
//         error.message || "Unable to initialize payment. Please try again.",
//         "error"
//       );
//       setIsProcessing(false);
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       setIsProcessing(true);

//       if (!checkBrowserSupport()) {
//         throw new Error("Unsupported browser detected");
//       }

//       await loadRazorpayScript();
//       await PlaceOrders();
//     } catch (error) {
//       console.error("Payment process failed:", error);
//       Swal.fire(
//         "Payment Error",
//         error.message || "Unable to process payment. Please try again.",
//         "error"
//       );
//       setBrowserSupported(false);
//       setIsProcessing(false);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setBrowserSupported(checkBrowserSupport());
//     }
//   }, []);

//   useEffect(() => {
//     initializePayment();
//   }, [paynowbuttonsuccess, sdkLoaded, browserSupported]);

//   return (
//     <div className="payment-container" style={{ fontFamily: "Poppins" }}>
//       <div className="booking-details">
//         <Row>
//           {!browserSupported && (
//             <div className="alert alert-warning mb-3">
//               <strong>Browser Not Supported:</strong> For the best payment experience,
//               please use Google Chrome or Mozilla Firefox.
//             </div>
//           )}

//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (browserSupported && !isProcessing) {
//                 handlePayment();
//               }
//             }}
//           >
//             <Button
//               label={
//                 !browserSupported ? "Browser Not Supported" :
//                 isProcessing ? "Processing..." :
//                 !sdkLoaded ? "Loading Payment..." :
//                 "Pay Now"
//               }
//               type="submit"
//               style={{
//                 background: "#396664",
//                 border: "none",
//                 padding: "12px 24px",
//                 fontSize: "16px",
//               }}
//               className="rounded-2 m-2 w-100"
//               disabled={
//                 !formData.privacy_policy ||
//                 !shippingdata ||
//                 !sdkLoaded ||
//                 isProcessing ||
//                 !browserSupported
//               }
//               icon={isProcessing ? "pi pi-spinner pi-spin" : "pi pi-lock"}
//             />
//           </form>

//           <div className="mt-3 text-center">
//             <small className="text-muted">
//               Secure payment powered by Razorpay
//             </small>
//           </div>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Payment;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import { bookingVerifypayment } from "../../../../../api/page";
import { Button } from "primereact/button";

const Payment = ({
  PlaceOrders,
  formData,
  total,
  razopayshow,
  paynowbutton,
  paynowbuttonsuccess,
  shippingdata,
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  const [paymentInitialized, setPaymentInitialized] = useState(false);
  const [raso, setRaso] = useState({});

  // Define checkBrowserSupport inside the component
  const checkBrowserSupport = useCallback(() => {
    if (typeof window === "undefined") return true;

    const userAgent = navigator.userAgent;
    // Supported browsers: Chrome, Firefox, Safari, Edge (not IE, Opera Mini, etc.)
    const isSupported =
      /chrome|firefox|safari|edge/i.test(userAgent) &&
      !/opera|opr|ie|trident/i.test(userAgent);

    // Additional check for mobile browsers
    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      // Additional checks for mobile browser support if needed
    }

    return isSupported;
  }, []);

  // Get Razorpay order details from session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const razorpayOrder = sessionStorage.getItem("razorpayOrder");
        if (razorpayOrder) {
          setRaso(JSON.parse(razorpayOrder));
        }
      } catch (error) {
        console.error("Failed to parse razorpayOrder:", error);
      }
    }
  }, []);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        console.log("Razorpay SDK already loaded");
        setSdkLoaded(true);
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.id = "razorpay-script";

      script.onload = () => {
        console.log("Razorpay SDK loaded successfully");
        setSdkLoaded(true);
        resolve(true);
      };

      script.onerror = (error) => {
        console.error("Failed to load Razorpay SDK", error);
        setSdkLoaded(false);
        reject(new Error("Failed to load Razorpay SDK"));
      };

      document.body.appendChild(script);
    });
  }, []);

  const initializePayment = useCallback(async () => {
    if (
      !paynowbuttonsuccess ||
      !sdkLoaded ||
      !browserSupported ||
      paymentInitialized
    ) {
      return;
    }

    try {
      if (!window.Razorpay) {
        throw new Error("Razorpay not available");
      }

      const razorpayKey = process.env.RAZORPAY_KEY || "rzp_live_wJBFoukfvdWNdP";
      const orderTotal = paynowbuttonsuccess?.orders[0]?.orderTotal || 0;
      const razorpayOrderId = paynowbuttonsuccess?.orders[0]?.razorpayOrderId;

      if (!razorpayOrderId) {
        throw new Error("Razorpay Order ID is missing");
      }

      const options = {
        key: razorpayKey,
        amount: Math.round(orderTotal * 100),
        currency: "INR",
        name: "Mathioli",
        description: "Payment for your order",
        order_id: razorpayOrderId,
        handler: async (response) => {
          console.log("Payment success response:", response);
          try {
            const paymentData = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };

            const apiResponse = await bookingVerifypayment(paymentData);
            console.log("Verification response:", apiResponse);

            if (apiResponse?.success) {
              Swal.fire({
                title: "Success",
                text: apiResponse?.message || "Payment successful!",
                icon: "success",
                confirmButtonText: "Continue",
              }).then(() => {
                sessionStorage.removeItem("razorpayOrder");
                sessionStorage.removeItem("buysinglebook");
                window.location.href = "/";
              });
            } else {
              Swal.fire(
                "Verification Failed",
                apiResponse?.data?.message || "Payment verification failed",
                "error"
              );
            }
          } catch (error) {
            console.error("Verification error:", error);
            Swal.fire(
              "Error",
              "Unable to verify payment. Please contact support.",
              "error"
            );
          }
        },
        prefill: {
          name: raso?.order?.shippingInfo?.firstname || "",
          email: raso?.order?.shippingInfo?.email || "",
          contact: raso?.order?.shippingInfo?.phone || "",
        },
        notes: {
          orderId: paynowbuttonsuccess?.orders[0]?.orderId,
        },
        theme: {
          color: "#396664",
          hide_topbar: false,
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal closed");
            setIsProcessing(false);
            setPaymentInitialized(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        Swal.fire(
          "Payment Failed",
          response.error.description || "Payment could not be completed",
          "error"
        );
        setIsProcessing(false);
        setPaymentInitialized(false);
      });

      rzp.on("payment.authorized", (response) => {
        console.log("Payment authorized:", response);
      });

      setPaymentInitialized(true);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      Swal.fire(
        "Payment Error",
        error.message || "Unable to initialize payment. Please try again.",
        "error"
      );
      setIsProcessing(false);
      setPaymentInitialized(false);
    }
  }, [
    paynowbuttonsuccess,
    sdkLoaded,
    browserSupported,
    paymentInitialized,
    raso,
  ]);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      if (!checkBrowserSupport()) {
        throw new Error("Unsupported browser detected");
      }

      await loadRazorpayScript();
      await PlaceOrders();
    } catch (error) {
      console.error("Payment process failed:", error);
      Swal.fire(
        "Payment Error",
        error.message || "Unable to process payment. Please try again.",
        "error"
      );
      setBrowserSupported(false);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrowserSupported(checkBrowserSupport());

      return () => {
        const script = document.getElementById("razorpay-script");
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, [checkBrowserSupport]);

  useEffect(() => {
    if (
      paynowbuttonsuccess &&
      sdkLoaded &&
      browserSupported &&
      !paymentInitialized
    ) {
      initializePayment();
    }
  }, [
    paynowbuttonsuccess,
    sdkLoaded,
    browserSupported,
    paymentInitialized,
    initializePayment,
  ]);

  return (
    <div className="payment-container" style={{ fontFamily: "Poppins" }}>
      <div className="booking-details">
        <Row>
          {!browserSupported && (
            <div className="alert alert-warning mb-3">
              <strong>Browser Not Supported:</strong> For the best payment
              experience, please use Google Chrome or Mozilla Firefox.
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (browserSupported && !isProcessing) {
                handlePayment();
              }
            }}
          >
            <Button
              label={
                !browserSupported
                  ? "Browser Not Supported"
                  : isProcessing
                  ? "Processing..."
                  : !sdkLoaded
                  ? "Loading Payment..."
                  : "Pay Now"
              }
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
                !browserSupported
              }
              icon={isProcessing ? "pi pi-spinner pi-spin" : "pi pi-lock"}
            />
          </form>

          <div className="mt-3 text-center">
            <small className="text-muted">
              Secure payment powered by Razorpay  
            </small>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Payment;
