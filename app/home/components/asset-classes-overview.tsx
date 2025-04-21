import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUp, ArrowDown, TrendingUp, BarChart3, Building, Coins, DollarSign, Gem } from "lucide-react"

export default function AssetClassesOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AssetClassCard
          icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          title="Stocks"
          description="Equity ownership in publicly traded companies"
          performance="+8.2%"
          volatility="High"
          correlation="1.0"
          isPositive={true}
          color="bg-blue-500"
        />

        <AssetClassCard
          icon={<Coins className="h-5 w-5 text-amber-500" />}
          title="Bonds"
          description="Fixed income securities with regular interest payments"
          performance="+2.1%"
          volatility="Low"
          correlation="0.2"
          isPositive={true}
          color="bg-amber-500"
        />

        <AssetClassCard
          icon={<Building className="h-5 w-5 text-red-500" />}
          title="Real Estate"
          description="Property investments including REITs and direct ownership"
          performance="+5.7%"
          volatility="Medium"
          correlation="0.6"
          isPositive={true}
          color="bg-red-500"
        />

        <AssetClassCard
          icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
          title="Commodities"
          description="Physical goods like gold, oil, and agricultural products"
          performance="-3.4%"
          volatility="High"
          correlation="0.3"
          isPositive={false}
          color="bg-orange-500"
        />

        <AssetClassCard
          icon={<Gem className="h-5 w-5 text-purple-500" />}
          title="Cryptocurrency"
          description="Digital assets using blockchain technology"
          performance="+12.8%"
          volatility="Very High"
          correlation="0.2"
          isPositive={true}
          color="bg-purple-500"
        />

        <AssetClassCard
          icon={<DollarSign className="h-5 w-5 text-gray-500" />}
          title="Cash & Equivalents"
          description="Money market funds, T-bills, and other liquid assets"
          performance="+0.9%"
          volatility="Very Low"
          correlation="0.0"
          isPositive={true}
          color="bg-gray-300"
        />
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Explore All Asset Classes
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function AssetClassCard({
  icon,
  title,
  description,
  performance,
  volatility,
  correlation,
  isPositive,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  performance: string
  volatility: string
  correlation: string
  isPositive: boolean
  color: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${color}/10 flex items-center justify-center`}>{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">YTD Performance</span>
            <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {performance}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Volatility</span>
            <Badge variant="outline" className="text-xs">
              {volatility}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Correlation to S&P 500</span>
            <span className="text-sm font-medium">{correlation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
