"use client";

import englishFooter from "@/locale/en/footer.json";
import russianFooter from "@/locale/ru/footer.json";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const t = language === "en"
    ? englishFooter
    : russianFooter;

  return (
    <>
      <footer className="p-4 bg-[var(--main)] flex justify-between gap-10 items-center">
        <p>9241 S D St Tacoma, WA 98444, United States</p>

        <div className="text-right">
          <p>
            {t.footer.facebook} {" "}<br className="sm:hidden" />
            <a
              href="https://www.facebook.com/tacomarussian/"
              target="_blank"
              rel="noopener noreferrer"
              className="link">
              Facebook
            </a>
          </p>

          <p>
            {t.footer.email} {" "}<br className="sm:hidden" />
            <a
              href="mailto:tacomaRussianASD@gmail.com"
              className="link">
              tacomaRussian<br className="sm:hidden" />ASD@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}