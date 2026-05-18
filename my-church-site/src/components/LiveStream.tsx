"use client";

import { useEffect, useState } from "react";

type LiveResponse = {
  live: boolean;
  videoId?: string;
};

export default function LiveStreamEmbed() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<LiveResponse | null>(null);

  useEffect(() => {
    setMounted(true);

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

    const interval = setInterval(checkLive, 60000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Collapse entirely if not live
  if (!data || !data.live || !data.videoId) {
    return null;
  }

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