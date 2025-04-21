import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Play } from "lucide-react"

interface AssetClassNewsProps {
  assetClass: string
}

export default function AssetClassNews({ assetClass }: AssetClassNewsProps) {
  // Mock news data
  const newsItems = {
    stocks: [
      {
        title: "Tech stocks lead market rally as earnings exceed expectations",
        time: "2 hours ago",
        category: "Earnings",
        hasVideo: true,
      },
      {
        title: "S&P 500 reaches new all-time high amid economic optimism",
        time: "5 hours ago",
        category: "Markets",
        hasVideo: false,
      },
      {
        title: "Small-cap stocks showing signs of recovery after prolonged underperformance",
        time: "1 day ago",
        category: "Analysis",
        hasVideo: true,
      },
      {
        title: "Dividend aristocrats continue to outperform in uncertain market conditions",
        time: "1 day ago",
        category: "Dividends",
        hasVideo: false,
      },
    ],
    bonds: [
      {
        title: "Treasury yields fall as Fed signals potential rate cuts",
        time: "3 hours ago",
        category: "Interest Rates",
        hasVideo: true,
      },
      {
        title: "Corporate bond spreads narrow as default concerns ease",
        time: "6 hours ago",
        category: "Credit",
        hasVideo: false,
      },
      {
        title: "Municipal bonds attract investors seeking tax-efficient income",
        time: "1 day ago",
        category: "Municipal",
        hasVideo: false,
      },
      {
        title: "High-yield bonds face pressure as recession concerns mount",
        time: "2 days ago",
        category: "High Yield",
        hasVideo: true,
      },
    ],
    "real-estate": [
      {
        title: "Commercial real estate showing signs of recovery in major markets",
        time: "4 hours ago",
        category: "Commercial",
        hasVideo: true,
      },
      {
        title: "REITs outperform broader market as interest rate outlook improves",
        time: "7 hours ago",
        category: "REITs",
        hasVideo: false,
      },
      {
        title: "Housing market cools as mortgage rates remain elevated",
        time: "1 day ago",
        category: "Residential",
        hasVideo: true,
      },
      {
        title: "Industrial properties continue to see strong demand from e-commerce",
        time: "2 days ago",
        category: "Industrial",
        hasVideo: false,
      },
    ],
    commodities: [
      {
        title: "Oil prices drop on increased production and weakening demand",
        time: "2 hours ago",
        category: "Energy",
        hasVideo: true,
      },
      {
        title: "Gold reaches six-month high amid geopolitical tensions",
        time: "5 hours ago",
        category: "Precious Metals",
        hasVideo: false,
      },
      {
        title: "Agricultural commodities surge on supply concerns",
        time: "1 day ago",
        category: "Agriculture",
        hasVideo: false,
      },
      {
        title: "Copper prices indicate potential economic slowdown ahead",
        time: "2 days ago",
        category: "Industrial Metals",
        hasVideo: true,
      },
    ],
    crypto: [
      {
        title: "Bitcoin surges past $70,000 as institutional adoption increases",
        time: "1 hour ago",
        category: "Bitcoin",
        hasVideo: true,
      },
      {
        title: "Ethereum upgrade promises improved scalability and lower fees",
        time: "4 hours ago",
        category: "Ethereum",
        hasVideo: false,
      },
      {
        title: "Regulatory clarity improves outlook for cryptocurrency markets",
        time: "1 day ago",
        category: "Regulation",
        hasVideo: true,
      },
      {
        title: "DeFi protocols see increased activity as yields attract investors",
        time: "2 days ago",
        category: "DeFi",
        hasVideo: false,
      },
    ],
  }

  // Default to stocks if the asset class is not found
  const news = newsItems[assetClass as keyof typeof newsItems] || newsItems.stocks

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-medium">{item.title}</h3>
                {item.hasVideo && (
                  <div className="flex-shrink-0 bg-primary/10 rounded-full p-1">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {item.time}
                </div>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">View All News</Button>
        </div>
      </CardContent>
    </Card>
  )
}
