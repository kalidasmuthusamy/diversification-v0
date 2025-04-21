import { Button } from "@/components/ui/button"

export default function QuickLinks() {
  const links = [
    "Diversification Calculator",
    "Market Analysis",
    "Asset Classes",
    "Macro Trends",
    "Economic Calendar",
    "Inflation Data",
    "Earnings Reports",
    "Crypto News",
  ]

  return (
    <div className="bg-muted/30 p-2 rounded-md">
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-sm font-medium whitespace-nowrap">Quick Links:</span>
        {links.map((link, index) => (
          <Button key={index} variant="outline" size="sm" className="text-xs h-7 whitespace-nowrap">
            {link}
          </Button>
        ))}
      </div>
    </div>
  )
}
