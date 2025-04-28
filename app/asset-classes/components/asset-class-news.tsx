import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
      image: "/financial-growth-chart.png",
    },
    {
      id: 2,
      title: "Tech stocks rally as AI investments continue to drive growth",
      source: "Investor Daily",
      time: "5 hours ago",
      category: "Technology",
      url: "/news/tech-stocks-rally-ai",
      image: "/interconnected-future.png",
    },
    {
      id: 3,
      title: "Global supply chain improvements ease inflation concerns",
      source: "Economic Times",
      time: "8 hours ago",
      category: "Economy",
      url: "/news/supply-chain-improvements",
      image: "/global-supply-network.png",
    },
    {
      id: 4,
      title: "Small-cap stocks show signs of recovery after months of underperformance",
      source: "Financial Post",
      time: "1 day ago",
      category: "Equities",
      url: "/news/small-cap-recovery",
      image: "/upward-trend-chart.png",
    },
    {
      id: 5,
      title: "ESG investing trends reshape portfolio strategies for institutional investors",
      source: "Sustainable Finance",
      time: "1 day ago",
      category: "ESG",
      url: "/news/esg-investing-trends",
      image: "/growth-with-purpose.png",
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
            <Link href={item.url} key={item.id} className="block">
              <div className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-muted/20 p-2 rounded-md transition-colors">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={70}
                    height={70}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    {item.category}
                  </span>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.time}</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">{item.source}</span>
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
