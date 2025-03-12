"use client";
import React, { useContext, useEffect, useState } from "react";
import Login from "../../login/page";
import Register from "../../register/page";
import { useRouter } from "next/navigation";
import { Badge } from "primereact/badge";
import {
  addToCartAPI,
  CategoryAPI,
  FavoriteAPI,
  ProfileUser,
} from "../../../../api/page";
import userContext from "@/app/UseContext/UseContext";
import Cookies from "js-cookie";
import { Button } from "primereact/button";

const retryFetch = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limited. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryFetch(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export default function UserActions() {
  const [register, setRegister] = useState(false);
  const router = useRouter();
  const {
    cart,
    setCart,
    loginPopupVisible,
    closeLoginPopup,
    setwishlistvalues,
    loginpoup,
    wishlistvalues,
    setusersdata,
    setCategoriesdata,
    registerpoup,
    regsiterPopup,
    setRegisterpop,
    registerpop
  } = useContext(userContext);

  // console.log(usersdata, "userdata")
  const accessToken = Cookies.get("accessToken");
  const wishlistcount = wishlistvalues?.length || 0;
  const cart1 = cart?.length || 0;
  // const { setCategoriesdata } = useContext(userContext);

  const fetchCategories = async () => {
    try {
      const response = await CategoryAPI();
      const categories = response?.data?.categories;
      console.log(categories, "categories");

      setCategoriesdata(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleShowRegister = () => {
    setRegister(true);
    setRegisterpop(true)
  };

  const handleHideRegister = () => {
    setRegister(false);
    setRegisterpop(false)
  };

  const handleWishlist = () => {
    router.push("/book/wishlist");
  };

  const handleAddToCart = () => {
    router.push("/book/addtocart");
  };

  const fetchDatad = async () => {
    try {
      const response = await retryFetch(addToCartAPI);
      if (response?.data) {
        setCart(response?.data?.cart);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchDatad();
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await FavoriteAPI();
      setwishlistvalues(response?.data?.favorites);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };
  useEffect(() => {
    // if (accessToken) {
    const fetchdata = async () => {
      try {
        const response = await ProfileUser();
        setusersdata(response?.data);
        console.log(response.data, "fetchdata");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchdata();
    // }
  }, []);
  return (
    <div className="user-actions d-flex align-items-center gap-1 ms-3">
      <div className="ms-1 d-flex">
        {accessToken ? null : (
          <span>
            {/* <Button label="Login" className="rounded-2"  outlined onClick={() => loginpoup()} /> */}
            <span
              label="Login"
              className="p-button-text login-btn"
              onClick={() => loginpoup()}
              style={{  cursor: "pointer", fontWeight: "500" }}
            >
              Login
            </span>
            {/* &nbsp;/&nbsp;
            <span
              label="Signup"
              className="p-button-text signup-btn"
              onClick={()=> registerpoup()}
              style={{ all: "unset", cursor: "pointer", fontWeight: "500" }}
            >
              Signup
            </span> */}
          </span>
        )}
      </div>

      <span onClick={handleWishlist} className="ms-3 mt-2">
        <i className="pi pi-heart p-overlay-badge fs-5">
          <Badge value={wishlistcount}></Badge>
        </i>
      </span>

      <span onClick={handleAddToCart} className="ms-3 mt-2">
        <i
          className="pi pi-shopping-cart p-overlay-badge fs-5"
          style={{ fontSize: "1rem" }}
        >
          <Badge value={cart1}></Badge>
        </i>
      </span>

      {loginPopupVisible && (
        <div className="position-absolute">
          <Login visible={loginPopupVisible} onHide={closeLoginPopup} />
        </div>
      )}
{
  registerpop && (

    <Register
      visible={registerpop}
      setRegister={setRegister}
      onHide={handleHideRegister}
    />
  )
}
    </div>
  );
}
