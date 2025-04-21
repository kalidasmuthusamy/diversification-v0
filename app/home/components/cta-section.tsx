import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Shield, BarChart3 } from "lucide-react"

export default function CtaSection() {
  return (
    <Card className="bg-[#0066cc] text-white">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6" />
              <h2 className="text-2xl font-bold">PortfolioPilot AI Financial Advisor</h2>
            </div>

            <p className="text-white/90 mb-6">
              Take your diversification strategy to the next level with personalized recommendations from our AI-powered
              financial advisor.
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>Personalized asset allocation based on your risk profile</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>Continuous monitoring of your portfolio's diversification</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>Rebalancing recommendations to maintain optimal diversification</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-[#0066cc] hover:bg-white/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Portfolio Score</div>
                  <div className="text-3xl font-bold text-[#0066cc]">782</div>
                </div>
                <div className="bg-[#0066cc]/10 px-2 py-1 rounded text-[#0066cc] text-sm font-medium">
                  85th Percentile
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Net Worth</span>
                    <span className="font-medium text-gray-700">$264,008.00</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-[#0066cc] rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Diversification</span>
                    <span className="font-medium text-gray-700">Good</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Risk Level</span>
                    <span className="font-medium text-gray-700">Moderate</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4 text-[#0066cc]" />
                    <span className="text-sm font-medium text-gray-700">Forecasted Returns</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">+8.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
