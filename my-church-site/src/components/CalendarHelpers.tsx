import type { ComponentProps } from "react";
import type FullCalendar from "@fullcalendar/react";

import type { SelectedEvent } from "./EventPopup";

type FullCalendarProps = ComponentProps<typeof FullCalendar>;

type EventsFunction = Exclude<
    FullCalendarProps["events"],
    undefined | string | unknown[]
>;

type EventMouseEnter = NonNullable<
    FullCalendarProps["eventMouseEnter"]
>;

type EventMouseLeave = NonNullable<
    FullCalendarProps["eventMouseLeave"]
>;

type EventClick = NonNullable<
    FullCalendarProps["eventClick"]
>;


export const loadCalendarEvents: EventsFunction = async (
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
            `/api/calendar?${params}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to load events: ${response.status}`
            );
        }

        successCallback(await response.json());
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

type EventClickInfo = Parameters<EventClick>[0];

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