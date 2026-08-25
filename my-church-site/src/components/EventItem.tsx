import Link from "next/link";

type Announcement = {
    title: string;
    text: string;
    button: string;
    link: string;
};

type Event = {
    day: string;
    time: string;
    title: string;
    announcement?: Announcement;
};

type EventItemProps = {
    event: Event;
};

export default function EventItem({ event }: EventItemProps) {
    return (
        <article className="flex gap-8 border-b border-[var(--separator)]/10 py-6">
            {/*date/time */}
            <div className="w-32 shrink-0 text-center">
                <h2 className="font-bold text-[var(--highlight)]">
                    {event.day}
                </h2>

                <h3 className="text-[var(--textLightAlt)]">
                    {event.time}
                </h3>
            </div>

            {/*main event info*/}
            <div className="flex-1">
                <h2 className="mb-3 text-[var(--textDark)]">
                    {event.title}
                </h2>

                {event.announcement && (
                    <div className="border-l-4 border-[var(--highlight)] bg-[var(--border)]/35 p-5">
                        <h3 className="mb-2 font-semibold text-[var(--highlight)]">
                            {event.announcement.title}
                        </h3>

                        <p className="mb-5 whitespace-pre-line leading-7 text-[var(--textDark)]">
                            {event.announcement.text}
                        </p>

                        <Link
                            href={event.announcement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="buttonDark inline-block"
                        >
                            {event.announcement.button}
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}