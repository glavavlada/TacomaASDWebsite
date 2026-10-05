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
              "script-src 'self' \
                'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' \
                'sha256-FKmLIlivyRyLIlOEsRWVgnplsyQvNOXYObQg/lDxVQk='",
              "style-src 'self' 'unsafe-hashes' \
                'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' \
                'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc=' \
                'sha256-vKC/3e+58wt3AEEnUImhhkZlNJYe2iGGM4zT9jQL6x0='",
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
