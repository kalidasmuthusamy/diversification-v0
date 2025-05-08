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
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Zap,
  Layers,
  DollarSign,
  Clock,
  Shuffle,
  Target,
  LineChart,
  BarChart,
  Percent,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDiversification } from "@/app/contexts/diversification-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [showMethodology, setShowMethodology] = useState(false)
  const [emailForReport, setEmailForReport] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [emailSent, setEmailSent] = useState(false)

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

      // If opening the modal and we should skip the input step, show disclosure first
      if (defaultOpen && skipInputStep && initialPortfolioText) {
        if (!calculatedScore) {
          setStep(1)
          setShowDisclosure(true)
        } else {
          setStep(2)
        }
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
          // Handle both percentage and dollar amount formats
          const valueStr = parts[1].trim()
          let value = 0

          if (valueStr.includes("$")) {
            // Parse dollar amount (remove $ and commas)
            value = Number.parseFloat(valueStr.replace(/[$,]/g, ""))
          } else {
            // Parse percentage
            value = Number.parseFloat(valueStr.replace("%", ""))
          }

          if (!isNaN(value)) {
            allocations[ticker] = value
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
      setShowDisclosure(true)
    }
  }

  const acknowledgeDisclosure = () => {
    setShowDisclosure(false)
    calculateScore()
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

  const handleSendReport = () => {
    // Simulate sending email
    setEmailSent(true)
    setTimeout(() => {
      setEmailSent(false)
      setEmailForReport("")
    }, 3000)
  }

  // Sample portfolio text - updated to use dollar amounts and include real estate
  const samplePortfolio = `AAPL, $45,000
MSFT, $36,000
AMZN, $30,000
SPY, $75,000
QQQ, $54,000
BND, $30,000
GLD, $15,000
Real Estate, $15,000`

  // Mock diversification score data with 10 components
  const scoreData = calculatedScore
    ? {
        overall: calculatedScore,
        components: [
          {
            name: "Asset Class Diversification",
            score: Math.max(40, Math.min(95, calculatedScore - 5 + Math.floor(Math.random() * 10))),
            description: "Balance across stocks, bonds, and alternative investments",
            tooltip:
              "Example: A portfolio with 100% stocks is at risk during market downturns, while a mix of stocks, bonds, and alternatives can provide more stability.",
            icon: <Layers className="h-4 w-4 text-blue-500" />,
          },
          {
            name: "Sector Allocation",
            score: Math.max(40, Math.min(95, calculatedScore + 5 + Math.floor(Math.random() * 10))),
            description: "Exposure across different market sectors",
            tooltip:
              "Example: Having 80% of your stock investments in technology creates sector risk if tech stocks decline simultaneously.",
            icon: <PieChart className="h-4 w-4 text-indigo-500" />,
          },
          {
            name: "Geographic Exposure",
            score: Math.max(40, Math.min(95, calculatedScore + 10 - Math.floor(Math.random() * 15))),
            description: "Distribution across global markets",
            tooltip:
              "Example: A U.S.-only portfolio misses growth opportunities in emerging markets and is vulnerable to U.S.-specific economic issues.",
            icon: <Globe className="h-4 w-4 text-green-500" />,
          },
          {
            name: "Market Cap Distribution",
            score: Math.max(40, Math.min(95, calculatedScore - 5 - Math.floor(Math.random() * 10))),
            description: "Balance between large, mid, and small cap stocks",
            tooltip:
              "Example: Large-cap stocks may provide stability, while small-caps can offer growth potential. A mix provides better risk-adjusted returns.",
            icon: <BarChart className="h-4 w-4 text-amber-500" />,
          },
          {
            name: "Investment Style",
            score: Math.max(40, Math.min(95, calculatedScore - 2 + Math.floor(Math.random() * 8))),
            description: "Balance between growth and value investments",
            tooltip:
              "Example: Growth stocks may outperform in bull markets, while value stocks often do better in bear markets. A mix helps in different market cycles.",
            icon: <Shuffle className="h-4 w-4 text-purple-500" />,
          },
          {
            name: "Holdings Concentration",
            score: Math.max(40, Math.min(95, calculatedScore - 8 + Math.floor(Math.random() * 12))),
            description: "Reliance on individual securities",
            tooltip:
              "Example: Having 25% of your portfolio in a single stock creates significant risk if that company faces problems.",
            icon: <Target className="h-4 w-4 text-red-500" />,
          },
          {
            name: "Income vs. Growth",
            score: Math.max(40, Math.min(95, calculatedScore + 3 - Math.floor(Math.random() * 7))),
            description: "Balance between income-producing and growth assets",
            tooltip:
              "Example: Retirees need income-producing assets, while younger investors might focus on growth. A proper balance depends on your life stage.",
            icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
          },
          {
            name: "Time Horizon Alignment",
            score: Math.max(40, Math.min(95, calculatedScore - 4 + Math.floor(Math.random() * 9))),
            description: "Match between investments and time goals",
            tooltip:
              "Example: Short-term money (needed within 3 years) should be in stable assets, while long-term investments can withstand more volatility.",
            icon: <Clock className="h-4 w-4 text-cyan-500" />,
          },
          {
            name: "Correlation Between Assets",
            score: Math.max(40, Math.min(95, calculatedScore + 7 - Math.floor(Math.random() * 14))),
            description: "How investments move relative to each other",
            tooltip:
              "Example: If all your investments move up and down together, you're not truly diversified. Ideally, some assets should zig when others zag.",
            icon: <LineChart className="h-4 w-4 text-orange-500" />,
          },
          {
            name: "Fee Efficiency",
            score: Math.max(40, Math.min(95, calculatedScore - 6 + Math.floor(Math.random() * 11))),
            description: "Impact of investment fees on returns",
            tooltip:
              "Example: A portfolio with an average expense ratio of 1.5% will significantly underperform a similar portfolio with 0.3% fees over time.",
            icon: <Percent className="h-4 w-4 text-rose-500" />,
          },
        ],
      }
    : {
        overall: 0,
        components: [],
      }

  const handleBack = () => {
    setStep(1)
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
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
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
                    <label className="text-sm font-medium">Paste your portfolio (ticker, dollar amount)</label>
                    <Textarea
                      placeholder="Example:
AAPL, $45,000
MSFT, $36,000
SPY, $75,000"
                      className="min-h-[150px]"
                      value={portfolioText}
                      onChange={(e) => setPortfolioText(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter one holding per line with ticker symbol and dollar amount
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
              <DialogHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">Your Diversification Score</DialogTitle>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Powered by</span>
                    <span className="font-bold text-blue-600 ml-1">PortfolioPilot.com</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                {/* Left Column - Score Overview */}
                <div className="flex flex-col items-center justify-start">
                  <div className="relative">
                    <svg className="w-36 h-36">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="63"
                        cx="72"
                        cy="72"
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
                        strokeDasharray={396}
                        strokeDashoffset={396 - (scoreData.overall / 100) * 396}
                        strokeLinecap="round"
                        fill="transparent"
                        r="63"
                        cx="72"
                        cy="72"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">{scoreData.overall}</span>
                      <span className="text-xs text-muted-foreground">Overall Score</span>
                    </div>
                  </div>

                  <Badge
                    className={`mt-2 px-3 py-1 text-sm ${
                      scoreData.overall >= 80 ? "bg-green-500" : scoreData.overall >= 60 ? "bg-amber-500" : "bg-red-500"
                    }`}
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

                  <div className="mt-6 w-full">
                    <div className="text-center mb-2">
                      <h4 className="font-medium text-sm">Email Report</h4>
                    </div>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={emailForReport}
                        onChange={(e) => setEmailForReport(e.target.value)}
                        disabled={emailSent}
                      />
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={subscribeNewsletter}
                          onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                          disabled={emailSent}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="newsletter" className="text-xs">
                            Subscribe to our newsletter for diversification tips
                          </Label>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={handleSendReport}
                        disabled={!emailForReport || emailSent}
                      >
                        {emailSent ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Report Sent!
                          </>
                        ) : (
                          <>
                            <Mail className="mr-1 h-4 w-4" />
                            Send Detailed Report
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Score Components */}
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-blue-500" />
                    Diversification Components
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2">
                    {scoreData.components.map((component, index) => (
                      <div key={index} className="bg-white p-2.5 rounded-md border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {component.icon}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-sm font-medium ml-2 cursor-help flex items-center">
                                    {component.name}
                                    <HelpCircle className="h-3 w-3 ml-1 text-muted-foreground" />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p className="text-sm">{component.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
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
                        <div className="mt-1">
                          <Progress
                            value={component.score}
                            className="h-1.5"
                            indicatorClassName={
                              component.score >= 80
                                ? "bg-green-500"
                                : component.score >= 60
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md mt-2">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-800">Get Personalized Recommendations</h4>
                    <p className="text-sm text-blue-700 mt-1 mb-3">
                      Unlock a full portfolio assessment including benchmarking against similar investors, personalized
                      improvement strategies, and specific investment recommendations tailored to your goals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Get Free Portfolio Assessment
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-blue-600 text-blue-600">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Methodology Section (Collapsible) */}
              <Collapsible open={showMethodology} onOpenChange={setShowMethodology} className="mt-4 border-t pt-3">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full flex justify-between">
                    <span className="text-sm font-medium flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      How We Calculate Your Score
                    </span>
                    {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Your Diversification Score is calculated using PortfolioPilot's proprietary algorithm that evaluates
                    your portfolio across 10 key dimensions. The score ranges from 0-100, with higher scores indicating
                    better diversification. Our methodology considers not just the number of holdings, but how they work
                    together to reduce risk while maintaining growth potential.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This analysis is for educational purposes only and should not be considered investment advice. For a
                    complete assessment, including personalized recommendations, visit PortfolioPilot.com.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <DialogFooter className="mt-4 pt-2 border-t">
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

          {showDisclosure && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-lg z-50">
              <div className="w-full max-w-md px-6 py-8 bg-white border rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-center">Interactive Tool Disclosure</h3>
                <div className="space-y-4 mb-6">
                  <p className="text-sm">
                    This calculator is provided for <strong>educational and informational purposes only</strong>. It is
                    not intended to provide investment advice.
                  </p>
                  <p className="text-sm">
                    The Diversification Score is one measure of portfolio diversification and should not be the sole
                    basis for investment decisions. Past performance does not guarantee future results.
                  </p>
                  <p className="text-sm">
                    Before making any investment decisions, you should consult with a qualified financial advisor to
                    ensure that your investment strategy aligns with your individual needs and circumstances.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button onClick={acknowledgeDisclosure} className="w-full md:w-auto">
                    I Understand
                  </Button>
                </div>
              </div>
            </div>
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
