export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-full max-w-3xl mx-auto"></div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Array.from({ length: 26 }).map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
