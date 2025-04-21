"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useResponsive } from "@/hooks/use-responsive"

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { deviceType, isMobile, isTablet } = useResponsive()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery.trim()}`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/home" className="flex flex-col mr-6">
            <span className="text-lg md:text-xl font-bold text-blue-600">diversification.com</span>
            <div className={`text-xs text-muted-foreground italic ${isMobile ? "hidden" : "block"}`}>
              The religion of investing
            </div>
          </Link>
        </div>

        {/* Desktop search */}
        <form onSubmit={handleSearch} className="relative hidden lg:block max-w-md w-full mx-4">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search quotes, news & insights"
              className="w-full h-10 pr-10 bg-gray-50 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </form>

        {/* Tablet search - smaller version */}
        <form onSubmit={handleSearch} className="relative hidden md:block lg:hidden max-w-[200px] w-full mx-2">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full h-9 pr-8 bg-gray-50 border-gray-200 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
              <Search className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </form>

        {/* Mobile search button */}
        <button
          onClick={() => document.getElementById("mobile-search")?.focus()}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-gray-700" />
        </button>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button size="sm" variant="outline">
            SIGN IN
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            CREATE FREE ACCOUNT
          </Button>
        </div>

        {/* Tablet buttons - more compact */}
        <div className="hidden md:flex lg:hidden items-center space-x-2">
          <Button size="sm" variant="outline" className="text-xs px-2.5 py-1">
            SIGN IN
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs px-2.5 py-1">
            SIGN UP
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="sm:hidden ml-2">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="py-4">
              <form onSubmit={handleSearch} className="mb-6">
                <Input
                  id="mobile-search"
                  type="search"
                  placeholder="Search quotes, news & insights"
                  className="w-full h-10 bg-gray-50 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  SIGN IN
                </Button>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">CREATE FREE ACCOUNT</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
