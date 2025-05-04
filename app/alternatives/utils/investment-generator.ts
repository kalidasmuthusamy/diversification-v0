import type { Investment } from "../types/investment"

export function generateAdditionalInvestments(
  baseInvestments: Investment[],
  categories: string[],
  platforms: string[],
  correlations: string[],
): Investment[] {
  const additionalInvestments: Investment[] = []
  const icons = ["Building", "Palette", "Briefcase", "Wine", "TreePine", "Gem", "Bitcoin"]

  // Generate additional investments
  for (let i = 7; i <= 30; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length)
    const platformIndex = Math.floor(Math.random() * platforms.length)
    const iconIndex = Math.floor(Math.random() * icons.length)
    const correlationIndex = Math.floor(Math.random() * correlations.length)
    const riskLevel = Math.floor(Math.random() * 5) + 1
    const minInvestment = [10, 50, 100, 500, 1000, 2500, 5000, 10000, 25000][Math.floor(Math.random() * 9)]
    const accreditedOnly = Math.random() > 0.7

    // Create a more generic name based on the category
    const category = categories[categoryIndex]
    let name = ""

    switch (category) {
      case "Real Estate":
        name = ["Commercial Real Estate", "Residential Properties", "Real Estate Income Fund", "Property Portfolio"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Art":
        name = ["Contemporary Art", "Fine Art Collection", "Art Investment Fund", "Curated Artwork Portfolio"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Wine":
        name = ["Fine Wine Portfolio", "Vintage Wine Collection", "Wine Investment Fund", "Curated Wine Assets"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Farmland":
        name = ["US Farmland", "Agricultural Land", "Farmland Income Fund", "Sustainable Agriculture"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Collectibles":
        name = ["Rare Collectibles", "Memorabilia Portfolio", "Collectibles Fund", "Vintage Collection"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Alternative Assets":
        name = [
          "Multi-Asset Alternative Portfolio",
          "Diversified Alternatives",
          "Alternative Asset Fund",
          "Mixed Alternative Assets",
        ][Math.floor(Math.random() * 4)]
        break
      case "Private Equity":
        name = ["Private Equity Fund", "Growth Equity", "Private Company Portfolio", "Late-Stage Private Equity"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Commodities":
        name = ["Precious Metals", "Commodity Basket", "Natural Resources", "Commodity Fund"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Crypto":
        name = ["Cryptocurrency Fund", "Digital Asset Portfolio", "Blockchain Investments", "Crypto Index"][
          Math.floor(Math.random() * 4)
        ]
        break
      case "Venture Capital":
        name = ["Early-Stage Ventures", "Startup Portfolio", "Venture Fund", "Innovation Investments"][
          Math.floor(Math.random() * 4)
        ]
        break
      default:
        name = `${category} Portfolio`
    }

    additionalInvestments.push({
      id: i,
      name: name,
      platform: platforms[platformIndex],
      category: category,
      description: `A diversified ${category.toLowerCase()} investment opportunity with potential for both income and appreciation.`,
      minInvestment: `$${minInvestment.toLocaleString()}`,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      marketCorrelation: correlations[correlationIndex],
      riskLevel: riskLevel,
      liquidityLevel: Math.floor(Math.random() * 4) + 1,
      accreditedOnly: accreditedOnly,
      logo: "/diverse-alternative-assets.png",
      tags: ["Alternative Investment", "Portfolio Diversifier", category],
      pros: ["Diversification benefits", "Potential for above-market returns", "Professional management"],
      cons: ["Investment risks", "Potential liquidity constraints", "Market volatility"],
      icon: icons[iconIndex],
    })
  }

  return additionalInvestments
}
