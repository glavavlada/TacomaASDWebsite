"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SlideshowProps = {
    caption: string;
    previousLabel: string;
    nextLabel: string;
};

// Preload 8 images from churchPics/
const images = Array.from(
    { length: 8 },
    (_, index) => `/churchPics/churchImg${index + 1}.jpg`,
);

export default function Slideshow({
    caption,
    previousLabel,
    nextLabel,
}: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically advance the slideshow every 8 seconds
    // Reset the interval whenever currentIndex changes
    useEffect(() => {
        const interval = window.setInterval(() => {
            setCurrentIndex((current) => (current + 1) % images.length);
        }, 8000);

        return () => window.clearInterval(interval);
    }, [currentIndex]);

    // Returns to the previous image
    function showPrevious() {
        setCurrentIndex(
            (current) => (current - 1 + images.length) % images.length,
        );
    }

    // Advances to the next image
    function showNext() {
        setCurrentIndex((current) => (current + 1) % images.length);
    }

    return (
        <section className="mx-auto flex w-full shrink-0 flex-col items-center bg-[var(--tint)] p-4 text-center lg:w-[40vw]">
            <div className="relative w-full overflow-hidden">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`transition-opacity duration-700 ease-in-out ${index === currentIndex
                            ? "relative opacity-100"
                            : "pointer-events-none absolute inset-0 opacity-0"
                            }`}
                        aria-hidden={index !== currentIndex} // ignores inactive slides
                    >
                        <Image
                            src={src}
                            alt={ // adds alt text for the currently displayed image
                                index === currentIndex
                                    ? "Tacoma Russian Seventh-day Adventist Church"
                                    : ""
                            }
                            width={800}
                            height={1200}
                            priority={index === 0}
                            className="h-auto max-h-[90vh] w-full object-contain py-4"
                        />
                    </div>
                ))}
            </div>

            {/* slideshow controls */}
            <div className="flex w-full items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={showPrevious}
                    aria-label={previousLabel}
                    className="buttonMedium"
                >
                    ←
                </button>

                <span aria-live="polite">
                    Picture {currentIndex + 1} of {images.length}
                </span>

                <button
                    type="button"
                    onClick={showNext}
                    aria-label={nextLabel}
                    className="buttonMedium"
                >
                    →
                </button>
            </div>

            {/* image caption */}
            <h3 className="pt-2 text-[var(--textLightAlt)]">{caption}</h3>

        </section>
    );
}