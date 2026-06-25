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

const title = "Leadz Systems — AI-software & automatisering voor het MKB";
const description =
  "Leadz Systems bouwt slimme AI-software en automatiseringen op maat voor het MKB: workflow-automatisering, websites en web-apps, en koppelingen met heldere dashboards. Minder handwerk, meer resultaat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Leadz Systems",
  },
  description,
  keywords: [
    "AI-automatisering MKB",
    "workflow automatisering",
    "custom software op maat",
    "website laten maken",
    "web-app ontwikkeling",
    "systeemintegraties",
    "dashboard bouwen",
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
