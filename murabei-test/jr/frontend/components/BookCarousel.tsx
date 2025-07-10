"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import BookCard from "@/components/BookCard"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function BookCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  const [books, setBooks] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/books`)
        const data = await res.json()
        setBooks(data)
      } catch (error) {
        console.error("Erro ao buscar livros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Destaques da <span className="text-blue-600 dark:text-blue-400">Coleção</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando livros...</p>
      ) : books.length > 0 ? (
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {books.map((book, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-4">
                  <BookCard
                    title={book.title}
                    author={book.author}
                    description={book.synopsis || book.biography || "Sem descrição"}
                    rating={5}
                    onView={() => console.log("Ver", book.title)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-center text-gray-400">Nenhum livro disponível no momento.</p>
      )}
    </section>
  )
}
