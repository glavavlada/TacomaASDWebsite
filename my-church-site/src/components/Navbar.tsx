"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//import translation files
import en from "@/locale/en/navbar.json";
import ru from "@/locale/ru/navbar.json";

//import custom language need to be called LanguageContext to not mess with system
import { useLanguage } from "@/app/context/LanguageContext";

import Toggle from "./Toggle";
import Donations from "./Donations";
import { useState } from "react";

const churchLogo = "/SeventhDayLogo.png";

export default function Navbar() {
	//get current language and function that changes it
	const { language, setLanguage } = useLanguage();
	//pick correct translation file depending on current language
	const t = language === "en" ? en : ru;

	const [showDonate, setShowDonate] = useState(false);

	// current page
	const pathname = usePathname();

	return (
		<>
			<header className="flex flex-wrap items-center gap-4 p-4 bg-[var(--main)]">
				<Image
					src={churchLogo}
					alt="Church Logo"
					width={60}
					height={60}
					className="shrink-0"
					priority
				/>

				<h2 className="min-w-0 flex-1 text-[var(--textLight)] text-left">
					{t.navbar.title}
				</h2>

				<nav className="flex flex-wrap justify-center gap-1 w-full lg:w-auto">
					<Link
						href="/"
						className={`buttonDark ${pathname === "/" ? "active" : ""}`}
					>
						{t.navbar.about}
					</Link>

					<Link
						href="/BibleLessons"
						className={`buttonDark ${pathname === "/BibleLessons" ? "active" : ""}`}
					>
						{t.navbar.lessons}
					</Link>

					<Link
						href="/Team"
						className={`buttonDark ${pathname === "/Team" ? "active" : ""}`}
					>
						{t.navbar.team}
					</Link>

					<Link
						href="/Events"
						className={`buttonDark ${pathname === "/Events" ? "active" : ""}`}
					>
						{t.navbar.events}
					</Link>

				</nav>

				<div className="flex items-center gap-2 md:w-auto mx-auto lg:ml-auto lg:mr-0">
					<button
						className="buttonLight"
						onClick={() => setShowDonate(true)}
					>
						Donate
					</button>

					<Toggle
						left="EN"
						right="RU"
						value={language === "ru"}
						onChange={(right) => setLanguage(right ? "ru" : "en")}
					/>
				</div>

			</header>
			<Donations
				open={showDonate}
				onClose={() => setShowDonate(false)}
			/>
		</>
	);
}