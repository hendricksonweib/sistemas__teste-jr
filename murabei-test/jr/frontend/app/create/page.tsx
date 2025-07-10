"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateBookPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    author_slug: "",
    author_bio: "",
    authors: "",
    publisher: "",
    synopsis: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${API_URL}/api/v1/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("Livro criado com sucesso!")
        setForm({
          title: "",
          author: "",
          author_slug: "",
          author_bio: "",
          authors: "",
          publisher: "",
          synopsis: "",
        })
      } else {
        setMessage("Erro ao criar livro: " + (data.message || ""))
      }
    } catch (err) {
      console.error("Erro:", err)
      setMessage("Erro ao conectar com a API.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Adicionar Livro</h1>

      <div className="space-y-4">
        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
        <Input name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
        <Input name="author_slug" placeholder="Slug do Autor" value={form.author_slug} onChange={handleChange} />
        <Input name="authors" placeholder="Autores" value={form.authors} onChange={handleChange} />
        <Input name="publisher" placeholder="Editora" value={form.publisher} onChange={handleChange} />
        <Textarea name="author_bio" placeholder="Biografia do autor" value={form.author_bio} onChange={handleChange} />
        <Textarea name="synopsis" placeholder="Sinopse" value={form.synopsis} onChange={handleChange} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </div>
    </section>
  )
}
