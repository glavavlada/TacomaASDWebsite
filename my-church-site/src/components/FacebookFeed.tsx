"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
    interface Window {
        FB: any;
    }
}

export default function FacebookFeed() {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full">
            <div id="fb-root"></div>

            <Script
                src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
                strategy="lazyOnload"
                crossOrigin="anonymous"
            />

            <div
                className="fb-page"
                data-href="https://www.facebook.com/tacomarussian"
                data-tabs="timeline"
                data-width="1000"
                data-height="700"
                data-adapt-container-width="false"
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