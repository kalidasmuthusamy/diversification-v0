"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Check,
  Upload,
  Copy,
  Lock,
  Trophy,
  ArrowRight,
  ExternalLink,
  Wallet,
  BarChart4,
  Camera,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
import { useState, useRef } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DiversificationScoreModal from "@/app/home/components/diversification-score-modal"

export default function DiversificationPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Diversification Score Calculator</h1>
            <p className="text-muted-foreground">
              Analyze your portfolio's diversification and get recommendations to improve your risk-adjusted returns
            </p>
          </div>
          <Link href="/diversification-score/leaderboard" className="mt-4 md:mt-0">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>View Leaderboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="bg-amber-50 border border-amber-200 mb-8 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Trophy className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800">America's Most Diverse Portfolios</h3>
                <p className="text-sm text-amber-700">
                  See how your portfolio stacks up against the nation's best diversified portfolios.{" "}
                  <Link href="/diversification-score/leaderboard" className="font-medium underline">
                    View the leaderboard
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DiversificationCalculator />
      </div>
    </div>
  )
}

function DiversificationCalculator() {
  const [portfolioText, setPortfolioText] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("copy-paste")

  // Sample portfolio text - updated to use dollar amounts and include real estate
  const samplePortfolio = `AAPL, $45,000
MSFT, $36,000
AMZN, $30,000
SPY, $75,000
QQQ, $54,000
BND, $30,000
GLD, $15,000
Real Estate, $15,000
Bitcoin, 5%
International Stocks, 12%`

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Portfolio Diversification Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6 flex items-start gap-2">
          <Lock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Your privacy is protected</p>
            <p className="text-xs text-blue-600">We do not store your personal information or portfolio details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="copy-paste" className="w-full" onValueChange={(value) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="copy-paste" className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Copy/Paste Portfolio</span>
                </TabsTrigger>
                <TabsTrigger value="other-options" className="flex items-center gap-1">
                  <MoreHorizontal className="h-4 w-4" />
                  <span>Other Options</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="copy-paste" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter your portfolio holdings (any format)</label>
                  <Textarea
                    placeholder="Example:
AAPL, $45,000
MSFT, $36,000
SPY, $75,000
Real Estate, 10%
Crypto, $5,000"
                    className="min-h-[250px]"
                    value={portfolioText}
                    onChange={(e) => setPortfolioText(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <span className="font-medium">Super flexible format:</span> Enter one holding per line with any
                      identifier and value
                    </p>
                    <p>• Use any asset name: stocks, ETFs, "Real Estate", "Crypto", "International Stocks", etc.</p>
                    <p>• Values can be in dollars (e.g., $45,000) or percentages (e.g., 15%)</p>
                    <p>• No need for exact precision - our algorithm handles approximations well</p>
                  </div>
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
              </TabsContent>

              <TabsContent value="other-options" className="space-y-4 mt-4">
                <Card className="border border-blue-100 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <RefreshCw className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <h3 className="font-medium text-blue-800">Continuous portfolio monitoring</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-4">
                      PortfolioPilot offers <span className="font-medium">completely free</span> ongoing portfolio
                      tracking with weekly Diversification Score updates. Connect once and get insights automatically.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div className="flex items-start gap-3 border-b border-blue-100 pb-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Upload className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Upload Statement</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Upload brokerage statements (CSV, PDF, Excel) for automatic portfolio analysis
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 border-b border-blue-100 pb-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Camera className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Take a Screenshot</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Take a screenshot of your portfolio and our AI will extract the data automatically
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Wallet className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Connect Your Accounts</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Connect to 13,000+ brokerages, institutions, and crypto wallets for complete financial
                            tracking
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center">
                      <div className="flex items-center gap-2">
                        <BarChart4 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">100% Free Net Worth Tracking</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              {activeTab === "copy-paste" ? (
                <Button onClick={() => setModalOpen(true)} className="flex-1" disabled={portfolioText.trim() === ""}>
                  Calculate Score
                </Button>
              ) : (
                <a href="https://portfoliopilot.com" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full flex items-center justify-center gap-2">
                    Try PortfolioPilot
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}

              {/* Modal without trigger button, immediately starting calculation */}
              <DiversificationScoreModal
                triggerButton={false}
                initialPortfolioText={portfolioText}
                defaultOpen={modalOpen}
                onOpenChange={setModalOpen}
                skipInputStep={true}
                startCalculationImmediately={true}
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
                    risk-adjusted returns (via PortfolioPilot.com)
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
