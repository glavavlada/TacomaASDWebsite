import type { Metadata } from "next";
import Ministry from "./Ministry";

export const metadata: Metadata = {
    title: "Church Ministries | Tacoma Russian SDA Church",
    description:
        "View the active ministries at the Tacoma Russian Seventh-day Adventist Church in Tacoma, Washington.",

    alternates: {
        canonical: "/Ministry",
    },
};

export default function MinistryPage() {
    return <Ministry />;
}