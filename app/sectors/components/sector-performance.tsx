"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2 } from "lucide-react"

export default function SectorPerformance() {
  const [timeframe, setTimeframe] = useState("ytd")

  // Mock performance data
  const performanceData = {
    ytd: [
      { name: "Technology", value: 15.7, color: "bg-blue-500" },
      { name: "Healthcare", value: 8.3, color: "bg-green-500" },
      { name: "Financials", value: 5.2, color: "bg-amber-500" },
      { name: "Energy", value: -3.8, color: "bg-red-500" },
      { name: "Consumer Discretionary", value: 7.4, color: "bg-orange-500" },
      { name: "Consumer Staples", value: 6.2, color: "bg-purple-500" },
      { name: "Industrials", value: 4.8, color: "bg-indigo-500" },
      { name: "Materials", value: 2.1, color: "bg-pink-500" },
      { name: "Utilities", value: 1.5, color: "bg-gray-500" },
      { name: "Real Estate", value: 3.6, color: "bg-teal-500" },
      { name: "Communication Services", value: 9.2, color: "bg-cyan-500" },
    ],
    "1y": [
      { name: "Technology", value: 28.3, color: "bg-blue-500" },
      { name: "Healthcare", value: 12.5, color: "bg-green-500" },
      { name: "Financials", value: 9.8, color: "bg-amber-500" },
      { name: "Energy", value: -7.2, color: "bg-red-500" },
      { name: "Consumer Discretionary", value: 15.3, color: "bg-orange-500" },
      { name: "Consumer Staples", value: 8.7, color: "bg-purple-500" },
      { name: "Industrials", value: 10.2, color: "bg-indigo-500" },
      { name: "Materials", value: 5.4, color: "bg-pink-500" },
      { name: "Utilities", value: 3.2, color: "bg-gray-500" },
      { name: "Real Estate", value: 7.8, color: "bg-teal-500" },
      { name: "Communication Services", value: 18.5, color: "bg-cyan-500" },
    ],
    "5y": [
      { name: "Technology", value: 142.5, color: "bg-blue-500" },
      { name: "Healthcare", value: 68.2, color: "bg-green-500" },
      { name: "Financials", value: 45.7, color: "bg-amber-500" },
      { name: "Energy", value: -12.3, color: "bg-red-500" },
      { name: "Consumer Discretionary", value: 87.4, color: "bg-orange-500" },
      { name: "Consumer Staples", value: 32.8, color: "bg-purple-500" },
      { name: "Industrials", value: 52.1, color: "bg-indigo-500" },
      { name: "Materials", value: 28.6, color: "bg-pink-500" },
      { name: "Utilities", value: 18.9, color: "bg-gray-500" },
      { name: "Real Estate", value: 35.2, color: "bg-teal-500" },
      { name: "Communication Services", value: 75.3, color: "bg-cyan-500" },
    ],
    "10y": [
      { name: "Technology", value: 385.2, color: "bg-blue-500" },
      { name: "Healthcare", value: 178.5, color: "bg-green-500" },
      { name: "Financials", value: 112.3, color: "bg-amber-500" },
      { name: "Energy", value: -8.7, color: "bg-red-500" },
      { name: "Consumer Discretionary", value: 215.8, color: "bg-orange-500" },
      { name: "Consumer Staples", value: 85.4, color: "bg-purple-500" },
      { name: "Industrials", value: 132.7, color: "bg-indigo-500" },
      { name: "Materials", value: 68.9, color: "bg-pink-500" },
      { name: "Utilities", value: 52.3, color: "bg-gray-500" },
      { name: "Real Estate", value: 92.1, color: "bg-teal-500" },
      { name: "Communication Services", value: 168.4, color: "bg-cyan-500" },
    ],
  }

  // Find the max absolute value for scaling
  const maxValue = Math.max(
    ...performanceData[timeframe as keyof typeof performanceData].map((item) => Math.abs(item.value)),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Returns by Sector</h3>
        <Tabs defaultValue="ytd" className="w-auto" onValueChange={setTimeframe}>
          <TabsList className="h-8">
            <TabsTrigger value="ytd" className="text-xs px-2">
              YTD
            </TabsTrigger>
            <TabsTrigger value="1y" className="text-xs px-2">
              1Y
            </TabsTrigger>
            <TabsTrigger value="5y" className="text-xs px-2">
              5Y
            </TabsTrigger>
            <TabsTrigger value="10y" className="text-xs px-2">
              10Y
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
        <div className="text-center">
          <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Interactive performance chart would appear here</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {performanceData[timeframe as keyof typeof performanceData].map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className={`text-sm font-medium ${item.value >= 0 ? "text-green-600" : "text-red-600"}`}>
                {item.value >= 0 ? "+" : ""}
                {item.value}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color}`}
                style={{
                  width: `${(Math.abs(item.value) / maxValue) * 100}%`,
                  marginLeft: item.value < 0 ? `${100 - (Math.abs(item.value) / maxValue) * 100}%` : "0",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-center text-muted-foreground">
        Data as of {new Date().toLocaleDateString()}. Past performance is not indicative of future results.
      </div>
    </div>
  )
}
