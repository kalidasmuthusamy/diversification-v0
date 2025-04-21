import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart2, Info } from "lucide-react"
import Link from "next/link"

export default function RealEstatePage() {
  const assetClass = {
    name: "Real Estate",
    slug: "real-estate",
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
            <Link href="/asset-classes" className="text-sm text-muted-foreground hover:text-foreground">
              Asset Classes
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">{assetClass.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{assetClass.name}</h1>
          <p className="text-muted-foreground">Explore historical performance, correlations, and market data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            About {assetClass.name}
          </Button>
          <Button size="sm">Calculate Your Diversification</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Historical Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
              <div className="text-center">
                <BarChart2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Historical performance chart would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">YTD Return</div>
                <div className="text-xl font-bold text-red-600">-2.1%</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">1-Year Return</div>
                <div className="text-xl font-bold text-green-600">+4.3%</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">5-Year Return</div>
                <div className="text-xl font-bold text-green-600">+32.5%</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Volatility</div>
                <div className="text-xl font-bold">Medium</div>
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
          <CardTitle>Asset Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Correlation data would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Current State</h3>
                  <p className="text-sm text-muted-foreground">
                    Real estate markets have faced challenges due to higher interest rates and changing work patterns.
                    Commercial real estate, particularly office space, continues to adapt to hybrid work models.
                    Residential real estate has shown resilience in many markets despite affordability concerns. REITs
                    offer investors liquid exposure to various property sectors with attractive dividend yields.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Liquidity</div>
                    <div className="text-xl font-bold">Medium</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Market Size</div>
                    <div className="text-xl font-bold">$326T</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Typical Allocation</div>
                    <div className="text-xl font-bold">5-15%</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Risk Level</div>
                    <div className="text-xl font-bold">Medium</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <h4 className="font-medium mb-1">Latest developments in Real Estate</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>Wall Street Journal</span>
                      <span>•</span>
                      <span>
                        {i} day{i > 1 ? "s" : ""} ago
                      </span>
                    </div>
                    <p className="text-sm">
                      This article discusses recent trends and factors affecting real estate markets globally.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Diversification Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Portfolio Role</span>
                    <Badge variant="outline">Income & Growth</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recommended Allocation</span>
                    <span className="font-medium">5-15%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inflation Protection</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recession Resistance</span>
                    <span className="font-medium">Medium</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "50%" }}></div>
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

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Expert Insight</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                "Real estate provides important diversification benefits through its income potential and partial
                inflation hedge. Consider both REITs and private real estate for comprehensive exposure to this asset
                class."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted/50"></div>
                <div>
                  <div className="text-sm font-medium">Sarah Chen</div>
                  <div className="text-xs text-muted-foreground">Real Estate Analyst, Global Predictions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>
            <strong>IMPORTANT DISCLOSURES:</strong> The information provided on Diversification.com is for informational
            and educational purposes only. It should not be considered financial advice. Global Predictions Inc. is an
            SEC registered investment advisor under CRD #305943.
          </p>
          <p>
            The market analysis and other information presented on this page represent our observations of current
            market conditions and should not be interpreted as a recommendation to buy, sell, or hold any particular
            investment or security.
          </p>
          <p>
            Past performance is not indicative of future results. All investments involve risk, including the possible
            loss of principal. Diversification does not guarantee a profit or protect against a loss in a declining
            market.
          </p>
          <p>
            Please consult with a qualified financial advisor, tax professional, or legal counsel before making any
            investment decisions based on the information provided on this website.
          </p>
        </div>
      </div>
    </div>
  )
}
