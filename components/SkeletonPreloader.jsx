import { Skeleton } from "primereact/skeleton";
import React from "react";

const SkeletonPreloader = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "6px",
        padding: "15px",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <div className=" me-4">
        <Skeleton width="164px" borderRadius="10px" height="204px"></Skeleton>
        <div className="mt-1">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton width="5rem" className="mb-1"></Skeleton>
            <Skeleton width="4rem" className="mb-1"></Skeleton>
          </div>
          <Skeleton width="100%" className="mb-2"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPreloader;
