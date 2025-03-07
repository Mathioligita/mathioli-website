// src/components/Sidebar.js
import { Button } from "primereact/button";
import React from "react";
// import './Sidebar.css';
import "./profilescss.scss"

const ProfileSidebar = ({ onNavigate, user, }) => {
  return (
    <div className="sidebar-Profile"  >
      <div className="  ">
        <div className="text-center">
          <img
            src={
              user?.profileImage ||
              " https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Profile-image"
            style={{ borderRadius: "50%", width: "50%", }}
          />
        </div>
        <div className="text-center">

          <span className=" fw-bold  mt-3" style={{ fontFamily: "Inter" }}>

            {user?.firstName} {user?.lastName}{" "}
          </span>
        </div>
      </div>
      <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Profile")}>
            Profile
          </Button>
        </div>
      </div>

      <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Bookmark")}>
            Bookmark
          </Button>
        </div>
      </div>
      <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("Recent")}>
            Recent
          </Button>
        </div>
      </div>
      {/* <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss" onClick={() => onNavigate("Subscription")}>
            Subscription
          </Button>
        </div>
      </div> */}
      <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My Audio")}>
           My Audio
          </Button>
        </div>
      </div>
      {/* <div>
        <div className="m-auto profile-contents-button  ">

          <Button className="w-100 profile-buttonssssss-buttons" onClick={() => onNavigate("My E-Book")}>
           My E-Book
          </Button>
        </div>
      </div> */}

    </div>
  );
};

export default ProfileSidebar;
