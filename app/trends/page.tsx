import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Info } from "lucide-react"
import Link from "next/link"
import TrendNews from "./components/trend-news"
import TrendImpact from "./components/trend-impact"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TrendsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Macro Trends</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Macro Trends</h1>
          <p className="text-muted-foreground">
            Track the most significant economic and market trends shaping the investment landscape
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-2" />
                About Macro Trends
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>About Macro Trends</DialogTitle>
                <DialogDescription>
                  Understanding the major economic and market forces that shape investment opportunities
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Macro trends are large-scale patterns or movements that influence multiple sectors, asset classes, and
                  regions over extended periods. These trends often emerge from fundamental shifts in economics,
                  technology, demographics, geopolitics, or consumer behavior.
                </p>

                <h4 className="text-sm font-medium">Why Macro Trends Matter</h4>
                <p className="text-sm text-muted-foreground">
                  Identifying and understanding macro trends can help investors:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Anticipate market shifts before they're fully reflected in asset prices</li>
                  <li>Make more informed strategic asset allocation decisions</li>
                  <li>Identify sectors and industries positioned for long-term growth</li>
                  <li>Better understand potential risks to existing investments</li>
                </ul>

                <h4 className="text-sm font-medium">Our Methodology</h4>
                <p className="text-sm text-muted-foreground">
                  We identify and analyze macro trends through a combination of quantitative data analysis, expert
                  insights, and continuous monitoring of global economic indicators, policy developments, and
                  technological innovations. Our trend strength and impact assessments are updated quarterly.
                </p>

                <div className="bg-muted p-3 rounded-md mt-4">
                  <p className="text-xs text-muted-foreground">
                    Note: Macro trend analysis is one of many tools for investment decision-making and should be
                    considered alongside your personal financial situation, goals, and risk tolerance.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Top 5 Macro Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    {index}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {index === 1 && "AI and Automation"}
                        {index === 2 && "Digital Transformation"}
                        {index === 3 && "Energy Transition"}
                        {index === 4 && "Remote Work Revolution"}
                        {index === 5 && "Supply Chain Restructuring"}
                      </h3>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {index === 1 &&
                        "Artificial intelligence and automation transforming industries and labor markets"}
                      {index === 2 &&
                        "Businesses accelerating digital adoption across operations and customer experiences"}
                      {index === 3 && "Shift from fossil fuels to renewable energy sources and technologies"}
                      {index === 4 && "Permanent shift to flexible and hybrid work arrangements"}
                      {index === 5 && "Companies diversifying suppliers and reshoring critical production"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {index === 1 && "Very Strong"}
                        {index === 2 && "Strong"}
                        {index === 3 && "Strong"}
                        {index === 4 && "Strong"}
                        {index === 5 && "Medium"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {index === 1 && "High Impact"}
                        {index === 2 && "High Impact"}
                        {index === 3 && "High Impact"}
                        {index === 4 && "Medium Impact"}
                        {index === 5 && "Medium Impact"}
                      </Badge>
                    </div>
                  </div>
                  <Link href={`/trends/${index}`} className="flex-shrink-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Trend Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">US Stocks</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Positive
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Int'l Stocks</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Positive
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="font-medium">Bonds</span>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Neutral
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">Real Estate</span>
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
                  Negative
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="font-medium">Crypto</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Positive
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>AI and Automation</CardTitle>
                <Badge>Trend #1</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Artificial intelligence and automation continue to transform industries across the global economy.
                    Companies are increasingly adopting AI solutions to improve efficiency, reduce costs, and create new
                    products and services. This trend is reshaping labor markets, business models, and competitive
                    landscapes across sectors.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Trend Strength</div>
                    <div className="text-xl font-bold">Very Strong</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Time Horizon</div>
                    <div className="text-xl font-bold">Long-term</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Sector Impact</div>
                    <div className="text-xl font-bold">Broad</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Volatility</div>
                    <div className="text-xl font-bold">Medium</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Key Sectors Affected</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Technology</span>
                        <span className="text-sm font-medium text-green-600">High Impact</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Healthcare</span>
                        <span className="text-sm font-medium text-green-600">High Impact</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Financial Services</span>
                        <span className="text-sm font-medium text-green-600">High Impact</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Manufacturing</span>
                        <span className="text-sm font-medium text-green-600">High Impact</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Retail</span>
                        <span className="text-sm font-medium text-amber-600">Medium Impact</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <TrendNews />
        </div>

        <div className="space-y-6">
          <TrendImpact />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Related Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href="/trends/digital-transformation"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2</Badge>
                    <span>Digital Transformation</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/trends/remote-work"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">4</Badge>
                    <span>Remote Work Revolution</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/trends/cybersecurity"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">7</Badge>
                    <span>Cybersecurity Imperative</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
