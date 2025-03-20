
// import { Dialog } from "primereact/dialog";

// import { Button } from "primereact/button";
// import NewAddressForm from "./NewAddressForm"; // Adjust the import path as necessary
// import { useEffect, useState } from "react";
// import { AddressStatusUpdate } from "../../../../api/page";
// import { RadioButton } from "primereact/radiobutton";
// import "./Checkout.css";

// const ChangeAddress = ({
//   open,
//   setEditshippingfromdata,
//   handleClose,
//   activeAddress,
//   userData,
//   handleOpenForm,
//   handlesubmit,
//   fetchData,
//   usersdata,
// }) => {
//   {
//     // console.log(activeAddress, "activeAddress");
//   }
//   const [selectedAddress, setSelectedAddress] = useState(
//     activeAddress?._id || userData?.find((user) => user.active)?._id
//   );
//   // console.log(selectedAddress, "selectedAddressselectedAddressselectedAddress");
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const usersdatavalue = usersdata?.shippingAddress;
//   useEffect(() => {
//     setSelectedAddress(activeAddress?._id);
//   }, [activeAddress]);
//   const changeActiveAddress = async (addressId) => {
//     try {
//       const data = { addressId, active: true };
//       const response = await AddressStatusUpdate(data);
//       // console.log(response, "rsposne:::::::::");
//       if (response.success) {
//         setSelectedAddress(addressId);
//         fetchData();
//         handleClose();
//         // handlesubmit();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddAddress = () => {
//     setShowNewAddressForm(true);
//   };

//   const handleCloseNewAddressForm = () => {
//     setShowNewAddressForm(false);
//   };

//   const handleSubmitAddress = (newAddress) => {
//     // Handle the submission of the new address
//     // console.log("New Address Submitted:", newAddress);
//     // Add logic to save the new address, e.g., API call
//     setShowNewAddressForm(false);
//   };
//   console.log(usersdata, "usersdatausersdatausersdatausersdata");
//   return (
//     <>
//       <Dialog
//         header="Change Address"
//         visible={open}
//         onHide={handleClose}
//         // style={{ width: "5" }}
//       >
//         <div className="p-dialog-content">
//           <p className="p-dialog-subtitle">Select the address to change</p>
//           <div className="p-field-radiobutton">
//             {!usersdata?.shippingAddress
//               ? userData.map((user) => (
//                   <div
//                     key={user._id}
//                     className="p-mb-2 d-flex "
//                     style={{ justifyContent: "space-evenly" }}
//                   >
//                     <div className="my-auto">
//                       <RadioButton
//                         // type="radio"
//                         inputId={user._id}
//                         name="address"
//                         value={user._id}
//                         onChange={(e) => {
//                           const newAddress = e.value;
//                           setSelectedAddress(newAddress);
//                           changeActiveAddress(newAddress);
//                         }}
//                         checked={selectedAddress === user._id}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor={user._id} className="p-radiobutton-label">
//                         {/* <AddressDetails> */}
//                         <b>{user.fullName}</b> <br />
//                         {user.address}, {user.city}, {user.state},{" "}
//                         {user.zipCode}
//                         {/* </AddressDetails> */}
//                       </label>
//                     </div>

//                     <div
//                       onClick={() => {
//                         handleOpenForm(true), setEditshippingfromdata(user._id);
//                       }}
//                       className="my-auto"
//                     >
//                       <i className="pi pi-pencil" />
//                     </div>
//                   </div>
//                 ))
//               : usersdata?.shippingAddress?.map((item) => (
//                   <div
//                     key={item._id}
//                     className="p-mb-2 d-flex  "
//                     style={{ justifyContent: "space-evenly" }}
//                   >
//                     <div className="my-auto shippingaddress-item">
//                       <RadioButton
//                         // type="radio"
//                         inputId={item._id}
//                         name="address"
                        
//                         value={item._id}
//                         onChange={(e) => {
//                           const newAddress = e.value;
//                           setSelectedAddress(newAddress);
//                           changeActiveAddress(newAddress);
//                         }}
//                         checked={selectedAddress === item._id}
//                       />
//                     </div>
//                     <div className="ms-2">
//                       <label htmlFor={item._id} className="p-radiobutton-label">
//                         {/* <AddressDetails> */}
//                         <b>{item.fullName}</b> <br />
//                         {item.address}, {item.city}, {item.state},{" "}
//                         {item.zipCode}
//                         {/* </AddressDetails> */}
//                       </label>
//                     </div>

//                     <div
//                       onClick={() => {
//                         handleOpenForm(true), setEditshippingfromdata(item._id);
//                       }}
//                       className=" m-3"
//                     >
//                       <i className="pi pi-pencil" />
//                     </div>
//                   </div>
//                 ))}
//           </div>
//         </div>
//         <div className="p-dialog-footer text-end">
//           {/* <Button
//             label="Close"
//             icon="pi pi-times"
//             onClick={handleClose}
//             className="p-button-secondary"
//             style={{ borderRadius: "6px" }}
//           /> */}
//           <Button
//             icon="pi pi-plus"
//             onClick={handleAddAddress}
//             className="p-button-primary"
//             style={{
//               border: "1px solid #1d5755",
//               borderRadius: "6px",

//               background: "#1d5755",
//             }}
//           >
//             <span className="ms-2">Add New Address
//               </span>
//           </Button>
//         </div>
//       </Dialog>

//       {showNewAddressForm && (
//         <NewAddressForm
//           open={showNewAddressForm}
//           handleClose={handleCloseNewAddressForm}
//           handleSubmitAddress={handleSubmitAddress}
//         />
//       )}
//     </>
//   );
// };

// export default ChangeAddress;
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import NewAddressForm from "./NewAddressForm";
import { useEffect, useState } from "react";
import { AddressStatusUpdate } from "../../../../api/page";
import { RadioButton } from "primereact/radiobutton";
import "./Checkout.css";

const ChangeAddress = ({
  open,
  setEditshippingfromdata,
  handleClose,
  activeAddress,
  userData,
  handleOpenForm,
  handlesubmit,
  fetchData,
  usersdata,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(
    activeAddress?._id || userData?.find((user) => user.active)?._id
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const usersdatavalue = usersdata?.shippingAddress;

  useEffect(() => {
    setSelectedAddress(activeAddress?._id);
  }, [activeAddress]);

  const changeActiveAddress = async (addressId) => {
    try {
      const data = { addressId, active: true };
      const response = await AddressStatusUpdate(data);
      if (response.success) {
        setSelectedAddress(addressId);
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAddress = () => {
    setShowNewAddressForm(true);
  };

  const handleCloseNewAddressForm = () => {
    setShowNewAddressForm(false);
  };

  const handleSubmitAddress = (newAddress) => {
    setShowNewAddressForm(false);
  };

  return (
    <>
      <Dialog
        header="Change Address"
        visible={open}
        onHide={handleClose}
        style={{ width: '100%', maxWidth: '500px' }} // Adjust width for mobile
      >
        <div className="p-dialog-content">
          <p className="p-dialog-subtitle">Select the address to change</p>
          <div className="p-field-radiobutton">
            {!usersdata?.shippingAddress
              ? userData.map((user) => (
                  <div
                    key={user._id}
                    className="p-mb-2 d-flex flex-column align-items-start" // Stack items vertically on mobile
                  >
                    <div className="my-auto">
                      <RadioButton
                        inputId={user._id}
                        name="address"
                        value={user._id}
                        onChange={(e) => {
                          const newAddress = e.value;
                          setSelectedAddress(newAddress);
                          changeActiveAddress(newAddress);
                        }}
                        checked={selectedAddress === user._id}
                      />
                    </div>
                    <div>
                      <label htmlFor={user._id} className="p-radiobutton-label">
                        <b>{user.fullName}</b> <br />
                        {user.address}, {user.city}, {user.state}, {user.zipCode}
                      </label>
                    </div>
                    <div
                      onClick={() => {
                        handleOpenForm(true);
                        setEditshippingfromdata(user._id);
                      }}
                      className="my-auto"
                    >
                      <i className="pi pi-pencil" />
                    </div>
                  </div>
                ))
              : usersdata?.shippingAddress?.map((item) => (
                  <div
                    key={item._id}
                    className="p-mb-2 d-flex flex-row align-items-start" // Stack items vertically on mobile
                  >
                    <div className="my-auto shippingaddress-item">
                      <RadioButton
                        inputId={item._id}
                        name="address"
                        value={item._id}
                        onChange={(e) => {
                          const newAddress = e.value;
                          setSelectedAddress(newAddress);
                          changeActiveAddress(newAddress);
                        }}
                        checked={selectedAddress === item._id}
                      />
                    </div>
                    <div className="ms-2">
                      <label htmlFor={item._id} className="p-radiobutton-label">
                        <b>{item.fullName}</b> <br />
                        {item.address}, {item.city}, {item.state}, {item.zipCode}
                      </label>
                    </div>
                    <div
                      onClick={() => {
                        handleOpenForm(true);
                        setEditshippingfromdata(item._id);
                      }}
                      className="m-3"
                    >
                      <i className="pi pi-pencil" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="p-dialog-footer text-end">
          <Button
            icon="pi pi-plus"
            onClick={handleAddAddress}
            className="p-button-primary"
            style={{
              border: "1px solid #1d5755",
              borderRadius: "6px",
              background: "#1d5755",
              // width: '100%' // Full width button for mobile
            }}
          >
            <span className="ms-2">Add New Address</span>
          </Button>
        </div>
      </Dialog>

      {showNewAddressForm && (
        <NewAddressForm
          open={showNewAddressForm}
          handleClose={handleCloseNewAddressForm}
          handleSubmitAddress={handleSubmitAddress}
        />
      )}
    </>
  );
};

export default ChangeAddress;
