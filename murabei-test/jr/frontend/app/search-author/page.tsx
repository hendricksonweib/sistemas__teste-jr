"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Author {
  id: number
  title: string
  slug: string
  biography: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/v1/authors")
        const data = await res.json()
        setAuthors(data)
      } catch (error) {
        console.error("Erro ao buscar autores:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  const filteredAuthors = authors.filter((author) =>
    author.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Todos os <span className="text-blue-600 dark:text-blue-400">Autores</span>
      </h1>

      <div className="max-w-lg mx-auto mb-8">
        <Input
          placeholder="Buscar autor por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando autores...</p>
      ) : filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuthors.map((author) => (
            <Card
              key={author.id}
              className="bg-gradient-to-br from-blue-900 to-gray-800 text-white hover:scale-[1.02] transition-transform"
            >
              <CardHeader>
                <CardTitle>{author.title}</CardTitle>
                <CardDescription className="text-gray-300">{author.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-200 line-clamp-4">
                  {author.biography || "Sem biografia disponível."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Nenhum autor encontrado.</p>
      )}
    </section>
  )
}
