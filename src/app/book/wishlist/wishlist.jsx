// "use client";
// import React, { useState, useRef, useContext, useEffect } from "react";
// import { Button } from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Rating } from "primereact/rating";
// import { Tag } from "primereact/tag";
// import { Toast } from "primereact/toast";
// // import Addtocart from "../addtocart/page";
// import userContext from "../../UseContext/UseContext"; // Import userContext
// // import axios from "axios";
// import { CartADDAPI, Favoriteadd, FavoriteAPI } from "../../../../api/page";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import Cookies from "js-cookie";
// import "./wishlist.css";

// export default function Wishlist() {
//   // const [products, setProducts] = useState([]);

//   const toast = useRef(null);
//   const { setCart, setwishlistvalues, wishlistvalues } =
//     useContext(userContext);

//   const guestId = Cookies.get("guestId");
//   const accessToken = Cookies.get("accessToken");
//   const [isFavorite, setIsFavorite] = useState(true);
//   const wishlist = wishlistvalues;
//   // Format price
//   const formatCurrency = (value) =>
//     value?.toLocaleString("en-IN", { style: "currency", currency: "INR" });

//   const addToCart = async (product) => {
//     if (accessToken) {
//       try {
//         const data = { bookId: product.bookId._id, quantity: 1 };
//         // await CartADDAPI(data);
//         const response = await CartADDAPI(data);
//         // console.log(response, "response?.data?.cart_________________>");
//         setCart(response?.data?.cart);
//         toast.current.show({
//           severity: "success",
//           summary: "Success",
//           detail: response.data.message,
//           life: 3000,
//         });
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//       }
//     } else {
//       try {
//         console.log(product);
//         const data = {
//           bookId: product?.bookId?._id,
//           quantity: 1,
//           guestId: guestId,
//         };
//         // await CartADDAPI(data);
//         const response = await CartADDAPI(data);

//         setCart(response?.data?.cart);
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//       }
//     }
//   };

//   const toggleWishlist = async (product) => {
//     console.log(product, "product");
//     if (accessToken) {
//       try {
//         const data = { bookId: product.bookId._id };
//         // Update favorite status on the backend
//         const response = await Favoriteadd(data);
//         if (response.success) {
//           toast.current.show({
//             severity: "success",
//             summary: "Success",
//             detail: `${response.data.message}`,
//             life: 3000,
//           });
//           // const data1 = FavoriteAPI();
//           console.log(response?.data?.favorites, "FavoriteAPI");
//           setwishlistvalues(response?.data?.favorites);
//         }
//         setIsFavorite(!isFavorite);
//         // FavoriteAPI();
//       } catch (error) {
//         console.error("Error updating favorite status:", error);
//       }
//     } else {
//       try {
//         const data = { bookId: product.bookId._id, guestId: guestId };
//         // Update favorite status on the backend
//         const response = await Favoriteadd(data);
//         if (response.success) {
//           toast.current.show({
//             severity: "success",
//             summary: "Success",
//             detail: `${response.data.message}`,
//             life: 3000,
//           });
//           // const data1 = await FavoriteAPI();
//           console.log(response?.data?.favorites, "FavoriteAPI");
//           setwishlistvalues(response?.data?.favorites);
//           setIsFavorite(!isFavorite);
//         } else {
//           toast.current.show({
//             severity: "error",
//             summary: "error",
//             detail: `${response.data.message}`,
//             life: 3000,
//           });
//         }
//       } catch (error) {
//         console.error("Error updating favorite status:", error);
//       }
//     }
//   };
//   // Rendering template for DataTable
//   const imageBodyTemplate = (product) => (
//     <>
//       <div className="d-flex align-items-center">
//         <img
//           src={product.bookId.bookimage}
//           alt="Product"
//           style={{ width: "100px" }}
//           className="m-3"
//         />
//         <div className="ms-1 text-start">
//           {" "}
//           <h6>{product.bookId.title}</h6>
//           <span style={{ fontSize: "12px" }}>
//             {product?.bookId?.genre}
//             <br />
//             {product?.bookId?.language}
//             <br />
//             {product?.bookId?.author}
//           </span>
//         </div>
//       </div>
//     </>
//   );
//   const priceBodyTemplate = (product) => formatCurrency(product?.bookId?.price);
//   const ratingBodyTemplate = (product) => (
//     <Rating
//       value={product?.bookId?.userReadingStatus?.ratings}
//       readOnly
//       cancel={false}
//     />
//   );
//   useEffect(() => {
//     const respone = FavoriteAPI();
//     setwishlistvalues(respone?.data?.favorites);

//   }, []);

//   const availabilityBodyTemplate = (product) => {
//     const quantity = product?.bookId?.quantity;
//     if (quantity > 10) return "In Stock";
//     if (quantity > 0 && quantity <= 10) return "Low Stock";
//     return "Out of Stock";
//   };

//   const statusBodyTemplate = (product) => (
//     <Tag
//       value={availabilityBodyTemplate(product)}
//       severity={getSeverity(product)}
//     />
//   );

//   const getSeverity = (product) => {
//     const quantity = product?.bookId?.quantity;
//     if (quantity > 10) return "success"; // High stock
//     if (quantity > 0 && quantity <= 10) return "warning"; // Low stock
//     return "danger"; // Out of stock
//   };

//   // const header = (
//   //   <div className="d-flex flex-wrap align-items-center">
//   //     <span className="text-xl text-900 font-bold">
//   //       <h6>Your Favourite</h6>
//   //     </span>
//   //     <div className="ms-auto">
//   //       <Button label="Continue to Shopping" severity="danger" outlined />
//   //     </div>
//   //   </div>
//   // );
//   // const wishlistIds = wishlist?.map((item) => item?.bookId?._id);
//   // const isSame = wishlist?.includes(bookDetails?.book?._id);
//   //   const footer = `In total there are ${products.bookId.length} products.`;

//   return (
//     <div className="container">
//       <div
//         onClick={() =>
//           typeof window !== "undefined" ? window.history.back("/") : null
//         }
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
//       <div>
//         <DataTable
//           value={wishlist}
//           //   header={header}
//           //   footer={footer}
//           tableStyle={{ minWidth: "60rem" }}
//         >
//           <Column header="Title" body={imageBodyTemplate} />
//           {/* <Column field="rating" header="Ratings" body={ratingBodyTemplate} /> */}
//           <Column field="bookId.category" header="Category" />
//           <Column header="Availability" body={availabilityBodyTemplate} />
//           <Column header="Status" body={statusBodyTemplate} />
//           <Column field="price" header="Price" body={priceBodyTemplate} />
//           <Column
//             className="text-center"
//             header="Wishlist"
//             body={(product) => (
//               <div
//                 className="book-price   "
//                 // style={{ justifyContent: "stretch" }}
//               >
//                 <div className=" ">
//                   <span
//                     onClick={() => toggleWishlist(product)}
//                     style={{ cursor: "pointer", fontSize: "24px" }}
//                   >
//                     {isFavorite ? (
//                       <FaHeart style={{ color: "red" }} />
//                     ) : (
//                       <FaRegHeart style={{ color: "grey" }} />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             )}
//           />
//           <Column
//             header="Add to Cart"
//             body={(product) => (
//               <Button
//                 severity="danger"
//                 label="Add to Cart"
//                 className="p-button-success rounded-3"
//                 onClick={() => addToCart(product)}
//                 disabled={product?.bookId?.quantity === 0}
//                 outlined
//               />
//             )}
//           />
//         </DataTable>
//       </div>

//       {/* Cart Section */}
//       {/* {cart.length > 0 && <Addtocart cart={cart} setCart={setCart} />} */}
//     </div>
//   );
// }
"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import userContext from "../../UseContext/UseContext";
import { CartADDAPI, Favoriteadd, FavoriteAPI } from "../../../../api/page";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import "./wishlist.css";

export default function Wishlist() {
  const toast = useRef(null);
  const { setCart, setwishlistvalues, wishlistvalues } =
    useContext(userContext);
  const guestId = Cookies.get("guestId");
  const accessToken = Cookies.get("accessToken");

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
    <div className="d-flex align-items-center">
      <img
        src={product.bookId.bookimage}
        alt="Product"
        style={{ width: "100px" }}
        className="m-3"
      />
      <div className="ms-1 text-start">
        <h6>{product.bookId.title}</h6>
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

  const priceBodyTemplate = (product) => formatCurrency(product?.bookId?.price);

  const availabilityBodyTemplate = (product) => {
    const quantity = product?.bookId?.quantity;
    if (quantity > 10) return "In Stock";
    if (quantity > 0 && quantity <= 10) return "Low Stock";
    return "Out of Stock";
  };

  const statusBodyTemplate = (product) => (
    <Tag
      value={availabilityBodyTemplate(product)}
      severity={getSeverity(product)}
    />
  );

  const getSeverity = (product) => {
    const quantity = product?.bookId?.quantity;
    if (quantity > 10) return "success";
    if (quantity > 0 && quantity <= 10) return "warning";
    return "danger";
  };

  return (
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

      <DataTable value={wishlistvalues} tableStyle={{ minWidth: "60rem" }}>
        <Column header="Title" body={imageBodyTemplate} />
        <Column field="bookId.category" header="Category" />
        <Column header="Availability" body={availabilityBodyTemplate} />
        <Column header="Status" body={statusBodyTemplate} />
        <Column field="price" header="Price" body={priceBodyTemplate} />
        <Column
          className="text-center"
          header="Wishlist"
          body={(product) => {
            const isFavorite = wishlistvalues.some(
              (item) => item.bookId._id === product.bookId._id
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
          body={(product) => (
            <Button
              severity="danger"
              label="Add to Cart"
              className="p-button-success rounded-3"
              onClick={() => addToCart(product)}
              disabled={product?.bookId?.quantity === 0}
              outlined
            />
          )}
        />
      </DataTable>
    </div>
  );
}
