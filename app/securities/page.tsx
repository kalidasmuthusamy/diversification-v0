import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata = {
  title: "Securities Database | Stocks, ETFs, Mutual Funds & Crypto | Diversification.com",
  description:
    "Browse our comprehensive database of stocks, ETFs, mutual funds, and cryptocurrencies. Find detailed information and analysis on thousands of securities.",
}

export default function SecuritiesIndexPage() {
  // Get popular securities (for demo, we'll just take a few from each type)
  const popularSecurities = [
    { symbol: "AAPL", name: "Apple Inc.", type: "Stock" },
    { symbol: "MSFT", name: "Microsoft Corporation", type: "Stock" },
    { symbol: "AMZN", name: "Amazon.com, Inc.", type: "Stock" },
    { symbol: "GOOGL", name: "Alphabet Inc.", type: "Stock" },
    { symbol: "TSLA", name: "Tesla, Inc.", type: "Stock" },
    { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", type: "ETF" },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF", type: "ETF" },
    { symbol: "QQQ", name: "Invesco QQQ Trust", type: "ETF" },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", type: "ETF" },
    { symbol: "VFIAX", name: "Vanguard 500 Index Fund Admiral Shares", type: "Mutual Fund" },
    { symbol: "FXAIX", name: "Fidelity 500 Index Fund", type: "Mutual Fund" },
    { symbol: "VTSAX", name: "Vanguard Total Stock Market Index Fund Admiral Shares", type: "Mutual Fund" },
    { symbol: "BTC", name: "Bitcoin", type: "Cryptocurrency" },
    { symbol: "ETH", name: "Ethereum", type: "Cryptocurrency" },
  ]

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Securities Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on thousands of stocks, ETFs, mutual funds, and cryptocurrencies to help you make
          informed investment decisions and build a well-diversified portfolio.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/securities" className="text-primary font-medium">
            Popular
          </Link>
          <Link href="/securities/companies" className="hover:text-primary">
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
        {popularSecurities.map((security) => (
          <Link
            key={security.symbol}
            href={`/securities/${security.type.toLowerCase().replace(/\s+/g, "-")}s/${security.symbol.toLowerCase()}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="font-medium">{security.symbol}</span> - {security.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
