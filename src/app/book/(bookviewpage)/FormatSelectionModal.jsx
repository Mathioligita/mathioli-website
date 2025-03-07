import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { InputSwitch } from "primereact/inputswitch";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Overlayaudio from "../audio-books/overlayaudio";

const FormatSelectionModal = ({
  show,
  handleClose,
  handleSelection,
  audioBookingdetails,
  book,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [showaudioBooking, setShowaudioBooking] = useState(false);

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleSubmit = () => {
    if (selectedFormat) {
      if (selectedFormat === "hardcopy") {
        handleSelection(selectedFormat);
      } else {
        setShowaudioBooking(true); // Show Overlayaudio for ebook and audiobook
      }
      handleClose();
    }
  };

  // Prepare details to be sent to Overlayaudio
  const updatedAudioBookingDetails = {
    ...audioBookingdetails,
    format:
      selectedFormat === "audioBook"
        ? "audioBook"
        : selectedFormat === "eBook"
        ? "eBook"
        : "eBook",
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Book Format</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
            <div className="format-toggle d-flex">
              <label className="toggle-label me-2">Hardcopy</label>
              <InputSwitch
                checked={selectedFormat === "hardcopy"}
                onChange={() => handleFormatChange("hardcopy")}
              />
            </div>
            {/* <div className="format-toggle d-flex">
              <label className="toggle-label me-2">E-Book</label>
              <InputSwitch
                checked={selectedFormat === "ebook"}
                onChange={() => handleFormatChange("ebook")}
              />
            </div> */}
            <div className="format-toggle d-flex">
              <label className="toggle-label me-2 ">Audiobook</label>
              <InputSwitch
                checked={selectedFormat === "audiobook"}
                onChange={() => handleFormatChange("audiobook")}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {showaudioBooking && selectedFormat !== "hardcopy" && (
        <Overlayaudio
          book={updatedAudioBookingDetails}
          audioBookingdetails={book} // Pass the updated details
          setShowaudioBooking={setShowaudioBooking}
        />
      )}
    </>
  );
};

export default FormatSelectionModal;
