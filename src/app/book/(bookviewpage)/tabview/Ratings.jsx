import { Rating } from "primereact/rating";
import React from "react";
import "./Ratings.css";

export default function Ratings({ books }) {
  // const [value, setValue] = useState(null); // To track the rating value

  const reviews = books?.book?.userReadingStatus;

  return (
    <div className="ratings-container">
      <h5 className="ratings-title">Book Ratings</h5>

      {reviews.length > 0 ? (
        reviews.map((review, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <div className="d-flex ">
                {/* {console.log(review.userId.profileImage, "review")} */}
                <img
                  src={review?.userId?.profileImage || "/image/Ellipse 10.png"}
                  alt="userprofile"
                  width={"30px"}
                  height={"30px"}
                  style={{ borderRadius: "50%" }}
                />
                <p className="reviewer-name ms-2 text-center ">
                  {review?.reviews?.reviewer}
                </p>
              </div>
              <div className="review-rating">
                <Rating value={review?.ratings} readOnly cancel={false} />
              </div>
            </div>
            <p className="review-comment">{review?.reviews?.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
