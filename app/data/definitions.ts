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

const definitionsData: Record<string, DefinitionData> = {
  "sharpe-ratio": {
    id: "sharpe-ratio",
    term: "Sharpe Ratio",
    category: "Risk Management",
    definition:
      "Sharpe Ratio is a portfolio metric that measures how much excess return an investment generates for each unit of risk taken. It helps investors evaluate whether the returns they are receiving are a result of intelligent investment decisions or a byproduct of assuming greater risk. The formula incorporates both the return of the investment and the volatility of those returns, offering a way to assess risk-adjusted performance.",
    keyTakeaways: [
      "Sharpe Ratio measures an investment's excess return relative to its volatility",
      "It is calculated by subtracting the risk-free rate from the investment return and dividing by standard deviation",
      "A higher Sharpe Ratio typically suggests better risk-adjusted performance",
      "The ratio helps compare investments with different levels of risk on a standardized scale",
      "It assumes that investment returns are normally distributed and that volatility is an accurate proxy for risk",
    ],
    history: {
      origin:
        'The Sharpe Ratio was developed by economist William F. Sharpe in 1966. Originally named the "reward-to-variability ratio," it was designed as a tool to assess the performance of investment portfolios by adjusting for risk. The ratio became widely adopted in academic research and financial practice and was later renamed in Sharpe\'s honor. Today, it is one of the most frequently used metrics in modern portfolio theory and investment analysis.',
      developer: "William F. Sharpe",
      year: 1966,
    },
    formula: {
      equation: "Sharpe Ratio = (Rp − Rf) / σp",
      variables: [
        { symbol: "Rp", description: "Return of the portfolio or investment" },
        {
          symbol: "Rf",
          description: "Risk-free rate of return, often based on the yield of short-term U.S. Treasury bills",
        },
        { symbol: "σp", description: "Standard deviation of the portfolio's returns, representing total volatility" },
      ],
    },
    interpretation: {
      description:
        "The Sharpe Ratio provides insight into how efficiently an investment has delivered returns compared to the amount of risk it took on. A positive ratio indicates that the return exceeded the risk-free rate, while a negative ratio suggests underperformance relative to a low-risk benchmark.",
      ranges: [
        { range: "Less than 1.0", meaning: "Lower efficiency in risk-adjusted performance" },
        { range: "Between 1.0 and 2.0", meaning: "Moderate or acceptable performance" },
        { range: "Above 2.0", meaning: "Strong performance on a risk-adjusted basis" },
        {
          range: "Above 3.0",
          meaning: "Rare and potentially indicative of unusually effective risk management or favorable conditions",
        },
      ],
    },
    example: {
      scenario:
        "An investor holds a portfolio that returned 8% over the past year. The risk-free rate during that time was 3%, and the portfolio's standard deviation was 10%.",
      calculation: "Sharpe Ratio = (8 − 3) / 10 = 5 / 10 = 0.5",
      result: "0.5",
      interpretation:
        "In this case, the investor earned 0.5 units of excess return for every unit of risk taken. Depending on the investor's goals and the market environment, this may indicate a need for reassessing the risk-return tradeoff.",
    },
    applications: [
      "Performance reporting and fund comparison",
      "Portfolio construction and optimization",
      "Evaluating which assets or strategies have historically delivered better returns relative to their volatility",
      "Designing portfolios to balance return expectations with acceptable levels of risk",
      "Identifying combinations of assets that may optimize returns without significantly increasing volatility",
    ],
    limitations: [
      "Assumes returns follow a normal distribution, which may not hold true for all asset classes",
      "Penalizes both upward and downward volatility equally, which may not align with how investors view risk",
      "Short-term or volatile periods can distort the ratio",
      "May not be appropriate for evaluating assets with asymmetrical or non-linear return profiles, such as options or hedge fund strategies",
    ],
    relatedConcepts: [
      {
        term: "Standard Deviation",
        comparison:
          "Standard deviation measures the volatility of returns, while the Sharpe Ratio uses this volatility to assess the efficiency of returns. The Sharpe Ratio adds context by relating performance to risk.",
      },
      {
        term: "Risk-Adjusted Return",
        comparison:
          "Sharpe Ratio is a specific way to measure risk-adjusted return, using standard deviation as the risk component. Other methods, such as the Sortino Ratio, adjust for downside risk only.",
      },
    ],
    faqs: [
      {
        question: 'What is a "good" Sharpe Ratio?',
        answer:
          "A Sharpe Ratio above 1.0 is often considered acceptable, while values above 2.0 may indicate strong performance. Context matters based on asset type and time frame.",
      },
      {
        question: "Can the Sharpe Ratio be negative?",
        answer:
          "Yes. A negative Sharpe Ratio means the investment returned less than the risk-free rate or was highly volatile relative to its return.",
      },
      {
        question: "What is considered a risk-free rate?",
        answer:
          "The yield on a short-term U.S. Treasury bill is commonly used as a proxy for the risk-free rate in Sharpe Ratio calculations.",
      },
      {
        question: "Does the Sharpe Ratio apply to all asset classes?",
        answer:
          "While it is widely used, Sharpe Ratio may be less reliable for assets with irregular return distributions or limited liquidity.",
      },
      {
        question: "How often is Sharpe Ratio calculated?",
        answer:
          "It can be calculated monthly, quarterly, or annually, depending on the analysis needs and consistency of the input data.",
      },
    ],
    relatedDefinitions: [
      "sortino-ratio",
      "standard-deviation",
      "beta",
      "alpha",
      "risk-adjusted-return",
      "modern-portfolio-theory",
    ],
    furtherReading: [
      {
        title: "Modern Portfolio Theory and Risk Management",
        description: "Comprehensive guide to portfolio optimization techniques and risk metrics",
      },
      {
        title: "Understanding Investment Risk Metrics",
        description: "Deep dive into various risk-adjusted performance measures used in finance",
      },
      {
        title: "Portfolio Performance Evaluation",
        description: "Methods and best practices for assessing investment performance",
      },
    ],
    seoMetadata: {
      title: "Sharpe Ratio: Definition, Formula, Example, and FAQs",
      description:
        "Learn about Sharpe Ratio, a key portfolio metric that measures risk-adjusted returns. Includes formula, calculation examples, interpretation guide, and practical applications.",
      keywords: [
        "sharpe ratio",
        "risk adjusted return",
        "portfolio metrics",
        "investment analysis",
        "volatility",
        "standard deviation",
        "risk management",
      ],
    },
  },
  beta: {
    id: "beta",
    term: "Beta",
    category: "Risk Management",
    definition:
      "Beta is a measure of a security's or portfolio's volatility relative to the overall market. It indicates how much a stock's price moves in relation to movements in a market index, typically the S&P 500. Beta helps investors understand the systematic risk of an investment and how it might perform during market fluctuations.",
    keyTakeaways: [
      "Beta measures a security's volatility relative to the overall market",
      "A beta of 1.0 means the security moves in line with the market",
      "Beta greater than 1.0 indicates higher volatility than the market",
      "Beta less than 1.0 suggests lower volatility than the market",
      "Negative beta indicates the security moves opposite to the market",
    ],
    history: {
      origin:
        "Beta was developed as part of the Capital Asset Pricing Model (CAPM) in the 1960s by William Sharpe, John Lintner, and Jan Mossin. It became a fundamental concept in modern portfolio theory for measuring systematic risk.",
      year: 1964,
    },
    formula: {
      equation: "β = Covariance(Ra, Rm) / Variance(Rm)",
      variables: [
        { symbol: "Ra", description: "Return of the asset" },
        { symbol: "Rm", description: "Return of the market" },
        { symbol: "Covariance(Ra, Rm)", description: "Covariance between asset and market returns" },
        { symbol: "Variance(Rm)", description: "Variance of market returns" },
      ],
    },
    interpretation: {
      description: "Beta values help investors understand how a security might behave relative to market movements.",
      ranges: [
        { range: "β = 1.0", meaning: "Security moves exactly with the market" },
        { range: "β > 1.0", meaning: "Security is more volatile than the market" },
        { range: "β < 1.0", meaning: "Security is less volatile than the market" },
        { range: "β = 0", meaning: "Security has no correlation with market movements" },
        { range: "β < 0", meaning: "Security moves opposite to the market" },
      ],
    },
    example: {
      scenario:
        "A stock has a beta of 1.5. If the market rises by 10%, we would expect this stock to rise by approximately 15%. If the market falls by 10%, we would expect this stock to fall by approximately 15%.",
      calculation: "Expected Stock Movement = Beta × Market Movement = 1.5 × 10% = 15%",
      result: "15% expected movement",
      interpretation: "This stock is 50% more volatile than the overall market, amplifying both gains and losses.",
    },
    applications: [
      "Portfolio risk assessment and management",
      "Asset allocation and diversification strategies",
      "Calculating expected returns using CAPM",
      "Comparing volatility across different securities",
      "Hedging strategies and risk management",
    ],
    limitations: [
      "Based on historical data and may not predict future volatility",
      "Assumes linear relationship between security and market returns",
      "May be unstable over different time periods",
      "Does not capture all types of risk, only systematic risk",
    ],
    relatedConcepts: [
      {
        term: "Alpha",
        comparison:
          "While Beta measures systematic risk relative to the market, Alpha measures excess return above what Beta would predict.",
      },
      {
        term: "Correlation",
        comparison:
          "Beta incorporates both correlation and relative volatility, while correlation only measures the direction of movement.",
      },
    ],
    faqs: [
      {
        question: "What is a good beta for a stock?",
        answer:
          "It depends on your risk tolerance. Conservative investors might prefer beta below 1.0, while aggressive investors might seek beta above 1.0 for higher potential returns.",
      },
      {
        question: "Can beta change over time?",
        answer:
          "Yes, beta can change as a company's business model evolves, market conditions change, or the calculation period shifts.",
      },
      {
        question: "What does negative beta mean?",
        answer:
          "Negative beta means the security tends to move opposite to the market. This is rare but can occur with certain assets like gold or inverse ETFs.",
      },
    ],
    relatedDefinitions: ["alpha", "sharpe-ratio", "correlation", "capm", "systematic-risk", "volatility"],
    furtherReading: [
      {
        title: "Capital Asset Pricing Model (CAPM) Explained",
        description: "Understanding the theoretical framework behind beta and expected returns",
      },
      {
        title: "Systematic vs. Unsystematic Risk",
        description: "Learn the difference between market risk and company-specific risk",
      },
    ],
    seoMetadata: {
      title: "Beta: Definition, Formula, Calculation, and Investment Applications",
      description:
        "Understand Beta, a key measure of investment volatility relative to the market. Learn how to calculate and interpret beta for better investment decisions.",
      keywords: ["beta", "systematic risk", "market volatility", "CAPM", "investment risk", "portfolio management"],
    },
  },
}

export function getDefinition(id: string): DefinitionData | null {
  return definitionsData[id] || null
}

export function getAllDefinitionIds(): string[] {
  return Object.keys(definitionsData)
}

export function getDefinitionsByCategory(category: string): DefinitionData[] {
  return Object.values(definitionsData).filter((def) => def.category === category)
}

export function getRelatedDefinitions(currentId: string, limit = 6): DefinitionData[] {
  const current = definitionsData[currentId]
  if (!current) return []

  const related = current.relatedDefinitions
    .map((id) => definitionsData[id])
    .filter(Boolean)
    .slice(0, limit)

  return related
}

export const definitionCategories = [
  "Risk Management",
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
