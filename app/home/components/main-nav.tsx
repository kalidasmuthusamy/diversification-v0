"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MainNav() {
  const pathname = usePathname()

  // Verify that the navItems array doesn't include any explore links
  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Diversification", href: "/diversification", highlight: true },
    { label: "Trends", href: "/trends" },
    { label: "Asset Classes", href: "/asset-classes" },
    { label: "Sectors", href: "/sectors" },
    { label: "Tools", href: "/tools" },
    { label: "Education", href: "/education" },
    { label: "Diversification Marketplace", href: "/partners" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                item.highlight ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                pathname === item.href ? "bg-gray-50" : "",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden ml-auto">
            <button className="flex items-center text-sm font-medium text-gray-700">
              Menu
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "w-full",
                    item.highlight ? "text-blue-600 font-semibold" : "",
                    pathname === item.href ? "bg-gray-50" : "",
                  )}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
