import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, TrendingUp, AlertTriangle, DollarSign, BarChart3, Lightbulb } from "lucide-react"
import Link from "next/link"

export function TodaysTopFive() {
  const topFiveItems = [
    {
      title: "Fed signals potential rate cut in September",
      category: "Macro",
      impact: "High",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Tech earnings beat expectations across the board",
      category: "Equities",
      impact: "High",
      icon: <BarChart3 className="h-4 w-4" />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Oil prices surge amid Middle East tensions",
      category: "Commodities",
      impact: "Medium",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: "Bitcoin breaks $70k resistance level",
      category: "Crypto",
      impact: "Medium",
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Diversification opportunity: Art market showing low correlation",
      category: "Alternatives",
      impact: "Low",
      icon: <Lightbulb className="h-4 w-4" />,
      color: "bg-indigo-100 text-indigo-800",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Today's Top 5</CardTitle>
          <Badge variant="outline" className="font-normal">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-3">
          {topFiveItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 group">
              <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <Link href="/top-stories" className="group-hover:text-primary group-hover:underline">
                  <p className="font-medium">{item.title}</p>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-normal">
                    {item.impact} Impact
                  </Badge>
                </div>
              </div>
              <Link href="/top-stories" className="flex-shrink-0">
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Link href="/top-stories" className="text-sm text-primary hover:underline inline-flex items-center">
            View detailed analysis for long-term investors
            <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
