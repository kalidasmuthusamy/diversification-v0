import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata = {
  title: "Economic Indicators Database | Global Macro Data | Diversification.com",
  description:
    "Browse our comprehensive database of global economic indicators and macro data. Find detailed information and analysis on thousands of economic metrics.",
}

// G20 countries
const countries = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "cn", name: "China", flag: "🇨🇳" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "kr", name: "South Korea", flag: "🇰🇷" },
  { code: "ru", name: "Russia", flag: "🇷🇺" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "mx", name: "Mexico", flag: "🇲🇽" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "tr", name: "Turkey", flag: "🇹🇷" },
  { code: "sa", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "ar", name: "Argentina", flag: "🇦🇷" },
  { code: "za", name: "South Africa", flag: "🇿🇦" },
  { code: "eu", name: "European Union", flag: "🇪🇺" },
]

// Popular indicators
const popularIndicators = [
  { id: "us-gdp", name: "US GDP Growth Rate", country: "United States", countryCode: "us" },
  { id: "us-inflation", name: "US Inflation Rate", country: "United States", countryCode: "us" },
  { id: "us-unemployment", name: "US Unemployment Rate", country: "United States", countryCode: "us" },
  { id: "us-interest-rates", name: "US Federal Funds Rate", country: "United States", countryCode: "us" },
  { id: "eu-gdp", name: "EU GDP Growth Rate", country: "European Union", countryCode: "eu" },
  { id: "eu-inflation", name: "EU Inflation Rate", country: "European Union", countryCode: "eu" },
  { id: "cn-gdp", name: "China GDP Growth Rate", country: "China", countryCode: "cn" },
  { id: "cn-industrial-production", name: "China Industrial Production", country: "China", countryCode: "cn" },
  { id: "jp-gdp", name: "Japan GDP Growth Rate", country: "Japan", countryCode: "jp" },
  { id: "jp-inflation", name: "Japan Inflation Rate", country: "Japan", countryCode: "jp" },
]

export default function MacroIndexPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Economic Indicators Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on thousands of global economic indicators and macro data to help you understand
          market trends and make informed investment decisions.
        </p>

        <div className="relative max-w-md mx-auto mb-10">
          <Input type="search" placeholder="Search economic indicators..." className="h-12 text-lg" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Popular Indicators</h2>
      <div className="space-y-2 mb-8">
        {popularIndicators.map((indicator) => (
          <Link
            key={indicator.id}
            href={`/macro/${indicator.countryCode}/${indicator.id.split("-")[1]}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            {indicator.name}
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Browse by Country</h2>
      <div className="space-y-2">
        {countries.map((country) => (
          <Link
            key={country.code}
            href={`/macro/${country.code}`}
            className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="text-xl">{country.flag}</span>
            <span>{country.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
