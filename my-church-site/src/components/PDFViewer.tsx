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
    pageNumber: number;
    onNumPagesChange: (numPages: number) => void;
};

export default function PDFViewer({
    file,
    pageNumber,
    onNumPagesChange,
}: PDFViewerProps) {
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
        onNumPagesChange(numPages);
    }

    return (
        <div className="flex h-full min-h-0 w-full flex-col">
            <div
                ref={containerRef}
                className="min-h-0 flex-1 overflow-auto"
            >
                <Document
                    key={file}
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
        </div>
    );
}