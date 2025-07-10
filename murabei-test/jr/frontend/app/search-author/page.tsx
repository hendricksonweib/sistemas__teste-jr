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
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Author {
  id: number
  title: string
  slug: string
  biography: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL
const PAGE_SIZE = 8

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const fetchAuthors = async (page: number) => {
    if (!API_URL) {
      console.error("API URL não definida. Verifique seu .env.local")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/authors?page=${page}&page_size=${PAGE_SIZE}`)
      const data = await res.json()
      setAuthors(data)
      setHasNextPage(data.length === PAGE_SIZE)
    } catch (error) {
      console.error("Erro ao buscar autores:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors(page)
  }, [page])

  const filteredAuthors = authors.filter((author) =>
    author.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleNext = () => setPage((prev) => prev + 1)
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1))

  return (
    <section className="min-h-screen px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        <span className="text-gray-900 dark:text-white">Todos os </span>
        <span className="text-blue-600 dark:text-blue-400">Autores</span>
      </h1>

      <div className="max-w-lg mx-auto mb-10">
        <Input
          placeholder="Digite o nome do autor..."
          aria-label="Buscar autor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando autores...</p>
      ) : filteredAuthors.length > 0 ? (
        <>
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

          {/* Paginação */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button onClick={handlePrev} disabled={page === 1} variant="outline">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Página {page}</span>
            <Button onClick={handleNext} disabled={!hasNextPage} variant="outline">
              Próxima
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400">Nenhum autor encontrado.</p>
      )}
    </section>
  )
}
