// "use client"
// import React, { useState } from "react";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// // import "./login.css";
// import { FcGoogle } from "react-icons/fc";

// function Register({ visible, onHide }) {
//   const [formData, setFormData] = useState({
//     firstName:"",
//     lastName:"",
//     email: "",
//     password: "",
//     mobile:""

//   });

//   const [selectedCountry, setSelectedCountry] = useState("+91");

//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle phone number input change
//   const onPhoneChange = (e) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       phoneNumber: value,
//     });
//   };

//   // Handle country code dropdown change
//   const onCountryChange = (e) => {
//     setSelectedCountry(e.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       email: formData.email,
//       password: formData.password,
//       phoneNumber: selectedCountry + formData.phoneNumber, // Add country code with phone number
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8001/api/v1/users/login",
//         payload
//       );

//       if (response.status === 200) {
//         // Handle successful login (e.g., store token, redirect to dashboard, etc.)
//         localStorage.setItem("authToken", response.data.token);
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const countries = [
//     { code: "+91" },
//     { code: "+1" },
//     { code: "+44" },
//     { code: "+61" },
//     { code: "+1" },
//     // Add more country codes as needed
//   ];

//   return (
//     visible && (
//       <>
//         <div className="modal-overlay" onClick={onHide}></div>
//         <div className="login-modal">
//           <div className="content p-4">
//             <div className=" d-flex justify-content-center">
//               <img src="./image/Final-Logo 2.png" alt="Logo" />
//             </div>
//             <p className="text-center fs-5" style={{ color: "#4D4D4D" }}>
//               Welcome back !
//             </p>
//             <span
//               className="d-flex justify-content-center"
//               style={{ fontSize: "12px", color: "#4D4D4D", fontWeight: "200" }}
//             >
//               Login in to continue to MATHIOLI
//             </span>
//             <form onSubmit={handleSubmit} className="m-auto mt-4">
//               {/* Country Code Dropdown */}
//               <span style={{ color: "#396664" }} className="fw-bold">
//                 <i className=" pi pi-lock "></i> Your information is safe with
//                 us
//               </span>
//               {/* Phone Number Input */}
//               <div className="p-d-flex">
//                 {/* <span className="p-inputgroup"> */}
//                 {/* Country code */}
//                 <Dropdown
//                   value={selectedCountry}
//                   options={countries}
//                   onChange={onCountryChange}
//                   optionLabel="code" // Show only the country code
//                   placeholder="+91"
//                   className="w-0 "
//                   style={{ width: "0px", minWidth: "85px" }}
//                 />

//                 {/* Phone number input */}
//                 <InputText
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={onPhoneChange}
//                   placeholder="Enter phone number"
//                   className="p-inputtext m-2 "
//                 />
//                 {/* </span> */}
//               </div>

//               {/* Submit Button */}
//               <Button
//                 label="Continue"
//                 className="w-100"
//                 type="submit"
//                 loading={loading}
//                 style={{ background: "#396664" }}
//               />
//               <span className="d-flex justify-content-center">OR</span>

//               <div className="d-flex justify-content-center" style={{cursor:"pointer",border:"1px solid black",borderRadius:"10px",padding:"10px"}}>
//                 <span>

//               <FcGoogle className="fs-3" />
//                 </span>
//               <span className="ms-2">Continue via Google</span>{" "}
//               </div>
//             </form>
//           </div>
//         </div>
//       </>
//     )
//   );
// }

// export default Register;
"use client";
import React, { useRef, useState } from "react";
// import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
import { FcGoogle } from "react-icons/fc";
import { Password } from "primereact/password";
// import { API_BASE_URL } from "../utils";
import { Toast } from "primereact/toast";
import { UsersRegisterAPi } from "api/page";
import { useRouter } from "next/navigation";

function Register({ visible, onHide, }) {
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });


  // const [selectedCountry, setSelectedCountry] = useState("+91");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle country code change
  // const onCountryChange = (e) => {
  //   setSelectedCountry(e.value);
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
    };

    try {
      const response = await UsersRegisterAPi(payload)



      if (response.success == true) {
        // alert("coming");
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: response?.data?.message,
          life: 3000,
        });

        // Use a timeout to delay the hiding of the component
        setTimeout(() => {
          onHide();
        }, 3000); // Match this delay with the toast's life duration

        // router.push("/")
      } else {
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: response?.data?.errors,
          life: 3000,
        });
      }

    } catch (error) {
      console.log(error)
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: "An error occurred during login.",
        life: 3000,
      });
    } finally {
      setLoading(false);

    }
  };

  // const countries = [
  //   { code: "+91" },
  //   { code: "+1" },
  //   { code: "+44" },
  //   { code: "+61" },
  //   { code: "+33" },
  // ];

  return (
    visible && (
      <>
        <Toast ref={toast} />
        <div className="modal-overlay" onClick={onHide}></div>
        <div className="login-modal">
          <div className="content p-4">
            <div className="d-flex justify-content-center">
              <img src="../image/Logo black.svg" alt="Logo" />
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
              Login in to continue to MATHIOLI
            </span>
            <form onSubmit={handleSubmit} className="m-auto mt-2">
              {/* Country Code Dropdown */}

              {/* Email Input */}
              <div className="p-my-2 d-flex">
                <div>
                  <InputText
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter firstName"
                    className="p-inputtext w-100"
                  />
                </div>

                <div className="ms-3">
                  <InputText
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter lastName"
                    className="p-inputtext w-100"
                  />
                </div>
              </div>
              {/* Email Input */}

              {/* Email Input */}
              <div className=" mt-2">
                <InputText
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className=" w-100"
                />
              </div>

              {/* Password Input */}
              <div className=" mt-2 login-password">
                <Password
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className=" w-100 "
                  toggleMask
                />
              </div>
              {/* Phone Number Input */}
              <div className="p-d-flex">
                {/* <Dropdown
                  value={selectedCountry}
                  options={countries}
                  onChange={onCountryChange}
                  optionLabel="code"
                  placeholder="+91"
                  className="w-0"
                  style={{ width: "0px", minWidth: "85px" }}
                /> */}
                <InputText
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-100 mt-2 "
                />
              </div>
              {/* Submit Button */}
              <Button
                label="Continue"
                className="w-100 mt-2"
                type="submit"
                loading={loading}
                style={{ background: "#396664" }}
              />

              <span className="d-flex justify-content-center">OR</span>

              {/* Google Login Button */}
              <div
                className="d-flex justify-content-center"
                style={{
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <FcGoogle className="fs-3" />
                <span className="ms-2">Continue via Google</span>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}

export default Register;
