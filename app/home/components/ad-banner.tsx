import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot } from "lucide-react"

export default function AdBanner() {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="text-lg font-bold">PortfolioPilot: Your Personal AI Financial Advisor</h3>
            </div>
            <p className="text-primary-foreground/80">
              Get personalized investment advice with no commissions or conflicts of interest
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-white/90 whitespace-nowrap">
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
