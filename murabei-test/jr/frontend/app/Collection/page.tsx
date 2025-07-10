"use client"

import React, { useEffect, useState } from "react"
import BookCard from "@/components/BookCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL
const PAGE_SIZE = 8

export default function Page() {
  const [livros, setLivros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const fetchBooks = async (page: number) => {
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/books?page=${page}&page_size=${PAGE_SIZE}`)
      const data = await res.json()
      setLivros(data)
      setHasNextPage(data.length === PAGE_SIZE)
    } catch (err) {
      console.error("Erro ao buscar livros:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks(page)
  }, [page])

  const handleNext = () => setPage((prev) => prev + 1)
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1))

  return (
    <section className="w-full min-h-screen px-4 py-10 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Todos os <span className="text-blue-600 dark:text-blue-400">Livros</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando livros...</p>
      ) : livros.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center flex-1">
            {livros.map((livro, index) => (
              <BookCard
                key={index}
                id={livro.id} // 👈 agora está sendo passado corretamente!
                title={livro.title}
                author={livro.author}
                description={livro.synopsis || livro.biography || "Sem descrição"}
                rating={5}
              />
            ))}
          </div>
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
        <p className="text-center text-gray-400">Nenhum livro encontrado.</p>
      )}
    </section>
  )
}
