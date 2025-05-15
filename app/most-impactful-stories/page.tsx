"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, AlertTriangle, DollarSign, BarChart3, Lightbulb, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function MostImpactfulStoriesPage() {
  const [email, setEmail] = useState("")
  const [frequency, setFrequency] = useState({
    daily: true,
    weekly: true,
  })

  const handleFrequencyChange = (type: "daily" | "weekly") => {
    setFrequency((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thanks for subscribing!")
    setEmail("")
  }

  const topFiveItems = [
    {
      title: "Fed signals potential rate cut in September",
      category: "Macro",
      impact: "High",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-800",
      description:
        "Federal Reserve officials have indicated they are prepared to cut interest rates at their September meeting if inflation continues to cool, according to minutes from their latest policy meeting. This potential shift in monetary policy comes as economic data shows inflation moderating while labor market conditions remain relatively strong.",
      source: "Wall Street Journal",
      sourceUrl: "#",
    },
    {
      title: "Tech earnings beat expectations across the board",
      category: "Equities",
      impact: "High",
      icon: <BarChart3 className="h-4 w-4" />,
      color: "bg-green-100 text-green-800",
      description:
        "Major technology companies have reported quarterly earnings that exceeded analyst expectations, driven by strong cloud computing growth and increased enterprise spending on digital transformation initiatives. The results suggest continued resilience in the tech sector despite broader economic concerns.",
      source: "Bloomberg",
      sourceUrl: "#",
    },
    {
      title: "Oil prices surge amid Middle East tensions",
      category: "Commodities",
      impact: "Medium",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-800",
      description:
        "Crude oil prices have risen sharply as geopolitical tensions in the Middle East escalate, raising concerns about potential supply disruptions. The price increase comes despite efforts by major oil-producing countries to stabilize the market through production adjustments.",
      source: "Reuters",
      sourceUrl: "#",
    },
    {
      title: "Bitcoin breaks $70k resistance level",
      category: "Crypto",
      impact: "Medium",
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-800",
      description:
        "Bitcoin has surpassed the $70,000 resistance level, reaching a new all-time high amid increased institutional adoption and growing interest in cryptocurrency as a portfolio diversification tool. The move comes as traditional financial institutions continue to expand their digital asset offerings.",
      source: "CoinDesk",
      sourceUrl: "#",
    },
    {
      title: "Diversification opportunity: Art market showing low correlation",
      category: "Alternatives",
      impact: "Low",
      icon: <Lightbulb className="h-4 w-4" />,
      color: "bg-indigo-100 text-indigo-800",
      description:
        "The art market continues to demonstrate low correlation with traditional asset classes, potentially offering diversification benefits for investors. Recent auction results show strong demand for blue-chip artworks, with several pieces selling well above pre-sale estimates despite broader market volatility.",
      source: "Art Market Monitor",
      sourceUrl: "#",
    },
  ]

  const previousDates = ["August 15, 2023", "August 14, 2023", "August 13, 2023", "August 12, 2023", "August 11, 2023"]

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Most Impactful Stories</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Today's stories that matter - May 14, 2025</h1>
          <p className="text-muted-foreground">
            The most important market developments and their impact on long-term investors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {topFiveItems.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <Badge variant="outline">{`#${index + 1}`}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-normal">
                    {item.impact} Impact
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="mb-4 p-3 bg-muted/50 rounded-md">
                  <h4 className="font-medium mb-1">Long-term investor impact:</h4>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 &&
                      "Lower interest rates typically benefit growth stocks and could lead to increased corporate borrowing and expansion. Long-term investors may want to consider increasing allocation to growth-oriented sectors while maintaining diversification across asset classes."}
                    {index === 1 &&
                      "Strong tech earnings reinforce the sector's resilience and growth potential. Long-term investors should consider maintaining strategic exposure to quality tech companies with sustainable competitive advantages, while being mindful of valuation metrics."}
                    {index === 2 &&
                      "While short-term oil price volatility may impact energy sector investments, long-term investors should focus on the structural trends in energy transition. Consider a balanced approach between traditional energy companies investing in renewables and pure-play clean energy firms."}
                    {index === 3 &&
                      "Cryptocurrency's increasing institutional adoption suggests it may become a more established asset class. Long-term investors might consider a small allocation (1-5% of portfolio) to digital assets as part of a diversified strategy, while being prepared for significant volatility."}
                    {index === 4 &&
                      "Alternative assets like art can provide meaningful diversification benefits during market stress. Long-term investors with significant portfolios might explore fractional ownership platforms or art-focused funds to gain exposure without the complexities of direct ownership."}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Source:{" "}
                    <a href={item.sourceUrl} className="text-primary hover:underline">
                      {item.source}
                    </a>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Read Full Story
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-screen lg:overflow-y-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Diversification Insight</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Today's market movements highlight the importance of maintaining exposure across multiple asset classes
                to mitigate volatility.
              </p>
              <Link href="/diversification-score">
                <Button size="sm" className="w-full">
                  Calculate Your Score
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Previous Stories</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {previousDates.map((date, index) => (
                  <Link
                    key={index}
                    href={`/most-impactful-stories/${date.replace(/,/g, "").replace(/ /g, "-").toLowerCase()}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{date}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2">
                View All Archives
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Daily Market Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get these insights delivered to your inbox every morning before the market opens.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="daily-stories"
                      checked={frequency.daily}
                      onChange={() => handleFrequencyChange("daily")}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="daily-stories">Daily (M-F)</label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="weekly-stories"
                      checked={frequency.weekly}
                      onChange={() => handleFrequencyChange("weekly")}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="weekly-stories">Weekly (Sa)</label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
                <p className="text-xs text-center text-muted-foreground">You can unsubscribe at any time.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
