"use client";

import Script from "next/script";

export default function FacebookFeed() {
  return (
    <div className="w-full flex justify-center">
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
        strategy="lazyOnload"
      />

      <div
        className="fb-page"
        data-href="https://www.facebook.com/tacomarussian"
        data-tabs="timeline"
        data-width="500"
        data-height="700"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/tacomarussian"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/tacomarussian">
            Tacoma SDA Church
          </a>
        </blockquote>
      </div>
    </div>
  );
}