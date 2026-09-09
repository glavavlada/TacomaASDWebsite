"use client";

import { useLanguage } from "@/app/context/LanguageContext";

import privacyEn from "@/locale/en/privacy.json";
import privacyRu from "@/locale/ru/privacy.json";

export default function Privacy() {
  const { language } = useLanguage();

  const t = language === "ru" ? privacyRu : privacyEn;

  return (
    <article>
      {/* intro and update date */}
      <h1>{t.title}</h1>

      <p>
        <strong>{t.lastUpdated}</strong>
      </p>

      <p>{t.intro}</p>

      {t.sections.map((section) => (
        <section key={section.title} className="my-4">
          <h2>{section.title}</h2>

          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      {/* closing google policy and link */}
      <p>
        {t.googlePolicy.beforeLink}{" "}
        <a
          href={t.googlePolicy.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.googlePolicy.linkText}
        </a>
        {t.googlePolicy.afterLink}
      </p>
    </article>
  );
}