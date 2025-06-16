export type MacroIndicatorValue = {
  date: string
  value: number
  change: number
  changePercent: string
  isPositive: boolean
}

export type MacroIndicator = {
  id: string
  country: string
  countryCode: string
  indicator: string
  category: string
  unit: string
  frequency: string
  description: string
  importance: "High" | "Medium" | "Low"
  latestValue: MacroIndicatorValue
  historicalValues: MacroIndicatorValue[]
  forecastValue?: MacroIndicatorValue
  // Add statistical analysis
  statisticalAnalysis: {
    currentStatus: "Normal" | "Abnormally High" | "Abnormally Low" | "Extremely High" | "Extremely Low"
    percentileRank: number // 0-100, where current value ranks historically
    historicalAverage: number
    historicalRange: {
      min: number
      max: number
    }
    standardDeviations: number // How many standard deviations from mean
  }
  relatedIndicators: Array<{
    id: string
    country: string
    indicator: string
  }>
  relatedCountries: Array<{
    countryCode: string
    country: string
    value: number
    changePercent: string
    isPositive: boolean
  }>
  // Make market impact more educational and static
  marketConnections: Array<{
    assetClass: string
    relationship: "Positive Correlation" | "Negative Correlation" | "Complex Relationship" | "Limited Impact"
    explanation: string
    typicalScenarios: {
      whenRising: string
      whenFalling: string
    }
  }>
  nextReleaseDate: string
  source: string
  lastUpdated: string
}

export type MacroIndicatorMap = Record<string, MacroIndicator>

// Sample data for a few indicators
export const macroIndicators: MacroIndicatorMap = {
  "us-gdp": {
    id: "us-gdp",
    country: "United States",
    countryCode: "us",
    indicator: "GDP",
    category: "Economic Growth",
    unit: "%",
    frequency: "Quarterly",
    description:
      "Gross Domestic Product (GDP) measures the total value of all goods and services produced in the United States. It is the most comprehensive measure of economic activity and a key indicator of economic health.",
    importance: "High",
    latestValue: {
      date: "2025-03-31",
      value: 2.4,
      change: 0.3,
      changePercent: "+0.3%",
      isPositive: true,
    },
    historicalValues: [
      { date: "2024-12-31", value: 2.1, change: -0.1, changePercent: "-0.1%", isPositive: false },
      { date: "2024-09-30", value: 2.2, change: 0.4, changePercent: "+0.4%", isPositive: true },
      { date: "2024-06-30", value: 1.8, change: -0.5, changePercent: "-0.5%", isPositive: false },
      { date: "2024-03-31", value: 2.3, change: 0.2, changePercent: "+0.2%", isPositive: true },
    ],
    forecastValue: {
      date: "2025-06-30",
      value: 2.6,
      change: 0.2,
      changePercent: "+0.2%",
      isPositive: true,
    },
    statisticalAnalysis: {
      currentStatus: "Normal",
      percentileRank: 65,
      historicalAverage: 2.1,
      historicalRange: {
        min: -2.8,
        max: 4.9,
      },
      standardDeviations: 0.4,
    },
    relatedIndicators: [
      { id: "us-unemployment", country: "United States", indicator: "Unemployment Rate" },
      { id: "us-inflation", country: "United States", indicator: "Inflation Rate" },
      { id: "us-retail-sales", country: "United States", indicator: "Retail Sales" },
      { id: "us-industrial-production", country: "United States", indicator: "Industrial Production" },
    ],
    relatedCountries: [
      { countryCode: "eu", country: "European Union", value: 1.4, changePercent: "+0.2%", isPositive: true },
      { countryCode: "cn", country: "China", value: 5.2, changePercent: "-0.3%", isPositive: false },
      { countryCode: "jp", country: "Japan", value: 1.1, changePercent: "+0.4%", isPositive: true },
      { countryCode: "uk", country: "United Kingdom", value: 1.8, changePercent: "+0.3%", isPositive: true },
    ],
    marketConnections: [
      {
        assetClass: "US Equity Markets",
        relationship: "Positive Correlation",
        explanation:
          "GDP growth typically correlates with corporate earnings growth, as a growing economy generally means increased business activity, consumer spending, and corporate profits.",
        typicalScenarios: {
          whenRising:
            "Strong GDP growth often supports equity valuations, particularly in cyclical sectors like industrials, consumer discretionary, and financials.",
          whenFalling:
            "Declining GDP growth can pressure equity markets as investors anticipate reduced corporate earnings and potential recession risks.",
        },
      },
      {
        assetClass: "US Treasury Bonds",
        relationship: "Negative Correlation",
        explanation:
          "GDP growth influences Federal Reserve monetary policy decisions. Strong growth may lead to higher interest rates to prevent overheating, while weak growth may prompt rate cuts to stimulate the economy.",
        typicalScenarios: {
          whenRising:
            "Robust GDP growth may lead to expectations of higher interest rates, causing bond prices to decline and yields to rise.",
          whenFalling:
            "Weak GDP growth often results in expectations of monetary easing, supporting bond prices and lowering yields.",
        },
      },
      {
        assetClass: "US Dollar",
        relationship: "Positive Correlation",
        explanation:
          "Economic growth affects currency strength through interest rate expectations, capital flows, and relative economic performance compared to other countries.",
        typicalScenarios: {
          whenRising:
            "Strong GDP growth can strengthen the dollar as it may lead to higher interest rates and increased foreign investment.",
          whenFalling:
            "Weak GDP growth may weaken the dollar due to expectations of lower interest rates and reduced economic attractiveness.",
        },
      },
    ],
    nextReleaseDate: "2025-07-30",
    source: "Bureau of Economic Analysis",
    lastUpdated: "2025-04-25",
  },
  "south-korea-building-permits": {
    id: "south-korea-building-permits",
    country: "South Korea",
    countryCode: "kr",
    indicator: "Building Permits",
    category: "Construction",
    unit: "Count",
    frequency: "Monthly",
    description:
      "Building permits represent the number of new construction projects approved by local authorities in South Korea. This indicator provides insight into future construction activity and is a leading indicator for the construction sector and broader economic growth.",
    importance: "Medium",
    latestValue: {
      date: "2025-05-31",
      value: 54321,
      change: -1234,
      changePercent: "-2.2%",
      isPositive: false,
    },
    historicalValues: [
      { date: "2025-04-30", value: 55555, change: 2345, changePercent: "+4.4%", isPositive: true },
      { date: "2025-03-31", value: 53210, change: -1500, changePercent: "-2.7%", isPositive: false },
      { date: "2025-02-28", value: 54710, change: 1200, changePercent: "+2.2%", isPositive: true },
      { date: "2025-01-31", value: 53510, change: -980, changePercent: "-1.8%", isPositive: false },
    ],
    forecastValue: {
      date: "2025-06-30",
      value: 55000,
      change: 679,
      changePercent: "+1.2%",
      isPositive: true,
    },
    statisticalAnalysis: {
      currentStatus: "Abnormally Low",
      percentileRank: 25,
      historicalAverage: 58750,
      historicalRange: {
        min: 42000,
        max: 78000,
      },
      standardDeviations: -0.8,
    },
    relatedIndicators: [
      { id: "south-korea-housing-starts", country: "South Korea", indicator: "Housing Starts" },
      { id: "south-korea-construction-output", country: "South Korea", indicator: "Construction Output" },
      { id: "south-korea-gdp", country: "South Korea", indicator: "GDP" },
      { id: "south-korea-interest-rate", country: "South Korea", indicator: "Interest Rate" },
    ],
    relatedCountries: [
      { countryCode: "jp", country: "Japan", value: 67890, changePercent: "+1.5%", isPositive: true },
      { countryCode: "cn", country: "China", value: 345678, changePercent: "-3.2%", isPositive: false },
      { countryCode: "us", country: "United States", value: 123456, changePercent: "+2.1%", isPositive: true },
      { countryCode: "au", country: "Australia", value: 34567, changePercent: "+0.8%", isPositive: true },
    ],
    marketConnections: [
      {
        assetClass: "Korean Construction Stocks",
        relationship: "Positive Correlation",
        explanation:
          "Building permits are a leading indicator of construction activity. Higher permit issuance typically signals increased future construction work, which directly benefits construction companies' revenue and profitability.",
        typicalScenarios: {
          whenRising:
            "Increasing building permits often lead to higher construction company stock prices as investors anticipate improved business prospects and revenue growth.",
          whenFalling:
            "Declining permits may pressure construction stocks as investors expect reduced future construction activity and potential margin compression.",
        },
      },
      {
        assetClass: "Korean REITs",
        relationship: "Complex Relationship",
        explanation:
          "Building permits have a nuanced relationship with REITs. While new construction can increase supply and potentially pressure rents, it also indicates economic growth and development activity.",
        typicalScenarios: {
          whenRising:
            "High permit activity may indicate strong real estate demand but could also signal future supply increases that might pressure rental rates.",
          whenFalling:
            "Low permit activity might support existing property values due to limited new supply, but could also indicate weakening real estate demand.",
        },
      },
      {
        assetClass: "Korean Won",
        relationship: "Limited Impact",
        explanation:
          "Building permits alone typically have minimal direct impact on currency movements, though they contribute to broader economic sentiment and may influence monetary policy over time.",
        typicalScenarios: {
          whenRising:
            "Strong construction activity contributes to overall economic growth expectations, which may provide modest support for the currency.",
          whenFalling:
            "Weak construction activity may contribute to economic growth concerns, though the direct currency impact is usually limited.",
        },
      },
    ],
    nextReleaseDate: "2025-07-10",
    source: "Statistics Korea",
    lastUpdated: "2025-06-10",
  },
  "south-africa-cpi": {
    id: "south-africa-cpi",
    country: "South Africa",
    countryCode: "za",
    indicator: "Consumer Price Index",
    category: "Inflation",
    unit: "%",
    frequency: "Monthly",
    description:
      "The Consumer Price Index (CPI) measures the average change over time in the prices paid by consumers for a basket of goods and services in South Africa. It is the primary measure of inflation and is used to adjust monetary policy and wage contracts.",
    importance: "High",
    latestValue: {
      date: "2025-05-31",
      value: 4.8,
      change: 0.2,
      changePercent: "+0.2%",
      isPositive: false,
    },
    historicalValues: [
      { date: "2025-04-30", value: 4.6, change: -0.1, changePercent: "-0.1%", isPositive: true },
      { date: "2025-03-31", value: 4.7, change: 0.3, changePercent: "+0.3%", isPositive: false },
      { date: "2025-02-28", value: 4.4, change: -0.2, changePercent: "-0.2%", isPositive: true },
      { date: "2025-01-31", value: 4.6, change: 0.1, changePercent: "+0.1%", isPositive: false },
    ],
    forecastValue: {
      date: "2025-06-30",
      value: 4.7,
      change: -0.1,
      changePercent: "-0.1%",
      isPositive: true,
    },
    statisticalAnalysis: {
      currentStatus: "Normal",
      percentileRank: 55,
      historicalAverage: 4.9,
      historicalRange: {
        min: 2.1,
        max: 7.8,
      },
      standardDeviations: -0.1,
    },
    relatedIndicators: [
      { id: "south-africa-interest-rate", country: "South Africa", indicator: "Interest Rate" },
      { id: "south-africa-gdp", country: "South Africa", indicator: "GDP" },
      { id: "south-africa-unemployment", country: "South Africa", indicator: "Unemployment Rate" },
      { id: "south-africa-retail-sales", country: "South Africa", indicator: "Retail Sales" },
    ],
    relatedCountries: [
      { countryCode: "ng", country: "Nigeria", value: 15.2, changePercent: "-0.5%", isPositive: true },
      { countryCode: "eg", country: "Egypt", value: 12.8, changePercent: "+1.2%", isPositive: false },
      { countryCode: "br", country: "Brazil", value: 5.3, changePercent: "+0.3%", isPositive: false },
      { countryCode: "in", country: "India", value: 6.1, changePercent: "-0.2%", isPositive: true },
    ],
    marketConnections: [
      {
        assetClass: "South African Government Bonds",
        relationship: "Negative Correlation",
        explanation:
          "Inflation directly affects bond values through real return calculations and central bank policy responses. Higher inflation typically leads to higher interest rates, which inversely affect bond prices.",
        typicalScenarios: {
          whenRising:
            "Rising inflation often leads to expectations of higher interest rates, causing bond prices to decline as yields increase to maintain real returns.",
          whenFalling:
            "Declining inflation may lead to expectations of stable or lower interest rates, supporting bond prices and reducing yields.",
        },
      },
      {
        assetClass: "South African Rand",
        relationship: "Complex Relationship",
        explanation:
          "Inflation affects currency value through multiple channels: purchasing power, interest rate expectations, and relative inflation compared to trading partners.",
        typicalScenarios: {
          whenRising:
            "Higher inflation may weaken the currency due to reduced purchasing power, but could strengthen it if it leads to higher interest rates that attract foreign investment.",
          whenFalling:
            "Lower inflation may strengthen the currency by preserving purchasing power, but could weaken it if it leads to lower interest rates.",
        },
      },
      {
        assetClass: "Johannesburg Stock Exchange",
        relationship: "Complex Relationship",
        explanation:
          "Inflation affects equities through multiple channels: input costs, pricing power, real returns, and monetary policy responses. The net effect depends on the level and rate of change of inflation.",
        typicalScenarios: {
          whenRising:
            "Moderate inflation may benefit stocks as companies can raise prices, but high inflation can hurt margins and lead to tighter monetary policy.",
          whenFalling:
            "Declining inflation may support stocks through lower input costs and potential monetary easing, but deflation concerns can be negative.",
        },
      },
    ],
    nextReleaseDate: "2025-07-15",
    source: "Statistics South Africa",
    lastUpdated: "2025-06-15",
  },
}

export function getMacroIndicator(id: string): MacroIndicator | null {
  return macroIndicators[id] || null
}

export function getAllMacroIndicatorIds(): string[] {
  return Object.keys(macroIndicators)
}
