import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        

        {/* header */}
        <header className="Header">
          <h2>Church</h2>
          {/* navigation */}
            <nav>
              <Link href = "/">About</Link>
              <Link href = "/about">Bible Lessons</Link>
              <Link href = "/contact">Team</Link>
              <Link href = "/contact">Events</Link>
            </nav>
        </header>

        {/* Footer */}
        <footer className="Footer">
          <p>Contact Us at tacomaRussianASD@gmail.com</p>
        </footer>


        {/* Page Countent  not sure how this functions yet but export above doesnt work without*/}
        {/* keeps content separted from header and footer */}
        <main>{children}</main>
     
      </body>
    </html>
  );
}