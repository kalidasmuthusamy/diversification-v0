import type React from "react"
import { SiteFooter } from "@/app/home/components/site-footer"

export default function MostImpactfulStoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}
