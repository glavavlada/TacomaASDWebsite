
"use client";

import englishTimeline from "@/locale/en/timeline.json";
import russianTimeline from "@/locale/ru/timeline.json";

import { useLanguage } from "@/app/context/LanguageContext";

type TimelineEvent = {
    date: string;
    title: string;
    description: string[];
};

type TimelineData = {
    heading: string;
    events: TimelineEvent[];
};

export default function ChurchTimeline() {
    const { language } = useLanguage();

    const t = (
        language === "ru" ? russianTimeline : englishTimeline
    ) as TimelineData;

    return (
        <section className="pb-4">
            <div>
                <h2>
                    {t.heading}
                </h2>

                <div className="relative">
                    {/* Desktop timeline line */}
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 bg-[var(--highlight)] lg:block"
                    />

                    {/* Mobile timeline line */}
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-2.5 top-0 w-1 bg-[var(--highlight)] lg:hidden"
                    />

                    <ol className="space-y-5 lg:space-y-0">
                        {/* creating timeline events */}
                        {t.events.map((event, index) => {
                            // alternates orientation of events
                            const isLeft = index % 2 === 0;
                            // result of map transformation
                            return (
                                <li
                                    key={`${event.date}-${event.title}`}
                                    className="relative lg:grid lg:grid-cols-2 lg:gap-12"
                                >
                                    {/* Timeline marker */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-2.5 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--highlight)] bg-[var(--main)] lg:left-1/2"
                                    />

                                    {/* Event content */}
                                    <div
                                        className={`pl-9 ${isLeft
                                                ? "lg:col-start-1 lg:row-start-1 lg:text-right"
                                                : "lg:col-start-2 lg:row-start-1"
                                            }`}
                                    >
                                        <p className="font-semibold text-[var(--highlight)]">
                                            {event.date}
                                        </p>

                                        <div className="bg-[var(--tint)] p-5">
                                            <h3 className="font-semibold">
                                                {event.title}
                                            </h3>

                                            {event.description.map((paragraph, index) => (
                                                <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}
