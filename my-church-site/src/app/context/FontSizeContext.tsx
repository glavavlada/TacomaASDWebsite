"use client";

import { createContext, useContext, useState, useEffect } from "react";

// defines the context data type
type FontSizeContextType = {
  largeFont: boolean;
  setLargeFont: (value: boolean) => void;
};

// creates a font size context or an undefined context
const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined
);

// creates the provider component
export function FontSizeProvider({
  children, // everything placed inside can access the provider's data
}: {
  children: React.ReactNode;
}) {
  const [largeFont, setLargeFont] = useState(false);

  // toggles the large-font class in body's css class list
  useEffect(() => {
    document.body.classList.toggle("large-font", largeFont);
  }, [largeFont]); // dependency array

  return ( // creates the provider object and renders everything inside it
    <FontSizeContext.Provider value={{ largeFont, setLargeFont }}>
      {children}
    </FontSizeContext.Provider>
  );
}

// custom hook to be used by children
export function useFontSize() {
  // retrieves the value from provider
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error("useFontSize must be used inside FontSizeProvider");
  }

  return context;
}