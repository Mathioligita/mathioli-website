// "use client";
// import React, { useRef, useContext, useEffect } from "react";
// import { Button } from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Toast } from "primereact/toast";
// import userContext from "../../UseContext/UseContext";
// import { CartADDAPI, Favoriteadd, FavoriteAPI } from "../../../../api/page";
// // import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { CiCircleRemove } from "react-icons/ci";
// import Cookies from "js-cookie";
// import "./wishlist.css";

// export default function Wishlist() {
//   const toast = useRef(null);
//   const { setCart, setwishlistvalues, wishlistvalues, cart } =
//     useContext(userContext);
//   const guestId = Cookies.get("guestId");
//   const accessToken = Cookies.get("accessToken");
//   console.log(cart, "cart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//   // Format price
//   const formatCurrency = (value) =>
//     value?.toLocaleString("en-IN", { style: "currency", currency: "INR" });

//   async function fetchWishlist() {
//     try {
//       const response = await FavoriteAPI();
//       setwishlistvalues(response?.data?.favorites || []);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   }
//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const addToCart = async (product) => {
//     try {
//       const data = {
//         bookId: product.bookId._id,
//         quantity: 1,
//         guestId: !accessToken ? guestId : undefined,
//       };

//       const response = await CartADDAPI(data);
//       setCart(response?.data?.cart);

//       toast.current.show({
//         severity: "success",
//         summary: "Success",
//         detail: response.data.message,
//         life: 3000,
//       });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const toggleWishlist = async (product) => {
//     try {
//       const data = {
//         bookId: product.bookId._id,
//         guestId: !accessToken ? guestId : undefined,
//       };

//       const response = await Favoriteadd(data);
//       if (response.success) {
//         toast.current.show({
//           severity: "success",
//           summary: "Success",
//           detail: response.data.message,
//           life: 3000,
//         });

//         // Update wishlist values after toggling favorite status
//         setwishlistvalues(response?.data?.favorites || []);
//         fetchWishlist();
//       } else {
//         toast.current.show({
//           severity: "error",
//           summary: "Error",
//           detail: response.data.message,
//           life: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating favorite status:", error);
//     }
//   };

//   const imageBodyTemplate = (product) => (
//     <div
//       className="d-flex align-items-center"
//       onClick={() => (window.location.href = `/book/${product?.bookId?.slug}`)}
//     >
//       <img
//         src={product?.bookId?.bookimage}
//         alt="Product"
//         style={{ width: "100px" }}
//         className="m-3"
//       />
//       <div className="ms-1 text-start">
//         <h6>
//           {product?.bookId?.title.split(" ").slice(0, 2).join(" ") + "..."}
//         </h6>
//         <span style={{ fontSize: "12px" }}>
//           {product?.bookId?.genre}
//           <br />
//           {product?.bookId?.language}
//           <br />
//           {product?.bookId?.author}
//         </span>
//       </div>
//     </div>
//   );

//   const renderAvailability = (isAvailable, label) => (
//     <li style={{ fontSize: "12px" }}>
//       <span className="me-2">
//         {isAvailable ? (
//           <img src="/Assert/Vector.png" alt="cff" className="" />
//         ) : (
//           <img src="/Assert/Vector (1).png" alt="sss" className="" />
//         )}
//       </span>
//       {/* {console.log(isAvailable, "isHardCopyAvailable")} */}
//       <span>{label} </span>
//     </li>
//   );
//   const priceBodyTemplate = (product) => formatCurrency(product?.bookId?.price);

//   const availabilityBodyTemplate = (product) => (
//     // console.log(product.bookId, "product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//     <ul className="list-unstyled">
//       {renderAvailability(product.bookId?.isHardCopyAvailable, "Hard Copy")}
//       {/* {renderAvailability(book?.isEBookAvailable, "E-Book")} */}
//       {renderAvailability(product.bookId?.isAudiobookAvailable, "Audio Book")}
//     </ul>
//   );

//   const statusBodyTemplate = (product) =>
//     console.log(product, ">>>>>>>>>>>>>>>>>>>.");
//   // <Tag
//   //   style={{ fontSize: "12px" }}
//   //   value={availabilityBodyTemplate(product)}
//   //   severity={getSeverity(product)}
//   // />

//   const getSeverity = (product) => {
//     const quantity = product?.bookId?.quantity;
//     if (quantity > 10) return "success";
//     if (quantity > 0 && quantity <= 10) return "warning";
//     return "danger";
//   };

//   return (
//     <div className="container">
//       <div
//         onClick={() => typeof window !== "undefined" && window.history.back()}
//         className="mt-3"
//       >
//         <i className="pi pi-arrow-left" style={{ cursor: "pointer" }}>
//           {" "}
//           Back
//         </i>
//       </div>

//       <div className="my-3">
//         <h6>Your Favourite</h6>
//       </div>

//       <Toast ref={toast} />

//       <DataTable value={wishlistvalues} tableStyle={{ minWidth: "60rem" }}>
//         <Column header="Title" body={imageBodyTemplate} />
//         <Column field="bookId.category" header="Category" />
//         <Column header="Availability" body={availabilityBodyTemplate} />
//         {/* <Column header="Status" body={statusBodyTemplate} /> */}
//         <Column field="price" header="Price" body={priceBodyTemplate} />

//         {/* <Column
//           header="Add to Cart"
//           body={(product) => (
//             <Button
//               severity="danger"
//               label="Add to Cart"
//               className="p-button-success rounded-3"
//               onClick={() => addToCart(product)}
//               disabled={product?.bookId?.quantity === 0}
//               outlined
//             />
//           )}
//         /> */}
//         <Column
//           header="Add to Cart"
//           body={(product) => {
//             const isInWishlist = wishlistvalues.some(
//               (item) => item?.bookId?._id === product?.bookId?._id
//             );

//             return (
//               <Button
//                 severity="danger"
//                 // label="Add to Cart"
//                 label={
//                   product?.bookId?.quantity === 0 || isInWishlist
//                     ? "Item in Cart"
//                     : "Add to Cart"
//                 }
//                 className="p-button-success rounded-3"
//                 onClick={() => addToCart(product)}
//                 disabled={product?.bookId?.quantity === 0 || isInWishlist}
//                 outlined={product?.bookId?.quantity === 0 || isInWishlist}
//               />
//             );
//           }}
//         />
//         <Column
//           className="text-center"
//           header="Wishlist"
//           body={(product) => {
//             const isFavorite = wishlistvalues.some(
//               (item) => item?.bookId?._id === product?.bookId?._id
//             );

//             return (
//               <div className="book-price">
//                 <span
//                   onClick={() => toggleWishlist(product)}
//                   style={{ cursor: "pointer", fontSize: "24px" }}
//                 >
//                   {/* {isFavorite ? (
//                     <FaHeart style={{ color: "red" }} />
//                   ) : (
//                     <FaRegHeart style={{ color: "grey" }} />
//                   )} */}
//                   <CiCircleRemove />
//                 </span>
//               </div>
//             );
//           }}
//         />
//       </DataTable>
//     </div>
//   );
// }
"use client";
import React, { useRef, useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import userContext from "../../UseContext/UseContext";
import { CartADDAPI, Favoriteadd, FavoriteAPI } from "../../../../api/page";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import "./wishlist.css";

export default function Wishlist() {
  const toast = useRef(null);
  const { setCart, setwishlistvalues, wishlistvalues, cart } =
    useContext(userContext);
  const guestId = Cookies.get("guestId");
  const accessToken = Cookies.get("accessToken");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize(); // Check the initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Format price
  const formatCurrency = (value) =>
    value?.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  async function fetchWishlist() {
    try {
      const response = await FavoriteAPI();
      setwishlistvalues(response?.data?.favorites || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToCart = async (product) => {
    try {
      const data = {
        bookId: product.bookId._id,
        quantity: 1,
        guestId: !accessToken ? guestId : undefined,
      };

      const response = await CartADDAPI(data);
      setCart(response?.data?.cart);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleWishlist = async (product) => {
    try {
      const data = {
        bookId: product.bookId._id,
        guestId: !accessToken ? guestId : undefined,
      };

      const response = await Favoriteadd(data);
      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.message,
          life: 3000,
        });

        // Update wishlist values after toggling favorite status
        setwishlistvalues(response?.data?.favorites || []);
        fetchWishlist();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: response.data.message,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const imageBodyTemplate = (product) => (
    <div
      className="d-flex align-items-center"
      onClick={() => (window.location.href = `/book/${product?.bookId?.slug}`)}
    >
      <img
        src={product?.bookId?.bookimage}
        alt="Product"
        style={{ width: "100px" }}
        className="m-3"
      />
      <div className="ms-1 text-start">
        <h6>
          {product?.bookId?.title.split(" ").slice(0, 2).join(" ") + "..."}
        </h6>
        <span style={{ fontSize: "12px" }}>
          {product?.bookId?.genre}
          <br />
          {product?.bookId?.language}
          <br />
          {product?.bookId?.author}
        </span>
      </div>
    </div>
  );

  const renderAvailability = (isAvailable, label) => (
    <li style={{ fontSize: "12px" }}>
      <span className="me-2">
        {isAvailable ? (
          <img src="/Assert/Vector.png" alt="cff" className="" />
        ) : (
          <img src="/Assert/Vector (1).png" alt="sss" className="" />
        )}
      </span>
      <span>{label} </span>
    </li>
  );

  const priceBodyTemplate = (product) => formatCurrency(product?.bookId?.price);

  const availabilityBodyTemplate = (product) => (
    <ul className="list-unstyled">
      {renderAvailability(product.bookId?.isHardCopyAvailable, "Hard Copy")}
      {renderAvailability(product.bookId?.isAudiobookAvailable, "Audio Book")}
    </ul>
  );

  const getSeverity = (product) => {
    const quantity = product?.bookId?.quantity;
    if (quantity > 10) return "success";
    if (quantity > 0 && quantity <= 10) return "warning";
    return "danger";
  };

  const renderMobileView = () => (
    <div className="container">
      <div
        onClick={() => typeof window !== "undefined" && window.history.back()}
        className="mt-3"
      >
        <i className="pi pi-arrow-left" style={{ cursor: "pointer" }}>
          {" "}
          Back
        </i>
      </div>

      <div className="my-3">
        <h6>Your Favourite</h6>
      </div>

      <Toast ref={toast} />

      {wishlistvalues.map((product) => (
        <div key={product.bookId._id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="d-flex m-auto" style={{}}>
                <div className="mt-3 ms-3 ">
                  <img
                    src={product.bookId.bookimage}
                    // className="img-fluid rounded-start"
                    style={{ width: "100px" }}
                    alt="Product"
                  />
                </div>

                <div className="my-auto ms-2">
                  <h5 className="card-title">{product.bookId.title}</h5>
                  <p className="card-text">
                    <small className="text-muted">{product.bookId.genre}</small>
                    <br />
                    <small className="text-muted">
                      {product.bookId.language}
                    </small>
                    <br />
                    <small className="text-muted">
                      {product.bookId.author}
                    </small>
                  </p>
                </div>
                <span
                  className="ms-auto me-2"
                  onClick={() => toggleWishlist(product)}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    // textAlign: "end",
                  }}
                >
                  {wishlistvalues.some(
                    (item) => item.bookId._id === product.bookId._id
                  ) ? (
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart style={{ color: "grey" }} />
                  )}
                </span>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text text-end fw-bold">
                  {formatCurrency(product.bookId.price)}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <ul className="list-unstyled text-start">
                    {renderAvailability(
                      product.bookId.isHardCopyAvailable,
                      "Hard Copy"
                    )}
                    {renderAvailability(
                      product.bookId.isAudiobookAvailable,
                      "Audio Book"
                    )}
                  </ul>
                  {console.log(cart, "wishlistvalues")}
                  {console.log(
                    wishlistvalues.some(
                      (item) => item.bookId._id === product.bookId._id
                    )
                      ? "Item in Cart"
                      : "Add to Cart",
                    "product>>>>>>>>>>>>>>>>>>"
                  )}

                  <Button
                    severity="danger"
                    label={
                      product.bookId.quantity === 0 ||
                      cart.some(
                        (item) => item.bookId._id === product.bookId._id
                      )
                        ? "Item in Cart"
                        : "Add to Cart"
                    }
                    className="p-button-success rounded-3"
                    onClick={() => addToCart(product)}
                    disabled={
                      product.bookId.quantity === 0 ||
                      wishlistvalues.some(
                        (item) => item.bookId._id === product.bookId._id
                      )
                    }
                    outlined
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {isMobileView ? (
        renderMobileView()
      ) : (
        <div className="container">
          <div
            onClick={() =>
              typeof window !== "undefined" && window.history.back()
            }
            className="mt-3"
          >
            <i className="pi pi-arrow-left" style={{ cursor: "pointer" }}>
              {" "}
              Back
            </i>
          </div>

          <div className="my-3">
            <h6>Your Favourite</h6>
          </div>

          <Toast ref={toast} />

          <DataTable value={wishlistvalues} tableStyle={{ minWidth: "60rem" }}>
            <Column header="Title" body={imageBodyTemplate} />
            <Column field="bookId.category" header="Category" />
            <Column header="Availability" body={availabilityBodyTemplate} />
            <Column field="price" header="Price" body={priceBodyTemplate} />
            <Column
              className="text-center"
              header="Wishlist"
              body={(product) => {
                const isFavorite = wishlistvalues.some(
                  (item) => item?.bookId?._id === product?.bookId?._id
                );

                return (
                  <div className="book-price">
                    <span
                      onClick={() => toggleWishlist(product)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      {isFavorite ? (
                        <FaHeart style={{ color: "red" }} />
                      ) : (
                        <FaRegHeart style={{ color: "grey" }} />
                      )}
                    </span>
                  </div>
                );
              }}
            />
            <Column
              header="Add to Cart"
              body={(product) => {
                const isInWishlist = cart.some(
                  (item) => item?.bookId?._id === product?.bookId?._id
                );

                return (
                  <Button
                    severity="danger"
                    label={
                      product?.bookId?.quantity === 0 || isInWishlist
                        ? "Item in Cart"
                        : "Add to Cart"
                    }
                    style={{
                      border:
                        product?.bookId?.quantity === 0 || isInWishlist
                          ? "0px "
                          : "1px",
                    }}
                    className="p-button-success rounded-3"
                    onClick={() => addToCart(product)}
                    disabled={product?.bookId?.quantity === 0 || isInWishlist}
                    outlined
                  />
                );
              }}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
}
