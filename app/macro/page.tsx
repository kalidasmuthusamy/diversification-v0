import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { macroIndicators } from "@/app/data/macro-indicators"

export const metadata = {
  title: "Economic Indicators & Macro Data | Diversification.com",
  description:
    "Explore global economic indicators, macro data, and market analysis to make informed investment decisions.",
}

export default function MacroIndexPage() {
  // Group indicators by country
  const countriesMap: Record<string, typeof macroIndicators> = {}

  Object.values(macroIndicators).forEach((indicator) => {
    if (!countriesMap[indicator.country]) {
      countriesMap[indicator.country] = {}
    }
    countriesMap[indicator.country][indicator.id] = indicator
  })

  // Group indicators by category
  const categoriesMap: Record<string, typeof macroIndicators> = {}

  Object.values(macroIndicators).forEach((indicator) => {
    if (!categoriesMap[indicator.category]) {
      categoriesMap[indicator.category] = {}
    }
    categoriesMap[indicator.category][indicator.id] = indicator
  })

  const countries = Object.keys(countriesMap)
  const categories = Object.keys(categoriesMap)

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Economic Indicators & Macro Data</h1>
        <p className="text-muted-foreground">
          Track global economic indicators, analyze macro trends, and understand their impact on financial markets.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for indicators, countries, or categories..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>
      </div>

      {/* Featured Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(macroIndicators)
            .slice(0, 3)
            .map((indicator) => (
              <Link
                key={indicator.id}
                href={`/macro/${indicator.countryCode}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="h-full hover:bg-muted/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {indicator.country} {indicator.indicator}
                      </CardTitle>
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

      {/* Browse by Country */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Browse by Country</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country) => {
            const countryIndicators = Object.values(countriesMap[country])
            const countryCode = countryIndicators[0].countryCode
            return (
              <Link key={country} href={`/macro/${countryCode}`}>
                <Card className="hover:bg-muted/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{country}</h3>
                      <Badge>{countryIndicators.length}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Browse by Category */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const categoryIndicators = Object.values(categoriesMap[category])
            return (
              <Link key={category} href={`/macro/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="hover:bg-muted/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{category}</h3>
                      <Badge>{categoryIndicators.length}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {categoryIndicators
                        .slice(0, 3)
                        .map((i) => i.indicator)
                        .join(", ")}
                      {categoryIndicators.length > 3 ? ", and more..." : ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* All Indicators */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Economic Indicators</h2>
          <Button variant="outline">Filter</Button>
        </div>
        <div className="bg-card rounded-md border">
          <div className="grid grid-cols-12 p-4 border-b font-medium text-sm">
            <div className="col-span-4">Indicator</div>
            <div className="col-span-2">Country</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Value</div>
            <div className="col-span-2 text-right">Change</div>
          </div>
          {Object.values(macroIndicators).map((indicator) => (
            <Link
              key={indicator.id}
              href={`/macro/${indicator.countryCode}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid grid-cols-12 p-4 border-b hover:bg-muted/30 transition-colors"
            >
              <div className="col-span-4 font-medium">{indicator.indicator}</div>
              <div className="col-span-2">{indicator.country}</div>
              <div className="col-span-2">
                <Badge variant="outline">{indicator.category}</Badge>
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
        <div className="mt-4 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}
