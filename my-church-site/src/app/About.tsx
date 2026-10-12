"use client";

import LiveStreamEmbed from "@/components/LiveStream";
import Image from "next/image";

import englishAbout from "@/locale/en/about.json";
import russianAbout from "@/locale/ru/about.json";

import englishIntro from "@/locale/en/intro.json";
import russianIntro from "@/locale/ru/intro.json";

import { useLanguage } from "@/app/context/LanguageContext";

import Timeline from "@/components/Timeline";

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
    <div>
      <LiveStreamEmbed />

      {/* Intro Section
          image gets loading priority */}
      <section className="relative mb-12 flex min-h-[500px] items-center overflow-hidden">
        <Image
          src={introImg}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />

        {/* Makes the left side darker so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--buttonDark)]/70 to-[var(--main)]/50 md:to-[var(--main)]/30 lg:to-[var(--main)]/20" />

        {/* Intro text */}
        <div className="z-10 max-w-xl px-[clamp(1rem,6vw,6rem)] text-[var(--textLight)]">
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
      <h2>{data.labels.beliefsTitle}</h2>
      <section className="mb-12 flex flex-col items-start gap-8 lg:flex-row">
        <section className="mx-auto flex shrink-0 flex-col items-center bg-[var(--tint)] p-4 text-center lg:w-[40vw]">
          <Image
            src={churchImgOut}
            alt="Exterior of Tacoma Russian Seventh-day Adventist Church"
            width={800}
            height={1200}
            className="h-auto max-h-[90vh] w-full object-contain py-4"
          />

          <h3 className="text-[var(--textLightAlt)]">
            {data.beliefs.imageCaption}
          </h3>
        </section>

        <div className="flex flex-1 flex-col gap-4 leading-[1.8]">
          <div className="flex flex-1 flex-col gap-4 leading-[1.8]">
            {data.beliefs.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <Timeline />
    </div>
  );
}