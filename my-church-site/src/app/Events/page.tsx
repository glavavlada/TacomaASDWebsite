import events from "@/locale/en/events.json";

export default function Events() {
  return (
    <div className="eventsPage">
      <h1>Events & Announcements</h1>

      <div className="scheduleSection">
        {events.map((event) => (
          <div className="scheduleItem" key={`${event.day}-${event.time}`}>
            <div className="scheduleDate">
              <span className="day">{event.day}</span>
              <span className="time">{event.time}</span>
            </div>

            <div className="scheduleInfo">
              <h3>{event.title}</h3>

              {event.announcement && (
                <div className="eventAnnouncement">
                  <h4>{event.announcement.title}</h4>

                  <p className="announcementText">
                    {event.announcement.text}
                  </p>

                  <a
                    href={event.announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="announcementButton"
                  >
                    {event.announcement.button}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}