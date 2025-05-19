"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Mail } from "lucide-react"
import { SiteFooter } from "@/app/home/components/site-footer"
import { Input } from "@/components/ui/input"

export default function NewsletterDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the newsletter data based on the ID
  // For this example, we'll use hardcoded data
  const newsletter = {
    id: params.id,
    date: "May 18, 2025",
    type: "weekly", // "weekly" or "daily"
    title: "Fed Rate Cut Expectations & Tech Earnings Roundup",
    topics: ["Macro", "Tech", "Earnings"],
    readTime: "8 min read",
  }

  // Format the title according to the new requirement
  const formattedTitle = `${newsletter.type === "weekly" ? "Diversification Weekly" : "Diversification Daily"} - ${newsletter.date}`

  // Previous and next dates (in a real app, these would be calculated)
  const prevDate = "May 17, 2025"
  const nextDate = "May 19, 2025"

  // Recent newsletters (in a real app, these would be fetched)
  const recentNewsletters = [
    {
      date: "May 17, 2025",
      type: "daily",
      title: "Oil Prices Surge Amid Middle East Tensions",
    },
    {
      date: "May 16, 2025",
      type: "daily",
      title: "Bitcoin Breaks $70k & Alternative Asset Correlations",
    },
    {
      date: "May 15, 2025",
      type: "daily",
      title: "Tech Earnings Preview & Market Sentiment",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{formattedTitle}</h1>
              <div className="text-sm text-muted-foreground mb-4">{newsletter.readTime}</div>
              <h2 className="text-xl font-semibold mb-4">{newsletter.title}</h2>
            </div>

            <div className="prose max-w-none">
              <div className="bg-muted/30 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-2">In This Newsletter:</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fed signals potential rate cut in September</li>
                  <li>Tech earnings beat expectations across the board</li>
                  <li>Market implications for long-term investors</li>
                  <li>Diversification strategy update</li>
                  <li>What to watch next week</li>
                </ul>
              </div>

              <h2>Fed Signals Potential Rate Cut in September</h2>
              <p>
                Federal Reserve officials have indicated they are prepared to cut interest rates at their September
                meeting if inflation continues to cool, according to minutes from their latest policy meeting. This
                potential shift in monetary policy comes as economic data shows inflation moderating while labor market
                conditions remain relatively strong.
              </p>
              <p>
                The minutes revealed that several committee members expressed growing confidence that inflation is on a
                sustainable path back to the Fed's 2% target. However, they emphasized that any decision would remain
                data-dependent, with particular focus on upcoming employment and inflation reports.
              </p>
              <p>
                For long-term investors, this signals a potential pivot point in the monetary policy cycle.
                Historically, the first rate cut in a cycle has often been positive for equity markets, particularly for
                growth-oriented sectors that benefit from lower discount rates applied to future earnings.
              </p>

              <h2>Tech Earnings Beat Expectations</h2>
              <p>
                Major technology companies have reported quarterly earnings that exceeded analyst expectations, driven
                by strong cloud computing growth and increased enterprise spending on digital transformation
                initiatives. The results suggest continued resilience in the tech sector despite broader economic
                concerns.
              </p>
              <p>Notable highlights include:</p>
              <ul>
                <li>Cloud services revenue growth accelerating at major providers</li>
                <li>AI-related investments beginning to show returns</li>
                <li>Enterprise software demand remaining robust</li>
                <li>Consumer hardware sales showing signs of recovery</li>
              </ul>
              <p>
                These strong results reinforce our view that quality technology companies with sustainable competitive
                advantages remain attractive long-term investments, even as valuations in parts of the sector have
                become stretched.
              </p>

              <h2>Market Implications for Long-Term Investors</h2>
              <p>
                The combination of a potentially more accommodative Fed and strong corporate earnings creates a
                supportive backdrop for risk assets. However, we continue to emphasize the importance of selectivity and
                diversification.
              </p>
              <p>In this environment, we recommend:</p>
              <ul>
                <li>Maintaining strategic exposure to quality growth companies</li>
                <li>
                  Balancing growth positions with value-oriented investments that may benefit from economic resilience
                </li>
                <li>Considering selective additions to fixed income as rates potentially peak</li>
                <li>Maintaining alternative asset exposure for diversification benefits</li>
              </ul>

              <h2>Diversification Strategy Update</h2>
              <p>
                Our cross-asset correlation analysis shows some interesting developments this month. Traditional
                correlations between stocks and bonds have begun to normalize after an extended period of positive
                correlation. This suggests that bonds may once again provide more effective diversification benefits in
                periods of equity market stress.
              </p>
              <p>
                Additionally, we're seeing decreased correlation between U.S. and international equities, potentially
                creating opportunities for geographic diversification to enhance risk-adjusted returns.
              </p>
              <p>
                For investors looking to optimize their diversification, we recommend using our{" "}
                <a href="/diversification-score" className="text-primary hover:underline">
                  Diversification Score Calculator
                </a>{" "}
                to assess your current portfolio allocation.
              </p>

              <h2>What to Watch Next Week</h2>
              <p>Key events and data releases to monitor in the coming week include:</p>
              <ul>
                <li>Personal Consumption Expenditures (PCE) inflation data</li>
                <li>Consumer confidence survey</li>
                <li>Retail earnings reports</li>
                <li>Manufacturing PMI data</li>
                <li>Several Fed speakers who may provide additional color on rate cut timing</li>
              </ul>
              <p>We'll be analyzing these developments in our daily newsletters throughout the week.</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                {prevDate}
              </Button>
              <Button variant="outline" className="gap-1">
                {nextDate}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <h3 className="font-bold">Never miss an update</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Join 30,000+ investors receiving these insights directly in your inbox.
                </p>
                <div className="space-y-3">
                  <Input type="email" placeholder="Your email address" className="text-sm" />

                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        id="daily-detail"
                        defaultChecked
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="daily-detail">Daily (M-F)</label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        id="weekly-detail"
                        defaultChecked
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="weekly-detail">Weekly (Sa)</label>
                    </div>
                  </div>

                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Recent Newsletters</h3>
                <div className="space-y-3">
                  {recentNewsletters.map((item, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="text-xs font-medium mb-1">
                        {item.type === "weekly" ? "Diversification Weekly" : "Diversification Daily"} - {item.date}
                      </div>
                      <Link href="#" className="text-sm font-medium hover:text-primary">
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
  )
}
