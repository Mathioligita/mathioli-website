import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ShippingForm = ({
  open,
  handleClose,
  formData,
  setFormData,
  errors,
  handleSubmit,
}) => {
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [field]: value,
      },
    });
  };

  return (
    <Dialog
      header="Update Shipping Information"
      visible={open}
      onHide={handleClose}
      style={{ width: "500px" }}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="p-fluid">
          {/* Full Name */}
          <div className="p-field">
            <label htmlFor="fullName" className="p-d-block">
              Full Name
            </label>
            <InputText
              id="fullName"
              name="fullName"
              value={formData.shippingAddress.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
              className={errors.fullName ? "p-invalid" : ""}
            />
            {errors.fullName && (
              <small className="p-error">{errors.fullName}</small>
            )}
          </div>

          {/* Email */}
          <div className="p-field">
            <label htmlFor="email" className="p-d-block">
              Email
            </label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.shippingAddress.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              required
              className={errors.email ? "p-invalid" : ""}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          {/* Phone */}
          <div className="p-field">
            <label htmlFor="phone" className="p-d-block">
              Phone
            </label>
            <InputText
              id="phone"
              name="phone"
              value={formData.shippingAddress.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              required
              className={errors.phone ? "p-invalid" : ""}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}
          </div>

          {/* Address */}
          <div className="p-field">
            <label htmlFor="address" className="p-d-block">
              Address
            </label>
            <InputText
              id="address"
              name="address"
              value={formData.shippingAddress.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your full address"
              required
            />
          </div>

          {/* City */}
          <div className="p-field">
            <label htmlFor="city" className="p-d-block">
              City
            </label>
            <InputText
              id="city"
              name="city"
              value={formData.shippingAddress.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>

          {/* State */}
          <div className="p-field">
            <label htmlFor="state" className="p-d-block">
              State
            </label>
            <InputText
              id="state"
              name="state"
              value={formData.shippingAddress.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Enter your state"
              required
            />
          </div>

          {/* Postal Code */}
          <div className="p-field">
            <label htmlFor="zipCode" className="p-d-block">
              Postal Code
            </label>
            <InputText
              id="zipCode"
              name="zipCode"
              value={formData.shippingAddress.zipCode || ""}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              placeholder="Enter your postal code"
              required
            />
          </div>

          {/* Country */}
          <div className="p-field">
            <label htmlFor="country" className="p-d-block">
              Country
            </label>
            <InputText
              id="country"
              name="country"
              value={formData.shippingAddress.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Enter your country"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="p-dialog-footer mt-4">
            <Button
              label="Update"
              icon="pi pi-check"
              type="submit"
              className="p-button-primary"
              style={{
                borderRadius: "6px",
                background: "rgb(29, 87, 85)",
                border: "1px solid rgb(29, 87, 85)",
              }}
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ShippingForm;
