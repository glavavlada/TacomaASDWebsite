import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />

          {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
          {/* keeps content separted from header and footer */}
          <main className="self-center w-full max-w-[80rem] px-6 py-8 lg:px-36">
            {children}
          </main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}