import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-primary" />
            <h3 className="font-bold">Complete Asset Coverage</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            The only newsletter covering all 30+ asset classes. Never miss an opportunity.
          </p>
          <div className="space-y-2">
            <Input type="email" placeholder="Your email address" className="text-sm" />
            <Button className="w-full">Subscribe</Button>
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
              <h3 className="text-xl font-bold">The Only Newsletter Covering Every Asset Class</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Get comprehensive market coverage across all asset classes - from traditional stocks to the most exotic
              alternatives. Never miss an investment opportunity again.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Complete coverage of 30+ asset classes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Discover opportunities others are missing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Correlation insights across all markets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Exclusive alternative investment alerts</span>
              </li>
            </ul>
          </div>
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-3">Sign Up for Free</h4>
            <div className="space-y-3">
              <div>
                <Input type="email" placeholder="Email Address" />
              </div>
              <Button className="w-full">Subscribe to Daily Newsletter</Button>
              <p className="text-xs text-center text-muted-foreground">
                Get daily market insights and diversification tips. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
