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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required.";
    if (!formData.country) newErrors.country = "Country is required.";
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
          <div className="p-field">
            <label htmlFor="fullName" className="p-d-block">
              Full Name
            </label>
            <InputText
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={errors.fullName ? "p-invalid" : ""}
            />
            {errors.fullName && (
              <small className="p-error">{errors.fullName}</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="email" className="p-d-block">
              Email
            </label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              required
              className={errors.email ? "p-invalid" : ""}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>
          <div className="p-field">
            <label htmlFor="phone" className="p-d-block">
              phone
            </label>
            <InputText
              id="phone"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              required
              className={errors.phone ? "p-invalid" : ""}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="address" className="p-d-block">
              Address
            </label>
            <InputText
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className={errors.address ? "p-invalid" : ""}
            />
            {errors.address && (
              <small className="p-error">{errors.address}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="city" className="p-d-block">
              City
            </label>
            <InputText
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              className={errors.city ? "p-invalid" : ""}
            />
            {errors.city && <small className="p-error">{errors.city}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="state" className="p-d-block">
              State
            </label>
            <InputText
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
              className={errors.state ? "p-invalid" : ""}
            />
            {errors.state && <small className="p-error">{errors.state}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="zipCode" className="p-d-block">
              Zip Code
            </label>
            <InputText
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              required
              className={errors.zipCode ? "p-invalid" : ""}
            />
            {errors.zipCode && (
              <small className="p-error">{errors.zipCode}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="country" className="p-d-block">
              Country
            </label>
            <InputText
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              required
              className={errors.country ? "p-invalid" : ""}
            />
            {errors.country && (
              <small className="p-error">{errors.country}</small>
            )}
          </div>

          <div className="p-dialog-footer mt-3">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleClose}
              style={{
                border: "1px solid gray",
                color: "gray",
                borderRadius: "6px",
              }}
              className="p-button-text"
            // outlined
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
