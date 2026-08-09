"use client";

import LiveStreamEmbed from "@/components/LiveStream";
import Image from "next/image";

import englishAbout from "@/locale/en/about.json";
import russianAbout from "@/locale/ru/about.json";

import { useLanguage } from "@/app/context/LanguageContext";

const churchImgOut = "/church_outside.jpg";
const churchImgHall = "/church_hall.jpg";

export default function About() {
  const { language } = useLanguage();

  const data =
    language === "en"
      ? englishAbout
      : russianAbout;

  return (
    <div className="aboutPage">
      <LiveStreamEmbed />

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