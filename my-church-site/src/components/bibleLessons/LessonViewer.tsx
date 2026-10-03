import dynamic from "next/dynamic";

const PDFViewer = dynamic(
    () => import("@/components/bibleLessons/PDFViewer"),
    { ssr: false }
);

interface LessonViewerProps {
    isRussian: boolean;
    lessonUrl: string;
    lessonTitle: string;
    pageNumber: number;
    onNumPagesChange: (numPages: number) => void;
    onLoaded: () => void;
    pdfLoaded: boolean;
    mobile?: boolean;
}

export default function LessonViewer({
    isRussian,
    lessonUrl,
    lessonTitle,
    pageNumber,
    onNumPagesChange,
    onLoaded,
    pdfLoaded,
    mobile = false,
}: LessonViewerProps) {
    if (isRussian) {
        return (
            <iframe
                key={lessonUrl}
                src={lessonUrl}
                title={lessonTitle}
                className={mobile ? "h-[80vh] w-full" : "h-full w-full"}
            />
        );
    }

    if (mobile) {
        return (
            <div
                className={`overflow-hidden transition-all duration-500 ease-out ${pdfLoaded
                        ? "max-h-[1000vh] translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-4 opacity-0"
                    }`}
            >
                <PDFViewer
                    file={lessonUrl}
                    pageNumber={pageNumber}
                    onNumPagesChange={onNumPagesChange}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    return (
        <PDFViewer
            file={lessonUrl}
            pageNumber={pageNumber}
            onNumPagesChange={onNumPagesChange}
            onLoaded={onLoaded}
        />
    );
}