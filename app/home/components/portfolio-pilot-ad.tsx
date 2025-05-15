import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Shield, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function PortfolioPilotAd() {
  return (
    <Card className="bg-[#0066cc] text-white overflow-hidden border-0">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6" />
              <h2 className="text-2xl font-bold">PortfolioPilot AI Financial Advisor</h2>
            </div>

            <p className="text-white/90 mb-6">
              Take your diversification strategy to the next level with personalized recommendations from our AI-powered
              financial advisor.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Personalized Asset Allocation</p>
                  <p className="text-sm text-white/80">Tailored to your risk profile and financial goals</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <BarChart3 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Portfolio Score Analysis</p>
                  <p className="text-sm text-white/80">See how your investments compare to optimal allocations</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Smart Rebalancing</p>
                  <p className="text-sm text-white/80">Automated suggestions to maintain optimal diversification</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-[#0066cc] hover:bg-white/90">
                <Link href="/diversification-score">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="PortfolioPilot Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3 shadow-lg">
              <div className="text-xs text-gray-500 mb-1">Portfolio Score</div>
              <div className="text-3xl font-bold text-[#0066cc]">782</div>
              <div className="text-xs text-gray-500">85th Percentile</div>
            </div>
          </div>
        </div>

        <div className="bg-[#004c99] py-2 px-4 text-sm text-center text-white/80">
          Disclosure: PortfolioPilot is a technology product of Global Predictions Inc, a Registered Investment Advisor.
          You must subscribe to receive personalized investment advice.
        </div>
      </CardContent>
    </Card>
  )
}
