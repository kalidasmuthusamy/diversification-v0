import { Input } from "@/components/ui/input"
import Link from "next/link"
import securitiesData from "@/app/data/securities.json"

export const metadata = {
  title: "ETFs Database | Exchange-Traded Funds Information & Analysis | Diversification.com",
  description:
    "Browse our comprehensive database of ETFs (Exchange-Traded Funds). Find detailed information, analysis, and diversification metrics.",
}

export default function ETFsIndexPage() {
  // Filter only ETFs from the securities data
  const etfs = Object.entries(securitiesData as Record<string, any>)
    .filter(([_, security]) => security.securityType === "ETF")
    .map(([symbol, security]) => ({
      symbol,
      name: security.name,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol))

  // If no ETFs in the data, create some examples
  const exampleEtfs = [
    { symbol: "SPY", name: "SPDR S&P 500 ETF Trust" },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF" },
    { symbol: "QQQ", name: "Invesco QQQ Trust" },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF" },
    { symbol: "IWM", name: "iShares Russell 2000 ETF" },
  ]

  const etfsToDisplay = etfs.length > 0 ? etfs : exampleEtfs

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">ETFs Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on thousands of Exchange-Traded Funds (ETFs) from providers around the world.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/securities" className="hover:text-primary">
            Popular
          </Link>
          <Link href="/securities/companies" className="hover:text-primary">
            Companies
          </Link>
          <Link href="/securities/etfs" className="text-primary font-medium">
            ETFs
          </Link>
          <Link href="/securities/mutual-funds" className="hover:text-primary">
            Mutual Funds
          </Link>
          <Link href="/securities/cryptocurrencies" className="hover:text-primary">
            Cryptocurrencies
          </Link>
        </div>

        <div className="relative max-w-md mx-auto mb-10">
          <Input type="search" placeholder="Search securities..." className="h-12 text-lg" />
        </div>
      </div>

      <div className="space-y-2">
        {etfsToDisplay.map((etf) => (
          <Link
            key={etf.symbol}
            href={`/securities/etfs/${etf.symbol.toLowerCase()}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="font-medium">{etf.symbol}</span> - {etf.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
