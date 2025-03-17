// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import ProfileSidebar from "./profilesidebar";
// import ProfileInformation from "./profileinformation";
// import "./profile.css";
// import { ProfileUser } from "../../../../api/page";
// import Wishlist from "../wishlist/wishlist";
// import Cookies from "js-cookie";
// import backgroundframe from "../../../../public/Assert/Frame.png"
// import { Col, Row } from "react-bootstrap";
// import Myaudio from "./Myaudio";
// import { useRouter } from "next/navigation";
// import userContext from "../../UseContext/UseContext";
// import MyEbook from "./MyE-book";
// import BookMark from "./Bookmark";
// import Recent from "./Recent";
// const ProfilePage = (profileImage) => {
//   const [activeSection, setActiveSection] = useState("profileInformation");
//   const { usersdata, loginpoup } = useContext(userContext)
//   const user = usersdata
//   const router = useRouter()
//   const accessToken = Cookies.get("accessToken");

//   if (!accessToken) {
//     // loginpoup()
//     router.push("/")

//   }

//   const renderSection = (sectionName) => {
//     switch (sectionName) {
//       case "Profile":
//         return <ProfileInformation user={user} profileImage={profileImage} />;
//       // case "Bookmark":
//       //   return <BookMark/>; // Placeholder for actual component
//       case "Recent":
//         return <Recent/>; // Placeholder for actual component
//       // case "Subscription":
//       //   return "All Notifications Section"; // Placeholder for actual component
//       case "My Audio":
//         return <Myaudio />; // Placeholder for actual component
//       case "My E-Book":
//         return <MyEbook />; // Placeholder for actual component
//       default: "Profile"
//         return <ProfileInformation user={user} />;;
//     }
//   };

//   return (
//     // <div style={{ backgroundImage: `url(../Assert/Frame.png)`, backgroundSize: "cover", backgroundPosition: "center" }}>

//     <div>

//       <div style={{ backgroundImage: `url(../Assert/Frame.png)`, objectFit: "contain", width: "100%", height: "320px", backgroundRepeat: "no-repeat", position: "relative" }}>
//       </div>
//       <div className="" >

//         <div className="container  " >
//           <div >
//             <Row className="" >

//               <Col sm={12} md={3} className="profile-contents-adjust mb-3">
//                 <div className="profile-page ">
//                   <ProfileSidebar onNavigate={setActiveSection} user={user} profileImage={profileImage} />
//                 </div>
//               </Col>
//               <Col sm={12} md={8} className="" style={{ textAlign: "center" }}>
//                 <div className="content ">{renderSection(activeSection)}</div>
//               </Col>
//             </Row>
//           </div>

//         </div>
//       </div>
//     </div>

//   );
// };

// export default ProfilePage;"use client";
"use client";
import React, { useContext, useEffect, useState } from "react";
import ProfileSidebar from "./profilesidebar";
import ProfileInformation from "./profileinformation";
import "./profile.css";
import { ProfileUser } from "../../../../api/page";

import { Col, Row } from "react-bootstrap";
import Myaudio from "./Myaudio";

import userContext from "../../UseContext/UseContext";
import MyEbook from "./MyE-book";
import BookMark from "./Bookmark";
import Recent from "./Recent";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const ProfilePage = (profileImage) => {
  const [activeSection, setActiveSection] = useState("profileInformation");
  const { usersdata, loginpoup, setusersdata } = useContext(userContext);
  const user = usersdata;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    // loginpoup()
    router.push("/");
  }
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

  console.log(isEditing, "triggerFileInput");
  const renderSection = (sectionName) => {
    switch (sectionName) {
      case "Profile":
        return (
          <ProfileInformation
            user={user}
            profileImage={profileImage}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        );
      case "My orders":
        return <BookMark />; // Placeholder for actual component
      case "Recent":
        return <Recent />; // Placeholder for actual component
      // case "Subscription":
      //   return "All Notifications Section"; // Placeholder for actual component
      case "My Audio":
        return <Myaudio />; // Placeholder for actual component
      // // case "My E-Book":
      //   return <MyEbook />; // Placeholder for actual component
      default:
        "Profile";
        return (
          <ProfileInformation
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        );
    }
  };
  const triggerFileInput = () => {
    setIsEditing(true);
  };

  return (
    // <div style={{ backgroundImage: `url(../Assert/Frame.png)`, backgroundSize: "cover", backgroundPosition: "center" }}>

    <div>
      <div
        style={{
          backgroundImage: `url(../Assert/Frame.png)`,
          objectFit: "contain",
          width: "100%",
          height: "320px",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      ></div>
      <div className="">
        <div className="container  ">
          <div>
            <Row className="">
              <Col sm={12} md={3} className="profile-contents-adjust mb-3">
                <div className="profile-page ">
                  <ProfileSidebar
                    triggerFileInput={triggerFileInput}
                    onNavigate={setActiveSection}
                    user={user}
                    profileImage={profileImage}
                  />
                </div>
              </Col>
              <Col sm={12} md={8} className="" style={{ textAlign: "center" }}>
                <div className="content ">{renderSection(activeSection)}</div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
