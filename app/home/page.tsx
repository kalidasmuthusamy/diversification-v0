import { Suspense } from "react"

import HeroSection from "./components/hero-section"
import AssetClassPerformance from "./components/asset-class-performance"
import EducationSection from "./components/education-section"
import MarketAnalysis from "./components/market-analysis"
import PopularStocks from "./components/popular-stocks"
import NewsletterSignup from "./components/newsletter-signup"
import { TodaysTopFive } from "./components/todays-top-five"
import { VideoRecap } from "./components/video-recap"
import { TopTrendsSection } from "./components/top-trends-section"
import { ClientDiversificationWrapper } from "./components/client-diversification-wrapper"
import { NewsletterPromotionBanner } from "./components/newsletter-promotion-banner"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <NewsletterPromotionBanner />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopTrendsSection />
              <AssetClassPerformance />
            </div>

            <Suspense fallback={<div className="h-[400px] rounded-lg bg-gray-100 animate-pulse" />}>
              <MarketAnalysis />
            </Suspense>

            <EducationSection />

            <NewsletterSignup />
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-6">
            <TodaysTopFive />

            <VideoRecap />

            <ClientDiversificationWrapper />

            <PopularStocks />

            <NewsletterSignup compact />
          </div>
        </div>
      </div>
    </div>
  )
}
