import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, AlertTriangle, Info, TrendingUp, TrendingDown } from "lucide-react"

export default function MarketAnomaliesPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Market Anomalies</h1>
          <p className="text-muted-foreground">Unusual market movements and potential investment opportunities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            What are Anomalies?
          </Button>
          <Button size="sm">Set Alerts</Button>
        </div>
      </div>

      <Tabs defaultValue="stocks" className="mb-6">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="factors">Factors</TabsTrigger>
          <TabsTrigger value="macro">Macro</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockAnomalies.map((anomaly, index) => (
              <AnomalyCard key={index} {...anomaly} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sectors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectorAnomalies.map((anomaly, index) => (
              <AnomalyCard key={index} {...anomaly} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="factors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factorAnomalies.map((anomaly, index) => (
              <AnomalyCard key={index} {...anomaly} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="macro">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroAnomalies.map((anomaly, index) => (
              <AnomalyCard key={index} {...anomaly} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoAnomalies.map((anomaly, index) => (
              <AnomalyCard key={index} {...anomaly} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Anomaly Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What Makes an Anomaly?</h3>
              <p className="text-sm text-muted-foreground">
                Market anomalies are deviations from expected behavior based on historical patterns, fundamentals, or
                correlations. They can represent both risks and opportunities for investors. Our anomaly detection
                system identifies unusual movements that exceed 2 standard deviations from normal behavior.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Diversification Implications</h3>
              <p className="text-sm text-muted-foreground">
                Anomalies can signal breakdowns in traditional correlations between assets, potentially affecting
                portfolio diversification. When multiple anomalies appear simultaneously, it may indicate a regime
                change in market behavior that requires portfolio adjustments.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How to Use This Tool</h3>
              <p className="text-sm text-muted-foreground">
                Monitor anomalies regularly to identify potential investment opportunities or risks to your current
                holdings. Consider how each anomaly might affect your portfolio's diversification and whether
                adjustments are needed to maintain your desired risk profile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Anomaly Alert: Unusual Sector Rotation</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          We're currently observing an unusual rotation from technology to utilities and consumer staples, despite
          strong tech earnings. This pattern has only occurred three times in the past 20 years and may signal changing
          market leadership.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="font-medium">Technology</span>
            </div>
            <div className="text-2xl font-bold text-red-500">-3.2%</div>
            <div className="text-xs text-muted-foreground">Last 5 days</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Utilities</span>
            </div>
            <div className="text-2xl font-bold text-green-500">+4.7%</div>
            <div className="text-xs text-muted-foreground">Last 5 days</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Consumer Staples</span>
            </div>
            <div className="text-2xl font-bold text-green-500">+3.9%</div>
            <div className="text-xs text-muted-foreground">Last 5 days</div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Read Full Analysis</Button>
        </div>
      </div>
    </div>
  )
}

function AnomalyCard({
  title,
  description,
  change,
  severity,
  category,
  timeframe,
  isPositive,
}: {
  title: string
  description: string
  change: string
  severity: "high" | "medium" | "low"
  category: string
  timeframe: string
  isPositive: boolean
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant={severity === "high" ? "destructive" : severity === "medium" ? "default" : "outline"}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)} Anomaly
          </Badge>
          <Badge variant="outline">{category}</Badge>
        </div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="font-medium">{change}</span>
          </div>
          <span className="text-xs text-muted-foreground">{timeframe}</span>
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            View Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const stockAnomalies = [
  {
    title: "NVIDIA (NVDA) Unusual Volume Spike",
    description: "Trading volume 3.5x above average despite no major news announcements.",
    change: "+5.2%",
    severity: "medium",
    category: "Volume",
    timeframe: "Today",
    isPositive: true,
  },
  {
    title: "Tesla (TSLA) Breaks Correlation with Tech Sector",
    description: "Moving opposite to the broader tech sector for 5 consecutive sessions.",
    change: "-8.7%",
    severity: "high",
    category: "Correlation",
    timeframe: "5 Days",
    isPositive: false,
  },
  {
    title: "Apple (AAPL) Options Skew Extreme",
    description: "Put/call ratio at 3-year high despite stable price action.",
    change: "+0.3%",
    severity: "high",
    category: "Options",
    timeframe: "3 Days",
    isPositive: true,
  },
  {
    title: "Bank of America (BAC) Unusual Gap Up",
    description: "Largest overnight gap in 2 years without corresponding news catalyst.",
    change: "+4.3%",
    severity: "medium",
    category: "Price Action",
    timeframe: "Today",
    isPositive: true,
  },
  {
    title: "Pfizer (PFE) Divergence from Healthcare Sector",
    description: "Significantly underperforming sector peers despite positive industry trends.",
    change: "-3.8%",
    severity: "medium",
    category: "Sector Divergence",
    timeframe: "2 Weeks",
    isPositive: false,
  },
  {
    title: "Walmart (WMT) Unusual Dark Pool Activity",
    description: "Dark pool volume 215% above 30-day average.",
    change: "+2.1%",
    severity: "low",
    category: "Dark Pool",
    timeframe: "Today",
    isPositive: true,
  },
]

const sectorAnomalies = [
  {
    title: "Energy Sector Decoupling from Oil Prices",
    description: "Energy stocks rising despite crude oil prices falling for 7 consecutive days.",
    change: "+3.4% vs -5.2%",
    severity: "high",
    category: "Correlation Break",
    timeframe: "1 Week",
    isPositive: true,
  },
  {
    title: "Utilities Outperforming in Rising Rate Environment",
    description: "Unusual strength in rate-sensitive sector despite Treasury yields climbing.",
    change: "+4.7%",
    severity: "high",
    category: "Rate Sensitivity",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "Financials and Technology Correlation Flip",
    description: "Historical positive correlation has inverted to strongly negative.",
    change: "-0.75 correlation",
    severity: "medium",
    category: "Correlation",
    timeframe: "1 Month",
    isPositive: false,
  },
  {
    title: "Healthcare Sector Volatility Spike",
    description: "Volatility 85% higher than 6-month average without clear catalyst.",
    change: "+85% volatility",
    severity: "medium",
    category: "Volatility",
    timeframe: "2 Weeks",
    isPositive: false,
  },
  {
    title: "Consumer Discretionary vs Staples Ratio Extreme",
    description: "Ratio at lowest level since March 2020 market bottom.",
    change: "0.65 ratio",
    severity: "high",
    category: "Sector Ratio",
    timeframe: "YTD",
    isPositive: false,
  },
  {
    title: "Small Cap Value Unusual Strength",
    description: "Outperforming large cap growth by widest margin in 15 years.",
    change: "+8.3% spread",
    severity: "medium",
    category: "Style Rotation",
    timeframe: "1 Month",
    isPositive: true,
  },
]

const factorAnomalies = [
  {
    title: "Quality Factor Sudden Outperformance",
    description: "High-quality stocks outperforming low-quality by widest margin since 2008.",
    change: "+12.4% spread",
    severity: "high",
    category: "Factor",
    timeframe: "3 Months",
    isPositive: true,
  },
  {
    title: "Momentum Factor Collapse",
    description: "Worst performance relative to market in 5 years despite low volatility.",
    change: "-7.8%",
    severity: "high",
    category: "Factor",
    timeframe: "1 Month",
    isPositive: false,
  },
  {
    title: "Low Volatility Premium Inversion",
    description: "High volatility stocks outperforming low volatility stocks in declining market.",
    change: "+5.3% spread",
    severity: "medium",
    category: "Factor",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "Value vs Growth Extreme Reading",
    description: "Value outperformance accelerating despite growth earnings beats.",
    change: "+6.7% spread",
    severity: "medium",
    category: "Style",
    timeframe: "1 Month",
    isPositive: true,
  },
  {
    title: "Size Factor Reversal",
    description: "Small caps suddenly outperforming after 18 months of underperformance.",
    change: "+4.2% spread",
    severity: "medium",
    category: "Size",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "Dividend Yield Factor Weakness",
    description: "High dividend stocks underperforming despite falling interest rates.",
    change: "-3.5%",
    severity: "low",
    category: "Dividend",
    timeframe: "1 Month",
    isPositive: false,
  },
]

const macroAnomalies = [
  {
    title: "Yield Curve Sudden Steepening",
    description: "Fastest steepening in 10 years despite no change in Fed policy.",
    change: "+45 bps",
    severity: "high",
    category: "Rates",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "Gold-Dollar Correlation Break",
    description: "Gold rising alongside strengthening dollar, breaking historical inverse relationship.",
    change: "+3.2% / +1.8%",
    severity: "high",
    category: "Correlation",
    timeframe: "1 Month",
    isPositive: true,
  },
  {
    title: "VIX-S&P 500 Divergence",
    description: "VIX rising alongside S&P 500, unusual positive correlation.",
    change: "+15% / +2.3%",
    severity: "medium",
    category: "Volatility",
    timeframe: "2 Weeks",
    isPositive: false,
  },
  {
    title: "Treasury-Inflation Breakeven Collapse",
    description: "Inflation expectations falling despite rising commodity prices.",
    change: "-35 bps",
    severity: "high",
    category: "Inflation",
    timeframe: "1 Month",
    isPositive: false,
  },
  {
    title: "Credit Spreads Tightening During Equity Selloff",
    description: "High yield spreads narrowing despite equity market weakness.",
    change: "-25 bps / -2.1%",
    severity: "medium",
    category: "Credit",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "Copper-Gold Ratio Diverging from Yields",
    description: "Ratio rising while Treasury yields falling, breaking typical relationship.",
    change: "+8.3% / -20 bps",
    severity: "medium",
    category: "Commodities",
    timeframe: "1 Month",
    isPositive: true,
  },
]

const cryptoAnomalies = [
  {
    title: "Bitcoin Dominance Sudden Drop",
    description: "Largest 3-day decline in Bitcoin market dominance in 2 years.",
    change: "-4.5%",
    severity: "high",
    category: "Market Cap",
    timeframe: "3 Days",
    isPositive: false,
  },
  {
    title: "Ethereum-Bitcoin Correlation Break",
    description: "Correlation dropped from 0.9 to 0.3 in just one week.",
    change: "-0.6 correlation",
    severity: "high",
    category: "Correlation",
    timeframe: "1 Week",
    isPositive: false,
  },
  {
    title: "Stablecoin Market Cap Surge",
    description: "Fastest growth in stablecoin market cap since May 2022 crash.",
    change: "+12.3%",
    severity: "medium",
    category: "Stablecoins",
    timeframe: "2 Weeks",
    isPositive: true,
  },
  {
    title: "DeFi Token Divergence",
    description: "DeFi tokens significantly outperforming broader crypto market.",
    change: "+18.7% vs +3.2%",
    severity: "medium",
    category: "Sector",
    timeframe: "1 Month",
    isPositive: true,
  },
  {
    title: "Exchange Outflows Spike",
    description: "Largest 24-hour exchange outflow in Bitcoin history.",
    change: "-125,000 BTC",
    severity: "high",
    category: "Flows",
    timeframe: "24 Hours",
    isPositive: true,
  },
  {
    title: "Funding Rate Extreme",
    description: "Perpetual futures funding rates at all-time high despite price consolidation.",
    change: "+0.12% hourly",
    severity: "high",
    category: "Derivatives",
    timeframe: "48 Hours",
    isPositive: false,
  },
]
