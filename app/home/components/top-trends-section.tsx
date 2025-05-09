import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export function TopTrendsSection() {
  // Mock trends data
  const trendsData = [
    {
      id: 1,
      name: "AI and Automation",
      direction: "up",
      impact: "High",
    },
    {
      id: 2,
      name: "Digital Transformation",
      direction: "up",
      impact: "High",
    },
    {
      id: 3,
      name: "Energy Transition",
      direction: "up",
      impact: "High",
    },
    {
      id: 4,
      name: "Remote Work Revolution",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 5,
      name: "Supply Chain Restructuring",
      direction: "up",
      impact: "Medium",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          <h2 className="text-2xl font-bold">Top Trends</h2>
        </div>
        <Link href="/trends">
          <Button variant="outline" size="sm">
            View All Trends
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {trendsData.slice(0, 5).map((trend) => (
          <Link
            key={trend.id}
            href={`/trends/${trend.id}`}
            className="flex items-center gap-3 py-2 px-3 rounded-lg border hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary flex-shrink-0">
              {trend.id}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{trend.name}</h3>
                {trend.direction === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="text-xs px-2 py-1 rounded-full bg-muted">{trend.impact} Impact</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
