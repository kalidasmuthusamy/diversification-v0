"use client"

import type React from "react"

import { useState, type ReactNode, useEffect, useRef } from "react"
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
import {
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Info,
  Bot,
  ExternalLink,
  Share2,
  Upload,
  Copy,
  Lock,
  BarChart4,
  Globe,
  PieChart,
  TrendingUp,
  Shield,
} from "lucide-react"
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const loadingSteps = [
    {
      title: "Analyzing Holdings Concentration",
      description: "Evaluating the distribution of your investments across different securities",
      icon: <BarChart4 className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Measuring Sector Diversification",
      description: "Assessing your exposure across different market sectors",
      icon: <PieChart className="h-6 w-6 text-indigo-500" />,
    },
    {
      title: "Evaluating Geographic Exposure",
      description: "Analyzing your portfolio's global market distribution",
      icon: <Globe className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Calculating Asset Class Mix",
      description: "Measuring the balance between stocks, bonds, and alternative investments",
      icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Assessing Risk Factors",
      description: "Evaluating your portfolio's resilience to market volatility",
      icon: <Shield className="h-6 w-6 text-red-500" />,
    },
  ]

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

  // Loading animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length)
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading, loadingSteps.length])

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
    setLoadingStep(0)

    // Simulate loading and score calculation
    setTimeout(() => {
      // Calculate a score between 40 and 95 based on the portfolio text length
      // This is just a demo calculation - in a real app, this would analyze the portfolio
      const score = Math.min(95, Math.max(40, 60 + (portfolioText.length % 35)))
      setCalculatedScore(score)
      setLoading(false)
      setStep(2)
    }, 10000) // Longer loading time to show the animation
  }

  const handleNext = () => {
    if (step === 1) {
      calculateScore()
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)

      // Simulate reading the file and extracting portfolio data
      setTimeout(() => {
        setPortfolioText(samplePortfolio)
      }, 1000)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
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

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-start gap-2">
                <Lock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Your privacy is protected</p>
                  <p className="text-xs text-blue-600">
                    We do not store your personal information or portfolio details.
                  </p>
                </div>
              </div>

              <Tabs defaultValue="copy-paste" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="copy-paste" className="flex items-center gap-1">
                    <Copy className="h-4 w-4" />
                    <span>Copy/Paste Portfolio</span>
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span>Upload Statement</span>
                  </TabsTrigger>
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

                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".csv,.xlsx,.pdf"
                    />
                    {!uploadedFile ? (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-lg font-medium mb-1">Upload your brokerage statement</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          We support CSV, Excel, and PDF files from major brokerages
                        </p>
                        <Button onClick={triggerFileUpload}>Select File</Button>
                      </>
                    ) : (
                      <>
                        <Check className="h-10 w-10 text-green-500 mx-auto mb-2" />
                        <h3 className="text-lg font-medium mb-1">File uploaded successfully</h3>
                        <p className="text-sm text-green-600 mb-4">{uploadedFile.name}</p>
                        <Button variant="outline" onClick={() => setUploadedFile(null)}>
                          Change File
                        </Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={loading || (portfolioText.trim() === "" && !uploadedFile)}>
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
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
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
                    <h4 className="font-medium text-[#0066cc]">Get Professional Recommendations</h4>
                  </div>
                  <p className="text-sm mb-3">
                    Unlock full analysis and specific fiduciary recommendations, all completely automated. Our advanced
                    algorithms can help optimize your portfolio for better returns.
                  </p>
                  <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
                    Start Your 14-Day Free Trial
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-lg">
              <div className="w-full max-w-md px-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                  <div>
                    <h3 className="font-medium text-lg">{loadingSteps[loadingStep].title}</h3>
                    <p className="text-sm text-muted-foreground">{loadingSteps[loadingStep].description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {loadingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 ${index === loadingStep ? "opacity-100" : "opacity-40"}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm font-medium ${index === loadingStep ? "" : "text-gray-500"}`}>
                            {step.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {index < loadingStep ? "100%" : index === loadingStep ? "In progress" : "Pending"}
                          </span>
                        </div>
                        <Progress
                          value={
                            index < loadingStep ? 100 : index === loadingStep ? ((Date.now() % 2000) / 2000) * 100 : 0
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Analyzing your portfolio across multiple risk factors...
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
