import Link from "next/link";
import Image from "next/image";

var churchLogo = "/SeventhDayLogo.png";

export default function Navbar() {
    return (
        <header className="Header">
            <Image
                src={churchLogo}
                alt="Church Logo"
                width={60}
                height={60}
                className="logo"
                priority
            />

            <h1>Tacoma Seventh-day Adventist Church</h1>
            <nav>
                <Link href="/" className="button">About</Link>
                <Link href="/BibleLessons" className="button">Bible Lessons</Link>
                <Link href="/Team" className="button">Team</Link>
                <Link href="/Events" className="button">Events</Link>
            </nav>
        </header>
    );
}