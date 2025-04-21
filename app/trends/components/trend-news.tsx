export default function TrendNews() {
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Tech Giants Announce Major AI Investments",
      source: "Financial Times",
      date: "2 hours ago",
      excerpt:
        "Leading technology companies have announced billions in new AI research and development initiatives, signaling continued acceleration of the AI trend.",
    },
    {
      id: 2,
      title: "AI Adoption Accelerating Across Healthcare Sector",
      source: "Healthcare Daily",
      date: "5 hours ago",
      excerpt:
        "Healthcare providers are increasingly implementing AI solutions for diagnostics, patient care, and administrative functions, according to a new industry survey.",
    },
    {
      id: 3,
      title: "Manufacturing Sector Embraces Automation Amid Labor Challenges",
      source: "Industry Week",
      date: "1 day ago",
      excerpt:
        "Manufacturing companies are accelerating automation investments as they continue to face labor shortages and rising wage pressures.",
    },
    {
      id: 4,
      title: "AI Regulation Framework Proposed by International Coalition",
      source: "Policy Review",
      date: "2 days ago",
      excerpt:
        "A coalition of countries has proposed a new framework for AI regulation, aiming to balance innovation with ethical considerations and safety.",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Latest News on AI and Automation</h3>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <h4 className="font-medium mb-1">{item.title}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{item.source}</span>
              <span>•</span>
              <span>{item.date}</span>
            </div>
            <p className="text-sm">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
