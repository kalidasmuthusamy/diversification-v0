import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TopStories() {
  // Mock data - in a real app, this would come from an API
  const stories = [
    {
      id: 1,
      title: "Fed signals potential rate cuts as inflation eases",
      category: "Economy",
      time: "2h ago",
      image: "/federal-reserve-exterior.png",
    },
    {
      id: 2,
      title: "Tech stocks rally on strong earnings reports",
      category: "Markets",
      time: "4h ago",
      image: "/tech-bull-run.png",
    },
    {
      id: 3,
      title: "Housing market shows signs of cooling as mortgage rates rise",
      category: "Real Estate",
      time: "6h ago",
      image: "/for-sale-sign-suburbs.png",
    },
    {
      id: 4,
      title: "Oil prices drop amid concerns over global demand",
      category: "Commodities",
      time: "8h ago",
      image: "/stacked-oil-barrels.png",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <Link href="/most-impactful-stories" className="hover:text-primary hover:underline">
          <CardTitle className="text-lg font-semibold">Today's video recap</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {stories.map((story) => (
            <Link key={story.id} href="/most-impactful-stories" className="block hover:bg-gray-50 transition-colors">
              <div className="p-4 flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-[100px] h-[60px] object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{story.title}</h3>
                  <div className="flex items-center text-xs">
                    <Badge variant="outline" className="mr-2 font-normal">
                      {story.category}
                    </Badge>
                    <span className="text-gray-500">{story.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
