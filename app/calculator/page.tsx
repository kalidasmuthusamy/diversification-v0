import DiversificationCalculator from "../home/components/diversification-calculator"

export default function CalculatorPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Diversification Score Calculator</h1>
        <p className="text-muted-foreground mb-8">
          Analyze your portfolio's diversification and get recommendations to improve your risk-adjusted returns
        </p>

        <DiversificationCalculator />
      </div>
    </div>
  )
}
