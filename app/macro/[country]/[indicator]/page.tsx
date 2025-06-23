import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, TrendingUp, BarChart2, Calendar, Clock, Globe, Info, Lock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMacroIndicator } from "@/app/data/macro-indicators"

type Props = {
  params: {
    country: string
    indicator: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = `${params.country}-${params.indicator}`
  const data = getMacroIndicator(id)

  if (!data) {
    return {
      title: "Indicator Not Found",
      description: "The requested economic indicator could not be found.",
    }
  }

  return {
    title: `${data.country} ${data.indicator} | Economic Data & Analysis`,
    description: `Track ${data.country} ${data.indicator} with the latest data, historical trends, forecasts, and market impact analysis. Updated ${data.lastUpdated}.`,
    keywords: `${data.country} ${data.indicator}, ${data.indicator} ${data.country}, ${data.category}, economic indicators, ${data.country} economy, ${data.countryCode} ${data.indicator.toLowerCase()}, economic data`,
    openGraph: {
      title: `${data.country} ${data.indicator} | Current: ${data.latestValue.value}${data.unit}`,
      description: `Latest ${data.country} ${data.indicator} data, trends, and analysis. Updated ${data.lastUpdated}.`,
      type: "website",
    },
    alternates: {
      canonical: `/macro/${params.country}/${params.indicator}`,
    },
  }
}

export default function MacroIndicatorPage({ params }: Props) {
  const id = `${params.country}-${params.indicator}`
  const data = getMacroIndicator(id)

  if (!data) {
    notFound()
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value}${unit}`
    } else if (unit === "Count" || unit === "Index") {
      return value.toLocaleString()
    } else {
      return `${value} ${unit}`
    }
  }

  return (
    <div className="container py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link href="/macro" className="text-sm text-muted-foreground hover:text-foreground">
          Economic Data
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link href={`/macro/${params.country}`} className="text-sm text-muted-foreground hover:text-foreground">
          {data.country}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm">{data.indicator}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              {data.country} {data.indicator}
            </h1>
            <Badge variant="outline" className="text-sm">
              {data.category}
            </Badge>
            <Badge
              variant={
                data.importance === "High" ? "destructive" : data.importance === "Medium" ? "default" : "secondary"
              }
              className="text-sm"
            >
              {data.importance} Importance
            </Badge>
          </div>
          <p className="text-muted-foreground">{data.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {data.country}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {data.frequency}
            </div>
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Source: {data.source}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl md:text-3xl font-bold">{formatValue(data.latestValue.value, data.unit)}</div>
          <div className={`flex items-center ${data.latestValue.isPositive ? "text-green-600" : "text-red-600"}`}>
            {data.latestValue.isPositive ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span className="font-medium">{data.latestValue.changePercent}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">As of {data.latestValue.date}</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mb-6">
        <div className="flex bg-muted/30 rounded-md p-1 overflow-x-auto">
          <a href="#overview" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Overview
          </a>
          <a href="#statistics" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Statistics
          </a>
          <a href="#historical" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Historical Data
          </a>
          <a href="#forecast" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Forecast
          </a>
          <a href="#related" className="px-4 py-2 text-sm font-medium rounded hover:bg-background transition-colors">
            Related Data
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <section id="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center mb-4">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Interactive chart for {data.country} {data.indicator}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground">Current Value</div>
                    <div className="font-medium">{formatValue(data.latestValue.value, data.unit)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Previous Value</div>
                    <div className="font-medium">{formatValue(data.historicalValues[0].value, data.unit)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Change</div>
                    <div className={`font-medium ${data.latestValue.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {data.latestValue.changePercent}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Frequency</div>
                    <div className="font-medium">{data.frequency}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Next Release</div>
                    <div className="font-medium">{data.nextReleaseDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Source</div>
                    <div className="font-medium">{data.source}</div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="mb-4">
                    {data.description} This indicator is released {data.frequency.toLowerCase()} by {data.source} and is
                    considered to be of {data.importance.toLowerCase()} importance for economic analysis and financial
                    markets.
                  </p>
                  <p>
                    The latest reading of {formatValue(data.latestValue.value, data.unit)} represents a{" "}
                    {data.latestValue.isPositive ? "rise" : "fall"} of {data.latestValue.changePercent} compared to the
                    previous period. This {data.latestValue.isPositive ? "increase" : "decrease"} may indicate{" "}
                    {data.latestValue.isPositive ? "strengthening" : "weakening"} economic conditions in {data.country}
                    's {data.category.toLowerCase()} sector.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Statistical Analysis Section */}
          <section id="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Statistical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Status</div>
                    <div
                      className={`text-lg font-bold ${
                        data.statisticalAnalysis.currentStatus.includes("High")
                          ? "text-red-600"
                          : data.statisticalAnalysis.currentStatus.includes("Low")
                            ? "text-blue-600"
                            : "text-green-600"
                      }`}
                    >
                      {data.statisticalAnalysis.currentStatus}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Percentile Rank</div>
                    <div className="text-lg font-bold">{data.statisticalAnalysis.percentileRank}th</div>
                    <div className="text-xs text-muted-foreground">Historical ranking</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Std. Deviations</div>
                    <div
                      className={`text-lg font-bold ${
                        Math.abs(data.statisticalAnalysis.standardDeviations) > 2
                          ? "text-red-600"
                          : Math.abs(data.statisticalAnalysis.standardDeviations) > 1
                            ? "text-amber-600"
                            : "text-green-600"
                      }`}
                    >
                      {data.statisticalAnalysis.standardDeviations > 0 ? "+" : ""}
                      {data.statisticalAnalysis.standardDeviations.toFixed(1)}σ
                    </div>
                    <div className="text-xs text-muted-foreground">From mean</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Historical Average</div>
                    <div className="text-lg font-bold">
                      {formatValue(data.statisticalAnalysis.historicalAverage, data.unit)}
                    </div>
                    <div className="text-xs text-muted-foreground">Long-term mean</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Historical Context</h4>
                    <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Historical Low</div>
                        <div className="font-medium">
                          {formatValue(data.statisticalAnalysis.historicalRange.min, data.unit)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className="font-bold text-lg">{formatValue(data.latestValue.value, data.unit)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Historical High</div>
                        <div className="font-medium">
                          {formatValue(data.statisticalAnalysis.historicalRange.max, data.unit)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Historical Data Section */}
          <section id="historical">
            <Card>
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium">Date</th>
                        <th className="text-right py-2 px-2 font-medium">Value</th>
                        <th className="text-right py-2 px-2 font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-2">{data.latestValue.date}</td>
                        <td className="text-right py-2 px-2">{formatValue(data.latestValue.value, data.unit)}</td>
                        <td
                          className={`text-right py-2 px-2 ${
                            data.latestValue.isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {data.latestValue.changePercent}
                        </td>
                      </tr>
                      {data.historicalValues.map((value, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-2">{value.date}</td>
                          <td className="text-right py-2 px-2">{formatValue(value.value, data.unit)}</td>
                          <td
                            className={`text-right py-2 px-2 ${value.isPositive ? "text-green-600" : "text-red-600"}`}
                          >
                            {value.changePercent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">Load More Historical Data</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Forecast Section */}
          <section id="forecast">
            <Card>
              <CardHeader>
                <CardTitle>Forecast & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10 flex items-center justify-center">
                    <div className="text-center bg-background/90 p-6 rounded-lg border">
                      <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium mb-2">Premium Forecasts</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get AI-powered forecasts, expert analysis, and market implications for {data.country}{" "}
                        {data.indicator}.
                      </p>
                      <Button className="bg-[#0066cc] hover:bg-[#0055b3]">Unlock Premium Analysis</Button>
                    </div>
                  </div>
                  <div className="blur-sm pointer-events-none">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Next Period Forecast</div>
                        <div className="text-2xl font-bold">
                          {formatValue(data.forecastValue?.value || 0, data.unit)}
                        </div>
                        <div
                          className={`text-sm ${
                            (data.forecastValue?.isPositive ?? false) ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {data.forecastValue?.changePercent || "N/A"}
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">3-Month Outlook</div>
                        <div className="text-2xl font-bold">Moderate Growth</div>
                        <div className="text-sm text-muted-foreground">Based on economic models</div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">12-Month Outlook</div>
                        <div className="text-2xl font-bold">Stable</div>
                        <div className="text-sm text-muted-foreground">Long-term projection</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Expert Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Our economic analysts expect {data.country}'s {data.indicator} to...
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Market Implications</h4>
                        <p className="text-sm text-muted-foreground">
                          These forecasts suggest potential opportunities in...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Related Data Section */}
          <section id="related">
            <Card>
              <CardHeader>
                <CardTitle>Related Economic Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-3">Other {data.country} Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {data.relatedIndicators.map((indicator, index) => (
                    <Link
                      key={index}
                      href={`/macro/${indicator.country.toLowerCase().replace(/\s+/g, "-")}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex justify-between items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{indicator.indicator}</span>
                      <ArrowUp className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>

                <h3 className="font-medium mb-3">Same Indicator in Other Countries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.relatedCountries.map((country, index) => (
                    <Link
                      key={index}
                      href={`/macro/${country.countryCode}/${data.indicator.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex justify-between items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <span className="font-medium">{country.country}</span>
                        <span className="text-sm text-muted-foreground block">
                          {formatValue(country.value, data.unit)}
                        </span>
                      </div>
                      <span className={`text-sm ${country.isPositive ? "text-green-600" : "text-red-600"}`}>
                        {country.changePercent}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Value</span>
                  <span className="font-medium">{formatValue(data.latestValue.value, data.unit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Previous</span>
                  <span className="font-medium">{formatValue(data.historicalValues[0].value, data.unit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Change</span>
                  <span className={`font-medium ${data.latestValue.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {data.latestValue.changePercent}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Frequency</span>
                  <span className="font-medium">{data.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Importance</span>
                  <span className="font-medium">{data.importance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Release */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Release</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Release Date</span>
                </div>
                <span className="font-medium">{data.nextReleaseDate}</span>
              </div>
              <div className="mt-4">
                <Button className="w-full" variant="outline">
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Countries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Compare Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.relatedCountries.map((country, index) => (
                  <Link
                    key={index}
                    href={`/macro/${country.countryCode}/${data.indicator.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex justify-between items-center hover:bg-muted/50 p-2 rounded transition-colors"
                  >
                    <div>
                      <div className="font-medium">{country.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatValue(country.value, data.unit)}</div>
                      <div className={`text-xs ${country.isPositive ? "text-green-600" : "text-red-600"}`}>
                        {country.changePercent}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0066cc] text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-bold">PortfolioPilot Analysis</h3>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Get AI-powered insights on how changes in {data.country}'s {data.indicator} could impact your investment
                portfolio.
              </p>
              <Button className="w-full bg-white text-[#0066cc] hover:bg-white/90">Analyze Portfolio Impact</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timestamp Section */}
      <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <div>Economic data last updated {data.lastUpdated}</div>
      </div>
    </div>
  )
}
