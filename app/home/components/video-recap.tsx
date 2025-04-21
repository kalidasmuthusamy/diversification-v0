import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"

export function VideoRecap() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">1-Minute Market Recap</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-3">
        <div className="relative aspect-video bg-muted">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/financial-news-studio.png')" }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button size="icon" className="h-12 w-12 rounded-full bg-primary/90 hover:bg-primary">
                <Play className="h-5 w-5 ml-0.5" />
                <span className="sr-only">Play video</span>
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-medium">Markets rally as inflation cools: What you need to know</h3>
              <p className="text-white/80 text-sm mt-1">Presented by Sarah Johnson, Chief Market Analyst</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
