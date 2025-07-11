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
import { toast } from "sonner"; 

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
  const [open, setOpen] = useState(false);

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
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro no servidor:", errorData);
        throw new Error("Erro ao atualizar livro");
      }

      const updated = await res.json();
      onUpdate({ ...form });

      toast.success("Livro atualizado com sucesso! 📚");

      setOpen(false);
    } catch (err) {
      console.error("Erro ao atualizar livro:", err);
      toast.error("Erro ao atualizar livro. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="edit-book-description"
      >
        <p id="edit-book-description" className="sr-only">
          Formulário para editar um livro existente.
        </p>

        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {["title", "author", "publisher", "authors", "biography", "synopsis"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input name={field} value={(form as any)[field]} onChange={handleChange} />
            </div>
          ))}
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
