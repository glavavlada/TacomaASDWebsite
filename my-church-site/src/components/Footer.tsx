"use client";

import englishFooter from "@/locale/en/footer.json";
import russianFooter from "@/locale/ru/footer.json";

import { useLanguage } from "@/app/context/LanguageContext";

// creates the Footer component
export default function Footer() {
  // calls the hook and destructures the language from the context
  const { language } = useLanguage();
  const t = language === "en"
    ? englishFooter
    : russianFooter;

  return (
    <footer className="p-4 bg-[var(--main)] flex justify-between gap-10 items-center">
      {/* left side */}
      <p>9241 S D St Tacoma, WA 98444, United States</p>

      {/* right side */}
      <div className="text-right">
        <p> {/* manual break point on small screens and above */}
          {t.footer.facebook} {" "}<br className="sm:hidden" />
          <a
            href="https://www.facebook.com/tacomarussian/"
            target="_blank"
            rel="noopener noreferrer"
            className="link">
            Facebook
          </a>
        </p>

        <p> {/* opens user's default email client */}
          {t.footer.email} {" "}<br className="sm:hidden" />
          <a
            href="mailto:tacomaRussianASD@gmail.com"
            className="link">
            tacomaRussian<br className="sm:hidden" />ASD@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}