"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import englishData from "@/locale/en/bibleLessons.json";
import russianData from "@/locale/ru/bibleLessons.json";

import { useLanguage } from "@/app/context/LanguageContext";
import Toggle from "@/components/Toggle";
import LessonScroll from "@/components/LessonScroll";

const PDFViewer = dynamic(
  () => import("@/components/PDFViewer"),
  {
    ssr: false,
  }
);

export default function BibleLessons() {
  // Read the language selected in the header.
  const { language } = useLanguage();

  // Track which lesson is selected.
  const [selectedLesson, setSelectedLesson] = useState(0);

  // false = student version
  // true = teacher version
  const [teacherMode, setTeacherMode] = useState(false);

  // PDF state
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

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

  // Change lesson and reset PDF to page 1.
  function handleLessonChange(index: number) {
    setSelectedLesson(index);
    setPageNumber(1);
    setNumPages(0);
  }

  return (
    <div className="pb-4">
      <h1>{labels.pageTitle}</h1>
      <h2 className="shrink-0">
        {lesson.title}
      </h2>

      {/* Lesson Layout */}
      <div className="bg-[var(--main)]/35 grid grid-cols-1 gap-4 p-3 lg:grid-cols-[clamp(22rem,25vw,32rem)_1fr] lg:grid-rows-[auto_1fr]">

        {/* Top-left: Lesson controls */}
        <div className="flex items-center justify-center gap-4">

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

        {/* Top-right: PDF controls */}
        <div className="flex items-center justify-center gap-4">

          {/* Previous */}
          <button
            type="button"
            disabled={numPages > 0 && pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="buttonLight"
          >
            Previous
          </button>

          {/* Page number */}
          <p>
            Page {pageNumber} of {numPages}
          </p>

          {/* Next */}
          <button
            type="button"
            disabled={numPages > 0 && pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="buttonLight"
          >
            Next
          </button>

        </div>

        {/* Bottom-left: Lesson selection */}
        <aside className="min-h-0">
          <LessonScroll
            lessons={lessons}
            selectedLesson={selectedLesson}
            setSelectedLesson={handleLessonChange}
            language={language}
          />
        </aside>

        {/* Bottom-right: PDF viewer */}
        <section className="flex min-h-[70vh] flex-col lg:min-h-0">
          <PDFViewer
            file={lessonUrl}
            pageNumber={pageNumber}
            onNumPagesChange={setNumPages}
          />

        </section>

      </div>
    </div>
  );
}