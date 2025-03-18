// // src/components/Sidebar.js
// import { Button } from "primereact/button";
// import React from "react";
// // import './Sidebar.css';
// import "./profilescss.scss"

// const ProfileSidebar = ({ onNavigate, user, }) => {
//   return (
//     <div className="sidebar-Profile"  >
//       <div className="  ">
//         <div className="text-center">
//           <img
//             src={
//               user?.profileImage ||
//               " https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             }
//             alt="Profile-image"
//             style={{ borderRadius: "50%", width: "50%", }}
//           />
//         </div>
//         <div className="text-center">

//           <span className=" fw-bold  mt-3" style={{ fontFamily: "Inter" }}>

//             {user?.firstName} {user?.lastName}{" "}
//           </span>
//         </div>
//       </div>
//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Profile")}>
//             Profile
//           </Button>
//         </div>
//       </div>

//       {/* <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Bookmark")}>
//             Bookmark
//           </Button>
//         </div>
//       </div> */}
//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Recent")}>
//             Recent
//           </Button>
//         </div>
//       </div>
//       {/* <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss" onClick={() => onNavigate("Subscription")}>
//             Subscription
//           </Button>
//         </div>
//       </div> */}
//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My Audio")}>
//            My Audio
//           </Button>
//         </div>
//       </div>
//       {/* <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My E-Book")}>
//            My E-Book
//           </Button>
//         </div>
//       </div> */}

//     </div>
//   );
// };

// export default ProfileSidebar;
// // src/components/Sidebar.js
// import { Button } from "primereact/button";
// import React from "react";
// // import './Sidebar.css';
// import "./profilescss.scss"

// const ProfileSidebar = ({ onNavigate, user, }) => {
//   return (
//     <div className="sidebar-Profile"  >
//       <div className="  ">
//         <div className="text-center">
//           <img
//             src={
//               user?.profileImage ||
//               " https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             }
//             alt="Profile-image"
//             style={{ borderRadius: "50%", width: "50%", }}
//           />
//         </div>
//         <div className="text-center">

//           <span className=" fw-bold  mt-3" style={{ fontFamily: "Inter" }}>

//             {user?.firstName} {user?.lastName}{" "}
//           </span>
//         </div>
//       </div>
//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Profile")}>
//             Profile
//           </Button>
//         </div>
//       </div>

//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Bookmark")}>
//             Bookmark
//           </Button>
//         </div>
//       </div>
//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Recent")}>
//             Recent
//           </Button>
//         </div>
//       </div>

//       <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My Audio")}>
//            My Audio
//           </Button>
//         </div>
//       </div>
//       {/* <div>
//         <div className="m-auto profile-contents-button  ">

//           <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My E-Book")}>
//            My E-Book
//           </Button>
//         </div>
//       </div> */}

//     </div>
//   );
// };

// export default ProfileSidebar;
// import { Button } from "primereact/button";
// import React, { useRef } from "react";
// import "./profilescss.scss";
// import { ProfileUserPatch } from "api/page";

// const ProfileSidebar = ({ onNavigate, user }) => {
//   const fileInputRef = useRef(null);

//   const handleImageUpdate = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("profileImage", file);

//       try {
//         const response = await ProfileUserPatch(formData);
//         console.log("Profile image updated:", response.data);
//       } catch (error) {
//         console.error("Error updating profile image:", error);
//       }
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="sidebar-Profile">
//       <div className="text-center">
//         <div style={{ position: "relative", display: "inline-block" }}>
//           <img
//             src={
//               user?.profileImage ||
//               "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             }
//             alt="Profile-image"
//             style={{ borderRadius: "50%", width: "50%" }}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpdate}
//             ref={fileInputRef}
//             style={{ display: "none" }}
//           />
//           <div>
//             <Button
//               className="p-button-rounded p-button-secondary"
//               onClick={triggerFileInput}
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: "60%",
//                 transform: "translateX(-50%)",
//                 padding: "1px",
//                 borderRadius: "50%",
//                 height: "20px",
//                 width: "20px",
//                 color: "white",
//                 background: "#1D5755",
//                 fontSize: "8px",
//               }}
//             >
//               {" "}
//               <i
//                 className="pi pi-pencil m-auto"
//                 style={{ fontSize: "10px" }}
//               ></i>
//             </Button>
//           </div>
//         </div>
//         <div className="text-center">
//           <span className="fw-bold mt-3" style={{ fontFamily: "Inter" }}>
//             {user?.firstName} {user?.lastName}
//           </span>
//         </div>
//       </div>
//       <div>
//         <div className="m-auto profile-contents-button">
//           <Button
//             className="w-100 profile-buttonssssss-buttons"
//             onClick={() => onNavigate("Profile")}
//           >
//             Profile
//           </Button>
//         </div>
//       </div>
//       {/* <div>
//         <div className="m-auto profile-contents-button">
//           <Button
//             className="w-100 profile-buttonssssss-buttons"
//             onClick={() => onNavigate("Bookmark")}
//           >
//             Bookmark
//           </Button>
//         </div>
//       </div> */}
//       <div>
//         <div className="m-auto profile-contents-button">
//           <Button
//             className="w-100 profile-buttonssssss-buttons"
//             onClick={() => onNavigate("Recent")}
//           >
//             Recent
//           </Button>
//         </div>
//       </div>
//       <div>
//         <div className="m-auto profile-contents-button">
//           <Button
//             className="w-100 profile-buttonssssss-buttons"
//             onClick={() => onNavigate("My Audio")}
//           >
//             My Audio
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import "./profilescss.scss";
import Cookies from "js-cookie";

const ProfileSidebar = ({ onNavigate, user, triggerFileInput }) => {
  return (
    <div className="sidebar-Profile">
      <div className="text-center">
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={
              user?.profileImage ||
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Profile-image"
            style={{ borderRadius: "50%", width: "50%" }}
          />

          <div>
            <Button
              className="p-button-rounded p-button-secondary"
              onClick={() => triggerFileInput()}
              style={{
                position: "absolute",
                bottom: 0,
                left: "60%",
                transform: "translateX(-50%)",
                padding: "1px",
                borderRadius: "50%",
                height: "20px",
                width: "20px",
                color: "white",
                background: "#1D5755",
                fontSize: "8px",
              }}
            >
              {" "}
              <i
                className="pi pi-pencil m-auto"
                style={{ fontSize: "10px" }}
              ></i>
            </Button>
          </div>
        </div>
        <div className="text-center">
          <span className="fw-bold mt-3" style={{ fontFamily: "Inter" }}>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
      <div>
        <div className="m-auto profile-contents-button">
          <Button
            className="w-100 profile-buttonssssss-buttons"
            onClick={() => onNavigate("Profile")}
          >
            Profile
          </Button>
        </div>
      </div>
      <div>
        <div className="m-auto profile-contents-button">
          <Button
            className="w-100 profile-buttonssssss-buttons"
            onClick={() => onNavigate("Recent")}
          >
            Recent
          </Button>
        </div>
      </div>
      <div>
        <div className="m-auto profile-contents-button">
          <Button
            className="w-100 profile-buttonssssss-buttons"
            onClick={() => onNavigate("My Audio")}
          >
            My Audio
          </Button>
        </div>
        <div className="m-auto profile-contents-button">
          <Button
            className="w-100 profile-buttonssssss-buttons"
            onClick={() => onNavigate("My orders")}
          >
            My Orders
          </Button>
        </div>
        <div className="m-auto profile-contents-button">
          <Button
            className="w-100 profile-buttonssssss-buttons"
            onClick={() => {
              Cookies.remove("accessToken");
              window.location.href("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
