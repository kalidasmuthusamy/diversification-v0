"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DiversificationCalculator() {
  const [asset1, setAsset1] = useState("")
  const [allocation1, setAllocation1] = useState("")
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = () => {
    // In a real application, this would perform a more complex calculation
    // based on the entered portfolio information.
    // This is a placeholder for demonstration purposes.
    const calculatedScore = Math.floor(Math.random() * (90 - 50 + 1)) + 50
    setScore(calculatedScore)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Portfolio Holdings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="asset1">Asset 1</Label>
          <Input id="asset1" value={asset1} onChange={(e) => setAsset1(e.target.value)} />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="allocation1">Allocation (%)</Label>
          <Input id="allocation1" value={allocation1} onChange={(e) => setAllocation1(e.target.value)} />
        </div>
        <Button onClick={calculateScore}>Calculate Diversification Score</Button>

        {score !== null && (
          <div className="mt-4">
            <p>Your Diversification Score: {score}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
