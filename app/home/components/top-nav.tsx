"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery.trim()}`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/home" className="flex flex-col mr-6">
          <span className="text-xl font-bold text-blue-600">diversification.com</span>
          <div className="text-xs text-muted-foreground italic">The religion of investing</div>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden md:block max-w-md w-full mx-4">
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

        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline" className="hidden sm:flex">
            SIGN IN
          </Button>

          <Button size="sm" className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
            CREATE FREE ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  )
}
