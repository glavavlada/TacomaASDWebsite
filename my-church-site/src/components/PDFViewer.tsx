"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

//tells PDF.js where worker is located
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type PDFViewerProps = {
    file: string;
};

export default function PDFViewer({ file }: PDFViewerProps) {
    //number of pages in the loaded PDF
    const [numPages, setNumPages] = useState(0);

    //page currently being viewed
    const [pageNumber, setPageNumber] = useState(1);

    //called after PDF  loads
    function onDocumentLoadSuccess({
        numPages,
    }: {
        numPages: number;
    }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div className="flex flex-col items-center gap-4">

            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page
                    pageNumber={pageNumber}
                    width={700}
                />
            </Document>

            {/* PDF navigation */}
            <div className="flex items-center gap-4">

                <button
                    className="buttonDark"
                    disabled={pageNumber <= 1}
                    onClick={() =>
                        setPageNumber((page) => page - 1)
                    }
                >
                    Previous
                </button>

                <p>
                    Page {pageNumber} of {numPages}
                </p>

                <button
                    className="buttonDark"
                    disabled={pageNumber >= numPages}
                    onClick={() =>
                        setPageNumber((page) => page + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}