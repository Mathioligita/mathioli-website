// // components/AudioPlayerModal.js
// import { useEffect, useRef, useState } from "react";
// import "./audio.css";

// const AudioPlayerModal = ({ isOpen, onClose, audioSrc }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio && isOpen) {
//       audio.addEventListener("loadedmetadata", () => {
//         audio.currentTime = 0;
//         audio.play();
//         setIsPlaying(true);
//       });

//       audio.addEventListener("timeupdate", () => {
//         if (audio.currentTime >= 30) {
//           audio.pause();
//           setIsPlaying(false);
//         }
//       });
//     }
//   }, [isOpen, audioSrc]);

//   if (!isOpen) return null;

//   return (
//     <div className="modalOverlay">
//       <div className="modalContent">
//         <img
//           src={audioSrc.bookimage[0]}
//           alt="Book Cover"
//           width={"100px"}
//         />
//         <audio
//           ref={audioRef}
//           src={audioSrc.audiobookUpload[0]}
//           controls
//           className="audioPlayer"
//         />
//         {isPlaying ? <p>Playing first 30 seconds...</p> : <p>Audio paused</p>}
//         <button onClick={onClose} className="closeButton">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayerModal;
import { useEffect, useRef, useState } from "react";

import "./audio.css";
import { useRouter } from "next/navigation";

const AudioPlayerModal = ({ isOpen, onClose, audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isOpen) {
      audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      });

      audio.addEventListener("timeupdate", () => {
        if (audio.currentTime >= 30) {
          audio.pause();
          setIsPlaying(false);
          onClose()
          setShowToast(!true);
        }
      });
    }
  }, []);

  const handlePaymentNavigation = () => {
    navigate.push("/payment");
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <img
          src={audioSrc.bookimage[0]}
          alt="Book Cover"
          className="bookCover"
          width={"100%"}
        />
        <audio
          ref={audioRef}
          src={audioSrc.audiobookUpload[0]}
          controls
          className="audioPlayer"
        />
        {isPlaying ? (
          <p className="statusMessage">Playing first 30 seconds...</p>
        ) : (
          <p className="statusMessage">Audio paused</p>
        )}
        <button onClick={onClose} className="closeButton">
          Close
        </button>
      </div>
      {showToast && (
        <div className="toast">
          <p>You have listened to the first 30 seconds.</p>
          <p>To listen to the full audio, you need to pay.</p>
          <button onClick={handlePaymentNavigation} className="payButton">
            Go to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerModal;
