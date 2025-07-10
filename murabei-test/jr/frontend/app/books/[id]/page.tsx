"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function BookDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/books/${id}`)
        if (!res.ok) throw new Error("Livro não encontrado")
        const data = await res.json()
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBook()
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = confirm("Tem certeza que deseja excluir este livro?")
    if (!confirmDelete) return

    await fetch(`${API_URL}/api/v1/books/${id}`, {
      method: "DELETE",
    })

    router.push("/books")
  }

  const handleEdit = () => {
    router.push(`/books/${id}/edit`)
  }

  if (loading) return <p>Carregando livro...</p>
  if (!book) return <p>Livro não encontrado.</p>

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600 italic">por {book.author}</p>
      <p><strong>Editora:</strong> {book.publisher}</p>
      <p><strong>Autores:</strong> {book.authors}</p>
      <p><strong>Biografia:</strong> {book.biography}</p>
      <p className="mt-4">{book.synopsis}</p>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleEdit}>Editar</Button>
        <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
      </div>
    </div>
  )
}
