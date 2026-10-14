"use client";

import { useState } from "react";
import Link from "next/link";

import englishData from "@/locale/en/bibleLessons.json";
import russianData from "@/locale/ru/bibleLessons.json";

import { useLanguage } from "@/app/context/LanguageContext";
import Toggle from "@/components/Toggle";
import LessonScroll from "@/components/bibleLessons/LessonScroll";
import PDFControls from "@/components/bibleLessons/PDFControls";
import LessonViewer from "@/components/bibleLessons/LessonViewer";

export default function BibleLessons() {
  // language context and translation data
  const { language, languageLoaded } = useLanguage();
  const data = language === "en" ? englishData : russianData;
  const isRussian = language === "ru";

  // lesson state
  const { labels, lessons } = data;
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const lesson = lessons[selectedLesson];
   const lessonUrl = teacherMode
    ? lesson.teacher
    : lesson.student;

  // PDF viewer state
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  // resets the PDF viewer state
  function resetViewer() {
    setPageNumber(1);
    setNumPages(0);
    setPdfLoaded(false);
  }

  // handles lesson selection change
  function handleLessonChange(index: number) {
    if (index !== selectedLesson) {
      setSelectedLesson(index);
      resetViewer();
    }
  }

  // handles teacher/student toggle change
  function handleTeacherModeChange(value: boolean) {
    setTeacherMode(value);
    resetViewer();
  }

  // PDF controls, shows on EN
  const pdfControls = !isRussian ? (
    <PDFControls
      pageNumber={pageNumber}
      numPages={numPages}
      onPageChange={setPageNumber}
    />
  ) : null;

  // mobile viewer to be rendered in lesson accordion
  const mobileViewer = (
    <LessonViewer
      isRussian={isRussian}
      lessonUrl={lessonUrl}
      lessonTitle={lesson.title}
      pageNumber={pageNumber}
      onNumPagesChange={setNumPages}
      onLoaded={() => setPdfLoaded(true)}
      pdfLoaded={pdfLoaded}
      mobile
    />
  );

  // if the language context is not loaded avoid rendering
  if (!languageLoaded) {
    return null;
  }

  return (
    <div className="pb-4">
      <h1>{labels.pageTitle}</h1>
      <p className="pb-4">{labels.description}</p>
      <h2>{lesson.title}</h2>

      {/* Lesson Content */}
      <div className="grid gap-2 bg-[var(--tint)] p-3 lg:grid-cols-[clamp(24vw,25vw,30vw)_1fr] lg:grid-rows-[auto_98vh]">

        {/* Content Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1 lg:col-start-1 lg:row-start-1">

          {/* hide student/teacher toggle when on russian */}
          {!isRussian && (
            <Toggle
              left={labels.student}
              right={labels.teacher}
              value={teacherMode}
              onChange={handleTeacherModeChange}
            />
          )}

          {/* open lesson button */}
          <Link
            href={lessonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="buttonMedium"
          >
            {labels.openLesson}
          </Link>
        </div>

        {/* PDF Controls */}
        {!isRussian && (
          <div className="hidden flex-wrap items-center justify-center gap-2 lg:col-start-2 lg:row-start-1 lg:flex">
            {pdfControls}
          </div>
        )}

        {/* Lesson List. handles mobile lesson rendering */}
        <aside className="mx-[clamp(-1rem,-0.5rem,-0rem)] overflow-auto sm:mx-0 lg:col-start-1 lg:row-start-2 lg:h-[98vh]">
          <LessonScroll
            lessons={lessons}
            selectedLesson={selectedLesson}
            setSelectedLesson={handleLessonChange}
            language={language}
            mobileControls={pdfControls}
            mobileViewer={mobileViewer}
          />
        </aside>

        {/* Desktop Viewer */}
        <section className="hidden lg:col-start-2 lg:row-start-2 lg:block lg:h-[98vh]">
          <LessonViewer
            isRussian={isRussian}
            lessonUrl={lessonUrl}
            lessonTitle={lesson.title}
            pageNumber={pageNumber}
            onNumPagesChange={setNumPages}
            onLoaded={() => setPdfLoaded(true)}
            pdfLoaded={pdfLoaded}
          />
        </section>

      </div>
    </div>
  );
}