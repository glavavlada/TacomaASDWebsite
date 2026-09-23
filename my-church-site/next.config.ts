import type { NextConfig } from "next";

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
          { // broad CSP policy: needs to be be investigated taken off report only
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self'", // 'unsafe-inline' 'unsafe-eval'
              "style-src 'self'", // 'unsafe-inline'
              "img-src 'self'", // data: blob: <-- check with stream
              "font-src 'self' data:", // data:  <-- check with stream
              "connect-src 'self'",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://sabbath-school.adventech.io",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          }
        ],
      },
    ];
  }
};

export default nextConfig;
