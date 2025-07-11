"use client"

import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BookCardProps {
  id: number
  title: string
  author: string
  description: string
  rating: number
}

export default function BookCard({
  id,
  title,
  author,
  description,
  rating,
}: BookCardProps) {
  const router = useRouter()

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 w-72 h-[360px] flex flex-col justify-between">
      <CardContent className="flex flex-col gap-4 h-full p-6">
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400" : "fill-none"}`} />
          ))}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
          <p className="text-sm text-white/90 italic">por {author}</p>
          <p className="text-sm text-white/80 mt-2 line-clamp-4">{description}</p>
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => router.push(`/books/${id}`)}
            variant="secondary"
            className="bg-white text-blue-700 hover:bg-gray-100 w-full"
          >
            Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
