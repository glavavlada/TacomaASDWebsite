import { NextResponse } from "next/server";
import { youtubeOAuth } from "@/app/lib/youtube";

export async function GET() {
  const authUrl = youtubeOAuth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  console.log("OAuth URL:", authUrl);
  return NextResponse.redirect(authUrl);
}
