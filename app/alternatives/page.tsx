"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Building,
  Wine,
  Briefcase,
  Gem,
  TreePine,
  Palette,
  Shield,
  Star,
  HelpCircle,
  ChevronLeft,
  Bitcoin,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import investmentData from "./data/investments.json"
import { generateAdditionalInvestments } from "./utils/investment-generator"
import type { Investment } from "./types/investment"

// Map icon strings to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  Building: <Building className="h-6 w-6 text-gray-600" />,
  Palette: <Palette className="h-6 w-6 text-gray-600" />,
  Briefcase: <Briefcase className="h-6 w-6 text-gray-600" />,
  Wine: <Wine className="h-6 w-6 text-gray-600" />,
  TreePine: <TreePine className="h-6 w-6 text-gray-600" />,
  Gem: <Gem className="h-6 w-6 text-gray-600" />,
  BarChart3: <BarChart3 className="h-6 w-6 text-gray-600" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-gray-600" />,
  Bitcoin: <Bitcoin className="h-6 w-6 text-gray-600" />,
}

// Get icon component for category
const getCategoryIcon = (iconName: string) => {
  return iconMap[iconName] || <Briefcase className="h-4 w-4" />
}

// Get small icon for category
const getSmallCategoryIcon = (category: string) => {
  switch (category) {
    case "Real Estate":
      return <Building className="h-4 w-4" />
    case "Art":
      return <Palette className="h-4 w-4" />
    case "Wine":
      return <Wine className="h-4 w-4" />
    case "Farmland":
      return <TreePine className="h-4 w-4" />
    case "Collectibles":
      return <Gem className="h-4 w-4" />
    case "Alternative Assets":
      return <Briefcase className="h-4 w-4" />
    default:
      return <Briefcase className="h-4 w-4" />
  }
}

export default function AlternativeInvestmentsPage() {
  // Generate all investments by combining base investments with additional ones
  const [investments, setInvestments] = useState<Investment[]>([])
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRiskLevel, setFilterRiskLevel] = useState("all")
  const [filterMinInvestment, setFilterMinInvestment] = useState(100000)
  const [filterAccredited, setFilterAccredited] = useState("all")
  const [filterLiquidity, setFilterLiquidity] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const investmentsPerPage = 9

  // Initialize investments on component mount
  useEffect(() => {
    const baseInvestments = investmentData.baseInvestments as Investment[]
    const additionalInvestments = generateAdditionalInvestments(
      baseInvestments,
      investmentData.categories,
      investmentData.platforms,
      investmentData.correlations,
    )
    const allInvestments = [...baseInvestments, ...additionalInvestments]
    setInvestments(allInvestments)
    setFilteredInvestments(allInvestments)
  }, [])

  // Filter and sort investments based on user selections
  useEffect(() => {
    let results = [...investments]

    // Apply category filter
    if (filterCategory !== "all") {
      results = results.filter((investment) => investment.category === filterCategory)
    }

    // Apply risk level filter
    if (filterRiskLevel !== "all") {
      results = results.filter((investment) => investment.riskLevel === Number.parseInt(filterRiskLevel))
    }

    // Apply minimum investment filter
    results = results.filter((investment) => {
      const value = Number.parseInt(investment.minInvestment.replace(/\D/g, ""), 10) || 0
      return value <= filterMinInvestment
    })

    // Apply accredited filter
    if (filterAccredited !== "all") {
      const isAccreditedOnly = filterAccredited === "accredited"
      results = results.filter((investment) => investment.accreditedOnly === isAccreditedOnly)
    }

    // Apply liquidity filter
    if (filterLiquidity !== "all") {
      results = results.filter((investment) => investment.liquidityLevel === Number.parseInt(filterLiquidity))
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => Number.parseFloat(b.rating.toString()) - Number.parseFloat(a.rating.toString()))
        break
      case "correlation":
        const correlationOrder = { "Very Low": 0, Low: 1, Medium: 2, High: 3 }
        results.sort(
          (a, b) =>
            correlationOrder[a.marketCorrelation as keyof typeof correlationOrder] -
            correlationOrder[b.marketCorrelation as keyof typeof correlationOrder],
        )
        break
      case "minInvestment":
        results.sort((a, b) => {
          const aValue = Number.parseInt(a.minInvestment.replace(/\D/g, ""), 10) || 0
          const bValue = Number.parseInt(b.minInvestment.replace(/\D/g, ""), 10) || 0
          return aValue - bValue
        })
        break
    }

    setFilteredInvestments(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filterCategory, filterRiskLevel, filterMinInvestment, filterAccredited, filterLiquidity, sortBy, investments])

  // Handle learn more button click
  const handleLearnMore = (investment: Investment) => {
    setSelectedInvestment(investment)
    setShowWarningDialog(true)
  }

  // Calculate pagination
  const indexOfLastInvestment = currentPage * investmentsPerPage
  const indexOfFirstInvestment = indexOfLastInvestment - investmentsPerPage
  const currentInvestments = filteredInvestments.slice(indexOfFirstInvestment, indexOfLastInvestment)
  const totalPages = Math.ceil(filteredInvestments.length / investmentsPerPage)

  return (
    <div className="container py-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Alternatives Marketplace
            </h1>
            <p className="text-gray-600 mt-1">
              Discover alternative investment opportunities to diversify your portfolio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-sm text-blue-600 cursor-help">
                    <Info className="h-4 w-4" />
                    <span>Disclosure</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p className="text-xs mb-2">
                    Information presented here is for educational purposes only. Performance data and risk
                    classifications are based on historical data and may not predict future results.
                  </p>
                  <p className="text-xs">
                    Alternative investments typically involve higher risks and fees than traditional investments and may
                    have limited liquidity. They are not suitable for all investors. Carefully review all offering
                    documents before investing.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <p className="text-sm text-center">
            <strong>Note:</strong> diversification.com does not receive compensation from any of the listed companies.
            This marketplace is provided for educational purposes only.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <CardContent className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Investments</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  <span>How We Measure</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Our Measurement Methodology</DialogTitle>
                  <DialogDescription>Understanding how we evaluate alternative investments</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <h4 className="text-sm font-medium">Market Correlation</h4>
                  <p className="text-sm text-muted-foreground">
                    Market correlation measures how closely an investment's returns move in relation to traditional
                    market indices like the S&P 500:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Very Low:</strong> Correlation coefficient below 0.2
                    </li>
                    <li>
                      <strong>Low:</strong> Correlation coefficient between 0.2 and 0.4
                    </li>
                    <li>
                      <strong>Medium:</strong> Correlation coefficient between 0.4 and 0.7
                    </li>
                    <li>
                      <strong>High:</strong> Correlation coefficient above 0.7
                    </li>
                  </ul>

                  <h4 className="text-sm font-medium">Risk Level</h4>
                  <p className="text-sm text-muted-foreground">
                    Risk levels are determined by analyzing historical volatility, liquidity constraints, and potential
                    for capital loss:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Level 1 (Very Low):</strong> Minimal volatility, strong capital preservation
                    </li>
                    <li>
                      <strong>Level 2 (Low):</strong> Below-average volatility, good capital preservation
                    </li>
                    <li>
                      <strong>Level 3 (Medium):</strong> Average volatility, moderate risk of capital loss
                    </li>
                    <li>
                      <strong>Level 4 (High):</strong> Above-average volatility, significant risk of capital loss
                    </li>
                    <li>
                      <strong>Level 5 (Very High):</strong> High volatility, potential for substantial capital loss
                    </li>
                  </ul>

                  <h4 className="text-sm font-medium">Minimum Investment</h4>
                  <p className="text-sm text-muted-foreground">
                    The minimum investment represents the smallest amount required to participate in the investment
                    opportunity. This is based on platform requirements and may change over time.
                  </p>

                  <div className="bg-muted p-3 rounded-md mt-4">
                    <p className="text-xs text-muted-foreground">
                      Note: All measurements are based on historical data and industry research. Past performance is not
                      indicative of future results. These classifications are for educational purposes only.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Asset Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {investmentData.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterRiskLevel} onValueChange={setFilterRiskLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Risk Level</SelectItem>
                  <SelectItem value="1">Very Low Risk</SelectItem>
                  <SelectItem value="2">Low Risk</SelectItem>
                  <SelectItem value="3">Medium Risk</SelectItem>
                  <SelectItem value="4">High Risk</SelectItem>
                  <SelectItem value="5">Very High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterAccredited} onValueChange={setFilterAccredited}>
                <SelectTrigger>
                  <SelectValue placeholder="Investor Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Investors</SelectItem>
                  <SelectItem value="accredited">Accredited Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterLiquidity} onValueChange={setFilterLiquidity}>
                <SelectTrigger>
                  <SelectValue placeholder="Liquidity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Liquidity</SelectItem>
                  <SelectItem value="1">Very Low</SelectItem>
                  <SelectItem value="2">Low</SelectItem>
                  <SelectItem value="3">Medium</SelectItem>
                  <SelectItem value="4">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="correlation">Lowest Market Correlation</SelectItem>
                  <SelectItem value="minInvestment">Lowest Minimum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Maximum Investment: ${filterMinInvestment.toLocaleString()}</label>
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setFilterMinInvestment(100000)}>
                Reset
              </Button>
            </div>
            <Slider
              value={[filterMinInvestment]}
              min={10}
              max={100000}
              step={10}
              onValueChange={(value) => setFilterMinInvestment(value[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$10</span>
              <span>$1,000</span>
              <span>$10,000</span>
              <span>$100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Explore Alternative Investments</h2>
          <div className="text-sm text-gray-600">Showing {filteredInvestments.length} investments</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentInvestments.map((investment) => (
            <Card key={investment.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex justify-between items-start border-b">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {getCategoryIcon(investment.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{investment.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">via</span>
                      <span className="font-medium">{investment.platform}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-100 rounded px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                    <span className="text-sm font-medium">{investment.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  {getSmallCategoryIcon(investment.category)}
                  <Badge variant="outline">{investment.category}</Badge>
                  {investment.accreditedOnly && (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Accredited only
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{investment.description}</p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Min Investment:</span>
                    <span className="font-medium ml-1">{investment.minInvestment}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Market Correlation:</span>
                    <span className="font-medium ml-1">{investment.marketCorrelation}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Risk Level:</span>
                    <span className="font-medium ml-1">
                      {investment.riskLevel === 1
                        ? "Very Low"
                        : investment.riskLevel === 2
                          ? "Low"
                          : investment.riskLevel === 3
                            ? "Medium"
                            : investment.riskLevel === 4
                              ? "High"
                              : "Very High"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Liquidity:</span>
                    <span className="font-medium ml-1">
                      {investment.liquidityLevel === 1
                        ? "Very Low"
                        : investment.liquidityLevel === 2
                          ? "Low"
                          : investment.liquidityLevel === 3
                            ? "Medium"
                            : "High"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {investment.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-t p-4 flex justify-end">
                <Button size="sm" onClick={() => handleLearnMore(investment)}>
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1">Previous</span>
            </Button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Educational Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Why Diversify with Alternatives?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Reduced Correlation</h3>
              <p className="text-gray-600 text-sm">
                Alternative investments often move independently from traditional markets, helping to smooth out
                portfolio volatility and provide protection during market downturns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Enhanced Returns</h3>
              <p className="text-gray-600 text-sm">
                Many alternative assets have historically delivered competitive returns compared to traditional
                investments, potentially improving your portfolio's overall performance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Inflation Protection</h3>
              <p className="text-gray-600 text-sm">
                Tangible assets like real estate, art, and commodities often serve as effective hedges against
                inflation, preserving purchasing power over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Improve Your Portfolio Diversification</h2>
              <p className="mb-4 opacity-90">
                Discover how well-diversified your current investments are and identify opportunities to strengthen your
                portfolio with our free Diversification Score tool.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Analyze correlation between your holdings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Identify concentration risks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span>Get personalized diversification recommendations (via PortfolioPilot.com)</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold mb-3 text-white">Calculate Your Diversification Score</h3>
              <p className="text-sm opacity-90 mb-4">
                Enter your portfolio holdings to receive a comprehensive diversification analysis and personalized
                recommendations.
              </p>
              <Button asChild className="w-full bg-white text-blue-700 hover:bg-white/90">
                <a href="https://portfoliopilot.com/signup" target="_blank" rel="noopener noreferrer">
                  Try Our Diversification Calculator
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Important Risk Warning</span>
            </DialogTitle>
            <DialogDescription>Please read before proceeding</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <p className="text-sm text-amber-800 mb-2">
                <strong>Alternative investments involve significant risks:</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
                <li>Higher risk of loss compared to traditional investments</li>
                <li>Limited liquidity - your money may be locked up for extended periods</li>
                <li>Less regulatory oversight and transparency</li>
                <li>Often require higher fees and investment minimums</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600">
              Diversification.com does not endorse or recommend any specific investment or platform. We do not verify
              the claims made by these platforms and receive no compensation for listing them.
            </p>

            <p className="text-sm text-gray-600">
              You should always conduct your own research and consider consulting with a financial advisor before
              investing.
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setShowWarningDialog(false)
                // In a real implementation, this would redirect to the platform's website
                window.open(`https://${selectedInvestment?.platform.toLowerCase().replace(/\s+/g, "")}.com`, "_blank")
              }}
              className="flex items-center gap-2"
            >
              I Understand
              <ExternalLink className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
