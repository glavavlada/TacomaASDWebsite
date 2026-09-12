import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.sdatacoma.com/",
        },
        {
            url: "https://www.sdatacoma.com/BibleLessons",
        },
        {
            url: "https://www.sdatacoma.com/Team",
        },
        {
            url: "https://www.sdatacoma.com/Events",
        },
        {
            url: "https://www.sdatacoma.com/Privacy",
        },
    ];
}