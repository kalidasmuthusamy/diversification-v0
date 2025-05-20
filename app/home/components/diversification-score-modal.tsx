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
  Upload,
  Copy,
  Lock,
  BarChart4,
  Globe,
  PieChart,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronUp,
  Mail,
  Zap,
  Layers,
  DollarSign,
  Percent,
  Building,
  BarChart,
  Briefcase,
  CircleDollarSign,
  HelpCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDiversification } from "@/app/contexts/diversification-context"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DiversificationScoreModalProps {
  children?: ReactNode
  initialPortfolioText?: string
  triggerButton?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  skipInputStep?: boolean
  startCalculationImmediately?: boolean
}

// Define the diversification factors based on the image
const diversificationFactors = [
  {
    name: "Holdings Concentration",
    description: "Too much weight in a single investment (uses look-through analysis)",
    icon: <Briefcase className="h-4 w-4" />,
    status: "red" as const,
  },
  {
    name: "Economic Growth Risk",
    description: "How your portfolio reacts to changing GDP expectations",
    icon: <TrendingUp className="h-4 w-4" />,
    status: "red" as const,
  },
  {
    name: "Raw Materials Risk",
    description: "How much your investments depend on commodity prices",
    icon: <Building className="h-4 w-4" />,
    status: "red" as const,
  },
  {
    name: "Inflation Driver Risk",
    description: "Exposure to rising prices (CPI)",
    icon: <CircleDollarSign className="h-4 w-4" />,
    status: "yellow" as const,
  },
  {
    name: "Interest Rate Impact",
    description: "How changing interest rates affect your investments",
    icon: <Percent className="h-4 w-4" />,
    status: "yellow" as const,
  },
  {
    name: "Credit Risk",
    description: "Risk from changing macro credit conditions",
    icon: <BarChart className="h-4 w-4" />,
    status: "yellow" as const,
  },
  {
    name: "Asset Class Concentration",
    description: "Balance between different types of investments",
    icon: <Layers className="h-4 w-4" />,
    status: "green" as const,
  },
  {
    name: "Regional Concentration",
    description: "Single country or region concentration risk",
    icon: <Globe className="h-4 w-4" />,
    status: "green" as const,
  },
  {
    name: "Liquidity Risk",
    description: "Ability to sell in active markets",
    icon: <DollarSign className="h-4 w-4" />,
    status: "green" as const,
  },
  {
    name: "Sector Concentration",
    description: "Spread of investments across different industries",
    icon: <PieChart className="h-4 w-4" />,
    status: "green" as const,
  },
]

export default function DiversificationScoreModal({
  children,
  initialPortfolioText = "",
  triggerButton = true,
  onOpenChange,
  defaultOpen = false,
  skipInputStep = false,
  startCalculationImmediately = false,
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

    // If we should skip the input step and have portfolio text
    if (skipInputStep && portfolioText) {
      if (!calculatedScore) {
        if (startCalculationImmediately) {
          // Immediately show disclosure and then calculate
          setStep(1)
          setShowDisclosure(true)
        } else {
          calculateScore()
        }
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

  const handleBack = () => {
    setStep(1)
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green":
        return <Check className="h-4 w-4 text-green-500" />
      case "yellow":
        return <Info className="h-4 w-4 text-amber-500" />
      case "red":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
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
        <DialogContent className="sm:max-w-[800px]">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* Top Left: Score and Email Report */}
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
                          calculatedScore && calculatedScore >= 75
                            ? "text-green-500 stroke-current"
                            : calculatedScore && calculatedScore >= 50
                              ? "text-amber-500 stroke-current"
                              : "text-red-500 stroke-current"
                        }
                        strokeWidth="10"
                        strokeDasharray={352}
                        strokeDashoffset={352 - ((calculatedScore || 0) / 100) * 352}
                        strokeLinecap="round"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{calculatedScore}</span>
                      <span className="text-xs text-muted-foreground">Overall Score</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <Badge
                      className={`mt-1 px-3 py-1 text-sm ${
                        calculatedScore && calculatedScore >= 75
                          ? "bg-green-500"
                          : calculatedScore && calculatedScore >= 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    >
                      {calculatedScore && calculatedScore >= 75 ? (
                        <Check className="h-3.5 w-3.5 mr-1" />
                      ) : calculatedScore && calculatedScore >= 50 ? (
                        <Info className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      )}
                      {calculatedScore && calculatedScore >= 75
                        ? "Well Diversified"
                        : calculatedScore && calculatedScore >= 50
                          ? "Moderately Diversified"
                          : "Poorly Diversified"}
                    </Badge>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center mt-1 cursor-help">
                            <span className="text-xs font-medium text-blue-600">94th percentile</span>
                            <HelpCircle className="h-3 w-3 ml-1 text-blue-600" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="p-3 max-w-xs">
                          <p className="text-sm">
                            Your diversification score is better than 94% of investors with similar portfolio sizes.
                            Higher percentiles indicate stronger diversification compared to peers.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="mt-5 w-full">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={emailForReport}
                        onChange={(e) => setEmailForReport(e.target.value)}
                        disabled={emailSent}
                        className="text-sm"
                      />
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={subscribeNewsletter}
                          onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                          disabled={emailSent}
                        />
                        <div className="grid gap-1 leading-none">
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
                      <p className="text-xs text-center text-muted-foreground">
                        Includes comparison to popular investors and detailed analysis
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Right: PortfolioPilot Ad */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md flex flex-col justify-center">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">
                        Get a full portfolio assessment and optimization suggestions
                      </h4>
                      <p className="text-sm text-blue-700 mt-1 mb-3">
                        PortfolioPilot offers a complete portfolio assessment including benchmarking against similar
                        investors, personalized improvement strategies, and specific investment recommendations tailored
                        to your goals.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                        Try PortfolioPilot Free
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factors Section */}
              <div className="mt-5">
                <h4 className="font-medium mb-4 flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-blue-500" />
                  Factors affecting your score
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-3">
                  {diversificationFactors.map((factor, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 mt-0.5">{factor.icon}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{factor.name}</span>
                          {getStatusIcon(factor.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Methodology Section (Collapsible) */}
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
                <CollapsibleContent className="pt-2 max-h-[200px] overflow-y-auto pr-2">
                  <p className="text-xs text-muted-foreground">
                    Your Diversification Score is calculated using PortfolioPilot's proprietary algorithm that evaluates
                    your portfolio across multiple key risk dimensions. The score ranges from 0-100, with higher scores
                    indicating better diversification. Our methodology considers not just the number of holdings, but
                    how they work together to reduce risk while maintaining growth potential.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    We analyze your portfolio for concentration risks in holdings, sectors, and geographic regions, as
                    well as sensitivity to economic factors like inflation, interest rates, and credit conditions. The
                    analysis helps identify potential vulnerabilities in your investment strategy.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    The algorithm examines each holding in your portfolio and evaluates how it interacts with other
                    investments. We look at historical correlations between assets, volatility patterns, and how your
                    portfolio might perform under different market scenarios. This multi-dimensional analysis provides a
                    more comprehensive view of your diversification than simply counting the number of holdings.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    For stocks and ETFs, we perform a look-through analysis to understand the underlying exposures. For
                    example, if you own an S&P 500 ETF, we consider the sector and industry breakdown of the underlying
                    companies rather than treating it as a single position.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your percentile ranking compares your score to other investors with similar portfolio sizes, giving
                    you context for how well-diversified your investments are relative to peers.
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
