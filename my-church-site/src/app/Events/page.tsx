import FacebookFeed from "@/components/FacebookFeed";

export default function Events() {
  return (
    <div className="eventsPage">

  <h1 className="eventsTitle">Events & Announcements</h1>

  <div className="eventsGrid">

    <div className="newsColumn">
      <h2>Latest News</h2>

      <div className="newsCard">
        <h1>Church service at 10:00 AM</h1>
      </div>

      <div className="newsCard">
        <h1>sabbath class at 8:00 PM</h1>
      </div>
    </div>

    <div className="facebookColumn">
      <h2>Facebook Updates</h2>

      <FacebookFeed />
    </div>

  </div>

</div>
  );
}