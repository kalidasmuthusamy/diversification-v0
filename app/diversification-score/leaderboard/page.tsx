"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Users, Calendar, ArrowLeft } from "lucide-react"
import { useDiversification } from "@/app/contexts/diversification-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock data for the leaderboard with simplified portfolio descriptions
const leaderboardData = {
  weekly: [
    {
      rank: 1,
      score: 94,
      username: "DiverseInvestor",
      date: "May 12, 2025",
      portfolio: "62 holdings across 12 asset classes",
    },
    {
      rank: 2,
      score: 92,
      username: "BalancedWealth",
      date: "May 13, 2025",
      portfolio: "48 holdings across 9 asset classes",
    },
    {
      rank: 3,
      score: 91,
      username: "GlobalAllocator",
      date: "May 10, 2025",
      portfolio: "55 holdings across 10 asset classes",
    },
    {
      rank: 4,
      score: 89,
      username: "RiskParity",
      date: "May 11, 2025",
      portfolio: "40 holdings across 8 asset classes",
    },
    {
      rank: 5,
      score: 88,
      username: "AllWeatherPro",
      date: "May 14, 2025",
      portfolio: "45 holdings across 11 asset classes",
    },
  ],
  monthly: [
    {
      rank: 1,
      score: 96,
      username: "OptimalDiversifier",
      date: "May 2, 2025",
      portfolio: "70 holdings across 14 asset classes",
    },
    {
      rank: 2,
      score: 95,
      username: "AssetAlchemist",
      date: "April 28, 2025",
      portfolio: "65 holdings across 13 asset classes",
    },
    {
      rank: 3,
      score: 94,
      username: "DiverseInvestor",
      date: "May 12, 2025",
      portfolio: "62 holdings across 12 asset classes",
    },
    {
      rank: 4,
      score: 93,
      username: "PortfolioMaster",
      date: "April 30, 2025",
      portfolio: "58 holdings across 11 asset classes",
    },
    {
      rank: 5,
      score: 92,
      username: "BalancedWealth",
      date: "May 13, 2025",
      portfolio: "48 holdings across 9 asset classes",
    },
  ],
  allTime: [
    {
      rank: 1,
      score: 98,
      username: "DiversificationGuru",
      date: "March 15, 2025",
      portfolio: "85 holdings across 16 asset classes",
    },
    {
      rank: 2,
      score: 97,
      username: "RiskOptimizer",
      date: "February 22, 2025",
      portfolio: "78 holdings across 15 asset classes",
    },
    {
      rank: 3,
      score: 96,
      username: "OptimalDiversifier",
      date: "May 2, 2025",
      portfolio: "70 holdings across 14 asset classes",
    },
    {
      rank: 4,
      score: 95,
      username: "AssetAlchemist",
      date: "April 28, 2025",
      portfolio: "65 holdings across 13 asset classes",
    },
    {
      rank: 5,
      score: 94,
      username: "DiverseInvestor",
      date: "May 12, 2025",
      portfolio: "62 holdings across 12 asset classes",
    },
  ],
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">("weekly")
  const { score } = useDiversification()

  // Determine if the user's score would rank on the leaderboard
  const userRank = score ? leaderboardData[timeframe].findIndex((entry) => score > entry.score) + 1 : null
  const wouldRank = userRank !== null && userRank <= 5

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/diversification-score">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Calculator
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">America's Most Diverse Portfolios</h1>
            <p className="text-muted-foreground">
              See how your portfolio diversification compares to the nation's best
            </p>
          </div>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                <CardTitle className="text-xl">Diversification Score Leaderboard</CardTitle>
              </div>
              <Badge variant="outline" className="bg-white border-amber-200 text-amber-700 px-2">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>30,000+ participants</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="weekly" className="w-full" onValueChange={(value) => setTimeframe(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="allTime">All Time</TabsTrigger>
              </TabsList>

              {["weekly", "monthly", "allTime"].map((period) => (
                <TabsContent key={period} value={period} className="space-y-4">
                  <div className="text-sm text-muted-foreground flex items-center justify-between mb-2">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Updated: May 14, 2025</span>
                    </span>
                    <span className="text-xs">Based on real user portfolios</span>
                  </div>

                  <div className="space-y-2">
                    {leaderboardData[period as keyof typeof leaderboardData].map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-md ${
                          index === 0
                            ? "bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200"
                            : index === 1
                              ? "bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200"
                              : index === 2
                                ? "bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
                                : "bg-white border border-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0">
                          {index === 0 ? (
                            <Trophy className="h-6 w-6 text-amber-500" />
                          ) : index === 1 ? (
                            <Medal className="h-6 w-6 text-slate-400" />
                          ) : index === 2 ? (
                            <Award className="h-6 w-6 text-amber-600" />
                          ) : (
                            <span className="font-bold text-gray-500">{entry.rank}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{entry.username}</span>
                            <Badge
                              className={`${
                                index === 0
                                  ? "bg-amber-500"
                                  : index === 1
                                    ? "bg-slate-400"
                                    : index === 2
                                      ? "bg-amber-600"
                                      : "bg-blue-500"
                              }`}
                            >
                              Score: {entry.score}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                            <span>{entry.portfolio}</span>
                            <span>{entry.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {score && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Score</span>
                        {wouldRank && (
                          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>Leaderboard Worthy!</span>
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`flex items-center p-3 rounded-md ${
                          wouldRank ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 flex-shrink-0">
                          <span className="font-bold text-blue-600">{wouldRank ? userRank : "-"}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">You</span>
                            <Badge className="bg-blue-500">Score: {score}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {wouldRank
                              ? `Your portfolio would rank #${userRank} on the ${timeframe} leaderboard!`
                              : "Keep improving your diversification to rank on the leaderboard!"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
