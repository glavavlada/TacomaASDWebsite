import type { ComponentProps } from "react";
import type FullCalendar from "@fullcalendar/react";

import type { SelectedEvent } from "./EventPopup";

type FullCalendarProps = ComponentProps<typeof FullCalendar>;

type EventClick = NonNullable<
    FullCalendarProps["eventClick"]
>;

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