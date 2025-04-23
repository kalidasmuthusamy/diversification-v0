"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, TrendingDown, Info, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TrendsList() {
  const [timeframe, setTimeframe] = useState("current")
  const [infoOpen, setInfoOpen] = useState(false)

  // Mock trends data
  const trendsData = [
    {
      id: 1,
      name: "AI and Automation",
      description: "Artificial intelligence and automation transforming industries and labor markets",
      strength: "Very Strong",
      direction: "up",
      impact: "High",
    },
    {
      id: 2,
      name: "Digital Transformation",
      description: "Businesses accelerating digital adoption across operations and customer experiences",
      strength: "Strong",
      direction: "up",
      impact: "High",
    },
    {
      id: 3,
      name: "Energy Transition",
      description: "Shift from fossil fuels to renewable energy sources and technologies",
      strength: "Strong",
      direction: "up",
      impact: "High",
    },
    {
      id: 4,
      name: "Remote Work Revolution",
      description: "Permanent shift to flexible and hybrid work arrangements",
      strength: "Strong",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 5,
      name: "Supply Chain Restructuring",
      description: "Companies diversifying suppliers and reshoring critical production",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 6,
      name: "Aging Demographics",
      description: "Growing elderly populations in developed economies affecting labor and healthcare",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 7,
      name: "Cybersecurity Imperative",
      description: "Increasing focus on digital security amid rising threats",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 8,
      name: "Healthcare Innovation",
      description: "Accelerated medical advances in genomics, telemedicine, and personalized care",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 9,
      name: "Deglobalization Pressures",
      description: "Increasing economic nationalism and regional trade blocs",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
    {
      id: 10,
      name: "Sustainable Investing",
      description: "Growing focus on ESG factors in investment decisions",
      strength: "Medium",
      direction: "up",
      impact: "Medium",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Ranked by current strength, impact, and momentum</span>
          <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 px-2 ml-2">
                <Info className="h-4 w-4 mr-1" />
                About Macro Trends
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Macro Trends</DialogTitle>
                <DialogDescription>
                  Understanding how we analyze and classify economic and market trends
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-medium">Trend Strength Classifications:</h4>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium min-w-[90px]">Very Strong:</span>
                      <span>Rapidly accelerating adoption with significant economic impact</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium min-w-[90px]">Strong:</span>
                      <span>Well-established trend with continued growth momentum</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium min-w-[90px]">Medium:</span>
                      <span>Moderate but steady adoption with observable impacts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium min-w-[90px]">Weak:</span>
                      <span>Emerging or declining trend with limited current impact</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Our Methodology:</h4>
                  <p className="mt-2 text-sm">
                    Trends are evaluated using a proprietary model analyzing data from multiple sources including
                    industry reports, market data, patent filings, and sentiment analysis of news and research
                    publications.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Investment Implications:</h4>
                  <p className="mt-2 text-sm">
                    Understanding macro trends can help investors identify emerging opportunities and potential risks
                    across various sectors and asset classes. Our trend analysis considers both short-term market
                    movements and long-term structural changes in the economy.
                  </p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md text-xs text-muted-foreground">
                  Updated monthly. This classification system is for informational purposes only and should not be
                  considered investment advice.
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "current" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("current")}
          >
            Current
          </Button>
          <Button
            variant={timeframe === "emerging" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("emerging")}
          >
            Emerging
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {trendsData.map((trend) => (
          <div
            key={trend.id}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
          >
            <Link href={`/trends/${trend.id}`} className="flex items-start gap-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
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
                <p className="text-sm text-muted-foreground">{trend.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-sm font-medium">{trend.strength}</span>
                <span className="text-xs text-muted-foreground">{trend.impact} Impact</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </Link>
            <div className="border-t mt-2 pt-2 w-full">
              <Link
                href={`/trends/${trend.id}/news`}
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                Read latest news <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
