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
                  Investment implications are determined through analysis of historical correlations, sensitivity
                  studies, and expert assessments of how macro trends affect various industries and asset classes.
                </p>
                <p className="text-xs mb-2">
                  Our methodology evaluates multiple factors including: competitive landscape shifts, regulatory
                  impacts, consumer adoption patterns, and supply chain dependencies.
                </p>
                <p className="text-xs">
                  This analysis is updated quarterly and represents potential opportunities and challenges, not specific
                  investment recommendations.
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
