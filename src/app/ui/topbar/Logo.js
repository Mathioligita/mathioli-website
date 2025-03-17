import userContext from "@/app/UseContext/UseContext";
import { Badge } from "primereact/badge";
import React, { useContext } from "react";

export default function Logo() {
  const { cart, wishlistvalues } = useContext(userContext);
  // const accessToken = Cookies.get("accessToken");
  const wishlistcount = wishlistvalues?.length || 0;
  const cart1 = cart?.length || 0;
  const handleWishlist = () => {
    router.push("/book/wishlist");
  };

  const handleAddToCart = () => {
    router.push("/book/addtocart");
  };
  return (
    <div className="d-flex" style={{ justifyContent: "space-between" }}>
      {/* // <div className="logo-container"> */}

      <>
        <img
          // loading="lazy"
          src={"/image/Logo black.svg"}
          alt="Company name"
          className="logo-text"
          // style={{width:"90%"}}
          // width={"80%"}
        />
      </>
      {/* <div className="fav-wishlist">
        <span onClick={handleWishlist} className="ms-3 m">
          <i className="pi pi-heart p-overlay-badge fs-5">
            <Badge value={wishlistcount}></Badge>
          </i>
        </span>

        <span onClick={handleAddToCart} className="ms-3 ">
          <i
            className="pi pi-shopping-cart p-overlay-badge fs-5"
            style={{ fontSize: "1rem" }}
          >
            <Badge value={cart1}></Badge>
          </i>
        </span>
      </div> */}
    </div>
    // </div>
  );
}
