import { google } from "googleapis";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// creates the OAuth client once when the server module is loaded
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// gives the OAuth client the refresh token 
auth.setCredentials({
  refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
});

// creates the authenticated YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth
});

// pings YouTube and returns the current livestream status
const getLiveStream = unstable_cache(
  async () => {
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
      return {
        live: false,
      };
    }

    // if there is a live broadcast, return true and the video ID
    return {
      live: true,
      videoId: liveBroadcast.id,
    };
  }, // caches the result for 20 seconds
  ["youtube-live-status"],
  {
    revalidate: 20,
  },
);

// runs on a GET request
// checks the cache if the livestream is active
export async function GET() {
  try {
    // get livestream status
    const data = await getLiveStream();

    return NextResponse.json(data);
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
