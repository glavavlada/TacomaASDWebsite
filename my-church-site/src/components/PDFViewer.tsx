"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Tells PDF.js where the worker is located
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type PDFViewerProps = {
    file: string;
};

export default function PDFViewer({ file }: PDFViewerProps) {
    // Number of pages in the loaded PDF
    const [numPages, setNumPages] = useState(0);

    // Page currently being viewed
    const [pageNumber, setPageNumber] = useState(1);

    // Width available for the PDF
    const [pdfWidth, setPdfWidth] = useState(600);

    // Reference to the PDF container
    const containerRef = useRef<HTMLDivElement>(null);

    // Watch the container width
    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const updateWidth = () => {
            setPdfWidth(container.clientWidth);
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    // Called after PDF loads
    function onDocumentLoadSuccess({
        numPages,
    }: {
        numPages: number;
    }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div className="flex h-full min-h-0 w-full flex-col">

            {/* PDF area */}
            <div
                ref={containerRef}
                className="min-h-0 flex-1 overflow-auto"
            >
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex justify-center"
                >
                    <Page
                        pageNumber={pageNumber}
                        width={pdfWidth}
                    />
                </Document>
            </div>

            {/* PDF navigation */}
            <div className="flex shrink-0 items-center justify-center gap-4 p-3">

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