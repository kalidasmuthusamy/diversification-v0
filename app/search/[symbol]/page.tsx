import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart2,
  Calendar,
  Clock,
  Play,
  Globe,
  Building,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// This would typically come from a database or API
function getSecurityData(symbol: string) {
  const isCanadian = symbol.endsWith(".TO") || symbol.endsWith(".V") || symbol.endsWith(".CN")
  const cleanSymbol = symbol.replace(/\.(TO|V|CN)$/, "")

  // Mock data - in production, this would fetch from your securities database
  const securityTypes = ["Stock", "ETF", "REIT", "Mutual Fund"]
  const sectors = [
    "Technology",
    "Healthcare",
    "Financials",
    "Energy",
    "Consumer Discretionary",
    "Industrials",
    "Materials",
    "Utilities",
    "Real Estate",
    "Communication Services",
    "Consumer Staples",
  ]
  const exchanges = isCanadian ? ["TSX", "TSX Venture", "CSE"] : ["NYSE", "NASDAQ", "AMEX"]

  return {
    symbol: symbol.toUpperCase(),
    cleanSymbol: cleanSymbol.toUpperCase(),
    name: `${cleanSymbol} ${securityTypes[Math.floor(Math.random() * securityTypes.length)]}`,
    company: `${cleanSymbol} Corporation`,
    price: `$${(Math.random() * 500 + 10).toFixed(2)}`,
    change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(2)}`,
    changePercent: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 5).toFixed(2)}%`,
    isPositive: Math.random() > 0.5,
    marketCap: `$${(Math.random() * 100 + 1).toFixed(1)}B`,
    volume: `${(Math.random() * 100 + 1).toFixed(1)}M`,
    avgVolume: `${(Math.random() * 80 + 1).toFixed(1)}M`,
    peRatio: (Math.random() * 30 + 5).toFixed(1),
    dividend: `${(Math.random() * 5).toFixed(2)}%`,
    yearRange: `$${(Math.random() * 200 + 50).toFixed(2)} - $${(Math.random() * 300 + 400).toFixed(2)}`,
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
    country: isCanadian ? "Canada" : "United States",
    currency: isCanadian ? "CAD" : "USD",
    employees: Math.floor(Math.random() * 100000 + 1000).toLocaleString(),
    founded: Math.floor(Math.random() * 50 + 1970),
    headquarters: isCanadian ? "Toronto, ON" : "New York, NY",
    description: `${cleanSymbol} is a leading company in the ${sectors[Math.floor(Math.random() * sectors.length)].toLowerCase()} sector, providing innovative solutions and services to customers ${isCanadian ? "across Canada and internationally" : "worldwide"}. The company has established itself as a key player in its industry through strategic investments and operational excellence.`,
    diversificationScore: Math.floor(Math.random() * 40 + 60),
    correlationToMarket: (Math.random() * 0.5 + 0.5).toFixed(2),
    volatility: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    analystRating: ["Strong Buy", "Buy", "Hold", "Sell"][Math.floor(Math.random() * 4)],
    priceTarget: `$${(Math.random() * 600 + 100).toFixed(2)}`,
    upside: `${(Math.random() * 20 + 5).toFixed(1)}%`,
    isCanadian,
    securityType: securityTypes[Math.floor(Math.random() * securityTypes.length)],
  }
}

export async function generateMetadata({ params }: { params: { symbol: string } }): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase()
  const data = getSecurityData(symbol)

  return {
    title: `${data.symbol} Stock Price, Analysis & Diversification Score | ${data.name}`,
    description: `Get the latest ${data.symbol} stock price, comprehensive analysis, diversification score, and investment insights. Track ${data.name} performance, news, and forecasts.`,
    keywords: `${data.symbol}, ${data.name}, stock price, stock analysis, diversification score, ${data.sector}, ${data.exchange}, ${data.country} stocks, investment analysis`,
    openGraph: {
      title: `${data.symbol} - ${data.name} Stock Analysis`,
      description: `Current price: ${data.price} (${data.changePercent}). Get comprehensive analysis and diversification insights for ${data.symbol}.`,
      type: "website",
    },
    alternates: {
      canonical: `/search/${symbol.toLowerCase()}`,
    },
  }
}

export default function SecurityPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase()
  const stockData = getSecurityData(symbol)

  const news = [
    {
      title: `${stockData.cleanSymbol} reports ${stockData.isPositive ? "strong" : "mixed"} quarterly earnings`,
      time: "2 hours ago",
      hasVideo: true,
    },
    {
      title: `Analysts ${stockData.analystRating === "Strong Buy" || stockData.analystRating === "Buy" ? "upgrade" : "maintain"} ${stockData.symbol} following recent developments`,
      time: "5 hours ago",
      hasVideo: false,
    },
    {
      title: `${stockData.sector} sector outlook: What it means for ${stockData.symbol}`,
      time: "1 day ago",
      hasVideo: true,
    },
    {
      title: `${stockData.country} market update: ${stockData.symbol} in focus`,
      time: "1 day ago",
      hasVideo: false,
    },
  ]

  const relatedSecurities = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$175.43", change: "+1.2%" },
    { symbol: "MSFT", name: "Microsoft Corporation", price: "$378.85", change: "+0.8%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "$142.56", change: "-0.3%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$248.42", change: "+2.1%" },
  ]

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
        <div className="flex flex-col items-end">
          <div className="text-2xl md:text-3xl font-bold">{stockData.price}</div>
          <div className={`flex items-center ${stockData.isPositive ? "text-green-600" : "text-red-600"}`}>
            {stockData.isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="font-medium">
              {stockData.change} ({stockData.changePercent})
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="diversification">Diversification</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-4">
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
                      <div className="text-xs text-muted-foreground">P/E Ratio</div>
                      <div className="font-medium">{stockData.peRatio}</div>
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
                      <div className="text-xs text-muted-foreground">Avg. Volume</div>
                      <div className="font-medium">{stockData.avgVolume}</div>
                    </div>
                  </div>

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
                        <div className="text-xs text-muted-foreground">Employees</div>
                        <div className="font-medium">{stockData.employees}</div>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Earnings Report</div>
                        <div className="text-sm text-muted-foreground">
                          Expected on April 25, 2025 (Before Market Open)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Dividend Payment</div>
                        <div className="text-sm text-muted-foreground">Ex-Dividend Date: May 15, 2025</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Latest News for {stockData.symbol}</CardTitle>
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
            </TabsContent>

            <TabsContent value="analysis" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Analyst Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Price Target</div>
                      <div className="text-2xl font-bold">{stockData.priceTarget}</div>
                      <div className="text-sm text-green-600">{stockData.upside} Upside Potential</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Analyst Rating</div>
                      <div className="text-2xl font-bold">{stockData.analystRating}</div>
                      <div className="text-sm text-muted-foreground">Consensus Rating</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                      <div className="text-2xl font-bold">{stockData.volatility}</div>
                      <div className="text-sm text-muted-foreground">Based on volatility</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diversification" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Diversification Analysis for {stockData.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Diversification Score</div>
                      <div className="text-2xl font-bold">{stockData.diversificationScore}/100</div>
                      <div className="text-sm text-muted-foreground">
                        {stockData.diversificationScore >= 80
                          ? "Excellent diversification"
                          : stockData.diversificationScore >= 60
                            ? "Good diversification"
                            : "Limited diversification"}
                      </div>
                    </div>
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

                  <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Portfolio Impact</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Adding {stockData.symbol} to your portfolio may{" "}
                      {Number.parseFloat(stockData.correlationToMarket) >= 0.8
                        ? "not significantly improve diversification due to its high correlation with the broader market"
                        : "help improve diversification due to its unique risk/return characteristics"}
                      .
                    </p>
                    <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                      Analyze {stockData.symbol} in Your Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financials" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Key Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Revenue (TTM)</div>
                      <div className="font-bold">${(Math.random() * 50 + 10).toFixed(1)}B</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Net Income (TTM)</div>
                      <div className="font-bold">${(Math.random() * 10 + 1).toFixed(1)}B</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">EPS (TTM)</div>
                      <div className="font-bold">${(Math.random() * 20 + 1).toFixed(2)}</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">ROE</div>
                      <div className="font-bold">{(Math.random() * 25 + 5).toFixed(1)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <span className="font-medium">
                    ${(Number.parseFloat(stockData.price.replace("$", "")) - 2.34).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Previous Close</span>
                  <span className="font-medium">
                    ${(Number.parseFloat(stockData.price.replace("$", "")) - 2.35).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Day Range</span>
                  <span className="font-medium">
                    ${(Number.parseFloat(stockData.price.replace("$", "")) - 5).toFixed(2)} - $
                    {(Number.parseFloat(stockData.price.replace("$", "")) + 3).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">52 Week Range</span>
                  <span className="font-medium">{stockData.yearRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-medium">{stockData.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{stockData.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">{stockData.peRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">{stockData.dividend}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Securities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatedSecurities.map((security, index) => (
                  <Link key={index} href={`/search/${security.symbol.toLowerCase()}`} className="block">
                    <div className="flex justify-between items-center hover:bg-muted/50 p-2 rounded transition-colors">
                      <div>
                        <div className="font-medium">{security.symbol}</div>
                        <div className="text-xs text-muted-foreground">{security.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{security.price}</div>
                        <div
                          className={`text-xs ${security.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {security.change}
                        </div>
                      </div>
                    </div>
                  </Link>
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

      {/* SEO Content Section */}
      <div className="mt-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About {stockData.symbol} Stock</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              {stockData.symbol} ({stockData.name}) is a {stockData.sector.toLowerCase()} company trading on the{" "}
              {stockData.exchange} exchange. With a market capitalization of {stockData.marketCap}, {stockData.symbol}{" "}
              represents a significant player in the {stockData.country} market.
            </p>
            <p>
              Investors interested in {stockData.symbol} should consider its diversification score of{" "}
              {stockData.diversificationScore}/100, which indicates{" "}
              {stockData.diversificationScore >= 80
                ? "excellent"
                : stockData.diversificationScore >= 60
                  ? "good"
                  : "limited"}{" "}
              diversification potential. The stock's correlation to the broader market is{" "}
              {stockData.correlationToMarket}, suggesting it{" "}
              {Number.parseFloat(stockData.correlationToMarket) >= 0.8
                ? "moves closely with"
                : "has some independence from"}{" "}
              overall market trends.
            </p>
            <p>
              Current analyst sentiment for {stockData.symbol} is {stockData.analystRating.toLowerCase()}, with a price
              target of {stockData.priceTarget}
              representing {stockData.upside} upside potential from current levels. The company's{" "}
              {stockData.volatility.toLowerCase()} volatility profile makes it suitable for investors seeking{" "}
              {stockData.volatility === "Low"
                ? "stable"
                : stockData.volatility === "Medium"
                  ? "moderate"
                  : "aggressive"}{" "}
              growth opportunities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Considerations for {stockData.symbol}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>Why Consider {stockData.symbol}?</h3>
            <ul>
              <li>Strong position in the {stockData.sector.toLowerCase()} sector</li>
              <li>Trading on the reputable {stockData.exchange} exchange</li>
              <li>Diversification score of {stockData.diversificationScore}/100</li>
              <li>Analyst rating of {stockData.analystRating.toLowerCase()}</li>
              <li>{stockData.upside} upside potential according to analyst price targets</li>
            </ul>

            <h3>Risk Factors</h3>
            <ul>
              <li>{stockData.volatility} volatility compared to market average</li>
              <li>Market correlation of {stockData.correlationToMarket}</li>
              <li>Sector-specific risks in {stockData.sector.toLowerCase()}</li>
              <li>Currency exposure to {stockData.currency}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
