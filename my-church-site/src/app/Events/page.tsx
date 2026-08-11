import events from "@/locale/en/events.json";
import Link from "next/dist/client/link";

export default function Events() {
  return (
    <div>
      <h1>Events & Announcements</h1>

      <div>
        {events.map((event) => (
          <div className="flex gap-10 border-b border-white/10 py-2" key={`${event.day}-${event.time}`}>
            <div className="text-center w-30 shrink-0">
              <h2 className="font-bold text-[var(--highlight)]">{event.day}</h2>
              <h3 className="block text-[var(--textLightAlt)]">{event.time}</h3>
            </div>

            <div>
              <h2>{event.title}</h2>

              {event.announcement && (
                <div className="rounded-r-lg border-l-4 border-[var(--main)] bg-white/[0.03] p-6">
                  <h3 className="text-[var(--highlight)]">{event.announcement.title}</h3>

                  <p className="mb-6 whitespace-pre-line">
                    {event.announcement.text}
                  </p>

                  <Link
                    href={event.announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buttonDark"
                  >
                    {event.announcement.button}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}