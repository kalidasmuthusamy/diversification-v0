import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot } from "lucide-react"

export default function PortfolioPilotSidebar() {
  return (
    <Card className="overflow-hidden border shadow">
      <div className="bg-[#0066cc] p-4 text-white">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="text-lg font-bold">PortfolioPilot</h3>
        </div>
        <p className="text-sm text-white/80">Your Personal AI Financial Advisor</p>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          Get personalized investment recommendations and optimize your diversification strategy with our AI-powered
          advisor.
        </p>
        <Button className="w-full bg-[#0066cc] hover:bg-[#0055b3]">
          Start Free Trial
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
