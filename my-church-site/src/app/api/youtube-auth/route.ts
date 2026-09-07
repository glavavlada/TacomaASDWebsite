import { NextResponse } from "next/server";
import { youtubeOAuth } from "@/app/lib/youtubeOAuth";

// starts the one-time YouTube API authorization
// redirects to Google's OAuth server to authorize through the OAuth object
// visit to start the authorization process locally http://localhost:3000/api/youtube-auth
export async function GET() {
  const authUrl = youtubeOAuth.generateAuthUrl({
    access_type: "offline", // required for a refresh token
    prompt: "consent", // forces the consent screen to show every time
    scope: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  return NextResponse.redirect(authUrl);
}
