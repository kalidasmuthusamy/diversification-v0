"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function TrendsList() {
  const [timeframe, setTimeframe] = useState("current")

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
        <div className="text-sm text-muted-foreground">Ranked by current strength, impact, and momentum</div>
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
          <Link
            key={trend.id}
            href={`/trends/${trend.id}`}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
          >
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
        ))}
      </div>
    </div>
  )
}
