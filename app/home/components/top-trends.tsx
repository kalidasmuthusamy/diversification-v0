import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function TopTrends() {
  // Mock trends data
  const topTrends = [
    {
      id: 1,
      name: "AI and Automation",
      description: "Artificial intelligence and automation transforming industries",
      strength: "Very Strong",
    },
    {
      id: 2,
      name: "Digital Transformation",
      description: "Businesses accelerating digital adoption across operations",
      strength: "Strong",
    },
    {
      id: 3,
      name: "Energy Transition",
      description: "Shift from fossil fuels to renewable energy sources",
      strength: "Strong",
    },
    {
      id: 4,
      name: "Remote Work Revolution",
      description: "Permanent shift to flexible and hybrid work arrangements",
      strength: "Strong",
    },
    {
      id: 5,
      name: "Supply Chain Restructuring",
      description: "Companies diversifying suppliers and reshoring production",
      strength: "Medium",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Top Macro Trends
          </CardTitle>
          <Link href="/trends" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {topTrends.map((trend) => (
            <Link
              key={trend.id}
              href={`/trends/${trend.id}`}
              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {trend.id}. {trend.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{trend.description}</p>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-medium mr-2">{trend.strength}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
