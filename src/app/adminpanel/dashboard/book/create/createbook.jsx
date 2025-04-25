// "use client";
// import React, { useState, useEffect } from "react";
// import { InputText } from "primereact/inputtext";
// import { Calendar } from "primereact/calendar";
// import { InputSwitch } from "primereact/inputswitch";
// import { Button } from "primereact/button";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../CreateBookForm.css";
// import axios from "axios";
// import { API_BASE_URL } from "../../../utlis";
// import { Col, Row } from "react-bootstrap";
// import Cookies from "js-cookie";
// import "./createbook.css";
// import Swal from "sweetalert2";
// import { Editor } from "primereact/editor";

// const BookForm = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const accessToken = Cookies.get("accessToken");
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "Mathioli",
//     authorBiography:
//       "Mathioli Gita is an attempt to reach the words of Guru Pujyashri Mathioli Saraswathy to the reading public. The books written by Her provide people with a guide to improve their lives and make it more meaningful.Her thoughts are interwoven with stories in each chapter to make the reading simple and easy to understand. Reflecting or contemplating on the stories and underlying principles, will transform a person from within and make it easy for us to understand life and its vicissitudes.",

//     genre: "",
//     category: "",
//     publishDate: null,
//     publisher: "Mathioli",
//     language: "",
//     quantity: "",
//     pages: "",
//     description: "",
//     price: "",
//     isHardCopyAvailable: true,
//     isAudiobookAvailable: false,
//     isEBookAvailable: false,
//     books: [],
//     audiobooks: [],
//     ebooks: [],
//     audiobookPrice: "",
//     ebookPrice: "",
//     weightUnit: "kg",
//     weight: "",
//     slug: "",
//   });
//   console.log(formData, "formData");
//   const handleFileUpload = (files, setter) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [setter]: [...prevFormData[setter], ...files],
//     }));
//   };

//   const handleFileChange = (event, setter) => {
//     const files = Array.from(event.target.files);
//     handleFileUpload(files, setter);
//   };

//   const handleRemoveImage = (index, setter) => {
//     setFormData((prevFormData) => {
//       const updatedFiles = prevFormData[setter].filter((_, i) => i !== index);
//       return {
//         ...prevFormData,
//         [setter]: updatedFiles,
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     const payload = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key]) {
//         if (Array.isArray(formData[key])) {
//           formData[key].forEach((file, index) => {
//             payload.append(`${key}`, file);
//           });
//         } else {
//           payload.append(key, formData[key]);
//         }
//       }
//     });

//     try {
//       const response = await axios.post(`${API_BASE_URL}/book`, payload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(response, "response");
//       if (response.data.success) {
//         Swal.fire({
//           title: "Success!",
//           text: response.data.data.message,
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         window.location.href = "/adminpanel/dashboard/book";
//         // alert();
//         setFormData({
//           title: "",
//           author: "",
//           authorBiography: "",
//           genre: "",
//           quantity: "",
//           category: "",
//           publishDate: null,
//           publisher: "",
//           language: "",
//           pages: "",
//           description: "",
//           price: "",
//           isHardCopyAvailable: false,
//           awardWinningBook: false,
//           newArrival: false,
//           isAudiobookAvailable: false,
//           isEBookAvailable: false,
//           books: [],
//           audiobooks: [],
//           ebooks: [],
//           audiobookPrice: "",
//           ebookPrice: "",
//           weightUnit: "kg",
//           weight: "",
//           slug: "",
//         });
//       } else {
//         Swal.fire("Error creating book");
//       }
//     } catch (error) {
//       console.error("Error creating book:", error);
//       alert("Error creating book");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/category`, { headers });
//       setCategories(response.data.data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-5 m-2">
//       <div onClick={() => window.history.back("/")}>
//         <i className="pi pi-arrow-left"></i> Back
//       </div>
//       <div className="m-2">
//         <div className="m-auto" style={{ maxWidth: "1000px" }}>
//           <h4>Create Book</h4>
//           <Row>
//             <Col sm={12} md={12}>
//               <div className="">
//                 <label>Upload Book Images</label> <br />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => handleFileChange(e, "books")}
//                 />
//                 {formData.books.length > 0 && (
//                   <div>
//                     {formData.books.map((file, index) => (
//                       <div
//                         key={index}
//                         style={{
//                           position: "relative",
//                           display: "inline-block",
//                           margin: "5px",
//                         }}
//                       >
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={`Preview ${index}`}
//                           style={{ width: "100px", height: "100px" }}
//                         />
//                         <button
//                           style={{
//                             position: "absolute",
//                             top: "0",
//                             right: "0",
//                             background: "red",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "50%",
//                             cursor: "pointer",
//                           }}
//                           onClick={() => handleRemoveImage(index, "books")}
//                         >
//                           X
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Title</label> <br />
//                 <InputText
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter book title"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Slug</label> <br />
//                 <InputText
//                   value={formData.slug}
//                   onChange={(e) =>
//                     setFormData({ ...formData, slug: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Add the Slug name"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             {/* <Col>
//               <div className=" ">
//                 <label>Genre</label> <br />
//                 <InputText
//                   value={formData.genre}
//                   onChange={(e) =>
//                     setFormData({ ...formData, genre: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter genre"
//                 />
//               </div>
//             </Col> */}

//             <Col>
//               <div className=" ">
//                 <label>Category</label> <br />
//                 <Dropdown
//                   value={formData?.category}
//                   options={categories.map((item) => item.name)}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.value })
//                   }
//                   className="w-100"
//                   placeholder="Select a Category"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Price</label> <br />
//                 <InputText
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData({ ...formData, price: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter price"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               <div className=" ">
//                 <label>Author</label> <br />
//                 <InputText
//                   value={formData.author}
//                   onChange={(e) =>
//                     setFormData({ ...formData, author: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter author name"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Publish Date</label> <br />
//                 <Calendar
//                   value={formData.publishDate}
//                   onChange={(e) =>
//                     setFormData({ ...formData, publishDate: e.value })
//                   }
//                   className="w-100"
//                   placeholder="Select publish date"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               <div className=" ">
//                 <label>Publisher</label> <br />
//                 <InputText
//                   value={formData.publisher}
//                   onChange={(e) =>
//                     setFormData({ ...formData, publisher: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter publisher name"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Language</label> <br />
//                 <InputText
//                   value={formData.language}
//                   onChange={(e) =>
//                     setFormData({ ...formData, language: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter language"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               <div className=" ">
//                 <label>Pages</label> <br />
//                 <InputText
//                   value={formData.pages}
//                   onChange={(e) =>
//                     setFormData({ ...formData, pages: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter number of pages"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Quantity</label> <br />
//                 <InputText
//                   value={formData.quantity}
//                   onChange={(e) =>
//                     setFormData({ ...formData, quantity: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter quantity"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col sm={12}>
//               <div className="">
//                 <label>Author Biography</label> <br />
//                 <InputTextarea
//                   value={formData.authorBiography}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       authorBiography: e.target.value,
//                     })
//                   }
//                   rows={5}
//                   cols={30}
//                   className="w-100"
//                   placeholder="Enter author biography"
//                 />
//               </div>
//             </Col>
//             <Col sm={12}>
//               <div className=" ">
//                 <label>Description</label> <br />
//                 <Editor
//                   value={formData.description}
//                   onTextChange={(e) =>
//                     setFormData({ ...formData, description: e.htmlValue })
//                   }
//                   style={{ height: "320px" }}
//                   className="editor-container"
//                 />
//                 {/* <InputTextarea
//                   value={formData.description}
//                   rows={5}
//                   cols={30}
//                   className="w-100"
//                   placeholder="Enter book description"
//                 /> */}
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               <div className=" d-flex">
//                 <div className="">
//                   <InputSwitch
//                     checked={formData.isHardCopyAvailable}
//                     className="mr-3"
//                     onChange={(e) =>
//                       setFormData({ ...formData, isHardCopyAvailable: e.value })
//                     }
//                   />
//                 </div>
//                 <div className="">
//                   <label>Hard Copy Available</label> <br />
//                 </div>
//               </div>
//             </Col>
//             <Col>
//               <div className="d-flex">
//                 <div className="">
//                   <InputSwitch
//                     checked={formData.isAudiobookAvailable}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         isAudiobookAvailable: e.value,
//                       })
//                     }
//                     className="mr-3"
//                   />
//                 </div>
//                 <div className="">
//                   <label>Audiobook Available</label> <br />
//                 </div>
//               </div>
//             </Col>
//             {/* <Col>
//               <div className="d-flex">
//                 <div className="">
//                   <InputSwitch
//                     checked={formData.isEBookAvailable}
//                     onChange={(e) =>
//                       setFormData({ ...formData, isEBookAvailable: e.value })
//                     }
//                     className="mr-3"
//                   />
//                 </div>
//                 <div className="">
//                   <label>EBook Available</label> <br />
//                 </div>
//               </div>
//             </Col> */}

//             <Col>
//               <div className=" d-flex">
//                 <div className="">
//                   <InputSwitch
//                     checked={formData.awardWinningBook}
//                     className="mr-3"
//                     onChange={(e) =>
//                       setFormData({ ...formData, awardWinningBook: e.value })
//                     }
//                   />
//                 </div>
//                 <div className="">
//                   <label>Award Winning Book</label> <br />
//                 </div>
//               </div>
//             </Col>
//             <Col>
//               <div className=" d-flex">
//                 <div className="">
//                   <InputSwitch
//                     checked={formData.newArrival}
//                     className="mr-3"
//                     onChange={(e) =>
//                       setFormData({ ...formData, newArrival: e.value })
//                     }
//                   />
//                 </div>
//                 <div className="">
//                   <label>New Arrival</label> <br />
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             {formData?.isAudiobookAvailable && (
//               <Col sm={12} md={4}>
//                 <div className="mb-3">
//                   <label>Upload Audiobook Files</label>
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     multiple
//                     onChange={(e) => handleFileChange(e, "audiobooks")}
//                   />
//                 </div>
//               </Col>
//             )}
//             {formData?.isEBookAvailable && (
//               <Col sm={12} md={4}>
//                 <div className=" mb-3">
//                   <div className="">
//                     <label>Upload Ebook Files</label> <br />
//                   </div>
//                   <div className="">
//                     <input
//                       type="file"
//                       accept=".pdf,.epub"
//                       multiple
//                       onChange={(e) => handleFileChange(e, "ebooks")}
//                     />
//                   </div>
//                 </div>
//               </Col>
//             )}
//           </Row>

//           <Row>
//             {formData?.isAudiobookAvailable && (
//               <Col>
//                 <div className=" ">
//                   <label>Audiobook Price</label> <br />
//                   <InputText
//                     value={formData.audiobookPrice}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         audiobookPrice: e.target.value,
//                       })
//                     }
//                     className="w-100"
//                     placeholder="Enter audiobook price"
//                   />
//                 </div>
//               </Col>
//             )}
//             {formData?.isEBookAvailable && (
//               <Col>
//                 <div className=" ">
//                   <label>EBook Price</label> <br />
//                   <InputText
//                     value={formData.ebookPrice}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ebookPrice: e.target.value })
//                     }
//                     className="w-100"
//                     placeholder="Enter ebook price"
//                   />
//                 </div>
//               </Col>
//             )}
//           </Row>

//           <Row>
//             <Col>
//               <div className=" ">
//                 <label>Weight</label> <br />
//                 <InputText
//                   value={formData.weight}
//                   onChange={(e) =>
//                     setFormData({ ...formData, weight: e.target.value })
//                   }
//                   className="w-100"
//                   placeholder="Enter weight"
//                 />
//               </div>
//             </Col>
//             <Col>
//               <div className=" ">
//                 <label>Weight Unit</label> <br />
//                 <Dropdown
//                   value={formData.weightUnit}
//                   options={["kg", "g", "lb", "oz"]}
//                   onChange={(e) =>
//                     setFormData({ ...formData, weightUnit: e.value })
//                   }
//                   className="w-100"
//                   placeholder="Select a Unit"
//                 />
//               </div>
//             </Col>
//           </Row>

//           <div className="p-grid">
//             <div className="btn-change">
//               <Button label="Submit" onClick={handleSubmit} />
//             </div>
//             <Button
//               label="Close"
//               className="p-button-secondary d-none"
//               onClick={() => setIsPopupVisible(false)}
//               // className=''
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookForm;
"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CreateBookForm.css";
import axios from "axios";
import { API_BASE_URL } from "../../../utlis";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import "./createbook.css";
import Swal from "sweetalert2";
import { Editor } from "primereact/editor";
import * as yup from "yup";
import { useFormik } from "formik";

const BookForm = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const accessToken = Cookies.get("accessToken");

  // Validation Schema
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    slug: yup
      .string()
      .required("Slug is required")
      .matches(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens"
      ),
    category: yup.string().required("Category is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive")
      .typeError("Price must be a number"),
    author: yup.string().required("Author is required"),
    publishDate: yup
      .date()
      .required("Publish date is required")
      .max(new Date(), "Publish date cannot be in the future"),
    publisher: yup.string().required("Publisher is required"),
    language: yup.string().required("Language is required"),
    pages: yup
      .number()
      .required("Pages is required")
      .positive("Pages must be positive")
      .integer("Pages must be an integer"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    authorBiography: yup
      .string()
      .required("Author biography is required")
      .min(50, "Author biography should be at least 50 characters"),
    description: yup.string().required("Description is required"),
    // .min(100, "Description should be at least 100 characters"),
    books: yup
      .array()
      .min(1, "At least one book image is required")
      .test(
        "fileSize",
        "Each file must be less than 2MB",
        (value) => !value || value.every((file) => file.size <= 2000000)
      )
      .test(
        "fileType",
        "Only image files are allowed",
        (value) =>
          !value || value.every((file) => file.type.startsWith("image/"))
      ),
    audiobookPrice: yup.number().when("isAudiobookAvailable", {
      is: true,
      then: yup
        .number()
        .required("Audiobook price is required when audiobook is available")
        .positive("Audiobook price must be positive")
        .typeError("Audiobook price must be a number"),
    }),
    ebookPrice: yup.number().when("isEBookAvailable", {
      is: true,
      then: yup
        .number()
        .required("Ebook price is required when ebook is available")
        .positive("Ebook price must be positive")
        .typeError("Ebook price must be a number"),
    }),
    weight: yup
      .number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    weightUnit: yup.string().required("Weight unit is required"),
    audiobooks: yup.array().when("isAudiobookAvailable", {
      is: true,
      then: yup
        .array()
        .min(1, "At least one audiobook file is required")
        .test(
          "fileSize",
          "Each file must be less than 10MB",
          (value) => !value || value.every((file) => file.size <= 10000000)
        )
        .test(
          "fileType",
          "Only audio files are allowed",
          (value) =>
            !value || value.every((file) => file.type.startsWith("audio/"))
        ),
    }),
    ebooks: yup.array().when("isEBookAvailable", {
      is: true,
      then: yup
        .array()
        .min(1, "At least one ebook file is required")
        .test(
          "fileSize",
          "Each file must be less than 5MB",
          (value) => !value || value.every((file) => file.size <= 5000000)
        )
        .test(
          "fileType",
          "Only PDF or EPUB files are allowed",
          (value) =>
            !value ||
            value.every(
              (file) =>
                file.type === "application/pdf" ||
                file.name.endsWith(".epub") ||
                file.type === "application/epub+zip"
            )
        ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "Mathioli",
      authorBiography:
        "Mathioli Gita is an attempt to reach the words of Guru Pujyashri Mathioli Saraswathy to the reading public. The books written by Her provide people with a guide to improve their lives and make it more meaningful.Her thoughts are interwoven with stories in each chapter to make the reading simple and easy to understand. Reflecting or contemplating on the stories and underlying principles, will transform a person from within and make it easy for us to understand life and its vicissitudes.",
      genre: "",
      category: "",
      publishDate: null,
      publisher: "Mathioli",
      language: "",
      quantity: "",
      pages: "",
      description: "",
      price: "",
      isHardCopyAvailable: true,
      isAudiobookAvailable: false,
      isEBookAvailable: false,
      books: [],
      audiobooks: [],
      ebooks: [],
      audiobookPrice: "",
      ebookPrice: "",
      weightUnit: "kg",
      weight: "",
      slug: "",
      awardWinningBook: false,
      newArrival: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = new FormData();
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            if (Array.isArray(values[key])) {
              values[key].forEach((file, index) => {
                payload.append(`${key}`, file);
              });
            } else {
              payload.append(key, values[key]);
            }
          }
        });

        const response = await axios.post(`${API_BASE_URL}/book`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          Swal.fire({
            title: "Success!",
            text: response.data.data.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.href = "/adminpanel/dashboard/book";
        } else {
          Swal.fire("Error creating book");
        }
      } catch (error) {
        console.error("Error creating book:", error);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Error creating book",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleFileUpload = (files, setter) => {
    formik.setFieldValue(setter, [...formik.values[setter], ...files]);
  };

  const handleFileChange = (event, setter) => {
    const files = Array.from(event.target.files);
    handleFileUpload(files, setter);
  };

  const handleRemoveImage = (index, setter) => {
    const updatedFiles = formik.values[setter].filter((_, i) => i !== index);
    formik.setFieldValue(setter, updatedFiles);
  };

  const fetchCategories = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/category`, { headers });
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-5 m-2">
      <div onClick={() => window.history.back("/")}>
        <i className="pi pi-arrow-left"></i> Back
      </div>
      <div className="m-2">
        <div className="m-auto" style={{ maxWidth: "1000px" }}>
          <h4>Create Book</h4>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={12}>
                <div className="mb-3">
                  <label>Upload Book Images</label> <br />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "books")}
                  />
                  {formik.touched.books && formik.errors.books && (
                    <div className="text-danger">{formik.errors.books}</div>
                  )}
                  {formik.values.books.length > 0 && (
                    <div className="mt-2">
                      {formik.values.books.map((file, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            display: "inline-block",
                            margin: "5px",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            style={{ width: "100px", height: "100px" }}
                          />
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRemoveImage(index, "books")}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Title*</label> <br />
                  <InputText
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.title && formik.errors.title
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter book title"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <small className="p-error">{formik.errors.title}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Slug*</label> <br />
                  <InputText
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.slug && formik.errors.slug
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Add the Slug name"
                  />
                  {formik.touched.slug && formik.errors.slug && (
                    <small className="p-error">{formik.errors.slug}</small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label>Category*</label> <br />
                  <Dropdown
                    name="category"
                    value={formik.values.category}
                    options={categories.map((item) => item.name)}
                    onChange={(e) => formik.setFieldValue("category", e.value)}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.category && formik.errors.category
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Select a Category"
                  />
                  {formik.touched.category && formik.errors.category && (
                    <small className="p-error">{formik.errors.category}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Price*</label> <br />
                  <InputText
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.price && formik.errors.price
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter price"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <small className="p-error">{formik.errors.price}</small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label>Author*</label> <br />
                  <InputText
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.author && formik.errors.author
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter author name"
                  />
                  {formik.touched.author && formik.errors.author && (
                    <small className="p-error">{formik.errors.author}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Publish Date*</label> <br />
                  <Calendar
                    name="publishDate"
                    value={formik.values.publishDate}
                    onChange={(e) =>
                      formik.setFieldValue("publishDate", e.value)
                    }
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.publishDate && formik.errors.publishDate
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Select publish date"
                    showIcon
                  />
                  {formik.touched.publishDate && formik.errors.publishDate && (
                    <small className="p-error">
                      {formik.errors.publishDate}
                    </small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label>Publisher*</label> <br />
                  <InputText
                    name="publisher"
                    value={formik.values.publisher}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.publisher && formik.errors.publisher
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter publisher name"
                  />
                  {formik.touched.publisher && formik.errors.publisher && (
                    <small className="p-error">{formik.errors.publisher}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Language*</label> <br />
                  <InputText
                    name="language"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.language && formik.errors.language
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter language"
                  />
                  {formik.touched.language && formik.errors.language && (
                    <small className="p-error">{formik.errors.language}</small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label>Pages*</label> <br />
                  <InputText
                    name="pages"
                    value={formik.values.pages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.pages && formik.errors.pages
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter number of pages"
                  />
                  {formik.touched.pages && formik.errors.pages && (
                    <small className="p-error">{formik.errors.pages}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Quantity*</label> <br />
                  <InputText
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.quantity && formik.errors.quantity
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter quantity"
                  />
                  {formik.touched.quantity && formik.errors.quantity && (
                    <small className="p-error">{formik.errors.quantity}</small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <div className="mb-3">
                  <label>Author Biography*</label> <br />
                  <InputTextarea
                    name="authorBiography"
                    value={formik.values.authorBiography}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={5}
                    cols={30}
                    className={`w-100 ${
                      formik.touched.authorBiography &&
                      formik.errors.authorBiography
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter author biography"
                  />
                  {formik.touched.authorBiography &&
                    formik.errors.authorBiography && (
                      <small className="p-error">
                        {formik.errors.authorBiography}
                      </small>
                    )}
                </div>
              </Col>
              <Col sm={12}>
                <div className="mb-3">
                  <label>Description*</label> <br />
                  <Editor
                    name="description"
                    value={formik.values.description}
                    onTextChange={(e) =>
                      formik.setFieldValue("description", e.htmlValue)
                    }
                    onBlur={() => formik.setFieldTouched("description", true)}
                    style={{ height: "320px" }}
                    className={`editor-container ${
                      formik.touched.description && formik.errors.description
                        ? "border-danger"
                        : ""
                    }`}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <small className="p-error">
                      {formik.errors.description}
                    </small>
                  )}
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <div className="d-flex align-items-center">
                  <InputSwitch
                    checked={formik.values.isHardCopyAvailable}
                    onChange={(e) =>
                      formik.setFieldValue("isHardCopyAvailable", e.value)
                    }
                    className="mr-3"
                  />
                  <label>Hard Copy Available</label>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <InputSwitch
                    checked={formik.values.isAudiobookAvailable}
                    onChange={(e) =>
                      formik.setFieldValue("isAudiobookAvailable", e.value)
                    }
                    className="mr-3"
                  />
                  <label>Audiobook Available</label>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <InputSwitch
                    checked={formik.values.awardWinningBook}
                    onChange={(e) =>
                      formik.setFieldValue("awardWinningBook", e.value)
                    }
                    className="mr-3"
                  />
                  <label>Award Winning Book</label>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <InputSwitch
                    checked={formik.values.newArrival}
                    onChange={(e) =>
                      formik.setFieldValue("newArrival", e.value)
                    }
                    className="mr-3"
                  />
                  <label>New Arrival</label>
                </div>
              </Col>
            </Row>

            {formik.values.isAudiobookAvailable && (
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <div className="mb-3">
                    <label>Upload Audiobook Files*</label>
                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={(e) => handleFileChange(e, "audiobooks")}
                    />
                    {formik.touched.audiobooks && formik.errors.audiobooks && (
                      <div className="text-danger">
                        {formik.errors.audiobooks}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="mb-3">
                    <label>Audiobook Price*</label> <br />
                    <InputText
                      name="audiobookPrice"
                      value={formik.values.audiobookPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-100 ${
                        formik.touched.audiobookPrice &&
                        formik.errors.audiobookPrice
                          ? "p-invalid"
                          : ""
                      }`}
                      placeholder="Enter audiobook price"
                    />
                    {formik.touched.audiobookPrice &&
                      formik.errors.audiobookPrice && (
                        <small className="p-error">
                          {formik.errors.audiobookPrice}
                        </small>
                      )}
                  </div>
                </Col>
              </Row>
            )}

            {formik.values.isEBookAvailable && (
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <div className="mb-3">
                    <label>Upload Ebook Files*</label>
                    <input
                      type="file"
                      accept=".pdf,.epub"
                      multiple
                      onChange={(e) => handleFileChange(e, "ebooks")}
                    />
                    {formik.touched.ebooks && formik.errors.ebooks && (
                      <div className="text-danger">{formik.errors.ebooks}</div>
                    )}
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="mb-3">
                    <label>EBook Price*</label> <br />
                    <InputText
                      name="ebookPrice"
                      value={formik.values.ebookPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-100 ${
                        formik.touched.ebookPrice && formik.errors.ebookPrice
                          ? "p-invalid"
                          : ""
                      }`}
                      placeholder="Enter ebook price"
                    />
                    {formik.touched.ebookPrice && formik.errors.ebookPrice && (
                      <small className="p-error">
                        {formik.errors.ebookPrice}
                      </small>
                    )}
                  </div>
                </Col>
              </Row>
            )}

            <Row>
              <Col>
                <div className="mb-3">
                  <label>Weight*</label> <br />
                  <InputText
                    name="weight"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.weight && formik.errors.weight
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Enter weight"
                  />
                  {formik.touched.weight && formik.errors.weight && (
                    <small className="p-error">{formik.errors.weight}</small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label>Weight Unit*</label> <br />
                  <Dropdown
                    name="weightUnit"
                    value={formik.values.weightUnit}
                    options={["kg", "g", "lb", "oz"]}
                    onChange={(e) =>
                      formik.setFieldValue("weightUnit", e.value)
                    }
                    onBlur={formik.handleBlur}
                    className={`w-100 ${
                      formik.touched.weightUnit && formik.errors.weightUnit
                        ? "p-invalid"
                        : ""
                    }`}
                    placeholder="Select a Unit"
                  />
                  {formik.touched.weightUnit && formik.errors.weightUnit && (
                    <small className="p-error">
                      {formik.errors.weightUnit}
                    </small>
                  )}
                </div>
              </Col>
            </Row>

            <div className="p-grid mt-4">
              <Button
                type="submit"
                label="Submit"
                className="p-button-primary"
                disabled={!formik.isValid || formik.isSubmitting}
              />
              <Button
                label="Close"
                className="p-button-secondary ml-2"
                onClick={() => setIsPopupVisible(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
