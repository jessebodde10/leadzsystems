import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "./lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Leadz Systems — AI-tools voor bouw & installatietechniek";
const description =
  "Leadz Systems bouwt slimme AI-tools voor aannemers en installatiebedrijven: automatische offertes, digitale werkbonnen, planning en materiaalbeheer. Minder papierwerk, meer bouwen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Leadz Systems",
  },
  description,
  keywords: [
    "AI bouw",
    "AI installatietechniek",
    "automatische offertes bouw",
    "digitale werkbon",
    "projectplanning installatiebedrijf",
    "administratie automatiseren aannemer",
    "Leadz Systems",
  ],
  authors: [{ name: "Leadz Systems" }],
  creator: "Leadz Systems",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE.url,
    siteName: "Leadz Systems",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
