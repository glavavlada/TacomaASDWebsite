"use client";

import ChurchCalendar from "@/components/calendar/ChurchCalendar";
import { useLanguage } from "@/app/context/LanguageContext";

import englishEvents from "@/locale/en/events.json";
import russianEvents from "@/locale/ru/events.json";

export default function Events() {
  const { language } = useLanguage();

  const data =
    language === "en"
      ? englishEvents
      : russianEvents;

  return (
    <div className="w-full">
      <h1 className="mb-6">
        {data.title}
      </h1>

      <ChurchCalendar />
    </div>
  );
}