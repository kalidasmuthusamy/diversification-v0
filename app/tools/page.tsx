import { cn } from "@/lib/utils"
import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Globe, Calculator, PieChart, Layers } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Investment Tools & Insights</h1>
          <p className="text-muted-foreground">Powerful tools to help you make informed investment decisions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ToolCard
          title="Diversification Score Calculator"
          description="Calculate how well your portfolio is diversified across asset classes, sectors, and risk factors."
          icon={<Calculator className="h-8 w-8 text-primary" />}
          href="/diversification"
          featured={true}
        />

        <ToolCard
          title="Stock Screener"
          description="Filter stocks by performance, fundamentals, technical indicators, and more."
          icon={<Search className="h-8 w-8 text-primary" />}
          href="/tools/stock-screener"
        />

        <ToolCard
          title="Fund Screener"
          description="Find ETFs and mutual funds that match your investment criteria and goals."
          icon={<Layers className="h-8 w-8 text-primary" />}
          href="/tools/fund-screener"
        />

        <ToolCard
          title="Market Anomalies"
          description="Discover unusual market movements and potential investment opportunities."
          icon={<AlertTriangle className="h-8 w-8 text-primary" />}
          href="/tools/market-anomalies"
        />

        <ToolCard
          title="Macro Insights"
          description="Analyze economic indicators and their potential impact on your investments."
          icon={<Globe className="h-8 w-8 text-primary" />}
          href="/tools/macro-insights"
        />

        <ToolCard
          title="Portfolio Optimizer"
          description="Visualize the efficient frontier and optimize your portfolio for maximum returns at your desired risk level."
          icon={<PieChart className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/signup"
          featured={true}
        />
      </div>
    </div>
  )
}

function ToolCard({
  title,
  description,
  icon,
  href,
  featured = false,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  featured?: boolean
}) {
  return (
    <Card
      className={cn("overflow-hidden transition-all hover:shadow-md", featured ? "border-primary/50 bg-primary/5" : "")}
    >
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          <Button asChild className={featured ? "bg-primary" : ""}>
            <Link href={href}>Launch Tool</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function InsightCard({
  title,
  description,
  category,
  date,
  icon,
}: {
  title: string
  description: string
  category: string
  date: string
  icon: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-sm font-medium">{category}</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Button variant="link" className="p-0 h-auto">
            Read Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
