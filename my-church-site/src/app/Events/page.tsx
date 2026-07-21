export default function Events() {

	const events = [
		{
			day: "Saturday",
			time: "10:00 AM",
			title: "Worship Service"
		},
		{
			day: "Tuesday",
			time: "8:30 PM",
			title: "Prayer Meeting",

			announcement: {
				title: "Online via Zoom",
				text: `Дорогие братья и сёстры! 🙏

				Напоминаем, что во вторник в 8:30 PM (вечером) состоится молитвенное служение онлайн в Zoom.
				Приглашаем вместе вознести молитвы за людей, которым были переданы книги, за наши семьи, церковь и духовное пробуждение.
				Пусть Господь благословит посеянные семена истины и коснётся сердец людей через действие Святого Духа.
				Будем рады видеть каждого! 🙏`,

				button: "Join Zoom Meeting",
				link: "https://us06web.zoom.us/j/84556994253?pwd=Bwxhu4zBOamT0arIaqEss9TnF5ve9d.1"
			}
		},
	];

	return (
		<div className="eventsPage">
			<h1>Events & Announcements</h1>
			<div className="scheduleSection">
				{events.map((event, index) => (
					<div className="scheduleItem" key={index}>
						<div className="scheduleDate">

							<span className="day">
								{event.day}
							</span>

							<span className="time">
								{event.time}
							</span>

						</div>
						<div className="scheduleInfo">
							<h3>{event.title}</h3>

							{event.announcement && (
								<div className="eventAnnouncement">
									<h4>
										{event.announcement.title}
									</h4>

									<p className="announcementText">
										{event.announcement.text}
									</p>

									<a href={event.announcement.link} target="_blank" rel="noopener noreferrer" className="announcementButton" >
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