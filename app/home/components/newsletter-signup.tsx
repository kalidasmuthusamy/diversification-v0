"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [frequency, setFrequency] = useState({
    daily: true,
    weekly: true,
  })

  const handleFrequencyChange = (type: "daily" | "weekly") => {
    setFrequency((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  if (compact) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-primary" />
            <h3 className="font-bold">Long-Term Investor News</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Join 30,000+ long-term investors staying informed across all 30+ asset classes.
          </p>
          <div className="space-y-2">
            <Input type="email" placeholder="Your email address" className="text-sm" />

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  id="daily-compact"
                  name="frequency"
                  value="daily"
                  defaultChecked
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="daily-compact">Daily (M-F)</label>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  id="weekly-compact"
                  name="frequency"
                  value="weekly"
                  defaultChecked
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="weekly-compact">Weekly (Sa)</label>
              </div>
            </div>

            <Button className="w-full">Subscribe</Button>

            <div className="text-center">
              <Link
                href="/newsletter/archives"
                className="text-xs text-primary hover:underline inline-flex items-center"
              >
                Read previous newsletters →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Current News for Long-Term Investors</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Join 30,000+ long-term investors who stay properly informed with comprehensive coverage across all 30+
              asset classes.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Comprehensive coverage of 30+ asset classes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Long-term investment trends and analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Focus on proper diversification</span>
              </li>
            </ul>
          </div>
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-3">Sign Up for Free</h4>
            <div className="space-y-3">
              <div>
                <Input type="email" placeholder="Email Address" />
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="daily" defaultChecked />
                  <Label htmlFor="daily">Daily (M-F)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekly" defaultChecked />
                  <Label htmlFor="weekly">Weekly (Sa)</Label>
                </div>
              </div>

              <Button className="w-full">Subscribe</Button>
              <p className="text-xs text-center text-muted-foreground">
                You can unsubscribe at any time.
                <Link href="/newsletter/archives" className="text-primary hover:underline ml-1">
                  Read previous newsletters
                </Link>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
