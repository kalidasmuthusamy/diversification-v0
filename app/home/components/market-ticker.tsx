"use client"

import { useState, useEffect } from "react"

export function MarketTicker() {
  const [tickerData, setTickerData] = useState([
    { name: "S&P 500", value: "5,372.28", change: "+1.98%" },
    { name: "Dow Jones", value: "40,318.50", change: "+1.83%" },
    { name: "Nasdaq", value: "16,726.29", change: "+2.07%" },
    { name: "10yr Treasury", value: "4.32%", change: "-0.05%" },
  ])

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

  return (
    <div className="bg-muted/40 py-2 overflow-x-auto">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-6">
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
    </div>
  )
}
