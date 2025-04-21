import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import HeroSection from "./components/hero-section"
import QuickLinks from "./components/quick-links"
import AssetClassPerformance from "./components/asset-class-performance"
import EducationSection from "./components/education-section"
import MarketAnalysis from "./components/market-analysis"
import PopularStocks from "./components/popular-stocks"
import NewsletterSignup from "./components/newsletter-signup"
import { TodaysTopFive } from "./components/todays-top-five"
import { VideoRecap } from "./components/video-recap"
import { TopTrendsSection } from "./components/top-trends-section"
import { ClientDiversificationWrapper } from "./components/client-diversification-wrapper"

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <div className="container py-8">
        <QuickLinks />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main content area - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopTrendsSection />
              <AssetClassPerformance />
            </div>

            <Suspense fallback={<div className="h-[400px] rounded-lg bg-gray-100 animate-pulse" />}>
              <MarketAnalysis />
            </Suspense>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Education Center</h2>
              <Link href="/education">
                <Button variant="outline" size="sm">
                  Explore Education
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <EducationSection />

            <NewsletterSignup />
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-6">
            <TodaysTopFive />

            <VideoRecap />

            <ClientDiversificationWrapper />

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Popular Stocks</h3>
              <Link href="/stocks">
                <Button variant="link" size="sm" className="text-primary p-0">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <PopularStocks />

            <NewsletterSignup compact />
          </div>
        </div>
      </div>
    </div>
  )
}
