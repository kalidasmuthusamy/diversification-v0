import { TopNav } from "../home/components/top-nav"
import { MainNav } from "../home/components/main-nav"
import { MarketTicker } from "../home/components/market-ticker"

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <TopNav />
      <MainNav />
      <MarketTicker />
    </div>
  )
}
