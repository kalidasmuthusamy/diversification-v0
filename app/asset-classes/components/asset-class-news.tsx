import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface AssetClassNewsProps {
  assetClass: string
}

export default function AssetClassNews({ assetClass }: AssetClassNewsProps) {
  // Mock news data - in a real app, this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "Fed signals potential rate cuts later this year, boosting market sentiment",
      source: "Market Watch",
      time: "2 hours ago",
      category: "Monetary Policy",
      url: "/news/fed-signals-rate-cuts",
    },
    {
      id: 2,
      title: "Tech stocks rally as AI investments continue to drive growth",
      source: "Investor Daily",
      time: "5 hours ago",
      category: "Technology",
      url: "/news/tech-stocks-rally-ai",
    },
    {
      id: 3,
      title: "Global supply chain improvements ease inflation concerns",
      source: "Economic Times",
      time: "8 hours ago",
      category: "Economy",
      url: "/news/supply-chain-improvements",
    },
    {
      id: 4,
      title: "Small-cap stocks show signs of recovery after months of underperformance",
      source: "Financial Post",
      time: "1 day ago",
      category: "Equities",
      url: "/news/small-cap-recovery",
    },
    {
      id: 5,
      title: "ESG investing trends reshape portfolio strategies for institutional investors",
      source: "Sustainable Finance",
      time: "1 day ago",
      category: "ESG",
      url: "/news/esg-investing-trends",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <Badge variant="outline" className="text-xs font-normal">
                  {item.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
              </div>
              <Link href={item.url} className="font-medium hover:text-blue-600 block mb-1">
                {item.title}
              </Link>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{item.source}</span>
                <Link href={item.url} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                  Read Article
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
