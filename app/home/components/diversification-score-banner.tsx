"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Share2, Twitter, Facebook, Mail, Copy, Check, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DiversificationScoreBannerProps {
  score: number
  lastCalculated?: string
}

export function DiversificationScoreBanner({ score, lastCalculated = "2 weeks ago" }: DiversificationScoreBannerProps) {
  const [copied, setCopied] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Strong"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `My portfolio diversification score is ${score}/100 on diversification.com! How well is your portfolio protected against market volatility?`,
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden border shadow">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Your Diversification Journey</h3>
          <span className="text-xs text-blue-100">Last calculated: {lastCalculated}</span>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Score section */}
          <div className="p-4 md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="relative">
              <svg className="w-28 h-28">
                <circle
                  className="text-gray-100 stroke-current"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="55"
                  cy="55"
                />
                <circle
                  className={`${getScoreBackground(score)} stroke-current`}
                  strokeWidth="8"
                  strokeDasharray={315}
                  strokeDashoffset={315 - (score / 100) * 315}
                  strokeLinecap="round"
                  fill="transparent"
                  r="50"
                  cx="55"
                  cy="55"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                <span className="text-xs text-gray-500">out of 100</span>
              </div>
            </div>
            <div className={`mt-2 text-sm font-medium ${getScoreColor(score)}`}>
              {getScoreLabel(score)} Diversification
            </div>
          </div>

          {/* Message section */}
          <div className="p-4 md:w-2/3">
            <h4 className="font-medium text-gray-900 mb-2">Diversification is a journey, not a destination</h4>
            <p className="text-sm text-gray-600 mb-3">
              Your score of {score} shows you're on the path to building a resilient portfolio. Remember that true
              diversification goes beyond simple asset allocation—it's about creating a portfolio that can weather
              various market conditions.
            </p>

            <div className="bg-blue-50 p-3 rounded-md mb-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Our mission:</span> To empower investors with the knowledge and tools to
                build truly diversified portfolios that can withstand market volatility while achieving long-term
                growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/diversification">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                  Recalculate Score
                  <RefreshCw className="ml-1 h-3 w-3" />
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Share Score
                    <Share2 className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <Twitter className="h-4 w-4 text-blue-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share on Twitter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <Facebook className="h-4 w-4 text-blue-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share on Facebook</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <Mail className="h-4 w-4 text-gray-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share via Email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={copyToClipboard}
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-600" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </PopoverContent>
              </Popover>

              <Link href="/education/diversification">
                <Button variant="link" size="sm" className="text-blue-600">
                  Learn more about diversification
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
