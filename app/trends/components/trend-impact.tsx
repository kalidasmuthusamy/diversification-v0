import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrendImpact() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Investment Implications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Potential Opportunities</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Companies developing AI infrastructure and tools</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Businesses successfully implementing AI for competitive advantage</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>Cybersecurity providers protecting AI systems</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Potential Challenges</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Labor-intensive businesses facing automation pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Companies failing to adapt to AI-driven competition</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <span>Sectors facing potential disruption from AI innovations</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            <p>
              Note: This information is for educational purposes only and should not be considered investment advice.
              Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
