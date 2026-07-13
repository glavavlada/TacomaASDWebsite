"use client";
import LiveStreamEmbed from "@/components/LiveStream";
import Image from "next/image";

var churchImgOut = "/church_outside.jpg";
var churchImgHall = "/church_hall.jpg";

export default function About() {
  return (

    <div className="aboutPage">
      <LiveStreamEmbed />

      {/* History Section */}
      <h1>History</h1>
      <section className="infoSection">
        <section className="imgWrapper">
          <Image
            src={churchImgOut}
            alt="Exterior of our church"
            width={800}
            height={1200}
            className="outImage"
          />
          <p>
            Our welcoming multiethnic Seventh-day Adventist church in Tacoma.
          </p>
        </section>

        <div className="textContent">
          <p>
            Our journey began in 2004 with the establishment of the southern branch of the Center for Spiritual Enrichment in Tacoma. Under the leadership of our first pastor, Ivan Bokov, the congregation flourished, offering spiritual nourishment and fellowship to many.
            In 2009, the congregation was officially recognized as a church, marking a significant milestone in our journey.
            In 2015, guided by faith and determination, the church took a bold step forward by purchasing a building to serve as our permanent place of worship.
            The culmination of years of dedication and faith came in 2024 with the consecration of our prayer house.
            Also in 2024, Pastor Vitalii Glavatskiy took over as the head pastor of the church, while Ivan Bokov remains as an elder to share his experience.
          </p>
          <p>
            Today, our church stands as a vibrant community of believers, united in our mission to share the gospel and demonstrate God&apos;s love to all.
            Among our members are Russians, Ukrainians, Moldovans, Gagauz, Belorussians, Romanians, Rusins, Armenians, Uzbeks, Turkmens, and Americans, each bringing unique traditions and cultural heritage.
            This cultural richness fosters unity and mutual respect. Together, we worship as one body, celebrating our shared faith while embracing our differences.
            Over the years, our church has expanded in numbers, mission, and impact. We strive to be a beacon of hope and love, offering ministries that serve both spiritual and practical needs. Our worship services, Bible studies, and outreach initiatives aim to draw people closer to Christ and one another.
          </p>

        </div>
      </section>

      {/*Beliefs Section*/}
      <h1>Beliefs</h1>
      <section className="infoSection">
        <div className="textContent">
          <p>
            We are Seventh-day Adventists, Christians who strive to live according to biblical principles, following the teachings of Jesus Christ.
            At the center of our faith is God&apos;s love, revealed through Christ, who died for our sins and rose again to give us the hope of eternal life. We believe that the Bible is the Word of God, the only true source of truth, and a guide for our lives.
            A special part of our faith is the seventh day of the week—Sabbath—which was established by God as a day of rest, worship, and spiritual renewal.
            Observing the Sabbath allows us to step away from daily concerns, focus on God&apos;s presence, and strengthen our relationships with Him and with one another.
            Our greatest hope is the soon return of Jesus Christ. We believe that He will come again to establish His eternal Kingdom, resurrect the righteous, and grant His followers a life free from suffering and death.
          </p>

          <p>
            We also place great importance on a healthy lifestyle because our bodies are the temple of the Holy Spirit. We promote balanced living, emphasizing the importance of mental, emotional, and physical well-being. By maintaining good health, we honor God and better equip ourselves to serve others.
            We engage in educational, medical, and charitable projects, striving to benefit society and inspire those around us. We are a large spiritual family, united by faith, hope, and the desire to serve God and people.
            Our doors are always open to those searching for truth, meaning, and connection. If you are looking for a place where you can grow spiritually, find purpose, and receive support, we would be happy to welcome you among us!
          </p>
        </div>

        <section className="imgWrapper">
          <Image
            src={churchImgHall}
            alt="Church Hall"
            width={1200}
            height={800}
            className="inImage"
          />
          <p>
            Inside our church, you will find a warm and inviting space where people gather to worship, learn, and build meaningful relationships.
          </p>
        </section>
      </section>
    </div>
  );
}