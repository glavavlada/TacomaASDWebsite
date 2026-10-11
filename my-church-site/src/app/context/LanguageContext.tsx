"use client";

//this took a while not exactly sure what many of these things still do
import { createContext, useContext, useEffect, useState } from "react";

/*only allow two language values*/
type Language = "en" | "ru";

/*	explains what the context does
	language - current language
	setLanguage - function to change the language
*/
type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
	languageLoaded: boolean;
};

/*
	create Context
	The values here are only placeholders which are replaced
	they will be replaced by LanguageProvider
*/
const LanguageContext = createContext<LanguageContextType>({
	language: "en",
	setLanguage: () => { },
	languageLoaded: false,
});

/*
	the provider wraps the website
	it stores the current language and shares it with every component
*/
export function LanguageProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// store the currently selected language with english as base
	const [language, setLanguage] = useState<Language>("en");
	// language read from local storage
	const [languageLoaded, setLanguageLoaded] = useState(false);

	// on load checks and saves the language in local storage
	useEffect(() => {
		const savedLanguage = localStorage.getItem("language");

		if (savedLanguage === "en" || savedLanguage === "ru") {
			setLanguage(savedLanguage);
		}
		// language flag
		setLanguageLoaded(true);
	}, []);

	// on change to the language in local storage saves the new language 
	useEffect(() => {
		if (languageLoaded) {
			localStorage.setItem("language", language);
		}
	}, [language, languageLoaded]);

	return (

		//make language and setLanguage available everywhere
		<LanguageContext.Provider value={{ language, setLanguage, languageLoaded }}>
			{children}
		</LanguageContext.Provider>

	);
}

/*custom hook to call so we dont have to use useContext(LanguageContext) */
export function useLanguage() {
	return useContext(LanguageContext);
}