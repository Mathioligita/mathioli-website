"use client"
import { CatergoriesBookAPI } from 'api/page'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BookCard from '../../topselling/BookCard'
import { Row } from 'react-bootstrap'

export default function Categories() {
    const { slug } = useParams()
    console.log(slug, "Children")
    const [BooksData, setBooksData] = useState([])
    console.log(BooksData)
    useEffect(() => {
       
        const fetchBooks = async () => {
            try {
                const response = await CatergoriesBookAPI(slug);
                const books = response?.data?.books;
                setBooksData(books);
                // setState((prevState) => {
                //     if (JSON.stringify(books) !== JSON.stringify(prevState.book)) {
                //         return {
                //             ...prevState,
                //             book: books,
                //         };
                //     }
                //     return prevState;
                // });
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);




    return (
        <div className='container pt-5'>

            <h4>{slug}</h4>

            <div className="books-view " >
                <Row>

                    {BooksData.map((bookItem) => (
                        <BookCard key={bookItem._id} book={bookItem} />
                    ))}
                </Row>
            </div>


        </div>
    )
}
