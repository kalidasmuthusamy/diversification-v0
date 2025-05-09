import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function TrendImpact() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CardTitle>Investment Implications</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p className="text-xs mb-2">
                  This analysis presents educational information about how market trends may relate to different sectors
                  and industries based on historical patterns and expert opinions.
                </p>
                <p className="text-xs mb-2">
                  The information is derived from multiple sources including: industry research, market sentiment
                  indicators, and historical correlation analysis.
                </p>
                <p className="text-xs">
                  This is for informational purposes only. Past relationships between trends and markets may not
                  continue in the future. This should not be considered investment advice or a recommendation to buy or
                  sell any security.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Potential Opportunities</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Companies developing AI infrastructure and tools</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Businesses successfully implementing AI for competitive advantage</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Cybersecurity providers protecting AI systems</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Potential Challenges</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Labor-intensive businesses facing automation pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Companies failing to adapt to AI-driven competition</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Sectors facing potential disruption from AI innovations</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            <p>
              Note: This information is for educational purposes only and should not be considered investment advice.
              Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
