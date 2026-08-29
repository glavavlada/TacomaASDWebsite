"use client"; // runs on client side

import { useEffect, useState } from "react";

import englishLivestream from "@/locale/en/livestream.json";
import russianLivestream from "@/locale/ru/livestream.json";

import { useLanguage } from "@/app/context/LanguageContext";

// api response definition
type LiveResponse = {
  live: boolean;
  videoId?: string;
};

export default function LiveStreamEmbed() {
  // state hook
  const [data, setData] = useState<LiveResponse | null>(null);

  const { language } = useLanguage();
  const t = language === "en"
    ? englishLivestream
    : russianLivestream;

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
    return (
      <div className="mx-auto pb-5">
        <h3>
          {t.livestream.inactive}{" "}
          <a
            href="https://www.youtube.com/@sdatacoma"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {t.livestream.youTube}
          </a>
        </h3>
      </div>
    );
  }

  // component render
  return (
    <div className="mx-auto pb-10">
      <h1>
        {t.livestream.active}
      </h1>

      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${data.videoId}`}
          title="Live Stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}