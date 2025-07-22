import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart2,
  Clock,
  Play,
  Globe,
  Building,
  DollarSign,
  Lock,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import securitiesData from "@/app/data/securities.json"

type RelatedSecurity = {
  symbol: string
  name: string
  price: string
  ytdChangePercent: string
}

type SectorBreakdown = {
  sector: string
  percentage: string
}

type CountryBreakdown = {
  country: string
  percentage: string
}

type TopHolding = {
  symbol: string
  name: string
  percentage: string
}

type SecurityData = {
  symbol: string
  name: string
  company: string
  price: string
  ytdChange: string
  ytdChangePercent: string
  isYtdPositive: boolean
  marketCap: string
  volume: string
  avgVolume: string
  peRatio: string
  dividend: string
  nextDividendDate: string
  nextEarningsDate: string
  yearRange: string
  sector: string
  exchange: string
  country: string
  currency: string
  employees: string
  founded: number
  headquarters: string
  description: string
  correlationToMarket: string
  volatility: string
  securityType: string
  expenseRatio?: string
  aum?: string
  maxSupply?: string
  circulatingSupply?: string
  investingStrategy?: boolean
  isDiversified?: boolean
  assetClass?: string
  macroFactors: {
    interestRates: string
    inflation: string
    gdpGrowth: string
    dollarStrength: string
    commodityPrices: string
    liquidity?: string
    credit?: string
  }
  sectorBreakdown?: SectorBreakdown[]
  countryBreakdown?: CountryBreakdown[]
  topHoldings?: TopHolding[]
  relatedSecurities: RelatedSecurity[]
}

function getSecurityData(symbol: string): SecurityData | null {
  const upperSymbol = symbol.toUpperCase()
  return (securitiesData as Record<string, SecurityData>)[upperSymbol] || null
}

export async function generateMetadata({ params }: { params: { symbol: string } }): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase()
  const data = getSecurityData(symbol)

  if (!data) {
    return {
      title: "Security Not Found",
      description: "The requested security could not be found.",
    }
  }

  const securityTypeText =
    data.securityType === "ETF" ? "ETF" : data.securityType === "Cryptocurrency" ? "Crypto" : "Stock"

  return {
    title: `${data.symbol} ${securityTypeText} Price, Analysis & Market Data | ${data.name}`,
    description: `Get the latest ${data.symbol} ${securityTypeText.toLowerCase()} price, comprehensive analysis, market correlation, and investment insights. Track ${data.name} performance, news, and market data.`,
    keywords: `${data.symbol}, ${data.name}, ${securityTypeText.toLowerCase()} price, ${securityTypeText.toLowerCase()} analysis, market correlation, ${data.sector}, ${data.exchange}, ${data.country} investments, investment analysis`,
    openGraph: {
      title: `${data.symbol} - ${data.name} ${securityTypeText} Analysis`,
      description: `Current price: ${data.price} (${data.ytdChangePercent} YTD). Get comprehensive analysis and market insights for ${data.symbol}.`,
      type: "website",
    },
    alternates: {
      canonical: `/explore/${symbol.toLowerCase()}`,
    },
  }
}

export default function SecurityPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase()
  const stockData = getSecurityData(symbol)

  if (!stockData) {
    notFound()
  }

  const news = [
    {
      title: `${stockData.symbol} reports ${stockData.isYtdPositive ? "strong" : "mixed"} ${stockData.securityType === "Cryptocurrency" ? "network activity" : "quarterly earnings"}`,
      time: "2 hours ago",
      hasVideo: true,
    },
    {
      title: `Market analysis: ${stockData.symbol} ${stockData.securityType === "Cryptocurrency" ? "adoption trends" : "sector outlook"}`,
      time: "5 hours ago",
      hasVideo: false,
    },
    {
      title: `${stockData.sector} ${stockData.securityType === "Cryptocurrency" ? "regulatory updates" : "sector outlook"}: What it means for ${stockData.symbol}`,
      time: "1 day ago",
      hasVideo: true,
    },
    {
      title: `${stockData.country} market update: ${stockData.symbol} in focus`,
      time: "1 day ago",
      hasVideo: false,
    },
  ]

  const getSecuritySpecificMetrics = () => {
    switch (stockData.securityType) {
      case "ETF":
        return (
          <>
            <div>
              <div className="text-xs text-muted-foreground">Expense Ratio</div>
              <div className="font-medium">{stockData.expenseRatio || "N/A"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">AUM</div>
              <div className="font-medium">{stockData.aum || "N/A"}</div>
            </div>
          </>
        )
      case "Cryptocurrency":
        return (
          <>
            <div>
              <div className="text-xs text-muted-foreground">Max Supply</div>
              <div className="font-medium">{stockData.maxSupply || "N/A"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Circulating Supply</div>
              <div className="font-medium">{stockData.circulatingSupply || "N/A"}</div>
            </div>
          </>
        )
      default:
        return (
          <>
            <div>
              <div className="text-xs text-muted-foreground">P/E Ratio</div>
              <div className="font-medium">{stockData.peRatio}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Employees</div>
              <div className="font-medium">{stockData.employees}</div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="container py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground">
              Markets
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link
              href={`/sectors/${stockData.sector.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {stockData.sector}
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">{stockData.symbol}</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{stockData.symbol}</h1>
            <Badge variant="outline" className="text-sm">
              {stockData.securityType}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {stockData.exchange}
            </Badge>
          </div>
          <p className="text-muted-foreground">{stockData.name}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {stockData.country}
            </div>
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {stockData.sector}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {stockData.currency}
            </div>
          </div>
        </div>
        {/* Price section - hidden on mobile */}
        <div className="hidden md:flex flex-col items-end">
          <div className="text-2xl md:text-3xl font-bold">{stockData.price}</div>
          <div className={`flex items-center ${stockData.isYtdPositive ? "text-green-600" : "text-red-600"}`}>
            {stockData.isYtdPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="font-medium">{stockData.ytdChangePercent} YTD</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mb-6">
        <div className="flex bg-muted/30 rounded-md p-1 overflow-x-auto">
          <a href="#overview" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Overview
          </a>
          <a href="#news" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            News
          </a>
          <a
            href="#diversification"
            className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors"
          >
            Risk & Correlation
          </a>
          <a href="#forecasts" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Forecasts
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Price Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted/30 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive price chart for {stockData.symbol}</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex bg-muted/30 rounded-md p-1">
                  {["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"].map((period) => (
                    <Button key={period} variant={period === "1M" ? "default" : "ghost"} size="sm" className="text-xs">
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Section */}
          <section id="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">About {stockData.symbol}</h3>
                <p className="text-sm text-muted-foreground mb-4">{stockData.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground">Market Cap</div>
                    <div className="font-medium">{stockData.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                    <div className="font-medium">{stockData.volume}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Dividend Yield</div>
                    <div className="font-medium">{stockData.dividend}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">52-Week Range</div>
                    <div className="font-medium">{stockData.yearRange}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg. Volume (30 day)</div>
                    <div className="font-medium">{stockData.avgVolume}</div>
                  </div>
                  {getSecuritySpecificMetrics()}
                </div>

                {/* ETF Holdings Breakdown */}
                {stockData.securityType === "ETF" && stockData.topHoldings && (
                  <div className="border-t pt-4 mb-6">
                    <h4 className="font-medium mb-3">Top Holdings</h4>
                    <div className="space-y-2">
                      {stockData.topHoldings.slice(0, 5).map((holding, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{holding.symbol}</span>
                            <span className="text-sm text-muted-foreground ml-2">{holding.name}</span>
                          </div>
                          <span className="font-medium">{holding.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETF Sector Breakdown */}
                {stockData.securityType === "ETF" && stockData.sectorBreakdown && (
                  <div className="border-t pt-4 mb-6">
                    <h4 className="font-medium mb-3">Sector Allocation</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {stockData.sectorBreakdown.slice(0, 6).map((sector, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{sector.sector}</span>
                          <span className="font-medium">{sector.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETF Country Breakdown */}
                {stockData.securityType === "ETF" && stockData.countryBreakdown && (
                  <div className="border-t pt-4 mb-6">
                    <h4 className="font-medium mb-3">Country Allocation</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {stockData.countryBreakdown.slice(0, 6).map((country, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{country.country}</span>
                          <span className="font-medium">{country.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Updated Fund Information section for ETFs */}
                {stockData.securityType === "ETF" && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Fund Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Investing Strategy</div>
                        <div className="font-medium">{stockData.investingStrategy || "Passive"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Exchange</div>
                        <div className="font-medium">{stockData.exchange}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Diversified</div>
                        <div className="font-medium">
                          {stockData.isDiversified !== undefined ? (stockData.isDiversified ? "Yes" : "No") : "Yes"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Asset Class</div>
                        <div className="font-medium">{stockData.assetClass || stockData.sector}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Company Information section for Stocks */}
                {stockData.securityType === "Stock" && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Company Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Founded</div>
                        <div className="font-medium">{stockData.founded}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Headquarters</div>
                        <div className="font-medium">{stockData.headquarters}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Exchange</div>
                        <div className="font-medium">{stockData.exchange}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Sector</div>
                        <div className="font-medium">{stockData.sector}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Currency</div>
                        <div className="font-medium">{stockData.currency}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* News Section */}
          <section id="news">
            <Card>
              <CardHeader>
                <CardTitle>Latest News for {stockData.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="font-medium">{item.title}</h3>
                        {item.hasVideo && (
                          <div className="flex-shrink-0 bg-primary/10 rounded-full p-1">
                            <Play className="h-4 w-4 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Risk & Correlation Section */}
          <section id="diversification">
            <Card>
              <CardHeader>
                <CardTitle>Risk & Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Market Correlation</div>
                    <div className="text-2xl font-bold">{stockData.correlationToMarket}</div>
                    <div className="text-sm text-muted-foreground">
                      {Number.parseFloat(stockData.correlationToMarket) >= 0.8
                        ? "Highly correlated"
                        : Number.parseFloat(stockData.correlationToMarket) >= 0.5
                          ? "Moderately correlated"
                          : "Low correlation"}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                    <div className="text-2xl font-bold">{stockData.volatility}</div>
                    <div className="text-sm text-muted-foreground">Relative to market</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Macro Factor Sensitivities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interest Rates</span>
                      <Badge variant="outline">{stockData.macroFactors.interestRates}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inflation</span>
                      <Badge variant="outline">{stockData.macroFactors.inflation}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GDP Growth</span>
                      <Badge variant="outline">{stockData.macroFactors.gdpGrowth}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Liquidity</span>
                      <Badge variant="outline">
                        {stockData.macroFactors.liquidity || stockData.macroFactors.dollarStrength}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit</span>
                      <Badge variant="outline">{stockData.macroFactors.credit || "Moderate"}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Commodity Prices</span>
                      <Badge variant="outline">{stockData.macroFactors.commodityPrices}</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Portfolio Impact</span>
                  </div>
                  <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                    Analyze {stockData.symbol} in Your Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Forecasts Section */}
          <section id="forecasts">
            <Card>
              <CardHeader>
                <CardTitle>Forecasts & Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10 flex items-center justify-center">
                    <div className="text-center bg-background/90 p-6 rounded-lg border">
                      <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium mb-2">Premium Forecasts</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get AI-powered price predictions, technical analysis, and market forecasts for{" "}
                        {stockData.symbol}.
                      </p>
                      <Button className="bg-[#0066cc] hover:bg-[#0055b3]">Unlock Forecasts</Button>
                    </div>
                  </div>
                  <div className="blur-sm pointer-events-none">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">1-Month Target</div>
                        <div className="text-2xl font-bold">$XXX.XX</div>
                        <div className="text-sm text-green-600">+X.X% Potential</div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">3-Month Target</div>
                        <div className="text-2xl font-bold">$XXX.XX</div>
                        <div className="text-sm text-green-600">+X.X% Potential</div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">12-Month Target</div>
                        <div className="text-2xl font-bold">$XXX.XX</div>
                        <div className="text-sm text-green-600">+X.X% Potential</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Technical Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on technical indicators and chart patterns, {stockData.symbol} shows...
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Sentiment Analysis</h4>
                        <p className="text-sm text-muted-foreground">Market sentiment analysis indicates...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{stockData.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-medium">{stockData.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">{stockData.dividend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">52 Week Range</span>
                  <span className="font-medium">{stockData.yearRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">YTD Change</span>
                  <span className={`font-medium ${stockData.isYtdPositive ? "text-green-600" : "text-red-600"}`}>
                    {stockData.ytdChangePercent}
                  </span>
                </div>
                {stockData.securityType === "ETF" && stockData.expenseRatio && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expense Ratio</span>
                    <span className="font-medium">{stockData.expenseRatio}</span>
                  </div>
                )}
                {stockData.securityType === "Cryptocurrency" && stockData.maxSupply && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Supply</span>
                    <span className="font-medium">{stockData.maxSupply}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Important Dates */}
          {(stockData.nextDividendDate !== "N/A" || stockData.nextEarningsDate !== "N/A") && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Important Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stockData.nextDividendDate !== "N/A" && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Next Dividend</span>
                      </div>
                      <span className="font-medium">{stockData.nextDividendDate}</span>
                    </div>
                  )}
                  {stockData.nextEarningsDate !== "N/A" && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Next Earnings</span>
                      </div>
                      <span className="font-medium">{stockData.nextEarningsDate}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Securities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stockData.relatedSecurities.map((security, index) => (
                  <div key={index} className="block">
                    <div className="flex justify-between items-center hover:bg-muted/50 p-2 rounded transition-colors">
                      <div>
                        <div className="font-medium">{security.symbol}</div>
                        <div className="text-xs text-muted-foreground">{security.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{security.price}</div>
                        <div
                          className={`text-xs ${security.ytdChangePercent.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {security.ytdChangePercent}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0066cc] text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-bold">PortfolioPilot Analysis</h3>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Get AI-powered insights on how {stockData.symbol} fits into your investment strategy and portfolio
                diversification.
              </p>
              <Button className="w-full bg-white text-[#0066cc] hover:bg-white/90">
                Analyze {stockData.symbol} with PortfolioPilot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timestamp Section */}
      <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground space-y-1">
        <div>
          Pricing info last updated{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          (after market close)
        </div>
        <div>
          Other info last updated{" "}
          {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}
