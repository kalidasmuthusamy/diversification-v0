import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DiversificationProvider } from "./contexts/diversification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "diversification.com - The religion of investing",
  description:
    "Discover how well your investments are protected against market volatility, inflation, and sector risks.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DiversificationProvider>{children}</DiversificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
