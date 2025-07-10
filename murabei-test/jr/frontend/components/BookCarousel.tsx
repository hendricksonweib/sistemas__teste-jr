"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import BookCard from "@/components/BookCard"

interface Book {
  title: string
  author: string
  description: string
  rating: number
}

const books: Book[] = [
  {
    title: "O Alquimista",
    author: "Paulo Coelho",
    description: "A jornada de Santiago em busca de seu tesouro pessoal.",
    rating: 5,
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "Um futuro distópico onde o governo controla tudo.",
    rating: 4,
  },
  {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    description: "Uma obra-prima da literatura brasileira cheia de dúvidas.",
    rating: 5,
  },
  {
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    description: "Animais tomam uma fazenda e criam seu próprio governo.",
    rating: 4,
  },
]

export default function BookCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
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
              <BookCard {...book} onView={() => console.log("Ver", book.title)} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
