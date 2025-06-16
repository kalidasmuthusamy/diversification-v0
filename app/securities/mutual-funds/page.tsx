import { Input } from "@/components/ui/input"
import Link from "next/link"
import securitiesData from "@/app/data/securities.json"

export const metadata = {
  title: "Mutual Funds Database | Fund Information & Analysis | Diversification.com",
  description:
    "Browse our comprehensive database of mutual funds. Find detailed information, analysis, and diversification metrics.",
}

export default function MutualFundsIndexPage() {
  // Filter only Mutual Funds from the securities data
  const mutualFunds = Object.entries(securitiesData as Record<string, any>)
    .filter(([_, security]) => security.securityType === "Mutual Fund")
    .map(([symbol, security]) => ({
      symbol,
      name: security.name,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol))

  // If no mutual funds in the data, create some examples
  const exampleFunds = [
    { symbol: "VFIAX", name: "Vanguard 500 Index Fund Admiral Shares" },
    { symbol: "FXAIX", name: "Fidelity 500 Index Fund" },
    { symbol: "VTSAX", name: "Vanguard Total Stock Market Index Fund Admiral Shares" },
    { symbol: "VBTLX", name: "Vanguard Total Bond Market Index Fund Admiral Shares" },
    { symbol: "PIMIX", name: "PIMCO Income Fund Institutional Class" },
  ]

  const fundsToDisplay = mutualFunds.length > 0 ? mutualFunds : exampleFunds

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Mutual Funds Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on thousands of mutual funds from investment companies around the world.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/securities" className="hover:text-primary">
            Popular
          </Link>
          <Link href="/securities/companies" className="hover:text-primary">
            Companies
          </Link>
          <Link href="/securities/etfs" className="hover:text-primary">
            ETFs
          </Link>
          <Link href="/securities/mutual-funds" className="text-primary font-medium">
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
        {fundsToDisplay.map((fund) => (
          <Link
            key={fund.symbol}
            href={`/securities/mutual-funds/${fund.symbol.toLowerCase()}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="font-medium">{fund.symbol}</span> - {fund.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
