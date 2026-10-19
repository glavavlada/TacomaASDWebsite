import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' \
    https://www.youtube.com \
    https://www.youtube-nocookie.com \
    https://sabbath-school.adventech.io",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },

      // CSP reporting only on the domain
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "^(www\\.)?sdatacoma\\.com$",
          },
        ],
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },

      // Cache Bible lesson PDFs for one day
      {
        source: "/lessons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;