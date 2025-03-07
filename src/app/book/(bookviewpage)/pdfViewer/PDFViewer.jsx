
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const PdfViewer = ({ ebookSrc,setShowebook }) => {
//   // const [isOverlayVisible, setOverlayVisible] = useState(false);

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const pdfFile =
//     Array.isArray(ebookSrc.EbookUpload) && ebookSrc.EbookUpload.length > 0
//       ? ebookSrc.EbookUpload[0]
//       : null;

 
//   return (
//     <div>
     
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             zIndex: 1000,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ position: "relative", width: "80%", height: "80%" }}>
//             {/* Set up the worker explicitly with version 3.11.174 */}
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//               <Viewer
//                 fileUrl={pdfFile}
//                 plugins={[defaultLayoutPluginInstance]}
//               />
//             </Worker>
//           </div>
//         </div>
//       {/* )} */}
//     </div>
//   );
// };

// export default PdfViewer;


import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "primereact/button";

const PdfViewer = ({ ebookSrc, setShowEbook }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfFile =
    Array.isArray(ebookSrc.EbookUpload) && ebookSrc.EbookUpload.length > 0
      ? ebookSrc.EbookUpload[0]
      : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const viewerElement = document.getElementById("pdf-viewer");
      if (viewerElement && !viewerElement.contains(event.target)) {
        setOverlayVisible(false);
        setShowEbook(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowEbook]);

  const handleClose = () => {
    setOverlayVisible(false);
    setShowEbook(false);
  };

  return (
    <div>
      {isOverlayVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="pdf-viewer"
            style={{ position: "relative", width: "80%", height: "80%" }}
          >
            <Button
              onClick={handleClose}
              style={{ position: "absolute", top: 10, right: 10, zIndex: 1001 }}
            >
              X
            </Button>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;

