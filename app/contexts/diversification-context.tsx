"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DiversificationContextType = {
  hasCalculatedScore: boolean
  score: number | null
  lastCalculated: string | null
  allocations: Record<string, number> | null
  setScoreData: (score: number, allocations?: Record<string, number>) => void
  resetScore: () => void
}

const DiversificationContext = createContext<DiversificationContextType | undefined>(undefined)

export function DiversificationProvider({ children }: { children: ReactNode }) {
  const [hasCalculatedScore, setHasCalculatedScore] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [lastCalculated, setLastCalculated] = useState<string | null>(null)
  const [allocations, setAllocations] = useState<Record<string, number> | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("diversificationScore")
      const savedLastCalculated = localStorage.getItem("diversificationLastCalculated")
      const savedAllocations = localStorage.getItem("diversificationAllocations")

      if (savedScore) {
        setScore(Number.parseInt(savedScore, 10))
        setHasCalculatedScore(true)
      }

      if (savedLastCalculated) {
        setLastCalculated(savedLastCalculated)
      }

      if (savedAllocations) {
        setAllocations(JSON.parse(savedAllocations))
      }
    } catch (error) {
      console.error("Error loading diversification data from localStorage:", error)
    }
  }, [])

  const setScoreData = (newScore: number, newAllocations?: Record<string, number>) => {
    // Format date as "Month Day, Year"
    const now = new Date()
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    setScore(newScore)
    setLastCalculated(formattedDate)
    setHasCalculatedScore(true)

    if (newAllocations) {
      setAllocations(newAllocations)
    }

    // Save to localStorage
    try {
      localStorage.setItem("diversificationScore", newScore.toString())
      localStorage.setItem("diversificationLastCalculated", formattedDate)

      if (newAllocations) {
        localStorage.setItem("diversificationAllocations", JSON.stringify(newAllocations))
      }
    } catch (error) {
      console.error("Error saving diversification data to localStorage:", error)
    }
  }

  const resetScore = () => {
    setScore(null)
    setLastCalculated(null)
    setAllocations(null)
    setHasCalculatedScore(false)

    // Remove from localStorage
    try {
      localStorage.removeItem("diversificationScore")
      localStorage.removeItem("diversificationLastCalculated")
      localStorage.removeItem("diversificationAllocations")
    } catch (error) {
      console.error("Error removing diversification data from localStorage:", error)
    }
  }

  return (
    <DiversificationContext.Provider
      value={{
        hasCalculatedScore,
        score,
        lastCalculated,
        allocations,
        setScoreData,
        resetScore,
      }}
    >
      {children}
    </DiversificationContext.Provider>
  )
}

export function useDiversification() {
  const context = useContext(DiversificationContext)

  if (context === undefined) {
    throw new Error("useDiversification must be used within a DiversificationProvider")
  }

  return context
}
