import type { MetadataRoute } from "next"
import securitiesData from "@/app/data/securities.json"
import { getAllMacroIndicatorIds } from "@/app/data/macro-indicators"
import { getAllDefinitionIds } from "@/app/data/definitions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://diversification.com"
  const securities = Object.keys(securitiesData)
  const macroIndicatorIds = getAllMacroIndicatorIds()

  const securityPages = securities.map((symbol) => ({
    url: `${baseUrl}/explore/${symbol.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

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
      url: `${baseUrl}/diversification-score`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/macro`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/definitions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...securityPages,
    ...macroPages,
    ...definitionPages,
  ]
}
