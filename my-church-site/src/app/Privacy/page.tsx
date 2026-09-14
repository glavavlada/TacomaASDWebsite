import type { Metadata } from "next";
import Privacy from "./Privacy";

export const metadata: Metadata = {
    title: "Privacy Policy | Tacoma Russian SDA Church",
    description:
        "Privacy policy for the Tacoma Russian Seventh-day Adventist Church website.",

    alternates: {
        canonical: "/Privacy",
    },
};

export default function PrivacyPage() {
    return <Privacy />;
}
