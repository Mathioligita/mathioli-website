import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="text-center" style={{ height: "100vh", width: "100vw" }}>
        <div
          className="d-flex"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <img
            src="../Assert/Animation - 1740485995740.gif"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
