import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Play } from "lucide-react"

interface SectorNewsProps {
  sector: string
}

export default function SectorNews({ sector }: SectorNewsProps) {
  // Mock news data
  const newsItems = {
    technology: [
      {
        title: "Semiconductor stocks surge on AI chip demand",
        time: "2 hours ago",
        category: "Semiconductors",
        hasVideo: true,
      },
      {
        title: "Cloud computing giants report strong earnings growth",
        time: "5 hours ago",
        category: "Cloud",
        hasVideo: false,
      },
      {
        title: "Software-as-a-Service valuations under pressure as interest rates rise",
        time: "1 day ago",
        category: "Software",
        hasVideo: true,
      },
      {
        title: "Tech layoffs continue despite strong sector performance",
        time: "1 day ago",
        category: "Employment",
        hasVideo: false,
      },
    ],
    healthcare: [
      {
        title: "Biotech stocks rally on breakthrough cancer treatment approval",
        time: "3 hours ago",
        category: "Biotech",
        hasVideo: true,
      },
      {
        title: "Healthcare providers face margin pressure from rising costs",
        time: "6 hours ago",
        category: "Providers",
        hasVideo: false,
      },
      {
        title: "Medical device makers report supply chain improvements",
        time: "1 day ago",
        category: "Devices",
        hasVideo: false,
      },
      {
        title: "Pharmaceutical giants announce major merger",
        time: "2 days ago",
        category: "Pharma",
        hasVideo: true,
      },
    ],
    financials: [
      {
        title: "Banks report strong net interest income despite deposit challenges",
        time: "4 hours ago",
        category: "Banking",
        hasVideo: true,
      },
      {
        title: "Insurance companies benefit from higher interest rates",
        time: "7 hours ago",
        category: "Insurance",
        hasVideo: false,
      },
      {
        title: "Fintech companies struggle with rising customer acquisition costs",
        time: "1 day ago",
        category: "Fintech",
        hasVideo: true,
      },
      {
        title: "Asset managers see inflows to fixed income products",
        time: "2 days ago",
        category: "Asset Management",
        hasVideo: false,
      },
    ],
    energy: [
      {
        title: "Oil prices drop on increased production and weakening demand",
        time: "2 hours ago",
        category: "Oil & Gas",
        hasVideo: true,
      },
      {
        title: "Renewable energy companies secure major project financing",
        time: "5 hours ago",
        category: "Renewables",
        hasVideo: false,
      },
      {
        title: "Natural gas prices volatile amid geopolitical tensions",
        time: "1 day ago",
        category: "Natural Gas",
        hasVideo: false,
      },
      {
        title: "Energy infrastructure companies announce dividend increases",
        time: "2 days ago",
        category: "Infrastructure",
        hasVideo: true,
      },
    ],
  }

  // Default to technology if the sector is not found
  const news = newsItems[sector as keyof typeof newsItems] || newsItems.technology

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
