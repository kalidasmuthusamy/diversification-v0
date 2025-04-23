import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function PopularStocks() {
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$182.63", change: "+0.8%", isPositive: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "$415.33", change: "+0.3%", isPositive: true },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "$945.10", change: "+3.8%", isPositive: true },
    { symbol: "TSLA", name: "Tesla, Inc.", price: "$178.21", change: "-2.1%", isPositive: false },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: "$178.25", change: "-1.2%", isPositive: false },
  ]

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
            <div key={index} className="flex items-center justify-between">
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
                  {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
