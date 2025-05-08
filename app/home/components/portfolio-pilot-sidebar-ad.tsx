import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Bot, LineChart, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function PortfolioPilotSidebarAd() {
  return (
    <Card className="overflow-hidden border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-white" />
          <h3 className="text-xl font-bold text-white">AI Financial Advisor</h3>
        </div>
        <p className="text-blue-100 text-sm">Optimize your portfolio with AI</p>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-2">
          {[
            "Personalized investment recommendations",
            "Smart portfolio rebalancing",
            "Risk assessment and management",
            "Diversification optimization",
            "Tax-efficient investing strategies",
          ].map((feature, index) => (
            <li key={index} className="flex items-start">
              {index === 0 && <Bot className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />}
              {index === 1 && <LineChart className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />}
              {index === 2 && <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />}
              {index === 3 && <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />}
              {index === 4 && <LineChart className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />}
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Link href="/advisor" className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
