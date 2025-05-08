import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QuickLinks() {
  const links = [
    { name: "Market Analysis", href: "/home" },
    { name: "Asset Classes", href: "/asset-classes" },
    { name: "Macro Trends", href: "/trends" },
    { name: "Economic Calendar", href: "/tools" },
    { name: "Inflation Data", href: "/tools" },
    { name: "Earnings Reports", href: "/tools" },
    { name: "Crypto News", href: "/tools" },
  ]

  return (
    <div className="bg-muted/30 p-2 rounded-md">
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-sm font-medium whitespace-nowrap">Quick Links:</span>
        {links.map((link, index) => (
          <Button key={index} variant="outline" size="sm" className="text-xs h-7 whitespace-nowrap" asChild>
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
