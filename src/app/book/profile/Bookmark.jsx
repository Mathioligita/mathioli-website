

"use client";

import userContext from '@/app/UseContext/UseContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../'

export default function BookMark() {
    const { usersdata } = useContext(userContext);
    const bookmarks = usersdata.engagement.bookmarks;

    const router = useRouter();

    return (
        <Container>
            <h5 className='text-start'>My Book Marks</h5>
            <Row style={{ overflowX: "auto", display: "flex" }}>
                {bookmarks?.map((book, k) => (
                    <Col key={k} xs={12} md={6} lg={2} className="mb-4 p-0">
                        <div
                            className="book-card"
                            style={{
                                cursor: "pointer",
                                justifyContent: "space-between",
                                padding: "0px",
                                borderRadius: "10px",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                className="book-images"
                                style={{
                                    flex: "1 0 auto",
                                    background: "#ffff",
                                    boxShadow:
                                        "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
                                    height={"183px"}
                                    style={{ maxWidth: "100%" }}
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
        </Container>
    );
}
