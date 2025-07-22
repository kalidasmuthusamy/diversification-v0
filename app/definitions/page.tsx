import { redirect } from "next/navigation"

export const metadata = {
  title: "Financial Definitions Dictionary | Diversification.com",
  description:
    "Browse our comprehensive dictionary of financial terms, investment concepts, and portfolio management definitions.",
}

export default function DefinitionsPage() {
  redirect("/definitions/index_a")
}
