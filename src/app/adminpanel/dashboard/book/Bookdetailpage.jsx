// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../../utlis";
// import { useParams } from "next/navigation";
// import {
//   Galleria,
//   Rating,
//   Button,
//   Card,
//   TabView,
//   TabPanel,
//   Tag,
//   Divider,
//   Avatar,
//   Badge,
//   ProgressSpinner,
//   Toast,
// } from "primereact";

// export default function BookDetailPage() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [accessToken] = useState(localStorage.getItem("accessToken"));
//   const [toast, setToast] = useState(null);

//   const responsiveOptions = [
//     {
//       breakpoint: "1024px",
//       numVisible: 5,
//     },
//     {
//       breakpoint: "768px",
//       numVisible: 3,
//     },
//     {
//       breakpoint: "560px",
//       numVisible: 1,
//     },
//   ];

//   const fetchBook = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/book/${id}`, {
//         headers,
//       });
//       setBook(response.data.data.book[0]);
//     } catch (error) {
//       console.error("Error fetching book:", error);
//       setError("Failed to fetch book details");
//       setToast({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to load book details",
//         life: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBook();
//   }, [id]);

//   const itemTemplate = (item) => {
//     return (
//       <img
//         src={item}
//         alt={book.title}
//         style={{ width: "100%", height: "400px", objectFit: "contain" }}
//       />
//     );
//   };

//   const thumbnailTemplate = (item) => {
//     return (
//       <img
//         src={item}
//         alt={book.title}
//         style={{ width: "50px", height: "50px", objectFit: "cover" }}
//       />
//     );
//   };

//   if (loading)
//     return (
//       <div
//         className="flex justify-content-center align-items-center"
//         style={{ height: "50vh" }}
//       >
//         <ProgressSpinner />
//       </div>
//     );

//   if (error)
//     return (
//       <div
//         className="flex justify-content-center align-items-center"
//         style={{ height: "50vh" }}
//       >
//         {/* <Toast ref={(el) => setToast(el)} /> */}
//         <p className="text-red-500">{error}</p>
//       </div>
//     );

//   if (!book)
//     return (
//       <div
//         className="flex justify-content-center align-items-center"
//         style={{ height: "50vh" }}
//       >
//         <p>Book not found</p>
//       </div>
//     );

//   return (
//     <div className="surface-section px-4 py-6 md:px-6 lg:px-8">
//       {/* <Toast ref={(el) => setToast(el)} /> */}
//       <div className="grid">
//         {/* Book Images */}
//         <div className="col-12 md:col-5">
//           <Galleria
//             value={book.bookimage}
//             activeIndex={activeIndex}
//             onItemChange={(e) => setActiveIndex(e.index)}
//             responsiveOptions={responsiveOptions}
//             numVisible={5}
//             circular
//             style={{ maxWidth: "500px" }}
//             showItemNavigators
//             showThumbnails={false}
//             item={itemTemplate}
//             thumbnail={thumbnailTemplate}
//           />
//           <div className="flex mt-3 gap-2">
//             {book.bookimage.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`${book.title} thumbnail ${index}`}
//                 className={`cursor-pointer border-round ${
//                   activeIndex === index ? "border-primary border-3" : "border-2"
//                 }`}
//                 style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                 onClick={() => setActiveIndex(index)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Book Details */}
//         <div className="col-12 md:col-7">
//           <h1 className="text-4xl font-bold mb-2">{book.title}</h1>

//           <div className="flex align-items-center mb-3 gap-3">
//             <span className="text-lg text-secondary">By {book.author}</span>
//             <Divider layout="vertical" />
//             <Rating
//               className="text-sm"
//               value={
//                 book.userReadingStatus.length > 0
//                   ? book.userReadingStatus[0].ratings
//                   : 0
//               }
//               readOnly
//               cancel={false}
//             />
//             <span className="text-sm">
//               ({book.userReadingStatus.length} reviews)
//             </span>
//           </div>

//           <div className="flex gap-2 mb-4">
//             <Tag value={book.category} severity="info" />
//             <Tag value={book.genre} severity="success" />
//             {book.awardWinningBook && (
//               <Tag
//                 // icon={<StarIcon />}
//                 value="Award Winning"
//                 severity="warning"
//               />
//             )}
//             {book.newArrival && <Tag value="New Arrival" severity="danger" />}
//           </div>

//           <h2 className="text-primary text-3xl mb-3">₹{book.price}</h2>

//           <div className="mb-4">
//             <p className="text-sm text-secondary">
//               {book.pages} pages | {book.language} | Published:{" "}
//               {new Date(book.publishDate).toLocaleDateString()} | Publisher:{" "}
//               {book.publisher}
//             </p>
//           </div>

//           {/* <div className="flex gap-3 mb-5">
//             <Button
//               label="Add to Cart"
//               //   icon={<ShoppingCartIcon />}
//               className="p-button-raised"
//             />
//             <Button
//               label="Wishlist"
//               //   icon={<BookmarkIcon />}
//               className="p-button-outlined"
//             />
//             <Button
//               //   icon={<ShareIcon />}/
//               className="p-button-rounded p-button-text"
//             />
//           </div> */}

//           <div className="flex gap-4 mb-4">
//             {book.isHardCopyAvailable && (
//               <div className="flex align-items-center gap-2">
//                 {/* <BookOpenIcon className="text-primary" /> */}
//                 <span className="text-sm">Hard Copy Available</span>
//               </div>
//             )}
//             {book.isEBookAvailable && (
//               <div className="flex align-items-center gap-2">
//                 <i className="pi pi-book text-primary"></i>
//                 <span className="text-sm">E-Book Available</span>
//               </div>
//             )}
//             {book.isAudiobookAvailable && (
//               <div className="flex align-items-center gap-2">
//                 {/* <HeadphonesIcon className="text-primary" /> */}
//                 <span className="text-sm">Audiobook Available</span>
//               </div>
//             )}
//           </div>

//           <div className="mb-4">
//             <p className="text-sm">
//               {/* <TruckIcon className="mr-2" /> */}
//               Free delivery on orders over ₹500
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs for additional information */}
//       <Card className="mt-5">
//         <TabView
//           activeIndex={activeIndex}
//           onTabChange={(e) => setActiveIndex(e.index)}
//         >
//           <TabPanel header="Description">
//             <p className="line-height-3">{book.description}</p>
//           </TabPanel>
//           <TabPanel header="About the Author">
//             <p className="line-height-3">{book.authorBiography}</p>
//           </TabPanel>
//           <TabPanel header="Reviews">
//             {book.userReadingStatus.length > 0 ? (
//               <div className="flex flex-column gap-3">
//                 {book.userReadingStatus.map((status, index) => (
//                   <Card key={index} className="mb-2">
//                     <div className="flex align-items-center gap-3 mb-3">
//                       <Avatar label={status.reviews.reviewer.charAt(0)} />
//                       <div>
//                         <h4 className="mb-1">{status.reviews.reviewer}</h4>
//                         <Rating
//                           value={status.ratings}
//                           readOnly
//                           cancel={false}
//                         />
//                       </div>
//                     </div>
//                     <p className="mb-2">{status.reviews.comment}</p>
//                     <p className="text-sm text-secondary">
//                       {new Date(status.reviews.date).toLocaleDateString()}
//                     </p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p>No reviews yet</p>
//             )}
//           </TabPanel>
//           <TabPanel header="Details">
//             <div className="grid">
//               <div className="col-12 md:col-6">
//                 <ul className="list-none p-0 m-0">
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">Publisher:</span>
//                     <span className="text-color-secondary">
//                       {book.publisher}
//                     </span>
//                   </li>
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">Publication Date:</span>
//                     <span className="text-color-secondary">
//                       {new Date(book.publishDate).toLocaleDateString()}
//                     </span>
//                   </li>
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">Language:</span>
//                     <span className="text-color-secondary">
//                       {book.language}
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-12 md:col-6">
//                 <ul className="list-none p-0 m-0">
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">Pages:</span>
//                     <span className="text-color-secondary">{book.pages}</span>
//                   </li>
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">Weight:</span>
//                     <span className="text-color-secondary">
//                       {book.weight} {book.weightUnit}
//                     </span>
//                   </li>
//                   <li className="flex align-items-center py-3 border-bottom-1 surface-border">
//                     <span className="font-medium w-6">ISBN:</span>
//                     <span className="text-color-secondary">{book._id}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </TabPanel>
//         </TabView>
//       </Card>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import { useParams } from "next/navigation";
import {
  Galleria,
  Rating,
  Button,
  Card,
  TabView,
  TabPanel,
  Tag,
  Divider,
  Avatar,
  ProgressSpinner,
} from "primereact";
import "./BookDetailssssss.css";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  //   const [toast, setToast] = useState(null);

  const fetchBook = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/book/${id}`, {
        headers,
      });
      setBook(response.data.data.book[0]);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Failed to fetch book details");
      showToast("error", "Error", "Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (severity, summary, detail) => {
    setToast({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const itemTemplate = (item) => {
    return <img src={item} alt={book.title} className="book-main-image" />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item} alt={book.title} className="book-thumbnail" />;
  };

  if (loading)
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        {/* <Toast ref={(el) => setToast(el)} /> */}
        <p className="error-message">{error}</p>
      </div>
    );

  if (!book)
    return (
      <div className="not-found-container">
        <p>Book not found</p>
      </div>
    );

  return (
    <div className="book-detail-container">
      {/* <Toast ref={(el) => setToast(el)} /> */}

      <div className="book-grid">
        {/* Book Images */}
        <div className="book-images-section">
          <Galleria
            value={book.bookimage}
            activeIndex={activeIndex}
            onItemChange={(e) => setActiveIndex(e.index)}
            circular
            className="book-galleria"
            showItemNavigators
            showThumbnails={false}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
          <div className="thumbnail-container">
            {book.bookimage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${book.title} thumbnail ${index}`}
                className={`book-thumbnail ${
                  activeIndex === index ? "active-thumbnail" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Book Details */}
        <div className="book-info-section">
          <h1 className="book-title">{book.title}</h1>

          <div className="author-rating-container">
            <span className="author-name">By {book.author}</span>
            <Divider layout="vertical" />
            <Rating
              value={
                book.userReadingStatus.length > 0
                  ? book.userReadingStatus[0].ratings
                  : 0
              }
              readOnly
              cancel={false}
                className="review-rating"
            />
            <span className="review-count">
              ({book.userReadingStatus.length} reviews)
            </span>
          </div>

          <div className="tag-container">
            <Tag value={book.category} className="category-tag" />
            <Tag value={book.genre} className="genre-tag" />
            {book.awardWinningBook && (
              <Tag value="Award Winning" className="award-tag" />
            )}
            {book.newArrival && <Tag value="New Arrival" className="new-tag" />}
          </div>

          <h2 className="book-price">₹{book.price}</h2>

          <div className="book-meta">
            <p>
              {book.pages} pages | {book.language} | Published:{" "}
              {new Date(book.publishDate).toLocaleDateString()} | Publisher:{" "}
              {book.publisher}
            </p>
          </div>

          {/* <div className="action-buttons">
            <Button 
              label="Add to Cart" 
              icon="pi pi-shopping-cart" 
              className="cart-button"
            />
            <Button 
              label="Wishlist" 
              icon={<BookmarkIcon />} 
              className="wishlist-button"
            />
            <Button 
              icon={<ShareIcon />} 
              className="share-button"
            />
          </div> */}

          <div className="availability-info">
            {book.isHardCopyAvailable && (
              <div className="availability-item">
                {/* <BookOpenIcon className="availability-icon" /> */}
                <span className="availability-icon">
                  <i className="pi pi-book"></i>
                </span>
                <span>Hard Copy Available</span>
              </div>
            )}
            {book.isEBookAvailable && (
              <div className="availability-item">
                <i className="pi pi-book availability-icon"></i>
                <span>E-Book Available</span>
              </div>
            )}
            {book.isAudiobookAvailable && (
              <div className="availability-item">
                <i className="pi pi-headphones"></i>
                {/* <HeadphonesIcon classN/ame="availability-icon" /> */}
                <span>Audiobook Available</span>
              </div>
            )}
          </div>

          <div className="delivery-info">
            {/* <TruckIcon className="delivery-icon" /> */}
            {/* <span>Free delivery on orders over ₹500</span> */}
          </div>
        </div>
      </div>

      {/* Tabs for additional information */}
      <Card className="details-card">
        <TabView className="book-tabview">
          <TabPanel header="Description" className="tab-panel">
            <p className="book-description">{book.description}</p>
          </TabPanel>
          <TabPanel header="About the Author" className="tab-panel">
            <p className="author-bio">{book.authorBiography}</p>
          </TabPanel>
          <TabPanel header="Reviews" className="tab-panel">
            {book.userReadingStatus.length > 0 ? (
              <div className="reviews-container">
                {book.userReadingStatus.map((status, index) => (
                  <Card key={index} className="review-card">
                    <div className="reviewer-info">
                      <Avatar
                        label={status.reviews.reviewer.charAt(0)}
                        className="reviewer-avatar"
                      />
                      <div>
                        <h4 className="reviewer-name">
                          {status.reviews.reviewer}
                        </h4>
                        <Rating
                          value={status.ratings}
                          readOnly
                          cancel={false}
                          className="review-rating"
                        />
                      </div>
                    </div>
                    <p className="review-comment">{status.reviews.comment}</p>
                    <p className="review-date">
                      {new Date(status.reviews.date).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet</p>
            )}
          </TabPanel>
          <TabPanel header="Details" className="tab-panel">
            <div className="details-grid">
              <div className="details-column">
                <ul className="details-list">
                  <li className="detail-item">
                    <span className="detail-label">Publisher:</span>
                    <span className="detail-value">{book.publisher}</span>
                  </li>
                  <li className="detail-item">
                    <span className="detail-label">Publication Date:</span>
                    <span className="detail-value">
                      {new Date(book.publishDate).toLocaleDateString()}
                    </span>
                  </li>
                  <li className="detail-item">
                    <span className="detail-label">Language:</span>
                    <span className="detail-value">{book.language}</span>
                  </li>
                </ul>
              </div>
              <div className="details-column">
                <ul className="details-list">
                  <li className="detail-item">
                    <span className="detail-label">Pages:</span>
                    <span className="detail-value">{book.pages}</span>
                  </li>
                  <li className="detail-item">
                    <span className="detail-label">Weight:</span>
                    <span className="detail-value">
                      {book.weight} {book.weightUnit}
                    </span>
                  </li>
                  <li className="detail-item">
                    <span className="detail-label">ISBN:</span>
                    <span className="detail-value">{book._id}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
}
