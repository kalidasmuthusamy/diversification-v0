import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
      image: "/placeholder.svg?height=100&width=100&query=semiconductor%20chips",
    },
    {
      id: 2,
      title: "Cloud computing revenues exceed expectations in Q2 earnings reports",
      source: "Business Tech",
      time: "6 hours ago",
      category: "Cloud Services",
      url: "/news/cloud-computing-revenues",
      image: "/placeholder.svg?height=100&width=100&query=cloud%20computing",
    },
    {
      id: 3,
      title: "Cybersecurity spending increases amid rising global threats",
      source: "Security Today",
      time: "10 hours ago",
      category: "Cybersecurity",
      url: "/news/cybersecurity-spending",
      image: "/placeholder.svg?height=100&width=100&query=cybersecurity",
    },
    {
      id: 4,
      title: "Tech layoffs slow as industry stabilizes after post-pandemic adjustment",
      source: "Workforce Report",
      time: "1 day ago",
      category: "Employment",
      url: "/news/tech-layoffs-slow",
      image: "/placeholder.svg?height=100&width=100&query=tech%20industry",
    },
    {
      id: 5,
      title: "Software-as-a-Service valuations recover as interest rate concerns ease",
      source: "Investor Daily",
      time: "1 day ago",
      category: "SaaS",
      url: "/news/saas-valuations-recover",
      image: "/placeholder.svg?height=100&width=100&query=software%20service",
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
