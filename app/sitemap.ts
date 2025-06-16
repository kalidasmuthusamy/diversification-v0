import type { MetadataRoute } from "next"
import securitiesData from "@/app/data/securities.json"
import { getAllMacroIndicatorIds } from "@/app/data/macro-indicators"
import { getAllDefinitionIds } from "@/app/data/definitions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://diversification.com"
  const securities = Object.entries(securitiesData as Record<string, any>)

  // Group securities by type
  const stocks = securities.filter(([_, security]) => security.securityType === "Stock").map(([symbol]) => symbol)
  const etfs = securities.filter(([_, security]) => security.securityType === "ETF").map(([symbol]) => symbol)
  const mutualFunds = securities
    .filter(([_, security]) => security.securityType === "Mutual Fund")
    .map(([symbol]) => symbol)
  const cryptos = securities
    .filter(([_, security]) => security.securityType === "Cryptocurrency")
    .map(([symbol]) => symbol)

  // Create URLs for each security type
  const stockPages = stocks.map((symbol) => ({
    url: `${baseUrl}/securities/companies/${symbol.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const etfPages = etfs.map((symbol) => ({
    url: `${baseUrl}/securities/etfs/${symbol.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const mutualFundPages = mutualFunds.map((symbol) => ({
    url: `${baseUrl}/securities/mutual-funds/${symbol.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const cryptoPages = cryptos.map((symbol) => ({
    url: `${baseUrl}/securities/cryptocurrencies/${symbol.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const macroIndicatorIds = getAllMacroIndicatorIds()
  const macroPages = macroIndicatorIds.map((id) => {
    const [country, ...indicatorParts] = id.split("-")
    const indicator = indicatorParts.join("-")
    return {
      url: `${baseUrl}/macro/${country}/${indicator}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }
  })

  const definitionIds = getAllDefinitionIds()
  const definitionPages = definitionIds.map((id) => ({
    url: `${baseUrl}/definitions/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/securities`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/securities/companies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/securities/etfs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/securities/mutual-funds`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/securities/cryptocurrencies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/macro`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/macro/us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/macro/cn`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diversification-score`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/definitions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...stockPages,
    ...etfPages,
    ...mutualFundPages,
    ...cryptoPages,
    ...macroPages,
    ...definitionPages,
  ]
}
