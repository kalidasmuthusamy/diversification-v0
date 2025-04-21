import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Education Center</h1>
          <p className="text-muted-foreground">
            Learn about diversification, portfolio management, and investment strategies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-3 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3">
                <Badge className="mb-2">FEATURED ARTICLE</Badge>
                <h2 className="text-2xl font-bold mb-2">Mastering Portfolio Diversification</h2>
                <p className="text-muted-foreground mb-4">
                  Learn how to build a well-diversified portfolio that can weather market volatility and maximize
                  risk-adjusted returns.
                </p>
                <Button asChild>
                  <Link href="/education/articles/mastering-portfolio-diversification">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/3">
                <img
                  src="/diverse-hands-portfolio.png"
                  alt="Portfolio Diversification"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="diversification" className="mb-8">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="diversification">Diversification</TabsTrigger>
          <TabsTrigger value="portfolio-management">Portfolio Management</TabsTrigger>
          <TabsTrigger value="asset-classes">Asset Classes</TabsTrigger>
          <TabsTrigger value="investment-strategies">Investment Strategies</TabsTrigger>
          <TabsTrigger value="risk-management">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="diversification">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diversificationArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio-management">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioManagementArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="asset-classes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assetClassesArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investment-strategies">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentStrategiesArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk-management">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskManagementArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TopicButton({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <Button variant="outline" className="w-full justify-between" asChild>
      <Link href={`/education/topics/${label.toLowerCase().replace(" ", "-")}`}>
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <Badge variant="secondary">{count}</Badge>
      </Link>
    </Button>
  )
}

function ArticleCard({
  title,
  description,
  category,
  readTime,
  date,
  image,
  featured = false,
}: {
  title: string
  description: string
  category: string
  readTime: string
  date: string
  image: string
  featured?: boolean
}) {
  return (
    <Card className={featured ? "border-primary/20 bg-primary/5" : ""}>
      <div className="relative h-40 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary">Featured</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {readTime} • {date}
          </div>
          <Button variant="link" className="p-0 h-auto text-sm">
            Read more
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LearningPathCard({
  title,
  description,
  modules,
  duration,
  level,
  image,
}: {
  title: string
  description: string
  modules: number
  duration: string
  level: string
  image: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs">
            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{modules} Modules</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <Badge variant="outline">{level}</Badge>
        </div>
        <Button className="w-full">Start Learning</Button>
      </CardContent>
    </Card>
  )
}

function VideoCard({
  title,
  duration,
  views,
  date,
  thumbnail,
}: {
  title: string
  duration: string
  views: string
  date: string
  thumbnail: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>{views} views</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

const diversificationArticles = [
  {
    title: "The Importance of Diversification in Portfolio Construction",
    description:
      "Learn why diversification is often called the only free lunch in investing and how it can reduce risk without sacrificing returns.",
    category: "Fundamentals",
    readTime: "5 min read",
    date: "Apr 5, 2025",
    image: "/branching-paths.png",
    featured: true,
  },
  {
    title: "Beyond Stocks and Bonds: Alternative Assets for True Diversification",
    description:
      "Discover how alternative asset classes like real estate, commodities, and private equity can enhance portfolio diversification.",
    category: "Advanced",
    readTime: "8 min read",
    date: "Mar 28, 2025",
    image: "/diverse-alternative-assets.png",
  },
  {
    title: "Correlation: The Key Metric for Effective Diversification",
    description:
      "Understanding correlation coefficients and how they can help you build a truly diversified portfolio that performs in various market conditions.",
    category: "Technical",
    readTime: "7 min read",
    date: "Apr 2, 2025",
    image: "/interconnected-growth.png",
  },
  {
    title: "Geographic Diversification: Investing Across Borders",
    description:
      "How international and emerging market investments can reduce country-specific risk and provide exposure to different economic cycles.",
    category: "Global",
    readTime: "6 min read",
    date: "Mar 20, 2025",
    image: "/placeholder.svg?key=gu5jj",
  },
  {
    title: "Sector Diversification: Balancing Industry Exposure",
    description:
      "Strategies for achieving proper sector allocation to avoid concentration risk and capitalize on different economic environments.",
    category: "Sectors",
    readTime: "5 min read",
    date: "Apr 8, 2025",
    image: "/sector-growth-map.png",
  },
  {
    title: "The Limits of Diversification: When More Isn't Better",
    description:
      "Exploring the concept of over-diversification and how to strike the right balance between diversification and performance.",
    category: "Advanced",
    readTime: "9 min read",
    date: "Mar 15, 2025",
    image: "/Scattered Seeds.png",
  },
]

const portfolioManagementArticles = [
  {
    title: "Portfolio Rebalancing: Maintaining Your Target Allocation",
    description:
      "Learn when and how to rebalance your portfolio to maintain your desired asset allocation and risk profile.",
    category: "Fundamentals",
    readTime: "6 min read",
    date: "Apr 7, 2025",
    image: "/balanced-growth.png",
    featured: true,
  },
  {
    title: "Tax-Efficient Portfolio Management Strategies",
    description:
      "Techniques to minimize tax impact while managing your investment portfolio, including asset location and tax-loss harvesting.",
    category: "Tax",
    readTime: "8 min read",
    date: "Mar 25, 2025",
    image: "/growth-through-planning.png",
  },
  {
    title: "Portfolio Performance Measurement: Beyond Returns",
    description:
      "How to properly evaluate your portfolio's performance using risk-adjusted metrics like Sharpe ratio, Sortino ratio, and alpha.",
    category: "Technical",
    readTime: "7 min read",
    date: "Apr 3, 2025",
    image: "/growth-chart-analysis.png",
  },
  {
    title: "Lifecycle Investing: Adjusting Your Portfolio Through Life Stages",
    description:
      "How to adapt your investment strategy as you progress through different life stages from early career to retirement.",
    category: "Planning",
    readTime: "6 min read",
    date: "Mar 18, 2025",
    image: "/growing-portfolio-journey.png",
  },
  {
    title: "Behavioral Biases in Portfolio Management",
    description:
      "Identifying and overcoming common behavioral biases that can negatively impact investment decisions and portfolio outcomes.",
    category: "Psychology",
    readTime: "5 min read",
    date: "Apr 10, 2025",
    image: "/placeholder.svg?height=200&width=300&query=behavioral finance",
  },
  {
    title: "Portfolio Monitoring: What to Track and How Often",
    description:
      "Best practices for monitoring your investment portfolio without succumbing to information overload or short-term thinking.",
    category: "Practical",
    readTime: "4 min read",
    date: "Mar 22, 2025",
    image: "/placeholder.svg?height=200&width=300&query=portfolio monitoring",
  },
]

const assetClassesArticles = [
  {
    title: "Understanding Equity Investments: Stocks, ETFs, and Mutual Funds",
    description:
      "A comprehensive guide to equity investments, their characteristics, and their role in a diversified portfolio.",
    category: "Equities",
    readTime: "7 min read",
    date: "Apr 6, 2025",
    image: "/placeholder.svg?height=200&width=300&query=equity investments",
    featured: true,
  },
  {
    title: "Fixed Income Fundamentals: Bonds, Duration, and Yield",
    description:
      "Learn the basics of fixed income investments, how they work, and why they're essential for portfolio stability.",
    category: "Bonds",
    readTime: "8 min read",
    date: "Mar 27, 2025",
    image: "/placeholder.svg?height=200&width=300&query=bond investing",
  },
  {
    title: "Real Estate Investment Options: REITs, Funds, and Direct Ownership",
    description:
      "Exploring different ways to add real estate exposure to your investment portfolio, from REITs to direct property ownership.",
    category: "Real Estate",
    readTime: "6 min read",
    date: "Apr 4, 2025",
    image: "/placeholder.svg?height=200&width=300&query=real estate investing",
  },
  {
    title: "Commodities as Portfolio Diversifiers",
    description:
      "How commodities like gold, oil, and agricultural products can provide inflation protection and diversification benefits.",
    category: "Commodities",
    readTime: "5 min read",
    date: "Mar 19, 2025",
    image: "/placeholder.svg?height=200&width=300&query=commodity investing",
  },
  {
    title: "Cryptocurrency: A New Asset Class?",
    description:
      "Examining the role of cryptocurrencies in modern portfolios, their unique characteristics, and diversification potential.",
    category: "Crypto",
    readTime: "9 min read",
    date: "Apr 1, 2025",
    image: "/placeholder.svg?height=200&width=300&query=cryptocurrency investing",
  },
  {
    title: "Cash and Cash Equivalents: The Overlooked Asset Class",
    description:
      "Why maintaining appropriate cash reserves is crucial for portfolio liquidity and taking advantage of market opportunities.",
    category: "Cash",
    readTime: "4 min read",
    date: "Mar 23, 2025",
    image: "/placeholder.svg?height=200&width=300&query=cash investing",
  },
]

const investmentStrategiesArticles = [
  {
    title: "Modern Portfolio Theory: Balancing Risk and Return",
    description:
      "Understanding the principles of Modern Portfolio Theory and how to apply them to construct an efficient portfolio.",
    category: "Theory",
    readTime: "8 min read",
    date: "Apr 9, 2025",
    image: "/placeholder.svg?height=200&width=300&query=modern portfolio theory",
    featured: true,
  },
  {
    title: "Value Investing: Finding Undervalued Assets",
    description:
      "Learn the principles of value investing pioneered by Benjamin Graham and Warren Buffett, and how to identify undervalued securities.",
    category: "Value",
    readTime: "7 min read",
    date: "Mar 26, 2025",
    image: "/placeholder.svg?height=200&width=300&query=value investing",
  },
  {
    title: "Growth Investing: Focusing on Future Potential",
    description:
      "Strategies for identifying companies with above-average growth potential and incorporating them into your portfolio.",
    category: "Growth",
    readTime: "6 min read",
    date: "Apr 3, 2025",
    image: "/placeholder.svg?height=200&width=300&query=growth investing",
  },
  {
    title: "Income Investing: Building a Portfolio for Cash Flow",
    description:
      "How to construct a portfolio focused on generating regular income through dividends, interest, and other distributions.",
    category: "Income",
    readTime: "5 min read",
    date: "Mar 21, 2025",
    image: "/placeholder.svg?height=200&width=300&query=income investing",
  },
  {
    title: "Factor Investing: Targeting Specific Return Drivers",
    description:
      "Understanding factor investing and how to target specific return drivers like value, momentum, quality, and low volatility.",
    category: "Factors",
    readTime: "9 min read",
    date: "Apr 5, 2025",
    image: "/placeholder.svg?height=200&width=300&query=factor investing",
  },
  {
    title: "Passive vs. Active Investing: Choosing Your Approach",
    description:
      "Comparing passive index investing with active management strategies to determine which approach best suits your goals.",
    category: "Fundamentals",
    readTime: "6 min read",
    date: "Mar 24, 2025",
    image: "/placeholder.svg?height=200&width=300&query=passive vs active investing",
  },
]

const riskManagementArticles = [
  {
    title: "Understanding Investment Risk: Beyond Volatility",
    description:
      "A comprehensive look at different types of investment risk and how they can impact your portfolio outcomes.",
    category: "Fundamentals",
    readTime: "7 min read",
    date: "Apr 8, 2025",
    image: "/placeholder.svg?height=200&width=300&query=investment risk",
    featured: true,
  },
  {
    title: "Downside Protection Strategies for Your Portfolio",
    description:
      "Techniques to protect your portfolio during market downturns, including hedging, options strategies, and alternative assets.",
    category: "Protection",
    readTime: "8 min read",
    date: "Mar 29, 2025",
    image: "/placeholder.svg?height=200&width=300&query=downside protection",
  },
  {
    title: "Risk Parity: Balancing Risk Contributions",
    description:
      "Understanding the risk parity approach to portfolio construction that focuses on balancing risk rather than capital allocation.",
    category: "Advanced",
    readTime: "9 min read",
    date: "Apr 2, 2025",
    image: "/placeholder.svg?height=200&width=300&query=risk parity",
  },
  {
    title: "Measuring Portfolio Risk: VaR, Standard Deviation, and Beyond",
    description:
      "Learn about different metrics used to quantify investment risk and how to interpret them for better decision-making.",
    category: "Technical",
    readTime: "7 min read",
    date: "Mar 17, 2025",
    image: "/placeholder.svg?height=200&width=300&query=measuring risk",
  },
  {
    title: "Tail Risk: Preparing for Black Swan Events",
    description: "How to incorporate protection against rare but severe market events in your investment strategy.",
    category: "Advanced",
    readTime: "8 min read",
    date: "Apr 7, 2025",
    image: "/placeholder.svg?height=200&width=300&query=tail risk",
  },
  {
    title: "Risk Management Through Life Stages",
    description:
      "How risk tolerance and risk capacity should evolve throughout your life, and strategies for each stage.",
    category: "Planning",
    readTime: "6 min read",
    date: "Mar 22, 2025",
    image: "/placeholder.svg?height=200&width=300&query=lifecycle risk management",
  },
]
