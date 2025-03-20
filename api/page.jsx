import fetchHandler from "./Handler";
import Cookies from "js-cookie";

export const addToCartAPI = async () => {
  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      try {
        const response = await fetchHandler({
          method: "GET",
          endpoint: "/user/cart",
          retries: 5, // Override default retries
          backoff: 500,
        });
        return response;
      } catch (error) {
        console.log(object);
      }
    } else {
      try {
        const gustId = Cookies.get("guestId");
        const response = await fetchHandler({
          method: "GET",
          endpoint: `/user/cart/guest?guestId=${gustId}`,
          retries: 5, // Override default retries
          backoff: 500,
        });
        return response;
      } catch (error) {
        // console.error("Unexpected error:", error);
      }
    }
  }
};
export const CartADDAPI = async (data) => {
  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    try {
      if (accessToken) {
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/user/cart/add`,
          data,
          retries: 5, // Override default retries
          backoff: 500,
        });
        // await addToCartAPI();
        const response1 = await addToCartAPI();
        return response1;
      } else {
        const guestId = Cookies.get("guestId");
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/user/cart/add-guest`,
          data,
          retries: 5, // Override default retries
          backoff: 500,
        });
        const response1 = await addToCartAPI();
        return response1;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
};

export const CartRemoveAPI = async (data) => {
  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    try {
      if (accessToken) {
        const response = await fetchHandler({
          method: "PATCH",
          endpoint: `/user/cart/remove`,
          data,
          retries: 5, // Override default retries
          backoff: 500,
        });
        await addToCartAPI();
        return response;
      } else {
        const guestId = Cookies.get("guestId");
        const response = await fetchHandler({
          method: "PATCH",
          endpoint: `/user/cart/remove-guest`,
          data,
          retries: 5, // Override default retries
          backoff: 500,
        });
        await addToCartAPI();
        return response;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
};

export const cartUpdateAPIquanity = async (updatevalue) => {
  console.log(updatevalue, "updatedvalues");

  try {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const data = {
        bookId: updatevalue.bookId,
        quantity: updatevalue.quantity,
      };
      const response = await fetchHandler({
        method: "PATCH",
        endpoint: `/user/cart/update-quantity`,
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });
      return response;
    } else {
      const guestId = Cookies.get("guestId");
      const data = {
        bookId: updatevalue.bookId,
        quantity: updatevalue.quantity,
        guestId,
      };
      const response = await fetchHandler({
        method: "PATCH",
        endpoint: `/user/cart/update-quantity-guest`,
        updatevalue,
        retries: 5, // Override default retries
        backoff: 500,
        data,
      });
      return response;
    }
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const FavoriteAPI = async () => {
  const accessToken = Cookies.get("accessToken");
  try {
    if (accessToken) {
      const response = await fetchHandler({
        method: "GET",
        endpoint: "/user/favorite",
        retries: 5, // Override default retries
        backoff: 500,
      });

      return response;
    } else {
      const guestId = Cookies.get("guestId");
      const response = await fetchHandler({
        method: "GET",
        endpoint: `/user/favorite/guest?guestId=${guestId}`,
        retries: 5, // Override default retries
        backoff: 500,
      });
      return response;
    }
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const Favoriteadd = async (data) => {
  const accessToken = Cookies.get("accessToken");
  try {
    if (accessToken) {
      const response = await fetchHandler({
        method: "POST",
        endpoint: "/user/favorite/add",
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });
      // const response1 = await FavoriteAPI();
      return response;
    } else {
      const response = await fetchHandler({
        method: "POST",
        endpoint: `/user/favorite/add-guest`,
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });

      return response;
    }
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const FavoriteRemove = async (data) => {
  const accessToken = Cookies.get("accessToken");
  try {
    if (accessToken) {
      const response = await fetchHandler({
        method: "PATCH",
        endpoint: "/user/cart/remove",
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });
      const response1 = await FavoriteAPI();
      return response1;
      // return response;
    } else {
      const response = await fetchHandler({
        method: "PATCH",
        endpoint: `/user/favorite/remove-guest`,
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });
      // await FavoriteAPI();
      const response1 = await FavoriteAPI();
      return response1;
    }
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const BookAPI = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: "/user/book",
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};
export const CatergoriesBookAPI = async (data) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/book/category/${data}`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const CategoryAPI = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: "/user/category",
      retries: 5, // Override default retries
      backoff: 500,
    });
    console.log("categories", response);
    return response;
  } catch (error) {
    // console.error("Unexpected error:", error);
  }
};

export const Checkout = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: "/user/order/checkout",
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const ProfileUser = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",

      endpoint: "/users/me",
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const ProfileUserPatch = async (data) => {
  try {
    const response = await fetchHandler({
      method: "PATCH",

      endpoint: "/users/me",
      data,
      retries: 5, // Override default retries
      backoff: 500,
      isFormData: true,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const AddressCreate = async (data) => {
  try {
    const response = await fetchHandler({
      method: "PUT",

      endpoint: "/users/shipping-address",
      data,
      retries: 5, // Override default retries
      backoff: 500,
      // isFormData: true,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const AddressStatusUpdate = async (data) => {
  try {
    const response = await fetchHandler({
      method: "PUT",

      endpoint: "/users/shipping-address",
      data,
      retries: 5, // Override default retries
      backoff: 500,
      // isFormData: true,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const searchbarGet = async (data) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book?keyword=${data}`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const SearchLog = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/search/Log`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export const booksId = async (id) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/${id}`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const REviewBook = async (slug, data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/user/book/${slug}/review`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const userBookSlug = async (slug) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/${slug}`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const Newarrival = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/new/arrival`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const QuoteAPi = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/quote`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const LoginAPi = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/users/login`,
      data,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const UsersRegisterAPi = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/users`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
export const contactusAPi = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/contactus`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

// Shpping API

export const CountryAPI = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/shippingregion/user/country`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const StateAPI = async (data) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/shippingregion/getstates/${data}`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const DistrictAPI = async (data) => {
  console.log(data, "disctric");
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/shippingregion/getdistricts/${data.country}/${data.state}`,

      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const APIshippingdata = async (data) => {
  console.log(data, "disctric");
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/user/order/shipping/calculation`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const APIshippiAddressUpdate = async (data) => {
  console.log(data, "disctric");
  try {
    const response = await fetchHandler({
      method: "PUT",
      endpoint: `/users/shipping-address`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const PlaceOrderAPi = async (data) => {
  console.log(data, "disctric");
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/user/order/placeorder`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {}
};
export const audiobooksMy = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/my/audiobooks`,
      retries: 5, // Override default retries
      backoff: 500,
    });
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

// razopay

export const bookingVerifypayment = async (data) => {
  if (typeof window !== "undefined") {
    try {
      const response = await fetchHandler({
        method: "POST",
        endpoint: "/user/order/verify-payment",
        data,
        retries: 5, // Override default retries
        backoff: 500,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

// Audio Booking api
// export const bookingAudioBooking = async (data) => {
//   if (typeof window !== "undefined") {
//     try {
//       const response = await fetchHandler({
//         method: "POST",
//         endpoint: `/user/order/buybooks`,
//         data,
//         retries: 5, // Override default retries
//         backoff: 500

//       });
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
export const bookingAudioBooking = async (data) => {
  console.log(data.booktype, "sdgdgsdsdsdsds>>>>>>>>>>>>>>>>>");
  // if (typeof window !== "undefined") {
  // console.log(`/user/order/buybooks?${data?.bookType}=?${data?.audioBookId}`,"dfghjk")
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/user/order/buybooks?${data?.booktype}=${data?.audioBookId}`,
      retries: 5, // Override default retries
      backoff: 500,
    });

    return response;
  } catch (error) {
    console.error("Error in bookingAudioBooking:", error);
  }
};
export const SingleBuyProduct = async (data) => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/book/buynow/${data}`,

      retries: 5, // Override default retries
      backoff: 500,
    });

    return response;
  } catch (error) {
    console.error("Error in bookingAudioBooking:", error);
  }
};
export const MyOrders = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/user/order/my-order`,

      retries: 5, // Override default retries
      backoff: 500,
    });

    return response;
  } catch (error) {
    console.error("Error in bookingAudioBooking:", error);
  }
};
export const NewsletterFormS = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/user/subscribe`,
      data,
      retries: 5, // Override default retries
      backoff: 500,
    });

    return response;
  } catch (error) {
    console.error("Error in bookingAudioBooking:", error);
  }
};
// };
