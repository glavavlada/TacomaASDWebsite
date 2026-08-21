"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FontSizeContextType = {
  largeFont: boolean;
  setLargeFont: (value: boolean) => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined
);

export function FontSizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [largeFont, setLargeFont] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("large-font", largeFont);
  }, [largeFont]);

  return (
    <FontSizeContext.Provider value={{ largeFont, setLargeFont }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error("useFontSize must be used inside FontSizeProvider");
  }

  return context;
}