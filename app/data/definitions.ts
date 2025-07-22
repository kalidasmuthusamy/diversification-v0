// app/data/definitions.ts
export interface DefinitionData {
  id: string
  term: string
  category: string
  definition: string
  keyTakeaways: string[]
  history?: {
    origin: string
    developer?: string
    year?: number
  }
  formula?: {
    equation: string
    variables: { symbol: string; description: string }[]
  }
  interpretation?: {
    description: string
    ranges?: { range: string; meaning: string }[]
  }
  example?: {
    scenario: string
    calculation: string
    result: string
    interpretation: string
  }
  applications: string[]
  limitations: string[]
  relatedConcepts: { term: string; comparison: string }[]
  faqs: { question: string; answer: string }[]
  relatedDefinitions: string[]
  furtherReading: { title: string; description: string; url?: string }[]
  seoMetadata: {
    title: string
    description: string
    keywords: string[]
  }
}

/* -------------------------  DEFINITIONS DATABASE  ------------------------ */

const definitionsData: Record<string, DefinitionData> = {
  /* --- Sharpe Ratio --- */
  "sharpe-ratio": {
    id: "sharpe-ratio",
    term: "Sharpe Ratio",
    category: "Risk-Adjusted Return",
    definition:
      "The Sharpe Ratio measures the risk-adjusted return of an investment portfolio. It indicates how much excess return an investor receives for the extra volatility they endure for holding a riskier asset.",
    keyTakeaways: [
      "The Sharpe Ratio is used to understand the return of an investment compared to its risk.",
      "A higher Sharpe Ratio is better, indicating more return per unit of risk.",
      "It is calculated by subtracting the risk-free rate from the return of the portfolio and dividing the result by the portfolio's standard deviation.",
    ],
    history: {
      origin:
        "Developed by Nobel laureate William F. Sharpe in 1966, the Sharpe Ratio has become a standard tool for analyzing portfolio performance.",
      developer: "William F. Sharpe",
      year: 1966,
    },
    formula: {
      equation: "Sharpe Ratio = (Rp - Rf) / σp",
      variables: [
        { symbol: "Rp", description: "Return of the portfolio" },
        { symbol: "Rf", description: "Risk-free rate" },
        { symbol: "σp", description: "Standard deviation of the portfolio's excess return" },
      ],
    },
    interpretation: {
      description:
        "The Sharpe Ratio provides a single number that is easy to interpret. It helps investors understand the risk-adjusted return of their investments.",
      ranges: [
        {
          range: "< 1.0",
          meaning: "Considered not good; the investment's return is not much higher than the risk-free rate.",
        },
        { range: "1.0 - 2.0", meaning: "Adequate; provides reasonable risk-adjusted return." },
        { range: "2.0 - 3.0", meaning: "Very good; indicates a good risk-adjusted return." },
        { range: "> 3.0", meaning: "Excellent; suggests a superior risk-adjusted return." },
      ],
    },
    example: {
      scenario: "An investment portfolio has a return of 15%, a risk-free rate of 2%, and a standard deviation of 10%.",
      calculation: "Sharpe Ratio = (15% - 2%) / 10% = 1.3",
      result: "1.3",
      interpretation: "The Sharpe Ratio of 1.3 indicates an adequate risk-adjusted return.",
    },
    applications: [
      "Portfolio performance evaluation",
      "Comparing different investment strategies",
      "Assessing the impact of adding or removing assets from a portfolio",
    ],
    limitations: [
      "Assumes returns are normally distributed, which may not always be the case.",
      "Sensitive to the accuracy of the inputs, especially the standard deviation.",
      "Does not account for all types of risk.",
    ],
    relatedConcepts: [
      {
        term: "Treynor Ratio",
        comparison: "Similar to the Sharpe Ratio but uses beta instead of standard deviation to measure risk.",
      },
      {
        term: "Sortino Ratio",
        comparison: "Focuses on downside risk (negative volatility) rather than total volatility.",
      },
    ],
    faqs: [
      {
        question: "What is a good Sharpe Ratio?",
        answer:
          "A Sharpe Ratio above 1.0 is generally considered acceptable, while a ratio above 2.0 is considered very good.",
      },
      {
        question: "How is the Sharpe Ratio used in practice?",
        answer: "It is used to compare the risk-adjusted returns of different investment portfolios or strategies.",
      },
      {
        question: "What are the limitations of the Sharpe Ratio?",
        answer: "It assumes returns are normally distributed and may not accurately reflect all types of risk.",
      },
    ],
    relatedDefinitions: ["alpha", "beta"],
    furtherReading: [
      {
        title: "The Sharpe Ratio",
        description: "Original paper by William F. Sharpe introducing the concept.",
      },
      {
        title: "Sharpe Ratio: Uses, Advantages, Limitations, and Examples",
        description: "Investopedia article providing a comprehensive overview of the Sharpe Ratio.",
      },
    ],
    seoMetadata: {
      title: "Sharpe Ratio: Definition, Formula, and Interpretation",
      description:
        "Learn about the Sharpe Ratio, a key metric for evaluating risk-adjusted investment returns. Understand its formula, interpretation, and limitations.",
      keywords: [
        "Sharpe Ratio",
        "risk-adjusted return",
        "investment performance",
        "portfolio analysis",
        "risk management",
      ],
    },
  },

  /* --- Alpha --- */
  alpha: {
    id: "alpha",
    term: "Alpha",
    category: "Performance Metrics",
    definition:
      "Alpha is a measure of an investment's performance relative to a benchmark index, representing the excess return generated by an investment manager's skill rather than market movements. It indicates whether an investment has outperformed or underperformed its expected return based on its beta and the market's performance.",
    keyTakeaways: [
      "Alpha measures excess return above what would be expected given the investment's risk level",
      "Positive alpha indicates outperformance, while negative alpha indicates underperformance",
      "Alpha is often used to evaluate the skill of portfolio managers and active investment strategies",
      "It's calculated by comparing actual returns to expected returns based on the Capital Asset Pricing Model (CAPM)",
      "Alpha should be considered alongside other metrics like beta, Sharpe ratio, and standard deviation",
    ],
    history: {
      origin:
        "The concept of alpha was developed as part of the Capital Asset Pricing Model (CAPM) in the 1960s by financial economists including William Sharpe, John Lintner, and Jan Mossin.",
    },
    formula: {
      equation: "α = Rp − [Rf + β (Rm − Rf)]",
      variables: [
        { symbol: "Rp", description: "Return of the portfolio" },
        { symbol: "Rf", description: "Risk-free rate" },
        { symbol: "β", description: "Beta of the portfolio" },
        { symbol: "Rm", description: "Return of the market" },
      ],
    },
    interpretation: {
      description:
        "Alpha can be positive, negative, or zero. A positive alpha indicates outperformance after adjusting for risk; a negative alpha indicates underperformance.",
      ranges: [
        { range: "α > 2%", meaning: "Strong out-performance" },
        { range: "0 < α ≤ 2%", meaning: "Modest out-performance" },
        { range: "α = 0%", meaning: "Performance in-line with expectations" },
        { range: "−2% ≤ α < 0%", meaning: "Modest under-performance" },
        { range: "α < −2%", meaning: "Significant under-performance" },
      ],
    },
    example: {
      scenario: "A fund returned 12% while the risk-free rate was 2%, market return 10%, and the fund's beta 1.2.",
      calculation: "α = 12% − [2% + 1.2×(10% − 2%)] = 0.4%",
      result: "0.4%",
      interpretation: "The fund beat its risk-adjusted expectation by 0.4 percentage points.",
    },
    applications: [
      "Evaluating portfolio manager skill",
      "Comparing active strategies to passive benchmarks",
      "Determining if management fees are justified",
      "Selecting investments with consistent positive alpha",
      "Risk-adjusted performance measurement",
    ],
    limitations: [
      "Depends on an appropriate benchmark",
      "Historical alpha doesn't guarantee future results",
      "Short-term alpha may be driven by luck",
      "CAPM assumptions limit precision",
      "Ignores other risk factors outside CAPM",
    ],
    relatedConcepts: [
      {
        term: "Beta",
        comparison: "Beta measures systematic risk; alpha measures excess return beyond that risk.",
      },
      {
        term: "Sharpe Ratio",
        comparison: "Sharpe Ratio expresses excess return per unit of total risk, whereas alpha is a residual return.",
      },
    ],
    faqs: [
      {
        question: "Can alpha be negative?",
        answer:
          "Yes. A negative alpha means the investment underperformed relative to its expected, risk-adjusted return.",
      },
      {
        question: "Is a higher alpha always better?",
        answer: "Generally yes, but alpha must be viewed alongside consistency, risk and statistical significance.",
      },
    ],
    relatedDefinitions: ["sharpe-ratio"],
    furtherReading: [
      {
        title: "The Capital Asset Pricing Model: Theory and Evidence",
        description: "Foundational academic paper on CAPM and alpha.",
      },
      {
        title: "Active Portfolio Management and Alpha Generation",
        description: "Comprehensive guide to understanding and generating alpha.",
      },
    ],
    seoMetadata: {
      title: "Alpha: Definition, Formula & Investing Example",
      description:
        "Learn what Alpha is, how to calculate it, and how investors use alpha to evaluate portfolio manager performance.",
      keywords: ["alpha", "excess return", "CAPM", "investment performance", "portfolio alpha"],
    },
  },
}

/* ----------------------------  HELPER FUNCTIONS  -------------------------- */

export function getDefinition(id: string): DefinitionData | null {
  return definitionsData[id] || null
}

export function getAllDefinitionIds(): string[] {
  return Object.keys(definitionsData)
}

export function getDefinitionsByCategory(category: string): DefinitionData[] {
  return Object.values(definitionsData).filter((d) => d.category === category)
}

export function getRelatedDefinitions(currentId: string, limit = 6): DefinitionData[] {
  const current = definitionsData[currentId]
  if (!current) return []
  return current.relatedDefinitions
    .map((id) => definitionsData[id])
    .filter(Boolean)
    .slice(0, limit)
}

export const definitionCategories = [
  "Risk Management",
  "Performance Metrics",
  "Portfolio Theory",
  "Valuation",
  "Technical Analysis",
  "Options & Derivatives",
  "Fixed Income",
  "Alternative Investments",
  "Market Structure",
  "Corporate Finance",
  "Behavioral Finance",
]
