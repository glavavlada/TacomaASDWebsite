import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />

          {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
          {/* keeps content separted from header and footer */}
          <main className="[background-color:var(--body)] text-[var(--textDark)] flex-1 self-center w-full max-w-[80rem] px-[clamp(1rem,10vw,10rem)] py-8">
            {children}
          </main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}