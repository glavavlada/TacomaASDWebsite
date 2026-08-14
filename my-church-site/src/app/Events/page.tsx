"use client";

import englishEvents from "@/locale/en/events.json";
import russianEvents from "@/locale/ru/events.json";

import EventItem from "@/app/Events/EventItem";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Events() {
  const { language } = useLanguage();

  const events =
    language === "en"
      ? englishEvents
      : russianEvents;

  return (
    <div className="w-full">
      <h1 className="mb-6">
        {language === "en"
          ? "Events & Announcements"
          : "События и объявления"}
      </h1>

      <section>
        {/* Render each event using the EventItem component */}
        {events.map((event, index) => (
          <EventItem
            key={`${event.day}-${event.time}-${index}`}
            event={event}
          />
        ))}
      </section>
    </div>
  );
}