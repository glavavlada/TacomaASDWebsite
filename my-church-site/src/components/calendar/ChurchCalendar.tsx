"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/app/context/LanguageContext";
import englishData from "@/locale/en/events.json";
import russianData from "@/locale/ru/events.json";

import FullCalendar from "@fullcalendar/react";
import type { EventSourceFunc } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

import CalendarToolbar from "./CalendarToolBar";
import EventPopup, {
    type SelectedEvent,
} from "./EventPopup";
import {
    getSelectedEvent
} from "./CalendarHelpers";

export default function ChurchCalendar() {
    const MD_BREAKPOINT = "48rem";

    // Get the current language and corresponding data
    const { language } = useLanguage();
    const data = language === "en"
        ? englishData
        : russianData;
    const calendarLocale = language === "ru" ? "ru" : "en";

    // calendar state management and dependencies
    const calendarRef = useRef<FullCalendar | null>(null);
    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);
    const [calendarTitle, setCalendarTitle] = useState("");

    // helper navigation functions
    function goToPreviousMonth() {
        calendarRef.current?.getApi().prev();
    }

    function goToNextMonth() {
        calendarRef.current?.getApi().next();
    }

    function goToToday() {
        calendarRef.current?.getApi().today();
    }

    // useCallback allows the function to only be defined once isntead of 
    // recreating on each re-render
    const loadCalendarEvents = useCallback<EventSourceFunc>(
        async (fetchInfo, successCallback, failureCallback) => {
            try {
                const params = new URLSearchParams({
                    start: fetchInfo.startStr,
                    end: fetchInfo.endStr,
                });

                const response = await fetch(
                    `/api/calendar?${params.toString()}`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to load events: ${response.status}`
                    );
                }

                const events = await response.json();
                console.log("Events received by FullCalendar:", events);

                successCallback(events);
            } catch (error) {
                const calendarError =
                    error instanceof Error
                        ? error
                        : new Error("Unknown calendar loading error");

                console.error(
                    "Failed to load calendar events:",
                    calendarError
                );

                failureCallback(calendarError);
            }
        },
        []
    );

    // enables list view on small screens and month view on larger screens
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(width < ${MD_BREAKPOINT})`);

        function updateCalendarView() {
            const api = calendarRef.current?.getApi();
            if (!api) return;

            api.changeView(
                mediaQuery.matches ? "listMonth" : "dayGridMonth"
            );
        }

        updateCalendarView();
        mediaQuery.addEventListener("change", updateCalendarView);

        return () => {
            mediaQuery.removeEventListener("change", updateCalendarView);
        };
    }, []);

    return (
        <>
            <div
                className="py-2 p-4 bg-[var(--tint)]">
                <CalendarToolbar
                    calendarTitle={calendarTitle}
                    data={data}
                    goToToday={goToToday}
                    goToPreviousMonth={goToPreviousMonth}
                    goToNextMonth={goToNextMonth}
                />

                <div className="calendar-wrapper">
                    <FullCalendar
                        ref={calendarRef}
                        locale={calendarLocale}
                        timeZone="local"
                        plugins={[dayGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        eventDisplay="list-item"
                        noEventsContent={data.noEvents}


                        eventContent={(info) => (
                            <div
                                className="w-full min-w-0 event"
                                title={info.event.title}
                            >
                                <div
                                    className="leading-snug wrap-break-word line-clamp-2"
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
                            if (info.view.type !== "dayGridMonth") return;

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
                            const title = info.view.currentStart.toLocaleDateString(locale, {
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

            {selectedEvent && (
                <EventPopup
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}

        </>
    );
}