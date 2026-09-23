"use client";

import englishMinistries from "@/locale/en/ministry.json";
import russianMinistries from "@/locale/ru/ministry.json";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Ministry() {
    const { language } = useLanguage();

    const data =
        language === "en"
            ? englishMinistries
            : russianMinistries;

    return (
        <section className="mx-auto w-full max-w-6xl">
            <h1 className="mb-4 text-center">
                {data.labels.pageTitle}
            </h1>

            <p className="mb-12 text-center">
                {data.labels.introduction}
            </p>

            <div className="flex flex-col gap-12">
                {data.ministries.map((ministry, index) => (
                    <section
                        key={ministry.id}
                        className="border-b border-[var(--border)] pb-12"
                    >
                        <div
                            className={`flex flex-col items-center gap-8 md:gap-12 ${index % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Temporary photo placeholder */}
                            <div className="flex aspect-[4/3] w-full items-center justify-center bg-[var(--border)] md:w-1/2">
                                <p className="text-[var(--textDark)]">
                                    {data.labels.photoPlaceholder}
                                </p>
                            </div>

                            {/* Ministry description */}
                            <div className="w-full md:w-1/2">
                                <h2 className="mb-4 font-bold">
                                    {ministry.title}
                                </h2>

                                <p className="leading-8">
                                    {ministry.description}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}