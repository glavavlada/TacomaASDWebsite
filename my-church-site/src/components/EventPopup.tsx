export type SelectedEvent = {
    title: string;
    start: Date | null;
    end: Date | null;
    description?: string;
    location?: string;
    googleLink?: string;
    meetLink?: string;
};

type EventPopupProps = {
    event: SelectedEvent;
    onClose: () => void;
};

function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(date: Date) {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
}

export default function EventPopup({
    event,
    onClose,
}: EventPopupProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-xl border border-[var(--border)] bg-[var(--body)] p-6 text-[var(--textDark)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close event details"
                    title="Close"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--highlight)] bg-[var(--buttonDark)] text-2xl font-bold text-[var(--textLight)] transition hover:bg-[var(--highlight)]"
                >
                    ✕
                </button>

                <h2 className="mb-4 pr-16 font-bold">
                    {event.title}
                </h2>

                {event.start && (
                    <>
                        <p className="mb-2">
                            <strong>Date:</strong>{" "}
                            {formatDate(event.start)}
                        </p>

                        <p className="mb-4">
                            <strong>Time:</strong>{" "}
                            {formatTime(event.start)}
                            {event.end &&
                                ` - ${formatTime(event.end)}`}
                        </p>
                    </>
                )}

                {event.location && (
                    <p className="mb-4">
                        <strong>Location:</strong>{" "}
                        {event.location}
                    </p>
                )}

                {event.description && (
                    <div className="mb-5">
                        <h3 className="mb-2 font-bold">
                            Details
                        </h3>

                        <p className="whitespace-pre-line leading-7">
                            {event.description}
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap gap-3">
                    {event.meetLink && (
                        <a
                            href={event.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="buttonDark"
                        >
                            Join Meeting
                        </a>
                    )}

                    {event.googleLink && (
                        <a
                            href={event.googleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="buttonLight"
                        >
                            View in Calendar
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}