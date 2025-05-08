"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Check,
  AlertTriangle,
  Info,
  Bot,
  ExternalLink,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  Mail,
  Zap,
  Twitter,
  Linkedin,
  Facebook,
  HelpCircle,
  Award,
  TrendingUp,
  Shield,
  Star,
  Trophy,
  Crown,
  BarChart3,
  PieChartIcon,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts"

interface DiversificationScoreReportProps {
  scoreData: {
    overall: number
    components: {
      name: string
      score: number
      description: string
    }[]
  }
  onClose: () => void
  onBack?: () => void
  skipInputStep?: boolean
}

export default function DiversificationScoreReport({
  scoreData,
  onClose,
  onBack,
  skipInputStep = false,
}: DiversificationScoreReportProps) {
  const [showAllComponents, setShowAllComponents] = useState(false)
  const [emailForReport, setEmailForReport] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [emailSent, setEmailSent] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [animateScore, setAnimateScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  // Animate the score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 1000)

    const interval = setInterval(() => {
      setAnimateScore((prev) => {
        if (prev >= scoreData.overall) {
          clearInterval(interval)
          return scoreData.overall
        }
        return prev + 1
      })
    }, 30)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [scoreData.overall])

  // Get status for a score
  const getScoreStatus = (score: number) => {
    if (score >= 70)
      return {
        status: "Excellent",
        color: "bg-green-500",
        textColor: "text-green-500",
        icon: <Check className="h-4 w-4" />,
        gradient: "from-green-400 to-green-600",
        emoji: "🏆",
      }
    if (score >= 50)
      return {
        status: "Good",
        color: "bg-blue-500",
        textColor: "text-blue-500",
        icon: <Shield className="h-4 w-4" />,
        gradient: "from-blue-400 to-blue-600",
        emoji: "👍",
      }
    if (score >= 40)
      return {
        status: "Fair",
        color: "bg-amber-500",
        textColor: "text-amber-500",
        icon: <AlertTriangle className="h-4 w-4" />,
        gradient: "from-amber-400 to-amber-600",
        emoji: "⚠️",
      }
    return {
      status: "Needs Work",
      color: "bg-red-500",
      textColor: "text-red-500",
      icon: <AlertTriangle className="h-4 w-4" />,
      gradient: "from-red-400 to-red-600",
      emoji: "⚠️",
    }
  }

  // Get overall portfolio status
  const getOverallStatus = (score: number) => {
    if (score >= 70)
      return {
        status: "Well Diversified",
        color: "bg-green-500",
        badge: "Elite Portfolio",
        icon: <Trophy className="h-5 w-5 mr-2" />,
      }
    if (score >= 50)
      return {
        status: "Moderately Diversified",
        color: "bg-blue-500",
        badge: "Balanced Portfolio",
        icon: <Shield className="h-5 w-5 mr-2" />,
      }
    if (score >= 40)
      return {
        status: "Somewhat Diversified",
        color: "bg-amber-500",
        badge: "Developing Portfolio",
        icon: <TrendingUp className="h-5 w-5 mr-2" />,
      }
    return {
      status: "Poorly Diversified",
      color: "bg-red-500",
      badge: "High Risk Portfolio",
      icon: <AlertTriangle className="h-5 w-5 mr-2" />,
    }
  }

  // Get top components to show (most important ones, not necessarily the worst)
  const getTopComponents = () => {
    // For this example, we'll show the first 4 components as the most important
    return scoreData.components.slice(0, 4)
  }

  const handleSendReport = () => {
    // Simulate sending email
    setEmailSent(true)
    setTimeout(() => {
      setEmailSent(false)
      setEmailForReport("")
    }, 3000)
  }

  // Benchmark comparison data
  const benchmarkData = {
    average: 62,
    topQuartile: 78,
    bottomQuartile: 45,
  }

  // Prepare data for pie chart
  const pieData = [
    { name: "Stocks", value: 45, color: "#4f46e5" },
    { name: "Bonds", value: 25, color: "#0ea5e9" },
    { name: "Real Estate", value: 15, color: "#10b981" },
    { name: "Alternatives", value: 10, color: "#f59e0b" },
    { name: "Cash", value: 5, color: "#6b7280" },
  ]

  // Prepare data for bar chart
  const barData = scoreData.components.slice(0, 6).map((component) => ({
    name: component.name.split(" ")[0], // Just take the first word for brevity
    score: component.score,
    fullName: component.name,
  }))

  // Get achievement level based on score
  const getAchievementLevel = (score: number) => {
    if (score >= 85) return { level: "Platinum", icon: <Crown className="h-5 w-5" /> }
    if (score >= 70) return { level: "Gold", icon: <Trophy className="h-5 w-5" /> }
    if (score >= 55) return { level: "Silver", icon: <Award className="h-5 w-5" /> }
    return { level: "Bronze", icon: <Star className="h-5 w-5" /> }
  }

  const achievement = getAchievementLevel(scoreData.overall)
  const overallStatus = getOverallStatus(scoreData.overall)

  return (
    <div className="flex flex-col">
      {/* Header with Share button */}
      <div className="p-6 border-b relative bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 flex items-center">
              Your Diversification Score
              {scoreData.overall >= 70 && <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />}
            </h2>
            <p className="text-sm text-blue-700 mt-1">
              Based on your portfolio, we've analyzed your diversification across multiple risk factors.
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-white border-blue-200 hover:bg-blue-50"
              onClick={() => setShowShareOptions(!showShareOptions)}
            >
              <Share2 className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">Share Results</span>
            </Button>

            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start mb-1 text-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PDF
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start mb-1 text-blue-700">
                    <Twitter className="h-4 w-4 mr-2" />
                    Share on Twitter
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start mb-1 text-blue-700">
                    <Linkedin className="h-4 w-4 mr-2" />
                    Share on LinkedIn
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-blue-700">
                    <Facebook className="h-4 w-4 mr-2" />
                    Share on Facebook
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 text-xs text-blue-600 p-1 font-medium">
          Powered by <span className="font-bold text-blue-700">PortfolioPilot.com</span>
        </div>
      </div>

      {/* Tabs for different views */}
      <div className="border-b">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Details</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Compare</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            {/* Score Overview */}
            <div className="p-6 flex flex-col items-center border-b bg-gradient-to-b from-white to-blue-50">
              <div className="mb-2 relative">
                {/* Achievement Badge */}
                <div className="absolute -top-4 -right-4 z-10">
                  <div
                    className={`rounded-full p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg transform rotate-12`}
                  >
                    {achievement.icon}
                  </div>
                </div>

                {/* Score Circle */}
                <div className="relative">
                  <svg className="w-48 h-48">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="text-gray-200 stroke-current"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                    />
                    <circle
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (animateScore / 100) * 440}
                      strokeLinecap="round"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-blue-700">{animateScore}</span>
                    <span className="text-sm text-blue-600 font-medium">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-2 mb-4">
                <Badge className={`px-4 py-1.5 text-sm font-medium text-white ${overallStatus.color} shadow-md`}>
                  {overallStatus.icon}
                  {overallStatus.status}
                </Badge>
              </div>

              {/* Achievement Level */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div
                  className={`rounded-full p-2 ${scoreData.overall >= 70 ? "bg-yellow-500" : "bg-blue-500"} text-white`}
                >
                  {achievement.icon}
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-medium">Achievement Level</p>
                  <p className="text-lg font-bold text-blue-900">{achievement.level}</p>
                </div>
              </div>

              {/* Comparison to Average */}
              <div className="w-full mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-700">Your Score</span>
                  <span className="text-blue-700">Average Investor: {benchmarkData.average}</span>
                </div>
                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gray-400 opacity-30"
                    style={{ width: `${benchmarkData.average}%` }}
                  ></div>
                  <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{ width: `${animateScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4 flex items-center text-blue-900">
                <PieChartIcon className="h-4 w-4 mr-1 text-blue-600" />
                Your Asset Allocation
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="space-y-3">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <div className="text-sm text-gray-700">{item.name}</div>
                        <div className="text-sm font-medium ml-auto">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Components */}
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4 flex items-center text-blue-900">
                <Zap className="h-4 w-4 mr-1 text-blue-600" />
                Key Diversification Components
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getTopComponents().map((component, index) => {
                  const status = getScoreStatus(component.score)
                  return (
                    <Card key={index} className="overflow-hidden border-0 shadow-md">
                      <div className={`h-1 w-full bg-gradient-to-r ${status.gradient}`}></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <h4 className="font-medium text-sm flex items-center cursor-help text-blue-800">
                                  {component.name}
                                  <HelpCircle className="h-3.5 w-3.5 ml-1 text-blue-400" />
                                </h4>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm max-w-xs">{component.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Badge variant="outline" className={`${status.textColor} border-current`}>
                            {status.icon}
                            <span className="ml-1">{status.status}</span>
                          </Badge>
                        </div>
                        <Progress value={component.score} className="h-2" indicatorClassName={status.color} />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0</span>
                          <span className="text-xs text-gray-500">100</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Show More/Less Components */}
              <Collapsible open={showAllComponents} onOpenChange={setShowAllComponents} className="mt-4">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex justify-center items-center mt-4 border-blue-200 text-blue-700"
                  >
                    {showAllComponents ? "Show Less" : "Show All Components"}
                    {showAllComponents ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {scoreData.components.slice(4).map((component, index) => {
                      const status = getScoreStatus(component.score)
                      return (
                        <Card key={index} className="overflow-hidden border-0 shadow-md">
                          <div className={`h-1 w-full bg-gradient-to-r ${status.gradient}`}></div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <h4 className="font-medium text-sm flex items-center cursor-help text-blue-800">
                                      {component.name}
                                      <HelpCircle className="h-3.5 w-3.5 ml-1 text-blue-400" />
                                    </h4>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-sm max-w-xs">{component.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Badge variant="outline" className={`${status.textColor} border-current`}>
                                {status.icon}
                                <span className="ml-1">{status.status}</span>
                              </Badge>
                            </div>
                            <Progress value={component.score} className="h-2" indicatorClassName={status.color} />
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">0</span>
                              <span className="text-xs text-gray-500">100</span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4 flex items-center text-blue-900">
                <BarChart3 className="h-4 w-4 mr-1 text-blue-600" />
                Component Breakdown
              </h3>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <RechartsTooltip
                      formatter={(value: number, name: string) => [`Score: ${value}`, ""]}
                      labelFormatter={(label) => barData.find((item) => item.name === label)?.fullName || label}
                    />
                    <Bar dataKey="score" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-4">
                {scoreData.components.map((component, index) => {
                  const status = getScoreStatus(component.score)
                  return (
                    <div key={index} className="border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-blue-800">{component.name}</h4>
                        <Badge className={`${status.color} text-white`}>
                          {component.score} {status.emoji}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                      <Progress value={component.score} className="h-2.5" indicatorClassName={status.color} />
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compare">
            <div className="p-6 border-b">
              <h3 className="font-medium mb-4 flex items-center text-blue-900">
                <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />
                How You Compare
              </h3>

              <div className="space-y-6">
                {/* Comparison to Average */}
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Average Investor</h4>
                    <div className="relative h-8 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="absolute h-full bg-gray-300 flex items-center justify-center text-xs font-medium"
                        style={{ width: `${benchmarkData.average}%` }}
                      >
                        {benchmarkData.average}
                      </div>
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-medium text-white"
                        style={{ width: `${scoreData.overall}%` }}
                      >
                        {scoreData.overall}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        You are {scoreData.overall > benchmarkData.average ? "outperforming" : "underperforming"} the
                        average investor by {Math.abs(scoreData.overall - benchmarkData.average)} points
                      </span>
                      <span className="font-medium">{scoreData.overall > benchmarkData.average ? "👍" : "👎"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison to Top Quartile */}
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600"></div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-green-800 mb-2">Top 25% of Investors</h4>
                    <div className="relative h-8 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="absolute h-full bg-green-200 flex items-center justify-center text-xs font-medium"
                        style={{ width: `${benchmarkData.topQuartile}%` }}
                      >
                        {benchmarkData.topQuartile}
                      </div>
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-medium text-white"
                        style={{ width: `${scoreData.overall}%` }}
                      >
                        {scoreData.overall}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        You are {scoreData.overall > benchmarkData.topQuartile ? "outperforming" : "underperforming"}{" "}
                        the top 25% by {Math.abs(scoreData.overall - benchmarkData.topQuartile)} points
                      </span>
                      <span className="font-medium">{scoreData.overall > benchmarkData.topQuartile ? "🏆" : "📈"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison to Bottom Quartile */}
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-amber-800 mb-2">Bottom 25% of Investors</h4>
                    <div className="relative h-8 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="absolute h-full bg-amber-200 flex items-center justify-center text-xs font-medium"
                        style={{ width: `${benchmarkData.bottomQuartile}%` }}
                      >
                        {benchmarkData.bottomQuartile}
                      </div>
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-medium text-white"
                        style={{ width: `${scoreData.overall}%` }}
                      >
                        {scoreData.overall}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        You are {scoreData.overall > benchmarkData.bottomQuartile ? "outperforming" : "underperforming"}{" "}
                        the bottom 25% by {Math.abs(scoreData.overall - benchmarkData.bottomQuartile)} points
                      </span>
                      <span className="font-medium">
                        {scoreData.overall > benchmarkData.bottomQuartile ? "💪" : "⚠️"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Report Section */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center text-blue-900">
            <Mail className="h-4 w-4 mr-1 text-blue-600" />
            Get Your Detailed Report
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={emailForReport}
            onChange={(e) => setEmailForReport(e.target.value)}
            disabled={emailSent}
            className="flex-1 border-blue-200 focus-visible:ring-blue-500"
          />
          <Button
            onClick={handleSendReport}
            disabled={!emailForReport || emailSent}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700"
          >
            {emailSent ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Report Sent!
              </>
            ) : (
              "Send Report"
            )}
          </Button>
        </div>

        <div className="flex items-start space-x-2 mt-3">
          <Checkbox
            id="newsletter"
            checked={subscribeNewsletter}
            onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
            disabled={emailSent}
            className="text-blue-600 border-blue-300"
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="newsletter" className="text-xs text-blue-700">
              Subscribe to our newsletter for diversification tips
            </Label>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-100 border-b">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 flex-shrink-0 shadow-md">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-800">Get Personalized Recommendations</h4>
            <p className="text-sm text-blue-700 mt-1 mb-3">
              Unlock a full portfolio assessment including benchmarking against similar investors, personalized
              improvement strategies, and specific investment recommendations.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
              Get Free Portfolio Assessment
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="p-6 bg-gray-50">
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full flex justify-between text-blue-700">
              <span className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-1" />
                How We Calculate Your Score
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                Your Diversification Score is calculated using PortfolioPilot's proprietary algorithm that evaluates
                your portfolio across 10 key dimensions. The score ranges from 0-100, with higher scores indicating
                better diversification.
              </p>
              <p className="mb-2">We analyze your holdings across multiple risk factors including:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Asset class allocation (stocks, bonds, alternatives)</li>
                <li>Sector and industry exposure</li>
                <li>Geographic distribution</li>
                <li>Sensitivity to economic factors (inflation, interest rates)</li>
                <li>Concentration risk and correlation between holdings</li>
              </ul>
              <p>
                This analysis is for educational purposes only and should not be considered investment advice. For a
                complete assessment, including personalized recommendations, visit PortfolioPilot.com.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="p-6 border-t">
        <div className="flex justify-end gap-4">
          {!skipInputStep && onBack && (
            <Button variant="outline" onClick={onBack} className="border-blue-200 text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </div>
      </div>

      {/* Confetti effect for high scores */}
      {showConfetti && scoreData.overall >= 70 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* This would be where we'd add a confetti animation library in a real implementation */}
          <div className="absolute top-10 left-1/4 animate-ping delay-100 text-2xl">🎉</div>
          <div className="absolute top-20 left-1/2 animate-ping delay-300 text-2xl">🏆</div>
          <div className="absolute top-15 right-1/4 animate-ping delay-500 text-2xl">✨</div>
          <div className="absolute top-30 left-1/3 animate-ping delay-700 text-2xl">🎊</div>
        </div>
      )}
    </div>
  )
}
