import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AddressCreate } from "../../../../api/page";

const NewAddressForm = ({
  open,
  handleClose,
  handleSubmitAddress,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 Live field validation
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "fullName":
        if (!value) message = "Full Name is required.";
        break;

      case "email":
        if (!value) message = "Email is required.";
        break;

      case "phone":
        if (!value) message = "Phone number is required.";
        else if (!/^\d{10}$/.test(value))
          message = "Phone must be 10 digits.";
        break;

      case "address":
        if (!value) message = "Address is required.";
        break;

      case "city":
        if (!value) message = "City is required.";
        break;

      case "state":
        if (!value) message = "State is required.";
        break;

      case "zipCode":
        if (!value) message = "Zip Code is required.";
        else if (!/^\d{6}$/.test(value))
          message = "Zip Code must be 6 digits.";
        break;

      case "country":
        if (!value) message = "Country is required.";
        break;

      default:
        break;
    }

    return message;
  };

  // 🔥 HANDLE CHANGE → with instant validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // validate the updated field only
    const errorMsg = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key]);
      if (msg) newErrors[key] = msg;
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      handleSubmitAddress(formData);

      const data = { shippingAddress: formData };
      const response = await AddressCreate(data);

      if (response) {
        handleClose();
        fetchData();
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Dialog
      header="Add New Address"
      visible={open}
      onHide={handleClose}
      style={{ width: "500px" }}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="p-fluid">

          {/* FULL NAME */}
          <div className="p-field">
            <label htmlFor="fullName">Full Name</label>
            <InputText
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? "p-invalid" : ""}
            />
            {errors.fullName && (
              <small className="p-error">{errors.fullName}</small>
            )}
          </div>

          {/* EMAIL */}
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className={errors.email ? "p-invalid" : ""}
            />
            {errors.email && (
              <small className="p-error">{errors.email}</small>
            )}
          </div>

          {/* PHONE */}
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className={errors.phone ? "p-invalid" : ""}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}
          </div>

          {/* ADDRESS */}
          <div className="p-field">
            <label htmlFor="address">Address</label>
            <InputText
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className={errors.address ? "p-invalid" : ""}
            />
            {errors.address && (
              <small className="p-error">{errors.address}</small>
            )}
          </div>

          {/* CITY */}
          <div className="p-field">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className={errors.city ? "p-invalid" : ""}
            />
            {errors.city && <small className="p-error">{errors.city}</small>}
          </div>

          {/* STATE */}
          <div className="p-field">
            <label htmlFor="state">State</label>
            <InputText
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              className={errors.state ? "p-invalid" : ""}
            />
            {errors.state && <small className="p-error">{errors.state}</small>}
          </div>

          {/* ZIP CODE */}
          <div className="p-field">
            <label htmlFor="zipCode">Zip Code</label>
            <InputText
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className={errors.zipCode ? "p-invalid" : ""}
            />
            {errors.zipCode && (
              <small className="p-error">{errors.zipCode}</small>
            )}
          </div>

          {/* COUNTRY */}
          <div className="p-field">
            <label htmlFor="country">Country</label>
            <InputText
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              className={errors.country ? "p-invalid" : ""}
            />
            {errors.country && (
              <small className="p-error">{errors.country}</small>
            )}
          </div>

          {/* FOOTER BUTTONS */}
          <div className="p-dialog-footer mt-3">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleClose}
              className="p-button-text"
            />
            <Button
              label="Add Address"
              icon="pi pi-check"
              type="submit"
              className="p-button-primary ms-2"
              style={{
                border: "1px solid #1D5755",
                background: "#1D5755",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default NewAddressForm;
