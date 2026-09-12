"use client";

import englishTeam from "@/locale/en/team.json";
import russianTeam from "@/locale/ru/team.json";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Team() {
  const { language } = useLanguage();

  const data =
    language === "en"
      ? englishTeam
      : russianTeam;

  return (
    <section>
      <h1>{data.labels.pageTitle}</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.groups.map((group) => (
          <div
            key={group.role}
            className="text-center"
          >
            <h3 className="mb-3 bg-[var(--border)] p-2">
              {group.role}
            </h3>

            <ul>
              {group.members.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
}