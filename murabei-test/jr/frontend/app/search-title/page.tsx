"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BookCard from "@/components/BookCard"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function SearchByTitlePage() {
  const [title, setTitle] = useState("")
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!title.trim()) return
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/books?title=${encodeURIComponent(title)}`)
      const data = await res.json()
      setBooks(data)
    } catch (error) {
      console.error("Erro ao buscar livros:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Buscar por <span className="text-blue-600 dark:text-blue-400">Título</span>
      </h1>

      <div className="max-w-xl mx-auto flex gap-2 mb-8">
        <Input
          placeholder="Digite o título do livro..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              description={book.synopsis || book.biography || "Sem descrição"}
              rating={5}
              onView={() => {}}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhum livro encontrado.
          </p>
        )
      )}
    </section>
  )
}
