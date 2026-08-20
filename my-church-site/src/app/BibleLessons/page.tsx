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
    <div>
      <h1>{labels.pageTitle}</h1>

      {/* Lesson Layout */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[22rem_1fr]">

        {/* Left Panel */}
        <aside className="flex h-[95vh] min-h-0 flex-col gap-2 bg-[var(--border)] p-1.5">

          {/* Option Buttons */}
          <div className="flex items-center justify-between gap-4 p-2">

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
        <section className="pdfViewer h-[95vh]">
          <h2>{lesson.title}</h2>

          <iframe
            key={lessonUrl}
            src={lessonUrl}
            title={lesson.title}
            className="h-[calc(95vh-2.5rem)] w-full rounded-[0.4rem]"
          />
        </section>

      </div>
    </div >
  );
}