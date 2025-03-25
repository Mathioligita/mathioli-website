// "use client";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { Checkbox } from "primereact/checkbox";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Avatar } from "primereact/avatar";
// import { Divider } from "primereact/divider";
// import Payment from "./razorpay/Payment";
// import ChangeAddress from "./ChangeAddress";
// import ShippingForm from "./ShippingForm";
// import {
//   APIshippiAddressUpdate,
//   APIshippingdata,
//   CartRemoveAPI,
//   Checkout,
//   PlaceOrderAPi,
//   UpdateUserAPI,
// } from "../../../../api/page";
// import Cookies from "js-cookie";
// import "./checkout.scss";
// import { CiCircleRemove } from "react-icons/ci";
// import userContext from "../../UseContext/UseContext";
// import { Toast } from "primereact/toast";
// import { RadioButton } from "primereact/radiobutton";

// const CheckoutPage = ({ buysingleproducts }) => {
//   const [checkout, setCheckout] = useState([]);
//   const [shippingdata, setShippingdata] = useState([]);
//   const [user, setUser] = useState(null);
//   const [checkoutdata, setCheckoutdata] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [changeAddressOpen, setChangeAddressOpen] = useState(false);
//   const [shippingFormOpen, setShippingFormOpen] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const { setCart, usersdata } = useContext(userContext);
//   const [paynowbutton, setPaybutton] = useState(false);
//   const [editshippingfromdata, setEditshippingfromdata] = useState(null);
//   const [paynowbuttonsuccess, setPaybuttonsuccess] = useState(null);
//   const [singleselectbooks, setSingleselectBooks] = useState([]);
//   const guestId = Cookies.get("guestId");
//   const toast = useRef(null);
//   console.log(usersdata, "usersdata>>>>>>>>>>>>>>????????????");

//   const selecteditemhardcopy =
//     JSON.parse(localStorage.getItem("selectedBook")) || null;
//   if (!selecteditemhardcopy) {
//     setSingleselectBooks(selecteditemhardcopy);
//   }
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     shippingAddress: {
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "India",
//     },
//     privacy_policy: false,
//   });

//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     shippingAddress: {
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "",
//     },
//     privacy_policy: "",
//   });

//   const accessToken = Cookies.get("accessToken");
//   if (!accessToken) {
//     window.location.assign("/");
//   }

//   const fetchData = async () => {
//     try {
//       const response = await Checkout();
//       if (!response?.isError) {
//         setCheckout(response?.data?.Checkout);
//         setCheckoutdata(response.data);
//         setUser(response?.data?.user || usersdata);
//         // Set the initial selected address
//         if (response?.data?.user?.shippingAddress?.length > 0) {
//           setSelectedAddress(
//             response?.data?.user?.shippingAddress[0]._id ||
//               usersdata.shippingAddress[0]._id
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch checkout data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   const handleClickOpen = () => {
//     setErrors({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       shippingAddress: {
//         street: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         country: "",
//       },
//       privacy_policy: "",
//     });
//     if (user && user.shippingAddress && user.shippingAddress.length > 0) {
//       const activeAddress =
//         user?.shippingAddress ||
//         usersdata?.shippingAddress.find((addr) => addr.active) ||
//         user.shippingAddress[0];
//       setFormData({
//         firstName: user?.firstName || "",
//         lastName: user?.lastName || "",
//         email: user?.email || "",
//         phone: user?.mobile || "",
//         shippingAddress: {
//           street: activeAddress?.address || "",
//           city: activeAddress?.city || "",
//           state: activeAddress?.state || "",
//           zipCode: activeAddress?.zipCode || "",
//           country: activeAddress?.country || "India",
//         },
//         privacy_policy: true,
//       });
//     } else {
//       setFormData({
//         firstName: user?.firstName || "",
//         lastName: user?.lastName || "",
//         email: user?.email || "",
//         phone: user?.mobile || "",
//         shippingAddress: {
//           street: "",
//           city: "",
//           state: "",
//           zipCode: "",
//           country: "India",
//         },
//         privacy_policy: false,
//       });
//     }
//     setOpen(true);
//     setShippingFormOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setShippingFormOpen(false);
//   };

//   const handleChangeAddress = () => {
//     setChangeAddressOpen(true);
//   };

//   const handleCloseChangeAddress = () => {
//     setChangeAddressOpen(false);
//   };

//   const handleAddAddress = () => {
//     // console.log("Add new address");
//   };

//   const removeFromCart = async (product) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== product));

//     const data = {
//       bookId: product.bookId._id,
//       guestId: guestId,
//     };

//     try {
//       const response = await CartRemoveAPI(data);
//       if (response.success) {
//         toast.current.show({
//           severity: "warn",
//           summary: "Removed from Cart",
//           detail: `Product has been removed from your cart.`,
//           life: 3000,
//         });
//         const data = await retryFetch(addToCartAPI);
//         setCart(data?.data?.cart);
//       }
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: `Failed to remove product from cart.`,
//         life: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, checked } = e.target;
//     setFormData((prevData) => {
//       if (name === "privacy_policy") {
//         return { ...prevData, privacy_policy: checked };
//       }
//       return {
//         ...prevData,
//         shippingAddress: {
//           ...prevData.shippingAddress,
//           [name]: value,
//         },
//       };
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       shippingAddress: {
//         street: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         country: "",
//       },
//       privacy_policy: "",
//     };

//     if (!formData.privacy_policy) {
//       newErrors.privacy_policy =
//         "You must agree to the Privacy Policy and Terms & Conditions";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const formDataToSend = new FormData();
//       const shippingAddress = {
//         fullName: `${formData.firstName} ${formData.lastName}`,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.shippingAddress.street,
//         city: formData.shippingAddress.city,
//         state: formData.shippingAddress.state,
//         zipCode: formData.shippingAddress.zipCode,
//         country: formData.shippingAddress.country,
//       };

//       formDataToSend.append("shippingAddress", JSON.stringify(shippingAddress));

//       try {
//         const response = await UpdateUserAPI(formDataToSend);
//         if (response.success) {
//           setUser(response?.data || usersdata);
//           handleClose();
//         }
//       } catch (error) {
//         console.error("Failed to update user data:", error);
//       }
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       const selectedItemIds = checkout.map((item) => item.bookId._id);

//       const activeAddress =
//         user.shippingAddress.find((addr) => addr.active) ||
//         user.shippingAddress[0];

//       const shippingAddress = {
//         name: `${user.firstName} ${user.lastName}`,
//         address: activeAddress.address,
//         city: activeAddress.city,
//         postalCode: activeAddress.zipCode,
//         state: activeAddress.state,
//         country: activeAddress.country,
//         email: user.email,
//         phone: user.mobile,
//       };
//       const payload = {
//         orderItems: buysingleproducts
//           ? {
//               book: buysingleproducts?.book?._id,
//               quantity: buysingleproducts?.quantity,
//               bookSubTotal:
//                 buysingleproducts?.bookPrice * buysingleproducts?.quantity,
//             }
//           : checkout.map((item) => ({
//               book: item?.bookId?._id,
//               quantity: item?.quantity,
//               bookSubTotal: item?.price * item?.quantity,
//             })),
//         shippingAddress: shippingAddress,
//         totalAmount: shippingdata.totalAmount || buysingleproducts?.totalPrice,
//         terms_condition: formData.terms_condition || true,
//         privacy_policy: formData.privacy_policy || true,
//         subTotal: shippingdata?.subtotal || buysingleproducts?.subtotal,
//         shippingAmount: shippingdata?.freight_charge,
//       };

//       const response = await PlaceOrderAPi(payload);

//       if (response?.success) {
//         setPaybuttonsuccess(response.data);
//         sessionStorage.setItem("razorpayOrder", JSON.stringify(response.data));
//         return response?.data;
//       } else {
//         return {
//           razorpayOrderId: "",
//           orderTotalAmount: 0,
//         };
//       }
//     } catch (error) {
//       console.error("Failed to process payment:", error);
//       alert("An error occurred while processing the payment.");
//       return {
//         razorpayOrderId: "",
//         orderTotalAmount: 0,
//       };
//     }
//   };

//   const activeAddress =
//     user?.shippingAddress ||
//     usersdata?.shippingAddress.find((addr) => addr?.active) ||
//     user?.shippingAddress?.[0] ||
//     null;

//   const handleOpenForm = () => {
//     handleClickOpen();
//     handleCloseChangeAddress();
//   };

//   const handlesubmit = async () => {
//     const data = {
//       postalCode: activeAddress?.zipCode,
//       weight: checkoutdata?.totalWeight || buysingleproducts?.weight,
//       subtotal: checkoutdata?.total || buysingleproducts?.totalPrice,
//     };

//     try {
//       const response = await APIshippingdata(data);
//       if (response.success) {
//         setShippingdata(response.data);
//         setPaybutton(true);
//       }
//     } catch (error) {
//       console.error("Error fetching shipping data:", error);
//     }
//   };

//   const handlesubmitShppingForm = async () => {
//     const paylod = {
//       addressId: editshippingfromdata,
//       shippingAddress: formData.shippingAddress,
//     };
//     console.log(paylod);
//     const response = await APIshippiAddressUpdate(paylod);
//     if (response.success) {
//     }
//   };
//   console.log(selecteditemhardcopy, "selecteditemhardcopy");

//   return (
//     <>
//       <Toast ref={toast} />
//       <div
//         style={{
//           padding: "16px",
//           maxWidth: "1200px",
//           margin: "auto",
//           fontFamily: "Poppins",
//         }}
//       >
//         <h6
//           style={{
//             fontWeight: "bold",
//             marginBottom: "20px",
//             fontFamily: "Quicksand",
//             fontSize: "24px",
//           }}
//         >
//           <div
//             onClick={() => window.history.back()}
//             style={{ cursor: "pointer" }}
//           >
//             <i className="pi pi-arrow-left" /> Checkout
//           </div>
//         </h6>
//         <h3
//           style={{
//             fontWeight: "bold",
//             fontSize: "15px",
//             marginBottom: "10px",
//             fontFamily: "Montserrat",
//           }}
//         >
//           Shipping Information
//         </h3>
//         <Row>
//           <Col md={8}>
//             <div
//               style={{
//                 marginBottom: "20px",
//                 border: "1px solid rgb(221, 221, 221)",
//                 padding: "7px",
//                 borderRadius: "8px",
//                 fontFamily: "Montserrat",
//                 height: "70px",
//               }}
//             >
//               <div className="">
//                 <div
//                   className="d-flex "
//                   style={{ justifyContent: "space-between" }}
//                 >
//                   <div>
//                     <span style={{ color: "#838483" }}>
//                       Delivery to {""} {user?.firstName || usersdata?.firstName}
//                     </span>
//                     <br />
//                     <span style={{ color: "#1d5755", fontWeight: 600 }}>
//                       <input
//                         type="radio"
//                         className="radio-button"
//                         // style={{ background: "#1d5755" }}
//                         // inputId={user._id}
//                         name="address"
//                         // value={user._id}
//                         // onChange={() => handleAddressChange(user._id)}
//                         checked={activeAddress?._id}
//                       />{" "}
//                       {activeAddress?.address},{activeAddress?.city},
//                       {activeAddress?.state},{activeAddress?.country},
//                       {activeAddress?.zipCode}
//                     </span>
//                   </div>

//                   <div className="d-flex">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "flex-end",
//                         marginBottom: "auto",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <Button
//                         className="p-button-outlined change-buttons-hovera p-0 ms-4"
//                         onClick={handleChangeAddress}
//                         style={{
//                           color: "#0C8040",
//                           border: "0px",
//                           cursor: "pointer",
//                           all: "unset",
//                         }}
//                       >
//                         <span style={{ color: "#0C8040" }}> Change</span>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Col md={12}>
//               <div className="card ">
//                 <DataTable
//                   style={{
//                     border: " 1px solid white",
//                     borderRadius: "8px",
//                     background: "white",
//                   }}
//                   value={checkout || singleselectbooks}
//                   // style={{ justifyContent: "space-between" }}
//                 >
//                   <Column
//                     headerStyle={{ display: "none" }}
//                     showHeaders={false}
//                     style={{
//                       alignItems: "start",
//                       display: "flex",
//                       justifyContent: "start",
//                     }}
//                     field="productId.name"
//                     body={(rowData) => (
//                       <div
//                         style={{ display: "flex", alignItems: "center" }}
//                         className="text-start"
//                       >
//                         {console.log(
//                           rowData,
//                           "rowData>>>>>>>>>>>>>>>>>>>>>>>>>"
//                         )}
//                         <Avatar
//                           image={
//                             rowData?.bookId?.bookimage[0] ||
//                             rowData?.bookimage[0]
//                           }
//                           size="large"
//                           // shape="circle"
//                           style={{ marginRight: "16px" }}
//                         />
//                         <div
//                           className="d-flex"
//                           style={{ justifyContent: "space-between" }}
//                         >
//                           <span>
//                             {rowData?.bookId?.title || rowData?.title}
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   ></Column>
//                   <Column
//                     headerStyle={{ display: "none" }}
//                     body={(rowData) => (
//                       <span>
//                         {" "}
//                         Qty: {rowData?.quantity || rowData?.quantity}
//                       </span>
//                     )}
//                   ></Column>
//                   <Column
//                     headerStyle={{ display: "none" }}
//                     field="subtotal"
//                     body={(rowData) => ` ₹ ${rowData?.subtotal.toFixed(2)}`}
//                   ></Column>
//                   <Column
//                     field="subtotal"
//                     headerStyle={{ display: "none" }}
//                     body={(rowData) => (
//                       <div
//                         onClick={() => removeFromCart(rowData)}
//                         style={{
//                           fontWeight: "800",
//                           color: "black",
//                           fontSize: "25px",
//                         }}
//                       >
//                         <CiCircleRemove />
//                       </div>
//                     )}
//                   ></Column>
//                 </DataTable>
//               </div>
//             </Col>
//           </Col>

//           <Col className="ms-auto" md={4}>
//             <div
//               style={{
//                 top: "20px",
//                 right: "20px",
//                 background: "#fff",
//                 padding: "16px",
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//               }}
//             >
//               <div className="d-flex">
//                 <div className="my-auto">
//                   <h6
//                     style={{
//                       fontWeight: "500",
//                       marginBottom: "10px",
//                       fontFamily: "Poppins",
//                       textAlign: "center",
//                     }}
//                   >
//                     Order Summary
//                   </h6>
//                 </div>
//                 <div className="ms-auto">
//                   <div>
//                     <Button
//                       onClick={handlesubmit}
//                       className="h-50 "
//                       style={{
//                         background: "#396664",
//                         fontSize: "12px",
//                         border: "1px solid #396664 ",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       Delivery to this Address
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               <Divider />
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <p style={{ fontWeight: "bold" }}>Subtotal</p>
//                 <p style={{ fontWeight: "bold" }}>
//                   ₹
//                   {shippingdata?.subtotal ||
//                     checkout
//                       .reduce((acc, item) => acc + item?.subtotal, 0)
//                       .toFixed(2)}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginTop: "8px",
//                 }}
//               >
//                 <p
//                   style={{
//                     fontFamily: "Poppins",
//                     fontWeight: "400",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Shipping
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "Poppins",
//                     fontWeight: "400",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {shippingdata?.freight_charge || "--"}
//                 </p>
//               </div>
//               <div>
//                 {" "}
//                 <span className="fw-light text-success">
//                   {shippingdata?.estimated_delivery_days ? (
//                     <>
//                       ( Delivery Within {shippingdata?.estimated_delivery_days}{" "}
//                       days )
//                     </>
//                   ) : (
//                     "Select the delivery address"
//                   )}
//                 </span>
//               </div>
//               <Divider />
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <p style={{ fontWeight: "bold" }}>Total</p>
//                 <p style={{ fontWeight: "bold" }}>
//                   ₹
//                   {shippingdata?.totalAmount ||
//                     checkout
//                       .reduce((acc, item) => acc + item.subtotal, 0)
//                       .toFixed(2)}
//                 </p>
//               </div>
//               {/* <Row className="mb-3">
//                 <Col md={12}>
//                   <div className="d-flex align-items-center">
//                     <Checkbox
//                       inputId="privacy"
//                       name="privacy_policy"
//                       checked={formData.privacy_policy}
//                       onChange={handleChange}
//                       style={{ fontSize: "12px" }}
//                     />
//                     <label
//                       htmlFor="privacy"
//                       className="ms-2"
//                       style={{ fontSize: "12px" }}
//                     >
//                       I agree to the{" "}
//                       <a
//                         href="/book/terms-and-conditions"
//                         className="text-decoration-none"
//                       >
//                         Terms & Conditions
//                       </a>{" "}
//                       & {""}
//                       <a
//                         href="/book/privacy-policy"
//                         className="text-decoration-none"
//                       >
//                         Privacy Policy
//                       </a>
//                     </label>
//                   </div>
//                   {errors.privacy_policy && (
//                     <div className="error">{errors.privacy_policy}</div>
//                   )}
//                 </Col>
//               </Row> */}
//               <Payment
//                 formData={formData}
//                 paynowbuttonsuccess={paynowbuttonsuccess}
//                 PlaceOrders={handlePayment}
//                 selectedProduct={checkout}
//                 paynowbutton={paynowbutton}
//               />
//             </div>
//           </Col>
//           {/* <Col md={8}>
//             <div className="p-datatable-products ">
//               <DataTable
//                 value={checkout}
//                 style={{ justifyContent: "space-between" }}
//               >
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   showHeaders={false}
//                   style={{
//                     alignItems: "start",
//                     display: "flex",
//                     justifyContent: "start",
//                   }}
//                   field="productId.name"
//                   body={(rowData) => (
//                     <div
//                       style={{ display: "flex", alignItems: "center" }}
//                       className="text-start"
//                     >
//                       <Avatar
//                         image={rowData?.bookId?.bookimage[0] || null}
//                         size="large"
//                         shape="circle"
//                         style={{ marginRight: "16px" }}
//                       />
//                       <div
//                         className="d-flex"
//                         style={{ justifyContent: "space-between" }}
//                       >
//                         <p>{rowData?.bookId?.title}</p>
//                       </div>
//                     </div>
//                   )}
//                 ></Column>
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   body={(rowData) => <p> Qty: {rowData?.quantity}</p>}
//                 ></Column>
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   field="subtotal"
//                   body={(rowData) => ` ₹ ${rowData?.subtotal.toFixed(2)}`}
//                 ></Column>
//                 <Column
//                   field="subtotal"
//                   headerStyle={{ display: "none" }}
//                   body={(rowData) => (
//                     <div onClick={() => removeFromCart(rowData)}>
//                       <CiCircleRemove />
//                     </div>
//                   )}
//                 ></Column>
//               </DataTable>
//             </div>
//           </Col> */}
//         </Row>

//         {/* <Row>
//           <Col md={8}>
//             <div className="p-datatable-products ">
//               <DataTable
//                 value={checkout}
//                 style={{ justifyContent: "space-between" }}
//               >
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   showHeaders={false}
//                   style={{
//                     alignItems: "start",
//                     display: "flex",
//                     justifyContent: "start",
//                   }}
//                   field="productId.name"
//                   body={(rowData) => (
//                     <div
//                       style={{ display: "flex", alignItems: "center" }}
//                       className="text-start"
//                     >
//                       <Avatar
//                         image={rowData?.bookId?.bookimage[0] || null}
//                         size="large"
//                         shape="circle"
//                         style={{ marginRight: "16px" }}
//                       />
//                       <div
//                         className="d-flex"
//                         style={{ justifyContent: "space-between" }}
//                       >
//                         <p>{rowData?.bookId?.title}</p>
//                       </div>
//                     </div>
//                   )}
//                 ></Column>
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   body={(rowData) => <p> Qty: {rowData?.quantity}</p>}
//                 ></Column>
//                 <Column
//                   headerStyle={{ display: "none" }}
//                   field="subtotal"
//                   body={(rowData) => ` ₹ ${rowData?.subtotal.toFixed(2)}`}
//                 ></Column>
//                 <Column
//                   field="subtotal"
//                   headerStyle={{ display: "none" }}
//                   body={(rowData) => (
//                     <div onClick={() => removeFromCart(rowData)}>
//                       <CiCircleRemove />
//                     </div>
//                   )}
//                 ></Column>
//               </DataTable>
//             </div>
//           </Col>
//           <Col className="ms-auto">
//             <div
//               style={{
//                 top: "20px",
//                 right: "20px",
//                 background: "#fff",
//                 padding: "16px",
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//               }}
//             >
//               <div className="d-flex">
//                 <div className="my-auto">
//                   <h6
//                     style={{
//                       fontWeight: "500",
//                       marginBottom: "10px",
//                       fontFamily: "Poppins",
//                       textAlign: "center",
//                     }}
//                   >
//                     Order Summary
//                   </h6>
//                 </div>
//                 <div className="ms-auto">
//                   <div>
//                     <Button
//                       onClick={handlesubmit}
//                       className="h-50 "
//                       style={{
//                         background: "#396664",
//                         fontSize: "12px",
//                         border: "1px solid #396664 ",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       Delivery to this Address
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               <Divider />
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <p style={{ fontWeight: "bold" }}>Subtotal</p>
//                 <p style={{ fontWeight: "bold" }}>
//                   ₹
//                   {shippingdata?.subtotal ||
//                     checkout
//                       .reduce((acc, item) => acc + item?.subtotal, 0)
//                       .toFixed(2)}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginTop: "8px",
//                 }}
//               >
//                 <p
//                   style={{
//                     fontFamily: "Poppins",
//                     fontWeight: "400",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Shipping
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "Poppins",
//                     fontWeight: "400",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {shippingdata?.freight_charge || "--"}
//                 </p>
//               </div>
//               <div>
//                 {" "}
//                 <span className="fw-light text-success">
//                   {shippingdata?.estimated_delivery_days ? (
//                     <>
//                       ( Delivery Within {shippingdata?.estimated_delivery_days}{" "}
//                       days )
//                     </>
//                   ) : (
//                     "Select the delivery address"
//                   )}
//                 </span>
//               </div>
//               <Divider />
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <p style={{ fontWeight: "bold" }}>Total</p>
//                 <p style={{ fontWeight: "bold" }}>
//                   ₹
//                   {shippingdata?.totalAmount ||
//                     checkout
//                       .reduce((acc, item) => acc + item.subtotal, 0)
//                       .toFixed(2)}
//                 </p>
//               </div>
// <Row className="mb-3">
//   <Col md={12}>
//     <div className="d-flex align-items-center">
//       <Checkbox
//         inputId="privacy"
//         name="privacy_policy"
//         checked={formData.privacy_policy}
//         onChange={handleChange}
//         style={{ fontSize: "12px" }}
//       />
//       <label
//         htmlFor="privacy"
//         className="ms-2"
//         style={{ fontSize: "12px" }}
//       >
//         I agree to the{" "}
//         <a
//           href="/book/terms-and-conditions"
//           className="text-decoration-none"
//         >
//           Terms & Conditions
//         </a>{" "}
//         & {""}
//         <a
//           href="/book/privacy-policy"
//           className="text-decoration-none"
//         >
//           Privacy Policy
//         </a>
//       </label>
//     </div>
//     {errors.privacy_policy && (
//       <div className="error">{errors.privacy_policy}</div>
//     )}
//   </Col>
// </Row>
//               <Payment
//                 formData={formData}
//                 paynowbuttonsuccess={paynowbuttonsuccess}
//                 PlaceOrders={handlePayment}
//                 selectedProduct={checkout}
//                 paynowbutton={paynowbutton}
//               />
//             </div>
//           </Col>
//         </Row> */}

//         <ShippingForm
//           open={shippingFormOpen}
//           handleClose={handleClose}
//           formData={formData}
//           setFormData={setFormData}
//           errors={errors}
//           handleSubmit={handlesubmitShppingForm}
//         />
//         <ChangeAddress
//           usersdata={
//             usersdata?.shippingAddress?.map((address) => ({
//               _id: address._id,
//               active: address.active,
//               fullName: `${usersdata?.firstName} ${usersdata?.lastName}`,
//               address: address.address,
//               city: address.city,
//               state: address.state,
//               zipCode: address.zipCode,
//               country: address.country,
//             })) || []
//           }
//           setEditshippingfromdata={setEditshippingfromdata}
//           fetchData={fetchData}
//           activeAddress={activeAddress}
//           handlesubmitShppingForm={handlesubmitShppingForm}
//           open={changeAddressOpen}
//           handleClose={handleCloseChangeAddress}
//           handleOpenForm={handleOpenForm}
//           handleAddAddress={handleAddAddress}
//           userData={
//             user?.shippingAddress ||
//             usersdata?.shippingAddress?.map((address) => ({
//               _id: address._id,
//               active: address.active,
//               fullName: `${user?.firstName || usersdata?.firstName} ${
//                 user?.lastName || usersdata?.lastName
//               } `,
//               address: address.address,
//               city: address.city,
//               state: address.state,
//               zipCode: address.zipCode,
//               country: address.country,
//             })) ||
//             []
//           }
//         />
//       </div>
//     </>
//   );
// };

// export default CheckoutPage;
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import Payment from "./razorpay/Payment";
import ChangeAddress from "./ChangeAddress";
import ShippingForm from "./ShippingForm";
import {
  addToCartAPI,
  APIshippiAddressUpdate,
  APIshippingdata,
  CartRemoveAPI,
  Checkout,
  PlaceOrderAPi,
  // UpdateUserAPI,
} from "../../../../api/page";
import Cookies from "js-cookie";
import "./checkout.scss";
import { CiCircleRemove } from "react-icons/ci";
import userContext from "../../UseContext/UseContext";
import { Toast } from "primereact/toast";
// import { RadioButton } from "primereact/radiobutton";
import { useRouter } from "next/navigation";
import CheckoutTable from "./CheckoutTable";

const CheckoutPage = () => {
  const [checkout, setCheckout] = useState([]);
  const [shippingdata, setShippingdata] = useState([]);
  const [user, setUser] = useState(null);
  const [checkoutdata, setCheckoutdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [changeAddressOpen, setChangeAddressOpen] = useState(false);
  const [shippingFormOpen, setShippingFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { setCart, usersdata } = useContext(userContext);
  const [paynowbutton, setPaybutton] = useState(false);
  const [editshippingfromdata, setEditshippingfromdata] = useState(null);
  const [paynowbuttonsuccess, setPaybuttonsuccess] = useState(null);
  const [singleselectbooks, setSingleselectBooks] = useState([]);
  const [SingleBuyProductdata, setSingleBuyProduct] = useState([]);
  const guestId = Cookies.get("guestId");
  const router = useRouter();
  const toast = useRef(null);
  console.log(SingleBuyProductdata, "SingleBuyProductdata");
  const selecteditemhardcopy =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("selectedBook"))
      : null;
  const selectedhardcopy =
    typeof window !== "undefined"
      ? sessionStorage.getItem("selectedaudiocopy")
      : null;
  const selectedhardcopy1 =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("buysinglebook"))
      : null;
  console.log(selectedhardcopy1, "selected>>>>>>>>>>>>>>>.");
  console.log(singleselectbooks, "selecteditemhardcopy");

  useEffect(() => {
    const selecteditemhardcopy =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("selectedBook"))
        : null;
    const SingleBuyProduct = JSON.parse(
      sessionStorage.getItem("buysinglebook")
      // sessionStorage.getItem('singleBookBuying')
    );
    sessionStorage.getItem("singleBookBuying");

    if (SingleBuyProduct && sessionStorage.getItem("singleBookBuying")) {
      console.log(SingleBuyProduct, "SingleBuyProductdata");
      setCheckoutdata(SingleBuyProduct);
      setSingleBuyProduct(
        Array.isArray(SingleBuyProduct) ? SingleBuyProduct : [SingleBuyProduct]
      );
    }
    if (selecteditemhardcopy) {
      setSingleselectBooks(
        Array.isArray(selecteditemhardcopy)
          ? selecteditemhardcopy
          : [selecteditemhardcopy]
      );
    }
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    privacy_policy: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    privacy_policy: "",
  });

  // if (!checkout || !selecteditemhardcopy) {
  //   // If checkout is true, navigate to the checkout page
  //   return window.location.assign("/");
  // }

  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    // window.location.assign("/");
    router.push("/");
  }

  const fetchData = async () => {
    try {
      const ProceedToCheckout = sessionStorage.getItem("paymentPageCheckout");
      if (ProceedToCheckout == "true") {
        const response = await Checkout();
        if (!response?.isError) {
          setCheckout(response?.data?.Checkout);
          setCheckoutdata(response.data);
          setUser(response?.data?.user || usersdata);
          if (response?.data?.user?.shippingAddress?.length > 0) {
            setSelectedAddress(
              response?.data?.user?.shippingAddress[0]._id ||
                usersdata.shippingAddress[0]._id
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch checkout data:", error);
    }
  };

  useEffect(() => {
    const ProceedToCheckout = sessionStorage.getItem("paymentPageCheckout");
    if (ProceedToCheckout) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const audiobookselected = selecteditemhardcopy?.audiobookPrice;
  const hardcopybookselected = selecteditemhardcopy?.price;

  const subtotalamountsingle = audiobookselected + hardcopybookselected;

  const handleClickOpen = () => {
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      privacy_policy: "",
    });
    console.log(user, "activeAddress");
    if (user && user.shippingAddress && user.shippingAddress.length > 0) {
      const activeAddress =
        user?.shippingAddress.find((addr) => addr?.active) ||
        usersdata?.shippingAddress.find((addr) => addr?.active) ||
        user.shippingAddress[0];
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.mobile || "",
        shippingAddress: {
          street: activeAddress?.address || "",
          city: activeAddress?.city || "",
          state: activeAddress?.state || "",
          zipCode: activeAddress?.zipCode || "",
          country: activeAddress?.country || "India",
        },
        privacy_policy: true,
      });
    } else {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.mobile || "",
        shippingAddress: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "India",
        },
        privacy_policy: false,
      });
    }
    setOpen(true);
    setShippingFormOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShippingFormOpen(false);
  };

  const handleChangeAddress = () => {
    setChangeAddressOpen(true);
  };

  const handleCloseChangeAddress = () => {
    setChangeAddressOpen(false);
  };

  const handleAddAddress = () => {
    // Logic to add a new address
  };

  const removeFromCart = async (product) => {
    console.log(product, "---------value for removeFromCart");
    if (
      sessionStorage.getItem("buysinglebook") &&
      sessionStorage.getItem("singleBookBuying")
    ) {
      sessionStorage.removeItem("selectedBook");
      sessionStorage.removeItem("selectedaudiocopy");
      sessionStorage.removeItem("selectedHardcopy");
      sessionStorage.removeItem("buysinglebook");
      sessionStorage.removeItem("singleBookBuying");
      toast.current.show({
        severity: "warn",
        summary: "Removed from Cart",
        detail: `Product has been removed from your cart.`,
        life: 3000,
      });
      // window.location.assign("/");
      router.push("/");
    } else {
      // if (!selecteditemhardcopy) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== product));

      const data = {
        bookId: product?.bookId?._id || selecteditemhardcopy?._id,
        // guestId: guestId,
      };

      try {
        const response = await CartRemoveAPI(data);
        if (response.success) {
          toast.current.show({
            severity: "warn",
            summary: "Removed from Cart",
            detail: `Product has been removed from your cart.`,
            life: 3000,
          });
          fetchData();
          const data = await addToCartAPI();
          setCart(data?.data?.cart);
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Failed to remove product from cart.`,
          life: 3000,
        });
      }
      // } else {
      //   localStorage.removeItem("selectedBook");
      //   toast.current.show({
      //     severity: "warn",
      //     summary: "Removed from Cart",
      //     detail: `Product has been removed from your cart.`,
      //     life: 3000,
      //   });
      //   // window.location.href = "/";
      //   router.push("/");
      // }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      if (name === "privacy_policy") {
        return { ...prevData, privacy_policy: checked };
      }
      return {
        ...prevData,
        shippingAddress: {
          ...prevData.shippingAddress,
          [name]: value,
        },
      };
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      privacy_policy: "",
    };

    if (!formData.privacy_policy) {
      newErrors.privacy_policy =
        "You must agree to the Privacy Policy and Terms & Conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     const formDataToSend = new FormData();
  //     const shippingAddress = {
  //       fullName: `${formData.firstName} ${formData.lastName}`,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: formData.shippingAddress.street,
  //       city: formData.shippingAddress.city,
  //       state: formData.shippingAddress.state,
  //       zipCode: formData.shippingAddress.zipCode,
  //       country: formData.shippingAddress.country,
  //     };

  //     formDataToSend.append("shippingAddress", JSON.stringify(shippingAddress));

  //     try {
  //       const response = await UpdateUserAPI(formDataToSend);
  //       if (response.success) {
  //         setUser(response?.data || usersdata);
  //         handleClose();
  //       }
  //     } catch (error) {
  //       console.error("Failed to update user data:", error);
  //     }
  //   }
  // };

  console.log(usersdata, "usersdata?.shippingAddress?");
  const handlePayment = async () => {
    try {
      // const selectedItemIds = checkout.map((item) => item.bookId._id);

      const activeAddress =
        usersdata?.shippingAddress.find((addr) => addr.active) ||
        usersdata.shippingAddress[0];
      // : user.shippingAddress.find((addr) => addr.active) ||
      //   user.shippingAddress[0];

      console.log(activeAddress, "activeAddress");

      const shippingAddress = {
        name: !selecteditemhardcopy
          ? `${activeAddress?.fullName} `
          : `${activeAddress?.fullName}`,
        address: activeAddress?.address,
        city: activeAddress?.city,
        postalCode: activeAddress?.zipCode,
        state: activeAddress?.state,
        country: activeAddress?.country,
        email: activeAddress?.email || activeAddress?.email,
        phone: activeAddress?.phone || activeAddress?.phone,
      };

      console.log(shippingAddress, "shippingAddress>>>>>>>>");
      let orderItem = null;

      if (selecteditemhardcopy) {
        orderItem = {
          book: selecteditemhardcopy?._id,
          quantity: 1,
          bookSubTotal: subtotalamountsingle,
        };
      } else if (selectedhardcopy1) {
        orderItem = {
          book: selectedhardcopy1?.book?._id,
          quantity: 1,
          bookSubTotal: selectedhardcopy1?.subtotal,
        };
      } else if (checkout.length > 0) {
        // Assuming you want to send the first item in checkout if no other conditions are met
        const firstCheckoutItem = checkout[0];
        orderItem = {
          book: firstCheckoutItem?.bookId?._id,
          quantity: firstCheckoutItem?.quantity,
          bookSubTotal: firstCheckoutItem?.price * firstCheckoutItem?.quantity,
        };
      }

      const payload = {
        orderItems: orderItem ? [orderItem] : [],
        shippingAddress: shippingAddress,
        totalAmount:
          shippingdata.totalAmount ||
          buysingleproducts?.totalPrice ||
          selectedhardcopy1?.totalPrice,
        terms_condition: formData.terms_condition || true,
        privacy_policy: formData.privacy_policy || true,
        subTotal:
          shippingdata?.subtotal ||
          subtotalamountsingle ||
          selectedhardcopy1?.subTotal,
        shippingAmount: shippingdata?.freight_charge,
        bookType: selecteditemhardcopy ? "hardcopy,audiobook" : null,
      };

      // const payload = {

      //   orderItems: selecteditemhardcopy
      //     ? [
      //         {
      //           book: selecteditemhardcopy?._id || selectedhardcopy1?.book?._id,
      //           quantity: 1,
      //           bookSubTotal:
      //             subtotalamountsingle || selectedhardcopy1?.subtotal,
      //         },
      //       ]
      //     : checkout.map((item) => ({
      //         book: item?.bookId?._id,
      //         quantity: item?.quantity,
      //         bookSubTotal: item?.price * item?.quantity,
      //       })  ),
      //   shippingAddress: shippingAddress,
      //   totalAmount:
      //     shippingdata.totalAmount ||
      //     buysingleproducts?.totalPrice ||
      //     selectedhardcopy1?.totalPrice,
      //   // totalAmount: 1,
      //   terms_condition: formData.terms_condition || true,
      //   privacy_policy: formData.privacy_policy || true,
      //   subTotal:
      //     shippingdata?.subtotal ||
      //     subtotalamountsingle ||
      //     selectedhardcopy1.subTotal,
      //   // subTotal: 1,
      //   shippingAmount: shippingdata?.freight_charge,
      //   // shippingAmount: 0,
      //   bookType: selecteditemhardcopy ? "hardcopy,audiobook" : null,
      // };
      console.log(payload, "payload>>>>>>>>>>>");
      const response = await PlaceOrderAPi(payload);

      if (response?.success) {
        setPaybuttonsuccess(response.data);
        typeof window !== "undefined"
          ? sessionStorage.setItem(
              "razorpayOrder",
              JSON.stringify(response.data)
            )
          : null;
        return response?.data;
      } else {
        return {
          razorpayOrderId: "",
          orderTotalAmount: 0,
        };
      }
    } catch (error) {
      console.error("Failed to process payment:", error);
      alert("An error occurred while processing the payment.");
      return {
        razorpayOrderId: "",
        orderTotalAmount: 0,
      };
    }
  };

  const activeAddress =
    user?.shippingAddress?.find((addr) => addr?.active) ||
    usersdata?.shippingAddress?.find((addr) => addr?.active) ||
    user?.shippingAddress?.[0] ||
    null;

  const handleOpenForm = () => {
    handleClickOpen();
    handleCloseChangeAddress();
  };
  console.log(singleselectbooks, "usersdata::::::::::::::::::::::::::::::::");

  const handlesubmit = async () => {
    const weight = selecteditemhardcopy?.weight;
    const unit = selecteditemhardcopy?.weightUnit;

    console.log(weight, unit, "values");

    const convertWeight = (weight, unit) => {
      switch (unit) {
        case "kg":
          return weight;
        case "g":
          return weight / 1000;
        case "lb":
          return weight * 0.453592;
        default:
          return weight;
      }
    };

    const singleaudiobooksprice = convertWeight(weight, unit);

    const data = {
      postalCode: activeAddress?.zipCode,
      weight:
        checkoutdata?.totalWeight ||
        singleaudiobooksprice ||
        selectedhardcopy1?.weight,
      subtotal:
        checkoutdata?.total ||
        subtotalamountsingle ||
        selectedhardcopy1?.totalPrice,
    };

    try {
      const response = await APIshippingdata(data);
      if (response.success) {
        setShippingdata(response.data);
        setPaybutton(true);
      }
    } catch (error) {
      console.error("Error fetching shipping data:", error);
    }
  };

  const handlesubmitShppingForm = async () => {
    const paylod = {
      addressId: editshippingfromdata,
      shippingAddress: formData.shippingAddress,
    };
    const response = await APIshippiAddressUpdate(paylod);
    if (response.success) {
      // Handle success
    }
  };
  const renderAvailability = (isAvailable, label, data) => (
    <>
      <div className="d-flex " style={{ textAlign: "center" }}>
        <li className=" hard-copy-checkout shippingaddress-item-4">
          {/* <span className="me-2">
            {isAvailable ? (
              <img src="/Assert/Vector.png" alt="cff" className="" />
            ) : (
              <img src="/Assert/Vector (1).png" alt="sss" className="" />
            )}
          </span> */}
          <span className="">{label} </span>
          <span className="ms-3"> ₹ {data}</span>
        </li>
      </div>
      <br />
    </>
  );

  const availabilityBodyTemplate = (product) => (
    <ul className="">
      {renderAvailability(
        selecteditemhardcopy
          ? selecteditemhardcopy?.isHardCopyAvailable
          : product?.bookId?.isHardCopyAvailable,
        "Hard Copy",
        hardcopybookselected
      )}
      {renderAvailability(
        selecteditemhardcopy
          ? selecteditemhardcopy?.isAudiobookAvailable
          : product?.bookId?.isAudiobookAvailable,
        "Audio Book",
        audiobookselected
      )}
    </ul>
  );

  console.log(SingleBuyProductdata, "SingleBuyProductdata");
  return (
    <>
      <Toast ref={toast} />
      <div
        style={{
          padding: "16px",
          maxWidth: "1200px",
          margin: "auto",
          fontFamily: "Poppins",
        }}
      >
        <h6
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            fontFamily: "Quicksand",
            fontSize: "24px",
          }}
        >
          <div
            onClick={() => window.history.back()}
            style={{ cursor: "pointer" }}
            className="shippingaddress-item-heading"
          >
            <i className="pi pi-arrow-left" /> Checkout
          </div>
        </h6>
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "10px",
            fontFamily: "Montserrat",
          }}
        >
          Shipping Information
        </h3>
        <Row>
          <Col sm={12} md={8}>
            <div
              style={{
                marginBottom: "20px",
                border: "1px solid rgb(221, 221, 221)",
                padding: "7px",
                background: "white",
                borderRadius: "8px",
                fontFamily: "Montserrat",
                height: "70px",
              }}
            >
              <div className="">
                <div
                  className="d-flex shippingaddress-item"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <span style={{ color: "#838483" }}>
                      Delivery to {""} {user?.firstName || usersdata?.firstName}
                    </span>
                    <br />
                    <span style={{ color: "#1d5755", fontWeight: 600 }}>
                      <input
                        type="radio"
                        className="radio-button"
                        name="address"
                        checked={activeAddress?._id}
                      />{" "}
                      {activeAddress?.address},{activeAddress?.city},
                      {activeAddress?.state},{activeAddress?.country},
                      {activeAddress?.zipCode}
                    </span>
                  </div>
                  <div className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <Button
                        className="p-button-outlined change-buttons-hovera p-0 ms-4"
                        onClick={handleChangeAddress}
                        style={{
                          color: "#0C8040",
                          border: "0px",
                          cursor: "pointer",
                          all: "unset",
                        }}
                      >
                        <span style={{ color: "#0C8040" }}> Change</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Col sm={12} md={12}>
              <div className="card mb-4 ">
                <CheckoutTable
                  checkout={checkout}
                  selectedhardcopy={selectedhardcopy}
                  singleselectbooks={singleselectbooks}
                  removeFromCart={removeFromCart}
                  availabilityBodyTemplate={availabilityBodyTemplate}
                  selecteditemhardcopy={selecteditemhardcopy}
                  SingleBuyProductdata={SingleBuyProductdata}
                />
              </div>
            </Col>
          </Col>

          <Col className="ms-auto " sm={12} md={4}>
            <div
              style={{
                top: "20px",
                right: "20px",
                background: "#fff",
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex">
                <div className="my-auto">
                  <h6
                    style={{
                      fontWeight: "500",
                      marginBottom: "10px",
                      fontFamily: "Poppins",
                      textAlign: "center",
                    }}
                  >
                    Order Summary
                  </h6>
                </div>
                <div className="ms-auto">
                  <div>
                    <Button
                      onClick={handlesubmit}
                      className="checkout-out-delivery"
                    >
                      Delivery to this Address
                    </Button>
                  </div>
                </div>
              </div>

              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Subtotal</p>
                <p style={{ fontWeight: "bold" }}>
                  ₹
                  {shippingdata?.subtotal ||
                    selectedhardcopy1?.subtotal ||
                    subtotalamountsingle ||
                    checkout
                      ?.reduce((acc, item) => acc + item?.subtotal, 0)
                      ?.toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Shipping
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {shippingdata?.freight_charge || "--"}
                </p>
              </div>
              <div>
                <span className="fw-light text-success">
                  {shippingdata?.estimated_delivery_days ? (
                    <>
                      ( Delivery Within {shippingdata?.estimated_delivery_days}{" "}
                      days )
                    </>
                  ) : (
                    "Select the delivery address"
                  )}
                </span>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Total</p>
                <p style={{ fontWeight: "bold" }}>
                  ₹
                  {shippingdata?.totalAmount?.toFixed(2) ||
                    checkout
                      ?.reduce((acc, item) => acc + item.subtotal, 0)
                      .toFixed(2)}
                </p>
              </div>
              <Row className="mb-3">
                <Col md={12}>
                  <div className="d-flex align-items-center">
                    <Checkbox
                      inputId="privacy"
                      name="privacy_policy"
                      checked={formData.privacy_policy}
                      onChange={handleChange}
                      style={{ fontSize: "12px" }}
                    />
                    <label
                      htmlFor="privacy"
                      className="ms-2"
                      style={{ fontSize: "12px" }}
                    >
                      I agree to the{" "}
                      <a
                        href="/book/terms-and-conditions"
                        className="text-decoration-none"
                      >
                        Terms & Conditions
                      </a>{" "}
                      & {""}
                      <a
                        href="/book/privacy-policy"
                        className="text-decoration-none"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.privacy_policy && (
                    <div className="error">{errors.privacy_policy}</div>
                  )}
                </Col>
              </Row>
              <Payment
                formData={formData}
                paynowbuttonsuccess={paynowbuttonsuccess}
                PlaceOrders={handlePayment}
                selectedProduct={checkout}
                paynowbutton={paynowbutton}
              />
            </div>
          </Col>
        </Row>

        <ShippingForm
          open={shippingFormOpen}
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          fetchData={fetchData}
          handleSubmit={handlesubmitShppingForm}
        />
        <ChangeAddress
          usersdata={usersdata}
          setEditshippingfromdata={setEditshippingfromdata}
          fetchData={fetchData}
          activeAddress={activeAddress}
          handlesubmitShppingForm={handlesubmitShppingForm}
          open={changeAddressOpen}
          handleClose={handleCloseChangeAddress}
          handleOpenForm={handleOpenForm}
          handleAddAddress={handleAddAddress}
          userData={
            user?.shippingAddress?.map((address) => ({
              _id: address._id,
              active: address.active,
              fullName: `${user?.firstName || usersdata?.firstName} ${
                user?.lastName || usersdata?.lastName
              } `,
              address: address.address,
              city: address.city,
              state: address.state,
              zipCode: address.zipCode,
              country: address.country,
            })) || []
          }
        />
      </div>
    </>
  );
};

export default CheckoutPage;
