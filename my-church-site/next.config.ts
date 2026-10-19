import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' \
    'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' \
    'sha256-FKmLIlivyRyLIlOEsRWVgnplsyQvNOXYObQg/lDxVQk=' \
    'sha256-+hO/Bl4Yds6faAoaI/3c/TOe7Yzy6ReoejSW/xTE6yI=' \
    'sha256-xFTp/dMvc47YBGLmK3K5gCUgcs9rshYycdzU6XqBOqc=' \
    'sha256-zWVJ+jNFd15Tril4iwFvR72+1gAk/ACgpu0QlmTb8Eg=' \
    'sha256-+MTyk6wl8VZviJ9XNxZ9NjaOD6XGvKEyYPj4Tpuq3GU='",
  "style-src 'self' 'unsafe-hashes' \
    'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' \
    'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc=' \
    'sha256-vKC/3e+58wt3AEEnUImhhkZlNJYe2iGGM4zT9jQL6x0=' \
    'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
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
            key: "Content-Security-Policy-Report-Only",
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