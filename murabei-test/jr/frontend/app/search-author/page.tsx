"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BookCard from "@/components/BookCard"

export default function SearchAuthorPage() {
  const [author, setAuthor] = useState("")
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!author.trim()) return
    setLoading(true)

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/books/author/${author}`)
      const data = await res.json()
      setBooks(data)
    } catch (error) {
      console.error("Erro ao buscar autor:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Buscar livros por{" "}
        <span className="text-blue-600 dark:text-blue-400">autor</span>
      </h1>

      <div className="max-w-xl mx-auto flex gap-2 mb-10">
        <Input
          placeholder="Ex: George Orwell"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
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
        !loading && author && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhum livro encontrado para <strong>{author}</strong>.
          </p>
        )
      )}
    </section>
  )
}
