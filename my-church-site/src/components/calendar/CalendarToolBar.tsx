type CalendarData = {
    today: string;
    expand: string;
    fit: string;
    previousMonthAriaLabel: string;
    nextMonthAriaLabel: string;
};

type CalendarToolbarProps = {
    calendarTitle: string;
    data: CalendarData;
    calendarExpanded: boolean;
    goToToday: () => void;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
    toggleCalendarExpanded: () => void;
};

export default function CalendarToolbar({
    calendarTitle,
    data,
    calendarExpanded,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    toggleCalendarExpanded,
}: CalendarToolbarProps) {
    return (
        <div className="mb-5 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <h2 className="text-center font-bold text-[var(--textDark)] lg:text-left">
                {calendarTitle}
            </h2>

            <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-auto">
                <button
                    onClick={goToToday}
                    className="buttonLight shrink-0"
                >
                    {data.today}
                </button>


                <button
                    onClick={goToPreviousMonth}
                    className="buttonMedium"
                    aria-label={data.previousMonthAriaLabel}
                >
                    ←
                </button>

                <button
                    onClick={goToNextMonth}
                    className="buttonMedium"
                    aria-label={data.nextMonthAriaLabel}
                >
                    →
                </button>

                <button
                    onClick={toggleCalendarExpanded}
                    className="buttonLight shrink-0 lg:hidden"
                >
                    {calendarExpanded ? data.fit : data.expand}
                </button>
            </div>
        </div>
    );
}
