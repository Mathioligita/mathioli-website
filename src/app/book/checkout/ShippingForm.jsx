import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { useMediaQuery } from "react-responsive";

const ShippingForm = ({
  open,
  handleClose,
  formData,
  setFormData,
  errors,
  handleSubmit,
}) => {
  // const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  // {
    console.log(formData, "Formdata");
  // }
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
          <div className="p-field">
            <label htmlFor="firstName" className="p-d-block">
              First Name
            </label>
            <InputText
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter your first name"
              required
              className={errors.firstName ? "p-invalid" : ""}
            />
            {errors.firstName && (
              <small className="p-error">{errors.firstName}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="lastName" className="p-d-block">
              Last Name
            </label>
            <InputText
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Enter your last name"
              required
              className={errors.lastName ? "p-invalid" : ""}
            />
            {errors.lastName && (
              <small className="p-error">{errors.lastName}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="email" className="p-d-block">
              Email
            </label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              required
              className={errors.email ? "p-invalid" : ""}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="phone" className="p-d-block">
              Phone
            </label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              required
              className={errors.phone ? "p-invalid" : ""}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="street" className="p-d-block">
              Street
            </label>
            <InputText
              id="street"
              name="street"
              value={formData.shippingAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: {
                    ...formData.shippingAddress,
                    street: e.target.value,
                  },
                })
              }
              placeholder="Enter your street address"
              required
              className={errors.shippingAddress?.street ? "p-invalid" : ""}
            />
            {errors.shippingAddress?.street && (
              <small className="p-error">{errors.shippingAddress.street}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="city" className="p-d-block">
              City
            </label>
            <InputText
              id="city"
              name="city"
              value={formData.shippingAddress.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: {
                    ...formData.shippingAddress,
                    city: e.target.value,
                  },
                })
              }
              placeholder="Enter your city"
              required
              className={errors.shippingAddress?.city ? "p-invalid" : ""}
            />
            {errors.shippingAddress?.city && (
              <small className="p-error">{errors.shippingAddress.city}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="state" className="p-d-block">
              State
            </label>
            <InputText
              id="state"
              name="state"
              value={formData.shippingAddress.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: {
                    ...formData.shippingAddress,
                    state: e.target.value,
                  },
                })
              }
              placeholder="Enter your state"
              required
              className={errors.shippingAddress?.state ? "p-invalid" : ""}
            />
            {errors.shippingAddress?.state && (
              <small className="p-error">{errors.shippingAddress.state}</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="zipCode" className="p-d-block">
              Postal Code
            </label>
            <InputText
              id="zipCode"
              name="zipCode"
              value={formData.shippingAddress.zipCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: {
                    ...formData.shippingAddress,
                    zipCode: e.target.value,
                  },
                })
              }
              placeholder="Enter your postal code"
              required
              className={errors.shippingAddress?.zipCode ? "p-invalid" : ""}
            />
            {errors.shippingAddress?.zipCode && (
              <small className="p-error">
                {errors.shippingAddress.zipCode}
              </small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="country" className="p-d-block">
              Country
            </label>
            <InputText
              id="country"
              name="country"
              value={formData.shippingAddress.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shippingAddress: {
                    ...formData.shippingAddress,
                    country: e.target.value,
                  },
                })
              }
              placeholder="Enter your country"
              required
              className={errors.shippingAddress?.country ? "p-invalid" : ""}
            />
            {errors.shippingAddress?.country && (
              <small className="p-error">
                {errors.shippingAddress.country}
              </small>
            )}
          </div>

          <div className="p-dialog-footer mt-4">
            {/* <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleClose}
              className="p-button-text text-dark"
              outlined
            /> */}
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
