import FacebookFeed from "@/components/FacebookFeed";

export default function Events() {

  const news = [
    {
      title: "Sabbath Worship Service",
      text: "Saturday at 10:00 AM"
    },
    {
      title: "Prayer Meeting",
      text: "Wednesday at 7:00 PM"
    },
    {
      title: "Bible Study",
      text: "Friday at 7:00 PM"
    }
  ];

  return (
    <div className="eventsPage">
      <h1 className="eventsTitle">Events & Announcements</h1>

        {/* Left side */}
        <div className="newsSection">
          <h2>Latest News</h2>

          {news.map((item, index) => (
            <div className="newsCard" key={index}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Right side */}

    </div>
  );
}