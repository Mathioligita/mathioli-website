import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import NewAddressForm from "./NewAddressForm";
import { AddressStatusUpdate } from "../../../../api/page";
import "./Checkout.css";

const ChangeAddress = ({
  open,
  handleClose,
  activeAddress,
  userData,
  setEditshippingfromdata,
  fetchData,
  handleOpenForm,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    if (open && activeAddress?._id) {
      setSelectedAddress(activeAddress._id);
    }
  }, [open, activeAddress]);

  const handleAddressChange = async (newId) => {
    if (newId === selectedAddress) return;

    setSelectedAddress(newId);
    try {
      const res = await AddressStatusUpdate({
        addressId: newId,
        active: true,
      });
      if (res.success) {
        await fetchData();
        handleClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startEdit = (id) => {
    setEditshippingfromdata(id);
    handleOpenForm();
  };

  const openNewForm = () => setShowNewAddressForm(true);
  const closeNewForm = () => setShowNewAddressForm(false);

  return (
    <>
      <Dialog
        header="Change Address"
        visible={open}
        onHide={handleClose}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="p-dialog-content">
          <p className="p-dialog-subtitle">Select the address to change</p>

          {userData.map((item) => (
            <div
              key={item._id}
              className="p-mb-2 d-flex align-items-start"
            >
              <div className="my-auto">
                <RadioButton
                  inputId={item._id}
                  name="address"
                  value={item._id}
                  onChange={(e) => handleAddressChange(e.value)}
                  checked={selectedAddress === item._id}
                />
              </div>

              <div className="ms-2 mt-1 mt-md-0 flex-grow-1">
                <label htmlFor={item._id} className="p-radiobutton-label">
                  <b>{item.fullName}</b> <br />
                  {item.address}, {item.city}, {item.state}, {item.zipCode}
                </label>
              </div>
              <div
                onClick={() => startEdit(item._id)}
                className="mt-2 mt-md-0 ms-auto"
                style={{ cursor: "pointer" }}
              >
                <i className="pi pi-pencil" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-dialog-footer text-end">
          <Button
            icon="pi pi-plus"
            onClick={openNewForm}
            className="p-button-primary"
            style={{
              border: "1px solid #1d5755",
              borderRadius: "6px",
              background: "#1d5755",
            }}
          >
            <span className="ms-2">Add New Address</span>
          </Button>
        </div>
      </Dialog>

      {showNewAddressForm && (
        <NewAddressForm
          fetchData={fetchData}
          open={showNewAddressForm}
          handleClose={closeNewForm}
          handleSubmitAddress={() => {
            closeNewForm();
            fetchData();
          }}
        />
      )}
    </>
  );
};

export default ChangeAddress;