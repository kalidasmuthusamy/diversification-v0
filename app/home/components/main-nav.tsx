"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useResponsive } from "@/hooks/use-responsive"

export function MainNav() {
  const pathname = usePathname()
  const { isMobile, isTablet } = useResponsive()

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Diversification Score", href: "/diversification-score", highlight: true },
    { label: "Trends", href: "/trends" },
    { label: "Asset Classes", href: "/asset-classes" },
    { label: "Sectors", href: "/sectors" },
    { label: "Tools", href: "/tools" },
    { label: "Education", href: "/education" },
    { label: "Alternatives Marketplace", href: "/alternatives" },
  ]

  // Determine visible nav items based on device type
  const getVisibleNavItems = () => {
    if (isMobile) return navItems.slice(0, 3) // Show only first 3 items on mobile
    if (isTablet) return navItems.slice(0, 5) // Show first 5 items on tablet
    return navItems // Show all items on desktop
  }

  const visibleNavItems = getVisibleNavItems()
  // Only show dropdown on mobile and tablet
  const dropdownItems = isMobile ? navItems.slice(3) : isTablet ? navItems.slice(5) : []

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto scrollbar-hide">
          {visibleNavItems.map((item) => (
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

        {dropdownItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="ml-auto">
              <button className="flex items-center text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {dropdownItems.map((item) => (
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
        )}
      </div>
    </header>
  )
}
