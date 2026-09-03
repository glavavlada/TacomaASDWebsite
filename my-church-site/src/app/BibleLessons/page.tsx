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
  const [pdfLoaded, setPdfLoaded] = useState(false);

  // Select the lesson data for the current language.
  const data = language === "en" ? englishData : russianData;
  const isRussian = language === "ru";

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
    setPdfLoaded(false);
  }

  // Change between student and teacher versions.
  function handleTeacherModeChange(value: boolean) {
    setTeacherMode(value);
    setPageNumber(1);
    setNumPages(0);
    setPdfLoaded(false);
  }

  // PDF controls used on mobile.
  const mobileControls = !isRussian && (
    <div className="flex flex-wrap items-center justify-center gap-2 py-2">
      <button
        type="button"
        disabled={numPages > 0 && pageNumber <= 1}
        onClick={() => setPageNumber(pageNumber - 1)}
        className="buttonLight"
      >
        Previous
      </button>

      <p>
        Page {pageNumber} of {numPages}
      </p>

      <button
        type="button"
        disabled={numPages > 0 && pageNumber >= numPages}
        onClick={() => setPageNumber(pageNumber + 1)}
        className="buttonLight"
      >
        Next
      </button>
    </div>
  );

  // Lesson viewer used on mobile.
  const mobileViewer = isRussian ? (
    <iframe
      key={lessonUrl}
      src={lessonUrl}
      title={lesson.title}
      className="h-[95vh] w-full"
    />
  ) : (
    <div
      className={`overflow-hidden transition-all duration-500 ease-out ${
        pdfLoaded
          ? "max-h-[1000vh] translate-y-0 opacity-100"
          : "max-h-0 -translate-y-4 opacity-0"
      }`}
    >
      <PDFViewer
        file={lessonUrl}
        pageNumber={pageNumber}
        onNumPagesChange={setNumPages}
        onLoaded={() => setPdfLoaded(true)}
      />
    </div>
  );

  return (
    <div className="pb-4">
      <h1>{labels.pageTitle}</h1>
      <h2>{lesson.title}</h2>

      {/* Lesson Layout */}
      <div className="bg-[var(--main)]/35 grid gap-2 p-3 lg:grid-cols-[clamp(24vw,25vw,30vw)_1fr] lg:grid-rows-[auto_95vh]">

        {/* Top-left: Lesson controls */}
        <div className="flex flex-wrap items-center justify-center gap-1 lg:col-start-1 lg:row-start-1">

          {/* Student / Teacher Toggle */}
          <Toggle
            left={labels.student}
            right={labels.teacher}
            value={teacherMode}
            onChange={handleTeacherModeChange}
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

        {/* Top-right: PDF controls - desktop only */}
        {!isRussian && (
          <div className="hidden flex-wrap items-center justify-center gap-2 lg:flex lg:col-start-2 lg:row-start-1">

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
        )}

        {/* Bottom-left: Lesson selection */}
        <aside className="mx-[clamp(-1rem,-0.5rem,-0rem)] sm:mx-0 overflow-auto lg:col-start-1 lg:row-start-2 lg:h-[98vh]">
          <LessonScroll
            lessons={lessons}
            selectedLesson={selectedLesson}
            setSelectedLesson={handleLessonChange}
            language={language}
            mobileControls={mobileControls}
            mobileViewer={mobileViewer}
          />
        </aside>

        {/* Bottom-right: Lesson viewer - desktop only */}
        <section className="hidden lg:col-start-2 lg:row-start-2 lg:block lg:h-[98vh]">
          {isRussian ? (
            <iframe
              key={lessonUrl}
              src={lessonUrl}
              title={lesson.title}
              className="h-full w-full"
            />
          ) : (
            <PDFViewer
              file={lessonUrl}
              pageNumber={pageNumber}
              onNumPagesChange={setNumPages}
              onLoaded={() => setPdfLoaded(true)}
            />
          )}
        </section>

      </div>
    </div>
  );
}