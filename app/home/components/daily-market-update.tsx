import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DailyMarketUpdate() {
  // Mock data - in a real app, this would come from an API
  const marketData = [
    { name: "S&P 500", value: "5,372.28", change: "+104.25", percentChange: "+1.98%", isPositive: true },
    { name: "Dow", value: "40,318.50", change: "+724.94", percentChange: "+1.83%", isPositive: true },
    { name: "Nasdaq", value: "16,726.29", change: "+338.58", percentChange: "+2.07%", isPositive: true },
    { name: "10-Yr", value: "4.52%", change: "+0.05", percentChange: "+1.12%", isPositive: true },
    { name: "VIX", value: "39.07", change: "-1.65", percentChange: "-4.05%", isPositive: false },
  ]

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2 overflow-hidden">
      <div className="container">
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
          <div className="text-sm font-medium text-gray-700 whitespace-nowrap">Markets:</div>

          {marketData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-gray-700">{item.value}</span>
              <div className={`flex items-center ${item.isPositive ? "text-green-600" : "text-red-600"}`}>
                {item.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                <span className="text-sm">{item.percentChange}</span>
              </div>
            </div>
          ))}

          <div className="text-sm text-gray-500 whitespace-nowrap">
            Updated: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  )
}
