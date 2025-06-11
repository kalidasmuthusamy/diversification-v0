import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { macroIndicators } from "@/app/data/macro-indicators"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: {
    country: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryCode = params.country
  const countryData = Object.values(macroIndicators).find((indicator) => indicator.countryCode === countryCode)

  if (!countryData) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    }
  }

  return {
    title: `${countryData.country} Economic Indicators & Macro Data | Diversification.com`,
    description: `Track ${countryData.country} economic indicators, analyze macro trends, and understand their impact on financial markets.`,
    keywords: `${countryData.country} economy, ${countryData.country} economic indicators, ${countryData.country} macro data, ${countryData.country} economic analysis, ${countryData.countryCode} economy`,
  }
}

export default function CountryPage({ params }: Props) {
  const countryCode = params.country

  // Find all indicators for this country
  const countryIndicators = Object.values(macroIndicators).filter((indicator) => indicator.countryCode === countryCode)

  if (countryIndicators.length === 0) {
    notFound()
  }

  const countryName = countryIndicators[0].country

  // Group indicators by category
  const categoriesMap: Record<string, typeof countryIndicators> = {}

  countryIndicators.forEach((indicator) => {
    if (!categoriesMap[indicator.category]) {
      categoriesMap[indicator.category] = []
    }
    categoriesMap[indicator.category].push(indicator)
  })

  const categories = Object.keys(categoriesMap)

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/home" className="text-sm text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link href="/macro" className="text-sm text-muted-foreground hover:text-foreground">
          Economic Data
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm">{countryName}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{countryName} Economic Indicators</h1>
        <p className="text-muted-foreground">
          Track {countryName}'s economic performance with comprehensive macro data and analysis.
        </p>
      </div>

      {/* Featured Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {countryIndicators
            .filter((indicator) => indicator.importance === "High")
            .slice(0, 3)
            .map((indicator) => (
              <Link
                key={indicator.id}
                href={`/macro/${indicator.countryCode}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="h-full hover:bg-muted/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{indicator.indicator}</CardTitle>
                      <Badge variant="outline">{indicator.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold">
                        {indicator.latestValue.value}
                        {indicator.unit}
                      </span>
                      <span className={`${indicator.latestValue.isPositive ? "text-green-600" : "text-red-600"}`}>
                        {indicator.latestValue.changePercent}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{indicator.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Updated: {indicator.latestValue.date}</span>
                      <span className="flex items-center text-primary">
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>

      {/* Browse by Category */}
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="bg-card rounded-md border">
            <div className="grid grid-cols-12 p-4 border-b font-medium text-sm">
              <div className="col-span-4">Indicator</div>
              <div className="col-span-2">Frequency</div>
              <div className="col-span-2">Importance</div>
              <div className="col-span-2 text-right">Value</div>
              <div className="col-span-2 text-right">Change</div>
            </div>
            {categoriesMap[category].map((indicator) => (
              <Link
                key={indicator.id}
                href={`/macro/${indicator.countryCode}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
                className="grid grid-cols-12 p-4 border-b hover:bg-muted/30 transition-colors"
              >
                <div className="col-span-4 font-medium">{indicator.indicator}</div>
                <div className="col-span-2">{indicator.frequency}</div>
                <div className="col-span-2">
                  <Badge
                    variant={
                      indicator.importance === "High"
                        ? "destructive"
                        : indicator.importance === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {indicator.importance}
                  </Badge>
                </div>
                <div className="col-span-2 text-right">
                  {indicator.latestValue.value}
                  {indicator.unit}
                </div>
                <div
                  className={`col-span-2 text-right ${
                    indicator.latestValue.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {indicator.latestValue.changePercent}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Compare with Other Countries */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Compare with Other Countries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(macroIndicators)
            .filter((indicator) => indicator.countryCode !== countryCode)
            .map((indicator) => indicator.country)
            .filter((country, index, self) => self.indexOf(country) === index)
            .slice(0, 8)
            .map((country) => {
              const countryCode = Object.values(macroIndicators).find(
                (indicator) => indicator.country === country,
              )?.countryCode
              return (
                <Link key={country} href={`/macro/${countryCode}`}>
                  <Card className="hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-medium">{country}</h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
        </div>
      </div>

      {/* Economic Analysis */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Economic Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {countryName}'s economy has shown{" "}
              {countryIndicators.filter((i) => i.latestValue.isPositive).length > countryIndicators.length / 2
                ? "positive"
                : "mixed"}{" "}
              signals recently, with {countryIndicators.filter((i) => i.latestValue.isPositive).length} out of{" "}
              {countryIndicators.length} key indicators showing improvement. The data suggests{" "}
              {countryIndicators.filter((i) => i.latestValue.isPositive).length > countryIndicators.length / 2
                ? "a strengthening economic outlook"
                : "some economic challenges remain"}
              .
            </p>
            <Button className="bg-[#0066cc] hover:bg-[#0055b3]">Get Premium {countryName} Economic Analysis</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
