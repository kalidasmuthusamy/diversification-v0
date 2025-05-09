import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart2, ExternalLink, Lock, HelpCircle } from "lucide-react"
import Link from "next/link"
import AssetClassPerformance from "./components/asset-class-performance"
import AssetClassNews from "./components/asset-class-news"
import TopSecurities from "./components/top-securities"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AssetClassInfoModal } from "@/app/components/asset-class-info-modal"

export default function AssetClassesPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Asset Classes</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Asset Classes</h1>
          <div className="flex items-center">
            <p className="text-muted-foreground">
              Explore performance, correlations, and trends across major investment categories
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p className="text-xs font-medium mb-1">Data Sources by Asset Class:</p>
                  <ul className="text-xs space-y-1">
                    <li>• US Stocks: S&P 500 Index (SPY)</li>
                    <li>• Int'l Stocks: MSCI EAFE Index (EFA)</li>
                    <li>• Bonds: Bloomberg US Aggregate Bond Index (AGG)</li>
                    <li>• Real Estate: Dow Jones US Real Estate Index (IYR)</li>
                    <li>• Commodities: Bloomberg Commodity Index (DBC)</li>
                    <li>• Crypto: CoinDesk Bitcoin Price Index (BTC)</li>
                    <li>• Cash: 3-Month US Treasury Bill Rate</li>
                  </ul>
                  <p className="text-xs mt-1">Data updated daily. Performance figures may vary from other sources.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AssetClassInfoModal />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Asset Class Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <AssetClassPerformance />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CardTitle>Current Trends</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="w-80">
                      <p className="text-xs font-medium mb-1">About Market Sentiment Indicators:</p>
                      <p className="text-xs mb-1">These indicators reflect the current market sentiment based on:</p>
                      <ul className="text-xs space-y-1 mb-1">
                        <li>• Recent price action and technical indicators</li>
                        <li>• Analyst consensus and research reports</li>
                        <li>• News sentiment analysis</li>
                      </ul>
                      <p className="text-xs mb-1">Sentiment categories:</p>
                      <ul className="text-xs space-y-1">
                        <li>
                          • <span className="text-green-600 font-medium">Bullish</span>: Positive sentiment and outlook
                        </li>
                        <li>
                          • <span className="text-amber-600 font-medium">Neutral</span>: Mixed or uncertain sentiment
                        </li>
                        <li>
                          • <span className="text-red-600 font-medium">Bearish</span>: Negative sentiment and outlook
                        </li>
                      </ul>
                      <p className="text-xs mt-1">
                        Sentiment indicators are updated daily based on multiple data sources.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <Link href="/asset-classes/us-stocks" className="font-medium hover:underline">
                      US Stocks
                    </Link>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Bullish
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">Int'l Stocks</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Bullish
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <Link href="/asset-classes/bonds" className="font-medium hover:underline">
                      Bonds
                    </Link>
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    Neutral
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <Link href="/asset-classes/real-estate" className="font-medium hover:underline">
                      Real Estate
                    </Link>
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    Neutral
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="font-medium">Commodities</span>
                  </div>
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    Bearish
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="font-medium">Crypto</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Bullish
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="font-medium">Cash</span>
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    Neutral
                  </Badge>
                </div>
              </div>

              <div className="pt-2 text-sm text-center">
                <span className="text-muted-foreground">Last updated: </span>{" "}
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0066cc] text-white">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Calculate Your Optimal Asset Diversification</h3>
              <p className="text-sm text-white/90 mb-3">
                Find the right balance for your portfolio based on your risk tolerance and financial goals.
              </p>
              <Button asChild className="w-full bg-white text-[#0066cc] hover:bg-white/90">
                <a href="https://portfoliopilot.com/diversification" target="_blank" rel="noopener noreferrer">
                  Try PortfolioPilot Free
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="stocks" className="w-full mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="w-auto justify-start overflow-x-auto">
            <TabsTrigger value="stocks">US Stocks</TabsTrigger>
            <TabsTrigger value="intl-stocks">Int'l Stocks</TabsTrigger>
            <TabsTrigger value="bonds">Bonds</TabsTrigger>
            <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Core Asset Classes
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              All Asset Classes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>US Stocks Overview</CardTitle>
                  <Badge>Bullish</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Current State</h3>
                    <p className="text-sm text-muted-foreground">
                      US stocks continue to show resilience despite economic uncertainties. The S&P 500 has gained 8.2%
                      year-to-date, with technology and healthcare sectors leading the advance. Earnings growth has
                      exceeded analyst expectations, supporting higher valuations. However, concerns about inflation and
                      potential interest rate changes remain.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Historical Performance</h3>
                    <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Historical performance chart would appear here</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">YTD Return</div>
                      <div className="text-xl font-bold text-green-600">+8.2%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">1-Year Return</div>
                      <div className="text-xl font-bold text-green-600">+14.5%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">5-Year Return</div>
                      <div className="text-xl font-bold text-green-600">+68.3%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Volatility</div>
                      <div className="text-xl font-bold">Medium</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Sector Performance (YTD)</h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Technology</span>
                          <span className="text-sm font-medium text-green-600">+15.7%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Healthcare</span>
                          <span className="text-sm font-medium text-green-600">+10.2%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Financials</span>
                          <span className="text-sm font-medium text-green-600">+7.8%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Consumer Discretionary</span>
                          <span className="text-sm font-medium text-green-600">+6.5%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Energy</span>
                          <span className="text-sm font-medium text-red-600">-3.2%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AssetClassNews assetClass="stocks" />
          </div>

          <div className="space-y-6">
            <TopSecurities assetClass="stocks" />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Diversification Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portfolio Role</span>
                      <Badge variant="outline">Core Holding</Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inflation Protection</span>
                      <span className="font-medium">Moderate</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recession Resistance</span>
                      <span className="font-medium">Low</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interest Rate Sensitivity</span>
                      <span className="font-medium">Moderate</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "50%" }}></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                      <a href="https://portfoliopilot.com/signup" target="_blank" rel="noopener noreferrer">
                        Calculate Your Diversification Score
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Asset Class Outlook & Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-4">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1">Premium Content</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Create a free PortfolioPilot.com account to access our detailed asset class outlook and
                      predictions.
                    </p>
                  </div>
                  <Button asChild>
                    <a href="https://portfoliopilot.com/signup" target="_blank" rel="noopener noreferrer">
                      Create Free Account
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>

      <Card className="bg-[#0066cc] text-white mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Optimize Your Asset Allocation</h2>
              <p className="text-white/90 mb-4">
                Discover your ideal asset allocation based on your risk tolerance, time horizon, and financial goals
                with PortfolioPilot's AI-powered recommendations.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Personalized asset allocation recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Detailed diversification analysis across asset classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Ongoing portfolio monitoring and rebalancing alerts</span>
                </li>
              </ul>
              <Button asChild className="bg-white text-[#0066cc] hover:bg-white/90">
                <a href="https://portfoliopilot.com/signup" target="_blank" rel="noopener noreferrer">
                  Try PortfolioPilot Free
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="PortfolioPilot Asset Allocation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
