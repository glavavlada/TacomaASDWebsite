import Link from "next/link";

export default function Navbar() {
    return (
        <header className="Header">
            {/*logo messing with how to import images needs to be changed later for optimization */}
            <img src="/SeventhDayLogo.png" alt="ChurchLogo" className="logo" />
            <h1>Tacoma Russian Seventh-day Adventist Church</h1>
            {/* navigation */}
            <nav>
                <Link href="/">About</Link>
                <Link href="/BibleLessons">Bible Lessons</Link>
                <Link href="/Team">Team</Link>
                <Link href="/Events">Events</Link>
            </nav>
        </header>
    );
}