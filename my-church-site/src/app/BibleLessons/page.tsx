"use client";

import { useState } from "react";
import Link from "next/link";

import englishData from "@/locale/en/bibleLessons.json";
import russianData from "@/locale/ru/bibleLessons.json";

import { useLanguage } from "@/app/context/LanguageContext";
import Toggle from "@/components/Toggle";
import LessonScroll from "@/components/LessonScroll";

export default function BibleLessons() {
  // Read the language selected in the header.
  const { language } = useLanguage();

  // Track which lesson is selected.
  const [selectedLesson, setSelectedLesson] = useState(0);

  // false = student version
  // true = teacher version
  const [teacherMode, setTeacherMode] = useState(false);

  // Select the lesson data for the current language.
  const data = language === "en" ? englishData : russianData;

  // Separate the labels and lessons.
  const labels = data.labels;
  const lessons = data.lessons;

  // Get the currently selected lesson.
  const lesson = lessons[selectedLesson];

  // Choose either the teacher PDF or student PDF.
  const lessonUrl = teacherMode
    ? lesson.teacher
    : lesson.student;

  return (
    <div className="pb-4">
      <h1>{labels.pageTitle}</h1>

      {/* Lesson Layout */}
      <div className="grid h-[95vh] grid-cols-1 items-stretch gap-4 lg:grid-cols-[clamp(22rem,25vw,32rem)_1fr]">

        {/* Left Panel */}
        <aside className="flex min-h-0 flex-col gap-2 bg-[var(--border)] p-1.5">

          {/* Option Buttons */}
          <div className="flex shrink-0 items-center justify-between gap-4 p-2">

            {/* Student / Teacher Toggle */}
            <Toggle
              left={labels.student}
              right={labels.teacher}
              value={teacherMode}
              onChange={setTeacherMode}
            />

            {/* Open Lesson */}
            <Link
              href={lessonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="buttonLight"
            >
              {labels.openLesson}
            </Link>

          </div>

          {/* Lesson selection */}
          <LessonScroll
            lessons={lessons}
            selectedLesson={selectedLesson}
            setSelectedLesson={setSelectedLesson}
            language={language}
          />

        </aside>

        {/* Right-hand lesson viewer */}
        <section className="flex min-h-0 flex-col">
          <h2 className="shrink-0">{lesson.title}</h2>

          <iframe
            key={lessonUrl}
            src={lessonUrl}
            title={lesson.title}
            className="min-h-0 w-full flex-1 rounded-[0.4rem]"
          />
        </section>

      </div>
    </div>
  );
}