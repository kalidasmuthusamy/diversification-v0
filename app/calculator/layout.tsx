import type React from "react"
import { MainNav } from "../home/components/main-nav"
import { SiteFooter } from "../home/components/site-footer"

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
