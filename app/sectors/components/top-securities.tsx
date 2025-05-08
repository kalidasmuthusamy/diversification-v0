import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TopSecuritiesProps {
  sector: string
}

export default function TopSecurities({ sector }: TopSecuritiesProps) {
  // Mock securities data
  const securitiesData = {
    technology: [
      { symbol: "NVDA", name: "NVIDIA Corporation", price: "$945.10", change: "+3.8%", isPositive: true },
      { symbol: "MSFT", name: "Microsoft Corp.", price: "$415.33", change: "+0.3%", isPositive: true },
      { symbol: "AAPL", name: "Apple Inc.", price: "$182.63", change: "+0.8%", isPositive: true },
      { symbol: "AVGO", name: "Broadcom Inc.", price: "$1,325.42", change: "+2.1%", isPositive: true },
      { symbol: "ADBE", name: "Adobe Inc.", price: "$485.92", change: "-1.2%", isPositive: false },
    ],
    healthcare: [
      { symbol: "UNH", name: "UnitedHealth Group", price: "$512.78", change: "+1.2%", isPositive: true },
      { symbol: "JNJ", name: "Johnson & Johnson", price: "$152.45", change: "-0.5%", isPositive: false },
      { symbol: "LLY", name: "Eli Lilly & Co.", price: "$785.30", change: "+2.3%", isPositive: true },
      { symbol: "PFE", name: "Pfizer Inc.", price: "$28.12", change: "-0.8%", isPositive: false },
      { symbol: "ABT", name: "Abbott Laboratories", price: "$112.35", change: "+0.6%", isPositive: true },
    ],
    financials: [
      { symbol: "JPM", name: "JPMorgan Chase & Co.", price: "$198.25", change: "+0.7%", isPositive: true },
      { symbol: "BAC", name: "Bank of America Corp.", price: "$38.45", change: "-0.3%", isPositive: false },
      { symbol: "V", name: "Visa Inc.", price: "$275.80", change: "+1.5%", isPositive: true },
      { symbol: "MA", name: "Mastercard Inc.", price: "$458.30", change: "+1.2%", isPositive: true },
      { symbol: "BRK.B", name: "Berkshire Hathaway", price: "$412.78", change: "+0.2%", isPositive: true },
    ],
    energy: [
      { symbol: "XOM", name: "Exxon Mobil Corp.", price: "$112.35", change: "-1.5%", isPositive: false },
      { symbol: "CVX", name: "Chevron Corporation", price: "$154.80", change: "-0.8%", isPositive: false },
      { symbol: "COP", name: "ConocoPhillips", price: "$115.45", change: "-1.2%", isPositive: false },
      { symbol: "SLB", name: "Schlumberger N.V.", price: "$48.25", change: "-0.5%", isPositive: false },
      { symbol: "EOG", name: "EOG Resources Inc.", price: "$125.78", change: "-0.3%", isPositive: false },
    ],
  }

  // Default to technology if the sector is not found
  const securities = securitiesData[sector as keyof typeof securitiesData] || securitiesData.technology

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CardTitle className="text-lg">Popular Securities to Track</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ml-1">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  These securities are selected based on market capitalization, trading volume, and popularity among
                  investors.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {securities.map((security, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <Link href={`/search/${security.symbol}`} className="font-medium hover:text-primary">
                  {security.symbol}
                </Link>
                <div className="text-xs text-muted-foreground">{security.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{security.price}</div>
                <div
                  className={`text-xs flex items-center justify-end ${security.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {security.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {security.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
