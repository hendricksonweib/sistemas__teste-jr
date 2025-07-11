"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ✅ Define a variável de ambiente corretamente
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  authors: string;
  biography: string;
  synopsis: string;
}

interface EditBookModalProps {
  book: Book;
  onUpdate: (updated: Book) => void;
}

export function EditBookModal({ book, onUpdate }: EditBookModalProps) {
  const [form, setForm] = useState({ ...book });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/v1/books/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // ✅ Usa o estado completo do formulário
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro no servidor:", errorData);
        throw new Error("Erro ao atualizar livro");
      }

      const updated = await res.json();
      onUpdate({ ...form }); // Atualiza o livro com os novos dados
    } catch (err) {
      console.error("Erro ao atualizar livro:", err);
      alert("Erro ao atualizar livro. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="edit-book-description"
      >
        {/* ✅ Acessibilidade: descreve o propósito do modal */}
        <p id="edit-book-description" className="sr-only">
          Formulário para editar um livro existente.
        </p>

        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="title">Título</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="author">Autor</Label>
            <Input name="author" value={form.author} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="publisher">Editora</Label>
            <Input
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="authors">Autores</Label>
            <Input
              name="authors"
              value={form.authors}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="biography">Biografia</Label>
            <Input
              name="biography"
              value={form.biography}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="synopsis">Sinopse</Label>
            <Input
              name="synopsis"
              value={form.synopsis}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
