import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
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
    title: `${countryData.country} Economic Indicators & Data Series | Diversification.com`,
    description: `Browse all available economic indicators and data series for ${countryData.country}. Access comprehensive macro data for investment analysis.`,
    keywords: `${countryData.country} economy, ${countryData.country} economic indicators, ${countryData.country} macro data, ${countryData.countryCode} economy`,
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
        <h1 className="text-3xl font-bold mb-2">{countryName} Economic Data Series</h1>
        <p className="text-muted-foreground">
          Browse all available economic indicators and data series for {countryName}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Data Series ({countryIndicators.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {countryIndicators.map((indicator) => (
              <Link
                key={indicator.id}
                href={`/macro/${indicator.countryCode}/${indicator.indicator.toLowerCase().replace(/\s+/g, "-")}`}
                className="block py-3 px-4 text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-md"
              >
                {countryName} {indicator.indicator}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
