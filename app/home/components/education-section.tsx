import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function EducationSection() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CardTitle></CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArticleCard
            image="/placeholder.svg?height=200&width=300"
            title="The Importance of Asset Allocation"
            description="Learn why asset allocation is the most important decision for your portfolio's performance."
            category="Fundamentals"
            readTime="5 min read"
          />

          <ArticleCard
            image="/placeholder.svg?height=200&width=300"
            title="Beyond Stocks and Bonds"
            description="Discover alternative asset classes that can enhance your portfolio's diversification."
            category="Alternative Assets"
            readTime="7 min read"
          />

          <ArticleCard
            image="/placeholder.svg?height=200&width=300"
            title="Rebalancing Strategies"
            description="How and when to rebalance your portfolio to maintain optimal diversification."
            category="Portfolio Management"
            readTime="6 min read"
          />
        </div>
      </CardContent>
    </Card>
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
          <Button variant="link" className="p-0 h-auto text-sm">
            Read more
          </Button>
        </div>
      </div>
    </div>
  )
}
