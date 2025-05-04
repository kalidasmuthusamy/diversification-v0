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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowRight, Check, AlertTriangle, Upload, Copy, Lock } from "lucide-react"
import { useDiversification } from "@/app/contexts/diversification-context"
import DiversificationScoreReport from "@/app/components/diversification-score-report"

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
  const [showAllComponents, setShowAllComponents] = useState(false)
  const [emailForReport, setEmailForReport] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [emailSent, setEmailSent] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const loadingSteps = [
    {
      title: "Analyzing Holdings Concentration",
      description: "Evaluating the distribution of your investments across different securities",
    },
    {
      title: "Measuring Sector Diversification",
      description: "Assessing your exposure across different market sectors",
    },
    {
      title: "Evaluating Geographic Exposure",
      description: "Analyzing your portfolio's global market distribution",
    },
    {
      title: "Calculating Asset Class Mix",
      description: "Measuring the balance between stocks, bonds, and alternative investments",
    },
    {
      title: "Assessing Risk Factors",
      description: "Evaluating your portfolio's resilience to market volatility",
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

  // Mock diversification score data with the same component names as in the image
  const scoreData = calculatedScore
    ? {
        overall: calculatedScore,
        components: [
          {
            name: "Asset Class Diversification",
            score: Math.max(0, Math.min(100, calculatedScore - 5 + Math.floor(Math.random() * 10))),
            description: "Balance between different types of investments",
          },
          {
            name: "Holdings Diversification",
            score: Math.max(0, Math.min(100, calculatedScore - 15 + Math.floor(Math.random() * 10))),
            description: "Too much weight in a single investment (uses look-through analysis)",
          },
          {
            name: "Sector Diversification",
            score: Math.max(0, Math.min(100, calculatedScore + 5 + Math.floor(Math.random() * 10))),
            description: "Spread of investments across different industries",
          },
          {
            name: "Country Diversification",
            score: Math.max(0, Math.min(100, calculatedScore + 10 - Math.floor(Math.random() * 15))),
            description: "Single country or region concentration risk",
          },
          {
            name: "Commodity Driver Risk",
            score: Math.max(0, Math.min(100, calculatedScore - 5 - Math.floor(Math.random() * 10))),
            description: "How much your investments depend on commodity prices",
          },
          {
            name: "Inflation Driver Risk",
            score: Math.max(0, Math.min(100, calculatedScore - 2 + Math.floor(Math.random() * 8))),
            description: "Exposure to rising prices (CPI)",
          },
          {
            name: "Credit Risk",
            score: Math.max(0, Math.min(100, calculatedScore - 8 + Math.floor(Math.random() * 12))),
            description: "Risk from changing macro credit conditions",
          },
          {
            name: "Interest Rate Risk",
            score: Math.max(0, Math.min(100, calculatedScore + 3 - Math.floor(Math.random() * 7))),
            description: "How changing interest rates affect your investments",
          },
          {
            name: "Liquidity Risk",
            score: Math.max(0, Math.min(100, calculatedScore + 20 - Math.floor(Math.random() * 10))),
            description: "Ability to sell in active markets",
          },
          {
            name: "Growth Driver Risk",
            score: Math.max(0, Math.min(100, calculatedScore + 15 - Math.floor(Math.random() * 10))),
            description: "How your portfolio reacts to changing GDP expectations",
          },
        ],
      }
    : {
        overall: 0,
        components: [],
      }

  // Get status for a score
  const getScoreStatus = (score: number) => {
    if (score >= 70)
      return { status: "Good", color: "bg-green-500", textColor: "text-green-500", icon: <Check className="h-4 w-4" /> }
    if (score >= 40)
      return {
        status: "Fair",
        color: "bg-amber-500",
        textColor: "text-amber-500",
        icon: <AlertTriangle className="h-4 w-4" />,
      }
    return {
      status: "Poor",
      color: "bg-red-500",
      textColor: "text-red-500",
      icon: <AlertTriangle className="h-4 w-4" />,
    }
  }

  // Get overall portfolio status
  const getOverallStatus = (score: number) => {
    if (score >= 70) return { status: "Well Diversified", color: "bg-green-500" }
    if (score >= 40) return { status: "Moderately Diversified", color: "bg-amber-500" }
    return { status: "Poorly Diversified", color: "bg-red-500" }
  }

  // Get top components to show (most important ones, not necessarily the worst)
  const getTopComponents = () => {
    // For this example, we'll show the first 4 components as the most important
    return scoreData.components.slice(0, 4)
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
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0">
          {step === 1 && (
            <div className="p-6">
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

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={loading || (portfolioText.trim() === "" && !uploadedFile)}>
                  {loading ? "Analyzing..." : "Calculate Score"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </DialogFooter>
            </div>
          )}

          {step === 2 && (
            <DiversificationScoreReport
              scoreData={scoreData}
              onClose={handleClose}
              onBack={handleBack}
              skipInputStep={skipInputStep}
            />
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
                        {index === loadingStep ? (
                          <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                        ) : index < loadingStep ? (
                          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm font-medium ${index === loadingStep ? "" : "text-gray-500"}`}>
                            {step.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {index < loadingStep ? "Complete" : index === loadingStep ? "In progress" : "Pending"}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{
                              width:
                                index < loadingStep
                                  ? "100%"
                                  : index === loadingStep
                                    ? `${(Date.now() % 2000) / 20}%`
                                    : "0%",
                            }}
                          ></div>
                        </div>
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
