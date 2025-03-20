import { Rating } from "primereact/rating";
import React, { useContext } from "react";
import "./Ratings.css";
import { Button } from "primereact/button";
import userContext from "../../../../app/UseContext/UseContext";
import Cookies from "js-cookie";

export default function Ratings({ books, setShow, show }) {
  // const [value, setValue] = useState(null); // To track the rating value
  const { loginpoup } = useContext(userContext);
  const reviews = books?.book?.userReadingStatus;
  const accessToken = Cookies.get("accessToken");

  return (
    <div className="ratings-container">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <div>
          <h5 className="ratings-title">Book Ratings</h5>
        </div>
        <div>
          {" "}
          <Button
            onClick={() => setShow(accessToken ? true : loginpoup())}
            className="rounded-2"
            label="Review"
            style={{
              justifyContent: "center",
              // background: "#FFA539",
              padding: "10px",
              width: "150px",
              border: "none",
              marginRight: "10px",
              color: "#1D5755",
              border: "1px solid #1D5755",
              borderRadius: "6px",
              // borderRadius: "5px",
            }}
            outlined
          />
        </div>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review, i) => (
          <div key={i} className="review-card mt-2">
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
                <Rating value={review?.ratings} readOnly cancel={false}  />
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
