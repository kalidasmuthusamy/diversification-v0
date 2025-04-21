"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default function MarketNews() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeaturedNewsCard
          id="news-1"
          image="/placeholder.svg?height=400&width=600"
          title="Diversification Strategies for Uncertain Markets"
          description="As market volatility increases, experts recommend these diversification approaches to protect your portfolio."
          time="6:24pm"
          category="Strategy"
        />

        <div className="space-y-4">
          <NewsCard
            id="news-2"
            image="/placeholder.svg?height=200&width=300"
            title="Alternative Assets Gain Popularity Among Retail Investors"
            time="6:45am"
            category="Alternatives"
          />

          <NewsCard
            id="news-3"
            image="/placeholder.svg?height=200&width=300"
            title="Bond Market Signals Recession Concerns as Yield Curve Inverts"
            time="6:12am"
            category="Bonds"
          />

          <NewsCard
            id="news-4"
            image="/placeholder.svg?height=200&width=300"
            title="Global Real Estate: Diversification Beyond Borders"
            time="5:30am"
            category="Real Estate"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SmallNewsCard
          id="news-5"
          title="Commodities as an Inflation Hedge: What Investors Should Know"
          time="4:15am"
          category="Commodities"
        />

        <SmallNewsCard
          id="news-6"
          title="The Role of Cryptocurrency in a Diversified Portfolio"
          time="2:30am"
          category="Crypto"
        />

        <SmallNewsCard
          id="news-7"
          title="ESG Investing: Balancing Values and Diversification"
          time="1:45am"
          category="ESG"
        />
      </div>
    </div>
  )
}

function FeaturedNewsCard({
  id,
  image,
  title,
  description,
  time,
  category,
}: {
  id: string
  image: string
  title: string
  description: string
  time: string
  category: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 md:h-64">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-3 left-3">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {time}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NewsCard({
  id,
  image,
  title,
  time,
  category,
}: {
  id: string
  image: string
  title: string
  time: string
  category: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1/3">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="w-2/3 p-3">
          <Badge className="mb-2">{category}</Badge>
          <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {time}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function SmallNewsCard({
  id,
  title,
  time,
  category,
}: {
  id: string
  title: string
  time: string
  category: string
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <Badge className="mb-2">{category}</Badge>
        <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {time}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
