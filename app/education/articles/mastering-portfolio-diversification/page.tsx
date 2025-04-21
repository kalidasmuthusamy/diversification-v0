import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Clock, Share2 } from "lucide-react"

export default function MasteringPortfolioDiversificationPage() {
  return (
    <div className="container py-8">
      {/* Article Header */}
      <div className="mb-8">
        <Badge className="mb-2">PORTFOLIO CONSTRUCTION</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Mastering Portfolio Diversification</h1>
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Clock className="h-4 w-4 mr-1" />
          <span>8 min read</span>
          <span className="mx-2">•</span>
          <span>April 5, 2025</span>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
          <img
            src="/diverse-hands-portfolio.png"
            alt="Portfolio Diversification"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="prose max-w-none">
            <h2>Introduction to Portfolio Diversification</h2>
            <p>
              Diversification is often called the only "free lunch" in investing. It's a risk management strategy that
              mixes a wide variety of investments within a portfolio to potentially reduce the impact of any single
              investment's performance on the overall portfolio performance.
            </p>
            <p>
              The fundamental principle behind diversification is that a portfolio constructed of different kinds of
              assets will, on average, yield higher long-term returns and lower the risk of any individual holding or
              security.
            </p>

            <h2>Why Diversification Matters</h2>
            <p>
              Market volatility is inevitable. Economic cycles, geopolitical events, and industry-specific challenges
              can all impact investment performance. Diversification helps investors manage these risks by spreading
              investments across various asset classes that may respond differently to the same event.
            </p>
            <p>
              For example, when stocks are performing poorly due to economic concerns, bonds might be performing well.
              Real estate might thrive during periods of inflation when traditional fixed-income investments struggle.
              The goal is to create a portfolio where the components don't all move in the same direction at the same
              time.
            </p>

            <h2>Key Dimensions of Diversification</h2>
            <p>Effective diversification should occur across multiple dimensions:</p>
            <ul>
              <li>
                <strong>Asset Class Diversification:</strong> Spreading investments across stocks, bonds, real estate,
                commodities, and alternative investments.
              </li>
              <li>
                <strong>Geographic Diversification:</strong> Investing across different countries and regions to reduce
                country-specific risk.
              </li>
              <li>
                <strong>Sector Diversification:</strong> Allocating investments across different industries to mitigate
                sector-specific risks.
              </li>
              <li>
                <strong>Market Capitalization Diversification:</strong> Investing in large-cap, mid-cap, and small-cap
                companies.
              </li>
              <li>
                <strong>Investment Style Diversification:</strong> Balancing growth and value investment approaches.
              </li>
            </ul>

            <h2>Understanding Correlation</h2>
            <p>
              The key to effective diversification lies in understanding correlation, which measures how investments
              move in relation to each other. Correlation is measured on a scale from -1 to +1:
            </p>
            <ul>
              <li>
                <strong>+1:</strong> Perfect positive correlation (investments move in the same direction at the same
                time)
              </li>
              <li>
                <strong>0:</strong> No correlation (investments move independently of each other)
              </li>
              <li>
                <strong>-1:</strong> Perfect negative correlation (investments move in opposite directions)
              </li>
            </ul>
            <p>
              For optimal diversification, investors should seek assets with low or negative correlations to each other.
              This reduces portfolio volatility without necessarily sacrificing returns.
            </p>

            <h2>Building a Diversified Portfolio</h2>
            <p>Here's a step-by-step approach to creating a well-diversified portfolio:</p>
            <ol>
              <li>
                <strong>Determine Your Investment Goals and Risk Tolerance:</strong> Your asset allocation should align
                with your financial objectives, time horizon, and comfort with risk.
              </li>
              <li>
                <strong>Establish Your Core Asset Allocation:</strong> Decide on the percentage of your portfolio to
                allocate to major asset classes like stocks, bonds, and cash.
              </li>
              <li>
                <strong>Diversify Within Asset Classes:</strong> Within your stock allocation, include domestic and
                international stocks across various sectors and market caps. Within your bond allocation, consider
                government, corporate, and municipal bonds of varying maturities.
              </li>
              <li>
                <strong>Consider Alternative Investments:</strong> Depending on your risk tolerance and investment
                goals, add alternative investments like real estate, commodities, or private equity.
              </li>
              <li>
                <strong>Rebalance Regularly:</strong> As market movements cause your asset allocation to drift from your
                target, periodically rebalance to maintain your desired risk level.
              </li>
            </ol>

            <h2>Common Diversification Mistakes to Avoid</h2>
            <p>Even experienced investors can make these diversification errors:</p>
            <ul>
              <li>
                <strong>Over-diversification:</strong> Adding too many investments can lead to index-like returns with
                higher fees and complexity.
              </li>
              <li>
                <strong>Pseudo-diversification:</strong> Owning multiple investments that are highly correlated doesn't
                provide true diversification.
              </li>
              <li>
                <strong>Neglecting international diversification:</strong> Limiting investments to domestic markets
                increases country-specific risk.
              </li>
              <li>
                <strong>Ignoring costs:</strong> High fees can erode the benefits of diversification.
              </li>
              <li>
                <strong>Emotional decision-making:</strong> Reacting to market volatility rather than sticking to a
                long-term diversification strategy.
              </li>
            </ul>

            <h2>Measuring Diversification Effectiveness</h2>
            <p>To evaluate how well your diversification strategy is working, consider these metrics:</p>
            <ul>
              <li>
                <strong>Portfolio Volatility:</strong> A well-diversified portfolio should have lower volatility than
                its individual components.
              </li>
              <li>
                <strong>Drawdown Analysis:</strong> Examine how your portfolio performs during market downturns.
              </li>
              <li>
                <strong>Risk-Adjusted Returns:</strong> Metrics like the Sharpe ratio help assess if your portfolio is
                generating appropriate returns for the level of risk taken.
              </li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              Mastering portfolio diversification is an ongoing process that requires regular monitoring and
              adjustments. While diversification cannot guarantee against loss, it remains one of the most powerful
              tools available to investors for managing risk and potentially improving long-term returns.
            </p>
            <p>
              By understanding the principles of diversification and implementing them thoughtfully across multiple
              dimensions, investors can build portfolios designed to weather various market conditions and help achieve
              their financial goals.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="h-40 overflow-hidden">
                  <img
                    src="/interconnected-growth.png"
                    alt="Correlation in Diversification"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    Technical
                  </Badge>
                  <h3 className="font-bold mb-2">Correlation: The Key Metric for Effective Diversification</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />7 min read
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <div className="h-40 overflow-hidden">
                  <img
                    src="/diverse-alternative-assets.png"
                    alt="Alternative Assets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    Advanced
                  </Badge>
                  <h3 className="font-bold mb-2">
                    Beyond Stocks and Bonds: Alternative Assets for True Diversification
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />8 min read
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* CTA Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Ready to Diversify Your Portfolio?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized portfolio analysis and diversification recommendations with PortfolioPilot.
              </p>
              <Button className="w-full">
                Sign Up for PortfolioPilot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Popular Articles */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">Popular Articles</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/sector-growth-map.png"
                      alt="Sector Diversification"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium leading-tight">
                      Sector Diversification: Balancing Industry Exposure
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/branching-paths.png"
                      alt="The Importance of Diversification"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium leading-tight">
                      The Importance of Diversification in Portfolio Construction
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/global-growth-map.png"
                      alt="Geographic Diversification"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium leading-tight">
                      Geographic Diversification: Investing Across Borders
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">6 min read</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
