"use client"

import { Star, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


interface BookCardProps {
  title: string
  author: string
  description: string
  year: number
  pages: number
  rating: number // de 1 a 5
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}

export default function BookCard({
  title,
  author,
  description,
  year,
  pages,
  rating,
  onEdit,
  onDelete,
  onView,
}: BookCardProps) {
  return (
    <Card className="relative bg-black text-white w-72 h-[400px] p-4 rounded-xl border border-gray-800 shadow-lg">
      <div className="flex justify-end gap-2 mb-2">
        {onEdit && (
          <button onClick={onEdit}>
            <Pencil className="w-4 h-4 text-gray-300 hover:text-white" />
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
          </button>
        )}
      </div>

      {/* Ícone de livro centralizado */}
      <div className="flex flex-col items-start gap-3 flex-1">
        <Button onClick={onView} variant="secondary" className="rounded-full text-sm">
          <Eye className="w-4 h-4 mr-2" />
          Ver
        </Button>

        {/* Estrelas */}
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400" : "fill-none"}`} />
          ))}
        </div>

        {/* Info do livro */}
        <div className="space-y-1 mt-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{author}</p>
          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex justify-between text-xs text-gray-400 mt-4 pt-2 border-t border-gray-700">
        <span>{pages}p</span>
        <span>{year}</span>
      </div>
    </Card>
  )
}
