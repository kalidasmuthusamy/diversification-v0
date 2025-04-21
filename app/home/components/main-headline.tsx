import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MainHeadline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Market volatility increases as investors seek diversification"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <Badge className="w-fit mb-2 bg-primary">MARKETS</Badge>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              Market volatility increases as investors seek diversification
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Investors are increasingly turning to diversified portfolios as market uncertainty grows
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="flex h-32">
            <div className="w-1/3">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Fed signals potential rate cuts"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="w-2/3 p-4">
              <Badge className="mb-2">ECONOMY</Badge>
              <h2 className="text-lg font-bold mb-1">Fed signals potential rate cuts as inflation cools</h2>
              <p className="text-sm text-muted-foreground">
                Federal Reserve officials indicated they could begin lowering interest rates in the coming months
              </p>
            </CardContent>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex h-32">
            <div className="w-1/3">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Tech stocks rally"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="w-2/3 p-4">
              <Badge className="mb-2">STOCKS</Badge>
              <h2 className="text-lg font-bold mb-1">Tech stocks rally on strong earnings reports</h2>
              <p className="text-sm text-muted-foreground">
                Major tech companies exceed analyst expectations, driving market gains
              </p>
            </CardContent>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex h-32">
            <div className="w-1/3">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Diversification strategies"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="w-2/3 p-4">
              <Badge className="mb-2 bg-primary">DIVERSIFICATION</Badge>
              <h2 className="text-lg font-bold mb-1">Top diversification strategies for uncertain markets</h2>
              <p className="text-sm text-muted-foreground">
                Experts recommend these approaches to protect your portfolio
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
