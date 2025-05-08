import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function EducationSection() {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Get smarter about diversification</h2>
        </div>
        <Link href="/education" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ArticleCard
          image="/building-financial-future.png"
          title="The Importance of Asset Allocation"
          description="Learn why asset allocation is the most important decision for your portfolio's performance."
          category="Fundamentals"
          readTime="5 min read"
        />

        <ArticleCard
          image="/diverse-alternative-investments.png"
          title="Beyond Stocks and Bonds"
          description="Discover alternative asset classes that can enhance your portfolio's diversification."
          category="Alternative Assets"
          readTime="7 min read"
        />

        <ArticleCard
          image="/balanced-growth-path.png"
          title="Rebalancing Strategies"
          description="How and when to rebalance your portfolio to maintain optimal diversification."
          category="Portfolio Management"
          readTime="6 min read"
        />
      </div>
    </div>
  )
}

function ArticleCard({
  image,
  title,
  description,
  category,
  readTime,
}: {
  image: string
  title: string
  description: string
  category: string
  readTime: string
}) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
      <div className="h-40 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <Badge className="mb-2">{category}</Badge>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{readTime}</span>
          <Button variant="link" className="p-0 h-auto text-sm text-blue-500 hover:text-blue-700">
            Read more
          </Button>
        </div>
      </div>
    </div>
  )
}
