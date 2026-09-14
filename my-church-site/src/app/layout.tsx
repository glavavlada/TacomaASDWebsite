import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { FontSizeProvider } from "./context/FontSizeContext";
import type { Metadata } from "next";

// favicon
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sdatacoma.com"), // establishing main url

  title: "Tacoma SDA Church | Tacoma, WA",
  description: "Russian-speaking Tacoma Seventh-day Adventist Church offering worship services, livestreams, Sabbath School Bible lessons, church leadership, and events in English and Russian.",
  icons: {
    icon: "/SeventhDayLogo.png",
  },
  verification: { // is this useless
    google: "4bfiYbCZPatEbFjFvube_WrbKr3uBA-dLqZR3pZO748"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--main)] text-[var(--textLight)] font-sans">
        {/* structured data for search engines, marks as organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tacoma Russian Seventh-day Adventist Church",
              alternateName: "Tacoma Russian SDA Church",
              url: "https://www.sdatacoma.com",
              logo: "https://www.sdatacoma.com/SeventhDayLogo.png",
              email: "tacomaRussianASD@gmail.com",
              sameAs:
                ["https://www.facebook.com/tacomarussian/",
                  "https://www.youtube.com/@sdatacoma"
                ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "9241 S D St",
                addressLocality: "Tacoma",
                addressRegion: "WA",
                postalCode: "98444",
                addressCountry: "US",
              },
            }),
          }}
        />

        {/* font size toggle support */}
        <FontSizeProvider>
          {/* language toggle support */}
          <LanguageProvider>
            <Navbar />

            {/* keeps content separted from header and footer */}
            <main className="[background-color:var(--body)] text-[var(--textDark)] flex-1 mx-auto w-full px-[clamp(1rem,10vw,20rem)] py-4">
              <div className="mx-[clamp(-8rem,-4vw,-0.5rem)] sm:mx-0">
                {children}
              </div>

            </main>

            <Footer />
          </LanguageProvider>
        </FontSizeProvider>
      </body>
    </html>
  );
}