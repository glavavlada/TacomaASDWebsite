import { NextRequest, NextResponse } from "next/server";
import { youtubeOAuth } from "@/app/lib/youtubeOAuth";

// redirected to this route after the one-time authorization of the app with Google to retrieve the refresh token
export async function GET(request: NextRequest) {
  // gets the authorization code from the query parameters
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code received" },
      { status: 400 }
    );
  }

  try {
    // exchanges the authorization code for access and refresh tokens
    const { tokens } = await youtubeOAuth.getToken(code);
    // KEEP COMMENTED OUT UNLESS OBTAINING A NEW REFRESH TOKEN
    // console.log("Google OAuth tokens:", tokens);

    return NextResponse.json({
      success: true,
      message: "Authorization successful. Check your terminal.",
    });
  } catch (error) {
    console.error("OAuth error:", error);

    return NextResponse.json(
      { error: "Failed to exchange authorization code" },
      { status: 500 }
    );
  }
}