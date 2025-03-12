"use client";
import userContext from "@/app/UseContext/UseContext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
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
    return value.toLocaleString("en-IN", {
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
    if (quantity > 10) return "success"; // High stock
    if (quantity > 0 && quantity <= 10) return "warning"; // Low stock
    return "danger"; // Out of stock
  };

  const Checkoutnavigate = () =>
    accessToken ? router.push("/book/checkout") : loginpoup();

  return (
    <>
      <Toast ref={toast} />
      <div className="container">
        <div onClick={() => window.history.back("/")} className="mt-3">
          <i className="pi pi-arrow-left" style={{ cursor: "pointer" }}>
            {" "}
            <span className="my-3" style={{ cursor: "pointer" }}>
              Back
            </span>
          </i>
        </div>

        <div
          className="d-flex m-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <h6 className="">Add to Cart</h6>
          </div>
          <div>
            <Button
              label="Continue to Shopping"
              severity="danger"
              outlined
              onClick={() => router.push("/")}
              style={{ borderRadius: "5px" }}
            />
          </div>
        </div>
        <DataTable value={carts} className="text-center">
          <Column
          
            header="Product"
            
            body={(product) => (
              <div className="d-flex align-items-center">
                 <img
        src={product.bookId.bookimage}
        alt="Product"
        style={{ width: "100px" }}
        className="m-3"
      />
                {/* <div className="ms-3  text-start">
                  {" "}
                  <h6>{product.bookId.title}</h6>
                  <span style={{ fontSize: "12px" }}>
                    {product?.bookId?.genre}
                    <br />
                    {product?.bookId?.language}
                    <br />
                    {product?.bookId?.author}
                  </span>
                </div> */}
                <div className="ms-1 text-start">
        <h6>{product.bookId.title}</h6>
        <span style={{ fontSize: "12px" }}>
          {product?.bookId?.genre}
          <br />
          {product?.bookId?.language}
          <br />
          {product?.bookId?.author}
        </span>
      </div>
              </div>
            )}
          />
          <Column
            header="Category"
            body={(product) => (
              <div className="d-flex align-items-center">
                <p className="ms-1"> {product.bookId.category}</p>
              </div>
            )}
          />
          <Column
            header="Quantity"
            body={(product) => (
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
            )}
          />
          <Column
            header="Price"
            body={(product) =>
              formatCurrency(product.bookId.price * product.quantity)
            }
          />
          <Column header="Status" body={statusBodyTemplate} />
          <Column
            header="Action"
            body={(product) => (
              <Button
                icon="pi pi-trash"
                className="p-button-text p-button-danger"
                onClick={() => removeFromCart(product)}
                style={{ fontSize: "20px" }}
              />
            )}
          />
        </DataTable>

        {carts?.length ? (
          <div className="container text-end mt-3 mb-5">
            <h4 className="ms-auto">
              Estimate total: {formatCurrency(calculateTotal())}
            </h4>
            <div>
              <div>
                <p>Taxes, Discounts and shipping calculated at checkout</p>
              </div>
              <Button
                onClick={Checkoutnavigate}
                label="Proceed to Checkout"
                style={{ background: "#396664" }}
                className="rounded-2 m-2"
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
