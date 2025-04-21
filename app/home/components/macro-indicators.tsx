"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, HelpCircle, BarChart2, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MacroIndicators() {
  const [timeframe, setTimeframe] = useState("1m")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-lg">Economic Indicators</CardTitle>
            </div>
            <Tabs defaultValue="1m" className="w-auto" onValueChange={setTimeframe}>
              <TabsList className="h-8">
                <TabsTrigger value="1m" className="text-xs px-2">
                  1M
                </TabsTrigger>
                <TabsTrigger value="3m" className="text-xs px-2">
                  3M
                </TabsTrigger>
                <TabsTrigger value="1y" className="text-xs px-2">
                  1Y
                </TabsTrigger>
                <TabsTrigger value="5y" className="text-xs px-2">
                  5Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <MacroIndicator
              name="US Inflation Rate (YoY)"
              value="2.9%"
              change="-0.3%"
              isNegative={false}
              tooltip="Year-over-year inflation rate in the United States"
            />

            <MacroIndicator
              name="US Unemployment Rate"
              value="4.0%"
              change="-0.1%"
              isNegative={false}
              tooltip="Current unemployment rate in the United States"
            />

            <MacroIndicator
              name="US GDP Growth (QoQ)"
              value="2.1%"
              change="+0.3%"
              isNegative={true}
              tooltip="Quarter-over-quarter GDP growth rate in the United States"
            />

            <MacroIndicator
              name="US 10-Year Treasury Yield"
              value="4.5%"
              change="+0.2%"
              isNegative={true}
              tooltip="Current yield on the 10-year US Treasury bond"
            />

            <MacroIndicator
              name="US Consumer Sentiment"
              value="79.2"
              change="+2.1"
              isNegative={false}
              tooltip="University of Michigan Consumer Sentiment Index"
            />

            <MacroIndicator
              name="US Housing Starts (MoM)"
              value="-3.2%"
              change="-5.1%"
              isNegative={true}
              tooltip="Month-over-month change in new residential construction"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-lg">Global Markets</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Major Indices</div>
              <div className="grid grid-cols-2 gap-3">
                <IndexCard name="S&P 500" value="5,234.18" change="+0.8%" isPositive={true} />
                <IndexCard name="NASDAQ" value="16,742.39" change="+1.2%" isPositive={true} />
                <IndexCard name="FTSE 100" value="7,912.34" change="-0.3%" isPositive={false} />
                <IndexCard name="Nikkei 225" value="38,078.91" change="+0.5%" isPositive={true} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Currencies</div>
              <div className="space-y-2">
                <IndexItem name="EUR/USD" value="1.0842" change="-0.2%" isPositive={false} />
                <IndexItem name="GBP/USD" value="1.2651" change="+0.3%" isPositive={true} />
                <IndexItem name="USD/JPY" value="151.24" change="+0.5%" isPositive={true} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Commodities</div>
              <div className="space-y-2">
                <IndexItem name="Gold" value="$2,165.30" change="+0.4%" isPositive={true} />
                <IndexItem name="Crude Oil" value="$78.42" change="+1.5%" isPositive={true} />
                <IndexItem name="Natural Gas" value="$2.78" change="-2.1%" isPositive={false} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MacroIndicator({
  name,
  value,
  change,
  isNegative,
  tooltip,
}: {
  name: string
  value: string
  change: string
  isNegative: boolean
  tooltip: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">{name}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        <span className={`text-xs flex items-center ${isNegative ? "text-red-500" : "text-green-500"}`}>
          {isNegative ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
          {change}
        </span>
      </div>
    </div>
  )
}

function IndexCard({
  name,
  value,
  change,
  isPositive,
}: { name: string; value: string; change: string; isPositive: boolean }) {
  return (
    <div className="bg-muted/50 rounded-lg p-2">
      <div className="text-xs text-muted-foreground">{name}</div>
      <div className="font-medium">{value}</div>
      <div className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? <ArrowUp className="inline h-3 w-3 mr-0.5" /> : <ArrowDown className="inline h-3 w-3 mr-0.5" />}
        {change}
      </div>
    </div>
  )
}

function IndexItem({
  name,
  value,
  change,
  isPositive,
}: {
  name: string
  value: string
  change: string
  isPositive: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{name}</div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        <span className={`text-xs flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
          {change}
        </span>
      </div>
    </div>
  )
}
