import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getDefinition, getRelatedDefinitions } from "@/app/data/definitions"
import { ArrowLeft, BookOpen, Calculator, TrendingUp, Users, AlertTriangle, HelpCircle } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface DefinitionPageProps {
  params: {
    definition: string
  }
}

export async function generateMetadata({ params }: DefinitionPageProps): Promise<Metadata> {
  const definition = getDefinition(params.definition)

  if (!definition) {
    return {
      title: "Definition Not Found",
      description: "The requested financial definition could not be found.",
    }
  }

  return {
    title: definition.seoMetadata.title,
    description: definition.seoMetadata.description,
    keywords: definition.seoMetadata.keywords.join(", "),
  }
}

export default function DefinitionPage({ params }: DefinitionPageProps) {
  const definition = getDefinition(params.definition)

  if (!definition) {
    notFound()
  }

  const relatedDefinitions = getRelatedDefinitions(params.definition)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href={`/definitions/index_${definition.term.charAt(0).toLowerCase()}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {definition.term.charAt(0).toUpperCase()} Definitions
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{definition.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{definition.term}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{definition.definition}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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
                  {definition.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* History */}
            {definition.history && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    History & Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{definition.history.origin}</p>
                  {definition.history.developer && (
                    <p className="text-gray-600 mt-3">
                      <strong>Developer:</strong> {definition.history.developer}
                      {definition.history.year && ` (${definition.history.year})`}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Formula */}
            {definition.formula && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Formula
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <code className="text-lg font-mono text-gray-800">{definition.formula.equation}</code>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Where:</h4>
                    {definition.formula.variables.map((variable, index) => (
                      <div key={index} className="flex gap-3">
                        <code className="font-mono text-blue-600 font-semibold">{variable.symbol}</code>
                        <span className="text-gray-700">= {variable.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interpretation */}
            {definition.interpretation && (
              <Card>
                <CardHeader>
                  <CardTitle>Interpretation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">{definition.interpretation.description}</p>
                  {definition.interpretation.ranges && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Typical Ranges:</h4>
                      {definition.interpretation.ranges.map((range, index) => (
                        <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <code className="font-mono text-blue-600 font-semibold whitespace-nowrap">{range.range}</code>
                          <span className="text-gray-700">{range.meaning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Example */}
            {definition.example && (
              <Card>
                <CardHeader>
                  <CardTitle>Example</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
                    <p className="text-gray-700">{definition.example.scenario}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Calculation:</h4>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <code className="text-gray-800">{definition.example.calculation}</code>
                    </div>
                  </div>
                  {definition.example.result && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Result:</h4>
                      <p className="text-gray-700 font-semibold">{definition.example.result}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Interpretation:</h4>
                    <p className="text-gray-700">{definition.example.interpretation}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {definition.applications.map((application, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{application}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {definition.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* FAQs */}
            {definition.faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {definition.faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700">{faq.answer}</p>
                      {index < definition.faqs.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Concepts */}
            {definition.relatedConcepts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {definition.relatedConcepts.map((concept, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">{concept.term}</h4>
                      <p className="text-sm text-gray-600">{concept.comparison}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Related Definitions */}
            {relatedDefinitions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Definitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {relatedDefinitions.map((relatedDef) => (
                      <Link
                        key={relatedDef.id}
                        href={`/definitions/term/${relatedDef.id}`}
                        className="block p-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-md"
                      >
                        {relatedDef.term}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Further Reading */}
            {definition.furtherReading.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Further Reading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {definition.furtherReading.map((reading, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">{reading.title}</h4>
                      <p className="text-sm text-gray-600">{reading.description}</p>
                      {reading.url && (
                        <a
                          href={reading.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                        >
                          Read more →
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
