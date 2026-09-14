import type { Metadata } from "next";
import About from "./About";

export const metadata: Metadata = {
    title: "Tacoma Seventh-day Adventist Church | Tacoma, WA",
    description:
        "Learn about the Tacoma Russian Seventh-day Adventist Church, a Russian-speaking Christian community serving Tacoma, Washington, with worship services in English and Russian.",

    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return <About />;
}
