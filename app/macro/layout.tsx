import type React from "react"
import { SiteHeader } from "@/app/components/site-header"

export default function MacroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}
