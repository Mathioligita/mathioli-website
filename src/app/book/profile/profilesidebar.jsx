import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import "./profilescss.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProfileSidebar = ({ onNavigate, user, triggerFileInput }) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("handled401", "true")
    router.push("/");
  };
  return (
    <div className="sidebar-Profile">
      <div className="text-center">
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={
              user?.profileImage ||
              "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
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
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
