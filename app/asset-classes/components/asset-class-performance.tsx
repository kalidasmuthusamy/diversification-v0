"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function AssetClassPerformance() {
  const [timeframe, setTimeframe] = useState("ytd")

  // Mock performance data
  const performanceData = {
    ytd: [
      { name: "US Stocks", value: 8.2, color: "bg-blue-500" },
      { name: "Int'l Stocks", value: 5.7, color: "bg-green-500" },
      { name: "Bonds", value: 2.1, color: "bg-amber-500" },
      { name: "Real Estate", value: 5.7, color: "bg-red-500" },
      { name: "Commodities", value: -3.4, color: "bg-orange-500" },
      { name: "Crypto", value: 12.8, color: "bg-purple-500" },
      { name: "Cash", value: 0.9, color: "bg-gray-500" },
    ],
    "1y": [
      { name: "US Stocks", value: 14.5, color: "bg-blue-500" },
      { name: "Int'l Stocks", value: 10.2, color: "bg-green-500" },
      { name: "Bonds", value: -1.2, color: "bg-amber-500" },
      { name: "Real Estate", value: 8.3, color: "bg-red-500" },
      { name: "Commodities", value: -5.7, color: "bg-orange-500" },
      { name: "Crypto", value: 25.4, color: "bg-purple-500" },
      { name: "Cash", value: 1.8, color: "bg-gray-500" },
    ],
    "5y": [
      { name: "US Stocks", value: 68.3, color: "bg-blue-500" },
      { name: "Int'l Stocks", value: 42.1, color: "bg-green-500" },
      { name: "Bonds", value: 12.5, color: "bg-amber-500" },
      { name: "Real Estate", value: 35.8, color: "bg-red-500" },
      { name: "Commodities", value: 18.2, color: "bg-orange-500" },
      { name: "Crypto", value: 152.7, color: "bg-purple-500" },
      { name: "Cash", value: 5.2, color: "bg-gray-500" },
    ],
    "10y": [
      { name: "US Stocks", value: 185.4, color: "bg-blue-500" },
      { name: "Int'l Stocks", value: 95.2, color: "bg-green-500" },
      { name: "Bonds", value: 28.7, color: "bg-amber-500" },
      { name: "Real Estate", value: 78.3, color: "bg-red-500" },
      { name: "Commodities", value: -12 },
      { name: "Real Estate", value: 78.3, color: "bg-red-500" },
      { name: "Commodities", value: -12.5, color: "bg-orange-500" },
      { name: "Crypto", value: 320.8, color: "bg-purple-500" },
      { name: "Cash", value: 8.7, color: "bg-gray-500" },
    ],
  }

  // Find the max absolute value for scaling
  const maxValue = Math.max(
    ...performanceData[timeframe as keyof typeof performanceData].map((item) => Math.abs(item.value)),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="font-medium">Returns by Asset Class</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Data updated daily</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
