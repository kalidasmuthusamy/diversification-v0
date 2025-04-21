import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, TrendingUp, BarChart2, Calendar, Clock, Play, Info } from "lucide-react"
import Link from "next/link"

export default function StockPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase()

  // Mock data for the stock
  const stockData = {
    symbol,
    name: symbol === "SPY" ? "SPDR S&P 500 ETF Trust" : `${symbol} Corporation`,
    price: "$412.78",
    change: "+2.34",
    changePercent: "+0.57%",
    isPositive: true,
    marketCap: "$412.8B",
    volume: "78.2M",
    avgVolume: "65.1M",
    peRatio: "22.4",
    dividend: "1.52%",
    yearRange: "$364.82 - $429.76",
    description:
      symbol === "SPY"
        ? "The SPDR S&P 500 ETF Trust (SPY) is an exchange-traded fund that tracks the S&P 500 index. The S&P 500 index is comprised of 500 large and mid-cap U.S. stocks, and is one of the most widely followed equity indices."
        : `${symbol} is a leading company in its industry, providing innovative solutions and services to customers worldwide.`,
    diversificationScore: 85,
    correlationToMarket: 1.0,
    volatility: "Medium",
    sectorExposure: [
      { name: "Technology", value: 28.7 },
      { name: "Healthcare", value: 13.2 },
      { name: "Financials", value: 12.8 },
      { name: "Consumer Discretionary", value: 10.5 },
      { name: "Communication Services", value: 8.6 },
      { name: "Industrials", value: 7.9 },
      { name: "Consumer Staples", value: 6.8 },
      { name: "Energy", value: 4.5 },
      { name: "Utilities", value: 2.5 },
      { name: "Real Estate", value: 2.4 },
      { name: "Materials", value: 2.1 },
    ],
    news: [
      {
        title: `${symbol === "SPY" ? "S&P 500" : symbol} rallies as inflation data comes in lower than expected`,
        time: "2 hours ago",
        hasVideo: true,
      },
      {
        title: `What's next for ${symbol === "SPY" ? "S&P 500" : symbol} after recent market volatility`,
        time: "5 hours ago",
        hasVideo: false,
      },
      {
        title: `Analysts upgrade ${symbol} citing strong growth prospects`,
        time: "1 day ago",
        hasVideo: true,
      },
      {
        title: `How ${symbol === "SPY" ? "index funds" : "companies"} like ${symbol} are adapting to changing economic conditions`,
        time: "1 day ago",
        hasVideo: false,
      },
    ],
    forecast: {
      priceTarget: "$445.00",
      upside: "7.8%",
      analystRating: "Buy",
      riskLevel: "Medium",
      shortTermOutlook: "Positive",
      longTermOutlook: "Bullish",
    },
  }

  return (
    <div className="container py-6">
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
            <span className="text-sm">{stockData.symbol}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">{stockData.symbol}</h1>
            <Badge variant="outline" className="text-sm">
              {symbol === "SPY" ? "ETF" : "Stock"}
            </Badge>
          </div>
          <p className="text-muted-foreground">{stockData.name}</p>
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted/30 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive price chart would appear here</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex bg-muted/30 rounded-md p-1">
                  <Button variant="ghost" size="sm" className="text-xs">
                    1D
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    1W
                  </Button>
                  <Button variant="default" size="sm" className="text-xs">
                    1M
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    3M
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    6M
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    1Y
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    5Y
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    MAX
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="diversification">Diversification</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">About {stockData.symbol}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{stockData.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                </CardContent>
              </Card>

              {symbol === "SPY" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sector Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stockData.sectorExposure.map((sector, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{sector.name}</span>
                            <span className="text-sm font-medium">{sector.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${sector.value * 2}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

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
                  <CardTitle className="text-lg">Latest News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockData.news.map((item, index) => (
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

            <TabsContent value="forecast" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Price Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Price Target</div>
                      <div className="text-2xl font-bold">{stockData.forecast.priceTarget}</div>
                      <div className="text-sm text-green-600">{stockData.forecast.upside} Upside Potential</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Analyst Rating</div>
                      <div className="text-2xl font-bold">{stockData.forecast.analystRating}</div>
                      <div className="text-sm text-muted-foreground">Consensus of 24 analysts</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                      <div className="text-2xl font-bold">{stockData.forecast.riskLevel}</div>
                      <div className="text-sm text-muted-foreground">Based on volatility metrics</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Short-Term Outlook (3-6 months)</h3>
                      <p className="text-sm text-muted-foreground">
                        {stockData.forecast.shortTermOutlook}: Analysts expect continued momentum based on strong
                        earnings and favorable market conditions. Technical indicators suggest support at current
                        levels.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Long-Term Outlook (1-3 years)</h3>
                      <p className="text-sm text-muted-foreground">
                        {stockData.forecast.longTermOutlook}: Fundamental analysis indicates strong growth potential
                        over the next several years. The company's strategic initiatives and market position support a
                        positive long-term view.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Disclaimer</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Forecasts are based on analyst opinions and market data. They should not be considered as
                      investment advice. Past performance is not indicative of future results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diversification" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Diversification Analysis</CardTitle>
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
                      <div className="text-sm text-muted-foreground mb-1">Correlation to S&P 500</div>
                      <div className="text-2xl font-bold">{stockData.correlationToMarket}</div>
                      <div className="text-sm text-muted-foreground">
                        {stockData.correlationToMarket >= 0.8
                          ? "Highly correlated"
                          : stockData.correlationToMarket >= 0.5
                            ? "Moderately correlated"
                            : "Low correlation"}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                      <div className="text-2xl font-bold">{stockData.volatility}</div>
                      <div className="text-sm text-muted-foreground">Relative to market average</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Portfolio Impact Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {symbol === "SPY"
                        ? "SPY provides broad market exposure and serves as a core holding in diversified portfolios. Its high correlation to the overall market means it should be complemented with other asset classes for true diversification."
                        : `Adding ${symbol} to your portfolio may ${
                            stockData.correlationToMarket >= 0.8
                              ? "not significantly improve diversification due to its high correlation with the broader market"
                              : "help improve diversification due to its unique risk/return characteristics"
                          }.`}
                    </p>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sector Concentration Risk</span>
                          <Badge
                            variant="outline"
                            className={
                              symbol === "SPY" ? "text-green-500 border-green-500" : "text-amber-500 border-amber-500"
                            }
                          >
                            {symbol === "SPY" ? "Low" : "Medium"}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={symbol === "SPY" ? "h-full bg-green-500" : "h-full bg-amber-500"}
                            style={{ width: symbol === "SPY" ? "30%" : "60%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Geographic Exposure Risk</span>
                          <Badge
                            variant="outline"
                            className={
                              symbol === "SPY" ? "text-amber-500 border-amber-500" : "text-red-500 border-red-500"
                            }
                          >
                            {symbol === "SPY" ? "Medium" : "High"}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={symbol === "SPY" ? "h-full bg-amber-500" : "h-full bg-red-500"}
                            style={{ width: symbol === "SPY" ? "60%" : "80%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Market Cap Exposure</span>
                          <Badge
                            variant="outline"
                            className={
                              symbol === "SPY" ? "text-green-500 border-green-500" : "text-amber-500 border-amber-500"
                            }
                          >
                            {symbol === "SPY" ? "Balanced" : "Large Cap"}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={symbol === "SPY" ? "h-full bg-green-500" : "h-full bg-amber-500"}
                            style={{ width: symbol === "SPY" ? "40%" : "70%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Recommendation</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {symbol === "SPY"
                        ? "SPY is an excellent core holding, but consider complementing it with international equities, bonds, and alternative assets for better diversification."
                        : `Consider ${symbol} as part of a diversified portfolio, but be mindful of its specific risk characteristics and how it correlates with your existing holdings.`}
                    </p>
                    <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                      Analyze This Asset in Your Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <span className="font-medium">$410.45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Previous Close</span>
                  <span className="font-medium">$410.44</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Day Range</span>
                  <span className="font-medium">$409.12 - $413.56</span>
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
                  <span className="text-sm text-muted-foreground">Avg. Volume</span>
                  <span className="font-medium">{stockData.avgVolume}</span>
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
              <CardTitle className="text-lg">Related Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { symbol: "QQQ", name: "Invesco QQQ Trust", price: "$428.92", change: "+1.2%" },
                  { symbol: "IWM", name: "iShares Russell 2000 ETF", price: "$201.34", change: "-0.5%" },
                  { symbol: "DIA", name: "SPDR Dow Jones Industrial", price: "$389.76", change: "+0.3%" },
                  { symbol: "VTI", name: "Vanguard Total Stock Market", price: "$252.18", change: "+0.7%" },
                ].map((asset, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{asset.price}</div>
                      <div className={`text-xs ${asset.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {asset.change}
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
                Get AI-powered insights on how {stockData.symbol} fits into your investment strategy.
              </p>
              <Button className="w-full bg-white text-[#0066cc] hover:bg-white/90">Analyze with PortfolioPilot</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
