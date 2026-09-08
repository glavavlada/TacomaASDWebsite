import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const calendar = google.calendar({
      version: "v3",
      auth: process.env.GOOGLE_CALENDAR_API_KEY,
    });

    /*
      FullCalendar sends the beginning and end of the
      currently visible calendar range.

      Example:

      /api/calendar?
        start=2026-08-30...
        end=2026-10-11...
    */
    const start = request.nextUrl.searchParams.get("start");
    const end = request.nextUrl.searchParams.get("end");

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_EN_ID,

      // Use FullCalendar's visible date range
      timeMin: start ?? undefined,
      timeMax: end ?? undefined,

      // Expand repeating events into actual occurrences
      singleEvents: true,

      // Sort events chronologically
      orderBy: "startTime",

      maxResults: 100,
    });

    /*
      Convert Google's format into the format
      FullCalendar understands.
    */
    const events =
      response.data.items?.map((event) => ({
        id: event.id,

        title: event.summary ?? "Untitled Event",

        start: event.start?.dateTime ?? event.start?.date,

        end: event.end?.dateTime ?? event.end?.date,

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
