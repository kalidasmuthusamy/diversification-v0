import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getDefinition, getRelatedDefinitions } from "@/app/data/definitions"
import { BookOpen, Calculator, TrendingUp, AlertCircle, Users, ExternalLink } from "lucide-react"

interface DefinitionPageProps {
  params: {
    term: string
  }
}

export async function generateMetadata({ params }: DefinitionPageProps): Promise<Metadata> {
  const data = getDefinition(params.term)

  if (!data) {
    return {
      title: "Definition Not Found",
      description: "The requested financial definition could not be found.",
    }
  }

  return {
    title: data.seoMetadata.title,
    description: data.seoMetadata.description,
    keywords: data.seoMetadata.keywords,
    openGraph: {
      title: data.seoMetadata.title,
      description: data.seoMetadata.description,
      type: "article",
    },
    alternates: {
      canonical: `https://diversification.com/definitions/${params.term}`,
    },
  }
}

export default function DefinitionPage({ params }: DefinitionPageProps) {
  const data = getDefinition(params.term)
  const relatedDefinitions = getRelatedDefinitions(params.term)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {data.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.term}: Definition, Formula, Example, and FAQs
              </h1>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Is {data.term}?</h2>
                <p className="text-gray-700 leading-relaxed">{data.definition}</p>
              </div>
            </div>

            {/* History Section */}
            {data.history && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    History and Origin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{data.history.origin}</p>
                </CardContent>
              </Card>
            )}

            {/* Key Takeaways */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Formula Section */}
            {data.formula && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Formula and Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-center">
                      <code className="text-lg font-mono bg-white px-4 py-2 rounded border">
                        {data.formula.equation}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Where:</h4>
                    <div className="space-y-2">
                      {data.formula.variables.map((variable, index) => (
                        <div key={index} className="flex gap-4">
                          <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded min-w-[3rem]">
                            {variable.symbol}
                          </code>
                          <span className="text-gray-700">{variable.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interpretation */}
            {data.interpretation && (
              <Card>
                <CardHeader>
                  <CardTitle>Interpreting the {data.term}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{data.interpretation.description}</p>
                  {data.interpretation.ranges && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">General interpretations include:</h4>
                      <div className="space-y-2">
                        {data.interpretation.ranges.map((range, index) => (
                          <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded">
                            <code className="font-mono text-sm bg-white px-2 py-1 rounded min-w-[8rem]">
                              {range.range}
                            </code>
                            <span className="text-gray-700">{range.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Example */}
            {data.example && (
              <Card>
                <CardHeader>
                  <CardTitle>Hypothetical Example</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>Hypothetical:</strong> {data.example.scenario}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm font-mono">{data.example.calculation}</code>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4">{data.example.interpretation}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Practical Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {data.term} is frequently used in various aspects of financial analysis and investment management:
                  </p>
                  <ul className="space-y-2">
                    {data.applications.map((application, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Limitations and Criticisms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While {data.term} is a useful tool, it has several limitations that investors should consider:
                  </p>
                  <ul className="space-y-2">
                    {data.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Related Concepts */}
            {data.relatedConcepts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{data.term} vs. Related Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.relatedConcepts.map((concept, index) => (
                    <div key={index}>
                      <h4 className="font-semibold mb-2">
                        {data.term} vs. {concept.term}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{concept.comparison}</p>
                      {index < data.relatedConcepts.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle>FAQs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    {index < data.faqs.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <a href="#definition" className="block text-sm text-blue-600 hover:text-blue-800">
                      Definition
                    </a>
                    {data.history && (
                      <a href="#history" className="block text-sm text-blue-600 hover:text-blue-800">
                        History & Origin
                      </a>
                    )}
                    <a href="#key-takeaways" className="block text-sm text-blue-600 hover:text-blue-800">
                      Key Takeaways
                    </a>
                    {data.formula && (
                      <a href="#formula" className="block text-sm text-blue-600 hover:text-blue-800">
                        Formula
                      </a>
                    )}
                    {data.interpretation && (
                      <a href="#interpretation" className="block text-sm text-blue-600 hover:text-blue-800">
                        Interpretation
                      </a>
                    )}
                    {data.example && (
                      <a href="#example" className="block text-sm text-blue-600 hover:text-blue-800">
                        Example
                      </a>
                    )}
                    <a href="#applications" className="block text-sm text-blue-600 hover:text-blue-800">
                      Applications
                    </a>
                    <a href="#limitations" className="block text-sm text-blue-600 hover:text-blue-800">
                      Limitations
                    </a>
                    <a href="#faqs" className="block text-sm text-blue-600 hover:text-blue-800">
                      FAQs
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Related Definitions */}
              {relatedDefinitions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Definitions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {relatedDefinitions.map((related) => (
                        <Link
                          key={related.id}
                          href={`/definitions/${related.id}`}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-medium text-gray-900 mb-1">{related.term}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {related.definition.substring(0, 100)}...
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Further Reading */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Further Reading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.furtherReading.map((reading, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">{reading.title}</div>
                        <div className="text-sm text-gray-600">{reading.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
