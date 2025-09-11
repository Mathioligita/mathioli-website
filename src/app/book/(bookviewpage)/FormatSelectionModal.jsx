// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { InputSwitch } from "primereact/inputswitch";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// import Overlayaudio from "../audio-books/overlayaudio";

// const FormatSelectionModal = ({
//   show,
//   handleClose,
//   handleSelection,
//   audioBookingdetails,
//   book,
// }) => {
//   const [selectedFormat, setSelectedFormat] = useState(null);
//   const [showaudioBooking, setShowaudioBooking] = useState(false);

//   const handleFormatChange = (format) => {
//     setSelectedFormat(format);
//   };

//   const handleSubmit = () => {
//     if (selectedFormat) {
//       if (selectedFormat === "hardcopy") {
//         handleSelection(selectedFormat);
//       } else {
//         setShowaudioBooking(true); // Show Overlayaudio for ebook and audiobook
//       }
//       handleClose();
//     }
//   };

//   // Prepare details to be sent to Overlayaudio
//   const updatedAudioBookingDetails = {
//     ...audioBookingdetails,
//     format:
//       selectedFormat === "audiobook"
//         ? "audiobook"
//         : selectedFormat === "ebook"
//         ? "ebook"
//         : "ebook",
//   };

//   console.log(book, "books");
//   return (
//     <>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="fs-6 ms-3">Select Book Format</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="" style={{ justifyContent: "space-evenly" }}>
//             <div>
//               <div className="modal-body d-flex">
//                 {/* Book Image */}
//                 <img
//                   src={book?.bookimage[0] || book?.bookimage[0]}
//                   alt={book?.title || book?.title}
//                   className="img-thumbnail me-3"
//                   style={{ width: "80px", height: "110px" }}
//                 />

//                 {/* Book Details */}
//                 <div>
//                   <h6 className="text-muted">{book?.author || book?.author}</h6>
//                   <p className="text-muted small">
//                     {book?.edition || book?.edition}
//                   </p>

//                   {/* Ratings */}
//                   <div className="d-flex align-items-center ">
//                     <span className="mt-1" style={{ fontSize: "11px" }}>
//                       {Array.from({ length: 5 }, (_, index) => {
//                         const rating =
//                           book?.userReadingStatus?.length > 0
//                             ? book?.userReadingStatus[0]?.ratings
//                             : 0;
//                         return (
//                           <i
//                             key={index}
//                             className={`pi ${
//                               index < rating ? "pi-star-fill" : "pi-star"
//                             }`}
//                             style={{
//                               color: index < rating ? "#FFCB45" : "inherit",
//                               fontSize: "12px",
//                               margin: "2px",
//                             }}
//                           ></i>
//                         );
//                       })}
//                     </span>
//                     <span className="ms-2">
//                       {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
//                     </span>
//                   </div>

//                   {/* Price */}
//                   <p className="fw-bold text-success">
//                   ₹ {" "}
//                     {selectedFormat === "audiobook"
//                       ? book?.audiobookPrice
//                       : book?.price}
//                     /-
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex ms-3">
//               <div className="format-toggle d-flex">
//                 <label className="toggle-label me-2">Hardcopy</label>
//                 <InputSwitch
//                   checked={selectedFormat === "hardcopy"}
//                   onChange={() => handleFormatChange("hardcopy")}
//                 />
//               </div>
//               {book.isAudiobookAvailable && (
//                 <div className="format-toggle d-flex ms-4">
//                   <label className="toggle-label me-2">Audiobook</label>
//                   <InputSwitch
//                     checked={selectedFormat === "audiobook"}
//                     onChange={() => handleFormatChange("audiobook")}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="border-0">
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             style={{
//               background: "rgb(29, 87, 85)",
//               border: "1px solid rgb(29, 87, 85)",
//             }}
//             onClick={handleSubmit}
//           >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {showaudioBooking && selectedFormat !== "hardcopy" && (
//         <Overlayaudio
//           book={updatedAudioBookingDetails}
//           audioBookingdetails={book} // Pass the updated details
//           setShowaudioBooking={setShowaudioBooking}
//         />
//       )}
//     </>
//   );
// };

// export default FormatSelectionModal;
// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { InputSwitch } from "primereact/inputswitch";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// import Overlayaudio from "../audio-books/overlayaudio";

// const FormatSelectionModal = ({
//   show,
//   handleClose,
//   handleSelection,
//   audioBookingdetails,
//   book,
// }) => {
//   const [selectedFormats, setSelectedFormats] = useState({
//     hardcopy: false,
//     audiobook: false,
//     ebook: false,
//   });
//   const [showaudioBooking, setShowaudioBooking] = useState(false);

//   const handleFormatChange = (format) => {
//     setSelectedFormats((prevFormats) => ({
//       ...prevFormats,
//       [format]: !prevFormats[format],
//     }));
//   };

//   const handleSubmit = () => {
//     const selected = Object.keys(selectedFormats).filter(
//       (format) => selectedFormats[format]
//     );
//     if (selected.length > 0) {
//       if (selected.includes("hardcopy")) {
//         handleSelection(selected);
//       } else {
//         setShowaudioBooking(true); // Show Overlayaudio for ebook and audiobook
//       }
//       handleClose();
//     }
//   };

//   // Prepare details to be sent to Overlayaudio
//   const updatedAudioBookingDetails = {
//     ...audioBookingdetails,
//     format: Object.keys(selectedFormats).filter(
//       (format) => selectedFormats[format]
//     ),
//   };

//   console.log(book, "books");
//   return (
//     <>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="fs-6 ms-3">Select Book Format</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="" style={{ justifyContent: "space-evenly" }}>
//             <div>
//               <div className="modal-body d-flex">
//                 {/* Book Image */}
//                 <img
//                   src={book?.bookimage[0] || book?.bookimage[0]}
//                   alt={book?.title || book?.title}
//                   className="img-thumbnail me-3"
//                   style={{ width: "80px", height: "110px" }}
//                 />

//                 {/* Book Details */}
//                 <div className="my-auto">
//                   <h6 className="text-muted">{book?.author || book?.author}</h6>
//                   <p className="text-muted small">
//                     {book?.edition || book?.edition}
//                   </p>

//                   {/* Ratings */}
//                   <div className="d-flex align-items-center ">
//                     <span className="mt-1" style={{ fontSize: "11px" }}>
//                       {Array.from({ length: 5 }, (_, index) => {
//                         const rating =
//                           book?.userReadingStatus?.length > 0
//                             ? book?.userReadingStatus[0]?.ratings
//                             : 0;
//                         return (
//                           <i
//                             key={index}
//                             className={`pi ${
//                               index < rating ? "pi-star-fill" : "pi-star"
//                             }`}
//                             style={{
//                               color: index < rating ? "#FFCB45" : "inherit",
//                               fontSize: "12px",
//                               margin: "2px",
//                             }}
//                           ></i>
//                         );
//                       })}
//                     </span>
//                     <span className="ms-2">
//                       {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
//                     </span>
//                   </div>

//                   {/* Price */}
//                   {/* <p className="fw-bold text-success">
//                     ₹{" "}
//                     {selectedFormats.audiobook
//                       ? book?.audiobookPrice
//                       : book?.price}
//                     /-
//                   </p> */}
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex ms-3">
//               <div className="format-toggle d-flex">
//                 <label className="toggle-label me-2">Hardcopy</label>
//                 <InputSwitch
//                   checked={selectedFormats.hardcopy}
//                   onChange={() => handleFormatChange("hardcopy")}
//                 />
//               </div>
//               {book.isAudiobookAvailable && (
//                 <div className="format-toggle d-flex ms-4">
//                   <label className="toggle-label me-2">Audiobook</label>
//                   <InputSwitch
//                     checked={selectedFormats.audiobook}
//                     onChange={() => handleFormatChange("audiobook")}
//                   />
//                 </div>
//               )}
//               {/* Ebook Toggle */}
//               {/* <div className="format-toggle d-flex ms-4">
//                 <label className="toggle-label me-2">Ebook</label>
//                 <InputSwitch
//                   checked={selectedFormats.ebook}
//                   onChange={() => handleFormatChange("ebook")}
//                 />
//               </div> */}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="border-0">
//           {/* <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button> */}
//           <Button
//             style={{
//               background: "rgb(29, 87, 85)",
//               border: "1px solid rgb(29, 87, 85)",
//             }}
//             onClick={handleSubmit}
//           >
//             Proceed to Checkout
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {showaudioBooking && !selectedFormats.hardcopy && (
//         <Overlayaudio
//           book={updatedAudioBookingDetails}
//           audioBookingdetails={book} // Pass the updated details
//           setShowaudioBooking={setShowaudioBooking}
//         />
//       )}
//     </>
//   );
// };

// export default FormatSelectionModal;
// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { InputSwitch } from "primereact/inputswitch";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// import Overlayaudio from "../audio-books/overlayaudio";
// import Cookies from "js-cookie";

// const FormatSelectionModal = ({
//   show,
//   handleClose,
//   handleSelection,
//   audioBookingdetails,
//   book,
//   handleAddToCart,
// }) => {
//   const [selectedFormats, setSelectedFormats] = useState({
//     hardcopy: false,
//     audiobook: false,
//     // ebook: false,
//   });
//   const [showaudioBooking, setShowaudioBooking] = useState(false);

//   const handleFormatChange = (format) => {
//     setSelectedFormats((prevFormats) => ({
//       ...prevFormats,
//       [format]: !prevFormats[format],
//     }));
//   };

//   const handleSubmit = () => {
//     const selected = Object.keys(selectedFormats).filter(
//       (format) => selectedFormats[format]
//     );
//     sessionStorage.setItem("paymentPageCheckout", false);
//     if (selected.length > 0) {
//       if (selected.includes("hardcopy")) {
//         handleSelection(selected);
//         // handleAddToCart(book);
//       } else {
//         setShowaudioBooking(true); // Show Overlayaudio for ebook and audiobook
//       }
//       if (selectedFormats?.hardcopy && selectedFormats?.audiobook) {
//         const session = JSON.parse(sessionStorage.getItem("buysinglebook"));
//         if (session) {
//           sessionStorage.removeItem("buysinglebook");
//           sessionStorage.removeItem("singleBookBuying");
//           sessionStorage.setItem("selectedBook", JSON.stringify(book));
//           sessionStorage.setItem("selectedHardcopy", true);
//           sessionStorage.setItem("selectedaudiocopy", true);
//         }
//       }

//       // Store in local storage if both hardcopy and audiobook are selected

//       handleClose();
//     }
//   };

//   // Prepare details to be sent to Overlayaudio
//   const updatedAudioBookingDetails = {
//     ...audioBookingdetails,
//     format: Object.keys(selectedFormats).filter(
//       (format) => selectedFormats[format]
//     ),
//   };

//   console.log(book, "books");
//   return (
//     <>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="fs-6 ms-3">Select Book Format</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="" style={{ justifyContent: "space-evenly" }}>
//             <div>
//               <div className="modal-body d-flex">
//                 {/* Book Image */}
//                 <img
//                   src={book?.bookimage[0] || book?.bookimage[0]}
//                   alt={book?.title || book?.title}
//                   className="img-thumbnail me-3"
//                   style={{ width: "80px", height: "110px" }}
//                 />

//                 {/* Book Details */}
//                 <div className="my-auto">
//                   <h6 className="text-muted">{book?.author || book?.author}</h6>
//                   <p className="text-muted small">
//                     {book?.edition || book?.edition}
//                   </p>

//                   {/* Ratings */}
//                   <div className="d-flex align-items-center ">
//                     <span className="mt-1" style={{ fontSize: "11px" }}>
//                       {Array.from({ length: 5 }, (_, index) => {
//                         const rating =
//                           book?.userReadingStatus?.length > 0
//                             ? book?.userReadingStatus[0]?.ratings
//                             : 0;
//                         return (
//                           <i
//                             key={index}
//                             className={`pi ${
//                               index < rating ? "pi-star-fill" : "pi-star"
//                             }`}
//                             style={{
//                               color: index < rating ? "#FFCB45" : "inherit",
//                               fontSize: "12px",
//                               margin: "2px",
//                             }}
//                           ></i>
//                         );
//                       })}
//                     </span>
//                     <span className="ms-2">
//                       {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
//                     </span>
//                   </div>

//                   {/* Price */}
//                   {/* <p className="fw-bold text-success">
//                     ₹{" "}
//                     {selectedFormats.audiobook
//                       ? book?.audiobookPrice
//                       : book?.price}
//                     /-
//                   </p> */}
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex ms-3">
//               <div className="format-toggle d-flex">
//                 <label className="toggle-label me-2">Hardcopy</label>
//                 <InputSwitch
//                   checked={selectedFormats.hardcopy}
//                   onChange={() => handleFormatChange("hardcopy")}
//                 />
//               </div>
//               {book.isAudiobookAvailable && (
//                 <div className="format-toggle d-flex ms-4">
//                   <label className="toggle-label me-2">Audiobook</label>
//                   <InputSwitch
//                     checked={selectedFormats.audiobook}
//                     onChange={() => handleFormatChange("audiobook")}
//                   />
//                 </div>
//               )}
//               {/* Ebook Toggle */}
//               {/* <div className="format-toggle d-flex ms-4">
//                 <label className="toggle-label me-2">Ebook</label>
//                 <InputSwitch
//                   checked={selectedFormats.ebook}
//                   onChange={() => handleFormatChange("ebook")}
//                 />
//               </div> */}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="border-0">
//           {/* <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button> */}
//           <Button
//             style={{
//               background: "rgb(29, 87, 85)",
//               border: "1px solid rgb(29, 87, 85)",
//             }}
//             onClick={handleSubmit}
//             disabled={
//               selectedFormats.audiobook || selectedFormats.hardcopy
//                 ? false
//                 : true
//             }
//           >
//             Proceed to Checkout
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {showaudioBooking && !selectedFormats.hardcopy && (
//         <Overlayaudio
//           book={updatedAudioBookingDetails}
//           audioBookingdetails={book} // Pass the updated details
//           setShowaudioBooking={setShowaudioBooking}
//         />
//       )}
//     </>
//   );
// };

// export default FormatSelectionModal;
"use client";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { InputSwitch } from "primereact/inputswitch";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Overlayaudio from "../audio-books/overlayaudio";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const FormatSelectionModal = ({
  show,
  handleClose,
  handleSelection,
  audioBookingdetails,
  book,
  handleAddToCart,
}) => {
  const [selectedFormats, setSelectedFormats] = useState({
    hardcopy: false,
    audiobook: false,
    // ebook: false,
  });
  const router = useRouter();
  const [showaudioBooking, setShowaudioBooking] = useState(false);

  const handleFormatChange = (format) => {
    setSelectedFormats((prevFormats) => ({
      ...prevFormats,
      [format]: !prevFormats[format],
    }));
  };

  const handleSubmit = () => {
    const selected = Object.keys(selectedFormats).filter(
      (format) => selectedFormats[format]
    );
    if (selected.length > 0) {
      if (selectedFormats.hardcopy && !selectedFormats.audiobook) {
        handleSelection(selected);
      } else if (selectedFormats?.hardcopy && selectedFormats?.audiobook) {
        const session = JSON.parse(sessionStorage.getItem("buysinglebook"));
        sessionStorage.setItem("paymentPageCheckout", false);
        sessionStorage.setItem("selectedBook", JSON.stringify(book));
        router.push("/book/checkout");
        sessionStorage.setItem("selectedHardcopy", true);
        sessionStorage.setItem("selectedaudiocopy", true);
        if (session) {
          sessionStorage.removeItem("buysinglebook");
          sessionStorage.removeItem("singleBookBuying");
          sessionStorage.setItem("selectedBook", JSON.stringify(book));
          sessionStorage.setItem("selectedHardcopy", true);
          sessionStorage.setItem("selectedaudiocopy", true);
          router.push("/book/checkout");
        }
      } else if (selectedFormats.audiobook) {
        setShowaudioBooking(true); // Show Overlayaudio for audiobook
      }

      handleClose();
    }
  };

  // Prepare details to be sent to Overlayaudio
  const updatedAudioBookingDetails = {
    ...audioBookingdetails,
    format: Object.keys(selectedFormats).filter(
      (format) => selectedFormats[format]
    ),
  };

  const books = {
    book: book,
    booktype: "audioBook",
  };

  // console.log(book, "books");
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fs-6 ms-3">Select Book Format</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" style={{ justifyContent: "space-evenly" }}>
            <div>
              <div className="modal-body d-flex">
                {/* Book Image */}
                <img
                  src={book?.bookimage[0] || book?.bookimage[0]}
                  alt={book?.imageAltTag[0] || book?.title}
                  className="img-thumbnail me-3"
                  style={{ width: "80px", height: "110px" }}
                />

                {/* Book Details */}
                <div className="my-auto">
                  <h6 className="text-muted">{book?.author || book?.author}</h6>
                  <p className="text-muted small">
                    {book?.edition || book?.edition}
                  </p>

                  {/* Ratings */}
                  <div className="d-flex align-items-center ">
                    <span className="mt-1" style={{ fontSize: "11px" }}>
                      {Array.from({ length: 5 }, (_, index) => {
                        const rating =
                          book?.userReadingStatus?.length > 0
                            ? book?.userReadingStatus[0]?.ratings
                            : 0;
                        return (
                          <i
                            key={index}
                            className={`pi ${
                              index < rating ? "pi-star-fill" : "pi-star"
                            }`}
                            style={{
                              color: index < rating ? "#FFCB45" : "inherit",
                              fontSize: "12px",
                              margin: "2px",
                            }}
                          ></i>
                        );
                      })}
                    </span>
                    <span className="ms-2">
                      {book?.userReadingStatus[0]?.ratings || 0}.0 Ratings
                    </span>
                  </div>

                  {/* Price */}
                  {/* <p className="fw-bold text-success">
                    ₹{" "}
                    {selectedFormats.audiobook
                      ? book?.audiobookPrice
                      : book?.price}
                    /-
                  </p> */}
                </div>
              </div>
            </div>
            <div className="d-flex ms-3">
              <div className="format-toggle d-flex">
                <label className="toggle-label me-2">Hardcopy</label>
                <InputSwitch
                  checked={selectedFormats.hardcopy}
                  onChange={() => handleFormatChange("hardcopy")}
                />
              </div>
              {book.isAudiobookAvailable && (
                <div className="format-toggle d-flex ms-4">
                  <label className="toggle-label me-2">Audiobook</label>
                  <InputSwitch
                    checked={selectedFormats.audiobook}
                    onChange={() => handleFormatChange("audiobook")}
                  />
                </div>
              )}
              {/* Ebook Toggle */}
              {/* <div className="format-toggle d-flex ms-4">
                <label className="toggle-label me-2">Ebook</label>
                <InputSwitch
                  checked={selectedFormats.ebook}
                  onChange={() => handleFormatChange("ebook")}
                />
              </div> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          {/* <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button
            style={{
              background: "rgb(29, 87, 85)",
              border: "1px solid rgb(29, 87, 85)",
            }}
            onClick={handleSubmit}
            disabled={
              selectedFormats.audiobook || selectedFormats.hardcopy
                ? false
                : true
            }
          >
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      {showaudioBooking && !selectedFormats.hardcopy && (
        <Overlayaudio
          book={updatedAudioBookingDetails}
          audioBookingdetails={books} // Pass the updated details
          setShowaudioBooking={setShowaudioBooking}
        />
      )}
    </>
  );
};

export default FormatSelectionModal;
