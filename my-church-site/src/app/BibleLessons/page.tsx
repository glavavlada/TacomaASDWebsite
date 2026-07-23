"use client";

import { useState } from "react";
import lessons from "@/data/bibleLessons.json";

export default function BibleLessons() {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const [russianMode, setRussianMode] = useState(false);

  const lesson = lessons[selectedLesson];

  const pdf = teacherMode
    ? russianMode
      ? lesson.teacherRU
      : lesson.teacher
    : russianMode
      ? lesson.studentRU
      : lesson.student;

  return (
    <div className="lessonPage">
      <h1>Bible Lessons</h1>

      <div className="lessonLayout">
        <div className="lessonSidebar">
          <div className="lessonOptions">
            <label>
              <input
                type="checkbox"
                checked={teacherMode}
                onChange={() => setTeacherMode(!teacherMode)}
              />
              Teacher
            </label>

            <label>
              <input
                type="checkbox"
                checked={russianMode}
                onChange={() => setRussianMode(!russianMode)}
              />
              Russian
            </label>
          </div>

          {lessons.map((lesson, index) => (
            <button
              key={lesson.title}
              className={
                selectedLesson === index
                  ? "lessonItem active"
                  : "lessonItem"
              }
              onClick={() => setSelectedLesson(index)}
            >
              {lesson.title}
            </button>
          ))}
        </div>

        <div className="pdfViewer">
          <iframe
            src={pdf}
            width="100%"
            height="900"
            title={lesson.title}
          />
        </div>
      </div>
    </div>
  );
}