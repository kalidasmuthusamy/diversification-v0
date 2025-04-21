"use client"

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
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

// Alternative investment data
const investments = [
  {
    id: 1,
    name: "Private Real Estate",
    platform: "Fundrise",
    category: "Real Estate",
    description: "Fractional ownership in a diversified portfolio of private real estate assets across the US.",
    minInvestment: "$10",
    rating: 4.8,
    marketCorrelation: 0.3,
    riskLevel: 3,
    returnPotential: "8-12%",
    liquidityLevel: 2,
    accreditedOnly: false,
    logo: "/fundrise-growth.png",
    tags: ["Passive Income", "Tax Benefits", "Inflation Hedge"],
    performance: [4.2, 5.1, 7.8, 9.2, 8.7, 10.3, 9.8],
    pros: ["Low minimum investment", "Quarterly liquidity options", "Diversified across markets"],
    cons: ["Early redemption penalties", "Returns can vary by market", "Not FDIC insured"],
    icon: Building,
  },
  {
    id: 2,
    name: "Blue-Chip Art",
    platform: "Masterworks",
    category: "Art",
    description: "Invest in shares of iconic artwork by world-renowned artists like Banksy, Basquiat, and Warhol.",
    minInvestment: "$1,000",
    rating: 4.6,
    marketCorrelation: 0.1,
    riskLevel: 4,
    returnPotential: "9-15%",
    liquidityLevel: 2,
    accreditedOnly: false,
    logo: "/art-gallery-showcase.png",
    tags: ["Tangible Asset", "Cultural Value", "Inflation Hedge"],
    performance: [5.9, 7.2, 9.8, 14.2, 11.7, 13.3, 14.8],
    pros: ["Historical 14% annual returns", "Secondary market available", "Zero correlation to stocks"],
    cons: ["Longer investment horizon", "Highly selective curation", "Success depends on art market trends"],
    icon: Palette,
  },
  {
    id: 3,
    name: "Multi-Asset Alternative Portfolio",
    platform: "Yieldstreet",
    category: "Alternative Assets",
    description: "Diversified portfolio across private credit, real estate, art, and other alternative assets.",
    minInvestment: "$2,500",
    rating: 4.5,
    marketCorrelation: 0.2,
    riskLevel: 4,
    returnPotential: "7-15%",
    liquidityLevel: 1,
    accreditedOnly: true,
    logo: "/yieldstreet-alternative-investments.png",
    tags: ["Portfolio Diversification", "Private Markets", "Income Generation"],
    performance: [6.5, 8.2, 7.8, 9.2, 10.7, 8.3, 9.8],
    pros: ["Professional due diligence", "Access to institutional-quality investments", "Quarterly distributions"],
    cons: ["Accredited investors only", "Limited liquidity", "Complex investment structures"],
    icon: Briefcase,
  },
  {
    id: 4,
    name: "Fine Wine Portfolio",
    platform: "Vinovest",
    category: "Wine",
    description:
      "Curated portfolio of investment-grade wines stored in optimal conditions and authenticated by experts.",
    minInvestment: "$1,000",
    rating: 4.3,
    marketCorrelation: 0.05,
    riskLevel: 3,
    returnPotential: "8-12%",
    liquidityLevel: 2,
    accreditedOnly: false,
    logo: "/vinovest-wine-cellar.png",
    tags: ["Consumable Asset", "Scarcity Value", "Portfolio Diversifier"],
    performance: [5.5, 7.2, 9.8, 10.2, 8.7, 11.3, 10.8],
    pros: ["Outperformed S&P 500 over 30 years", "Insured storage", "Can sell anytime"],
    cons: ["Storage fees apply", "Requires patience", "Market knowledge helpful"],
    icon: Wine,
  },
  {
    id: 5,
    name: "US Farmland",
    platform: "FarmTogether",
    category: "Farmland",
    description: "Direct ownership in US farmland with both income from crop yields and land appreciation potential.",
    minInvestment: "$15,000",
    rating: 4.7,
    marketCorrelation: 0.1,
    riskLevel: 2,
    returnPotential: "7-13%",
    liquidityLevel: 1,
    accreditedOnly: true,
    logo: "/vibrant-community-farm.png",
    tags: ["Essential Asset", "Sustainable", "Inflation Protection"],
    performance: [6.5, 7.2, 8.8, 9.2, 10.7, 9.3, 8.8],
    pros: ["Historically stable returns", "Income + appreciation", "ESG investment option"],
    cons: ["Higher minimum investment", "Long hold periods", "Weather and commodity risks"],
    icon: TreePine,
  },
  {
    id: 6,
    name: "Rare Collectibles",
    platform: "Rally",
    category: "Collectibles",
    description:
      "Fractional ownership in rare collectibles including vintage cars, watches, sports memorabilia, and more.",
    minInvestment: "$50",
    rating: 4.2,
    marketCorrelation: 0.1,
    riskLevel: 4,
    returnPotential: "10-20%",
    liquidityLevel: 2,
    accreditedOnly: false,
    logo: "/eclectic-collection-display.png",
    tags: ["Passion Assets", "Cultural Value", "Micro Investments"],
    performance: [8.5, 12.2, 15.8, 9.2, 18.7, 11.3, 14.8],
    pros: ["Low entry point", "Trading windows", "Tangible assets"],
    cons: ["Highly speculative", "Market-dependent liquidity", "Condition/authenticity risks"],
    icon: Gem,
  },
]

export default function AlternativeInvestmentsPage() {
  const [filteredInvestments, setFilteredInvestments] = useState(investments)
  const [sortBy, setSortBy] = useState("rating")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRiskLevel, setFilterRiskLevel] = useState("all")
  const [filterMinInvestment, setFilterMinInvestment] = useState(100000)
  const [filterAccredited, setFilterAccredited] = useState("all")
  const [filterLiquidity, setFilterLiquidity] = useState("all")

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
        results.sort((a, b) => b.rating - a.rating)
        break
      case "correlation":
        results.sort((a, b) => a.marketCorrelation - b.marketCorrelation)
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
  }, [filterCategory, filterRiskLevel, filterMinInvestment, filterAccredited, filterLiquidity, sortBy])

  // Get icon for category
  const getCategoryIcon = (category: string) => {
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

  return (
    <div className="container py-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Diversification Marketplace
            </h1>
            <p className="text-gray-600 mt-1">
              Unlock exclusive investment opportunities that most portfolios are missing
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-sm text-blue-600 cursor-help">
                    <Info className="h-4 w-4" />
                    <span>Affiliate Disclosure</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Diversification.com may receive compensation from investment platforms if you open an account. This
                    does not influence our evaluations or recommendations.
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Asset Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Wine">Wine</SelectItem>
                  <SelectItem value="Farmland">Farmland</SelectItem>
                  <SelectItem value="Collectibles">Collectibles</SelectItem>
                  <SelectItem value="Alternative Assets">Multi-Asset</SelectItem>
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
                  <SelectItem value="non-accredited">Non-Accredited Only</SelectItem>
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
          <div className="text-sm text-gray-600">
            Showing {filteredInvestments.length} of {investments.length} investments
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestments.map((investment) => (
            <Card key={investment.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex justify-between items-start border-b">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <investment.icon className="h-6 w-6 text-gray-600" />
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
                  {getCategoryIcon(investment.category)}
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
                    <span className="font-medium ml-1">{investment.marketCorrelation * 100}%</span>
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
                    <span className="text-gray-500">Target Returns:</span>
                    <span className="font-medium ml-1">{investment.returnPotential}</span>
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
                <Button size="sm">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
              <h2 className="text-2xl font-bold mb-2">Is Your Portfolio Missing These Opportunities?</h2>
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
                  <span>Get personalized diversification recommendations</span>
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
    </div>
  )
}
