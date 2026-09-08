"use client";

import {
    useRef,
    useState,
    type CSSProperties,
} from "react";

import FullCalendar, {
    type CalendarRef,
} from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

type SelectedEvent = {
    title: string;
    start: Date | null;
    end: Date | null;
    description?: string;
    location?: string;
    googleLink?: string;
    meetLink?: string;
};

export default function ChurchCalendar() {
    const calendarRef =
        useRef<CalendarRef | null>(null);

    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);

    const [calendarTitle, setCalendarTitle] =
        useState("");

    const calendarStyle = {
        color: "var(--textDark)",

        "--fc-page-bg-color": "var(--body)",
        "--fc-neutral-bg-color": "var(--border)",
        "--fc-border-color": "var(--border)",

        "--fc-event-bg-color": "var(--main)",
        "--fc-event-border-color": "var(--highlight)",
        "--fc-event-text-color": "var(--textLight)",

        "--fc-today-bg-color": "var(--border)",
    } as CSSProperties;

    function goToPreviousMonth() {
        calendarRef.current
            ?.getApi()
            .prev();
    }

    function goToNextMonth() {
        calendarRef.current
            ?.getApi()
            .next();
    }

    function goToToday() {
        calendarRef.current
            ?.getApi()
            .today();
    }

    return (
        <>
            <div
                className=" mt-8 border border-[var(--border)] bg-[var(--body)] p-4 " style={calendarStyle} >
                {/* Custom calendar toolbar */}
                <div
                    className=" mb-5 flex flex-wrap items-center justify-between gap-4 ">
                    <h2 className="font-bold text-[var(--textDark)]">
                        {calendarTitle}
                    </h2>

                    <div className="flex items-center gap-2">
                        <button onClick={goToToday} className="buttonLight">
                            Today
                        </button>

                        <button
                            onClick={goToPreviousMonth} className="buttonDark" aria-label="Previous month">
                            ←
                        </button>

                        <button
                            onClick={goToNextMonth} className="buttonDark" aria-label="Next month" >
                            →
                        </button>
                    </div>
                </div>

                <FullCalendar
                    ref={calendarRef}

                    plugins={[themePlugin, dayGridPlugin,]}

                    initialView="dayGridMonth"

                    //hide FullCalendar built in toolbar
                    headerToolbar={false}

                    events={async (fetchInfo, successCallback, failureCallback) => {
                        try {
                            const params =
                                new URLSearchParams({
                                    start:
                                        fetchInfo.startStr,
                                    end:
                                        fetchInfo.endStr,
                                });

                            const response =
                                await fetch(
                                    `/api/calendar?${params.toString()}`,
                                    {
                                        cache: "no-store",
                                    }
                                );

                            if (!response.ok) {
                                throw new Error(
                                    `Failed to load events: ${response.status}`
                                );
                            }

                            const events =
                                await response.json();

                            successCallback(events);
                        } catch (error) {
                            console.error(
                                "Failed to load calendar events:",
                                error
                            );

                            if (
                                error instanceof Error
                            ) {
                                failureCallback(error);
                            } else {
                                failureCallback(
                                    new Error(
                                        "Unknown calendar loading error"
                                    )
                                );
                            }
                        }
                    }}

                    height="auto"

                    fixedWeekCount={false}

                    //update React title whenever displayed month changes
                    datesSet={(dateInfo) => {
                        setCalendarTitle(
                            dateInfo.view.title
                        );
                    }}

                    eventMouseEnter={(info) => {
                        info.el.style.cursor =
                            "pointer";

                        info.el.style.backgroundColor =
                            "var(--highlight)";
                    }}

                    eventMouseLeave={(info) => {
                        info.el.style.backgroundColor =
                            "var(--main)";
                    }}

                    eventClick={(info) => {
                        setSelectedEvent({
                            title:
                                info.event.title,

                            start:
                                info.event.start,

                            end:
                                info.event.end,

                            description:
                                info.event
                                    .extendedProps
                                    .description,

                            location:
                                info.event
                                    .extendedProps
                                    .location,

                            googleLink:
                                info.event
                                    .extendedProps
                                    .googleLink,

                            meetLink:
                                info.event
                                    .extendedProps
                                    .meetLink,
                        });
                    }}
                />
            </div>

            {/* Event details popup */}
            {selectedEvent && (
                <div
                    className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 "
                    onClick={() =>
                        setSelectedEvent(null)
                    }
                >
                    <div
                        className=" relative w-full max-w-xl border border-[var(--border)] bg-[var(--body)] p-6 text-[var(--textDark)] shadow-2xl "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/*close button */}
                        <button
                            onClick={() =>
                                setSelectedEvent(null)
                            }
                            className=" buttonDark absolute right-4 top-4 " >
                            ×
                        </button>

                        {/* Event title */}
                        <h2 className="mb-4 pr-16 font-bold">
                            {selectedEvent.title}
                        </h2>

                        {/* Date */}
                        {selectedEvent.start && (
                            <p className="mb-2">
                                <strong>
                                    Date:
                                </strong>{" "}
                                {selectedEvent.start.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday:
                                            "long",
                                        month:
                                            "long",
                                        day:
                                            "numeric",
                                        year:
                                            "numeric",
                                    }
                                )}
                            </p>
                        )}

                        {/* Time */}
                        {selectedEvent.start && (
                            <p className="mb-4">
                                <strong>
                                    Time:
                                </strong>{" "}
                                {selectedEvent.start.toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour:
                                            "numeric",
                                        minute:
                                            "2-digit",
                                    }
                                )}

                                {selectedEvent.end && (
                                    <>
                                        {" - "}

                                        {selectedEvent.end.toLocaleTimeString(
                                            "en-US",
                                            {
                                                hour:
                                                    "numeric",
                                                minute:
                                                    "2-digit",
                                            }
                                        )}
                                    </>
                                )}
                            </p>
                        )}

                        {/* Location */}
                        {selectedEvent.location && (
                            <p className="mb-4">
                                <strong>
                                    Location:
                                </strong>{" "}
                                {
                                    selectedEvent.location
                                }
                            </p>
                        )}

                        {/* Description */}
                        {selectedEvent.description && (
                            <div className="mb-5">
                                <h3 className="mb-2 font-bold">
                                    Details
                                </h3>

                                <p className="whitespace-pre-line leading-7">
                                    {
                                        selectedEvent.description
                                    }
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                            {/* Google Meet */}
                            {selectedEvent.meetLink && (
                                <a
                                    href={selectedEvent.meetLink}
                                    target="_blank" rel="noopener noreferrer" className="buttonDark" >
                                    Join Meeting
                                </a>
                            )}

                            {/*foogle Calendar */}
                            {selectedEvent.googleLink && (
                                <a
                                    href={selectedEvent.googleLink}
                                    target="_blank" rel="noopener noreferrer" className="buttonLight">
                                    View in Calendar
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}