"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function TopNav() {
  const { isMobile } = useResponsive()
  const [email, setEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert("Thanks for subscribing!")
    setEmail("")
    setIsDialogOpen(false)
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/home" className="flex flex-col mr-6">
            <span className="text-lg md:text-xl font-bold text-blue-600">diversification.com</span>
            <div className={`text-xs text-muted-foreground italic ${isMobile ? "hidden" : "block"}`}>
              Powered by PortfolioPilot.com
            </div>
          </Link>
        </div>

        {/* Desktop newsletter signup */}
        <div className="hidden md:flex items-center flex-1 justify-end">
          <div className="flex items-center w-full max-w-md">
            <form onSubmit={handleSubscribe} className="flex items-center w-full">
              <div className="flex-shrink-0 flex items-center mr-2">
                <Mail className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium hidden lg:inline whitespace-nowrap">Join 30,000 investors:</span>
              </div>
              <div className="flex flex-1 min-w-0">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="w-full h-9 rounded-r-none border-r-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-9 rounded-l-none bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile subscribe button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="md:hidden">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Subscribe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Join 30,000 informed investors</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubscribe} className="space-y-4 mt-2">
              <p className="text-sm text-muted-foreground">
                Get news for long-term investors across all 30+ asset classes
              </p>
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
              <p className="text-xs text-center text-muted-foreground">You can unsubscribe at any time</p>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
