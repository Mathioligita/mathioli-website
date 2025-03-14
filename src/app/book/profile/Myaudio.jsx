'use client';

import userContext from '@/app/UseContext/UseContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../app/book/profile/Bookmark.css';
import { Button } from 'primereact/button';

export default function MyAudio() {
	const { usersdata } = useContext(userContext);
	const myaudio = usersdata?.myBooks?.audioBooks;

	const router = useRouter();

	return (
		<Container>
			<h5 className="text-start">My Audio Books</h5>
			{myaudio && myaudio.length > 0 ? (
				<Row style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
					{myaudio.map((book, k) => (
						<Col key={k} xs={12} md={6} lg={2} className="mb-4 p-0">
							<div
								className="book-card"
								style={{
									cursor: 'pointer',
									justifyContent: 'space-between',
									padding: '15px',
									borderRadius: '10px',
									flexDirection: 'column',
								}}
							>
								<div
									className="book-images"
									style={{
										flex: '1 0 auto',
										background: '#ffff',
										boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
										borderRadius: '6px',
										justifyContent: 'center',
										display: 'flex',
										maxWidth: '100%',
										overflowX: 'auto',
									}}
									onClick={(e) => {
										e.stopPropagation();
										router.push(`/book/audio-books/${book.slug}`);
									}}
								>
									<img
										src={
											book.bookimage && book.bookimage.length > 0
												? book.bookimage[0]
												: 'https://via.placeholder.com/150'
										}
										alt={book.title}
										height={'183px'}
										style={{ maxWidth: '100%' }}
									/>
								</div>
							</div>
						</Col>
					))}
				</Row>
			) : (
				<div className="">
					<p>No audio books available. You may want to buy some books.</p>
					<Button
                    onClick={()=> window.location.href="/"}
						className=""
						label="Shop Now"
						icon="pi pi-shopping-cart"
						style={{ background: '#1D5755', borderRadius: '8px' }}
					></Button>
				</div>
			)}
		</Container>
	);
}
