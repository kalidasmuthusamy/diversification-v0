"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SectorCorrelation() {
  const [timeframe, setTimeframe] = useState("5y")

  // Mock correlation data
  const correlationData = {
    "1y": [
      [1.0, 0.65, 0.58, 0.42, 0.72, 0.38, 0.45, 0.32, 0.28, 0.35, 0.48],
      [0.65, 1.0, 0.52, 0.35, 0.48, 0.42, 0.38, 0.25, 0.32, 0.45, 0.55],
      [0.58, 0.52, 1.0, 0.62, 0.45, 0.28, 0.35, 0.48, 0.52, 0.38, 0.42],
      [0.42, 0.35, 0.62, 1.0, 0.32, 0.25, 0.28, 0.65, 0.58, 0.22, 0.35],
      [0.72, 0.48, 0.45, 0.32, 1.0, 0.55, 0.62, 0.28, 0.32, 0.42, 0.58],
      [0.38, 0.42, 0.28, 0.25, 0.55, 1.0, 0.68, 0.18, 0.22, 0.75, 0.48],
      [0.45, 0.38, 0.35, 0.28, 0.62, 0.68, 1.0, 0.25, 0.28, 0.62, 0.52],
      [0.32, 0.25, 0.48, 0.65, 0.28, 0.18, 0.25, 1.0, 0.72, 0.15, 0.28],
      [0.28, 0.32, 0.52, 0.58, 0.32, 0.22, 0.28, 0.72, 1.0, 0.18, 0.32],
      [0.35, 0.45, 0.38, 0.22, 0.42, 0.75, 0.62, 0.15, 0.18, 1.0, 0.45],
      [0.48, 0.55, 0.42, 0.35, 0.58, 0.48, 0.52, 0.28, 0.32, 0.45, 1.0],
    ],
    "5y": [
      [1.0, 0.62, 0.55, 0.38, 0.68, 0.35, 0.42, 0.28, 0.25, 0.32, 0.45],
      [0.62, 1.0, 0.48, 0.32, 0.45, 0.38, 0.35, 0.22, 0.28, 0.42, 0.52],
      [0.55, 0.48, 1.0, 0.58, 0.42, 0.25, 0.32, 0.45, 0.48, 0.35, 0.38],
      [0.38, 0.32, 0.58, 1.0, 0.28, 0.22, 0.25, 0.62, 0.55, 0.18, 0.32],
      [0.68, 0.45, 0.42, 0.28, 1.0, 0.52, 0.58, 0.25, 0.28, 0.38, 0.55],
      [0.35, 0.38, 0.25, 0.22, 0.52, 1.0, 0.65, 0.15, 0.18, 0.72, 0.45],
      [0.42, 0.35, 0.32, 0.25, 0.58, 0.65, 1.0, 0.22, 0.25, 0.58, 0.48],
      [0.28, 0.22, 0.45, 0.62, 0.25, 0.15, 0.22, 1.0, 0.68, 0.12, 0.25],
      [0.25, 0.28, 0.48, 0.55, 0.28, 0.18, 0.25, 0.68, 1.0, 0.15, 0.28],
      [0.32, 0.42, 0.35, 0.18, 0.38, 0.72, 0.58, 0.12, 0.15, 1.0, 0.42],
      [0.45, 0.52, 0.38, 0.32, 0.55, 0.45, 0.48, 0.25, 0.28, 0.42, 1.0],
    ],
    "10y": [
      [1.0, 0.58, 0.52, 0.35, 0.65, 0.32, 0.38, 0.25, 0.22, 0.28, 0.42],
      [0.58, 1.0, 0.45, 0.28, 0.42, 0.35, 0.32, 0.18, 0.25, 0.38, 0.48],
      [0.52, 0.45, 1.0, 0.55, 0.38, 0.22, 0.28, 0.42, 0.45, 0.32, 0.35],
      [0.35, 0.28, 0.55, 1.0, 0.25, 0.18, 0.22, 0.58, 0.52, 0.15, 0.28],
      [0.65, 0.42, 0.38, 0.25, 1.0, 0.48, 0.55, 0.22, 0.25, 0.35, 0.52],
      [0.32, 0.35, 0.22, 0.18, 0.48, 1.0, 0.62, 0.12, 0.15, 0.68, 0.42],
      [0.38, 0.32, 0.28, 0.22, 0.55, 0.62, 1.0, 0.18, 0.22, 0.55, 0.45],
      [0.25, 0.18, 0.42, 0.58, 0.22, 0.12, 0.18, 1.0, 0.65, 0.08, 0.22],
      [0.22, 0.25, 0.45, 0.52, 0.25, 0.15, 0.22, 0.65, 1.0, 0.12, 0.25],
      [0.28, 0.38, 0.32, 0.15, 0.35, 0.68, 0.55, 0.08, 0.12, 1.0, 0.38],
      [0.42, 0.48, 0.35, 0.28, 0.52, 0.42, 0.45, 0.22, 0.25, 0.38, 1.0],
    ],
  }

  const sectors = [
    "Technology",
    "Healthcare",
    "Financials",
    "Energy",
    "Consumer Disc.",
    "Consumer Staples",
    "Industrials",
    "Materials",
    "Utilities",
    "Real Estate",
    "Comm. Services",
  ]

  const getCorrelationColor = (value: number) => {
    if (value >= 0.7) return "bg-red-500 text-white"
    if (value >= 0.4) return "bg-amber-500 text-white"
    if (value >= 0.2) return "bg-amber-200"
    if (value >= -0.2) return "bg-green-200"
    return "bg-green-500 text-white"
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Correlation values range from -1.0 to 1.0. Values close to 1.0 indicate sectors that move together,
                  while values close to -1.0 indicate sectors that move in opposite directions. Values near 0 indicate
                  little correlation.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm text-muted-foreground">
            Lower correlation between sectors indicates better diversification potential
          </span>
        </div>
        <Tabs defaultValue="5y" className="w-auto" onValueChange={setTimeframe}>
          <TabsList className="h-8">
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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left"></th>
              {sectors.map((sector, index) => (
                <th key={index} className="p-2 text-left text-sm font-medium">
                  {sector}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sectors.map((rowSector, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 text-sm font-medium">{rowSector}</td>
                {sectors.map((colSector, colIndex) => {
                  const value = correlationData[timeframe as keyof typeof correlationData][rowIndex][colIndex]
                  return (
                    <td key={colIndex} className={`p-2 text-sm text-center ${getCorrelationColor(value)}`}>
                      {value.toFixed(2)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500"></div>
            <span className="text-xs">High Correlation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500"></div>
            <span className="text-xs">Moderate Correlation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-200"></div>
            <span className="text-xs">Low Correlation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200"></div>
            <span className="text-xs">No Correlation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500"></div>
            <span className="text-xs">Negative Correlation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
