"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const PdfReader = () => {
    const router = useRouter();
    const { pdfUrl } = router.query;

    return (
        <div className="pdf-reader-container">
            <h1>PDF Reader</h1>
            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    title="PDF Viewer"
                ></iframe>
            )}
        </div>
    );
};

export default PdfReader;
