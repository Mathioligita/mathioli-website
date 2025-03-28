

// "use client";

// import userContext from '@/app/UseContext/UseContext';
// import { useRouter } from 'next/navigation';
// import React, { useContext } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Bookmark.css'

// export default function Recent() {
//     const { usersdata } = useContext(userContext);
//     const recentlyPlayed = usersdata?.engagement?.recentlyPlayed;

//     const router = useRouter();

//     return (
//         <Container>
//             <h5 className='text-start'>My Recently Played</h5>
//             <Row style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}>
//                 {recentlyPlayed?.map((book, k) => (
//                     <Col key={k} xs={12} md={6} lg={2} className="mb-4 p-0">
//                         <div
//                             className="book-card"
//                             style={{
//                                 cursor: "pointer",
//                                 justifyContent: "space-between",
//                                 padding: "15px",
//                                 borderRadius: "10px",
//                                 flexDirection: "column",
//                             }}
//                         >
//                             <div
//                                 className="book-images"
//                                 style={{
//                                     flex: "1 0 auto",
//                                     background: "#ffff",
//                                     boxShadow:
//                                         "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                                     borderRadius: "6px",
//                                     padding: "15px",
//                                     justifyContent: "center",
//                                     display: "flex",
//                                     maxWidth: "100%",
//                                     overflowX: "auto",
//                                 }}
//                             >
//                                 <img
//                                     src={
//                                         book.bookimage && book.bookimage.length > 0
//                                             ? book.bookimage[0]
//                                             : "https://via.placeholder.com/150"
//                                     }
//                                     alt={book.title}
//                                     // height={"183px"}
//                                     style={{ maxWidth: "100%", height:"183px"  }}
//                                 />
//                                 {book.isAudiobookAvailable && (
//                                     <button
//                                         className="play-button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             router.push(`/book/audio-books/${book.slug}`);
//                                         }}
//                                     >
//                                         ▶
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// }
// "use client";

// import userContext from '@/app/UseContext/UseContext';
// import { useRouter } from 'next/navigation';
// import React, { useContext } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Bookmark.css'

// export default function Recent() {
//     const { usersdata } = useContext(userContext);
//     const recentlyPlayed = usersdata?.engagement?.recentlyPlayed;

//     const router = useRouter();

//     return (
//         <Container>
//             <h5 className='text-start'>My Recently Played</h5>
//             <Row style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}>
//                 {recentlyPlayed?.map((book, k) => (
//                     <Col key={k} xs={12} md={6} lg={2} className="mb-4 p-0">
//                         <div
//                             className="book-card"
//                             style={{
//                                 cursor: "pointer",
//                                 justifyContent: "space-between",
//                                 padding: "15px",
//                                 borderRadius: "10px",
//                                 flexDirection: "column",
//                             }}
//                         >
//                             <div
//                                 className="book-images"
//                                 style={{
//                                     flex: "1 0 auto",
//                                     background: "#ffff",
//                                     boxShadow:
//                                         "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                                     borderRadius: "6px",
//                                     padding: "15px",
//                                     justifyContent: "center",
//                                     display: "flex",
//                                     maxWidth: "100%",
//                                     overflowX: "auto",
//                                 }}
//                             >
//                                 <img
//                                     src={
//                                         book.bookimage && book.bookimage.length > 0
//                                             ? book.bookimage[0]
//                                             : "https://via.placeholder.com/150"
//                                     }
//                                     alt={book.title}
//                                     // height={"183px"}
//                                     style={{ maxWidth: "100%", height:"183px"  }}
//                                 />
//                                 {book.isAudiobookAvailable && (
//                                     <button
//                                         className="play-button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             router.push(`/book/audio-books/${book.slug}`);
//                                         }}
//                                     >
//                                         ▶
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );

// }

"use client";

import userContext from "../../../app/UseContext/UseContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Bookmark.css";

export default function Recent() {
  const { usersdata } = useContext(userContext);
  const recentlyPlayed = usersdata?.engagement?.recentlyPlayed;

  const router = useRouter();

  return (
    <Container>
      <h5 className="text-start">My Recently Played</h5>
      {recentlyPlayed && recentlyPlayed.length > 0 ? (
        <Row style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}>
          {recentlyPlayed.map((book, k) => (
            <Col key={k} xs={12} md={6} lg={2} className="mb-4 p-0">
              <div
                className="book-card"
                style={{
                  cursor: "pointer",
                  justifyContent: "space-between",
                  padding: "15px",
                  borderRadius: "10px",
                  flexDirection: "column",
                }}
              >
                <div
                  className="book-images"
                  style={{
                    flex: "1 0 auto",
                    background: "#ffff",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "6px",
                    padding: "15px",
                    justifyContent: "center",
                    display: "flex",
                    maxWidth: "100%",
                    overflowX: "auto",
                  }}
                >
                  <img
                    src={
                      book.bookimage && book.bookimage.length > 0
                        ? book.bookimage[0]
                        : "https://via.placeholder.com/150"
                    }
                    alt={book.title}
                    style={{ maxWidth: "100%", height: "183px" }}
                  />
                  {book.isAudiobookAvailable && (
                    <button
                      className="play-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/book/audio-books/${book.slug}`);
                      }}
                    >
                      ▶
                    </button>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>
          You haven't played any books recently. Start exploring and listening
          today!
        </p>
      )}
    </Container>
  );
}