"use client";

import { useState } from "react";

const lessons = [
  {
    title: "Lesson 1 - Paul’s Ministry in Corinth",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_01.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_01.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/01/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/01/01",
  },
  {
    title: "Lesson 2 - The Message of the Cross",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_02.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_02.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/02/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/02/01",
  },
  {
    title: "Lesson 3 - Unity in Christ",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_03.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_03.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/03/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/03/01",
  },
  {
    title: "Lesson 4 - Sin in the Church",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_04.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_04.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/04/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/04/01",
  },
  {
    title: "Lesson 5 - All to the Glory of God",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_05.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_05.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/05/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/05/01",
  },
  {
    title: "Lesson 6 - Spiritual Gifts",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_06.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_06.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/06/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/06/01",
  },
  {
    title: "Lesson 7 - Portrait Of Love",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_07.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_07.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/07/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/07/01",
  },
  {
    title: "Lesson 8 - The Power of Christ's Resurrection",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_08.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_08.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/08/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/08/01",
  },
  {
    title: "Lesson 9 - Love-Driven Ministry",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_09.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_09.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/09/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/09/01",
  },
  {
    title: "Lesson 10 - Authentic Christian Ministry",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_10.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_10.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/10/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/10/01",
  },
  {
    title: "Lesson 11 - SterwardShip and Mission",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_11.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_11.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/11/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/11/01",
  },
  {
    title: "Lesson 12 - Dealing with False Teachers",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_12.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_12.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/12/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/12/01",
  },
  {
    title: "Lesson 13 - Grace, Love, and Fellowship",
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_13.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_13.pdf",
    studentRU: "https://sabbath-school.adventech.io/ru/2026-03/13/01",
    teacherRU: "https://sabbath-school.adventech.io/ru/2026-03/13/01",
  },
];

export default function BibleLessons() {

  const [selectedLesson, setSelectedLesson] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const [russianMode, setRussianMode] = useState(false);
  const lesson = lessons[selectedLesson];

  let pdf = lesson.student
  if (teacherMode && russianMode) {
    pdf = lesson.teacherRU;
  }
  else if (teacherMode) {
    pdf = lesson.teacher;
  }
  else if (russianMode) {
    pdf = lesson.studentRU;
  }

  return (

    <div className="lessonPage">
      <h1>Bible Lessons</h1>

      <div className="lessonLayout">
        {/* Left Sidebar */}

        <div className="lessonSidebar">
          <div className="lessonOptions">

            <label>
              <input type="checkbox" checked={teacherMode} onChange={() => setTeacherMode(!teacherMode)} />
                Teacher
            </label>

            <label>
              <input type="checkbox" checked={russianMode} onChange={() => setRussianMode(!russianMode)} />
                Russian
            </label>
          </div>
          {lessons.map((lesson, index) => (
            <button
              key={index}
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
        {/* Right PDF */}

        <div className="pdfViewer">
          <iframe src={pdf} width="100%" height="900" />
        </div>
      </div>
    </div>
  );
}