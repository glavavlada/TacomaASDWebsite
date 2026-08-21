import fs from "fs";
import path from "path";

//name of folder where this quarter lessons will be stored
//in public/lessons/2026-Q3
const quarter = "2026-Q3";

//every quarter this will be updated
const lessons = [
  {
    number: 1,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_01.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_01.pdf",
  },
  {
    number: 2,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_02.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_02.pdf",
  },
  {
    number: 3,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_03.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_03.pdf",
  },
  {
    number: 4,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_04.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_04.pdf",
  },
  {
    number: 5,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_05.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_05.pdf",
  },
  {
    number: 6,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_06.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_06.pdf",
  },
  {
    number: 7,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_07.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_07.pdf",
  },
  {
    number: 8,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_08.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_08.pdf",
  },
  {
    number: 9,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_09.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_09.pdf",
  },
  {
    number: 10,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_10.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_10.pdf",
  },
  {
    number: 11,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_11.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_11.pdf",
  },
  {
    number: 12,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_12.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_12.pdf",
  },
  {
    number: 13,
    student: "https://www.sabbath.school/SSchool/2026/3/EAQ326_13.pdf",
    teacher: "https://www.sabbath.school/SSchool/2026/3/ETQ326_13.pdf",
  },
];

//build full folder path where PDF will be saved
const outputDirectory = path.join(process.cwd(), "public", "lessons", quarter);

//create output folder if it does not already exist can create missnig folder if need be
fs.mkdirSync(outputDirectory, {
  recursive: true,
});

//function for downloading PDF
async function downloadPdf(url, filename) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  fs.writeFileSync(
    path.join(outputDirectory, filename),
    Buffer.from(arrayBuffer),
  );

  console.log(`Downloaded ${filename}`);
}

//loop for every lesson in lessons array
for (const lesson of lessons) {
  const number = String(lesson.number).padStart(2, "0");
  await downloadPdf(lesson.student, `lesson-${number}-student.pdf`);
  await downloadPdf(lesson.teacher, `lesson-${number}-teacher.pdf`);
}

console.log("Finished downloading lessons.");
