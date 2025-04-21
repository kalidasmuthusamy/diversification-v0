import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function MarketOverview() {
  // Mock data - in a real app, this would come from an API
  const marketData = [
    { name: "S&P 500", value: "5,372.28", change: "+1.98%", isPositive: true },
    { name: "Dow Jones", value: "40,318.50", change: "+1.83%", isPositive: true },
    { name: "Nasdaq", value: "16,726.29", change: "+2.07%", isPositive: true },
    { name: "Russell 2000", value: "1,942.46", change: "+0.60%", isPositive: true },
    { name: "10-Year Treasury", value: "4.52%", change: "+0.05%", isPositive: true },
    { name: "VIX", value: "39.07", change: "-4.05%", isPositive: false },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
              <span className="font-medium text-gray-900">{item.name}</span>
              <div className="flex items-center">
                <span className="text-gray-700 mr-3">{item.value}</span>
                <div className={`flex items-center ${item.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {item.isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                  )}
                  <span>{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 text-right">
          Last updated: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </CardContent>
    </Card>
  )
}
