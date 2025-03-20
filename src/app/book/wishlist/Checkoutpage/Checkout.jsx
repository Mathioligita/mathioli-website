import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { UpdateUserAPI } from "../../../../api/Get";
import { SetPaymentAPI } from "../../../../api/order";
import Payment from "./razorpay/Payment";
import ChangeAddress from "./ChangeAddress";
import ShippingForm from "./ShippingForm ";
import { Checkout } from "../../../../../api/page";

const CheckoutPage = () => {
  const [checkout, setCheckout] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [changeAddressOpen, setChangeAddressOpen] = useState(false);
  const [shippingFormOpen, setShippingFormOpen] = useState(false);

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
      country: "india",
    },
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
  });

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.assign("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  const response = await Checkout();
        const response = await Checkout();
        if (!response?.isError) {
          setCheckout(response?.data?.Checkout);
          setUser(response?.data?.user);
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

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
    });
    if (user && user.shippingAddress && user.shippingAddress.length > 0) {
      const activeAddress =
        user.shippingAddress.find((addr) => addr.active) ||
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
          country: activeAddress?.country || "india",
        },
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
          country: "india",
        },
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
    // Implement the logic to add a new address
    console.log("Add new address");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      shippingAddress: {
        ...prevData.shippingAddress,
        [name]: value,
      },
    }));
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
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.shippingAddress.street.trim()) {
      newErrors.shippingAddress.street = "Street is required";
      valid = false;
    }
    if (!formData.shippingAddress.city.trim()) {
      newErrors.shippingAddress.city = "City is required";
      valid = false;
    }
    if (!formData.shippingAddress.state.trim()) {
      newErrors.shippingAddress.state = "State is required";
      valid = false;
    }
    if (!formData.shippingAddress.zipCode.trim()) {
      newErrors.shippingAddress.zipCode = "Zip code is required";
      valid = false;
    }
    if (!formData.shippingAddress.country.trim()) {
      newErrors.shippingAddress.country = "Country is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      const shippingAddress = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.shippingAddress.street,
        city: formData.shippingAddress.city,
        state: formData.shippingAddress.state,
        zipCode: formData.shippingAddress.zipCode,
        country: formData.shippingAddress.country,
      };

      formDataToSend.append("shippingAddress", JSON.stringify(shippingAddress));

      try {
        const response = await UpdateUserAPI(formDataToSend);
        if (response.success) {
          setUser(response?.data);
          handleClose();
        }
      } catch (error) {
        console.error("Failed to update user data:", error);
      }
    }
  };

  const handlePayment = async () => {
    try {
      const selectedItemIds = selectedItems.map((item) => item.productId._id);

      if (!user || !user.shippingAddress || user.shippingAddress.length === 0) {
        alert(
          "Shipping address is not defined. Please update your shipping information."
        );
        return {
          razorpayOrderId: "",
          orderTotalAmount: 0,
        };
      }

      const activeAddress =
        user.shippingAddress.find((addr) => addr.active) ||
        user.shippingAddress[0];

      const shippingAddress = {
        name: `${user.firstName} ${user.lastName}`,
        address: activeAddress.address,
        city: activeAddress.city,
        postalCode: activeAddress.zipCode,
        state: activeAddress.state,
        country: activeAddress.country,
        email: user.email,
        phone: user.mobile,
        _id: user._id,
      };

      const payload = {
        selectedItems: selectedItemIds,
        shippingAddress: shippingAddress,
      };

      const response = await SetPaymentAPI(payload);

      if (response?.success) {
        sessionStorage.setItem("razorpayOrder", JSON.stringify(response.data));
        setSelectedItems([]);
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
    user?.shippingAddress.find((addr) => addr.active) ||
    user?.shippingAddress[0];

  const handleOpenForm = () => {
    handleClickOpen();
    handleCloseChangeAddress();
  };

  return (
    <div
      style={{
        padding: "16px",
        maxWidth: "1200px",
        margin: "auto",
        marginTop: "5rem",
        fontFamily: "Poppins",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "20px",
          fontFamily: "Quicksand",
        }}
      >
        <div
          onClick={() => window.history.back()}
          style={{ cursor: "pointer" }}
        >
          <i className="pi pi-arrow-left" /> Checkout
        </div>
      </h2>
      <h3
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          fontFamily: "Montserrat",
        }}
      >
        Shipping Information
      </h3>
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid hsla(147, 83%, 27%, 1)",
          padding: "16px",
          borderRadius: "8px",
          fontFamily: "Montserrat",
          background: "hsla(147, 100%, 98%, 1)",
        }}
      >
        <div className="p-grid">
          <div className="p-col-12 p-md-10">
            <p>
              <span style={{ color: "#0C8040" }}>
                Delivery to {user?.firstName}
              </span>
              <br />
              <span style={{ color: "#0C8040", fontWeight: 600 }}>
                {activeAddress?.address},{activeAddress?.city},
                {activeAddress?.state},{activeAddress?.zipCode}
              </span>
            </p>
          </div>
          <div className="p-col-12 p-md-2">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Button
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={handleClickOpen}
                style={{ color: "#0C8040" }}
              />
              <Button
                label="Change Address"
                className="p-button-outlined"
                onClick={handleChangeAddress}
                style={{ color: "#0C8040", borderColor: "#0C8040" }}
              />
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md={8}>
          <div className="p-datatable-products">
            <DataTable value={checkout}>
              <Column
                selection={selectedItems}
                onSelectionChange={(e) => handleSelectItem(e.value)}
                header="Select"
                style={{ width: "50px" }}
              ></Column>
              <Column
                field="productId.name"
                header="Product"
                body={(rowData) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      image={rowData.productId.image[0]}
                      size="large"
                      shape="circle"
                      style={{ marginRight: "16px" }}
                    />
                    <div>
                      <p>{rowData.productId.name}</p>
                      <p>x{rowData.quantity}</p>
                    </div>
                  </div>
                )}
              ></Column>
              <Column
                field="subtotal"
                header="Subtotal"
                body={(rowData) => `$${rowData.subtotal.toFixed(2)}`}
              ></Column>
            </DataTable>
          </div>
        </Col>
        <Col className="ms-auto">
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
            <h4
              style={{
                fontWeight: "500",
                marginBottom: "10px",
                fontFamily: "Poppins",
              }}
            >
              Order Summary
            </h4>
            {selectedItems.map((item) => (
              <div
                key={item?.productId?._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    image={item?.productId?.image[0]}
                    size="large"
                    shape="circle"
                    style={{ marginRight: "16px" }}
                  />
                  <p style={{ fontFamily: "Poppins" }}>
                    {item?.productId?.name}
                  </p>
                </div>
                <p>${item?.subtotal.toFixed(2)}</p>
              </div>
            ))}
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontWeight: "bold" }}>Subtotal</p>
              <p style={{ fontWeight: "bold" }}>
                ₹
                {selectedItems
                  .reduce((acc, item) => acc + item.subtotal, 0)
                  .toFixed(2)}
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
                free
              </p>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontWeight: "bold" }}>Total</p>
              <p style={{ fontWeight: "bold" }}>
                ₹
                {selectedItems
                  .reduce((acc, item) => acc + item.subtotal, 0)
                  .toFixed(2)}
              </p>
            </div>
            <Payment
              handlePayment={handlePayment}
              selectedProduct={selectedItems}
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
        handleSubmit={handleSubmit}
      />

      <ChangeAddress
        open={changeAddressOpen}
        handleClose={handleCloseChangeAddress}
        handleOpenForm={handleOpenForm}
        handleAddAddress={handleAddAddress}
        userData={
          user?.shippingAddress?.map((address) => ({
            _id: address._id,
            active: address.active,
            fullName: `${user?.firstName} ${user?.lastName}`,
            address: address.address,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
          })) || []
        }
      />
    </div>
  );
};

export default CheckoutPage;
