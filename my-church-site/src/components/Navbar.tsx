"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//import translation files
import en from "@/locale/en/navbar.json";
import ru from "@/locale/ru/navbar.json";

//import custom language need to be called LanguageContext to not mess with system
import { useLanguage } from "@/app/context/LanguageContext";
import { useFontSize } from "@/app/context/FontSizeContext";

import Toggle from "./Toggle";
import Donations from "./Donations";
import { useState } from "react";

const churchLogo = "/SeventhDayLogo.png";

export default function Navbar() {
	//get current language and function that changes it
	const { language, setLanguage } = useLanguage();
	const t = language === "en" ? en : ru;
	// large font toggle
	const { largeFont, setLargeFont } = useFontSize();
	// shows donation popup when true
	const [showDonate, setShowDonate] = useState(false);
	// current page url to track selected page
	const pathname = usePathname();

	return (
		<>
			<header className="flex flex-wrap items-center gap-4 p-4 bg-[var(--main)] text-base">
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

				{/* navigation buttons */}
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

				{/* page control buttons */}
				<div className="flex items-center gap-2 md:w-auto mx-auto lg:ml-auto lg:mr-0">
					{/* donations button */}
					<button
						className="buttonLight"
						onClick={() => setShowDonate(true)}
					>
						{t.navbar.donate}
					</button>

					{/* language toggle */}
					<Toggle
						left="EN"
						right="RU"
						value={language === "ru"}
						onChange={(right) => setLanguage(right ? "ru" : "en")}
					/>

					{/* font size toggle */}
					<Toggle
						left={<span className="text-base">Aa</span>}
						right={<span className="text-2xl">Aa</span>}
						value={largeFont}
						onChange={setLargeFont}
						className="max-h-10 !p-1"// override padding to make it smaller
					/>
				</div>
			</header>

			{/* donations popup */}
			<Donations
				open={showDonate}
				onClose={() => setShowDonate(false)}
			/>
		</>
	);
}