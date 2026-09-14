"use client";

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
    return (
        <div className="overflow-y-auto overflow-x-hidden">
            {/* applies the JSX for each item in lessons */}
            {lessons.map((lessonItem, index) => (
                // creates a required unique key for each lesson from the string literal
                <div key={`${language}-${index}`}>
                    <button
                        // creates a unique id for each lesson button from the string literal to allow for scrolling to the selected lesson
                        id={`lesson-${language}-${index}`}
                        type="button" // HTML element type
                        className={`mb-2 w-full border-l-[5px] bg-[var(--buttonLight)] p-4 text-left cursor-pointer transition-transform duration-200 hover:translate-x-[0.3rem] 
                            ${selectedLesson === index // applies the selected lesson styling
                                ? "border-l-[var(--main)] font-bold"
                                : "border-transparent"
                            }`}
                        // selects the clicked lesson and scrolls to it
                        onClick={() => {
                            setSelectedLesson(index);

                            // scrolls after the DOM has updated
                            requestAnimationFrame(() => {
                                document //finds the selected lesson
                                    .getElementById(`lesson-${language}-${index}`)
                                    ?.scrollIntoView({ // optional chaining in case the element is not found
                                        behavior: "smooth",
                                        block: "nearest", // brings the element into view if not visible
                                    });
                            });
                        }}
                    >
                        {lessonItem.title}
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