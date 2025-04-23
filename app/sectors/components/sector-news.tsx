import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface SectorNewsProps {
  sector: string
}

export default function SectorNews({ sector }: SectorNewsProps) {
  // Mock news data - in a real app, this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "AI chip demand continues to drive semiconductor sector growth",
      source: "Tech Insider",
      time: "3 hours ago",
      category: "Semiconductors",
      url: "/news/ai-chip-demand",
    },
    {
      id: 2,
      title: "Cloud computing revenues exceed expectations in Q2 earnings reports",
      source: "Business Tech",
      time: "6 hours ago",
      category: "Cloud Services",
      url: "/news/cloud-computing-revenues",
    },
    {
      id: 3,
      title: "Cybersecurity spending increases amid rising global threats",
      source: "Security Today",
      time: "10 hours ago",
      category: "Cybersecurity",
      url: "/news/cybersecurity-spending",
    },
    {
      id: 4,
      title: "Tech layoffs slow as industry stabilizes after post-pandemic adjustment",
      source: "Workforce Report",
      time: "1 day ago",
      category: "Employment",
      url: "/news/tech-layoffs-slow",
    },
    {
      id: 5,
      title: "Software-as-a-Service valuations recover as interest rate concerns ease",
      source: "Investor Daily",
      time: "1 day ago",
      category: "SaaS",
      url: "/news/saas-valuations-recover",
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
