// import React, { useState } from 'react';
// import {
// 	Dialog,
// 	DialogActions,
// 	DialogContent,
// 	DialogTitle,
// 	FormControl,
// 	FormControlLabel,
// 	Radio,
// 	RadioGroup,
// 	Typography,
// 	Button,
// 	Box,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import { changeAddressStatus } from '../../../../api/UserAPI';
// import {
// 	AddressContainer,
// 	AddressDetails,
// 	StyledIconButtons,
// } from '../../../../components/component/ThemeComponent';

// interface ChangeAddressProps {
// 	open: boolean;
// 	handleClose: () => void;
// 	handleAddAddress: () => void; // Add new address function
// 	handleOpenForm: () => void;
// 	userData: {
// 		_id: string;
// 		active: boolean;
// 		fullName: string;
// 		address: string;
// 		city: string;
// 		state: string;
// 		zipCode: string;
// 		country: string;
// 	}[];
// }

// const ChangeAddress: React.FC<ChangeAddressProps> = ({
// 	open,
// 	handleClose,
// 	handleAddAddress,
// 	userData,
// 	handleOpenForm,
// }) => {
// 	const [selectedAddress, setSelectedAddress] = useState<string | null>(
// 		userData?.find((user) => user.active)?._id || null
// 	);

// 	const changeActiveAddress = async (addressId: string) => {
// 		try {
// 			const data = { addressId, active: true };
// 			const response = await changeAddressStatus(data);
// 			if (response.success) {
// 				setSelectedAddress(addressId);
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	// const handleOpenForm = () => {
// 	//         handleClose(); // Keep this if you want the dialog to close after selection
// 	// };
// 	return (
// 		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
// 			<DialogTitle>Change Address</DialogTitle>
// 			<DialogContent sx={{ paddingBottom: '0px' }}>
// 				<Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
// 					Select the address to change
// 				</Typography>
// 				<FormControl component="fieldset" fullWidth>
// 					<RadioGroup
// 						value={selectedAddress}
// 						onChange={(e) => {
// 							const newAddress = e.target.value;
// 							setSelectedAddress(newAddress);
// 							changeActiveAddress(newAddress);
// 						}}
// 					>
// 						{userData?.map((user) => (
// 							<AddressContainer key={user._id}>
// 								<FormControlLabel
// 									value={user._id}
// 									control={<Radio color="success" />}
// 									label={
// 										<AddressDetails>
// 											<b>{user.fullName}</b> <br />
// 											{user.address}, {user.city}, {user.state},{' '}
// 											{user.zipCode}
// 										</AddressDetails>
// 									}
// 								/>
// 								<StyledIconButtons onClick={handleOpenForm}>
// 									<EditIcon />
// 								</StyledIconButtons>
// 							</AddressContainer>
// 						))}
// 					</RadioGroup>
// 				</FormControl>
// 			</DialogContent>
// 			<DialogActions sx={{ justifyContent: 'center', padding: '10px' }}>
// 				<Box
// 					sx={{
// 						width: '100%',
// 						margin: '0px',
// 						display: { xs: 'flex', sm: 'flex', md: 'flex' },
// 						flexDirection: { xs: 'column', sm: 'row', md: 'row' },
// 						alignItems: { sm: 'center' },
// 						justifyContent: { sm: 'space-evenly' },
// 					}}
// 				>
// 					<Button
// 						onClick={handleAddAddress}
// 						startIcon={<AddIcon />}
// 						variant="contained"
// 						color="primary"
// 						sx={{ width: { xs: '100%', sm: '200px' }, marginBottom: { xs: '10px' } }}
// 					>
// 						Add New Address
// 					</Button>
// 					<Button
// 						onClick={handleClose}
// 						variant="contained"
// 						color="error"
// 						sx={{ width: { xs: '100%', sm: '200px' } }}
// 					>
// 						Close
// 					</Button>
// 				</Box>
// 			</DialogActions>
// 		</Dialog>
// 	);
// };

// export default ChangeAddress;
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { changeAddressStatus } from "../../../../api/UserAPI";
import {
  AddressContainer,
  AddressDetails,
  StyledIconButtons,
} from "../../../../components/component/ThemeComponent";

const ChangeAddress = ({
  open,
  handleClose,
  handleAddAddress,
  userData,
  handleOpenForm,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(
    userData?.find((user) => user.active)?._id || null
  );

  const changeActiveAddress = async (addressId) => {
    try {
      const data = { addressId, active: true };
      const response = await changeAddressStatus(data);
      if (response.success) {
        setSelectedAddress(addressId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      header="Change Address"
      visible={open}
      onHide={handleClose}
      style={{ width: "50vw" }}
    >
      <div className="p-dialog-content">
        <p className="p-dialog-subtitle">Select the address to change</p>
        <div className="p-field-radiobutton">
          {userData?.map((user) => (
            <div key={user._id} className="p-mb-2">
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
              <label htmlFor={user._id} className="p-radiobutton-label">
                <AddressDetails>
                  <b>{user.fullName}</b> <br />
                  {user.address}, {user.city}, {user.state}, {user.zipCode}
                </AddressDetails>
              </label>
              <StyledIconButtons onClick={handleOpenForm}>
                <i className="pi pi-pencil" />
              </StyledIconButtons>
            </div>
          ))}
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button
          label="Add New Address"
          icon="pi pi-plus"
          onClick={handleAddAddress}
          className="p-button-primary"
        />
        <Button
          label="Close"
          icon="pi pi-times"
          onClick={handleClose}
          className="p-button-secondary"
        />
      </div>
    </Dialog>
  );
};

export default ChangeAddress;
