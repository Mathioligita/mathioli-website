"use client";

import React, { useState } from "react";
import "./Videos.scss"; // Import the SCSS file

const videos = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/QuDhKveqJcQ?si=XQvjp8_MKU0qebPC",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/D0GpTQT36so?si=OHWW3s3FacLDMHQE",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/w6HGOz8FfPo?si=RgDGoDl_CvKRmriT",
  },
  {
    id: 4,
    src: "https://www.youtube.com/embed/msIYWhO2nHU?si=DRKNyce_MA3XGoID",
  },
  {
    id: 5,
    src: "https://www.youtube.com/embed/dwPV45Ft_tY?si=b7L_I47FMcNdYXJD",
  },
  {
    id: 6,
    src: "https://www.youtube.com/embed/xMuhPnMlNP0?si=AvT5vkgcW_sKEEep",
  },
  // Add the rest of your videos here
  {
    id: 7,
    src: "https://www.youtube.com/embed/Vj8Vvl8j0pw?si=4hyLB8ghiP05LZ37",
  },
  {
    id: 8,
    src: "https://www.youtube.com/embed/HaGNeNmy2lI?si=yT0OFZStMb1yX9Uk",
  },
  {
    id: 9,
    src: "https://www.youtube.com/embed/snr8Qh6QYjA?si=_EcUmlUAU7IKJn9U",
  },
  {
    id: 10,
    src: "https://www.youtube.com/embed/sZorS1v05Nc?si=yS5-9fshyRHDntTk",
  },
  {
    id: 11,
    src: "https://www.youtube.com/embed/sfgaYWTBbRU?si=0G8eKYSM8FzROCI6",
  },
  {
    id: 12,
    src: "https://www.youtube.com/embed/qaHIDzHmFnM?si=jjn1lS5-axYjOTD2",
  },
  {
    id: 13,
    src: "https://www.youtube.com/embed/pZIATU0_YKU?si=D0mNJpw6KOgmgdD0",
  },
  {
    id: 14,
    src: "https://www.youtube.com/embed/wBDnkfcMiog?si=wblRdUxaADDVQIW7",
  },
  {
    id: 15,
    src: "https://www.youtube.com/embed/oEAFgklFGH0?si=k0_ZG2-Tnysx0LQ2",
  },
  {
    id: 16,
    src: "https://www.youtube.com/embed/H9_rofnxU6M?si=-yGH7OAaKiuYQ8-c",
  },
  {
    id: 17,
    src: "https://www.youtube.com/embed/gqTpjH8YVf0?si=yLjdc1jo-grs_LhI",
  },
  {
    id: 18,
    src: "https://www.youtube.com/embed/EKEmcGelUf0?si=6GxGCtn5fH5REAzR",
  },
  {
    id: 19,
    src: "https://www.youtube.com/embed/RiKGGrzQKzw?si=_zIW1M3i7iiW7Hon",
  },
  {
    id: 20,
    src: "https://www.youtube.com/embed/-zAjR9J4gC4?si=BTcZOYzk9Z2wDZPw",
  },
  {
    id: 21,
    src: "https://www.youtube.com/embed/RVq4qP3C8OE?si=a5voNrpYP0AN6UQk",
  },
  {
    id: 22,
    src: "https://www.youtube.com/embed/sf3tMVfrcJA?si=Bdhb150GErWnL5AK",
  },
  {
    id: 23,
    src: "https://www.youtube.com/embed/5tsFWnalfXk?si=kyFQK6Uf6d2fG_8O",
  },
  {
    id: 24,
    src: "https://www.youtube.com/embed/7LbXq55ET_U?si=2zRElDUmfi6mHv2h",
  },
  {
    id: 25,
    src: "https://www.youtube.com/embed/4pkmBoAd2O0?si=4kpCr6FnTqGBTIpi",
  },
  {
    id: 26,
    src: "https://www.youtube.com/embed/xXDZs2gDCKU?si=rhvDOotmvjN6wuA4",
  },
  {
    id: 27,
    src: "https://www.youtube.com/embed/0zfw5-caDyQ?si=sBOLnKU8PiXyV0m4",
  },
  {
    id: 28,
    src: "https://www.youtube.com/embed/wlrr-u4f7LU?si=wAYEp0lfybzg9jNA",
  },
  {
    id: 29,
    src: "https://www.youtube.com/embed/RWIrvk18VHE?si=3mlI8sucHa8SY1j-",
  },
  {
    id: 30,
    src: "https://www.youtube.com/embed/pktWtdocsPg?si=8RPhzSBXesgO9r8W",
  },
  {
    id: 31,
    src: "https://www.youtube.com/embed/we4yXintnEY?si=JSEzdf-er8kQvPW3",
  },
  {
    id: 32,
    src: "https://www.youtube.com/embed/g6tt9YFnHyw?si=kxigZFHZbxPWjS6p",
  },
  {
    id: 33,
    src: "https://www.youtube.com/embed/FZkcd7_xZac?si=DN5wDCC8kwrM9HXf",
  },
  {
    id: 34,
    src: "https://www.youtube.com/embed/pmBnz0x7w70?si=KQi3Lec4-t8HldnO",
  },
  {
    id: 35,
    src: "https://www.youtube.com/embed/P5wsQSGr3nw?si=i9Pko1Hxx3YGQ3qQ",
  },
  {
    id: 36,
    src: "https://www.youtube.com/embed/qQsob4jotBU?si=rV-xZAKhnU29KFyr",
  },
  {
    id: 37,
    src: "https://www.youtube.com/embed/rG1b8UYRD9c?si=KvhVsc_RDpj505hw",
  },
  {
    id: 38,
    src: "https://www.youtube.com/embed/YKGUWIw2dP0?si=pbEbq_ZJj_kXqubu",
  },
  {
    id: 39,
    src: "https://www.youtube.com/embed/xVk8OGuP9Sw?si=WHxJnhEX27GDMgdy",
  },
  {
    id: 40,
    src: "https://www.youtube.com/embed/fhuKZK6JOHE?si=5ETigdl2QB3q_r4o",
  },
  {
    id: 41,
    src: "https://www.youtube.com/embed/teYB3QFm0Jw?si=LzMnY6vzl8gTRwrZ",
  },
  {
    id: 42,
    src: "https://www.youtube.com/embed/_wabH3NNFx4?si=wtweeAY93qBMnaj_",
  },
  {
    id: 43,
    src: "https://www.youtube.com/embed/yoxjOQmxXqY?si=HjmVaGCutn8aWvNH",
  },
  {
    id: 44,
    src: "https://www.youtube.com/embed/82B8HJSgkpQ?si=NHhgmyDioxer5ufJ",
  },
  {
    id: 45,
    src: "https://www.youtube.com/embed/SfWCpGPQ6eE?si=RCs_D8bCkrlHzJtl",
  },
  {
    id: 46,
    src: "https://www.youtube.com/embed/o5m1bs4i2_E?si=BJY3CLcUKOdWBPMR",
  },
  {
    id: 47,
    src: "https://www.youtube.com/embed/5zQq06eFGTk?si=OGRJdeH4OO6xUrUI",
  },
  {
    id: 48,
    src: "https://www.youtube.com/embed/-vWVNa4P3kI?si=swSy18YG6zmqXThQ",
  },
  {
    id: 49,
    src: "https://www.youtube.com/embed/u-l3cFJoAhg?si=EWTJSAPM3ATL3xrH",
  },
  {
    id: 50,
    src: "https://www.youtube.com/embed/8CDlcTXGvXg?si=vTj16Rb_6euwVJv9",
  },
  {
    id: 51,
    src: "https://www.youtube.com/embed/p3DaeCnT6N4?si=OK03ni_qfGg6MQMH",
  },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="videos-container">
      <h3 className="text-center">Videos</h3>
      <div className="video-grid">
        {currentVideos.map((video) => (
          <iframe
            key={video.id}
            width="560"
            height="315"
            src={video.src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
