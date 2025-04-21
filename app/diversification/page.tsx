"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import { useState } from "react"
import DiversificationScoreModal from "@/app/home/components/diversification-score-modal"

export default function DiversificationPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Diversification Score Calculator</h1>
        <p className="text-muted-foreground mb-8">
          Analyze your portfolio's diversification and get recommendations to improve your risk-adjusted returns
        </p>

        <DiversificationCalculator />
      </div>
    </div>
  )
}

function DiversificationCalculator() {
  const [portfolioText, setPortfolioText] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  // Sample portfolio text
  const samplePortfolio = `AAPL, 15%
MSFT, 12%
AMZN, 10%
SPY, 25%
QQQ, 18%
BND, 15%
GLD, 5%`

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Portfolio Diversification Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter your portfolio holdings (ticker, allocation percentage)
              </label>
              <Textarea
                placeholder="Example:
AAPL, 15%
MSFT, 12%
SPY, 25%"
                className="min-h-[250px]"
                value={portfolioText}
                onChange={(e) => setPortfolioText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter one holding per line with ticker symbol and allocation percentage
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="font-medium mb-2">Sample Portfolio</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Don't have a portfolio? Use our sample to see how the calculator works:
              </p>
              <Button variant="outline" size="sm" onClick={() => setPortfolioText(samplePortfolio)}>
                Use Sample Portfolio
              </Button>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setModalOpen(true)} disabled={portfolioText.trim() === ""} className="flex-1">
                Calculate Score
              </Button>

              {/* Modal without trigger button, skipping input step */}
              <DiversificationScoreModal
                triggerButton={false}
                initialPortfolioText={portfolioText}
                defaultOpen={modalOpen}
                onOpenChange={setModalOpen}
                skipInputStep={true}
              />
            </div>
          </div>

          <div className="space-y-6 hidden lg:block">
            <div className="bg-muted/30 rounded-lg p-6 h-full flex flex-col justify-center">
              <h3 className="text-lg font-medium mb-4">Why Calculate Your Diversification Score?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Identify concentration risks</span> in your portfolio that could lead
                    to increased volatility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Discover asset classes</span> that may be missing from your investment
                    mix
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Understand correlations</span> between your holdings and how they
                    might perform in different market conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Get personalized recommendations</span> to improve your portfolio's
                    risk-adjusted returns
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
