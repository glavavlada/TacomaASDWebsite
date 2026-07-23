"use client";

import Link from "next/link";
import Image from "next/image";

//import translation files
import en from "@/locale/en/navbar.json";
import ru from "@/locale/ru/navbar.json";

//import custom language need to be called LanguageContext to not mess with system
import { useLanguage } from "@/app/context/LanguageContext";

const churchLogo = "/SeventhDayLogo.png";

export default function Navbar() {
	//get current language and function that changes it
	const { language, setLanguage } = useLanguage();
	//pick correct translation file depending on current language
	const t = language === "en" ? en : ru;

	return (
		<header>
			<Image
				src={churchLogo}
				alt="Church Logo"
				width={60}
				height={60}
				className="logo"
				priority
			/>

			{/* Website title which now depends on the selected language */}
			<h1>{t.navbar.title}</h1>

			{/* Navigation Links */}
			<nav>

				{/* About Page - same situation as the website title and others bellow  */}
				<Link href="/" className="button">
					{t.navbar.about}
				</Link>

				<Link href="/BibleLessons" className="button">
					{t.navbar.lessons}
				</Link>

				<Link href="/Team" className="button">
					{t.navbar.team}
				</Link>

				<Link href="/Events" className="button">
					{t.navbar.events}
				</Link>

			</nav>

			<div className="languageToggle">

				{/*switch website to English */}
				<button
					onClick={() => setLanguage("en")}
					className={language === "en" ? "active" : ""}
				>
					EN
				</button>

				{/* Switch website to Russian */}
				<button
					onClick={() => setLanguage("ru")}
					className={language === "ru" ? "active" : ""}
				>
					RU
				</button>
			</div>
		</header>
	);
}