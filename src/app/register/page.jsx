// "use client";
// import React, { useContext, useRef, useState } from "react";
// // import axios from "axios";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// // import { Dropdown } from "primereact/dropdown";
// import { FcGoogle } from "react-icons/fc";
// import { Password } from "primereact/password";
// // import { API_BASE_URL } from "../utils";
// import { Toast } from "primereact/toast";
// import { UsersRegisterAPi } from "api/page";
// import { useRouter } from "next/navigation";
// import userContext from "../UseContext/UseContext";

// function Register({ visible, onHide }) {
//   const toast = useRef(null);
//   const { regsiterPopup, loginpoup } = useContext(userContext);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     mobile: "+91",
//   });

//   // const [selectedCountry, setSelectedCountry] = useState("+91");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Handle country code change
//   // const onCountryChange = (e) => {
//   //   setSelectedCountry(e.value);
//   // };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//       mobile: formData.mobile.replace("+91", "").trim(), // Remove +91 prefix
//     };

//     try {
//       const response = await UsersRegisterAPi(payload);

//       if (response.success == true) {
//         // alert("coming");
//         toast.current.show({
//           severity: "success",
//           summary: "Login Successful",
//           detail: response?.data?.message,
//           life: 3000,
//         });

//         // Use a timeout to delay the hiding of the component
//         setTimeout(() => {
//           onHide();
//         }, 3000); // Match this delay with the toast's life duration

//         // router.push("/")
//       } else {
//         toast.current.show({
//           severity: "error",
//           summary: "Login Failed",
//           detail: response?.data?.errors,
//           life: 3000,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.current.show({
//         severity: "error",
//         summary: "Login Failed",
//         detail: "An error occurred during login.",
//         life: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const countries = [
//   //   { code: "+91" },
//   //   { code: "+1" },
//   //   { code: "+44" },
//   //   { code: "+61" },
//   //   { code: "+33" },
//   // ];

//   return (
//     visible && (
//       <>
//         <Toast ref={toast} />
//         <div className="modal-overlay" onClick={onHide}></div>
//         <div className="login-modal">
//           <div className="content p-1">
//             <div className="d-flex justify-content-center">
//               <img src="/image/Logo black.svg" alt="Logo" width={"200px"} />
//             </div>
//             <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
//               Welcome back!
//             </p>
//             <span
//               className="d-flex justify-content-center"
//               style={{
//                 fontSize: "12px",
//                 color: "#4D4D4D",
//                 fontWeight: "200",
//               }}
//             >
//               Register in to continue to MATHIOLI
//             </span>
//             <form onSubmit={handleSubmit} className="m-auto mt-2">
//               {/* Country Code Dropdown */}

//               {/* Email Input */}
//               <div className="p-my-2 d-flex">
//                 <div>
//                   <InputText
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder="Enter firstName"
//                     className="p-inputtext w-100"
//                     required
//                   />
//                 </div>

//                 <div className="ms-3">
//                   <InputText
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder="Enter lastName"
//                     className="p-inputtext w-100"
//                     required
//                   />
//                 </div>
//               </div>
//               {/* Email Input */}

//               {/* Email Input */}
//               <div className=" mt-2">
//                 <InputText
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className=" w-100"
//                 />
//               </div>

//               {/* Password Input */}
//               <div className=" mt-2 login-password">
//                 <Password
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className=" w-100 "
//                   toggleMask
//                 />
//               </div>
//               {/* Phone Number Input */}
//               <div className="p-d-flex">
//                 {/* <Dropdown
//                   value={selectedCountry}
//                   options={countries}
//                   onChange={onCountryChange}
//                   optionLabel="code"
//                   placeholder="+91"
//                   className="w-0"
//                   style={{ width: "0px", minWidth: "85px" }}
//                 /> */}
//                 <InputText
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   className="w-100 mt-2 "
//                 />
//               </div>
//               {/* Submit Button */}
//               <Button
//                 label="Continue"
//                 className="w-100 mt-2"
//                 type="submit"
//                 loading={loading}
//                 style={{ background: "#396664" }}
//               />

//               {/* <span className="d-flex justify-content-center">OR</span>

//               {/* Google Login Button */}
//               {/* <div
//                 className="d-flex justify-content-center"
//                 style={{
//                   // cursor: loading ? "not-allowed" : "pointer",
//                   cursor: "not-allowed",
//                   // border: "1px solid black",
//                   border: "0px",
//                   borderRadius: "10px",
//                   padding: "10px",
//                   opacity: loading ? 0.5 : 1,
//                   backgroundColor: "#e7e7e7",
//                 }}
//                 disabled={loading}
//               >
//                 <FcGoogle className="fs-3" />
//                 <span className="ms-2">Continue via Google</span>
//               </div> */}
//             </form>
//             <div className="mt-4">
//               <p>
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => {
//                     loginpoup();
//                     regsiterPopup();
//                   }}
//                   style={{
//                     cursor: "pointer",
//                     textDecoration: "underline",
//                     color: "blue",
//                   }}
//                 >
//                   Login{" "}
//                 </span>
//                 here
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
//     )
//   );
// }

// export default Register;
"use client";
import React, { useContext, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import userContext from "../UseContext/UseContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UsersRegisterAPi } from "../../../api/page";

function Register({ visible, onHide }) {
  const toast = useRef(null);
  const { regsiterPopup, loginpoup } = useContext(userContext);
  const router = useRouter();

  // Define the initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "+91",
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile: Yup.string()
      // .matches(/^\+91\d{10}$/, "Invalid mobile number")
      .required("Mobile number is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      mobile: values.mobile.replace("+91", "").trim(), // Remove +91 prefix
    };

    try {
      const response = await UsersRegisterAPi(payload);

      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: "Registration Successful",
          detail: response?.data?.message,
          life: 3000,
        });

        // Use a timeout to delay the hiding of the component
        setTimeout(() => {
          onHide();
        }, 3000); // Match this delay with the toast's life duration
        loginpoup();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Registration Failed",
          detail: response?.data?.errors,
          life: 3000,
        });
      }
    } catch (error) {
      // console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Registration Failed",
        detail: "An error occurred during registration.",
        life: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    visible && (
      <>
        <Toast ref={toast} />
        <div className="modal-overlay" onClick={onHide}></div>
        <div className="login-modal">
          <div
            className="d-flex "
            style={{
              justifyContent: "end",
            }}
            onClick={onHide}
          >
            <i
              className="pi pi-times "
              style={{
                color: "rgb(177 181 184) ",
              }}
            ></i>
          </div>
          <div className="content p-1">
            <div className="d-flex justify-content-center">
              <img src="/image/Logo black.svg" alt="Logo" width={"200px"} />
            </div>
            <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
              Welcome back!
            </p>
            <span
              className="d-flex justify-content-center"
              style={{
                fontSize: "12px",
                color: "#4D4D4D",
                fontWeight: "200",
              }}
            >
              Register to continue to MATHIOLI
            </span>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="m-auto mt-2">
                  <div className="p-my-2 d-flex">
                    <div>
                      <Field
                        name="firstName"
                        as={InputText}
                        placeholder="Enter FirstName"
                        className="p-inputtext w-100"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error text-danger"
                      />
                    </div>
                    <div className="ms-3">
                      <Field
                        name="lastName"
                        as={InputText}
                        placeholder="Enter LastName"
                        className="p-inputtext w-100"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error text-danger"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Field
                      name="email"
                      as={InputText}
                      placeholder="Enter Email"
                      className="w-100"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="mt-2 login-password">
                    <Field
                      name="password"
                      as={Password}
                      placeholder="Enter Password"
                      className="w-100"
                      toggleMask
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="p-d-flex">
                    <Field
                      name="mobile"
                      as={InputText}
                      placeholder="Enter Phone number"
                      className="w-100 mt-2"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <Button
                    label="Continue"
                    className="w-100 mt-2"
                    type="submit"
                    loading={isSubmitting}
                    style={{ background: "#396664" }}
                  />
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    loginpoup();
                    regsiterPopup();
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  Login
                </span>{" "}
                here
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Register;
