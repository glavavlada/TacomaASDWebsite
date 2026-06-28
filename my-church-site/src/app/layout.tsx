import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pages">
        <Navbar />
        
        {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
        {/* keeps content separted from header and footer */}
        <main className="content max-w-6xl mx-auto px-4">
          {children}
        </main>

        <Foot />
      </body>
    </html>
  );
}