"use client";

import type { ReactNode } from "react";

type Lesson = {
    title: string;
    student: string;
    teacher: string;
};

type LessonScrollProps = {
    lessons: Lesson[];
    selectedLesson: number;
    setSelectedLesson: (index: number) => void;
    language: string;
    mobileControls: ReactNode;
    mobileViewer: ReactNode;
};

export default function LessonScroll({
    lessons,
    selectedLesson,
    setSelectedLesson,
    language,
    mobileControls,
    mobileViewer,
}: LessonScrollProps) {
    return (
        <div className="overflow-y-auto overflow-x-hidden">
            {lessons.map((lessonItem, index) => (
                <div key={`${language}-${index}`}>

                    <button
                        id={`lesson-${language}-${index}`}
                        type="button"
                        className={`mb-2 w-full border-l-[5px] bg-[var(--buttonLight)] p-4 text-left cursor-pointer transition-transform duration-200 hover:translate-x-[0.3rem] ${selectedLesson === index
                            ? "border-l-[var(--main)] font-bold"
                            : "border-transparent"
                            }`}
                        onClick={() => {
                            setSelectedLesson(index);

                            requestAnimationFrame(() => {
                                document
                                    .getElementById(`lesson-${language}-${index}`)
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                            });
                        }}
                    >
                        {lessonItem.title}
                    </button>


                    {/* Mobile accordion */}
                    <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${selectedLesson === index
                            ? "grid-rows-[1fr] mb-2"
                            : "grid-rows-[0fr]"
                            }`}
                    >
                        <div className="min-h-0 overflow-hidden">
                            {mobileControls}
                            {mobileViewer}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}