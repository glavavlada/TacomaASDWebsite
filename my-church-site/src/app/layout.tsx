import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pages">

        <Navbar />

        {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
        {/* keeps content separted from header and footer */}
        <main className="content">
          {children}
        </main>

        {/* Footer */}
        <footer className="Footer">
          <p>Contact Us at tacomaRussianASD@gmail.com</p>
        </footer>


     
      </body>
    </html>
  );
}