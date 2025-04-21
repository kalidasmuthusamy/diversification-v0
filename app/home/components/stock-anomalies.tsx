import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StockAnomalies() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-bold">Stock Anomalies</h3>
        </div>
        <Button variant="link" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnomalyItem
          symbol="NFLX"
          name="Netflix, Inc."
          change="+12.4%"
          reason="Earnings beat expectations"
          isPositive={true}
        />

        <AnomalyItem
          symbol="INTC"
          name="Intel Corporation"
          change="-8.7%"
          reason="Lowered guidance"
          isPositive={false}
        />

        <AnomalyItem
          symbol="DIS"
          name="The Walt Disney Company"
          change="+5.2%"
          reason="New streaming strategy"
          isPositive={true}
        />

        <AnomalyItem symbol="PFE" name="Pfizer Inc." change="-4.3%" reason="FDA rejection" isPositive={false} />
      </div>

      <div className="text-sm text-center">
        <span className="text-muted-foreground">Diversification tip:</span>{" "}
        <span className="font-medium">
          Anomalies can present both risks and opportunities for diversified portfolios
        </span>
      </div>
    </div>
  )
}

function AnomalyItem({
  symbol,
  name,
  change,
  reason,
  isPositive,
}: {
  symbol: string
  name: string
  change: string
  reason: string
  isPositive: boolean
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{symbol}</span>
              <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                {isPositive ? "Surge" : "Drop"}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">{name}</div>
          </div>
          <div className="text-right">
            <div className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? (
                <ArrowUp className="inline h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDown className="inline h-3 w-3 mr-0.5" />
              )}
              {change}
            </div>
            <div className="text-xs text-muted-foreground">{reason}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
