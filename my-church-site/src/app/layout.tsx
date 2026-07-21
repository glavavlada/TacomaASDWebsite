import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pages">
        <LanguageProvider>
          <Navbar />

          {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
          {/* keeps content separted from header and footer */}
          <main className="content">
            {children}
          </main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}