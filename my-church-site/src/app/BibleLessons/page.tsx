"use client";

import { useState } from "react";

export default function BibleLessons() {

  const [showStudent, setShowStudent] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);

  return (
    <div className="lessonPage">

      <h1>Bible Lessons</h1>

      <div className="lessonButtons">

        <button onClick={() => setShowStudent(!showStudent)}>
          Student Version
        </button>

        <button onClick={() => setShowTeacher(!showTeacher)}>
          Teacher Version
        </button>

      </div>

      {showStudent && (
        <iframe
          src="https://www.sabbath.school/SSchool/2026/2/ALQ226_07.pdf"
          width="100%"
          height="600px"
        />
      )}

      {showTeacher && (
        <iframe
          src="https://www.sabbath.school/SSchool/2026/2/ETQ226_07.pdf"
          width="100%"
          height="600px"
        />
      )}

    </div>
  );
}