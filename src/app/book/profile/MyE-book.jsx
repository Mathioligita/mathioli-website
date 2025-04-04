"use client";

import userContext from '../../../app/UseContext/UseContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyEbook() {
    const { usersdata } = useContext(userContext);
    const myebooks = usersdata?.myBooks?.ebooks;

    const router = useRouter();

    const handlePlayButtonClick = (book) => {
        // Implement the logic to handle the play button click
        // console.log("Play button clicked for:", book);
    };

    return (
        <Container>
            <h5 className='text-start'>My E-Books</h5>
            <Row style={{ maxWidth: "800px", overflowX: "auto", display: "flex", flexWrap: "nowrap" }}>
                {myebooks?.map((book, k) => (
                    <Col key={k} xs={12} md={6} lg={4} className="mb-4" style={{ flex: "0 0 auto" }}>
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
                                className="book-image"
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/book/e-books/${book.slug}`);
                                    }}
                                />
                                {/* {book.isEBookAvailable && (
                                    <button
                                        className="play-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/book/e-books/${book.slug}`);
                                        }}
                                    >
                                        <i className="pi pi-book"></i>
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
