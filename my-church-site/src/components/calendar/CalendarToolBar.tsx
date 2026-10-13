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
        <div className="mb-5 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <h2 className="text-center font-bold text-[var(--textDark)] md:text-left">
                {calendarTitle}
            </h2>

            <div className="flex w-full flex-wrap items-center justify-center gap-2 md:w-auto">
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
            </div>
        </div>
    );
}
