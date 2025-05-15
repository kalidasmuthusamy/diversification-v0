"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterPromotionBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [frequency, setFrequency] = useState({
    daily: true,
    weekly: true,
  })
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if the banner has been dismissed in this session
    const hasBeenDismissed = sessionStorage.getItem("newsletterBannerDismissed") === "true"

    if (!hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000) // 5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("newsletterBannerDismissed", "true")
  }

  const handleFrequencyChange = (type: "daily" | "weekly") => {
    setFrequency((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    const selectedOptions = []
    if (frequency.daily) selectedOptions.push("daily")
    if (frequency.weekly) selectedOptions.push("weekly")

    alert(`Thanks for subscribing to our ${selectedOptions.join(" and ")} newsletter!`)
    setEmail("")
    handleDismiss()
  }

  if (!isVisible || isDismissed) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in"
      onClick={handleDismiss} // Add this line to dismiss when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl"
        onClick={(e) => e.stopPropagation()} // Add this to prevent clicks on the modal from dismissing
      >
        <div className="relative p-6">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center mb-6">
            <Mail className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">The Long-Term Investor's Newsletter</h2>
            <p className="text-sm md:text-base mb-4">
              Join over <span className="font-bold">30,000+</span> long-term investors receiving our free market
              insights, diversification strategies, and investment opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Current news for long-term investors</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Comprehensive coverage of all asset classes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Focus on what matters for proper diversification</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="flex justify-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="daily-popup"
                      checked={frequency.daily}
                      onChange={() => handleFrequencyChange("daily")}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="daily-popup" className="text-sm">
                      Daily (M-F)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="weekly-popup"
                      checked={frequency.weekly}
                      onChange={() => handleFrequencyChange("weekly")}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="weekly-popup" className="text-sm">
                      Weekly (Sa)
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
                <p className="text-xs text-center text-gray-500">You can unsubscribe at any time.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
