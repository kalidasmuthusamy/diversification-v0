import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getAllDefinitionIds, getDefinition, definitionCategories } from "@/app/data/definitions"
import { Search, BookOpen } from "lucide-react"

export const metadata = {
  title: "Financial Definitions Dictionary | Diversification.com",
  description:
    "Browse our comprehensive dictionary of financial terms, investment concepts, and portfolio management definitions.",
}

export default function DefinitionsPage() {
  const definitionIds = getAllDefinitionIds()
  const definitions = definitionIds.map((id) => getDefinition(id)).filter(Boolean)

  const definitionsByCategory = definitionCategories.reduce(
    (acc, category) => {
      acc[category] = definitions.filter((def) => def.category === category)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Definitions Dictionary</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive explanations of investment terms, portfolio management concepts, and financial formulas to
            help you make informed investment decisions.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search definitions..." className="pl-10 py-3 text-lg" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(definitionsByCategory).map(
            ([category, categoryDefinitions]) =>
              categoryDefinitions.length > 0 && (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="h-6 w-6" />
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryDefinitions.map((definition) => (
                      <Link key={definition.id} href={`/definitions/${definition.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {definition.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{definition.term}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 text-sm line-clamp-3">{definition.definition}</p>
                            <div className="mt-4 text-blue-600 text-sm font-medium">Read full definition →</div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
