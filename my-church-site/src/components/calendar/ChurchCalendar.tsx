"use client";

import {
    useRef,
    useState,
    type CSSProperties,
} from "react";

import { useLanguage } from "@/app/context/LanguageContext";

import englishData from "@/locale/en/events.json";
import russianData from "@/locale/ru/events.json";

import FullCalendar, {
    type CalendarRef,
    type EventSourceFunc,
} from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/classic";

import CalendarToolbar from "./CalendarToolBar";
import EventPopup, {
    type SelectedEvent,
} from "./EventPopup";

import {
    getSelectedEvent
} from "./CalendarHelpers";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";


export default function ChurchCalendar() {
    const { language } = useLanguage();

    const data = language === "en"
        ? englishData
        : russianData;
    const calendarLocale = language === "ru" ? "ru" : "en";

    const calendarRef = useRef<CalendarRef | null>(null);

    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);

    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarExpanded, setCalendarExpanded] = useState(false);

    function goToPreviousMonth() {
        calendarRef.current?.getApi().prev();
    }

    function goToNextMonth() {
        calendarRef.current?.getApi().next();
    }

    function goToToday() {
        calendarRef.current?.getApi().today();
    }

    const loadCalendarEvents: EventSourceFunc = async (
        fetchInfo,
        successCallback,
        failureCallback
    ) => {
        try {
            const params = new URLSearchParams({
                start: fetchInfo.startStr,
                end: fetchInfo.endStr,
            });

            const response = await fetch(
                `/api/calendar?${params.toString()}`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to load events: ${response.status}`
                );
            }

            const events = await response.json();

            successCallback(events);
        } catch (error) {
            const calendarError =
                error instanceof Error
                    ? error
                    : new Error(
                        "Unknown calendar loading error"
                    );

            console.error(
                "Failed to load calendar events:",
                calendarError
            );

            failureCallback(calendarError);
        }
    };

    return (
        <>
            <div
                className="py-2 lg:p-4 bg-[var(--tint)]">
                <CalendarToolbar
                    calendarTitle={calendarTitle}
                    data={data}
                    calendarExpanded={calendarExpanded}
                    goToToday={goToToday}
                    goToPreviousMonth={goToPreviousMonth}
                    goToNextMonth={goToNextMonth}
                    toggleCalendarExpanded={() =>
                        setCalendarExpanded((value) => !value)
                    }
                />

                <div
                    className={
                        calendarExpanded
                            ? "w-full overflow-x-auto"
                            : "w-full overflow-hidden"
                    }
                >
                    <div className={calendarExpanded ? "w-[900px]" : "w-full"}>
                        <div className="calendar-wrapper">
                            <FullCalendar
                                ref={calendarRef}
                                locale={calendarLocale}
                                timeZone="local"
                                plugins={[themePlugin, dayGridPlugin]}
                                initialView="dayGridMonth"
                                eventDisplay="list-item"


                                eventContent={(info) => (
                                    <div
                                        className="w-full min-w-0 event"
                                        title={info.event.title}
                                    >
                                        <div
                                            className="text-xs sm:text-sm leading-snug wrap-break-word line-clamp-2"
                                        >
                                            {info.timeText && (
                                                <span className="mr-1">
                                                    {info.timeText}
                                                </span>
                                            )}
                                            {info.event.title}
                                        </div>
                                    </div>
                                )}


                                eventDidMount={(info) => {
                                    const eventElement = info.el;

                                    const dot = eventElement.firstElementChild;

                                    if (
                                        dot instanceof HTMLElement &&
                                        dot.nextElementSibling
                                    ) {
                                        dot.style.display = "none";
                                    }
                                }}
                                headerToolbar={false}
                                events={loadCalendarEvents}
                                height="auto"
                                fixedWeekCount={false}

                                // month abd year formatting
                                datesSet={(info) => {
                                    // locale selector
                                    const locale = language === "ru" ? "ru-RU" : "en-US";
                                    const title = info.start.toLocaleDateString(locale, {
                                        month: "long", // full month name
                                        year: "numeric", // 4 digit year
                                    });
                                    // if russian, capitalize the month and remove "г."
                                    const formattedTitle =
                                        language === "ru"
                                            ? title.charAt(0).toUpperCase() +
                                            title.slice(1).replace(" г.", "")
                                            : title;

                                    setCalendarTitle(formattedTitle);
                                }}

                                eventClick={(info) =>
                                    setSelectedEvent(
                                        getSelectedEvent(info)
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedEvent && (
                <EventPopup
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}

        </>
    );
}