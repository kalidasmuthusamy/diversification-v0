import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import Link from "next/link"
import securitiesData from "@/app/data/securities.json"

export default function PopularStocks() {
  // Get the first 5 securities from our data file
  const stocks = Object.values(securitiesData).slice(0, 5)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Popular Stocks</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  Popular stocks are selected based on trading volume, market capitalization, and user interest across
                  our platforms. This list is updated daily and is for informational purposes only. It does not
                  constitute investment advice.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {stocks.map((stock, index) => (
            <Link key={index} href={`/explore/${stock.symbol.toLowerCase()}`} className="block">
              <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors cursor-pointer">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{stock.price}</div>
                  <div
                    className={cn(
                      "text-xs flex items-center justify-end",
                      stock.isPositive ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {stock.isPositive ? (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    )}
                    {stock.changePercent}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
