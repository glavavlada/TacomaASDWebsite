import type { Metadata } from "next";
import Team from "./Team";

export const metadata: Metadata = {
  title: "Church Leadership Team | Tacoma Russian SDA Church",
  description:
    "Meet the leadership team of the Tacoma Russian Seventh-day Adventist Church in Tacoma, Washington.",
};

export default function TeamPage() {
  return <Team />;
}