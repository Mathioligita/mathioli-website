"use client";
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "./checkout.scss";

import userContext from "../../UseContext/UseContext";
import {
  addToCartAPI,
  APIshippiAddressUpdate,
  APIshippingdata,
  CartRemoveAPI,
  Checkout,
  PlaceOrderAPi,
} from "../../../../api/page";

import Payment from "./razorpay/Payment";
import ChangeAddress from "./ChangeAddress";
import ShippingForm from "./ShippingForm";
import CheckoutTable from "./CheckoutTable";

const CheckoutPage = () => {
  const [checkout, setCheckout] = useState([]);
  const [shippingdata, setShippingdata] = useState(null);
  const [user, setUser] = useState(null);
  const [checkoutdata, setCheckoutdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [changeAddressOpen, setChangeAddressOpen] = useState(false);
  const [shippingFormOpen, Finance] = useState(false);
  const [paynowbutton, setPaybutton] = useState(false);
  const [editshippingfromdata, setEditshippingfromdata] = useState(null);
  const [singleselectbooks, setSingleselectBooks] = useState([]);
  const [SingleBuyProductdata, setSingleBuyProduct] = useState([]);
  const { setCart, usersdata } = useContext(userContext);
  const toast = useRef(null);
  const router = useRouter();

  const selecteditemhardcopy =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("selectedBook") || "null")
      : null;
  const selectedhardcopy1 =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("buysinglebook") || "null")
      : null;

  useEffect(() => {
    const single = JSON.parse(sessionStorage.getItem("buysinglebook") || "null");
    if (single && sessionStorage.getItem("singleBookBuying")) {
      setCheckoutdata(single);
      setSingleBuyProduct(Array.isArray(single) ? single : [single]);
    }
    if (selecteditemhardcopy) {
      setSingleselectBooks(
        Array.isArray(selecteditemhardcopy) ? selecteditemhardcopy : [selecteditemhardcopy]
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    privacy_policy: false,
  });

  const [errors, setErrors] = useState({ privacy_policy: "" });

  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    router.push("/");
  }

  const fetchData = async () => {
    try {
      const proceed = sessionStorage.getItem("paymentPageCheckout");
      if (proceed === "true") {
        const res = await Checkout();
        if (!res?.isError) {
          setCheckout(res?.data?.Checkout || []);
          setCheckoutdata(res.data);
          setUser(res?.data?.user);
          const firstActive =
            res?.data?.user?.shippingAddress?.find((a) => a.active) ||
            res?.data?.user?.shippingAddress?.[0];
          if (firstActive) setEditshippingfromdata(firstActive._id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const proceed = sessionStorage.getItem("paymentPageCheckout");
    if (proceed) fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const audiobookPrice = selecteditemhardcopy?.audiobookPrice || 0;
  const hardcopyPrice = selecteditemhardcopy?.price || 0;
  const subtotalSingle = audiobookPrice + hardcopyPrice;

  const getActiveAddress = useCallback(() => {
    return (
      user?.shippingAddress?.find((a) => a.active) ||
      usersdata?.shippingAddress?.find((a) => a.active) ||
      user?.shippingAddress?.[0]
    );
  }, [user, usersdata]);

  const fetchShippingData = useCallback(async () => {
    const activeAddr = getActiveAddress();

    if (!activeAddr?.zipCode) {
      setShippingdata(null);
      setPaybutton(false);
      return;
    }

    const payload = {
      postalCode: activeAddr.zipCode,
      weight:
        checkoutdata?.totalWeight ||
        selecteditemhardcopy?.weight ||
        selectedhardcopy1?.weight,
      subtotal:
        checkoutdata?.total || subtotalSingle || selectedhardcopy1?.totalPrice,
    };
    ;

    try {
      const res = await APIshippingdata(payload);
      console.log(res.data);

      if (res?.success) {
        setShippingdata(res.data);
        setPaybutton(true);
      } else {
        setShippingdata(null);
        setPaybutton(false);
        toast.current?.show({
          severity: "error",
          summary: "Shipping Error",
          detail: res?.data?.message || "Shipping not available Pls Change the Pin code",
          life: 3000,
        });
      }
    } catch (e) {
      console.error("Shipping API error:", e);
      setShippingdata(null);
      setPaybutton(false);
      toast.current?.show({
        severity: "error",
        summary: "API Error",
        detail: "Unable to fetch shipping data",
        life: 3000,
      });
    }
  }, [
    getActiveAddress,
    checkoutdata,
    selecteditemhardcopy,
    selectedhardcopy1,
    subtotalSingle,
  ]);

  useEffect(() => {
    if (!user && !usersdata) return;
    if (!checkoutdata && !selecteditemhardcopy && !selectedhardcopy1) return;

    fetchShippingData();
  }, [fetchShippingData]);

  const handleClickOpen = () => {
    setErrors({ privacy_policy: "" });
    const activeAddr = getActiveAddress();

    setFormData({
      fullName: activeAddr?.fullName || `${user?.firstName} ${user?.lastName}`.trim(),
      email: user?.email || usersdata?.email || "",
      phone: user?.mobile || usersdata?.mobile || "",
      shippingAddress: {
        fullName: activeAddr?.fullName || "",
        phone: activeAddr?.phone || "",
        email: activeAddr?.email || "",
        address: activeAddr?.address || "",
        city: activeAddr?.city || "",
        state: activeAddr?.state || "",
        zipCode: activeAddr?.zipCode || "",
        country: activeAddr?.country || "India",
      },
      privacy_policy: true,
    });

    if (activeAddr) setEditshippingfromdata(activeAddr._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    Finance(false);

  };

  const handleChangeAddress = () => setChangeAddressOpen(true);
  const handleCloseChangeAddress = () => setChangeAddressOpen(false);

  const removeFromCart = async (product) => {
    if (sessionStorage.getItem("buysinglebook") && sessionStorage.getItem("singleBookBuying")) {
      [
        "selectedBook",
        "selectedaudiocopy",
        "selectedHardcopy",
        "buysinglebook",
        "singleBookBuying",
      ].forEach((k) => sessionStorage.removeItem(k));
      toast.current?.show({
        severity: "warn",
        summary: "Removed",
        detail: "Product removed from cart.",
        life: 3000,
      });
      router.push("/");
      return;
    }

    setCart((prev) => prev.filter((i) => i._id !== product._id));
    try {
      await CartRemoveAPI({
        bookId: product?.bookId?._id || selecteditemhardcopy?._id,
      });
      toast.current?.show({
        severity: "warn",
        summary: "Removed",
        detail: "Item removed.",
        life: 3000,
      });
      fetchData();
      const cartRes = await addToCartAPI();
      setCart(cartRes?.data?.cart || []);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to remove.",
        life: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "privacy_policy") {
      setFormData((prev) => ({ ...prev, privacy_policy: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [name]: value },
      }));
    }
  };

  const validateForm = () => {
    if (!formData.privacy_policy) {
      setErrors({
        privacy_policy:
          "You must agree to the Privacy Policy and Terms & Conditions",
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return { razorpayOrderId: "", orderTotalAmount: 0 };

    const activeAddr = getActiveAddress();

    const shippingAddress = {
      name: activeAddr?.fullName || `${user?.firstName} ${user?.lastName}`,
      address: activeAddr?.address,
      city: activeAddr?.city,
      postalCode: activeAddr?.zipCode,
      state: activeAddr?.state,
      country: activeAddr?.country || "India",
      email: user?.email || usersdata?.email,
      phone: user?.mobile || usersdata?.mobile,
    };

    let orderItems = [];

    if (selecteditemhardcopy) {
      orderItems.push({
        book: selecteditemhardcopy._id,
        quantity: 1,
        bookSubTotal: subtotalSingle,
      });
    } else if (selectedhardcopy1) {
      orderItems.push({
        book: selectedhardcopy1?.book?._id,
        quantity: 1,
        bookSubTotal: selectedhardcopy1?.subtotal,
      });
    } else if (checkout.length) {
      orderItems = checkout.map((i) => ({
        book: i?.bookId?._id,
        quantity: i?.quantity,
        bookSubTotal: i?.price * i?.quantity,
      }));
    }

    const payload = {
      orderItems,
      shippingAddress,
      totalAmount:
        shippingdata?.totalAmount ||
        selectedhardcopy1?.totalPrice ||
        subtotalSingle,
      terms_condition: true,
      privacy_policy: true,
      subTotal:
        shippingdata?.subtotal || subtotalSingle || selectedhardcopy1?.subTotal,
      shippingAmount: shippingdata?.freight_charge,
      ...(selecteditemhardcopy && { bookType: "hardcopy,audiobook" }),
    };

    try {
      const res = await PlaceOrderAPi(payload);
      if (res?.success) {
        sessionStorage.setItem("razorpayOrder", JSON.stringify(res.data));
        return res.data;
      }
    } catch (e) {
      console.error(e);
      alert("Payment processing error");
    }
    return { razorpayOrderId: "", orderTotalAmount: 0 };
  };

  const handlesubmitShppingForm = async (e) => {
    e.preventDefault();
    const payload = {
      addressId: editshippingfromdata,
      shippingAddress: {
        fullName: formData.shippingAddress.fullName,
        address: formData.shippingAddress.address,
        city: formData.shippingAddress.city,
        state: formData.shippingAddress.state,
        zipCode: formData.shippingAddress.zipCode,
        country: formData.shippingAddress.country,
        phone: formData.shippingAddress.phone,
        email: formData.shippingAddress.email,
      },
    };
    const res = await APIshippiAddressUpdate(payload);
    if (res.success) {
      toast.current?.show({
        severity: "success",
        summary: "Updated",
        detail: "Address updated successfully!",
        life: 3000,
      });
      fetchData();
      handleClose();
    }
  };

  const renderAvailability = (label, price) => (
    <div className="d-flex" style={{ textAlign: "center" }}>
      <li className="hard-copy-checkout shippingaddress-item-4">
        <span>{label}</span>
        <span className="ms-3">₹ {price}</span>
      </li>
    </div>
  );

  const availabilityBodyTemplate = () => (
    <ul className="">
      {renderAvailability(
        "Hard Copy",
        selecteditemhardcopy?.isHardCopyAvailable ? hardcopyPrice : 0
      )}
      {renderAvailability(
        "Audio Book",
        selecteditemhardcopy?.isAudiobookAvailable ? audiobookPrice : 0
      )}
    </ul>
  );

  const activeAddress = getActiveAddress();

  const richUserData = (
    user?.shippingAddress || usersdata?.shippingAddress || []
  ).map((addr) => ({
    _id: addr._id,
    active: addr.active,
    fullName: addr.fullName,
    address: addr.address,
    city: addr.city,
    state: addr.state,
    zipCode: addr.zipCode,
    country: addr.country || "India",
  }));

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
                border: "1px solid #ddd",
                padding: "7px",
                background: "white",
                borderRadius: "8px",
                fontFamily: "Montserrat",
                minHeight: "70px",
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  {activeAddress ? (
                    <span style={{ color: "#838483" }}>
                      Delivery to {activeAddress.fullName}
                    </span>
                  ) : (
                    <div className="text-danger pt-3">No address available. Pls add an address!</div>
                  )}
                  <br />
                  {activeAddress && (
                    <div
                      style={{
                        color: "#1d5755",
                        fontWeight: 600,
                        display: "flex",
                      }}
                    >
                      <input
                        type="radio"
                        className="radio-button me-2"
                        name="address"
                        checked={!!activeAddress}
                        readOnly
                      />
                      {activeAddress.address}, {activeAddress.city},{" "}
                      {activeAddress.state}, {activeAddress.country},{" "}
                      {activeAddress.zipCode}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleChangeAddress}
                  className="checkout-out-delivery bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md border-0 transition-colors mt-1"
                  style={{ border: "none" }}
                >
                  {activeAddress ? "Change Address" : "Add Address"}
                </Button>
              </div>
            </div>

            <CheckoutTable
              checkout={checkout}
              singleselectbooks={singleselectbooks}
              removeFromCart={removeFromCart}
              availabilityBodyTemplate={availabilityBodyTemplate}
              selecteditemhardcopy={selecteditemhardcopy}
              SingleBuyProductdata={SingleBuyProductdata}
            />
          </Col>

          <Col sm={12} md={4} className="ms-auto">
            <div
              style={{
                background: "#fff",
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  fontWeight: 500,
                  marginBottom: "10px",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                Order Summary
              </h6>

              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Subtotal</p>
                <p style={{ fontWeight: "bold" }}>
                  ₹
                  {shippingdata?.subtotal ||
                    selectedhardcopy1?.subtotal ||
                    subtotalSingle ||
                    checkout.reduce((a, i) => a + i.subtotal, 0).toFixed(2)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <p style={{ fontWeight: 400, fontSize: "14px" }}>Shipping</p>
                <p style={{ fontWeight: 400, fontSize: "14px" }}>
                  {shippingdata?.freight_charge ?? "--"}
                </p>
              </div>

              <div>
                <span className="fw-light text-success">
                  {shippingdata?.estimated_delivery_days
                    ? `( Delivery Within ${shippingdata.estimated_delivery_days} days )`
                    : activeAddress ? "Calculating..." : "Select address"}
                </span>
              </div>

              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <n style={{ fontWeight: "bold" }}>Total</n>
                <p style={{ fontWeight: "bold" }}>
                  ₹
                  {(shippingdata?.totalAmount ||
                    checkout.reduce((a, i) => a + i.subtotal, 0)).toFixed(2)}
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
                      &{" "}
                      <a
                        href="/book/privacy-policy"
                        className="text-decoration-none"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.privacy_policy && (
                    <div className="text-danger" style={{ fontSize: "12px" }}>
                      {errors.privacy_policy}
                    </div>
                  )}
                </Col>
              </Row>

              <Payment
                shippingdata={shippingdata}
                formData={formData}
                paynowbuttonsuccess={[]}
                handlePayment={handlePayment}
                selectedProduct={checkout}
                paynowbutton={paynowbutton}
                activeAddress={activeAddress}
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
          editshippingfromdata={editshippingfromdata}
        />

        <ChangeAddress
          open={changeAddressOpen}
          handleClose={handleCloseChangeAddress}
          activeAddress={activeAddress}
          userData={richUserData}
          setEditshippingfromdata={setEditshippingfromdata}
          fetchData={fetchData}
          handleOpenForm={() => {
            handleClickOpen();
            Finance(true);
            handleCloseChangeAddress();
          }}
        />
      </div>
    </>
  );
};

export default CheckoutPage;