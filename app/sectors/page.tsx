import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart2, Info, ExternalLink, Lock } from "lucide-react"
import Link from "next/link"
import SectorCorrelation from "./components/sector-correlation"
import SectorPerformance from "./components/sector-performance"
import SectorNews from "./components/sector-news"
import TopSecurities from "./components/top-securities"

export default function SectorsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Sectors</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Market Sectors</h1>
          <p className="text-muted-foreground">Explore performance, trends, and insights across major market sectors</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            What are Sectors?
          </Button>
          <Button size="sm">Calculate Your Diversification</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Sector Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <SectorPerformance />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Technology</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Bullish
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Healthcare</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Bullish
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="font-medium">Financials</span>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Neutral
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">Energy</span>
                </div>
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Bearish
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="font-medium">Consumer Discretionary</span>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Neutral
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="font-medium">Consumer Staples</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Bullish
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="font-medium">Utilities</span>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Neutral
                </Badge>
              </div>
            </div>

            <div className="pt-2 text-sm text-center">
              <span className="text-muted-foreground">Last updated: </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Sector Correlation Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <SectorCorrelation />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Sector Outlook & Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4">
              <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">Premium Content</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Create a free PortfolioPilot.com account to access our detailed sector outlook and predictions.
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

      <Tabs defaultValue="technology" className="w-full mb-6">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="consumer-discretionary">Consumer Discretionary</TabsTrigger>
          <TabsTrigger value="consumer-staples">Consumer Staples</TabsTrigger>
          <TabsTrigger value="industrials">Industrials</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Technology Sector Overview</CardTitle>
                  <Badge>Bullish</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Current State</h3>
                    <p className="text-sm text-muted-foreground">
                      The technology sector continues to show strength, driven by strong earnings from major companies
                      and increasing demand for AI and cloud services. The sector has gained 15.7% year-to-date,
                      outperforming the broader market. Semiconductor stocks have been particularly strong, while
                      software companies have shown mixed results.
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
                      <div className="text-xl font-bold text-green-600">+15.7%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">1-Year Return</div>
                      <div className="text-xl font-bold text-green-600">+28.3%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">5-Year Return</div>
                      <div className="text-xl font-bold text-green-600">+142.5%</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Volatility</div>
                      <div className="text-xl font-bold">High</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Industry Performance (YTD)</h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Semiconductors</span>
                          <span className="text-sm font-medium text-green-600">+24.3%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Software</span>
                          <span className="text-sm font-medium text-green-600">+12.8%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Hardware</span>
                          <span className="text-sm font-medium text-green-600">+10.5%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "55%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">IT Services</span>
                          <span className="text-sm font-medium text-green-600">+8.2%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Internet Services</span>
                          <span className="text-sm font-medium text-green-600">+18.7%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SectorNews sector="technology" />
          </div>

          <div className="space-y-6">
            <TopSecurities sector="technology" />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Diversification Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portfolio Role</span>
                      <Badge variant="outline">Growth Driver</Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inflation Protection</span>
                      <span className="font-medium">Low</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "30%" }}></div>
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
                      <span className="font-medium">High</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                      Calculate Your Diversification Score
                    </Button>
                  </div>
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
              <h2 className="text-2xl font-bold mb-2">Optimize Your Sector Allocation</h2>
              <p className="text-white/90 mb-4">
                Discover your ideal sector allocation based on your risk tolerance, time horizon, and financial goals
                with PortfolioPilot's AI-powered recommendations.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Personalized sector allocation recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Detailed sector exposure analysis for your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Ongoing sector rotation alerts and rebalancing suggestions</span>
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
                alt="PortfolioPilot Sector Allocation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
