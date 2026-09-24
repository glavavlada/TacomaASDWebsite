type CalendarToolbarProps = {
    calendarTitle: string;
    calendarExpanded: boolean;
    goToToday: () => void;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
    toggleCalendarExpanded: () => void;
};

export default function CalendarToolbar({
    calendarTitle,
    calendarExpanded,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    toggleCalendarExpanded,
}: CalendarToolbarProps) {
    return (
        <div className="mb-5 flex flex-col items-center gap-4">
            <h2 className="text-center font-bold text-[var(--textDark)]">
                {calendarTitle}
            </h2>

            <div className="flex w-full max-w-md items-center justify-center gap-3">
                <button
                    onClick={goToToday}
                    className="buttonLight flex 1"
                >
                    Today
                </button>

                <button
                    onClick={goToPreviousMonth}
                    className="buttonDark flex-1"
                    aria-label="Previous month"
                >
                    ←
                </button>

                <button
                    onClick={goToNextMonth}
                    className="buttonDark flex-1"

                    aria-label="Next month"
                >
                    →
                </button>

                <button
                    onClick={toggleCalendarExpanded}
                    className="buttonLight sm:hidden flex-1"
                    aria-label={
                        calendarExpanded
                            ? "Fit calendar to screen"
                            : "Expand calendar"
                    }
                >
                    {calendarExpanded ? "Fit" : "Expand"}
                </button>
            </div>
        </div>
    );
}