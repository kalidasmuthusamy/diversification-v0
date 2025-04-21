import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, BarChart3, TrendingUp, Briefcase } from "lucide-react"

export default function PortfolioStrategies() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          <CardTitle>Portfolio Strategies</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StrategyCard
            title="60/40 Portfolio"
            description="The traditional mix of 60% stocks and 40% bonds for balanced growth and income"
            diversificationScore={68}
            riskLevel="Medium"
            returnPotential="Moderate"
            icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          />

          <StrategyCard
            title="All-Weather Portfolio"
            description="Ray Dalio's strategy designed to perform in any economic environment"
            diversificationScore={85}
            riskLevel="Low-Medium"
            returnPotential="Moderate"
            icon={<Shield className="h-5 w-5 text-green-500" />}
            highlight={true}
          />

          <StrategyCard
            title="Growth Portfolio"
            description="Focused on capital appreciation with higher allocation to equities"
            diversificationScore={52}
            riskLevel="High"
            returnPotential="High"
            icon={<TrendingUp className="h-5 w-5 text-red-500" />}
          />
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">
            Explore All Portfolio Strategies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function StrategyCard({
  title,
  description,
  diversificationScore,
  riskLevel,
  returnPotential,
  icon,
  highlight = false,
}: {
  title: string
  description: string
  diversificationScore: number
  riskLevel: string
  returnPotential: string
  icon: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div className={`bg-card rounded-lg overflow-hidden border shadow-sm ${highlight ? "border-primary" : ""}`}>
      {highlight && (
        <div className="bg-primary py-1 px-3">
          <span className="text-xs font-medium text-primary-foreground">RECOMMENDED</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
          <h3 className="font-medium">{title}</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Diversification Score</span>
            <Badge
              className={`${diversificationScore >= 80 ? "bg-green-500" : diversificationScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
            >
              {diversificationScore}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Risk Level</span>
            <span className="text-sm font-medium">{riskLevel}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Return Potential</span>
            <span className="text-sm font-medium">{returnPotential}</span>
          </div>
        </div>

        <Button variant="link" className="p-0 h-auto text-sm mt-3">
          Learn more
        </Button>
      </div>
    </div>
  )
}
