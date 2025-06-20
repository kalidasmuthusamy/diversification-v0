import type { Metadata } from "next"
import securitiesData from "@/app/data/securities.json"

type RelatedSecurity = {
  symbol: string
  name: string
  price: string
  ytdChangePercent: string
}

type SectorBreakdown = {
  sector: string
  percentage: string
}

type CountryBreakdown = {
  country: string
  percentage: string
}

type TopHolding = {
  symbol: string
  name: string
  percentage: string
}

type SecurityData = {
  symbol: string
  name: string
  company: string
  price: string
  ytdChange: string
  ytdChangePercent: string
  isYtdPositive: boolean
  marketCap: string
  volume: string
  avgVolume: string
  peRatio: string
  dividend: string
  nextDividendDate: string
  nextEarningsDate: string
  yearRange: string
  sector: string
  exchange: string
  country: string
  currency: string
  employees: string
  founded: number
  headquarters: string
  description: string
  correlationToMarket: string
  volatility: string
  securityType: string
  expenseRatio?: string
  aum?: string
  maxSupply?: string
  circulatingSupply?: string
  investingStrategy?: string
  isDiversified?: boolean
  assetClass?: string
  macroFactors: {
    interestRates: string
    inflation: string
    gdpGrowth: string
    dollarStrength: string
    commodityPrices: string
    liquidity?: string
    credit?: string
  }
  sectorBreakdown?: SectorBreakdown[]
  countryBreakdown?: CountryBreakdown[]
  topHoldings?: TopHolding[]
  relatedSecurities: RelatedSecurity[]
}

export async function generateMetadata({ params }: { params: { symbol: string } }): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase()
  const data = securitiesData[symbol]

  if (!data) {
    return {
      title: "Security Not Found",
      description: "The requested security could not be found.",
    }
  }

  const securityTypeText =
    data.securityType === "ETF" ? "ETF" : data.securityType === "Cryptocurrency" ? "Crypto" : "Stock"

  return {
    title: `${data.symbol} ${securityTypeText} Price, Analysis & Market Data | ${data.name}`,
    description: `Get the latest ${data.symbol} ${securityTypeText.toLowerCase()} price, comprehensive analysis, market correlation, and investment insights. Track ${data.name} performance, news, and market data.`,
    keywords: `${data.symbol}, ${data.name}, ${securityTypeText.toLowerCase()} price, ${securityTypeText.toLowerCase()} analysis, market correlation, ${data.sector}, ${data.exchange}, ${data.country} investments, investment analysis`,
    openGraph: {
      title: `${data.symbol} - ${data.name} ${securityTypeText} Analysis`,
      description: `Current price: ${data.price} (${data.ytdChangePercent} YTD). Get comprehensive analysis and market insights for ${data.symbol}.`,
      type: "website",
    },
    alternates: {
      canonical: `/explore/${symbol.toLowerCase()}`,
    },
  }
}

export default function ExploreSymbolPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params

  // Determine the security type and redirect accordingly
  // This is a simplified version - in a real app, you'd check the security type in your database
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Security Details: {symbol.toUpperCase()}</h1>
      <p>Security information for {symbol.toUpperCase()} will be displayed here.</p>
    </div>
  )
}
