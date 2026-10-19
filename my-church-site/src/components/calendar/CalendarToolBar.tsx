type CalendarData = {
    today: string;
    previousMonthAriaLabel: string;
    nextMonthAriaLabel: string;
};

type CalendarToolbarProps = {
    calendarTitle: string;
    data: CalendarData;
    goToToday: () => void;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
};

export default function CalendarToolbar({
    calendarTitle,
    data,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
}: CalendarToolbarProps) {
    return (
        <div className="mb-5 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <h2 className="text-center md:text-left">
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
