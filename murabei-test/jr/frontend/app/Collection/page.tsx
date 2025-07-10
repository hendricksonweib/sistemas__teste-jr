"use client"

import React, { useEffect, useState } from "react"
import BookCard from "@/components/BookCard"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Page() {
  const [livros, setLivros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/books`)
        const data = await res.json()
        setLivros(data)
      } catch (err) {
        console.error("Erro ao buscar livros:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <section className="w-full min-h-screen px-4 py-10 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Todos os <span className="text-blue-600 dark:text-blue-400">Livros</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando livros...</p>
      ) : livros.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center flex-1">
          {livros.map((livro, index) => (
            <BookCard
              key={index}
              title={livro.title}
              author={livro.author}
              description={livro.synopsis || livro.biography || "Sem descrição"}
              rating={5} // você pode ajustar se tiver rating real
              onView={() => {}}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Nenhum livro encontrado.</p>
      )}
    </section>
  )
}
