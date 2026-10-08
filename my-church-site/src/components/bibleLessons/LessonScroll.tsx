"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

// defining Lesson object type with student and teacher URLs
type Lesson = {
    title: string;
    student: string;
    teacher: string;
};

// defining the props for the LessonScroll component
type LessonScrollProps = {
    lessons: Lesson[];
    selectedLesson: number;
    // function to set the selected lesson index within the component
    setSelectedLesson: (index: number) => void;
    language: string;
    // JSX for the accordion mobile lesson viewer
    mobileControls: ReactNode;
    mobileViewer: ReactNode;
};

// LessonScroll component definition and props destructuring
export default function LessonScroll({
    lessons,
    selectedLesson,
    setSelectedLesson,
    language,
    mobileControls,
    mobileViewer,
}: LessonScrollProps) { // checks that the props match the definition
    // reference to selected lesson <div>
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (

        <div
            ref={scrollContainerRef} // connects the container to scroll reference
            className="overflow-y-auto overflow-x-hidden"
        >
            {/* applies the JSX for each item in lessons */}
            {lessons.map((lessonItem, index) => (
                // creates a required unique key for each lesson from the string literal
                <div key={`${language}-${index}`}>
                    {/* stable reference for the auto scroll */}
                    <button
                        id={`lesson-${language}-${index}`}
                        type="button"
                        // adds a left border to the selected lesson
                        className={`mb-2 w-full border-l-[5px]
                            ${selectedLesson === index
                                ? "border-l-[var(--main)]"
                                : "border-transparent"
                            }`}
                        onClick={() => {
                            setSelectedLesson(index);

                            // scrolls to the selected lesson <button>
                            requestAnimationFrame(() => {
                                document
                                    .getElementById(`lesson-${language}-${index}`)
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                        inline: "nearest",
                                    });
                            });
                        }}
                    >
                        {/* visual appearance of the button that moves on hover
                        
                            separated from <button> to avoid visual bugs when moving the scroll reference*/}
                        <span
                            className={`block w-full bg-[var(--buttonLight)] p-4 text-left transition-transform duration-200 hover:translate-x-[0.3rem]
                            ${selectedLesson === index ? "font-bold" : ""}`}
                        >
                            {lessonItem.title}
                        </span>
                    </button>


                    {/* Mobile accordion
                    hidden on large screens and above by collapsing the grid row 
                    1fr gives full space to the selected lesson */}
                    <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden 
                            ${selectedLesson === index
                                ? "grid-rows-[1fr] mb-2"
                                : "grid-rows-[0fr]"
                            }`}
                    >   {/* renders the accordion JSX */}
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