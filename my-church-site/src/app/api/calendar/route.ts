import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const calendar = google.calendar({
      version: "v3",
      auth: process.env.GOOGLE_CALENDAR_API_KEY,
    });

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_EN_ID,
      //only get events from current time forward
      timeMin: new Date().toISOString(),

      //expands recurring events into individual events
      singleEvents: true,

      //sort events by starting time
      orderBy: "startTime",

      maxResults: 20,
    });

    //convert Google event format into FullCalendar format
    const events =
      response.data.items?.map((event) => ({
        id: event.id,

        //Google calls event title summary
        title: event.summary ?? "Untitled Event",

        //timed event or all day event
        start: event.start?.dateTime ?? event.start?.date,
        end: event.end?.dateTime ?? event.end?.date,

        // Extra information that FullCalendar can keep with event for us
        extendedProps: {
          description: event.description ?? "",
          location: event.location ?? "",
          googleLink: event.htmlLink ?? "",
          meetLink: event.hangoutLink ?? "",
        },
      })) ?? [];

    return NextResponse.json(events, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Google Calendar error:", error);

    return NextResponse.json(
      {
        error: "Failed to load calendar",
      },
      {
        status: 500,
      },
    );
  }
}
