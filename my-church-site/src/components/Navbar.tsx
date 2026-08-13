"use client";

import Link from "next/link";
import Image from "next/image";

//import translation files
import en from "@/locale/en/navbar.json";
import ru from "@/locale/ru/navbar.json";

//import custom language need to be called LanguageContext to not mess with system
import { useLanguage } from "@/app/context/LanguageContext";
import Toggle from "./Toggle";

const churchLogo = "/SeventhDayLogo.png";

export default function Navbar() {
	//get current language and function that changes it
	const { language, setLanguage } = useLanguage();
	//pick correct translation file depending on current language
	const t = language === "en" ? en : ru;

	return (
		<header className="flex flex-wrap items-center gap-4 p-4 bg-[var(--main)]">
			<Image
				src={churchLogo}
				alt="Church Logo"
				width={60}
				height={60}
				className="shrink-0"
				priority
			/>

			<h1 className="min-w-0 flex-1 text-[var(--textLight)] text-xl md:text-2xl">
				{t.navbar.title}
			</h1>

			<nav className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
				<Link href="/" className="buttonDark">
					{t.navbar.about}
				</Link>

				<Link href="/BibleLessons" className="buttonDark">
					{t.navbar.lessons}
				</Link>

				<Link href="/Team" className="buttonDark">
					{t.navbar.team}
				</Link>

				<Link href="/Events" className="buttonDark">
					{t.navbar.events}
				</Link>

			</nav>

			<Toggle
				left="EN"
				right="RU"
				value={language === "ru"}
				onChange={(right) => setLanguage(right ? "ru" : "en")}
				className="md:w-auto mx-auto lg:ml-auto lg:mr-0"
			/>

		</header>
	);
}