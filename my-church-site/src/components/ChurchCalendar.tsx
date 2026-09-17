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

import CalendarToolbar from "./CalendarToolBar";
import EventPopup, {
    type SelectedEvent,
} from "./EventPopup";

import {
    getSelectedEvent,
    highlightEvent,
    loadCalendarEvents,
    removeEventHighlight,
} from "./CalendarHelpers";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";


export default function ChurchCalendar() {
    const calendarRef = useRef<CalendarRef | null>(null);

    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);

    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarExpanded, setCalendarExpanded] = useState(false);

    const calendarStyle = {
        color: "var(--textDark)",
        "--fc-page-bg-color": "var(--body)",
        "--fc-neutral-bg-color": "var(--border)",
        "--fc-border-color": "var(--border)",
        "--fc-today-bg-color": "var(--border)",
    } as CSSProperties;

    function goToPreviousMonth() {
        calendarRef.current?.getApi().prev();
    }

    function goToNextMonth() {
        calendarRef.current?.getApi().next();
    }

    function goToToday() {
        calendarRef.current?.getApi().today();
    }

    return (
        <>
            <div
                className="mt-8 border border-[var(--border)] bg-[var(--body)] p-2 sm:p-4"
                style={calendarStyle}
            >
                <CalendarToolbar
                    calendarTitle={calendarTitle}
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
                    <div
                        className={
                            calendarExpanded
                                ? "w-[900px]"
                                : "w-full"
                        }
                    >
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[themePlugin, dayGridPlugin]}
                            initialView="dayGridMonth"
                            eventDisplay="list-item"
                            headerToolbar={false}
                            events={loadCalendarEvents}
                            height="auto"
                            fixedWeekCount={false}
                            datesSet={(info) =>
                                setCalendarTitle(info.view.title)
                            }
                            eventMouseEnter={highlightEvent}
                            eventMouseLeave={removeEventHighlight}
                            eventClick={(info) =>
                                setSelectedEvent(
                                    getSelectedEvent(info)
                                )
                            }
                        />
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