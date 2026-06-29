import Link from "next/link";

export default function Navbar() {
    return (
        <header className="Header">
            {/*logo messing with how to import images needs to be changed later for optimization */}
            <img src="/SeventhDayLogo.png" alt="ChurchLogo" className="logo" />
            <h1>Tacoma Russian Seventh-day Adventist Church</h1>
            {/* navigation */}
            <nav>
                <Link href="/"className="button">About</Link>
                <Link href="/BibleLessons" className="button">Bible Lessons</Link>
                <Link href="/Team" className="button">Team</Link>
                <Link href="/Events" className="button">Events</Link>
            </nav>
        </header>
    );
}