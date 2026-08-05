"use client";

import { useState } from "react";
import Link from "next/link";

import englishData from "@/locale/en/bibleLessons.json";
import russianData from "@/locale/ru/bibleLessons.json";

import { useLanguage } from "@/app/context/LanguageContext";

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
    <div className="lessonPage">
      <h1>{labels.pageTitle}</h1>

      <div className="lessonLayout">
        {/* Left-hand lesson menu */}
        <aside className="lessonSidebar">
          <div className="lessonOptions">
            <div className="lessonButtons">
              {/* Student and teacher version selector */}
              <div className="lessonVersionToggle">
                <button
                  type="button"
                  onClick={() => setTeacherMode(false)}
                  className={!teacherMode ? "active" : ""}
                >
                  {labels.student}
                </button>

                <button
                  type="button"
                  onClick={() => setTeacherMode(true)}
                  className={teacherMode ? "active" : ""}
                >
                  {labels.teacher}
                </button>
              </div>

              {/* Open the selected PDF in a new tab */}
              <Link
                href={lessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonLight"
              >
                {labels.openLesson}
              </Link>
            </div>
          </div>

          {/* Lesson selection buttons */}
          {lessons.map((lessonItem, index) => (
            <button
              key={`${language}-${index}`}
              type="button"
              className={
                selectedLesson === index
                  ? "lessonItem active"
                  : "lessonItem"
              }
              onClick={() => setSelectedLesson(index)}
            >
              {lessonItem.title}
            </button>
          ))}
        </aside>

        {/* Right-hand lesson viewer */}
        <section className="pdfViewer">
          <h2>{lesson.title}</h2>

          <iframe
            key={lessonUrl}
            src={lessonUrl}
            width="100%"
            height="900"
            title={lesson.title}
          />
        </section>
      </div>
    </div>
  );
}