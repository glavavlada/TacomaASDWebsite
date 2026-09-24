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
        <div className="mb-5 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <h2 className="font-bold text-[var(--textDark)]">
                {calendarTitle}
            </h2>

            <div className="flex w-full flex-wrap items-center justify-evenly gap-2 lg:w-auto lg:justify-end">
                <button
                    onClick={goToToday}
                    className="buttonLight"
                >
                    Today
                </button>

                <button
                    onClick={goToPreviousMonth}
                    className="buttonDark"
                    aria-label="Previous month"
                >
                    ←
                </button>

                <button
                    onClick={goToNextMonth}
                    className="buttonDark"

                    aria-label="Next month"
                >
                    →
                </button>

                <button
                    onClick={toggleCalendarExpanded}
                    className="buttonLight sm:hidden"
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