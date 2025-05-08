export interface Investment {
  id: number
  name: string
  platform: string
  category: string
  description: string
  minInvestment: string
  rating: number
  marketCorrelation: string
  riskLevel: number
  liquidityLevel: number
  accreditedOnly: boolean
  logo: string
  tags: string[]
  pros: string[]
  cons: string[]
  icon: string
}
