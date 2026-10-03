interface PDFControlsProps {
  pageNumber: number;
  numPages: number;
  onPageChange: (page: number) => void;
}

export default function PDFControls({
  pageNumber,
  numPages,
  onPageChange,
}: PDFControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-2 sm:py-0">
      <button
        type="button"
        disabled={numPages > 0 && pageNumber <= 1}
        onClick={() => onPageChange(pageNumber - 1)}
        className="buttonMedium"
        aria-label="Previous page"
      >
        ←
      </button>

      <p>
        Page {pageNumber} of {numPages}
      </p>

      <button
        type="button"
        disabled={numPages > 0 && pageNumber >= numPages}
        onClick={() => onPageChange(pageNumber + 1)}
        className="buttonMedium"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}