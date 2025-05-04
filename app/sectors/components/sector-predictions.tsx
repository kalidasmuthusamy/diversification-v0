import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, TrendingUp, BarChart2, Calendar, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SectorPredictions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle>Sector Outlook & Predictions</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Updated weekly</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant="outline">Next 12 Months</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Economic Factors</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">GDP Growth</span>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Moderate (2.1%)
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Inflation</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Declining (2.8%)
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Interest Rates</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                  Decreasing
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Consumer Spending</span>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  Stable
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Sector Forecasts</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Technology</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                  12-15%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Healthcare</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                  8-10%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Financials</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                  6-8%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Energy</span>
                </div>
                <Badge variant="outline" className="text-red-600 border-red-600">
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                  -2-0%
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Key Events to Watch</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Fed Policy Meetings</div>
                <div className="text-xs text-muted-foreground">Expected rate cuts in Q2 and Q3 2025</div>
              </div>
              <div>
                <div className="text-sm font-medium">Earnings Season</div>
                <div className="text-xs text-muted-foreground">Q1 2025 results expected to show 5% growth</div>
              </div>
              <div>
                <div className="text-sm font-medium">Tech Regulation</div>
                <div className="text-xs text-muted-foreground">New antitrust legislation expected in H2 2025</div>
              </div>
              <div>
                <div className="text-sm font-medium">Energy Transition</div>
                <div className="text-xs text-muted-foreground">Major climate policy changes anticipated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-center text-muted-foreground">
          Forecasts as of {new Date().toLocaleDateString()}. These predictions represent our current views and are
          subject to change.
        </div>
      </CardContent>
    </Card>
  )
}
