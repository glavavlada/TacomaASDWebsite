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
  const { language } = useLanguage();

  const [selectedLesson, setSelectedLesson] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const data = language === "en" ? englishData : russianData;
  const isRussian = language === "ru";

  const { labels, lessons } = data;
  const lesson = lessons[selectedLesson];

  const lessonUrl = teacherMode
    ? lesson.teacher
    : lesson.student;

  function resetViewer() {
    setPageNumber(1);
    setNumPages(0);
    setPdfLoaded(false);
  }

  function handleLessonChange(index: number) {
    setSelectedLesson(index);
    resetViewer();
  }

  function handleTeacherModeChange(value: boolean) {
    setTeacherMode(value);
    resetViewer();
  }

  const pdfControls = !isRussian ? (
    <PDFControls
      pageNumber={pageNumber}
      numPages={numPages}
      onPageChange={setPageNumber}
    />
  ) : null;

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

  return (
    <div className="pb-4">
      <h1>{labels.pageTitle}</h1>
      <p className="pb-4">{labels.description}</p>
      <h2>{lesson.title}</h2>

      <div className="grid gap-2 bg-[var(--tint)] p-3 lg:grid-cols-[clamp(24vw,25vw,30vw)_1fr] lg:grid-rows-[auto_98vh]">

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1 lg:col-start-1 lg:row-start-1">
          <Toggle
            left={labels.student}
            right={labels.teacher}
            value={teacherMode}
            onChange={handleTeacherModeChange}
          />

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

        {/* Lesson List */}
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