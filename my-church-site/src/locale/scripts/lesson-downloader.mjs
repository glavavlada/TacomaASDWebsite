import fs from "fs";
import path from "path";

//name of folder where this quarter lessons will be stored
//in public/lessons/2026-Q4
const quarter = "2026-Q4";

//every quarter this will be updated
const lessons = [
  {
    number: 1,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_01.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/60aff6d48864c07e46f4d93b4c09037e757e976be31f84ff2ea12ab72e4d8f94/60aff6d48864c07e46f4d93b4c09037e757e976be31f84ff2ea12ab72e4d8f94.pdf",
  },
  {
    number: 2,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_02.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/54f29d142b48f32b14ad8147336dacc5b731582b3931503f336d4f99bc9da14d/54f29d142b48f32b14ad8147336dacc5b731582b3931503f336d4f99bc9da14d.pdf",
  },
  {
    number: 3,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_03.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/2c868bc7301b9e2eabd205b9c9bdc1003cb1ef4b60a33a26978671c25846d86e/2c868bc7301b9e2eabd205b9c9bdc1003cb1ef4b60a33a26978671c25846d86e.pdf",
  },
  {
    number: 4,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_04.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/1212554f9690d05999a381a7da8fcf65b69c374b94a7ec4d46d3269c76cbe49b/1212554f9690d05999a381a7da8fcf65b69c374b94a7ec4d46d3269c76cbe49b.pdf",
  },
  {
    number: 5,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_05.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/0c4d6653eac410ff6d5c431c15c66fddb302d90ef147d8fc6574144bdb12e18b/0c4d6653eac410ff6d5c431c15c66fddb302d90ef147d8fc6574144bdb12e18b.pdf",
  },
  {
    number: 6,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_06.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/d02762168fe213cc48b623c376083ab63fdfd570ffa87ff8fff949142f8e3545/d02762168fe213cc48b623c376083ab63fdfd570ffa87ff8fff949142f8e3545.pdf",
  },
  {
    number: 7,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_07.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/d0e752c52ae6789834054b5d4b76ebe678e87a9e78250692543137e5556a0547/d0e752c52ae6789834054b5d4b76ebe678e87a9e78250692543137e5556a0547.pdf",
  },
  {
    number: 8,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_08.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/be44a4b761d9533621c9fe2d333a2e09cda462de35ca6ccad5bc1f77112efb94/be44a4b761d9533621c9fe2d333a2e09cda462de35ca6ccad5bc1f77112efb94.pdf",
  },
  {
    number: 9,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_09.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/3b3ca8f276661d8f22b2400a723e0b85f346c3b97c7c4b5e06a6301b1afdb202/3b3ca8f276661d8f22b2400a723e0b85f346c3b97c7c4b5e06a6301b1afdb202.pdf",
  },
  {
    number: 10,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_10.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/a6a5f743c456be2f66bf983e4f08c355ac16a0da8af823c04ac62cbc8df6e71d/a6a5f743c456be2f66bf983e4f08c355ac16a0da8af823c04ac62cbc8df6e71d.pdf",
  },
  {
    number: 11,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_11.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/26fc128eba75a7f3416f61d0285ba5d5ba4ff7b5706b88e78f8153914fe91818/26fc128eba75a7f3416f61d0285ba5d5ba4ff7b5706b88e78f8153914fe91818.pdf",
  },
  {
    number: 12,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_12.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/150c4295ab89c9231228bb8020effec64a7b44f7c8431a2c03df978bd85faee7/150c4295ab89c9231228bb8020effec64a7b44f7c8431a2c03df978bd85faee7.pdf",
  },
  {
    number: 13,
    student: "https://www.sabbath.school/SSchool/2026/4/EAQ426_13.pdf",
    teacher:
      "https://sabbath-school-pdf.adventech.io/pdf/en/2026-04/4a47acbe2ccfdf734edce5035be70aa2bef8be4d98ef6cedcbdf2d0de8ce6ff7/4a47acbe2ccfdf734edce5035be70aa2bef8be4d98ef6cedcbdf2d0de8ce6ff7.pdf",
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
