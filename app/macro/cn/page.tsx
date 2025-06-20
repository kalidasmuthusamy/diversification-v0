import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "China Economic Indicators | Chinese Macro Data | Diversification.com",
  description:
    "Browse our comprehensive database of China economic indicators and macro data. Find detailed information and analysis on thousands of Chinese economic metrics.",
}

// G20 countries for tabs
const countries = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "cn", name: "China", flag: "🇨🇳" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
]

export default function ChinaMacroIndexPage() {
  // Generate a large list of China economic indicators for SEO
  const indicators = [
    { id: "gdp", name: "GDP Growth Rate" },
    { id: "inflation", name: "Inflation Rate (CPI)" },
    { id: "unemployment", name: "Unemployment Rate" },
    { id: "interest-rates", name: "Loan Prime Rate" },
    { id: "retail-sales", name: "Retail Sales" },
    { id: "industrial-production", name: "Industrial Production" },
    { id: "fixed-asset-investment", name: "Fixed Asset Investment" },
    { id: "foreign-exchange-reserves", name: "Foreign Exchange Reserves" },
    { id: "manufacturing-pmi", name: "Manufacturing PMI" },
    { id: "non-manufacturing-pmi", name: "Non-Manufacturing PMI" },
    { id: "trade-balance", name: "Trade Balance" },
    { id: "current-account", name: "Current Account" },
    { id: "government-debt", name: "Government Debt to GDP" },
    { id: "budget-deficit", name: "Budget Deficit" },
    { id: "money-supply-m2", name: "Money Supply M2" },
    { id: "new-yuan-loans", name: "New Yuan Loans" },
    { id: "total-social-financing", name: "Total Social Financing" },
    { id: "house-price-index", name: "House Price Index" },
    { id: "producer-prices", name: "Producer Prices" },
    { id: "caixin-manufacturing-pmi", name: "Caixin Manufacturing PMI" },
    { id: "caixin-services-pmi", name: "Caixin Services PMI" },
    { id: "exports", name: "Exports" },
    { id: "imports", name: "Imports" },
    { id: "foreign-direct-investment", name: "Foreign Direct Investment" },
    { id: "vehicle-sales", name: "Vehicle Sales" },
    { id: "electricity-production", name: "Electricity Production" },
    { id: "coal-production", name: "Coal Production" },
    { id: "steel-production", name: "Steel Production" },
    { id: "cement-production", name: "Cement Production" },
    { id: "consumer-confidence", name: "Consumer Confidence" },
    { id: "balance-of-trade", name: "Balance of Trade" },
    { id: "bank-lending-rate", name: "Bank Lending Rate" },
    { id: "banks-balance-sheet", name: "Banks Balance Sheet" },
    { id: "business-confidence", name: "Business Confidence" },
    { id: "capacity-utilization", name: "Capacity Utilization" },
    { id: "capital-flows", name: "Capital Flows" },
    { id: "car-registrations", name: "Car Registrations" },
    { id: "central-bank-balance-sheet", name: "Central Bank Balance Sheet" },
    { id: "composite-pmi", name: "Composite PMI" },
    { id: "construction-output", name: "Construction Output" },
    { id: "consumer-credit", name: "Consumer Credit" },
    { id: "consumer-price-index-cpi", name: "Consumer Price Index (CPI)" },
    { id: "consumer-spending", name: "Consumer Spending" },
    { id: "corporate-profits", name: "Corporate Profits" },
    { id: "corporate-tax-rate", name: "Corporate Tax Rate" },
    { id: "corruption-index", name: "Corruption Index" },
    { id: "crude-oil-production", name: "Crude Oil Production" },
    { id: "currency", name: "Currency" },
    { id: "current-account-to-gdp", name: "Current Account to GDP" },
    { id: "deposit-interest-rate", name: "Deposit Interest Rate" },
    { id: "disposable-personal-income", name: "Disposable Personal Income" },
    { id: "ease-of-doing-business", name: "Ease of Doing Business" },
    { id: "employed-persons", name: "Employed Persons" },
    { id: "employment-change", name: "Employment Change" },
    { id: "employment-rate", name: "Employment Rate" },
    { id: "export-prices", name: "Export Prices" },
    { id: "external-debt", name: "External Debt" },
    { id: "fiscal-expenditure", name: "Fiscal Expenditure" },
    { id: "food-inflation", name: "Food Inflation" },
    { id: "foreign-bond-investment", name: "Foreign Bond Investment" },
    { id: "foreign-stock-investment", name: "Foreign Stock Investment" },
    { id: "full-time-employment", name: "Full Time Employment" },
    { id: "gasoline-prices", name: "Gasoline Prices" },
    { id: "gdp-annual-growth-rate", name: "GDP Annual Growth Rate" },
    { id: "gdp-constant-prices", name: "GDP Constant Prices" },
    { id: "gdp-from-agriculture", name: "GDP From Agriculture" },
    { id: "gdp-from-construction", name: "GDP From Construction" },
    { id: "gdp-from-manufacturing", name: "GDP From Manufacturing" },
    { id: "gdp-from-mining", name: "GDP From Mining" },
    { id: "gdp-from-public-administration", name: "GDP From Public Administration" },
    { id: "gdp-from-services", name: "GDP From Services" },
    { id: "gdp-from-transport", name: "GDP From Transport" },
    { id: "gdp-from-utilities", name: "GDP From Utilities" },
    { id: "gdp-growth-rate", name: "GDP Growth Rate" },
    { id: "gdp-per-capita", name: "GDP per capita" },
    { id: "gdp-per-capita-ppp", name: "GDP per capita PPP" },
    { id: "gold-reserves", name: "Gold Reserves" },
    { id: "government-bond-10y", name: "Government Bond 10Y" },
    { id: "government-bond-2y", name: "Government Bond 2Y" },
    { id: "government-bond-5y", name: "Government Bond 5Y" },
    { id: "government-budget", name: "Government Budget" },
    { id: "government-budget-value", name: "Government Budget Value" },
    { id: "government-debt-to-gdp", name: "Government Debt to GDP" },
    { id: "government-revenues", name: "Government Revenues" },
    { id: "government-spending", name: "Government Spending" },
    { id: "government-spending-to-gdp", name: "Government Spending To GDP" },
    { id: "gross-fixed-capital-formation", name: "Gross Fixed Capital Formation" },
    { id: "harmonised-consumer-prices", name: "Harmonised Consumer Prices" },
    { id: "home-ownership-rate", name: "Home Ownership Rate" },
    { id: "hospital-beds", name: "Hospital Beds" },
    { id: "hospitals", name: "Hospitals" },
    { id: "house-price-index", name: "House Price Index" },
    { id: "housing-index", name: "Housing Index" },
    { id: "housing-starts", name: "Housing Starts" },
    { id: "import-prices", name: "Import Prices" },
    { id: "industrial-production", name: "Industrial Production" },
    { id: "industrial-production-mom", name: "Industrial Production Mom" },
    { id: "inflation-expectations", name: "Inflation Expectations" },
    { id: "inflation-rate", name: "Inflation Rate" },
    { id: "inflation-rate-mom", name: "Inflation Rate Mom" },
    { id: "interbank-rate", name: "Interbank Rate" },
    { id: "interest-rate", name: "Interest Rate" },
    { id: "internet-speed", name: "Internet Speed" },
    { id: "job-offers", name: "Job Offers" },
    { id: "job-vacancies", name: "Job Vacancies" },
    { id: "labor-force-participation-rate", name: "Labor Force Participation Rate" },
    { id: "labor-costs", name: "Labor Costs" },
    { id: "leading-economic-index", name: "Leading Economic Index" },
    { id: "lending-rate", name: "Lending Rate" },
    { id: "loan-growth", name: "Loan Growth" },
    { id: "loans-to-private-sector", name: "Loans to Private Sector" },
    { id: "long-term-unemployment-rate", name: "Long Term Unemployment Rate" },
    { id: "manufacturing-pmi", name: "Manufacturing PMI" },
    { id: "manufacturing-production", name: "Manufacturing Production" },
    { id: "military-expenditure", name: "Military Expenditure" },
    { id: "minimum-wages", name: "Minimum Wages" },
    { id: "mining-production", name: "Mining Production" },
    { id: "money-supply-m0", name: "Money Supply M0" },
    { id: "money-supply-m1", name: "Money Supply M1" },
    { id: "money-supply-m2", name: "Money Supply M2" },
    { id: "money-supply-m3", name: "Money Supply M3" },
    { id: "natural-gas-imports", name: "Natural gas Imports" },
    { id: "natural-gas-production", name: "Natural gas Production" },
    { id: "natural-gas-stocks", name: "Natural gas Stocks" },
    { id: "new-orders", name: "New Orders" },
    { id: "part-time-employment", name: "Part Time Employment" },
    { id: "personal-income", name: "Personal Income" },
    { id: "personal-income-tax-rate", name: "Personal Income Tax Rate" },
    { id: "personal-savings", name: "Personal Savings" },
    { id: "personal-spending", name: "Personal Spending" },
    { id: "population", name: "Population" },
    { id: "private-debt-to-gdp", name: "Private Debt to GDP" },
    { id: "private-investment", name: "Private Investment" },
    { id: "private-sector-credit", name: "Private Sector Credit" },
    { id: "producer-prices", name: "Producer Prices" },
    { id: "producer-prices-change", name: "Producer Prices Change" },
    { id: "productivity", name: "Productivity" },
    { id: "retail-sales-mom", name: "Retail Sales MoM" },
    { id: "retail-sales-yoy", name: "Retail Sales YoY" },
    { id: "retirement-age-men", name: "Retirement Age Men" },
    { id: "retirement-age-women", name: "Retirement Age Women" },
    { id: "services-pmi", name: "Services PMI" },
    { id: "social-security-rate", name: "Social Security Rate" },
    { id: "social-security-rate-for-companies", name: "Social Security Rate For Companies" },
    { id: "social-security-rate-for-employees", name: "Social Security Rate For Employees" },
    { id: "stock-market", name: "Stock Market" },
    { id: "terms-of-trade", name: "Terms of Trade" },
    { id: "terrorism-index", name: "Terrorism Index" },
    { id: "total-vehicle-sales", name: "Total Vehicle Sales" },
    { id: "tourism-revenues", name: "Tourism Revenues" },
    { id: "tourist-arrivals", name: "Tourist Arrivals" },
    { id: "unemployed-persons", name: "Unemployed Persons" },
    { id: "unemployment-change", name: "Unemployment Change" },
    { id: "unemployment-rate", name: "Unemployment Rate" },
    { id: "wages", name: "Wages" },
    { id: "wages-in-manufacturing", name: "Wages in Manufacturing" },
    { id: "weapons-sales", name: "Weapons Sales" },
    { id: "wholesale-inventories", name: "Wholesale Inventories" },
    { id: "wholesale-prices", name: "Wholesale Prices" },
    { id: "youth-unemployment-rate", name: "Youth Unemployment Rate" },
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <Link href="/macro" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Economic Indicators
        </Link>
        <div className="flex items-center gap-3 mt-2 mb-4">
          <span className="text-3xl">🇨🇳</span>
          <h1 className="text-3xl font-bold">Economic Indicators Database</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Browse our comprehensive database of economic indicators and macro data.
        </p>

        <div className="relative max-w-md mb-8">
          <Input type="search" placeholder="Search economic indicators..." className="h-12 text-lg" />
        </div>
      </div>

      <Tabs defaultValue="cn" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap">
          {countries.map((country) => (
            <TabsTrigger key={country.code} value={country.code} asChild>
              <Link href={`/macro/${country.code}`} className="flex items-center gap-2">
                <span>{country.flag}</span>
                {country.name}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {indicators.map((indicator) => (
          <Link
            key={indicator.id}
            href={`/macro/cn/${indicator.id}`}
            className="block p-2 hover:bg-muted/30 rounded-md transition-colors"
          >
            {indicator.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
