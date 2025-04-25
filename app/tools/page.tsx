import { cn } from "@/lib/utils"
import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Globe, Calculator, PieChart, Layers, ExternalLink } from "lucide-react"
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
          isExternal={false}
        />

        <ToolCard
          title="Stock Screener"
          description="Filter stocks by performance, fundamentals, technical indicators, and more."
          icon={<Search className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/tools/stock-screener"
          isExternal={true}
        />

        <ToolCard
          title="Fund Screener"
          description="Find ETFs and mutual funds that match your investment criteria and goals."
          icon={<Layers className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/tools/fund-screener"
          isExternal={true}
        />

        <ToolCard
          title="Market Anomalies"
          description="Discover unusual market movements and potential investment opportunities."
          icon={<AlertTriangle className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/tools/market-anomalies"
          isExternal={true}
        />

        <ToolCard
          title="Macro Insights"
          description="Analyze economic indicators and their potential impact on your investments."
          icon={<Globe className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/tools/macro-insights"
          isExternal={true}
        />

        <ToolCard
          title="Portfolio Optimizer"
          description="Visualize the efficient frontier and optimize your portfolio for maximum returns at your desired risk level."
          icon={<PieChart className="h-8 w-8 text-primary" />}
          href="https://portfoliopilot.com/tools/optimizer"
          featured={true}
          isExternal={true}
        />
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Tools marked with <ExternalLink className="h-3 w-3 inline mx-1" /> are provided by PortfolioPilot, our premium
          investment platform.
        </p>
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
  isExternal = false,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  featured?: boolean
  isExternal?: boolean
}) {
  return (
    <Card
      className={cn("overflow-hidden transition-all hover:shadow-md", featured ? "border-primary/50 bg-primary/5" : "")}
    >
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            {title}
            {isExternal && (
              <span className="text-xs font-normal text-muted-foreground flex items-center">
                <ExternalLink className="h-3 w-3 mr-1" />
                PortfolioPilot
              </span>
            )}
          </h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          <Button asChild className={featured ? "bg-primary" : ""}>
            <Link href={href} target={isExternal ? "_blank" : undefined} className="flex items-center gap-2">
              Launch Tool
              {isExternal && <ExternalLink className="h-4 w-4" />}
            </Link>
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
