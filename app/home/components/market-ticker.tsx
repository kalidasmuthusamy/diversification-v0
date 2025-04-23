"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"

export function MarketTicker() {
  const [tickerData, setTickerData] = useState([
    { name: "S&P 500", value: "5,372.28", change: "+1.98%" },
    { name: "Dow Jones", value: "40,318.50", change: "+1.83%" },
    { name: "Nasdaq", value: "16,726.29", change: "+2.07%" },
    { name: "10yr Treasury", value: "4.32%", change: "-0.05%" },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { deviceType, isMobile, isTablet } = useResponsive()

  useEffect(() => {
    // Mock ticker update every 5 seconds
    const interval = setInterval(() => {
      setTickerData((prevData) =>
        prevData.map((item) => ({
          ...item,
          change: (Math.random() * 0.06 - 0.03).toFixed(2) + "%", // Mock change
          value:
            item.name === "10yr Treasury"
              ? (4 + Math.random() * 0.5).toFixed(2) + "%"
              : (
                  Number.parseFloat(item.value.replace(/,/g, "").replace(/%/g, "")) +
                  Math.random() * 100 -
                  50
                ).toLocaleString() + (item.name === "10yr Treasury" ? "%" : ""), // Mock value
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate on mobile
  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isMobile, tickerData.length])

  const nextTicker = () => {
    setCurrentIndex((prev) => (prev + 1) % tickerData.length)
  }

  const prevTicker = () => {
    setCurrentIndex((prev) => (prev - 1 + tickerData.length) % tickerData.length)
  }

  return (
    <div className="bg-muted/40 py-2 overflow-hidden">
      <div className="container">
        {/* Desktop view - show all tickers */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {tickerData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
                <span className="font-medium">{item.name}:</span>
                <span>{item.value}</span>
                <span className={item.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{item.change}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">Updated 6 min ago</div>
        </div>

        {/* Tablet view - show two tickers at a time */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {tickerData.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
                <span className="font-medium">{item.name}:</span>
                <span>{item.value}</span>
                <span className={item.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{item.change}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={prevTicker}
              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
              aria-label="Previous ticker"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextTicker}
              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none ml-1"
              aria-label="Next ticker"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile view - carousel style */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={prevTicker}
              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
              aria-label="Previous ticker"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex-1 flex justify-center items-center space-x-2 whitespace-nowrap px-2">
              <span className="font-medium">{tickerData[currentIndex].name}:</span>
              <span>{tickerData[currentIndex].value}</span>
              <span className={tickerData[currentIndex].change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {tickerData[currentIndex].change}
              </span>
            </div>

            <button
              onClick={nextTicker}
              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
              aria-label="Next ticker"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
