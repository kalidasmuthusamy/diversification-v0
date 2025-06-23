import type { MetadataRoute } from "next"
import securitiesData from "@/app/data/securities.json"
import { getAllMacroIndicatorIds } from "@/app/data/macro-indicators"
import { getAllDefinitionIds } from "@/app/data/definitions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://diversification.com"

  /* ---------- Securities ---------- */
  const securities = Object.entries(securitiesData as Record<string, any>)
  const stocks = securities.filter(([_, s]) => s.securityType === "Stock").map(([symbol]) => symbol)
  const etfs = securities.filter(([_, s]) => s.securityType === "ETF").map(([symbol]) => symbol)
  const mutualFunds = securities.filter(([_, s]) => s.securityType === "Mutual Fund").map(([symbol]) => symbol)
  const cryptos = securities.filter(([_, s]) => s.securityType === "Cryptocurrency").map(([symbol]) => symbol)

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

  /* ---------- Macro Indicators ---------- */
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

  /* ---------- Definitions ---------- */
  const definitionIds = getAllDefinitionIds()
  const definitionPages = definitionIds.map((id) => ({
    url: `${baseUrl}/definitions/term/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const letters = "abcdefghijklmnopqrstuvwxyz".split("")
  const letterPages = letters.map((l) => ({
    url: `${baseUrl}/definitions/index_${l}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  /* ---------- Static top-level pages ---------- */
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    { url: `${baseUrl}/home`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/securities`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/macro`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/diversification-score`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/definitions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },

    /* dynamic pages */
    ...stockPages,
    ...etfPages,
    ...mutualFundPages,
    ...cryptoPages,
    ...macroPages,
    ...letterPages,
    ...definitionPages,
  ]
}
