import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LatestNews() {
  const newsItems = [
    {
      time: "11 MIN AGO",
      title: "Here's how the SALT deduction could change amid Trump's tax cuts debate",
      category: "POLITICS",
    },
    {
      time: "35 MIN AGO",
      title: "JPMorgan cuts Tesla price target, sees stock getting slashed in half",
      category: "STOCKS",
      isPro: true,
    },
    {
      time: "40 MIN AGO",
      title: "Shares of iRobot tank 30% after Roomba maker raises doubt about its survival",
      category: "BUSINESS",
    },
    {
      time: "50 MIN AGO",
      title: "Diversification score of average investor drops to 65, study finds",
      category: "DIVERSIFICATION",
      highlight: true,
    },
    {
      time: "1 HOUR AGO",
      title: "Oil prices surge amid Middle East tensions",
      category: "COMMODITIES",
    },
    {
      time: "1 HOUR AGO",
      title: "Retail sales exceed expectations, boosting economic outlook",
      category: "ECONOMY",
    },
    {
      time: "2 HOURS AGO",
      title: "Alternative assets gain popularity among retail investors",
      category: "INVESTING",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg">LATEST NEWS</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {newsItems.map((item, index) => (
            <div key={index} className="p-3 border-b last:border-b-0 hover:bg-muted/30 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{item.time}</span>
                {item.isPro && <Badge className="text-[10px] py-0 h-4 bg-green-600">PRO</Badge>}
              </div>
              <h3 className={`text-sm font-medium line-clamp-2 ${item.highlight ? "text-primary" : ""}`}>
                {item.title}
              </h3>
              <Badge
                variant="outline"
                className={`mt-1 text-[10px] ${item.highlight ? "border-primary text-primary" : ""}`}
              >
                {item.category}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
