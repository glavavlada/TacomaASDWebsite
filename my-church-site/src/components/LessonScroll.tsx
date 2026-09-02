"use client";

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
};

export default function LessonScroll({
    lessons,
    selectedLesson,
    setSelectedLesson,
    language,
}: LessonScrollProps) {
    return (
        <div className="overflow-y-auto overflow-x-hidden">
            {lessons.map((lessonItem, index) => (
                <button
                    key={`${language}-${index}`}
                    type="button"
                    className={`mb-2 w-full border-l-[5px] bg-[var(--buttonLight)] p-4 text-left cursor-pointer transition-transform duration-200 hover:translate-x-[0.3rem] ${selectedLesson === index
                        ? "border-l-[var(--main)] font-bold"
                        : "border-transparent"
                        }`}
                    onClick={() => setSelectedLesson(index)}
                >
                    {lessonItem.title}
                </button>
            ))}
        </div>
    );
}