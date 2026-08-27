import { NextRequest, NextResponse } from "next/server";
import { youtubeOAuth } from "@/app/lib/youtube";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code received" },
      { status: 400 }
    );
  }

  try {
    const { tokens } = await youtubeOAuth.getToken(code);

    console.log("Google OAuth tokens:", tokens);

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