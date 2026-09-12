import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // all search engine crawlers
      allow: "/", // allowed to crawl the website
    },
    sitemap: "https://www.sdatacoma.com/sitemap.xml", // points crawlers to the sitemap
  };
}