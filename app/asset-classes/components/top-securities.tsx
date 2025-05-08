import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TopSecuritiesProps {
  assetClass: string
}

export default function TopSecurities({ assetClass }: TopSecuritiesProps) {
  // Mock securities data
  const securitiesData = {
    stocks: [
      { symbol: "AAPL", name: "Apple Inc.", price: "$182.63", change: "+0.8%", isPositive: true },
      { symbol: "MSFT", name: "Microsoft Corp.", price: "$415.33", change: "+0.3%", isPositive: true },
      { symbol: "NVDA", name: "NVIDIA Corp.", price: "$945.10", change: "+3.8%", isPositive: true },
      { symbol: "TSLA", name: "Tesla, Inc.", price: "$178.21", change: "-2.1%", isPositive: false },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: "$178.25", change: "-1.2%", isPositive: false },
    ],
    bonds: [
      { symbol: "BND", name: "Vanguard Total Bond ETF", price: "$72.45", change: "+0.2%", isPositive: true },
      { symbol: "AGG", name: "iShares Core US Aggregate", price: "$98.12", change: "+0.3%", isPositive: true },
      { symbol: "TLT", name: "iShares 20+ Year Treasury", price: "$94.78", change: "-0.5%", isPositive: false },
      { symbol: "LQD", name: "iShares iBoxx $ IG Corp", price: "$108.35", change: "+0.1%", isPositive: true },
      { symbol: "HYG", name: "iShares iBoxx $ HY Corp", price: "$76.92", change: "-0.3%", isPositive: false },
    ],
    "real-estate": [
      { symbol: "VNQ", name: "Vanguard Real Estate ETF", price: "$84.25", change: "+1.2%", isPositive: true },
      { symbol: "IYR", name: "iShares U.S. Real Estate", price: "$87.45", change: "+0.9%", isPositive: true },
      { symbol: "AMT", name: "American Tower Corp", price: "$192.30", change: "-0.5%", isPositive: false },
      { symbol: "PLD", name: "Prologis Inc", price: "$125.78", change: "+1.5%", isPositive: true },
      { symbol: "EQIX", name: "Equinix Inc", price: "$780.45", change: "+0.3%", isPositive: true },
    ],
    commodities: [
      { symbol: "GLD", name: "SPDR Gold Shares", price: "$201.35", change: "+0.7%", isPositive: true },
      { symbol: "USO", name: "United States Oil Fund", price: "$72.80", change: "-1.5%", isPositive: false },
      { symbol: "SLV", name: "iShares Silver Trust", price: "$22.45", change: "+1.2%", isPositive: true },
      { symbol: "CPER", name: "United States Copper", price: "$24.30", change: "-0.8%", isPositive: false },
      { symbol: "WEAT", name: "Teucrium Wheat Fund", price: "$5.78", change: "+2.1%", isPositive: true },
    ],
    crypto: [
      { symbol: "BTC", name: "Bitcoin", price: "$68,245.12", change: "+2.3%", isPositive: true },
      { symbol: "ETH", name: "Ethereum", price: "$3,478.90", change: "+1.8%", isPositive: true },
      { symbol: "SOL", name: "Solana", price: "$142.35", change: "+4.5%", isPositive: true },
      { symbol: "BNB", name: "Binance Coin", price: "$578.20", change: "-0.7%", isPositive: false },
      { symbol: "ADA", name: "Cardano", price: "$0.45", change: "-1.2%", isPositive: false },
    ],
  }

  // Default to stocks if the asset class is not found
  const securities = securitiesData[assetClass as keyof typeof securitiesData] || securitiesData.stocks

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
