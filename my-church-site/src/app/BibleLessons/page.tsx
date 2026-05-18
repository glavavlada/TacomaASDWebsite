"use client";

import { useState } from "react";

export default function BibleLessons() {

 const [activePDF, setActivePDF] = useState("");

  return (
    <div className="lessonPage">

      <h1>Bible Lessons</h1>

      <div className="lessonButtons">

        <button onClick={() => setActivePDF("student")}>
          Student Version
        </button>

        <button onClick={() => setActivePDF("teacher")}>
          Teacher Version
        </button>

        <button onClick={() => setActivePDF("student-ru")}>
          Student RU Version
        </button>

      </div>

      {activePDF === "student" && (
        <div className="pdfSection">

          <h2>Student Version</h2>

        <iframe
          src="https://www.sabbath.school/SSchool/2026/2/ALQ226_07.pdf"
          width="100%"
          height="600px"
        />

        </div>
      )}

      {activePDF === "teacher" && (
        <div className="pdfSection">

          <h2>Teacher Version</h2>

          <iframe
            src="https://www.sabbath.school/SSchool/2026/2/ETQ226_07.pdf"
            width="100%"
            height="600px"
          />
        </div>
      )}

      {activePDF === "student-ru" && (
        <div className="pdfSection">

          <h2>Student RU Version</h2>

        <iframe
          src="/Субботняя_школа_May15_2026.pdf"
          width="100%"
          height="600px"
        />

        </div>
      )}

    </div>
  );
}