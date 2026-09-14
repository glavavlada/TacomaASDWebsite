import type { Metadata } from "next";
import Events from "./Events";

export const metadata: Metadata = {
    title: "Church Events | Tacoma Russian SDA Church",
    description:
        "View upcoming events and activities at the Tacoma Russian Seventh-day Adventist Church in Tacoma, Washington.",

    alternates: {
        canonical: "/Events",
    },
};

export default function EventsPage() {
    return <Events />;
}