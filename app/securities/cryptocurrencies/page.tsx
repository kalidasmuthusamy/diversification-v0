import { Input } from "@/components/ui/input"
import Link from "next/link"
import securitiesData from "@/app/data/securities.json"

export const metadata = {
  title: "Cryptocurrencies Database | Digital Asset Information & Analysis | Diversification.com",
  description:
    "Browse our comprehensive database of cryptocurrencies and digital assets. Find detailed information, analysis, and diversification metrics.",
}

export default function CryptocurrenciesIndexPage() {
  // Filter only Cryptocurrencies from the securities data
  const cryptos = Object.entries(securitiesData as Record<string, any>)
    .filter(([_, security]) => security.securityType === "Cryptocurrency")
    .map(([symbol, security]) => ({
      symbol,
      name: security.name,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol))

  // If no cryptos in the data, create some examples
  const exampleCryptos = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "DOT", name: "Polkadot" },
  ]

  const cryptosToDisplay = cryptos.length > 0 ? cryptos : exampleCryptos

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Cryptocurrencies Database</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find detailed information on hundreds of cryptocurrencies and digital assets.
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
          <Link href="/securities/mutual-funds" className="hover:text-primary">
            Mutual Funds
          </Link>
          <Link href="/securities/cryptocurrencies" className="text-primary font-medium">
            Cryptocurrencies
          </Link>
        </div>

        <div className="relative max-w-md mx-auto mb-10">
          <Input type="search" placeholder="Search securities..." className="h-12 text-lg" />
        </div>
      </div>

      <div className="space-y-2">
        {cryptosToDisplay.map((crypto) => (
          <Link
            key={crypto.symbol}
            href={`/securities/cryptocurrencies/${crypto.symbol.toLowerCase()}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            <span className="font-medium">{crypto.symbol}</span> - {crypto.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
