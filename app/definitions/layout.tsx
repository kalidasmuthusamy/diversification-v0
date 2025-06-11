import type React from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/home/components/site-footer"

export const metadata: Metadata = {
  title: "Financial Definitions | Diversification.com",
  description: "Comprehensive financial definitions and explanations of investment terms, formulas, and concepts.",
}

export default function DefinitionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  )
}
