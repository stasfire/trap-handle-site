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
  title: "Trap Handle — Tall Kiteboard Handle",
  description:
    "A tall kiteboard handle built for clean board-offs and custom feel.",

  openGraph: {
    title: "Trap Handle — Tall Kiteboard Handle",
    description:
      "Built for board-offs. Custom engraved. ASA durable. Designed for big-air moments.",
    url: "https://www.traphandle.com",
    siteName: "Trap Handle",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Trap Handle",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Trap Handle — Tall Kiteboard Handle",
    description:
      "Built for board-offs. Custom engraved. ASA durable. Designed for big-air moments.",
    images: ["/twitter-image.png"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
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
        {children}
      </body>
    </html>
  );
}
