import { NextResponse } from "next/server";

export async function GET() {
  // local environmental variables
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet` +
    `&channelId=${channelId}` +
    `&eventType=live` +
    `&type=video` +
    `&key=${apiKey}`;

  try {
    const res = await fetch(url, {
      // cache response for 60 seconds
      next: { revalidate: 60 },
    });

    const data = await res.json();

    // no livestream
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ live: false });
    }

    const videoId = data.items[0].id.videoId;

    return NextResponse.json({
      live: true,
      videoId,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    );
  }
}