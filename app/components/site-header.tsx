import { TopNav } from "../home/components/top-nav"
import { MainNav } from "../home/components/main-nav"
import { MarketTicker } from "../home/components/market-ticker"

export function SiteHeader() {
  return (
    <>
      <TopNav />
      <MainNav />
      <MarketTicker />
    </>
  )
}
