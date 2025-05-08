import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, PieChart, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function AssetClassPerformance() {
  const assetClasses = [
    { name: "US Stocks", value: "+8.2%", isPositive: true, color: "bg-blue-500", path: "/asset-classes/us-stocks" },
    {
      name: "Int'l Stocks",
      value: "+5.7%",
      isPositive: true,
      color: "bg-green-500",
      path: "/asset-classes/international-stocks",
    },
    { name: "Bonds", value: "+2.1%", isPositive: true, color: "bg-amber-500", path: "/asset-classes/bonds" },
    { name: "Real Estate", value: "+5.7%", isPositive: true, color: "bg-red-500", path: "/asset-classes/real-estate" },
    {
      name: "Commodities",
      value: "-3.4%",
      isPositive: false,
      color: "bg-orange-500",
      path: "/asset-classes/commodities",
    },
    { name: "Crypto", value: "+12.8%", isPositive: true, color: "bg-purple-500", path: "/asset-classes/crypto" },
    { name: "Cash", value: "+0.9%", isPositive: true, color: "bg-gray-500", path: "/asset-classes/cash" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-lg">Asset Classes</CardTitle>
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
          <Link href="/asset-classes">
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground mb-1">YTD Performance</div>

          {assetClasses.map((asset, index) => (
            <Link
              key={index}
              href={asset.path}
              className="flex items-center justify-between hover:bg-muted/30 p-1 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                <span className="text-sm">{asset.name}</span>
              </div>
              <span
                className={cn(
                  "text-sm font-medium flex items-center",
                  asset.isPositive ? "text-green-600" : "text-red-600",
                )}
              >
                {asset.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {asset.value}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
