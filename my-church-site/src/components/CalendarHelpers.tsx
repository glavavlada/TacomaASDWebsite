import type { ComponentProps } from "react";
import type FullCalendar from "@fullcalendar/react";

import type { SelectedEvent } from "./EventPopup";

type FullCalendarProps = ComponentProps<typeof FullCalendar>;

type EventMouseEnter = NonNullable<
    FullCalendarProps["eventMouseEnter"]
>;

type EventMouseLeave = NonNullable<
    FullCalendarProps["eventMouseLeave"]
>;

type EventClick = NonNullable<
    FullCalendarProps["eventClick"]
>;

type EventClickInfo = Parameters<EventClick>[0];


export const highlightEvent: EventMouseEnter = (info) => {
    Object.assign(info.el.style, {
        cursor: "pointer",
        transition: "background-color 0.15s ease",
        backgroundColor: "#eeeeee",
        borderRadius: "4px",
    });
};


export const removeEventHighlight: EventMouseLeave = (info) => {
    info.el.style.backgroundColor = "transparent";
};


export function getSelectedEvent(
    info: EventClickInfo
): SelectedEvent {
    const { event } = info;

    return {
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.extendedProps.description,
        location: event.extendedProps.location,
        googleLink: event.extendedProps.googleLink,
        meetLink: event.extendedProps.meetLink,
    };
}