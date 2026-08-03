"use client";

import { useState } from "react";

import englishData from "@/locale/en/bibleLessons.json";
import russianData from "@/locale/ru/bibleLessons.json";

import { useLanguage } from "@/app/context/LanguageContext";

export default function BibleLessons() {
  //read language selected in header
  const { language } = useLanguage();
  //read what lesson is selected
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);

  //selects which languge data
  const data = language === "en" ? englishData : russianData;

  //seperate the lables and lessons 
  const labels = data.labels;
  const lessons = data.lessons;

  //getter for the lesson
  const lesson = lessons[selectedLesson];

  //chooses between the teacher and student
  const lessonUrl = teacherMode ? lesson.teacher : lesson.student;

  return (
    <div className="lessonPage">
      <h1>{labels.pageTitle}</h1>

      <div className="lessonLayout">
        {/* Left-hand lesson menu */}
        <aside className="lessonSidebar">
          <div className="lessonOptions">
            <label>
              <input
                type="checkbox"
                checked={teacherMode}
                onChange={() => setTeacherMode(!teacherMode)}
              />

              {teacherMode ? labels.teacher : labels.student}
            </label>
          </div>

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

          <a
            href={lessonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="openLessonButton"
          >
            {labels.openLesson}
          </a>
        </section>
      </div>
    </div>
  );
}