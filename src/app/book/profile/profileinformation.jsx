// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Divider } from 'primereact/divider';
// import { Button } from 'primereact/button';
// import axios from 'axios';
// import { Col, Row } from 'react-bootstrap';
// import { ProfileUserPatch } from 'api/page';

// const ProfileInformation = ({ user  }) => {
//   console.log(user);

//   const formik = useFormik({
//     initialValues: {
//       firstName: user?.firstName,
//       lastName: user?.lastName || "",
//       email: user?.email || "",
//       mobile: user?.mobile || "",
//       address: user?.address || "",
//       profileImage: null,
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required('First Name is required'),
//       lastName: Yup.string().required('Last Name is required'),
//       email: Yup.string().email('Invalid email format').required('Email is required'),
//       mobile: Yup.string().required('Mobile number is required'),
//       address: Yup.string().required('Address is required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         Object.keys(values).forEach((key) => {
//           if (key === 'profileImage' && values.profileImage) {
//             formData.append(key, values.profileImage);
//           } else {
//             formData.append(key, values[key]);
//           }
//         });

//         const response = await ProfileUserPatch(formData)
//         console.log('Profile updated:', response.data);
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Row>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="firstName" className='mb-1'>First Name</label><br />
//             <InputText id="firstName" {...formik.getFieldProps('firstName')} className="p-inputtext-lg w-100" />
//             {formik.touched.firstName && formik.errors.firstName ? <div className="text-danger">{formik.errors.firstName}</div> : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="lastName" className='mb-1'>Last Name</label><br />
//             <InputText id="lastName" {...formik.getFieldProps('lastName')} className="p-inputtext-lg w-100" />
//             {formik.touched.lastName && formik.errors.lastName ? <div className="text-danger">{formik.errors.lastName}</div> : null}
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="email" className='mb-1'>Email Address</label><br />
//             <InputText id="email" {...formik.getFieldProps('email')} className="p-inputtext-lg w-100" />
//             {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="mobile" className='mb-1'>Mobile Number</label><br />
//             <InputText id="mobile" {...formik.getFieldProps('mobile')} className="p-inputtext-lg w-100" />
//             {formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null}
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12} md={12}>
//           <div className="text-start">
//             <label htmlFor="address" className='mb-1'>Address</label><br />
//             <InputTextarea id="address" {...formik.getFieldProps('address')} className="p-inputtext-lg w-100" />
//             {formik.touched.address && formik.errors.address ? <div className="text-danger">{formik.errors.address}</div> : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6} className='d-none'>
//           <div className="text-start mb-3">
//             <label htmlFor="profileImage" className='mb-1'>Profile Image</label><br />
//             <input
//               id="profileImage"
//               type="file"
//               accept="image/*"
//               onChange={(event) => formik.setFieldValue('profileImage', event.currentTarget.files[0])}
//             />
//           </div>
//         </Col>
//       </Row>

//       <Divider />
//       <div className=" profile-contents-button  ">

//         <Button className=" profile-buttonssssss-buttons" onClick={() => onNavigate("Profile")}>
//        Save
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProfileInformation;
// import React, { useContext, useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Divider } from "primereact/divider";
// import { Button } from "primereact/button";
// import { Col, Row } from "react-bootstrap";
// import { ProfileUser, ProfileUserPatch } from "api/page";
// import userContext from "@/app/UseContext/UseContext";

// const ProfileInformation = () => {
//   const { usersdata, setusersdata } = useContext(userContext);
//   const user = usersdata;
//   const [isEditing, setIsEditing] = useState(false);
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     // if (accessToken) {
//     const fetchdata = async () => {
//       try {
//         const response = await ProfileUser();
//         setusersdata(response?.data);
//         setData(response.data);
//         console.log(response.data, "fetchdata");
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchdata();
//     // }
//   }, []);
//   const formik = useFormik({
//     initialValues: {
//       firstName: usersdata?.firstName || data?.firstName,
//       lastName: usersdata?.lastName || data?.lastName || "",
//       email: usersdata?.email || data?.email || "",
//       mobile: usersdata?.mobile || data?.mobile || "",
//       address: usersdata?.address || data?.address || "",
//       profileImage: null,
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First Name is required"),
//       lastName: Yup.string().required("Last Name is required"),
//       email: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//       mobile: Yup.string().required("Mobile number is required"),
//       address: Yup.string().required("Address is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         Object.keys(values).forEach((key) => {
//           if (key === "profileImage" && values.profileImage) {
//             formData.append(key, values.profileImage);
//           } else {
//             formData.append(key, values[key]);
//           }
//         });

//         const response = await ProfileUserPatch(formData);
//         console.log("Profile updated:", response.data);
//         setIsEditing(false); // Disable editing after submission
//       } catch (error) {
//         console.error("Error updating profile:", error);
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Row>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="firstName" className="mb-1">
//               First Name
//             </label>
//             <br />
//             <InputText
//               id="firstName"
//               {...formik.getFieldProps("firstName")}
//               className="p-inputtext-lg w-100"
//               disabled={!isEditing}
//             />
//             {formik.touched.firstName && formik.errors.firstName ? (
//               <div className="text-danger">{formik.errors.firstName}</div>
//             ) : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="lastName" className="mb-1">
//               Last Name
//             </label>
//             <br />
//             <InputText
//               id="lastName"
//               {...formik.getFieldProps("lastName")}
//               className="p-inputtext-lg w-100"
//               disabled={!isEditing}
//             />
//             {formik.touched.lastName && formik.errors.lastName ? (
//               <div className="text-danger">{formik.errors.lastName}</div>
//             ) : null}
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="email" className="mb-1">
//               Email Address
//             </label>
//             <br />
//             <InputText
//               id="email"
//               {...formik.getFieldProps("email")}
//               className="p-inputtext-lg w-100"
//               disabled={!isEditing}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="text-danger">{formik.errors.email}</div>
//             ) : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6}>
//           <div className="text-start mb-3">
//             <label htmlFor="mobile" className="mb-1">
//               Mobile Number
//             </label>
//             <br />
//             <InputText
//               id="mobile"
//               {...formik.getFieldProps("mobile")}
//               className="p-inputtext-lg w-100"
//               disabled={!isEditing}
//             />
//             {formik.touched.mobile && formik.errors.mobile ? (
//               <div className="text-danger">{formik.errors.mobile}</div>
//             ) : null}
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12} md={12}>
//           <div className="text-start">
//             <label htmlFor="address" className="mb-1">
//               Address
//             </label>
//             <br />
//             <InputTextarea
//               id="address"
//               {...formik.getFieldProps("address")}
//               className="p-inputtext-lg w-100"
//               disabled={!isEditing}
//             />
//             {formik.touched.address && formik.errors.address ? (
//               <div className="text-danger">{formik.errors.address}</div>
//             ) : null}
//           </div>
//         </Col>
//         <Col sm={12} md={6} className="d-none">
//           <div className="text-start mb-3">
//             <label htmlFor="profileImage" className="mb-1">
//               Profile Image
//             </label>
//             <br />
//             <input
//               id="profileImage"
//               type="file"
//               accept="image/*"
//               onChange={(event) =>
//                 formik.setFieldValue(
//                   "profileImage",
//                   event.currentTarget.files[0]
//                 )
//               }
//               disabled={!isEditing}
//             />
//           </div>
//         </Col>
//       </Row>

//       <Divider />
//       <div className="profile-contents-button">
//         {isEditing ? (
//           <Button className="profile-buttonssssss-buttons" type="submit">
//             Save
//           </Button>
//         ) : (
//           <Button
//             className="profile-buttonssssss-buttons"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default ProfileInformation;

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Col, Row } from "react-bootstrap";
import { ProfileUser, ProfileUserPatch } from "api/page";
import userContext from "@/app/UseContext/UseContext";
import Swal from "sweetalert2";

const ProfileInformation = ({ isEditing, user, setIsEditing }) => {
  const { usersdata, setusersdata } = useContext(userContext);
  console.log(isEditing, "da");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await ProfileUser();
        setusersdata(response?.data);
        setData(response.data);
        console.log(response.data, "fetchdata");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchdata();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || data?.firstName || "",
      lastName: user?.lastName || data?.lastName || "",
      email: user?.email || data?.email || "",
      mobile: user?.mobile || data?.mobile || "",
      address: user?.address || data?.address || "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "profileImage" && values.profileImage) {
            formData.append(key, values.profileImage);
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await ProfileUserPatch(formData);
        console.log("Profile updated:", response.data);

        if (response.success) {
          Swal.fire("Success", "Success");
        }

        setIsEditing(false); // Disable editing after submission
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <br />
            {isEditing ? (
              <InputText
                id="firstName"
                {...formik.getFieldProps("firstName")}
                className="p-inputtext-lg w-100"
              />
            ) : (
              <div>{data?.firstName}</div>
            )}
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-danger">{formik.errors.firstName}</div>
            ) : null}
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <br />
            {isEditing ? (
              <InputText
                id="lastName"
                {...formik.getFieldProps("lastName")}
                className="p-inputtext-lg w-100"
              />
            ) : (
              <div>{data?.lastName}</div>
            )}
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-danger">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="email" className="mb-1">
              Email Address
            </label>
            <br />
            {isEditing ? (
              <InputText
                id="email"
                {...formik.getFieldProps("email")}
                className="p-inputtext-lg w-100"
              />
            ) : (
              <div>{data?.email}</div>
            )}
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="mobile" className="mb-1">
              Mobile Number
            </label>
            <br />
            {isEditing ? (
              <InputText
                id="mobile"
                {...formik.getFieldProps("mobile")}
                className="p-inputtext-lg w-100"
              />
            ) : (
              <div>{data?.mobile}</div>
            )}
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-danger">{formik.errors.mobile}</div>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <div className="text-start">
            <label htmlFor="address" className="mb-1">
              Address
            </label>
            <br />
            {isEditing ? (
              <InputTextarea
                id="address"
                {...formik.getFieldProps("address")}
                className="p-inputtext-lg w-100"
              />
            ) : (
              <div>{data?.address}</div>
            )}
            {formik.touched.address && formik.errors.address ? (
              <div className="text-danger">{formik.errors.address}</div>
            ) : null}
          </div>
        </Col>
        <Col sm={12} md={6} className="">
          <div className="text-start mb-3">
            <label htmlFor="profileImage" className="mb-1">
              Profile Image
            </label>
            <br />
            {/* {isEditing && ( */}
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue(
                  "profileImage",
                  event.currentTarget.files[0]
                )
              }
            />
            {/* )} */}
          </div>
        </Col>
      </Row>

      <Divider />
      <div className="profile-contents-button">
        {isEditing ? (
          <div className="d-flex " style={{ justifyContent: "space-between" }}>
            <div>
              <Button
                className="profile-buttonssssss-buttons"
                type="submit"
                style={{ border: "1px solid #1d5755" }}
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                style={{ border: "1px solid #1d5755" }}
                className="profile-buttonssssss-buttons"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ProfileInformation;
