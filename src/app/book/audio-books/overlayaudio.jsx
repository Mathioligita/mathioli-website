// "use client";

// import React, { useContext, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { bookingAudioBooking } from "api/page";
// // import Swal from "sweetalert2";
// import Payment from "./razorpay/Payment";
// import Swal from "sweetalert2";
// import userContext from "../../UseContext/UseContext";
// import "./overlay.css";

// export default function Overlayaudio({
//   audioBookingdetails,
//   setShowaudioBooking,
//   book,
// }) {
//   console.log(audioBookingdetails, "audioBookingdetails");
//   if (!audioBookingdetails) return null;
//   const [razpay, setRazpay] = useState(null);
//   const { loginpoup } = useContext(userContext);

//   const handleSubmit = async () => {
//     const data = {
//       audioBookId: audioBookingdetails?.book?._id,
//       booktype: audioBookingdetails?.bookType,
//     };
//     console.log(data);
//     const response = await bookingAudioBooking(data);
//     console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//     sessionStorage.setItem("AudioPay", JSON.stringify(response.data));
//     if (response.success) {
//       console.log(response.message);

//       // Swal.fire("success", response.message)
//       // setShowaudioBooking(false)
//       setRazpay(response.data.razorpayOrder);
//     } else if (response.status === 401) {
//       setShowaudioBooking(false);
//       Swal.fire({
//         title: "Kindly log in to proceed with the payment.",
//         confirmButtonText: "OK",
//         confirmButtonColor: "rgb(57, 102, 100)", // This sets the button color to green
//       });

//       loginpoup();
//     }
//   };

//   return (
//     <div className="modal show  pop-bg d-block" tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//           {/* Modal Header */}
//           <div className="modal-header">
//             <h5 className="modal-title">
//               {audioBookingdetails?.book?.title || audioBookingdetails?.title}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={() => setShowaudioBooking(false)}
//             ></button>
//           </div>

//           {/* Modal Body */}
//           <div className="modal-body d-flex">
//             {/* Book Image */}
//             <img
//               src={
//                 audioBookingdetails?.book?.bookimage[0] ||
//                 audioBookingdetails?.bookimage[0]
//               }
//               alt={
//                 audioBookingdetails?.book?.title || audioBookingdetails?.title
//               }
//               className="img-thumbnail me-3"
//               style={{ width: "80px", height: "110px" }}
//             />

//             {/* Book Details */}
//             <div>
//               <h6 className="text-muted">
//                 {audioBookingdetails?.book?.author ||
//                   audioBookingdetails?.author}
//               </h6>
//               <p className="text-muted small">
//                 {audioBookingdetails?.book?.edition ||
//                   audioBookingdetails?.edition}
//               </p>

//               {/* Ratings */}
//               <div className="d-flex align-items-center mb-2">
//                 <span className="text-warning">
//                   &#9733;&#9733;&#9733;&#9733;&#9733;
//                 </span>
//                 <span className="ms-2 text-primary">500 Ratings</span>
//               </div>

//               {/* Price */}
//               <p className="fw-bold text-success">
//                 Rs.{" "}
//                 {audioBookingdetails?.book?.audiobookPrice ||
//                   audioBookingdetails.audiobookPrice}
//                 /-
//               </p>

             
//             </div>
//           </div>

         
//           <Payment handlePaymentplace={handleSubmit} />
         
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { bookingAudioBooking } from "api/page";
import Swal from "sweetalert2";
import Payment from "./razorpay/Payment";
import userContext from "../../UseContext/UseContext";
import "./overlay.css";

export default function Overlayaudio({
  audioBookingdetails,
  setShowaudioBooking,
  book,
}) {
  console.log(audioBookingdetails, "audioBookingdetails");
  if (!audioBookingdetails) return null;
  const [razpay, setRazpay] = useState(null);
  const { loginpoup } = useContext(userContext);

  const handleSubmit = async () => {
    const data = {
      audioBookId: audioBookingdetails?.book?._id,
      booktype: audioBookingdetails?.bookType,
    };
    console.log(data);
    const response = await bookingAudioBooking(data);
    console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    sessionStorage.setItem("AudioPay", JSON.stringify(response.data));
    if (response.success) {
      console.log(response.message);
      setRazpay(response.data.razorpayOrder);
    } else if (response.status === 401) {
      setShowaudioBooking(false);
      Swal.fire({
        title: "Kindly log in to proceed with the payment.",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(57, 102, 100)",
      });
      loginpoup();
    }
  };

  return (
    <div className="modal show pop-bg d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {audioBookingdetails?.book?.title || audioBookingdetails?.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowaudioBooking(false)}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body d-flex">
            {/* Book Image */}
            <img
              src={
                audioBookingdetails?.book?.bookimage[0] ||
                audioBookingdetails?.bookimage[0]
              }
              alt={
                audioBookingdetails?.book?.title || audioBookingdetails?.title
              }
              className="img-thumbnail me-3"
              style={{ width: "80px", height: "110px" }}
            />

            {/* Book Details */}
            <div>
              <h6 className="text-muted">
                {audioBookingdetails?.book?.author ||
                  audioBookingdetails?.author}
              </h6>
              <p className="text-muted small">
                {audioBookingdetails?.book?.edition ||
                  audioBookingdetails?.edition}
              </p>

              {/* Ratings */}
              <div className="d-flex align-items-center mb-2">
                <span className="text-warning">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </span>
                <span className="ms-2 text-primary">500 Ratings</span>
              </div>

              {/* Price */}
              <p className="fw-bold text-success">
                Rs.{" "}
                {audioBookingdetails?.book?.audiobookPrice ||
                  audioBookingdetails.audiobookPrice}
                /-
              </p>
            </div>
          </div>

          <Payment handlePaymentplace={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
