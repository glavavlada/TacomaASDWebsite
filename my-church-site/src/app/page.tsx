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
const introImg = "/IntroPic.jpg";

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

      {/* Intro Section */}
      <section
        className="relative mb-12 min-h-[500px] overflow-hidden bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('${introImg}')`,
        }}
      >
        {/* Makes the left side darker so the text stays readable */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
        />

        {/* Intro text */}
        <div
          className="z-10 max-w-lg pl-20 text-[var(--textLight)]"
        >
          <h1 className="font-bold">
            {introData.intro.title}
          </h1>

          <div className="flex flex-col gap-1 leading-[1.4]">
            {introData.intro.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-3">
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