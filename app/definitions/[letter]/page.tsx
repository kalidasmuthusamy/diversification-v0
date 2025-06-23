import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAllDefinitionIds, getDefinition } from "@/app/data/definitions"
import { Search } from "lucide-react"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"

const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

interface DefinitionsLetterPageProps {
  params: {
    letter: string
  }
}

export async function generateMetadata({ params }: DefinitionsLetterPageProps): Promise<Metadata> {
  const letter = params.letter.toLowerCase()

  // Handle the index_ prefix
  if (letter.startsWith("index_")) {
    const actualLetter = letter.replace("index_", "")
    if (!LETTERS.includes(actualLetter)) {
      return {
        title: "Definitions Not Found",
        description: "The requested definitions page could not be found.",
      }
    }

    const upperLetter = actualLetter.toUpperCase()

    return {
      title: `Financial Definitions Starting with ${upperLetter} | Diversification.com`,
      description: `Browse comprehensive financial definitions and investment terms starting with the letter ${upperLetter}. Learn key concepts for portfolio management and investing.`,
      keywords: [
        `financial definitions ${upperLetter}`,
        `investment terms ${upperLetter}`,
        `portfolio management definitions`,
        `financial glossary ${upperLetter}`,
      ],
    }
  }

  // If it's just a single letter, redirect to index_ version
  if (LETTERS.includes(letter)) {
    return {
      title: "Redirecting...",
      description: "Redirecting to definitions page.",
    }
  }

  return {
    title: "Definitions Not Found",
    description: "The requested definitions page could not be found.",
  }
}

export default function DefinitionsLetterPage({ params }: DefinitionsLetterPageProps) {
  const letter = params.letter.toLowerCase()

  // Handle the index_ prefix
  if (letter.startsWith("index_")) {
    const actualLetter = letter.replace("index_", "")

    if (!LETTERS.includes(actualLetter)) {
      notFound()
    }

    const allDefinitionIds = getAllDefinitionIds()
    const letterDefinitions = allDefinitionIds
      .map((id) => getDefinition(id))
      .filter((def) => def && def.term.toLowerCase().startsWith(actualLetter))
      .sort((a, b) => a!.term.localeCompare(b!.term))

    const upperLetter = actualLetter.toUpperCase()

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Definitions Dictionary</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore comprehensive financial definitions and investment terms to help you understand portfolio
              management and make informed investment decisions.
            </p>
          </div>

          {/* Alphabet Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {LETTERS.map((l) => (
                <Link
                  key={l}
                  href={`/definitions/index_${l}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    l === actualLetter ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search for financial terms..." className="pl-10 py-3 text-lg border-gray-300" />
            </div>
          </div>

          {/* Definitions List */}
          <Card>
            <CardContent className="p-6">
              {letterDefinitions.length > 0 ? (
                <div className="space-y-1">
                  {letterDefinitions.map((definition) => (
                    <Link
                      key={definition!.id}
                      href={`/definitions/term/${definition!.id}`}
                      className="block py-3 px-4 text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors rounded-md"
                    >
                      {definition!.term}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No definitions found starting with "{upperLetter}"</p>
                  <p className="text-gray-400 mt-2">Try browsing other letters or use the search function above.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Letter Count */}
          {letterDefinitions.length > 0 && (
            <div className="text-center mt-6 text-gray-500">
              Showing {letterDefinitions.length} definition{letterDefinitions.length !== 1 ? "s" : ""} starting with "
              {upperLetter}"
            </div>
          )}
        </div>
      </div>
    )
  }

  // If it's just a single letter, redirect to index_ version
  if (LETTERS.includes(letter)) {
    redirect(`/definitions/index_${letter}`)
  }

  notFound()
}
