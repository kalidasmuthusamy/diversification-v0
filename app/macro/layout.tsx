import type React from "react"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/home/components/site-footer"

export default function MacroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
