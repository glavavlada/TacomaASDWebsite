import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";
import type { Metadata } from "next";

// favicon
export const metadata: Metadata = {
  icons: {
    icon: "/SeventhDayLogo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--main)] text-[var(--textLight)] font-sans">        
        <LanguageProvider>
        <Navbar />

        {/* keeps content separted from header and footer */}
        <main className="[background-color:var(--body)] text-[var(--textDark)] flex-1 mx-auto w-full px-[clamp(1rem,10vw,20rem)] py-4">
          {children}
        </main>

        <Footer />
      </LanguageProvider>
      </body>
    </html>
  );
}