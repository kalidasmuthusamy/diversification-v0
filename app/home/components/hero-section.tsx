import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import DiversificationScoreModal from "./diversification-score-modal"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Understand your portfolio's true diversification
            </h1>
            <p className="text-lg text-gray-600 mb-6 md:pr-12">
              Beyond simple asset allocation, discover how well your investments are protected against market
              volatility, inflation, and sector risks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <DiversificationScoreModal>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Calculate Your Score
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DiversificationScoreModal>
              <Link href="/education">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/diversified-growth.png"
              alt="Portfolio diversification visualization"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
