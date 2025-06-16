import { Input } from "@/components/ui/input"
import Link from "next/link"
import securitiesData from "@/app/data/securities.json"

export const metadata = {
  title: "Companies Database | Stock Information & Analysis | Diversification.com",
  description:
    "Browse our comprehensive database of publicly traded companies. Find detailed stock information, analysis, and diversification metrics.",
}

export default function CompaniesIndexPage() {
  // Filter only stocks from the securities data
  const stocks = Object.entries(securitiesData as Record<string, any>)
    .filter(([_, security]) => security.securityType === "Stock")
    .map(([symbol, security]) => ({
      symbol,
      name: security.name,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol))

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Companies Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on thousands of publicly traded companies from markets around the world.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/securities" className="hover:text-primary">
            Popular
          </Link>
          <Link href="/securities/companies" className="text-primary font-medium">
            Companies
          </Link>
          <Link href="/securities/etfs" className="hover:text-primary">
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
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            href={`/securities/companies/${stock.symbol.toLowerCase()}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="font-medium">{stock.symbol}</span> - {stock.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
