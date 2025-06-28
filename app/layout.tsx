import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: {
    default: "Essential Talent Recruitment - UK Education & Career Opportunities",
    template: "%s | Essential Talent Recruitment",
  },
  description:
    "Leading UK recruitment company helping talented individuals achieve their dreams through study, work, and career opportunities. Expert teacher recruitment, visa assistance, and online education services.",
  keywords: [
    "UK recruitment",
    "teacher recruitment UK",
    "UK study visa",
    "UK work visa",
    "international education",
    "UK university admission",
    "online tutoring",
    "UK immigration services",
    "study in UK",
    "work in UK",
    "UK education consultancy",
    "Essential Talent Recruitment",
  ],
  authors: [{ name: "Essential Talent Recruitment Ltd" }],
  creator: "Essential Talent Recruitment Ltd",
  publisher: "Essential Talent Recruitment Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.essentialtalent.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.essentialtalent.co",
    siteName: "Essential Talent Recruitment",
    title: "Essential Talent Recruitment - UK Education & Career Opportunities",
    description:
      "Leading UK recruitment company helping talented individuals achieve their dreams through study, work, and career opportunities. Expert teacher recruitment, visa assistance, and online education services.",
    images: [
      {
        url: "/hero-students.jpg",
        width: 1200,
        height: 630,
        alt: "Students exploring global education opportunities with Essential Talent Recruitment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@essentialtalent",
    creator: "@essentialtalent",
    title: "Essential Talent Recruitment - UK Education & Career Opportunities",
    description:
      "Leading UK recruitment company helping talented individuals achieve their dreams through study, work, and career opportunities.",
    images: ["/hero-students.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="canonical" href="https://www.essentialtalent.co" />
        <link rel="alternate" hrefLang="en-gb" href="https://www.essentialtalent.co" />
        <link rel="alternate" hrefLang="en" href="https://www.essentialtalent.co" />
        <link rel="alternate" hrefLang="x-default" href="https://www.essentialtalent.co" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        {/* Additional meta tags */}
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />

        {/* Business information */}
        <meta name="contact" content="contact@essentialtalent.co" />
        <meta name="reply-to" content="contact@essentialtalent.co" />
        <meta name="owner" content="Essential Talent Recruitment Ltd" />
        <meta name="url" content="https://www.essentialtalent.co" />
        <meta name="identifier-URL" content="https://www.essentialtalent.co" />
        <meta name="directory" content="submission" />
        <meta name="category" content="Education, Recruitment, Immigration Services" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
