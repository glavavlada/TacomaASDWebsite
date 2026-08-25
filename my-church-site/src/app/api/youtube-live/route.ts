import { google } from "googleapis";
import { NextResponse } from "next/server";

export const revalidate = 20;

export async function GET() {
  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );

    auth.setCredentials({
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
    });

    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    const response = await youtube.liveBroadcasts.list({
      part: ["id", "snippet", "status"],
      mine: true,
    });

    const liveBroadcast = response.data.items?.find(
      (broadcast) => broadcast.status?.lifeCycleStatus === "live",
    );

    if (!liveBroadcast?.id) {
      return NextResponse.json({
        live: false,
      });
    }

    return NextResponse.json({
      live: true,
      videoId: liveBroadcast.id,
    });
  } catch (error) {
    console.error("YouTube livestream check failed:", error);

    return NextResponse.json(
      {
        error: "Failed to check YouTube livestream",
      },
      { status: 500 },
    );
  }
}
