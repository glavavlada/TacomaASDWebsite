"use client"; // runs on client side

import { useEffect, useState } from "react";

// api response definition
type LiveResponse = {
  live: boolean;
  videoId?: string;
};

export default function LiveStreamEmbed() {
  // state hook
  const [data, setData] = useState<LiveResponse | null>(null);

  // component initialization
  useEffect(() => {
    async function checkLive() {
      try {
        const res = await fetch("/api/youtube-live");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    }

    checkLive();

    // ping every 60 seconds
    const interval = setInterval(checkLive, 60000);

    // clean up
    return () => clearInterval(interval);
  }, []);

  // collapse component if not live
  if (!data || !data.live || !data.videoId) {
    return null;
  }

  // component render
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${data.videoId}`}
        title="Live Stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}