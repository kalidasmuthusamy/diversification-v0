"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, Filter, Mail, Search, Tag } from "lucide-react"
import { SiteFooter } from "@/app/home/components/site-footer"

export default function NewsletterArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample newsletter data - in a real app, this would come from an API
  const newsletters = [
    {
      id: "2025-05-18",
      date: "May 18, 2025",
      type: "weekly",
      title: "Fed Rate Cut Expectations & Tech Earnings Roundup",
      description:
        "Our analysis of the Fed's latest signals on interest rates, plus a comprehensive review of this week's tech earnings and what they mean for long-term investors.",
      topics: ["Macro", "Tech", "Earnings"],
      readTime: "8 min read",
      featured: true,
    },
    {
      id: "2025-05-16",
      date: "May 16, 2025",
      type: "daily",
      title: "Oil Prices Surge Amid Middle East Tensions",
      description:
        "Crude oil prices have risen sharply as geopolitical tensions escalate, plus our take on the latest retail sales data and what it means for consumer discretionary stocks.",
      topics: ["Commodities", "Retail", "Geopolitics"],
      readTime: "5 min read",
      featured: false,
    },
    {
      id: "2025-05-15",
      date: "May 15, 2025",
      type: "daily",
      title: "Bitcoin Breaks $70k & Alternative Asset Correlations",
      description:
        "Bitcoin reaches new all-time high amid increased institutional adoption, plus our analysis of how alternative assets are performing in the current market environment.",
      topics: ["Crypto", "Alternatives", "Correlations"],
      readTime: "6 min read",
      featured: false,
    },
    {
      id: "2025-05-14",
      date: "May 14, 2025",
      type: "daily",
      title: "Housing Market Cools & Bond Yield Analysis",
      description:
        "New housing data shows a cooling market in major metropolitan areas, plus our analysis of recent movements in Treasury yields and what they signal for fixed income investors.",
      topics: ["Real Estate", "Bonds", "Interest Rates"],
      readTime: "5 min read",
      featured: false,
    },
    {
      id: "2025-05-13",
      date: "May 13, 2025",
      type: "daily",
      title: "Tech Sector Rotation & Small Cap Opportunities",
      description:
        "Our analysis of the ongoing rotation within the technology sector, plus a look at emerging opportunities in small-cap stocks as economic conditions evolve.",
      topics: ["Tech", "Small Caps", "Sector Rotation"],
      readTime: "6 min read",
      featured: false,
    },
    {
      id: "2025-05-11",
      date: "May 11, 2025",
      type: "weekly",
      title: "Inflation Data & Global Market Outlook",
      description:
        "A deep dive into the latest inflation numbers and what they mean for monetary policy, plus our updated outlook for global markets in the coming months.",
      topics: ["Inflation", "Global Markets", "Monetary Policy"],
      readTime: "9 min read",
      featured: true,
    },
    {
      id: "2025-05-09",
      date: "May 9, 2025",
      type: "daily",
      title: "Earnings Season Recap & Dividend Stock Analysis",
      description:
        "Our comprehensive recap of the Q1 earnings season so far, plus a special focus on dividend-paying stocks that offer both income and growth potential.",
      topics: ["Earnings", "Dividends", "Income Investing"],
      readTime: "7 min read",
      featured: false,
    },
    {
      id: "2025-05-08",
      date: "May 8, 2025",
      type: "daily",
      title: "AI Sector Developments & Commodity Trends",
      description:
        "The latest developments in artificial intelligence and their market implications, plus our analysis of recent trends across major commodity markets.",
      topics: ["AI", "Technology", "Commodities"],
      readTime: "6 min read",
      featured: false,
    },
  ]

  // Filter newsletters based on search query
  const filteredNewsletters = newsletters.filter(
    (newsletter) =>
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm">Newsletter Archives</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Newsletter Archives</h1>
            <p className="text-muted-foreground">
              Browse our previous newsletters to see what you'll receive when you subscribe
            </p>
          </div>
          <div className="w-full md:w-auto">
            <Link href="/home">
              <Button variant="outline" className="w-full md:w-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Subscribe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Never miss an update</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join 30,000+ investors receiving market insights and diversification strategies.
                </p>
                <Input type="email" placeholder="Your email address" />
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="daily-archive"
                      defaultChecked
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="daily-archive">Daily (M-F)</label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="weekly-archive"
                      defaultChecked
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="weekly-archive">Weekly (Sa)</label>
                  </div>
                </div>
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search newsletters..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Popular Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Macro",
                        "Tech",
                        "Crypto",
                        "Real Estate",
                        "Bonds",
                        "Alternatives",
                        "Commodities",
                        "Earnings",
                      ].map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => setSearchQuery(topic)}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Time Period
                    </h3>
                    <div className="space-y-1">
                      {["Last Week", "Last Month", "Last Quarter", "2025", "2024"].map((period) => (
                        <div
                          key={period}
                          className="text-sm px-2 py-1 rounded hover:bg-muted cursor-pointer"
                          onClick={() => setSearchQuery(period)}
                        >
                          {period}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setSearchQuery("")}>
                  Clear Filters
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="daily">Diversification Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Diversification Weekly</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Sort by: </span>
                  <select className="bg-transparent border-none outline-none">
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Most Read</option>
                  </select>
                </div>
              </div>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {filteredNewsletters.length > 0 ? (
                    filteredNewsletters.map((newsletter) => (
                      <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No newsletters found matching your search criteria.</p>
                      <Button variant="link" onClick={() => setSearchQuery("")}>
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="daily" className="mt-6">
                <div className="space-y-4">
                  {filteredNewsletters
                    .filter((n) => n.type === "daily")
                    .map((newsletter) => (
                      <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="mt-6">
                <div className="space-y-4">
                  {filteredNewsletters
                    .filter((n) => n.type === "weekly")
                    .map((newsletter) => (
                      <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="mt-6">
                <div className="space-y-4">
                  {filteredNewsletters
                    .filter((n) => n.featured)
                    .map((newsletter) => (
                      <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-1">
                Load More
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
  )
}

function NewsletterCard({ newsletter }: { newsletter: any }) {
  const newsletterType = newsletter.type === "weekly" ? "Diversification Weekly" : "Diversification Daily"
  const formattedTitle = `${newsletterType} - ${newsletter.date}`

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-1 bg-muted/30 p-4 flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold mb-1">{formattedTitle}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {newsletter.topics.map((topic: string) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">{newsletter.readTime}</div>
          </div>

          <div className="md:col-span-3 p-4">
            <h3 className="text-lg font-semibold mb-2">{newsletter.title}</h3>
            <p className="text-muted-foreground mb-4">{newsletter.description}</p>
            <div className="flex justify-between items-center">
              <Link href={`/newsletter/${newsletter.id}`}>
                <Button variant="link" className="px-0">
                  Read Full Newsletter
                </Button>
              </Link>
              {newsletter.featured && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
