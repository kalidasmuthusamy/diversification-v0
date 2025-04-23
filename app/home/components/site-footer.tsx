import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/home" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                diversification.com
              </span>
            </Link>
            <p className="text-gray-600 mb-4 text-sm">
              Helping investors understand and optimize their portfolio diversification for better risk-adjusted
              returns.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/education" className="text-gray-600 hover:text-blue-600">
                  Education Center
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-blue-600">
                  Investment Tools
                </Link>
              </li>
              <li>
                <Link href="/asset-classes" className="text-gray-600 hover:text-blue-600">
                  Asset Classes
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="text-gray-600 hover:text-blue-600">
                  Market Sectors
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-600 hover:text-blue-600">
                  Investment Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-blue-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-blue-600">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Get the latest market insights and diversification strategies delivered to your inbox.
            </p>
            <div className="flex">
              <Input type="email" placeholder="Your email" className="rounded-r-none border-gray-300" />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} diversification.com. All rights reserved.
            </p>
          </div>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>IMPORTANT DISCLOSURES:</strong> diversification.com is a technology product of Global Predictions
              Inc, a Registered Investment Advisor with the SEC. The information provided on diversification.com is for
              informational and educational purposes only. It should not be considered financial advice. Investment
              advisory services are only provided to investors who become Global Predictions clients. Past performance
              is not a guarantee of future results. Investing involves risk.
            </p>
            <p>
              The content on this website, including market analysis, diversification scores, and other information,
              represents our observations of current market conditions and should not be interpreted as a recommendation
              to buy, sell, or hold any particular investment or security.
            </p>
            <p>
              Past performance is not indicative of future results. All investments involve risk, including the possible
              loss of principal. Diversification does not guarantee a profit or protect against a loss in a declining
              market.
            </p>
            <p>
              The diversification score and related analysis are based on a proprietary methodology that evaluates
              various aspects of portfolio composition. They should not be the sole basis for making investment
              decisions.
            </p>
            <p>
              <strong>DATA SOURCES:</strong> Market data, asset class information, sector analysis, and other financial
              information displayed on this website are sourced from StockNewsAPI, Morningstar, AlphaVantage, IEX, and
              TradingEconomics. We make every effort to ensure data accuracy but cannot guarantee that all information
              is complete, accurate, or timely.
            </p>
            <p>
              <strong>USER COUNT DISCLOSURE:</strong> References to "30,000 users/subscribers" reflect the combined user
              base across Global Predictions, PortfolioPilot.com, and diversification.com platforms as of February 15,
              2025.
            </p>
            <p>
              <strong>REGULATORY INFORMATION:</strong> For Global Predictions' Form ADV Part 2A and other regulatory
              disclosures, please visit{" "}
              <a href="https://portfoliopilot.com/disclosures" className="underline hover:text-blue-600">
                portfoliopilot.com/disclosures
              </a>
              .
            </p>
            <p>
              <strong>FIDUCIARY ADVICE:</strong> Fiduciary financial advice is available through
              <a href="https://portfoliopilot.com" className="underline hover:text-blue-600">
                {" "}
                PortfolioPilot.com
              </a>
              . The tools and calculators on diversification.com are for educational purposes and do not constitute
              personalized investment advice.
            </p>
            <p>
              Before making any investment decisions, you should consult with a qualified financial advisor, tax
              professional, or legal counsel to ensure that your investment strategy aligns with your individual needs
              and circumstances.
            </p>
            <p>
              Global Predictions Inc. and its affiliates, officers, directors, employees, and agents do not guarantee
              the accuracy, completeness, or timeliness of the information provided on this website and shall not be
              liable for any losses, damages, or costs that may arise from its use.
            </p>
            {/* Copyright is already included in the main footer section */}
          </div>
        </div>
      </div>
    </footer>
  )
}
