"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
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
    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);

    return (
        <>
            <div className="mt-8">
                <FullCalendar
                    plugins={[
                        themePlugin,
                        dayGridPlugin,
                    ]}
                    initialView="dayGridMonth"

                    //fullCalendar load events from our API
                    events="/api/calendar"

                    height="auto"
                    fixedWeekCount={false}

                    //change mouse cursor so person know events are clickable
                    eventMouseEnter={(info) => {
                        info.el.style.cursor = "pointer";
                    }}

                    //runs whenever someone clicks an event
                    eventClick={(info) => {
                        setSelectedEvent({
                            title: info.event.title,
                            start: info.event.start,
                            end: info.event.end,

                            description:
                                info.event.extendedProps.description,

                            location:
                                info.event.extendedProps.location,

                            googleLink:
                                info.event.extendedProps.googleLink,

                            meetLink:
                                info.event.extendedProps.meetLink,
                        });
                    }}
                />
            </div>

            {/*event details popup */}
            {selectedEvent && (
                <div
                    className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 "
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className=" relative w-full max-w-xl rounded-xl bg-[var(--body)] p-6 text-[var(--textDark)] shadow-2xl "
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute right-4 top-3 text-2xl font-bold"
                        >
                        </button>

                        {/* Event title */}
                        <h2 className="mb-4 font-bold">
                            {selectedEvent.title}
                        </h2>

                        {/* Date */}
                        {selectedEvent.start && (
                            <p className="mb-2">
                                <strong>Date:</strong>{" "}
                                {selectedEvent.start.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        )}

                        {/* Time */}
                        {selectedEvent.start && (
                            <p className="mb-4">
                                <strong>Time:</strong>{" "}
                                {selectedEvent.start.toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    }
                                )}

                                {selectedEvent.end && (
                                    <>
                                        {" - "}
                                        {selectedEvent.end.toLocaleTimeString(
                                            "en-US",
                                            {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </>
                                )}
                            </p>
                        )}

                        {/*location */}
                        {selectedEvent.location && (
                            <p className="mb-4">
                                <strong>Location:</strong>{" "}
                                {selectedEvent.location}
                            </p>
                        )}

                        {/*description */}
                        {selectedEvent.description && (
                            <div className="mb-5">
                                <h3 className="mb-2 font-bold">
                                    Details
                                </h3>

                                <p className="whitespace-pre-line leading-7">
                                    {selectedEvent.description}
                                </p>
                            </div>
                        )}

                        {/*google meet button */}
                        {selectedEvent.meetLink && (
                            <a
                                href={selectedEvent.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buttonDark mr-3 inline-block"
                            >
                                Join Meeting
                            </a>
                        )}

                        {/*google calendar link */}
                        {selectedEvent.googleLink && (
                            <a
                                href={selectedEvent.googleLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buttonDark inline-block"
                            >
                                View in Calendar
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}