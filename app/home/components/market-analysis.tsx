import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Share2, ExternalLink } from "lucide-react"

export default function MarketAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Market news across all asset classes</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-primary" size="sm">
            Trending
          </Button>
          <Button variant="ghost" size="sm">
            Stocks
          </Button>
          <Button variant="ghost" size="sm">
            Bonds
          </Button>
          <Button variant="ghost" size="sm">
            Alts
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="relative h-48 md:h-64">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Diversification Strategies for Uncertain Markets"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
              <span className="text-xs text-white/70 uppercase tracking-wider mb-1">Strategy</span>
              <h3 className="text-xl font-bold text-white mb-2">Diversification Strategies for Uncertain Markets</h3>
              <p className="text-white/80 text-sm">
                As market volatility increases, experts recommend these diversification approaches
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-xs text-white/80">
                  <Clock className="h-3 w-3 mr-1" />2 hours ago • <span className="ml-1 font-medium">CNBC</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <NewsCard
            image="/placeholder.svg?height=200&width=300"
            title="Alternative Assets Gain Popularity Among Retail Investors"
            time="4 hours ago"
            category="Alternatives"
            source="Wall Street Journal"
          />

          <NewsCard
            image="/placeholder.svg?height=200&width=300"
            title="Bond Market Signals Recession Concerns as Yield Curve Inverts"
            time="6 hours ago"
            category="Bonds"
            source="Bloomberg"
          />

          <NewsCard
            image="/placeholder.svg?height=200&width=300"
            title="Global Real Estate: Diversification Beyond Borders"
            time="8 hours ago"
            category="Real Estate"
            source="Financial Times"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SmallNewsCard
          title="Commodities as an Inflation Hedge: What Investors Should Know"
          time="10 hours ago"
          category="Commodities"
          source="Business Insider"
        />

        <SmallNewsCard
          title="The Role of Cryptocurrency in a Diversified Portfolio"
          time="12 hours ago"
          category="Crypto"
          source="CoinDesk"
        />

        <SmallNewsCard
          title="ESG Investing: Balancing Values and Diversification"
          time="14 hours ago"
          category="ESG"
          source="Morningstar"
        />
      </div>
    </div>
  )
}

function NewsCard({
  image,
  title,
  time,
  category,
  source,
}: {
  image: string
  title: string
  time: string
  category: string
  source: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1/3">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="w-2/3 p-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
          <h3 className="font-medium mt-1 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {time} • <span className="ml-1 font-medium">{source}</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function SmallNewsCard({
  title,
  time,
  category,
  source,
}: {
  title: string
  time: string
  category: string
  source: string
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
        <h3 className="font-medium mt-1 mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {time} • <span className="ml-1 font-medium">{source}</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
