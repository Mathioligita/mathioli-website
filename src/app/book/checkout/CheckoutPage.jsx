// 'use client';
// import React, { useEffect, useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { Row, Col } from 'react-bootstrap';
// import './Checkout.css';
// import {
// 	Checkout,
// 	CountryAPI,
// 	StateAPI,
// 	DistrictAPI,
// 	APIshippingdata,
// 	PlaceOrderAPi,
// } from '../../../../api/page';
// import { Badge } from 'primereact/badge';
// import { Checkbox } from 'primereact/checkbox';
// // import Swal from "sweetalert2";
// import Payment from './razorpay/Payment';

// const CheckoutPage = () => {
// 	const [values, setValues] = useState(false);
// 	const [countries, setCountries] = useState([]);
// 	const [states, setStates] = useState([]);
// 	const [districts, setDistricts] = useState([]);
// 	const [razopayshow, setRazopayshow] = useState(false);

// 	// console.log(,"dadada")

// 	// useEffect(()=>{
// 	// if (typeof window !== "undefined") {
// 	const razsopay =
// 		typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('razorpayOrder')) : null;
// 	const singleBuy =
// 		typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('buysinglebook')) : null;
// 	const buysingleproducts = singleBuy?.data;

// 	//   setRazopayshow(razsopay?.order?.user)
// 	// },[])
// 	// const razopaydata =
// 	// console.log(buysingleproducts, "singleBuy")

// 	const [cartItems, setCartItems] = useState([]);
// 	const [shippingdata, setShippingdata] = useState(null);
// 	const [formData, setFormData] = useState({
// 		country: '',
// 		state: '',
// 		district: '',
// 		firstName: values?.user?.firstName || '',
// 		lastName: values?.user?.lastName || '',
// 		address: values?.user?.address || '',
// 		city: '',
// 		pinCode: '',
// 		cardNumber: '',
// 		expirationDate: '',
// 		securityCode: '',
// 		nameOnCard: '',
// 		email: values?.user?.email || '',
// 		phone: values?.user?.mobile || '',
// 		terms_condition: '',
// 		privacy_policy: '',
// 	});

// 	// const valed = formData.state
// 	// console.log(shippingdata, "sssssssssssssss");

// 	// Handle form input change
// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};
// 	// const fetchCountries = async () => {
// 	// 	try {
// 	// 		const response = await CountryAPI();
// 	// 		setCountries(response?.data || []);
// 	// 		console.log(response.data);
// 	// 	} catch (error) {
// 	// 		console.error('Error fetching countries:', error);
// 	// 	}
// 	// };

// 	useEffect(() => {
// 		if (!singleBuy) {
// 			const fetchCheckoutData = async () => {
// 				try {
// 					const response = await Checkout();
// 					setCartItems(response?.data?.Checkout);
// 					setValues(response?.data);
// 				} catch (error) {
// 					console.error('Error fetching checkout data:', error);
// 				}
// 			};
// 			fetchCheckoutData();
// 		}
// 	}, []);
// 	// Fetch checkout items

// 	// Fetch states based on selected country
// 	// useEffect(() => {
// 	// 	if (formData.country) {
// 	// 		const fetchStates = async () => {
// 	// 			try {
// 	// 				const response = await StateAPI(formData.country);
// 	// 				setStates(response?.data || []);
// 	// 			} catch (error) {
// 	// 				console.error('Error fetching states:', error);
// 	// 			}
// 	// 		};
// 	// 		fetchStates();
// 	// 	}
// 	// 	fetchCountries();
// 	// }, [formData.country]);

// 	// Fetch districts based on selected state
// 	// useEffect(() => {
// 	// 	if (formData.state && formData.country) {
// 	// 		const fetchDistricts = async () => {
// 	// 			try {
// 	// 				const data = {
// 	// 					country: formData.country,
// 	// 					state: formData.state,
// 	// 				};
// 	// 				const response = await DistrictAPI(data);
// 	// 				setDistricts(response?.data || []);
// 	// 				console.log(response.data, 'data');

// 	// 				localStorage.setItem('totalAmount', response.data);
// 	// 			} catch (error) {
// 	// 				console.error('Error fetching districts:', error);
// 	// 			}
// 	// 		};
// 	// 		fetchDistricts();
// 	// 	}
// 	// }, [formData.country, formData.state]);

// 	useEffect(() => {
// 		if (formData.district) {
// 			handlesubmit();
// 		}
// 	}, [formData.district]);

// 	const handlesubmit = async () => {
// 		const data = {
// 			country: formData.country,
// 			state: formData.state,
// 			district: formData.district,
// 			totalWeight: values.totalWeight || buysingleproducts?.weight,
// 			totalAmount: values.total || buysingleproducts?.totalPrice,
// 		};
// 		// console.log(data, "dfghjk")

// 		const response = await APIshippingdata(data);

// 		setShippingdata(response.data);
// 	};

// 	// console.log(shippingdata, "shippingdata");

// 	// Calculate prices
// 	const subtotal = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
// 	const shipping = shippingdata?.shippingAmount || 0;
// 	// const estimatedTaxes = 0.0;
// 	const total =
// 		shippingdata?.finalAmount ||
// 		cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
// 	// Handle payment logic
// 	const handlePayment = async () => {
// 		const payload = {
// 			orderItems: buysingleproducts
// 				? {
// 						book: buysingleproducts?.book?._id,
// 						quantity: buysingleproducts?.quantity,
// 						bookSubTotal: buysingleproducts?.bookPrice * buysingleproducts?.quantity,
// 					}
// 				: cartItems.map((item) => ({
// 						book: item?.bookId?._id,
// 						quantity: item?.quantity,
// 						bookSubTotal: item?.price * item?.quantity,
// 					})),
// 			shippingInfo: {
// 				firstname:
// 					formData?.firstName ||
// 					values?.user?.firstName ||
// 					buysingleproducts?.user?.firstName,
// 				lastname:
// 					formData?.lastName ||
// 					values?.user?.lastName ||
// 					buysingleproducts?.user?.lastName,
// 				streetaddress: formData?.address,
// 				country: formData?.country,
// 				state: formData?.state,
// 				district: formData?.district,
// 				phone: formData?.phone || values?.user?.mobile || buysingleproducts?.user?.mobile,
// 				postalCode: formData?.pinCode,
// 				email: formData.email || values?.user?.email || buysingleproducts?.user?.email,
// 			},
// 			totalAmount: total || buysingleproducts?.totalPrice,
// 			terms_condition: formData.terms_condition,
// 			privacy_policy: formData.privacy_policy,
// 			subTotal: subtotal || buysingleproducts?.subtotal,
// 			shippingAmount: shipping,
// 		};
// 		// console.log(payload, "playload")
// 		try {
// 			const response = await PlaceOrderAPi(payload);
// 			// console.log('Order placed successfully', response);
// 			if (response.success) {
// 				// console.log(response.data)
// 				sessionStorage.setItem('razorpayOrder', JSON.stringify(response.data));

// 				// sessionStorage.setItem("order", response.data.order)

// 				setRazopayshow(true);
// 				// handlePayment();
// 			}
// 		} catch (error) {
// 			console.error('Error placing order:', error);
// 		}
// 	};

// 	return (
// 		<div className="checkout-page">
// 			<div className="checkout-summary mt-4  w-50">
// 				<div className="Summary">
// 					<h5 className="p-3 ">Checkout Summary</h5>
// 					<Row className="cart-items m-2">
// 						{buysingleproducts ? (
// 							<Col sm={12} md={12}>
// 								<div className="d-flex  checkout-all">
// 									<div className="align-self-center">
// 										<div className="item-image-container m-2">
// 											<img
// 												src={buysingleproducts?.book?.bookimage[0]}
// 												alt={buysingleproducts?.book?.title}
// 												style={{ width: '70px' }}
// 											/>
// 											<Badge
// 												value={buysingleproducts?.quantity}
// 												className="item-image-badge"
// 											></Badge>
// 										</div>

// 										{buysingleproducts?.book?.title}
// 									</div>
// 									<div className="item-detail align-self-center ms-auto">
// 										<p>₹{buysingleproducts?.bookPrice?.toFixed(2)}</p>
// 									</div>
// 								</div>
// 							</Col>
// 						) : (
// 							cartItems?.map((item, index) => (
// 								<Col md={12} key={index}>
// 									{/* <div className="d-flex checkout-all"> */}
// 									<div
// 										className="d-flex checkout-all"
// 										style={{ justifyContent: 'space-between' }}
// 									>
// 										<div>
// 											<div className="item-image-container ">
// 												<img
// 													src={item?.bookId?.bookimage[0]}
// 													alt={item.bookId.title}
// 													style={{ width: '70px' }}
// 												/>
// 												<Badge
// 													value={item?.quantity}
// 													className="item-image-badge"
// 												></Badge>
// 											</div>
// 											<span className="fw-bold  ms-4">
// 												{item.bookId.title}
// 											</span>
// 										</div>

// 										<div className="item-details">
// 											<span>₹{item.price.toFixed(2)}</span>
// 										</div>
// 									</div>
// 									{/* </div> */}
// 								</Col>
// 							))
// 						)}
// 					</Row>

// 					{/* Summary Details */}
// 					<div className="summary-details p-5">
// 						<div className="summary-details-line m-2 d-flex justify-content-between">
// 							<span className="fw-bold">
// 								Subtotal ({cartItems?.length || buysingleproducts?.quantity} items):
// 							</span>{' '}
// 							<span className="text-end">
// 								₹{subtotal || buysingleproducts?.bookPrice?.toFixed(2)}
// 							</span>
// 						</div>
// 						<div className="summary-details-line m-2 d-flex justify-content-between">
// 							<span className="fw-bold">Shipping:</span>{' '}
// 							<span className="text-end">₹{shipping?.toFixed(2)}</span>
// 						</div>
// 						{/* <div className="summary-details-line m-2 d-flex justify-content-between">
//                   <span className="fw-bold">Estimated Taxes:</span> <span className="text-end">₹{estimatedTaxes?.toFixed(2)}</span>
//                 </div> */}
// 						<div className="summary-details-line m-2 d-flex justify-content-between">
// 							<span className="fw-bold">Total:</span>{' '}
// 							<span className="fw-bold text-end">₹{total?.toFixed(2)}</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Checkout Form */}
// 			<div className="checkout-form p-4">
// 				<div className="p-grid p-fluid">
// 					{/* First Name */}
// 					<Row className="mb-3">
// 						<Col md={6} lg={6}>
// 							<InputText
// 								value={
// 									formData.firstName ||
// 									values?.user?.firstName ||
// 									buysingleproducts?.user?.firstName
// 								}
// 								onChange={handleChange}
// 								name="firstName"
// 								placeholder="First name"
// 							/>
// 						</Col>

// 						{/* Last Name */}
// 						<Col md={6} lg={6}>
// 							<InputText
// 								value={
// 									formData.lastName ||
// 									values?.user?.lastName ||
// 									buysingleproducts?.user?.lastName
// 								}
// 								onChange={handleChange}
// 								name="lastName"
// 								placeholder="Last name"
// 							/>
// 						</Col>
// 					</Row>

// 					<Row className="mb-3">
// 						{/* Phone number  */}
// 						<Col md={6} lg={6}>
// 							<InputText
// 								value={
// 									formData.phone ||
// 									values?.user?.mobile ||
// 									buysingleproducts?.user?.mobile
// 								}
// 								onChange={handleChange}
// 								name="phone"
// 								placeholder="phone"
// 							/>
// 						</Col>
// 						{/* Email  */}

// 						<Col md={6} lg={6}>
// 							<InputText
// 								value={
// 									formData.email ||
// 									values?.user?.email ||
// 									buysingleproducts?.user?.email
// 								}
// 								onChange={handleChange}
// 								name="email"
// 								placeholder="email"
// 							/>
// 						</Col>
// 					</Row>
// 					{/* Country Dropdown */}
// 					<Row className="mb-3">
// 						<Col md={12}>
// 							{/* {console.log(countries?.countries?.map((c) => ({ label: c, value: c })), "ddddd")} */}
// 							<Dropdown
// 								value={formData.country}
// 								options={
// 									countries?.countries?.map((c) => ({ label: c, value: c })) || []
// 								}
// 								onChange={(e) =>
// 									handleChange({ target: { name: 'country', value: e.value } })
// 								}
// 								placeholder="Select Country"
// 							/>
// 						</Col>
// 					</Row>
// 					{console.log(states?.stateNames?.map((s) => ({ label: s, value: s })))}
// 					{/* State Dropdown */}
// 					<Row className="mb-3">
// 						<Col md={6}>
// 							<Dropdown
// 								value={formData.state}
// 								options={states?.stateNames?.map((s) => ({
// 									label: s,
// 									value: s,
// 								}))}
// 								onChange={(e) =>
// 									handleChange({ target: { name: 'state', value: e.value } })
// 								}
// 								placeholder="Select State"
// 							/>
// 						</Col>

// 						{/* District Dropdown */}
// 						<Col md={6}>
// 							<Dropdown
// 								value={formData.district}
// 								options={districts?.districts?.map((d) => ({
// 									label: d,
// 									value: d,
// 								}))}
// 								onChange={(e) => {
// 									handleChange({
// 										target: { name: 'district', value: e.value },
// 									}),
// 										handlesubmit();
// 								}}
// 								placeholder="Select District"
// 							/>
// 						</Col>
// 					</Row>

// 					{/* Address */}
// 					<Row className="mb-3">
// 						<Col md={12}>
// 							<InputText
// 								value={formData.address || values?.user?.address}
// 								onChange={handleChange}
// 								name="address"
// 								placeholder="streetaddress
// "
// 							/>
// 						</Col>
// 					</Row>

// 					{/* PIN Code */}
// 					<Row className="mb-3">
// 						<Col md={12}>
// 							<InputText
// 								value={formData.pinCode}
// 								onChange={handleChange}
// 								name="pinCode"
// 								placeholder="PIN code"
// 							/>
// 						</Col>
// 					</Row>

// 					<Row className="mb-3">
// 						<Col md={12}>
// 							<div className="d-flex align-items-center">
// 								<Checkbox
// 									inputId="terms"
// 									name="terms_condition"
// 									checked={formData.terms_condition}
// 									onChange={(e) =>
// 										handleChange({
// 											target: { name: 'terms_condition', value: e.checked },
// 										})
// 									}
// 								/>
// 								<label htmlFor="terms" className="ms-2">
// 									I agree to the{' '}
// 									<a
// 										href="/book/terms-and-conditions"
// 										className="text-decoration-none"
// 									>
// 										Terms & Conditions
// 									</a>{' '}
// 								</label>
// 							</div>
// 						</Col>
// 					</Row>

// 					<Row className="mb-3">
// 						<Col md={12}>
// 							<div className="d-flex align-items-center">
// 								<Checkbox
// 									inputId="privacy"
// 									name="privacy_policy"
// 									checked={formData.privacy_policy}
// 									onChange={(e) =>
// 										handleChange({
// 											target: { name: 'privacy_policy', value: e.checked },
// 										})
// 									}
// 								/>
// 								<label htmlFor="privacy" className="ms-2">
// 									I agree to the{' '}
// 									<a href="/book/privacy-policy" className="text-decoration-none">
// 										Privacy Policy
// 									</a>
// 								</label>
// 							</div>
// 						</Col>
// 					</Row>

// 					{/* Pay Now Button */}
// 					<Row>
// 						<Col md={12}>
// 							{/* {
//                 razopayshow ? ( */}
// 							<Payment razsopay={razsopay} razopayshow={razopayshow} total={total} Paymentplace={handlePayment} />
// 							{/* ) : null
//                 // <Button label="Place Order " className="place-order" onClick={handlePayment} />
//               } */}
// 						</Col>
// 					</Row>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CheckoutPage;
"use client";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col } from "react-bootstrap";
import "./Checkout.css";
import { Checkout, APIshippingdata, PlaceOrderAPi } from "../../../../api/page";
import { Badge } from "primereact/badge";
import { Checkbox } from "primereact/checkbox";
import Payment from "./razorpay/Payment";

const CheckoutPage = () => {
  const [values, setValues] = useState(false);
  const [razopayshow, setRazopayshow] = useState(false);

  const razsopay =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("razorpayOrder"))
      : null;
  const singleBuy =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("buysinglebook"))
      : null;
  const buysingleproducts = singleBuy?.data;

  const [cartItems, setCartItems] = useState([]);
  const [shippingdata, setShippingdata] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    district: "",
    firstName: values?.user?.firstName || "",
    lastName: values?.user?.lastName || "",
    address: values?.user?.address || "",
    city: "",
    pinCode: "",
    email: values?.user?.email || "",
    phone: values?.user?.mobile || "",
    terms_condition: "",
    privacy_policy: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!singleBuy) {
      const fetchCheckoutData = async () => {
        try {
          const response = await Checkout();
          setCartItems(response?.data?.Checkout);
          setValues(response?.data);
        } catch (error) {
          console.error("Error fetching checkout data:", error);
        }
      };
      fetchCheckoutData();
    }
  }, []);

  useEffect(() => {
    if (formData.pinCode) {
      handlesubmit();
    }
  }, [formData.pinCode]);

  const handlesubmit = async () => {
    const pinCode = formData.pinCode;

    // Validate that pinCode is a 6-digit number
    if (!/^\d{6}$/.test(pinCode)) {
      console.error("Invalid PIN code. Please enter a 6-digit number.");
      return;
    }

    const data = {
      postalCode: pinCode, // Assuming pinCode is the postal code
      weight: values.totalWeight || buysingleproducts?.weight,
      subtotal: values.total || buysingleproducts?.totalPrice,
    };

    try {
      const response = await APIshippingdata(data);
      console.log(response, "respone>>>>>>>>>>>>");
      setShippingdata(response.data);
    } catch (error) {
      console.error("Error fetching shipping data:", error);
    }
  };

  // Calculate prices
  const subtotal = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = shippingdata?.freight_charge || 0;
  const total =
    shippingdata?.totalAmount ||
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle payment logic
  const handlePayment = async () => {
    const payload = {
      orderItems: buysingleproducts
        ? {
            book: buysingleproducts?.book?._id,
            quantity: buysingleproducts?.quantity,
            bookSubTotal:
              buysingleproducts?.bookPrice * buysingleproducts?.quantity,
          }
        : cartItems.map((item) => ({
            book: item?.bookId?._id,
            quantity: item?.quantity,
            bookSubTotal: item?.price * item?.quantity,
          })),
      shippingInfo: {
        firstname:
          formData?.firstName ||
          values?.user?.firstName ||
          buysingleproducts?.user?.firstName,
        lastname:
          formData?.lastName ||
          values?.user?.lastName ||
          buysingleproducts?.user?.lastName,
        streetaddress: formData?.address,
        country: formData?.country,
        state: formData?.state,
        district: formData?.district,
        phone:
          formData?.phone ||
          values?.user?.mobile ||
          buysingleproducts?.user?.mobile,
        postalCode: formData?.pinCode,
        email:
          formData.email ||
          values?.user?.email ||
          buysingleproducts?.user?.email,
      },
      totalAmount: total || buysingleproducts?.totalPrice,
      terms_condition: formData.terms_condition,
      privacy_policy: formData.privacy_policy,
      subTotal: subtotal || buysingleproducts?.subtotal,
      shippingAmount: shipping,
    };

    try {
      const response = await PlaceOrderAPi(payload);
      console.log(response, "response");
      if (response.success) {
        sessionStorage.setItem("razorpayOrder", JSON.stringify(response.data));
        setRazopayshow(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-summary mt-4  w-50">
        <div className="Summary">
          <h5 className="p-3 ">Checkout Summary</h5>
          <Row className="cart-items m-2">
            {buysingleproducts ? (
              <Col sm={12} md={12}>
                <div className="d-flex  checkout-all">
                  <div className="align-self-center">
                    <div className="item-image-container m-2">
                      <img
                        src={buysingleproducts?.book?.bookimage[0]}
                        alt={buysingleproducts?.book?.title}
                        style={{ width: "70px" }}
                      />
                      <Badge
                        value={buysingleproducts?.quantity}
                        className="item-image-badge"
                      ></Badge>
                    </div>

                    {buysingleproducts?.book?.title}
                  </div>
                  <div className="item-detail align-self-center ms-auto">
                    <p>₹{buysingleproducts?.bookPrice?.toFixed(2)}</p>
                  </div>
                </div>
              </Col>
            ) : (
              cartItems?.map((item, index) => (
                <Col md={12} key={index}>
                  <div
                    className="d-flex checkout-all"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <div className="item-image-container ">
                        <img
                          src={item?.bookId?.bookimage[0]}
                          alt={item.bookId.title}
                          style={{ width: "70px" }}
                        />
                        <Badge
                          value={item?.quantity}
                          className="item-image-badge"
                        ></Badge>
                      </div>
                      <span className="fw-bold  ms-4">{item.bookId.title}</span>
                    </div>

                    <div className="item-details">
                      <span>₹{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>

          {/* Summary Details */}
          <div className="summary-details p-5">
            <div className="summary-details-line m-2 d-flex justify-content-between">
              <span className="fw-bold">
                Subtotal : {""}
                <span className="fw-lighter text-success">
                  ( {cartItems?.length || buysingleproducts?.quantity} items)
                </span>
              </span>{" "}
              <span className="text-end ">
                ₹{subtotal || buysingleproducts?.bookPrice?.toFixed(2)}
              </span>
            </div>
            <div className="summary-details-line m-2 d-flex justify-content-between">
              <span className="fw-bold">
                Shipping :  {""}
                <span className="fw-lighter text-success">
                  (
                  {shippingdata?.estimated_delivery_days ? (
                    <>
                      Delivery With in {shippingdata?.estimated_delivery_days}{" "}
                      days
                    </>
                  ) : null}
                  )
                </span>
              </span>{" "}
              <span className="text-end">₹{shipping?.toFixed(2)}</span>
            </div>
            <div className="summary-details-line m-2 d-flex justify-content-between">
              <span className="fw-bold">Total:</span>{" "}
              <span className="fw-bold text-end">₹{total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="checkout-form p-4">
        <div className="p-grid p-fluid">
          {/* First Name */}
          <Row className="mb-3">
            <Col md={6} lg={6}>
              <InputText
                value={
                  formData.firstName ||
                  values?.user?.firstName ||
                  buysingleproducts?.user?.firstName
                }
                onChange={handleChange}
                name="firstName"
                placeholder="First name"
              />
            </Col>

            {/* Last Name */}
            <Col md={6} lg={6}>
              <InputText
                value={
                  formData.lastName ||
                  values?.user?.lastName ||
                  buysingleproducts?.user?.lastName
                }
                onChange={handleChange}
                name="lastName"
                placeholder="Last name"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Phone number  */}
            <Col md={6} lg={6}>
              <InputText
                value={
                  formData.phone ||
                  values?.user?.mobile ||
                  buysingleproducts?.user?.mobile
                }
                onChange={handleChange}
                name="phone"
                placeholder="Phone"
              />
            </Col>
            {/* Email  */}

            <Col md={6} lg={6}>
              <InputText
                value={
                  formData.email ||
                  values?.user?.email ||
                  buysingleproducts?.user?.email
                }
                onChange={handleChange}
                name="email"
                placeholder="Email"
              />
            </Col>
          </Row>
          {/* Country Input */}
          <Row className="mb-3">
            <Col md={12}>
              <InputText
                value={formData.country}
                onChange={handleChange}
                name="country"
                placeholder="Country"
              />
            </Col>
          </Row>

          {/* State Input */}
          <Row className="mb-3">
            <Col md={6}>
              <InputText
                value={formData.state}
                onChange={handleChange}
                name="state"
                placeholder="State"
              />
            </Col>

            {/* District Input */}
            <Col md={6}>
              <InputText
                value={formData.district}
                onChange={handleChange}
                name="district"
                placeholder="District"
              />
            </Col>
          </Row>

          {/* Address */}
          <Row className="mb-3">
            <Col md={12}>
              <InputText
                value={formData.address || values?.user?.address}
                onChange={handleChange}
                name="address"
                placeholder="Street address"
              />
            </Col>
          </Row>

          {/* PIN Code */}
          <Row className="mb-3">
            <Col md={12}>
              <InputText
                value={formData.pinCode}
                onChange={handleChange}
                name="pinCode"
                placeholder="PIN code"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <div className="d-flex align-items-center">
                <Checkbox
                  inputId="terms"
                  name="terms_condition"
                  checked={formData.terms_condition}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "terms_condition", value: e.checked },
                    })
                  }
                />
                <label htmlFor="terms" className="ms-2">
                  I agree to the{" "}
                  <a
                    href="/book/terms-and-conditions"
                    className="text-decoration-none"
                  >
                    Terms & Conditions
                  </a>{" "}
                </label>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <div className="d-flex align-items-center">
                <Checkbox
                  inputId="privacy"
                  name="privacy_policy"
                  checked={formData.privacy_policy}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "privacy_policy", value: e.checked },
                    })
                  }
                />
                <label htmlFor="privacy" className="ms-2">
                  I agree to the{" "}
                  <a
                    href="/book/privacy-policy"
                    className="text-decoration-none"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </Col>
          </Row>

          {/* Pay Now Button */}
          <Row>
            <Col md={12}>
              <Payment
                razsopay={razsopay}
                razopayshow={razopayshow}
                total={total}
                Paymentplace={handlePayment}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
