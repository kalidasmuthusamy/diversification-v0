"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Define the slides for the carousel
const slides = [
  {
    id: "diversification-score",
    title: "How diversified are you really?",
    description:
      "Beyond simple asset allocation, discover how well your investments are protected against market volatility, inflation, and sector risks.",
    image: "/diversified-growth.png",
    imageAlt: "Portfolio diversification visualization",
    primaryButton: {
      text: "Calculate Score",
      href: "/diversification-score",
    },
  },
  {
    id: "contest",
    title: "Win over $240,000 in prizes",
    description: "Calculate your Diversification Score to enter. Let's find out how diversified investors really are!",
    image: "/balanced-growth-path.png",
    imageAlt: "Contest prize visualization",
    primaryButton: {
      text: "Enter Contest",
      href: "/diversification-score",
    },
  },
  {
    id: "alternatives",
    title: "Discover alternative investments",
    description:
      "Look beyond traditional stocks and bonds with our marketplace of alternative investment opportunities.",
    image: "/diverse-alternative-assets.png",
    imageAlt: "Alternative investments marketplace",
    primaryButton: {
      text: "Explore Alternatives",
      href: "/alternatives",
    },
  },
  {
    id: "education",
    title: "Insights for long-term investors",
    description: "Find articles about tax optimization, portfolio management, financial planning, and more.",
    image: "/growth-through-planning.png",
    imageAlt: "Long-term investment growth visualization",
    primaryButton: {
      text: "Education Center",
      href: "/education",
    },
    conditional: true, // This slide will only show if user hasn't subscribed
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Filter out conditional slides if needed
  const filteredSlides = slides.filter((slide) => !slide.conditional || (slide.conditional && !isSubscribed))

  // Check if user is subscribed to newsletter (simplified example)
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("newsletterSubscribed") === "true"
    setIsSubscribed(hasSubscribed)
  }, [])

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length)
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(interval)
  }, [filteredSlides.length])

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length)
  }, [filteredSlides.length])

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length)
  }, [filteredSlides.length])

  const currentSlideData = filteredSlides[currentSlide]

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
      {/* Left navigation arrow - positioned on left side of entire hero */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      <div className="container py-6 sm:py-8 md:py-12 lg:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4">
              {currentSlideData.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6 md:pr-12">
              {currentSlideData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href={currentSlideData.primaryButton.href || "#"} className="w-full sm:w-auto">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full text-sm md:text-base">
                  {currentSlideData.primaryButton.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Carousel navigation dots */}
            <div className="flex justify-center sm:justify-start space-x-2 mt-6">
              {filteredSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:block lg:block relative">
            <img
              src={currentSlideData.image || "/placeholder.svg"}
              alt={currentSlideData.imageAlt}
              className="rounded-lg shadow-lg w-full h-[300px] object-cover object-center mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Right navigation arrow - positioned on right side of entire hero */}
      <button
        onClick={goToNextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  )
}
