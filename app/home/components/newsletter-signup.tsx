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
            <h3 className="font-bold">Long-Term Investor News</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Join 30,000 investors staying informed across all 30+ asset classes.
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
              <h3 className="text-xl font-bold">Current News for Long-Term Investors</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Join 30,000 investors who stay properly informed with comprehensive coverage across all 30+ asset classes.
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
              <Button className="w-full">Subscribe to Daily Newsletter</Button>
              <p className="text-xs text-center text-muted-foreground">You can unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
