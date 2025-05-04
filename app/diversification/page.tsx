"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check, Upload, Copy, Lock } from "lucide-react"
import { useState, useRef } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DiversificationScoreModal from "@/app/home/components/diversification-score-modal"

export default function DiversificationPage() {
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

function DiversificationCalculator() {
  const [portfolioText, setPortfolioText] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample portfolio text - updated to use dollar amounts and include real estate
  const samplePortfolio = `AAPL, $45,000
MSFT, $36,000
AMZN, $30,000
SPY, $75,000
QQQ, $54,000
BND, $30,000
GLD, $15,000
Real Estate, $15,000`

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)

      // Simulate reading the file and extracting portfolio data
      setTimeout(() => {
        setPortfolioText(samplePortfolio)
      }, 1000)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Portfolio Diversification Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6 flex items-start gap-2">
          <Lock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Your privacy is protected</p>
            <p className="text-xs text-blue-600">We do not store your personal information or portfolio details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="copy-paste" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="copy-paste" className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Copy/Paste Portfolio</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  <span>Upload Statement</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="copy-paste" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter your portfolio holdings (ticker, dollar amount)</label>
                  <Textarea
                    placeholder="Example:
AAPL, $45,000
MSFT, $36,000
SPY, $75,000"
                    className="min-h-[250px]"
                    value={portfolioText}
                    onChange={(e) => setPortfolioText(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one holding per line with ticker symbol and dollar amount
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Sample Portfolio</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Don't have a portfolio? Use our sample to see how the calculator works:
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setPortfolioText(samplePortfolio)}>
                    Use Sample Portfolio
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".csv,.xlsx,.pdf"
                  />
                  {!uploadedFile ? (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <h3 className="text-lg font-medium mb-1">Upload your brokerage statement</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We support CSV, Excel, and PDF files from major brokerages
                      </p>
                      <Button onClick={triggerFileUpload}>Select File</Button>
                    </>
                  ) : (
                    <>
                      <Check className="h-10 w-10 text-green-500 mx-auto mb-2" />
                      <h3 className="text-lg font-medium mb-1">File uploaded successfully</h3>
                      <p className="text-sm text-green-600 mb-4">{uploadedFile.name}</p>
                      <Button variant="outline" onClick={() => setUploadedFile(null)}>
                        Change File
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button
                onClick={() => setModalOpen(true)}
                disabled={portfolioText.trim() === "" && !uploadedFile}
                className="flex-1"
              >
                Calculate Score
              </Button>

              {/* Modal without trigger button, skipping input step */}
              <DiversificationScoreModal
                triggerButton={false}
                initialPortfolioText={portfolioText}
                defaultOpen={modalOpen}
                onOpenChange={setModalOpen}
                skipInputStep={true}
              />
            </div>
          </div>

          <div className="space-y-6 hidden lg:block">
            <div className="bg-muted/30 rounded-lg p-6 h-full flex flex-col justify-center">
              <h3 className="text-lg font-medium mb-4">Why Calculate Your Diversification Score?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Identify concentration risks</span> in your portfolio that could lead
                    to increased volatility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Discover asset classes</span> that may be missing from your investment
                    mix
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Understand correlations</span> between your holdings and how they
                    might perform in different market conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">Get personalized recommendations</span> to improve your portfolio's
                    risk-adjusted returns (via PortfolioPilot.com)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
