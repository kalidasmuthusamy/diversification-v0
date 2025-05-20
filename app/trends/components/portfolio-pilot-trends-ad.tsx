import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Bot, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function PortfolioPilotTrendsAd() {
  return (
    <Card className="overflow-hidden border-blue-100 mt-6">
      <CardContent className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-700">Apply These Trends To Your Portfolio</h3>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          PortfolioPilot AI can analyze how these macro trends might impact your specific investments and suggest
          portfolio adjustments.
        </p>
        <div className="flex items-start gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-gray-600">Get personalized trend impact analysis for your holdings</span>
        </div>
      </CardContent>
      <CardFooter className="bg-white px-5 py-3">
        <Link href="/advisor" className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Analyze Your Portfolio
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
