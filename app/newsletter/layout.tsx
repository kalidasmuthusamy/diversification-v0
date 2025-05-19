import type React from "react"
import { SiteHeader } from "@/app/components/site-header"

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
