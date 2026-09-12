"use client";

import ChurchCalendar from "@/components/ChurchCalendar";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Events() {
  const { language } = useLanguage();

  return (
    <div className="w-full">
      <h1 className="mb-6">
        {language === "en"
          ? "Events & Announcements"
          : "События и объявления"}
      </h1>

      <ChurchCalendar />
    </div>
  );
}