"use client"

import React from "react"
import BookCard from "@/components/BookCard"

export default function Page() {
  const livros = [
    {
      title: "O Alquimista",
      author: "Paulo Coelho",
      description:
        "A jornada de Santiago em busca do seu tesouro e de seu destino.",
      rating: 5,
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "Um clássico distópico sobre totalitarismo e vigilância.",
      rating: 4,
    },
    {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      description: "Bentinho, Capitu e uma dúvida eterna sobre traição.",
      rating: 5,
    },
    {
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      description: "Uma sátira política sobre o poder e a corrupção.",
      rating: 4,
    },
  ]

  return (
    <section className="w-full min-h-screen px-4 py-10 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Todos os Livros
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center flex-1">
        {livros.map((livro, index) => (
          <BookCard key={index} {...livro} onView={() => {}} />
        ))}
      </div>
    </section>
  )
}
