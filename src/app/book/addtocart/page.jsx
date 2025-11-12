"use client";
import userContext from "../../../app/UseContext/UseContext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./atc.css";

import {
  addToCartAPI,
  CartRemoveAPI,
  cartUpdateAPIquanity,
} from "../../../../api/page";
import { Tag } from "primereact/tag";
import { useRouter } from "next/navigation.js";
import Cookies from "js-cookie";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Col, Row } from "react-bootstrap";

const retryFetch = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limited. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryFetch(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export default function Addtocart() {
  const toast = useRef(null);
  const [carts, setCarts] = useState([]);
  const { cart, setCart, loginpoup } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const accessToken = Cookies.get("accessToken");
  const guestId = Cookies.get("guestId");
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchCart = async () => {
    try {
      const response = await retryFetch(addToCartAPI);
      setCart(response.data.cart);
      setCarts(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (product) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== product));

    const data = {
      bookId: product.bookId._id,
      guestId: guestId,
    };

    try {
      const response = await retryFetch(() => CartRemoveAPI(data));
      if (response.success) {
        toast.current.show({
          severity: "warn",
          summary: "Removed from Cart",
          detail: `Product has been removed from your cart.`,
          life: 3000,
        });
        const data = await retryFetch(addToCartAPI);
        setCart(data?.data?.cart);
        setCarts(data?.data?.cart);
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
  };

  const updateQuantity = async (product, quantity) => {
    setLoading(true);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === product
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
          : item
      )
    );

    const data = {
      bookId: product?.bookId?._id,
      quantity: quantity,
      guestId: guestId,
    };

    try {
      const response = await retryFetch(() => cartUpdateAPIquanity(data));
      if (response.success) {
        const data1 = await retryFetch(addToCartAPI);
        setCart(data1?.data?.cart);
        setCarts(data1?.data?.cart);
        toast.current.show({
          severity: "success",
          summary: "Quantity Updated",
          detail: `${response.data.message}`,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${response.data.message}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === product
            ? { ...item, quantity: Math.max(1, item.quantity - quantity) }
            : item
        )
      );
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Failed to update product quantity.`,
        life: 3000,
      });
    }
    setLoading(false);
  };

  const formatCurrency = (value) => {
    return value?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const calculateTotal = () => {
    if (!Array.isArray(cart)) {
      return 0;
    }

    return cart.reduce(
      (total, item) => total + item?.bookId?.price * item?.quantity,
      0
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const availabilityBodyTemplate = (product) => {
    const quantity = product?.bookId?.quantity;
    if (quantity > 10) return "In Stock";
    if (quantity > 0 && quantity <= 10) return "Low Stock";
    return "Out of Stock";
  };

  const statusBodyTemplate = (product) => (
    <Tag
      value={availabilityBodyTemplate(product)}
      severity={getSeverity(product)}
    />
  );

  const getSeverity = (product) => {
    const quantity = product?.bookId?.quantity;
    if (quantity > 10) return "success";
    if (quantity > 0 && quantity <= 10) return "warning";
    return "danger";
  };

  const Checkoutnavigate = () => {
    sessionStorage.removeItem("selectedBook");
    sessionStorage.removeItem("selectedHardcopy");
    sessionStorage.removeItem("selectedaudiocopy");
    sessionStorage.removeItem("buysinglebook");
    sessionStorage.removeItem("singleBookBuying");
    sessionStorage.setItem("paymentPageCheckout", true);
    accessToken ? router.push("/book/checkout") : loginpoup();
  };

  // Title template for desktop view
  const titleBodyTemplate = (product) => (
    <div
      className="d-flex align-items-center"
      style={{ width: "300px" }}
      onClick={() => router.push(`/book/${product?.bookId?.slug}`)}
    >
      <img
        src={product?.bookId?.bookimage[0] || "/image/image 9.png"}
        alt="Product"
        style={{ width: "60px", height: "80px", objectFit: "cover" }}
        className="me-3"
      />
      <div className="text-start" style={{ width: "240px" }}>
        <h6 className="mb-1 text-truncate" style={{ maxWidth: "100%" }}>
          {product?.bookId?.title}
        </h6>
        <p className="mb-1 text-muted" style={{ fontSize: "12px" }}>
          {product?.bookId?.author}
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
          {product?.bookId?.language}
        </p>
      </div>
    </div>
  );

  // Title template for mobile view
  const mobileTitleTemplate = (product) => (
    <div className="d-flex align-items-center">
      <img
        src={product?.bookId?.bookimage[0] || "/image/image 9.png"}
        alt="Product"
        style={{ width: "50px", height: "70px", objectFit: "cover" }}
        className="me-2"
      />
      <div className="text-start">
        <h6 className="mb-1" style={{ fontSize: "14px" }}>
          {product?.bookId?.title.length > 20
            ? `${product?.bookId?.title.substring(0, 20)}...`
            : product?.bookId?.title}
        </h6>
        <p className="mb-1 text-muted" style={{ fontSize: "12px" }}>
          {product?.bookId?.author}
        </p>
      </div>
    </div>
  );

  const quantityBodyTemplate = (product) => (
    // <div className="d-flex align-items-center" style={{ width: "150px" }}>
    //   <Button
    //     icon="pi pi-minus"
    //     className="p-button-rounded p-button-text p-button-danger"
    //     onClick={() => updateQuantity(product, -1)}
    //     disabled={product.quantity <= 1 || loading}
    //   />
    //   <span className="mx-2">{product?.quantity}</span>
    //   <Button
    //     icon="pi pi-plus"
    //     className="p-button-rounded p-button-text p-button-success"
    //     onClick={() => updateQuantity(product, 1)}
    //     disabled={loading}
    //   />
    <div className="d-flex pp-btn align-items-center">
      <Button
        icon="pi pi-minus"
        style={{ color: "Red" }}
        onClick={() => updateQuantity(product, -1)}
        disabled={product.quantity <= 1 || loading}
        className="p-button-rounded p-button-text p-button-danger"
      />
      <span className="mx-2">{product?.quantity}</span>
      <Button
        icon="pi pi-plus"
        style={{ color: "Green", fontSize: "15px" }}
        onClick={() => updateQuantity(product, 1)}
        disabled={loading}
        className="p-button-rounded p-button-text p-button-success"
      />
    </div>
    // </div>
  );

  const priceBodyTemplate = (product) => (
    <div style={{ width: "100px" }}>
      {formatCurrency(product.bookId.price * product.quantity)}
    </div>
  );

  const actionBodyTemplate = (product) => (
    <div style={{ width: "80px" }}>
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-danger"
        onClick={() => removeFromCart(product)}
      />
    </div>
  );

  const renderEmptyCart = () => (
    <div className="text-center py-5">
      <h5>Your cart is empty</h5>
      <p className="text-muted mb-4">
        You haven't added any items to your cart yet
      </p>
      <Button
        label="Continue Shopping"
        className="p-button-primary mt-3"
        style={{
          borderRadius: "6px",
          background: "rgb(29, 87, 85)",
          border: "1px solid rgb(29, 87, 85)",
        }}
        onClick={() => router.push("/")}
      />
    </div>
  );

  const renderMobileView = () => (
    <div className="container">
      <div
        onClick={() => router.back()}
        className="mt-3"
        style={{ cursor: "pointer" }}
      >
        <i className="pi pi-arrow-left"> Back</i>
      </div>

      <div className="d-flex justify-content-between align-items-center my-3">
        <h5>Your Cart</h5>
        <Button
          label="Continue Shopping"
          className="p-button-outlined"
          onClick={() => router.push("/")}
          style={{
            borderRadius: "6px",
            border: "1px solid rgb(255, 165, 57)",
            color: "rgb(255, 165, 57)",
          }}
        />
      </div>
      <Row>
        {carts.map((product) => (
          <div key={product._id} className="cart-item mb-3 p-3 border rounded">
            <div
              className="d-flex align-items-center"
              style={{ justifyContent: "space-between" }}
            >
              <Col md={4}>
                <div className="d-flex">
                  <div>
                    <img
                      src={
                        product?.bookId?.bookimage[0] || "/image/image 9.png"
                      }
                      alt={product.bookId.imageAltTag[0]}
                      style={{ width: "35px" }}
                      className="mr-3"
                    />
                  </div>
                  <div
                    className="flex-grow-1 my-auto   addd-cart-title"
                    style={{ textAlign: "center" }}
                  >
                    <h6>
                      {product.bookId.title.split(" ").slice(0, 2).join(" ") +
                        "..."}
                    </h6>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center">
                  <Button
                    icon="pi pi-minus"
                    style={{ color: "Red" }}
                    onClick={() => updateQuantity(product, -1)}
                    disabled={product.quantity <= 1 || loading}
                    className="p-button-rounded p-button-text p-button-danger"
                  />
                  <span className="mx-2">{product?.quantity}</span>
                  <Button
                    icon="pi pi-plus"
                    style={{ color: "Green", fontSize: "15px" }}
                    onClick={() => updateQuantity(product, 1)}
                    disabled={loading}
                    className="p-button-rounded p-button-text p-button-success"
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex me-auto">
                  <span className="my-auto">
                    {formatCurrency(product.bookId.price * product.quantity)}
                  </span>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-text p-button-danger"
                    onClick={() => removeFromCart(product)}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </Col>
            </div>
          </div>
        ))}
      </Row>
      <div className="text-end mt-3 mb-5">
        <h5 className="ms-auto">
          Estimate total: {formatCurrency(calculateTotal())}
        </h5>
        <div>
          <p>Taxes, Discounts and shipping calculated at checkout</p>
          <Button
            onClick={Checkoutnavigate}
            label="Proceed to Checkout"
            style={{ background: "#396664" }}
            className="rounded-2 m-2"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="container">
        {isMobileView ? (
          renderMobileView()
        ) : (
          <>
            <div
              onClick={() => router.back()}
              className="mt-3"
              style={{ cursor: "pointer" }}
            >
              <i className="pi pi-arrow-left"> Back</i>
            </div>

            <div className="d-flex justify-content-between align-items-center my-3">
              <h5>Your Cart</h5>
              <Button
                label="Continue Shopping"
                className="p-button-outlined"
                onClick={() => router.push("/")}
                style={{
                  borderRadius: "6px",
                  border: "1px solid rgb(255, 165, 57)",
                  color: "rgb(255, 165, 57)",
                }}
              />
            </div>

            {carts.length > 0 ? (
              <>
                <DataTable
                  value={carts}
                  tableStyle={{ minWidth: "60rem" }}
                  responsiveLayout="scroll"
                >
                  <Column
                    header="Product"
                    body={titleBodyTemplate}
                    style={{ width: "300px" }}
                  />
                  <Column
                    header="Status"
                    body={statusBodyTemplate}
                    style={{ width: "120px" }}
                  />
                  <Column
                    header="Quantity"
                    body={quantityBodyTemplate}
                    style={{ width: "150px" }}
                  />
                  <Column
                    header="Price"
                    body={priceBodyTemplate}
                    style={{ width: "100px" }}
                  />
                  <Column
                    header="Action"
                    body={actionBodyTemplate}
                    style={{ width: "80px" }}
                  />
                </DataTable>

                <div className="text-end mt-3 mb-5">
                  <h4 className="ms-auto">
                    Estimate total: {formatCurrency(calculateTotal())}
                  </h4>
                  <div>
                    <p>Taxes, Discounts and shipping calculated at checkout</p>
                    <Button
                      onClick={Checkoutnavigate}
                      label="Proceed to Checkout"
                      style={{ background: "#396664" }}
                      className="rounded-2 m-2"
                    />
                  </div>
                </div>
              </>
            ) : (
              renderEmptyCart()
            )}
          </>
        )}
      </div>
    </>
  );
}
