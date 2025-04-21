"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator } from "lucide-react"
import Link from "next/link"
import { useDiversification } from "@/app/contexts/diversification-context"
import DiversificationScoreModal from "./diversification-score-modal"

export function ClientDiversificationWrapper() {
  const { hasCalculatedScore, score, lastCalculated } = useDiversification()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-blue-50 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <span>Diversification Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {hasCalculatedScore ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-xs text-muted-foreground">Last calculated: {lastCalculated}</div>
              </div>
              <div className="relative h-16 w-16">
                <svg className="w-16 h-16 -rotate-90">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="22"
                    cx="32"
                    cy="32"
                  />
                  <circle
                    className={
                      score && score >= 80
                        ? "text-green-500 stroke-current"
                        : score && score >= 60
                          ? "text-amber-500 stroke-current"
                          : "text-red-500 stroke-current"
                    }
                    strokeWidth="5"
                    strokeDasharray={140}
                    strokeDashoffset={score ? 140 - (score / 100) * 140 : 140}
                    strokeLinecap="round"
                    fill="transparent"
                    r="22"
                    cx="32"
                    cy="32"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href="/diversification" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Details
                </Button>
              </Link>
              <DiversificationScoreModal>
                <Button size="sm" className="flex-1">
                  Recalculate
                </Button>
              </DiversificationScoreModal>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">Calculate your portfolio's diversification score to reduce risk.</p>
            <DiversificationScoreModal>
              <Button className="w-full">
                Calculate Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DiversificationScoreModal>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
