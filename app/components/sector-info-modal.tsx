"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function SectorInfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Info className="h-4 w-4 mr-2" />
          What are Sectors?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Understanding Market Sectors</DialogTitle>
          <DialogDescription>A guide to market sectors and their role in portfolio diversification</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-medium">What are Market Sectors?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Market sectors are segments of the economy that group companies providing similar products or services.
              The Global Industry Classification Standard (GICS), developed by MSCI and S&P Dow Jones Indices, is the
              most widely used classification system, dividing the market into 11 sectors.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">The 11 Major Market Sectors</h3>

            <div>
              <h4 className="font-medium">Technology</h4>
              <p className="text-sm text-muted-foreground">
                Companies that develop or distribute technological products and services, including software, hardware,
                semiconductors, and IT services. Known for high growth potential but also higher volatility.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Healthcare</h4>
              <p className="text-sm text-muted-foreground">
                Encompasses pharmaceutical companies, medical device manufacturers, hospitals, and healthcare providers.
                Generally considered defensive with stable demand regardless of economic conditions.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Financials</h4>
              <p className="text-sm text-muted-foreground">
                Includes banks, insurance companies, asset managers, and other financial service providers. Performance
                often correlates with interest rates and economic cycles.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Consumer Discretionary</h4>
              <p className="text-sm text-muted-foreground">
                Companies that provide non-essential goods and services, such as retailers, restaurants, and
                entertainment. Typically performs well during economic expansions but struggles during downturns.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Consumer Staples</h4>
              <p className="text-sm text-muted-foreground">
                Producers of essential products like food, beverages, household goods, and personal products. Considered
                defensive as demand remains relatively stable regardless of economic conditions.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Industrials</h4>
              <p className="text-sm text-muted-foreground">
                Manufacturers, aerospace, defense, machinery, and transportation companies. Performance often reflects
                broader economic cycles and global trade conditions.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Energy</h4>
              <p className="text-sm text-muted-foreground">
                Companies involved in oil, gas, coal, and renewable energy production. Highly sensitive to commodity
                prices and geopolitical events.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Utilities</h4>
              <p className="text-sm text-muted-foreground">
                Providers of electricity, water, and natural gas. Typically stable with high dividends but sensitive to
                interest rate changes.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Materials</h4>
              <p className="text-sm text-muted-foreground">
                Companies that discover, develop, and process raw materials, including mining, chemicals, and forest
                products. Performance often tied to commodity prices and economic cycles.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Real Estate</h4>
              <p className="text-sm text-muted-foreground">
                Real Estate Investment Trusts (REITs) and real estate management companies. Provides income through
                dividends and potential for capital appreciation.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Communication Services</h4>
              <p className="text-sm text-muted-foreground">
                Telecommunication providers, media companies, and interactive media services. A mix of defensive telecom
                stocks and growth-oriented media and internet companies.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Sector Rotation and Investment Strategy</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Different sectors tend to outperform at different stages of the economic cycle. For example, consumer
              discretionary and technology often lead during early expansion, while utilities and consumer staples may
              outperform during economic contractions.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Sector diversification helps reduce portfolio risk by spreading investments across industries that may
              respond differently to economic events. This can help smooth returns over time and potentially improve
              risk-adjusted performance.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
