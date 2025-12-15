import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.traphandle.com"),

  title: {
    default: "Trap Handle — Tall Kiteboard Handle",
    template: "%s | Trap Handle",
  },

  description:
    "A tall kiteboard handle built for clean board-offs and a custom feel. UV-resistant ASA material, ergonomics-first shape, and custom engraving.",

  applicationName: "Trap Handle",

  keywords: [
    "kiteboard handle",
    "kiteboarding handle",
    "tall kiteboard handle",
    "board-off handle",
    "kiteboarding accessories",
    "custom kiteboard handle",
    "big air kiteboarding",
  ],

  category: "Sports Equipment",
  creator: "Trap Handle",
  publisher: "Trap Handle",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Trap Handle — Tall Kiteboard Handle",
    description:
      "Built for board-offs. Custom engraved. UV-resistant ASA. Designed for big-air moments.",
    url: "https://www.traphandle.com",
    siteName: "Trap Handle",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Trap Handle — Tall Kiteboard Handle",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Trap Handle — Tall Kiteboard Handle",
    description:
      "Built for board-offs. Custom engraved. UV-resistant ASA. Designed for big-air moments.",
    images: ["/twitter-image.png"],
  },

  icons: {
    // Your existing files in /public
    icon: [
      { url: "/icon.png", type: "image/png" },
      // Optional additional sizes if you add them later:
      // { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      // { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // JSON-LD for Product; does not affect visuals
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Trap Handle — Tall Kiteboard Handle",
              description:
                "A tall kiteboard handle built for clean board-offs and a custom feel. UV-resistant ASA material, ergonomics-first shape, and custom engraving.",
              brand: {
                "@type": "Brand",
                name: "Trap Handle",
              },
              category: "Sporting Goods",
              image: ["https://www.traphandle.com/opengraph-image.png"],
              offers: {
                "@type": "Offer",
                url: "https://www.traphandle.com",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
