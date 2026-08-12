"use client";

import LiveStreamEmbed from "@/components/LiveStream";
import Image from "next/image";

import englishAbout from "@/locale/en/about.json";
import russianAbout from "@/locale/ru/about.json";

import englishIntro from "@/locale/en/Intro.json";
import russianIntro from "@/locale/ru/Intro.json";

import { useLanguage } from "@/app/context/LanguageContext";

const churchImgOut = "/church_outside.jpg";
const churchImgHall = "/church_hall.jpg";

export default function About() {
  const { language } = useLanguage();

  const data =
    language === "en"
      ? englishAbout
      : russianAbout;

  const introData =
    language === "en"
      ? englishIntro
      : russianIntro;

  return (
    <div className="aboutPage">
      <LiveStreamEmbed />

      {/*intro/welcome section */}
      <section
        className=" relative mb-12 min-h-[500px] overflow-hidden bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/IntroPic.jpg')" }}
      >
        {/* transparent text box */}
        <div
          className=" ml-12 max-w-2xl rounded-xl bg-[color:var(--buttonDark)]/85 p-8 text-white backdrop-blur-[2px] "
        >
          <h1 className="mb-2 font-semibold">
            {introData.intro.title}
          </h1>

          <h2 className="mb-5">
            {introData.intro.subtitle}
          </h2>

          <div className="flex flex-col gap-3 leading-6">
            {introData.intro.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-5 font-semibold">
            {introData.intro.address}
          </p>

          <p className="mt-4">
            {introData.intro.closing}
          </p>
        </div>
      </section>



      {/* Beliefs Section */}
      <h1>{data.labels.beliefsTitle}</h1>

      <section className="infoSection">
        <section className="imgWrapper">
          <Image
            src={churchImgOut}
            alt="Exterior of our church"
            width={800}
            height={1200}
            className="w-full py-4"
            priority
          />

          <h3 className="text-[var(--textLightAlt)]">
            {data.beliefs.imageCaption}
          </h3>
        </section>

        <div className="textContent">
          {data.beliefs.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* History Section */}
      <h1>{data.labels.historyTitle}</h1>

      <section className="infoSection">
        <div className="textContent">
          {data.history.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <section className="imgWrapper">
          <Image
            src={churchImgHall}
            alt="Church Hall"
            width={1200}
            height={800}
            className="w-full py-4"
          />

          <h3 className="text-[var(--textLightAlt)]">
            {data.history.imageCaption}
          </h3>
        </section>
      </section>
    </div>
  );
}