import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TrendNews() {
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Tech Giants Announce Major AI Investments",
      source: "Financial Times",
      date: "2 hours ago",
      category: "Technology",
      excerpt:
        "Leading technology companies have announced billions in new AI research and development initiatives, signaling continued acceleration of the AI trend.",
      url: "/news/tech-giants-ai-investments",
      image: "/placeholder.svg?height=100&width=100&query=artificial%20intelligence",
    },
    {
      id: 2,
      title: "AI Adoption Accelerating Across Healthcare Sector",
      source: "Healthcare Daily",
      date: "5 hours ago",
      category: "Healthcare",
      excerpt:
        "Healthcare providers are increasingly implementing AI solutions for diagnostics, patient care, and administrative functions, according to a new industry survey.",
      url: "/news/ai-healthcare-adoption",
      image: "/placeholder.svg?height=100&width=100&query=healthcare%20technology",
    },
    {
      id: 3,
      title: "Manufacturing Sector Embraces Automation Amid Labor Challenges",
      source: "Industry Week",
      date: "1 day ago",
      category: "Manufacturing",
      excerpt:
        "Manufacturing companies are accelerating automation investments as they continue to face labor shortages and rising wage pressures.",
      url: "/news/manufacturing-automation",
      image: "/placeholder.svg?height=100&width=100&query=factory%20automation",
    },
    {
      id: 4,
      title: "AI Regulation Framework Proposed by International Coalition",
      source: "Policy Review",
      date: "2 days ago",
      category: "Regulation",
      excerpt:
        "A coalition of countries has proposed a new framework for AI regulation, aiming to balance innovation with ethical considerations and safety.",
      url: "/news/ai-regulation-framework",
      image: "/placeholder.svg?height=100&width=100&query=policy%20regulation",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Latest News on AI and Automation</CardTitle>
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
                    <span>{item.date}</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">{item.source}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
