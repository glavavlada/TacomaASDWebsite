import { google } from "googleapis";
import { NextResponse } from "next/server";

// refreshes the server cache every 20 seconds
export const revalidate = 20;

// runs on a GET request to check if the YouTube livestream is active
export async function GET() {
  try {
    // creates an OAuth2 client to access the YouTube API
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );

    // sets the refresh token to retrieve a new access token
    auth.setCredentials({
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
    });

    // creates a YouTube API client with the authenticated OAuth2 client
    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    // retrieves the list of live broadcasts
    const response = await youtube.liveBroadcasts.list({
      part: ["id", "snippet", "status"],
      mine: true, // only retrieves broadcasts owned by the authenticated account
    });

    // parses the response to find a live broadcast
    const liveBroadcast = response.data.items?.find(
      (broadcast) => broadcast.status?.lifeCycleStatus === "live",
    );

    // if no live broadcast return false
    if (!liveBroadcast?.id) {
      return NextResponse.json({
        live: false,
      });
    }

    // if there is a live broadcast, return true and the video ID
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
