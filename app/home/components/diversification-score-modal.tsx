"use client"

import { useState, type ReactNode, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Info, Bot, ExternalLink, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDiversification } from "@/app/contexts/diversification-context"

interface DiversificationScoreModalProps {
  children?: ReactNode
  initialPortfolioText?: string
  triggerButton?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  skipInputStep?: boolean
}

export default function DiversificationScoreModal({
  children,
  initialPortfolioText = "",
  triggerButton = true,
  onOpenChange,
  defaultOpen = false,
  skipInputStep = false,
}: DiversificationScoreModalProps) {
  const { setScoreData } = useDiversification()
  const [open, setOpen] = useState(defaultOpen)
  const [step, setStep] = useState(skipInputStep && initialPortfolioText ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [portfolioText, setPortfolioText] = useState(initialPortfolioText)
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null)

  // Update portfolioText if initialPortfolioText changes
  useEffect(() => {
    if (initialPortfolioText) {
      setPortfolioText(initialPortfolioText)
    }
  }, [initialPortfolioText])

  // Handle external open state changes
  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen)

      // If opening the modal and we should skip the input step, calculate score immediately
      if (defaultOpen && skipInputStep && initialPortfolioText && !calculatedScore) {
        calculateScore()
      }
    }
  }, [defaultOpen])

  const handleOpen = () => {
    setOpen(true)

    // If we should skip the input step and have portfolio text, go directly to the results
    if (skipInputStep && portfolioText) {
      if (!calculatedScore) {
        calculateScore()
      } else {
        setStep(2)
      }
    } else {
      setStep(1)
      setCalculatedScore(null)
    }

    if (onOpenChange) onOpenChange(true)
  }

  const handleClose = () => {
    // If we calculated a score, save it before closing
    if (calculatedScore !== null) {
      // Parse portfolio text to create allocations object
      const allocations: Record<string, number> = {}
      portfolioText.split("\n").forEach((line) => {
        const parts = line.split(",")
        if (parts.length === 2) {
          const ticker = parts[0].trim()
          const percentage = Number.parseFloat(parts[1].trim().replace("%", ""))
          if (!isNaN(percentage)) {
            allocations[ticker] = percentage
          }
        }
      })

      // Save score to context
      setScoreData(calculatedScore, allocations)
    }

    setOpen(false)
    if (onOpenChange) onOpenChange(false)
  }

  const calculateScore = () => {
    setLoading(true)
    // Simulate loading and score calculation
    setTimeout(() => {
      // Calculate a score between 40 and 95 based on the portfolio text length
      // This is just a demo calculation - in a real app, this would analyze the portfolio
      const score = Math.min(95, Math.max(40, 60 + (portfolioText.length % 35)))
      setCalculatedScore(score)
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleNext = () => {
    if (step === 1) {
      calculateScore()
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  // Sample portfolio text
  const samplePortfolio = `AAPL, 15%
MSFT, 12%
AMZN, 10%
SPY, 25%
QQQ, 18%
BND, 15%
GLD, 5%`

  // Mock diversification score data
  const scoreData = calculatedScore
    ? {
        overall: calculatedScore,
        components: [
          {
            name: "Holdings Concentration",
            score: Math.max(40, Math.min(95, calculatedScore - 5 + Math.floor(Math.random() * 10))),
            description: "Your portfolio is somewhat concentrated in a few holdings",
          },
          {
            name: "Sector Diversification",
            score: Math.max(40, Math.min(95, calculatedScore + 5 + Math.floor(Math.random() * 10))),
            description: "Good spread across sectors, but tech is overweighted",
          },
          {
            name: "Geographic Exposure",
            score: Math.max(40, Math.min(95, calculatedScore + 10 - Math.floor(Math.random() * 15))),
            description: "Well-diversified across global markets",
          },
          {
            name: "Asset Class Mix",
            score: Math.max(40, Math.min(95, calculatedScore - 2 + Math.floor(Math.random() * 8))),
            description: "Decent mix of stocks, bonds, and alternatives",
          },
          {
            name: "Market Cap Distribution",
            score: Math.max(40, Math.min(95, calculatedScore - 5 - Math.floor(Math.random() * 10))),
            description: "Slightly overweight in large caps",
          },
        ],
        riskReduction: Math.max(40, Math.min(95, calculatedScore - 10 + Math.floor(Math.random() * 20))),
        growthPotential: Math.max(40, Math.min(95, calculatedScore - 5 + Math.floor(Math.random() * 15))),
      }
    : {
        overall: 0,
        components: [],
        riskReduction: 0,
        growthPotential: 0,
      }

  return (
    <>
      {triggerButton && children && <div onClick={handleOpen}>{children}</div>}

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
          else handleOpen()
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {step === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Calculate Your Diversification Score</DialogTitle>
                <DialogDescription>
                  Enter your portfolio holdings to see how well-diversified your investments are across multiple risk
                  factors.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="copy-paste" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="copy-paste">Copy/Paste Portfolio</TabsTrigger>
                </TabsList>
                <TabsContent value="copy-paste" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Paste your portfolio (ticker, allocation percentage)</label>
                    <Textarea
                      placeholder="Example:
AAPL, 15%
MSFT, 12%
SPY, 25%"
                      className="min-h-[150px]"
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
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={loading || portfolioText.trim() === ""}>
                  {loading ? "Analyzing..." : "Calculate Score"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </DialogFooter>
            </>
          )}

          {step === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>Your Diversification Score</DialogTitle>
                <DialogDescription>
                  Based on your portfolio, we've analyzed your diversification across multiple risk factors.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Score Overview */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
                  {/* Score Circle */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <svg className="w-32 h-32">
                        <circle
                          className="text-gray-200 stroke-current"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className={
                            scoreData.overall >= 80
                              ? "text-green-500 stroke-current"
                              : scoreData.overall >= 60
                                ? "text-amber-500 stroke-current"
                                : "text-red-500 stroke-current"
                          }
                          strokeWidth="10"
                          strokeDasharray={352}
                          strokeDashoffset={352 - (scoreData.overall / 100) * 352}
                          strokeLinecap="round"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{scoreData.overall}</span>
                        <span className="text-xs text-muted-foreground">Overall Score</span>
                      </div>
                    </div>

                    <Badge
                      className={
                        scoreData.overall >= 80
                          ? "bg-green-500 mt-2"
                          : scoreData.overall >= 60
                            ? "bg-amber-500 mt-2"
                            : "bg-red-500 mt-2"
                      }
                    >
                      {scoreData.overall >= 80 ? (
                        <Check className="h-3.5 w-3.5 mr-1" />
                      ) : scoreData.overall >= 60 ? (
                        <Info className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      )}
                      {scoreData.overall >= 80
                        ? "Well Diversified"
                        : scoreData.overall >= 60
                          ? "Moderately Diversified"
                          : "Poorly Diversified"}
                    </Badge>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Risk Reduction</span>
                        <Badge
                          variant="outline"
                          className={
                            scoreData.riskReduction >= 80
                              ? "text-green-500 border-green-500"
                              : scoreData.riskReduction >= 60
                                ? "text-amber-500 border-amber-500"
                                : "text-red-500 border-red-500"
                          }
                        >
                          {scoreData.riskReduction}
                        </Badge>
                      </div>
                      <Progress value={scoreData.riskReduction} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Growth Potential</span>
                        <Badge
                          variant="outline"
                          className={
                            scoreData.growthPotential >= 80
                              ? "text-green-500 border-green-500"
                              : scoreData.growthPotential >= 60
                                ? "text-amber-500 border-amber-500"
                                : "text-red-500 border-red-500"
                          }
                        >
                          {scoreData.growthPotential}
                        </Badge>
                      </div>
                      <Progress value={scoreData.growthPotential} className="h-2" />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="text-blue-600">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share Results
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Components */}
                <div className="space-y-3">
                  <h4 className="font-medium">Diversification Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scoreData.components.map((component, index) => (
                      <div key={index} className="space-y-1 bg-white p-3 rounded-md border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{component.name}</span>
                          <Badge
                            variant="outline"
                            className={
                              component.score >= 80
                                ? "text-green-500 border-green-500"
                                : component.score >= 60
                                  ? "text-amber-500 border-amber-500"
                                  : "text-red-500 border-red-500"
                            }
                          >
                            {component.score}
                          </Badge>
                        </div>
                        <Progress value={component.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-[#0066cc]/10 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-5 w-5 text-[#0066cc]" />
                    <h4 className="font-medium text-[#0066cc]">PortfolioPilot Recommendation</h4>
                  </div>
                  <p className="text-sm mb-3">
                    Your portfolio could benefit from improved diversification in commodities and inflation-protected
                    assets. Consider adding 5-10% allocation to these asset classes.
                  </p>
                  <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                    Get Full Analysis at PortfolioPilot.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <DialogFooter className="mt-4">
                {!skipInputStep && (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
                <Button onClick={handleClose}>Close</Button>
              </DialogFooter>
            </>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg">
              <div className="h-8 w-8 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Analyzing your portfolio...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
