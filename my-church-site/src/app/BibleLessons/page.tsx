import type { Metadata } from "next";
import BibleLessons from "./BibleLessons";

// wrapper from the BibleLessons component to provide metadata for the page
export const metadata: Metadata = {
  title: "Sabbath School Bible Lessons | Tacoma Russian SDA Church",
  description:
    "Current Sabbath School Bible lessons for the Tacoma Russian Seventh-day Adventist Church, available in English and Russian.",
};

export default function BibleLessonsPage() {
  return <BibleLessons />;
}