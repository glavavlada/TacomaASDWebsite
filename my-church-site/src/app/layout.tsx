import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pages">
        
        {/* header */}
        <header className="Header">
          {/*logo messing with how to import images needs to be changed later for optimization */}
          <img src="/SeventhDayLogo.png" alt="ChurchLogo" className="logo" />
          <h1>Tacoma Russian Seventh-day Adventist Church</h1>
          {/* navigation */}
            <nav>
              <Link href = "/About">About</Link>
              <Link href = "/BibleLessons">Bible Lessons</Link>
              <Link href = "/Team">Team</Link>
              <Link href = "/Events">Events</Link>
            </nav>
        </header>

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