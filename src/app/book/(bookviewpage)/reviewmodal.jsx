// import React, { useState } from "react";

// import { REviewBook } from "api/page";

// export default function ReviewModal({ slug, closeModal }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async () => {
//     if (!rating || !comment) {
//       setErrorMessage("Please provide both a rating and a comment.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {

//         const data = {
//           rating,
//           comment,
//         }
//         const response = await REviewBook(slug,data)

//       if(response.success){

//         closeModal(); }
//     } catch (error) {
//       setErrorMessage("Something went wrong. Please try again.");
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="review-modal-overlay">
//       <div className="review-modal">
//         <h2>Write a Review</h2>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <div className="form-group">
//           <label>Rating:</label>
//           <select
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             className="rating-select"
//           >
//             <option value="0">Select Rating</option>
//             <option value="1">1 - Poor</option>
//             <option value="2">2 - Fair</option>
//             <option value="3">3 - Good</option>
//             <option value="4">4 - Very Good</option>
//             <option value="5">5 - Excellent</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Comment:</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write your review here..."
//             className="comment-textarea"
//           />
//         </div>

//         <div className="form-actions">
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="submit-btn"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Review"}
//           </button>
//           <button
//             onClick={closeModal}
//             className="cancel-btn"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// ======================================================================================
// ======================================================================================
// ======================================================================================
// ======================================================================================
// import React, { useState, useRef } from "react";
// import { Rating } from 'primereact/rating';
// import { Toast } from 'primereact/toast';
// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import { REviewBook } from "api/page";
// import { Button } from "react-bootstrap";

// export default function ReviewModal({ slug, closeModal }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const toast = useRef(null);

//   const handleSubmit = async () => {
//     if (!rating || !comment) {
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please provide both a rating and a comment.', life: 3000 });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const data = {
//         rating,
//         comment,
//       };
//       const response = await REviewBook(slug, data);

//       // if (response.newReview) {
//         toast.current.show({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
//         closeModal();
//       // }
//     } catch (error) {
//       console.error(error);
//       toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="review-modal-overlay">
//       <div className="review-modal">
//         <h2>Write a Review</h2>

//         <div className="form-group">
//           <label>Rating:</label>
//           <Rating
//             value={rating}
//             onChange={(e) => setRating(e.value)}
//             cancel={false}
//           />

//         </div>

//         <div className="form-group">
//           <label>Comment:</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write your review here..."
//             className="comment-textarea"
//           />
//         </div>

//         <div className="form-actions">
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="submit-btn"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Review"}
//           </Button>
//           <button
//             onClick={closeModal}
//             className="cancel-btn"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//       <Toast ref={toast} />
//     </div>
//   );
// }

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================

import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { REviewBook } from "../../../../api/page";
import { Button } from "react-bootstrap";
import "./audio.css";

export default function ReviewModal({
  slug,
  closeModal,
  reviewdata,
  setReviewdata,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please provide both a rating and a comment.",
        life: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        rating,
        comment,
      };
      const response = await REviewBook(slug, data);

      // console.log(response.data, "response");
      if (response.data) {
        setReviewdata(true);
      }
      // if (response.newReview) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.message,
        life: 3000,
      });
      closeModal();
      // }
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>Write a Review</h2>

        <div className="form-group">
          <label className="text-start">Rating:</label>
          <div className="rating">
            <input
              value="5"
              name="rating"
              id="star5"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star5"></label>
            <input
              value="4"
              name="rating"
              id="star4"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star4"></label>
            <input
              value="3"
              name="rating"
              id="star3"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star3"></label>
            <input
              value="2"
              name="rating"
              id="star2"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star2"></label>
            <input
              value="1"
              name="rating"
              id="star1"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star1"></label>
          </div>
        </div>

        <div className="form-group">
          <label className="text-start">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="comment-textarea"
          />
        </div>

        <div className="form-actions">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="submit-btn"
            style={{ background: "rgb(29, 87, 85)" }}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
          <button onClick={closeModal} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}
