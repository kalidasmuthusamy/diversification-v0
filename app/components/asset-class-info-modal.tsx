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

export function AssetClassInfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Info className="h-4 w-4 mr-2" />
          What are Asset Classes?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Understanding Asset Classes</DialogTitle>
          <DialogDescription>A comprehensive guide to the major investment categories</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-medium">What is an Asset Class?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              An asset class is a grouping of investments that exhibit similar characteristics and are subject to the
              same laws and regulations. Asset classes are typically distinguished by their fundamental economic
              characteristics, behavior in the marketplace, and risk-return profiles.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Major Asset Classes</h3>

            <div>
              <h4 className="font-medium">Stocks (Equities)</h4>
              <p className="text-sm text-muted-foreground">
                Represent ownership in a company. Stocks offer potential for capital appreciation and dividend income
                but come with higher volatility. They can be categorized by market capitalization (large, mid,
                small-cap), geography (domestic, international, emerging markets), and style (growth, value).
              </p>
            </div>

            <div>
              <h4 className="font-medium">Bonds (Fixed Income)</h4>
              <p className="text-sm text-muted-foreground">
                Debt securities where investors lend money to an entity for a defined period at a fixed or variable
                interest rate. Bonds typically offer lower returns than stocks but with lower risk. Categories include
                government, municipal, corporate, and high-yield bonds.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Real Estate</h4>
              <p className="text-sm text-muted-foreground">
                Includes direct property ownership or investments through REITs (Real Estate Investment Trusts). Real
                estate can provide both income through rent and potential appreciation, with moderate correlation to
                stocks and bonds.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Commodities</h4>
              <p className="text-sm text-muted-foreground">
                Physical goods such as gold, silver, oil, agricultural products, and other raw materials. Commodities
                often move independently of stocks and bonds, providing portfolio diversification and potential
                inflation protection.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Cash and Cash Equivalents</h4>
              <p className="text-sm text-muted-foreground">
                Includes savings accounts, certificates of deposit (CDs), money market funds, and Treasury bills. These
                investments offer high liquidity and capital preservation but typically lower returns.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Alternative Investments</h4>
              <p className="text-sm text-muted-foreground">
                Encompasses private equity, venture capital, hedge funds, collectibles, cryptocurrencies, and other
                non-traditional investments. Alternatives often have different risk-return profiles compared to
                traditional asset classes.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Why Asset Classes Matter for Diversification</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Different asset classes respond differently to economic conditions, market events, and risk factors. By
              spreading investments across multiple asset classes, investors can potentially reduce portfolio volatility
              and improve risk-adjusted returns. This is the fundamental principle behind diversification.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              The optimal mix of asset classes depends on an investor's financial goals, time horizon, risk tolerance,
              and personal circumstances. Regular rebalancing helps maintain the desired asset allocation as market
              values fluctuate over time.
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
