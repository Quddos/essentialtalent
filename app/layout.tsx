import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Essential Talent Recruitment",
  description: "We help talented individuals to achieve their dreams through study, work, and career opportunities in the UK. From teacher recruitment to online education, we're your trusted partner in success.",
  generator: "essentialtalent.co",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
